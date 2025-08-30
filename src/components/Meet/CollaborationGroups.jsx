import React, { useState } from 'react';

const groups = [
  {
    name: 'AI Explorers',
    members: 42,
    description: 'Dive into the world of Artificial Intelligence and Machine Learning with enthusiasts who love experimenting with neural networks, NLP, and computer vision.',
    commonSkills: ['Python', 'TensorFlow', 'OpenCV'],
    link: 'https://chat.whatsapp.com/AIExplorersLink'
  },
  {
    name: 'Web Wizards',
    members: 58,
    description: 'Frontend & Backend developers working together on full-stack projects, sharing resources, and conducting regular code reviews.',
    commonSkills: ['React', 'Node.js', 'MongoDB', 'Express'],
    link: 'https://chat.whatsapp.com/WebWizardsLink'
  },
  {
    name: 'Cloud Climbers',
    members: 35,
    description: 'This group is for those exploring the cloud domain — AWS, Azure, GCP. We deploy, monitor, scale apps, and discuss real-world use cases.',
    commonSkills: ['AWS', 'Docker', 'Terraform'],
    link: 'https://chat.whatsapp.com/CloudClimbersLink'
  },
  {
    name: 'DevOps Den',
    members: 27,
    description: 'Explore CI/CD, automation, infrastructure as code, and reliability engineering. Get real deployment practice!',
    commonSkills: ['GitHub Actions', 'Kubernetes', 'Jenkins'],
    link: 'https://chat.whatsapp.com/DevOpsDenLink'
  },
  {
    name: 'Android Avengers',
    members: 44,
    description: 'A group dedicated to Android app development — both Java and Kotlin. Share UI/UX ideas, Firebase integration, and get feedback.',
    commonSkills: ['Kotlin', 'Jetpack Compose', 'Firebase'],
    link: 'https://chat.whatsapp.com/AndroidAvengersLink'
  },
  {
    name: 'DSA Knights',
    members: 61,
    description: 'Master Data Structures and Algorithms with daily practice, contests, and peer learning. LeetCode + CP focused.',
    commonSkills: ['C++', 'Java', 'Problem Solving'],
    link: 'https://chat.whatsapp.com/DSAKnightsLink'
  },
  {
    name: 'Web Dev Hackers',
    members: 28,
    description: 'Frontend & Backend developers working together on full-stack projects, sharing resources, and conducting regular code reviews.',
    commonSkills: ['React', 'Node.js', 'MongoDB', 'Express'],
    link: 'https://chat.whatsapp.com/WebDevHackersLink'
  },
  {
    name: 'Tech Innovators',
    members: 22,
    description: 'Exploring new technologies with hands-on collaborative projects. Focused on modern tech and innovation.',
    commonSkills: ['React', 'Next.js', 'Firebase'],
    link: 'https://chat.whatsapp.com/TechInnovatorsLink'
  },
  {
    name: 'Hackathon Hustlers',
    members: 38,
    description: 'Find your next hackathon teammates, get winning tips, and prepare together for SIH, Google Challenge, and more.',
    commonSkills: ['Idea Pitching', 'Rapid Prototyping', 'Collaboration'],
    link: 'https://chat.whatsapp.com/HackathonHustlersLink'
  }
];

const CollaborationGroups = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.commonSkills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div style={{
      background: 'linear-gradient(to right, #e6f2ff, #ffffff)',
      minHeight: '100vh',
      padding: '50px 20px',
      fontFamily: 'Segoe UI, sans-serif'
    }}>
      <h2 style={{
        textAlign: 'center',
        color: '#004c99',
        fontSize: '2.5rem',
        marginBottom: '40px',
        fontWeight: 'bold'
      }}>
        🤝 Explore Collaboration Groups
      </h2>

      <div style={{ maxWidth: '500px', margin: '0 auto 40px' }}>
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="🔍 Search by group or skill..."
          style={{
            width: '100%',
            padding: '14px 18px',
            borderRadius: '12px',
            border: '1px solid #a4d4ff',
            fontSize: '1rem',
            boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
            outlineColor: '#66bfff'
          }}
        />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '35px',
        padding: '0 10px'
      }}>
        {filteredGroups.length > 0 ? (
          filteredGroups.map((group, idx) => (
            <div key={idx} style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              border: '1px solid #d6ecff',
              padding: '25px',
              boxShadow: '0 8px 25px rgba(0, 122, 204, 0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden'
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 122, 204, 0.2)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 122, 204, 0.1)';
              }}
            >
              <div style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: '#e0f4ff',
                color: '#0077cc',
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                {group.members} Members
              </div>
              <div>
                <h3 style={{
                  color: '#007acc',
                  fontSize: '1.3rem',
                  fontWeight: '600',
                  marginBottom: '10px'
                }}>{group.name}</h3>
                <p style={{
                  fontSize: '0.97rem',
                  color: '#444',
                  marginBottom: '12px',
                  lineHeight: '1.5'
                }}>{group.description}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '15px' }}>
                  {group.commonSkills.map((skill, i) => (
                    <span key={i} style={{
                      backgroundColor: '#f0f9ff',
                      padding: '6px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      color: '#005f99',
                      border: '1px solid #cce7ff'
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <a
                href={group.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  marginTop: '10px',
                  padding: '10px',
                  textAlign: 'center',
                  backgroundColor: '#25D366',
                  color: '#fff',
                  fontWeight: 'bold',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.backgroundColor = '#1ebe57';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.backgroundColor = '#25D366';
                }}
              >
                 Join Now
              </a>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', color: '#999', fontSize: '1.1rem' }}>
            😕 No groups match your search
          </p>
        )}
      </div>
    </div>
  );
};

export default CollaborationGroups;
