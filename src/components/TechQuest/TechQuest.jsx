import React, { useState } from 'react';
import { Play, Check, X, Code, Brain, Star } from 'lucide-react';
import { toast } from 'sonner';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const fetchGeminiQuestion = async (category, difficulty) => {
  try {
    const chatModel = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }).startChat();
    const prompt = `Generate a fresh ${difficulty} level ${category} coding challenge as a JSON:
{
  "title": "...",
  "description": "...",
  "code": "...",
  "solution": "...",
  "expectedOutput": "...",
  "hints": ["...", "..."]
}
Only return valid JSON object. Ensure uniqueness.`;

    const result = await chatModel.sendMessage(prompt);
    const text = await result.response.text();

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const cleanJson = jsonMatch ? JSON.parse(jsonMatch[0]) : null;
    if (!cleanJson) throw new Error('Invalid JSON');

    return {
      id: Date.now(),
      title: cleanJson.title,
      description: cleanJson.description,
      code: cleanJson.code || '',
      solution: cleanJson.solution || '',
      expectedOutput: cleanJson.expectedOutput || '',
      hints: cleanJson.hints || [],
      type: 'coding',
      category,
      difficulty,
      points: difficulty === 'easy' ? 100 : difficulty === 'medium' ? 200 : 300
    };
  } catch (error) {
    console.error('Gemini API failed:', error);
    toast.error('❌ Gemini API Error! Showing fallback.');
    return {
      id: Date.now(),
      title: 'Fallback Challenge',
      description: `This is a fallback ${difficulty} challenge for ${category}.`,
      code: '// Write your code here',
      solution: 'Expected logic here',
      expectedOutput: 'output',
      hints: ['Hint 1', 'Hint 2'],
      type: 'coding',
      category,
      difficulty,
      points: 100
    };
  }
};

const CodeEditor = ({ challenge, onSuccess, setShowSolution }) => {
  const [language, setLanguage] = useState('javascript');
  const [userCode, setUserCode] = useState(challenge.code || '');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  const runCode = () => {
    setIsRunning(true);
    setTimeout(() => {
      let result = '';
      try {
        if (language === 'javascript' && userCode.includes('console.log')) {
          const match = userCode.match(/console\.log\(['\"`]?(.*?)['\"`]?\)/);
          result = match?.[1] || 'No Output';
        } else if (language === 'python' && userCode.includes('print(')) {
          const match = userCode.match(/print\(['\"`]?(.*?)['\"`]?\)/);
          result = match?.[1] || 'No Output';
        } else {
          result = 'Code executed';
        }
        setOutput(result);

        const expected = challenge.expectedOutput?.toLowerCase() || '';
        const resLower = result.toLowerCase();

        if (resLower.includes(expected) || expected.includes(resLower)) {
          setIsCorrect(true);
          toast.success('✅ Correct!');
          setShowSolution(true);
          onSuccess();
        } else {
          setIsCorrect(false);
          setShowSolution(true);
          toast.error('❌ Incorrect Output');
        }
      } catch {
        setOutput('Error occurred');
        setIsCorrect(false);
        setShowSolution(true);
      }
      setIsRunning(false);
    }, 800);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
      <label style={{ fontWeight: '600' }}>
        Language:
        <select value={language} onChange={(e) => setLanguage(e.target.value)} style={{ marginLeft: 12, padding: 6, borderRadius: 4 }}>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
        </select>
      </label>

      <textarea
        value={userCode}
        onChange={(e) => setUserCode(e.target.value)}
        placeholder="Write your code here..."
        style={{
          minHeight: 220,
          fontFamily: 'monospace',
          fontSize: 15,
          padding: 14,
          background: '#1e1e1e',
          border: '1px solid #555',
          borderRadius: 6,
          color: '#fff'
        }}
      />

      <button
        onClick={runCode}
        disabled={isRunning || !userCode.trim()}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          padding: '10px 18px',
          borderRadius: 6,
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        <Play size={16} />
        {isRunning ? 'Running...' : 'Run Code'}
      </button>

      {output && (
        <div style={{ background: '#eef', padding: '1.2rem', borderRadius: 8, border: '1px solid #ccc' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', marginBottom: 8 }}>
            Output
            {isCorrect !== null && (
              isCorrect ? <Check color="green" size={18} /> : <X color="red" size={18} />
            )}
          </div>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{output}</pre>
          {challenge.expectedOutput && (
            <div style={{ marginTop: '0.8rem', color: '#0044cc', fontWeight: 500 }}>
              <strong>Expected:</strong> {challenge.expectedOutput}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const TechQuest = () => {
  const [challenge, setChallenge] = useState(null);
  const [points, setPoints] = useState(0);
  const [showSolution, setShowSolution] = useState(false);

  const handleStart = async (category, difficulty) => {
    setShowSolution(false);
    const question = await fetchGeminiQuestion(category, difficulty);
    setChallenge(question);
  };

  const handleSuccess = () => {
    if (challenge) {
      setPoints((prev) => prev + challenge.points);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: 960, margin: '0 auto', fontFamily: 'Segoe UI, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{
          fontSize: '2.2rem',
          fontWeight: 'bold',
          background: 'linear-gradient(to right, rgb(124, 84, 158), rgb(100, 64, 172))',
          WebkitBackgroundClip: 'text',
          color: 'transparent'
        }}>
          TechQuest
        </h1>
        <div style={{
          border: '1px solid #999',
          padding: '6px 14px',
          borderRadius: 8,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          background: '#fafafa'
        }}>
          <Star size={16} />
          <span style={{ fontWeight: '600' }}>{points} pts</span>
        </div>
      </div>

      {!challenge ? (
        <div style={{ marginTop: '2.2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: 16 }}>Select Challenge</h2>
          <div style={{ display: 'flex', gap: '2rem' }}>
            {['webdev', 'ml'].map((cat) => (
              <div key={cat} style={{ flex: 1 }}>
                <h4 style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
                  {cat === 'webdev' ? <Code size={18} /> : <Brain size={18} />} {cat === 'webdev' ? 'Web Dev' : 'Machine Learning'}
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {['easy', 'medium', 'hard'].map((diff) => (
                    <button
                      key={diff}
                      onClick={() => handleStart(cat, diff)}
                      style={{
                        background: diff === 'easy' ? '#28a745' : diff === 'medium' ? '#ffc107' : '#dc3545',
                        color: diff === 'medium' ? 'black' : 'white',
                        padding: '10px',
                        fontWeight: 600,
                        fontSize: '0.95rem',
                        border: 'none',
                        borderRadius: 6,
                        cursor: 'pointer'
                      }}
                    >
                      {diff.charAt(0).toUpperCase() + diff.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ marginTop: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>{challenge.title}</h2>
          <p style={{ margin: '1rem 0', lineHeight: 1.5 }}>{challenge.description}</p>
          <CodeEditor challenge={challenge} onSuccess={handleSuccess} setShowSolution={setShowSolution} />
          {showSolution && (
            <div style={{ marginTop: '2rem', background: '#f9f9f9', padding: '1rem', borderRadius: 6, border: '1px solid #ddd' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: 8 }}>✅ Solution</h3>
              <pre style={{ whiteSpace: 'pre-wrap', fontSize: 14, color: '#333' }}>{challenge.solution}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TechQuest;
