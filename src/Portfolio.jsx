import React, { useEffect, useRef, useState } from "react";

const COMMANDS = [
  { cmd: "whoami", section: "header" },
  { cmd: "cat summary.txt", section: "summary" },
  { cmd: "cat skills.txt", section: "skills" },
  { cmd: "cat experience.txt", section: "experience" },
  { cmd: "cat projects.txt", section: "projects" },
  { cmd: "cat education.txt", section: "education" },
];

const Portfolio = () => {
  const [history, setHistory] = useState([]);
  const [currentText, setCurrentText] = useState("");
  const [commandIndex, setCommandIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  const bottomRef = useRef(null);

  const resume = {
    header: {
      name: "SHASHWAT NATH",
      role: "Software & Data Engineer",
      contact: "+91-8810614670 | shashwatnath30@gmail.com",
      links: "LinkedIn | GitHub | LeetCode",
      location: "Delhi, India",
      photo: "/Assets/dp1.jpg" // Replace with your actual photo URL
    },
    summary: "Software and Data Engineer with 2+ years of experience. Currently at LTIMindtree, I specialize in architecting enterprise-grade ETL pipelines and serverless AWS environments. I'm passionate about technical excellence, cloud scalability, and integrating AI into modern workflows.",
    skills: {
      languages: ["C++", "Python", "JavaScript (ES6+)", "SQL"],
      backend: ["Node.js", "Next.js", "React.js", "Redis", "Kafka", "PostgreSQL", "MongoDB"],
      cloud: ["AWS (Lambda, Glue, Step Functions, EC2, S3)", "PySpark", "GCP", "Airflow", "Hyperledger"],
      devops: ["CI/CD (GitHub Actions/GitLab)", "Pytest", "Jest", "SonarQube", "Splunk", "Docker", "Kubernetes"],
    },
    experience: [
      {
        role: "Data Engineer",
        company: "LTIMindtree",
        period: "Dec 2024 – Present",
        description: "In my current role, I focus on a critical Insurance Payroll Application for a US-based Fortune 500 firm. I spearheaded a major cloud migration from legacy Informatica systems to AWS, utilizing Glue and Step Functions to achieve a 40% cost reduction. A typical day involves fine-tuning distributed Spark jobs—where I've managed to boost performance by up to 50% for 10M+ daily records—and maintaining high production reliability through GitLab CI/CD and SonarQube quality gates."
      },
      {
        role: "Software Developer (Contract)",
        company: "Sabarmati Technologies",
        period: "Jul 2024 – Nov 2024",
        description: "I was tasked with developing a high-traffic government digital platform. My focus was on building secure RESTful APIs and implementing complex Role-Based Access Control (RBAC). To ensure the system could handle 200+ concurrent users without breaking a sweat, I used a Node.js/React stack and integrated Redis caching to keep API latency at an absolute minimum."
      },
      {
        role: "Software Developer Intern / FTE",
        company: "Human AI",
        period: "Dec 2023 – Jun 2024",
        description: "Working with the Singapore Arcade team, I built backend microservices for an IoT water monitoring system. This was a deep dive into telemetry data (1000+ liters daily) and Web3 interfaces. I refactored our Node.js services on AWS EC2 to cut the memory footprint by 1GB and deployed a blockchain-verified dashboard using Hyperledger Besu to ensure data integrity for carbon credit auditing."
      }
    ],
    projects: [
      {
        title: "Set Memory (NPM CLI)",
        desc: "A Node.js utility that dynamically tunes V8 garbage collection based on hardware to prevent OOM crashes. (500+ Downloads)"
      },
      {
        title: "Breast Cancer Detection AI",
        desc: "Optimized SVM/KNN algorithms to achieve 96% accuracy. Published in Springer and awarded Best Paper at ICICC 2022."
      }
    ],
    education: {
      degree: "B.Tech in Information Technology",
      college: "Manipal University Jaipur (2020-2024)",
      cgpa: "8.53 / 10"
    }
  };

  useEffect(() => {
    if (commandIndex >= COMMANDS.length) return;
    let isCancelled = false;
    const commandObj = COMMANDS[commandIndex];
    
    const startTyping = () => {
      setIsTyping(true);
      let charIndex = 0;
      const fullText = commandObj.cmd;

      const typingInterval = setInterval(() => {
        if (isCancelled) { clearInterval(typingInterval); return; }
        setCurrentText(fullText.substring(0, charIndex + 1));
        charIndex++;

        if (charIndex === fullText.length) {
          clearInterval(typingInterval);
          setIsTyping(false);
          setTimeout(() => {
            if (!isCancelled) {
              setHistory(prev => [...prev, { type: "command", value: fullText }, { type: "output", section: commandObj.section }]);
              setCommandIndex(prev => prev + 1);
            }
          }, 600);
        }
      }, 50);
    };

    const timeout = setTimeout(startTyping, commandIndex === 0 ? 2000 : 400);
    return () => { isCancelled = true; clearTimeout(timeout); };
  }, [commandIndex]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, currentText]);

  const renderOutput = (section) => {
    switch (section) {
      case "header":
        return (
          <div className="output-block header-layout">
            <div className="photo-container">
              <img src={resume.header.photo} alt="Profile" className="profile-photo" />
            </div>
            <div className="header-details">
              <div className="name-text">{resume.header.name}</div>
              <div style={{ color: "#39ff14", fontWeight: "bold" }}>{resume.header.role}</div>
              <div>{resume.header.contact}</div>
              <div>{resume.header.location}</div>
              <div style={{ color: "#79c0ff", marginTop: "5px" }}>{resume.header.links}</div>
            </div>
          </div>
        );
      case "summary":
        return <div className="output-block narrative">{resume.summary}</div>;
      case "skills":
        return (
          <div className="output-block">
            <div><span className="skill-label">Languages:</span> {resume.skills.languages.join(", ")}</div>
            <div><span className="skill-label">Backend:</span> {resume.skills.backend.join(", ")}</div>
            <div><span className="skill-label">Cloud:</span> {resume.skills.cloud.join(", ")}</div>
            <div><span className="skill-label">DevOps:</span> {resume.skills.devops.join(", ")}</div>
          </div>
        );
      case "experience":
        return resume.experience.map((e, i) => (
          <div key={i} className="output-block" style={{ marginBottom: "30px" }}>
            <div style={{ color: "#fff", fontWeight: "bold" }}>{e.role} @ {e.company}</div>
            <div style={{ color: "#8b949e", fontSize: "0.85rem", marginBottom: "8px" }}>{e.period}</div>
            <div className="narrative border-left">{e.description}</div>
          </div>
        ));
      case "projects":
        return resume.projects.map((p, i) => (
          <div key={i} className="output-block">
            <span style={{ color: "#fff", fontWeight: "bold" }}>{p.title}</span> — <span className="narrative">{p.desc}</span>
          </div>
        ));
      case "education":
        return (
          <div className="output-block">
            <div style={{ color: "#fff" }}>{resume.education.degree}</div>
            <div>{resume.education.college}</div>
            <div style={{ color: "#d2a8ff" }}>CGPA: {resume.education.cgpa}</div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="terminal">
      <style>{`
        html, body { margin: 0; background: #0d1117; }
        .terminal {
          min-height: 100vh;
          background: #0d1117;
          color: #c9d1d9;
          font-family: "Courier New", monospace;
          padding: 40px 20px;
          box-sizing: border-box;
          font-size: 15px;
        }
        .spacer { height: 75vh; display: flex; align-items: flex-end; padding-bottom: 40px; color: #58a6ff; }
        .prompt { color: #d2a8ff; font-weight: bold; }
        .path { color: #79c0ff; }
        .output-block { margin: 15px 0 30px 0; }
        
        /* Header Layout */
        .header-layout { display: flex; align-items: center; gap: 30px; }
        .profile-photo { 
          width: 120px; height: 120px; border-radius: 50%; 
          border: 2px solid #39ff14; object-fit: cover;
          box-shadow: 0 0 15px rgba(57, 255, 20, 0.2);
        }
        .name-text { color: #fff; font-size: 1.6rem; font-weight: bold; }
        
        .narrative { line-height: 1.6; text-align: justify; color: #b1bac4; }
        .border-left { border-left: 2px solid #2d2e2d; padding-left: 15px; }
        .skill-label { color: #79c0ff; font-weight: bold; }
        .cursor {
          display: inline-block; width: 8px; height: 16px; background: #39ff14;
          animation: blink 1s infinite; margin-left: 5px; vertical-align: middle;
        }
        @keyframes blink { 50% { opacity: 0; } }
        
        @media (max-width: 600px) {
          .header-layout { flex-direction: column; align-items: flex-start; gap: 15px; }
          .profile-photo { 
  width: 130px; 
  height: 130px; 
  border-radius: 50%; 
  border: 2px solid #39ff14; 
  
  /* 1. Ensure this is set to cover so it fills the circle */
  object-fit: cover; 
  
  /* 2. THE FIX: The first value is horizontal (center), 
     the second is vertical. Reducing the % moves the 'camera' UP.
     Try 20% or 10% to show more of your head/hair. */
  object-position: center 15%; 
  
  /* 3. If it still feels too 'zoomed in', add this to shrink 
     the image within the circle frame */
  transform: scale(1.0); 

  box-shadow: 0 0 15px rgba(57, 255, 20, 0.2);
}
        }
      `}</style>

      <div className="spacer">
        <div>
          Last login: {new Date().toLocaleTimeString()} on ttys001<br />
          [SYSTEM]: Initializing Shashwat_Nath_Profile...<br />
          [SYSTEM]: Fetching secure data from AWS_S3... [OK]<br />
          [SYSTEM]: Loading experience modules... [OK]
        </div>
      </div>

      {history.map((item, i) =>
        item.type === "command" ? (
          <div key={i}><span className="prompt">shashwat@admin</span>:<span className="path">~</span>$ {item.value}</div>
        ) : (
          <div key={i}>{renderOutput(item.section)}</div>
        )
      )}

      {commandIndex < COMMANDS.length && (
        <div>
          <span className="prompt">shashwat@admin</span>:<span className="path">~</span>$ {currentText}
          <span className="cursor" />
        </div>
      )}

      <div ref={bottomRef} style={{ height: "100px" }} />
    </div>
  );
};

export default Portfolio;