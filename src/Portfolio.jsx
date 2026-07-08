import React, { useEffect, useRef, useState } from "react";

const COMMANDS = [
  { cmd: "whoami", section: "header" },
  { cmd: "cat education.txt", section: "education" }, // Moved up after intro
  { cmd: "cat summary.txt", section: "summary" },
  { cmd: "cat skills.txt", section: "skills" },
  { cmd: "cat experience.txt", section: "experience" },
  { cmd: "cat projects.txt", section: "projects" },
];

const SECTIONS = [
  { id: "header", label: "Profile" },
  { id: "summary", label: "Summary" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
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
      role: "Big Data Software Engineer",
      contact: "+91-8810614670 | shashwatnath30@gmail.com",
      links: [
        { label: "[ LinkedIn ]", url: "https://www.linkedin.com/in/shashwat-nath-077128168/" },
        { label: "[ GitHub ]", url: "https://github.com/Magmastorm3007" },
        { label: "[ Blog ]", url: "https://magmastorm.hashnode.dev/" },
        { label: "[ Twitter ]", url: "https://x.com/magmastorm30" },
        { label: "[ LeetCode ]", url: "https://leetcode.com/u/user5454Z" },
        { label: "[ Certification ]", url: "https://credentials.databricks.com/7a042f2c-0699-4c5d-9813-835d488da0d7" },
        { label: "[ Databricks Gen-AI ]", url: "https://credentials.databricks.com/89026dcd-64be-455b-a57b-8af1d6c0b2b5#acc.tTEkLIbs" }
      ],
      location: "Delhi, India",
      photo: import.meta.env.BASE_URL + "Assets/dp1.jpg" 
    },
    summary: "Big Data Software Engineer with 2+ years of experience in IT industry working with prominent Fortune 500 companies, certified in Data Engineering and GenAI. At LTM/LTIMindtree, I specialize in architecting enterprise-grade ETL pipelines with Cloud Data Engineering and Databricks. I'm passionate about technical excellence, cloud scalability, and integrating AI into modern workflows.",
    skills: {
      languages: [ "Python", "SQL", "HiveQL", "Shell Scripting (Debian/Arch)", "C++", "JavaScript (Node.js, React)"],
      data: ["AWS (Lambda, Glue, Step Functions, EC2, S3)", "PySpark", "Databricks", "Airflow", "Hadoop", "Hive", "Hyperledger"],
      devops: ["CI/CD (GitHub Actions/GitLab)", "Pytest", "Jest", "SonarQube", "Splunk", "Docker", "Kubernetes"],
    },
    experience: [
      {
        role: "Data Engineer",
        company: "LTIMindtree",
        period: "Dec 2024 – Present",
        description: "I played a crucial role in payroll data delivery for a Fortune 200 insurance/banking client, working closely with business users, upstream teams, and operations to keep the pipeline reliable. We built Spark and Glue ETL for payroll records with incremental CDC, tuned batch jobs using various spark optimization methods to finish in <strong>5–8 minutes as per SLA</strong>, and moved ingestion to a serverless stack using Lambda, Step Functions, Glue, SQS, and SNS. I coordinated Stonebranch/AutoSys orchestration, migrated <strong>180+ tables</strong> from MSSQL to Aurora PostgreSQL with SCT/DMS, and kept deployments stable through GitLab CI/CD, Pytest, Splunk, and CloudWatch, fixing <strong>10+ security vulnerability issues and Code Coverage upto 75%</strong>. I also contribute to AML data infrastructure on Hive/Hadoop/AWS so BI and downstream systems receive trusted, ready-to-use data.",
      },
      {
        role: "Software Developer (Contract)",
        company: "Sabarmati Technologies",
        period: "Jul 2024 – Nov 2024",
        description: "I was tasked with developing a prototype proposal for a high-traffic government digital platform. My focus was on building secure RESTful APIs and implementing complex Role-Based Access Control (RBAC). To ensure the system could handle <strong>200+ concurrent users</strong>, I used a Node.js/React stack with my team and integrated Redis caching to keep API latency at an absolute minimum. We also discussed future plans to incorporate state-based sharding for database scalability.",
      },
      {
        role: "Software Developer Intern / FTE",
        company: "Human AI",
        period: "Dec 2023 – Jun 2024",
        description: "Working with the Human AI team, I built backend microservices for an IoT water monitoring system for a water sustainability client. This was a deep dive into streaming data (<strong>1000+ liters daily</strong>) from IoT systems and Web3 interfaces. I refactored our Node.js services on AWS EC2 to cut the memory footprint by up to <strong>1GB</strong> and deployed a blockchain-verified dashboard with <strong>on-chain verification using Hyperledger Besu </strong> to ensure data integrity for carbon credit auditing.",
      }
    ],
    projects: [
      {
        title: "Set Memory (NPM CLI)",
        url: "https://www.npmjs.com/package/set-memory",
        label: "[ NPM Package ]",
        desc: "A Node.js utility that dynamically tunes V8 garbage collection based on hardware to prevent OOM crashes. (<strong>500+ Downloads</strong>)"
      },
      {
        title: "VG Sales Analytics",
        url: "https://github.com/Magmastorm3007/vgsales_analytics",
        label: "[ GitHub ]",
        desc: "Personal analytics project visualizing video game sales trends with Databricks Lakehouse Platform, using lakeflow declarative pipelines, jobs and AI for prediction. Designed to support data-driven decisions and interactive reporting."
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
          <div id="header" className="section-container output-block header-layout">
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
        return (
          <div id="summary" className="section-container output-block narrative" dangerouslySetInnerHTML={{ __html: resume.summary }} />
        );
      case "skills": 
        return (
          <div id="skills" className="section-container output-block">
            <div><span className="skill-label">Languages:</span> {resume.skills.languages.join(", ")}</div>
            <div><span className="skill-label">Data:</span> {resume.skills.data.join(", ")}</div>
            <div><span className="skill-label">DevOps:</span> {resume.skills.devops.join(", ")}</div>
          </div>
        );
      case "experience":
        return (
          <div id="experience" className="section-container">
            {resume.experience.map((e, i) => (
              <div key={i} className="output-block" style={{ marginBottom: "30px" }}>
                <div style={{ color: "#fff", fontWeight: "bold" }}>{e.role} @ {e.company}</div>
                <div style={{ color: "#8b949e", fontSize: "0.85rem", marginBottom: "8px" }}>{e.period}</div>
                <div className="narrative border-left" dangerouslySetInnerHTML={{ __html: e.description }} />
              </div>
            ))}
          </div>
        );
      case "projects":
        return (
          <div id="projects" className="section-container project-list">
            {resume.projects.map((p, i) => (
              <div key={i} className="project-card output-block">
                <div className="project-title">{p.title}</div>
                <div className="narrative project-desc">{p.desc}</div>
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="terminal-link project-link">
                  {p.label}
                </a>
              </div>
            ))}
          </div>
        );
      case "education":
        return (
          <div id="education" className="section-container output-block border-left">
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
      .section-nav {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        padding: 12px 14px;
        margin-bottom: 20px;
        border: 1px solid rgba(121, 192, 255, 0.25);
        background: rgba(17, 25, 40, 0.95);
        position: sticky;
        top: 0;
        z-index: 5;
      }
      .section-pill {
        padding: 8px 12px;
        border-radius: 999px;
        color: #c9d1d9;
        background: rgba(57, 255, 20, 0.08);
        text-decoration: none;
        font-size: 0.9rem;
      }
      .section-pill:hover {
        background: rgba(57, 255, 20, 0.18);
        color: #39ff14;
      }
      .section-container { padding: 15px 0; }
      .project-list { display: grid; gap: 16px; }
      .project-card {
        background: rgba(12, 18, 28, 0.95);
        border: 1px solid rgba(121, 192, 255, 0.15);
        border-radius: 12px;
        padding: 18px;
      }
      .project-title { color: #fff; font-weight: bold; margin-bottom: 8px; }
      .project-desc { margin-bottom: 10px; color: #b1bac4; }
      .project-link { display: inline-block; margin-top: 4px; }
        
        .header-layout { display: flex; align-items: center; gap: 30px; }
        .profile-photo { 
          width: 120px; height: 120px; border-radius: 50%; 
          border: 2px solid #39ff14; object-fit: cover;
          box-shadow: 0 0 15px rgba(57, 255, 20, 0.2);
        }
        .name-text { color: #fff; font-size: 1.6rem; font-weight: bold; }
        
        .narrative { line-height: 1.6; text-align: justify; color: #b1bac4; }
        strong { color: #39ff14; font-weight: bold; }
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

      {commandIndex >= COMMANDS.length && (
        <nav className="section-nav">
          {SECTIONS.map((section) => (
            <a key={section.id} href={`#${section.id}`} className="section-pill">
              {section.label}
            </a>
          ))}
        </nav>
      )}

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
