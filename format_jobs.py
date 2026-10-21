import json

jobs = [
    {
      "id": 1,
      "title": "Senior MS SQL Database Administrator",
      "company": "Pall Corporation",
      "duration": "Sept 2025 — Present",
      "location": "Pune, Maharashtra, India (Hybrid)",
      "type": "Full-Time",
      "summary": "Direct the administration and optimization of critical MS SQL database engines. Build scalable high-availability AlwaysOn clusters, optimize AWS EC2 virtual compute clusters, and maintain extreme system uptime SLA targets.",
      "operations": [
        "**High Availability/DR:** Architected and maintained high-performance multi-node AlwaysOn Availability Group configurations, guaranteeing data failover synchronization.",
        "**Cloud Operations:** Governed AWS EC2 SQL Server compute deployments, designing storage configurations and IOPS limits.",
        "**Performance Tuning:** Performed extensive index structures rebuild plans and run execution diagnostics, reducing average system read query latency.",
        "**Security & Compliance:** Collaborated with development leads to implement secure user permissions schemas and maintain SOX/GDPR regulatory security.",
        "**Automation & Monitoring:** Integrated automated monitoring hooks with AWS CloudWatch and custom Powershell alert frameworks."
      ],
      "tech": ["SQL Server 2022", "T-SQL Tuning", "AlwaysOn AG", "AWS EC2", "Powershell Automation", "SSMS Profiler", "Performance Monitor"],
      "metrics": [
        { "label": "Active Nodes Sync", "value": "2 Nodes Sync", "icon": "Server" },
        { "label": "Storage Managed", "value": "4.5 TB+", "icon": "Building" },
        { "label": "Avg Latency", "value": "18 ms Avg", "icon": "Zap" }
      ]
    },
    {
      "id": 2,
      "title": "MS SQL Database Administrator",
      "company": "Wipro Limited",
      "duration": "July 2022 — Sept 2025",
      "location": "Mumbai, Maharashtra, India (Full-Time)",
      "type": "Full-Time",
      "summary": "Managed the operational database administration lifecycle for major corporate banking clients. Spearheaded replication failover architectures, routine maintenance automation scripts, and critical disaster recovery drills.",
      "operations": [
        "**SLA Compliance:** Guaranteed 99.9% uptime SLA compliance for mission-critical core banking transaction databases.",
        "**Query Optimization:** Re-engineered indexes and optimized parallel MAXDOP hints, boosting general transaction speeds by 20%.",
        "**Disaster Recovery:** Orchestrated quarterly disaster recovery simulations and failovers, lowering RTO durations by 25%.",
        "**Process Automation:** Automated 40% of routine health-check, sizing alerts, and transaction log backup tasks with robust PowerShell scripts."
      ],
      "tech": ["SQL Server 2019", "Database Replication", "AlwaysOn Cluster", "Query Tuning", "Powershell Automation", "Disaster Recovery"],
      "metrics": [
        { "label": "Automation Scripts", "value": "24 Powershell", "icon": "Code" },
        { "label": "Banking Uptime", "value": "99.9% SLA", "icon": "ShieldCheck" },
        { "label": "DR Target RTO", "value": "< 30 Mins", "icon": "Zap" }
      ]
    }
]

print(json.dumps(jobs, indent=2))
