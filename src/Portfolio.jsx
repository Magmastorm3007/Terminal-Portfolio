import React, { useEffect, useRef, useState } from "react";

const COMMANDS = [
  { cmd: "whoami", section: "header" },
  { cmd: "cat education.txt", section: "education" }, // Moved up after intro
  { cmd: "cat summary.txt", section: "summary" },
  { cmd: "cat skills.txt", section: "skills" },
  { cmd: "cat experience.txt", section: "experience" },
  { cmd: "cat projects.txt", section: "projects" },
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
      role: "Data & Software Engineer",
      contact: "+91-8810614670 | shashwatnath30@gmail.com",
      links: [
        { label: "[ LinkedIn ]", url: "https://www.linkedin.com/in/shashwat-nath-077128168/" },
        { label: "[ GitHub ]", url: "https://github.com/Magmastorm3007" },
        { label: "[ Blog ]", url: "https://magmastorm.hashnode.dev/" },
        { label: "[ Twitter ]", url: "https://x.com/magmastorm30" },
        { label: "[ LeetCode ]", url: "https://leetcode.com/u/user5454Z" }
      ],
      location: "Delhi, India",
      photo: import.meta.env.BASE_URL + "Assets/dp1.jpg" 
    },
    summary: "Software and Data Engineer with 2+ years of experience. Currently at LTIMindtree, I specialize in architecting enterprise-grade ETL pipelines and serverless AWS environments. I'm passionate about technical excellence, cloud scalability, and integrating AI into modern workflows.",
    skills: {
      languages: ["C++", "Python", "JavaScript (ES6+)", "SQL"],
      data: ["AWS (Lambda, Glue, Step Functions, EC2, S3)", "PySpark", "GCP", "Airflow", "Hyperledger"],
      backend: ["Node.js", "Next.js", "React.js", "Redis", "Kafka", "PostgreSQL", "MongoDB"],
      devops: ["CI/CD (GitHub Actions/GitLab)", "Pytest", "Jest", "SonarQube", "Splunk", "Docker", "Kubernetes"],
    },
    experience: [
      {
        role: "Data Engineer",
        company: "LTIMindtree",
        period: "Dec 2024 – Present",
        description: "In my current role, I focus on a critical Insurance Payroll Application for a US-based Fortune 500 firm. I became a key contributor to major cloud migration and modernization project from legacy Informatica systems to AWS for the payroll ETL systems, utilizing Glue,Lambda and Step Functions to achieve a 40% cost reduction. A typical day involves fine-tuning distributed Spark jobs—where I've managed to boost performance by up to 30-50% for 10M+ daily records—and maintaining high production code reliability through GitLab CI/CD and SonarQube quality gates. I also managed orchestration with Stonebranch for upstream systems and collaborate closely with onshore cross-functional teams to ensure seamless data flow and integrity."
      },
      {
        role: "Software Developer (Contract)",
        company: "Sabarmati Technologies",
        period: "Jul 2024 – Nov 2024",
        description: "I was tasked with developing a  prototype proposal for a high-traffic government digital platform. My focus was on building secure RESTful APIs and implementing complex Role-Based Access Control (RBAC). To ensure the system could handle 200+ concurrent users, I used a Node.js/React stack with my team and integrated Redis caching to keep API latency at an absolute minimum. We also discussed future plans to incorporate State based sharding for database scalability."
      },
      {
        role: "Software Developer Intern / FTE",
        company: "Human AI",
        period: "Dec 2023 – Jun 2024",
        description: "Working with the Human AI team, I built backend microservices for an IoT water monitoring system for water sustainability client. This was a deep dive into streaming data (1000+ liters daily) from IOT systems and Web3 interfaces. I refactored our Node.js services on AWS EC2 to cut the memory footprint by upto 1G and deployed a blockchain-verified dashboard with on-chain verification using Hyperledger Besu to ensure data integrity for carbon credit auditing."
      }
    ],
    projects: [
      {
        title: "Set Memory (NPM CLI)",
        url: "https://www.npmjs.com/package/set-memory",
        label: "[ NPM Package ]",
        desc: "A Node.js utility that dynamically tunes V8 garbage collection based on hardware to prevent OOM crashes. (500+ Downloads)"
      },
      {
        title: "Breast Cancer Detection AI",
        url: "https://link.springer.com/chapter/10.1007/978-981-19-4990-6_57",
        label: "[ Springer Publication ]",
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
    
    const startTyping = () => {
      setIsTyping(true);
      let charIndex = 0;
      const fullText = COMMANDS[commandIndex].cmd;

      const typingInterval = setInterval(() => {
        if (isCancelled) { clearInterval(typingInterval); return; }
        setCurrentText(fullText.substring(0, charIndex + 1));
        charIndex++;

        if (charIndex === fullText.length) {
          clearInterval(typingInterval);
          setIsTyping(false);
          setTimeout(() => {
            if (!isCancelled) {
              setHistory(prev => [
                ...prev, 
                { type: "command", value: fullText }, 
                { type: "output", section: COMMANDS[commandIndex].section }
              ]);
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
              <div className="link-container" style={{ marginTop: "10px" }}>
                {resume.header.links.map((link, i) => (
                  <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="terminal-link separate-link">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        );
      case "summary":
        return <div className="output-block narrative">{resume.summary}</div>;
      case "skills":
        return (
          <div className="output-block">
            <div><span className="skill-label">Languages:</span> {resume.skills.languages.join(", ")}</div>
            <div><span className="skill-label">Data:</span> {resume.skills.data.join(", ")}</div>
            <div><span className="skill-label">Backend:</span> {resume.skills.backend.join(", ")}</div>
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
            <div style={{ color: "#fff", fontWeight: "bold" }}>{p.title}</div>
            <div className="narrative" style={{ marginBottom: "5px" }}>{p.desc}</div>
            <a href={p.url} target="_blank" rel="noopener noreferrer" className="terminal-link">
              {p.label}
            </a>
          </div>
        ));
      case "education":
        return (
          <div className="output-block border-left">
            <div style={{ color: "#fff", fontWeight: "bold" }}>{resume.education.degree}</div>
            <div style={{ color: "#c9d1d9" }}>{resume.education.college}</div>
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
        
        .header-layout { display: flex; align-items: center; gap: 30px; }
        .profile-photo { 
          width: 120px; height: 120px; border-radius: 50%; 
          border: 2px solid #39ff14; object-fit: cover;
          box-shadow: 0 0 15px rgba(57, 255, 20, 0.2);
        }
        .name-text { color: #fff; font-size: 1.6rem; font-weight: bold; }
        
        .narrative { line-height: 1.6; text-align: justify; color: #b1bac4; }
        .border-left { border-left: 2px solid #39ff14; padding-left: 15px; }
        .skill-label { color: #79c0ff; font-weight: bold; }
        
        .link-container { display: flex; flex-wrap: wrap; gap: 10px; }
        .terminal-link {
          color: #79c0ff;
          text-decoration: none;
          transition: all 0.2s;
        }
        .separate-link {
            padding: 2px 5px;
        }
        .terminal-link:hover {
          color: #39ff14;
          background: rgba(57, 255, 20, 0.1);
        }

        .cursor {
          display: inline-block; width: 8px; height: 16px; background: #39ff14;
          animation: blink 1s infinite; margin-left: 5px; vertical-align: middle;
        }
        @keyframes blink { 50% { opacity: 0; } }
        
        @media (max-width: 600px) {
          .header-layout { flex-direction: column; align-items: flex-start; gap: 15px; }
          .profile-photo { 
            width: 130px; height: 130px;
            object-position: center 15%; 
          }
          .narrative { text-align: left; font-size: 0.9rem; }
          .terminal { padding: 20px 15px; }
          .border-left { padding-left: 10px; }
          .output-block { margin-bottom: 20px; }
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