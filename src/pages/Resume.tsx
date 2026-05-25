import { ArrowLeft, Printer } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PERSONAL_INFO } from "@/utils/constants";

const Resume = () => {
    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-slate-100 text-slate-900 font-sans print:bg-white selection:bg-emerald-200">
            {/* Sticky Header — hidden when printing */}
            <div className="sticky top-0 z-50 bg-slate-900 text-white shadow-md print:hidden px-6 py-4 flex justify-between items-center">
                <Link to="/">
                    <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-slate-800">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Portfolio
                    </Button>
                </Link>
                <Button onClick={handlePrint} className="bg-emerald-600 hover:bg-emerald-500 text-white">
                    <Printer className="mr-2 h-4 w-4" /> Print / Save as PDF
                </Button>
            </div>

            {/* Resume Content */}
            <div className="max-w-4xl mx-auto bg-white p-12 md:p-16 my-8 shadow-xl print:shadow-none print:m-0 print:p-8">

                {/* Header */}
                <header className="border-b-4 border-emerald-600 pb-6 mb-8">
                    <h1 className="text-4xl font-bold text-slate-900 mb-1 uppercase tracking-tight">{PERSONAL_INFO.NAME}</h1>
                    <h2 className="text-xl text-emerald-700 font-semibold mb-4">{PERSONAL_INFO.TITLE}</h2>
                    <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-slate-600">
                        <span>📍 {PERSONAL_INFO.LOCATION}</span>
                        <span>✉️ {PERSONAL_INFO.EMAIL}</span>
                        <span>📞 {PERSONAL_INFO.PHONE}</span>
                        <span>🔗 linkedin.com/in/ajay-bervanshi</span>
                    </div>
                </header>

                {/* Professional Summary */}
                <section className="mb-8">
                    <h3 className="text-base font-bold border-b-2 border-slate-200 pb-2 mb-4 text-slate-800 uppercase tracking-widest">Professional Summary</h3>
                    <p className="text-slate-700 leading-relaxed text-sm">
                        Results-driven MS SQL Server Database Administrator with {new Date().getFullYear() - 2022}+ years of experience managing, securing, and optimizing mission-critical database infrastructures in high-stakes financial and enterprise environments. Proven track record at Wipro supporting HDFC Bank infrastructure and currently at Pall Corporation. Specialist in high availability, disaster recovery, query tuning, AWS cloud integration, and PowerShell automation.
                    </p>
                </section>

                {/* Core Competencies */}
                <section className="mb-8">
                    <h3 className="text-base font-bold border-b-2 border-slate-200 pb-2 mb-4 text-slate-800 uppercase tracking-widest">Core Competencies</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-1 text-slate-700 text-sm">
                        <ul className="list-disc list-inside space-y-1">
                            <li>MS SQL Server 2016/2019/2022</li>
                            <li>AlwaysOn Availability Groups</li>
                            <li>Performance Tuning & T-SQL</li>
                            <li>Disaster Recovery (DR) Drills</li>
                        </ul>
                        <ul className="list-disc list-inside space-y-1">
                            <li>Backup & Recovery Strategies</li>
                            <li>Database Replication & Mirroring</li>
                            <li>AWS EC2, S3 & RDS Integration</li>
                            <li>Security & RBAC Enforcement</li>
                        </ul>
                        <ul className="list-disc list-inside space-y-1">
                            <li>PowerShell Automation</li>
                            <li>Index & Query Optimization</li>
                            <li>System Monitoring & Alerts</li>
                            <li>Capacity Planning & Tuning</li>
                        </ul>
                    </div>
                </section>

                {/* Professional Experience */}
                <section className="mb-8">
                    <h3 className="text-base font-bold border-b-2 border-slate-200 pb-2 mb-4 text-slate-800 uppercase tracking-widest">Professional Experience</h3>

                    {/* Pall Corporation */}
                    <div className="mb-6">
                        <div className="flex flex-wrap justify-between items-baseline mb-1">
                            <h4 className="text-base font-bold text-slate-900">MS SQL Database Administrator</h4>
                            <span className="text-emerald-700 font-semibold text-sm">Sep 2025 – Present</span>
                        </div>
                        <div className="text-sm text-slate-600 mb-2 font-medium">Pall Corporation · Pune, Maharashtra, India · Full-time</div>
                        <ul className="list-disc list-outside ml-5 text-slate-700 space-y-1 text-sm leading-relaxed">
                            <li>Administer and maintain MS SQL Server databases ensuring high availability, reliability, and optimal performance for critical applications.</li>
                            <li>Manage and maintain AWS EC2 instances for database hosting and application deployment with secure and efficient operations.</li>
                            <li>Monitor and analyze database performance, implementing indexing, query tuning, and resource optimization techniques.</li>
                            <li>Manage database security, user accounts, and permissions in compliance with organizational policies.</li>
                            <li>Implement and test robust backup and disaster recovery strategies to ensure data integrity and business continuity.</li>
                            <li>Explore and integrate AWS services such as RDS, S3, and CloudWatch for enhanced infrastructure scalability and automation.</li>
                        </ul>
                    </div>

                    {/* Wipro */}
                    <div className="mb-6">
                        <div className="flex flex-wrap justify-between items-baseline mb-1">
                            <h4 className="text-base font-bold text-slate-900">MS SQL Database Administrator</h4>
                            <span className="text-emerald-700 font-semibold text-sm">Jul 2022 – Sep 2025</span>
                        </div>
                        <div className="text-sm text-slate-600 mb-2 font-medium">Wipro Limited (Supporting HDFC Bank Infrastructure) · Mumbai, Maharashtra, India · Full-time</div>
                        <ul className="list-disc list-outside ml-5 text-slate-700 space-y-1 text-sm leading-relaxed">
                            <li>Administered and maintained MS SQL Server databases, ensuring 99.9% uptime for critical banking applications.</li>
                            <li>Enhanced query performance by 20% through restructuring indexing and applying advanced optimization strategies.</li>
                            <li>Conducted quarterly disaster recovery drills, reducing recovery time by 25% by streamlining backup and failover processes.</li>
                            <li>Automated 40% of manual maintenance tasks using PowerShell scripting, saving significant man-hours.</li>
                            <li>Implemented database replication, clustering, and mirroring for high availability and disaster recovery.</li>
                            <li>Orchestrated cross-environment hybrid backups directly to AWS S3 across SQL Server 2014 through 2022.</li>
                        </ul>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {["SQL Server 2016/2019/2022", "T-SQL", "PowerShell", "SSMS", "SQL Profiler", "AlwaysOn AG", "AWS S3"].map(tech => (
                                <span key={tech} className="bg-slate-100 border border-slate-300 text-slate-600 px-2 py-0.5 rounded text-xs">{tech}</span>
                            ))}
                        </div>
                    </div>

                    {/* Internship */}
                    <div>
                        <div className="flex flex-wrap justify-between items-baseline mb-1">
                            <h4 className="text-base font-bold text-slate-900">Front End Web Developer</h4>
                            <span className="text-emerald-700 font-semibold text-sm">Sep 2021 – Oct 2021</span>
                        </div>
                        <div className="text-sm text-slate-600 mb-2 font-medium">Sankalpsoft Solution · Remote, India · Internship</div>
                        <ul className="list-disc list-outside ml-5 text-slate-700 space-y-1 text-sm leading-relaxed">
                            <li>Designed a user-friendly dynamic web interface for a café, enhancing customer interaction.</li>
                            <li>Built a secure blood donation camp registration form with database integration.</li>
                        </ul>
                    </div>
                </section>

                {/* Education */}
                <section className="mb-8">
                    <h3 className="text-base font-bold border-b-2 border-slate-200 pb-2 mb-4 text-slate-800 uppercase tracking-widest">Education</h3>
                    <div className="flex flex-wrap justify-between items-baseline mb-1">
                        <h4 className="text-base font-bold text-slate-900">Bachelor of Computer Application (BCA)</h4>
                        <span className="text-emerald-700 font-semibold text-sm">Completed May 2022</span>
                    </div>
                    <div className="text-sm text-slate-600 font-medium">G. H. Raisoni Institute Of Information Technology · Nagpur, Maharashtra</div>
                    <div className="text-sm text-slate-600 mt-1">GPA: 8.2 / 10 &nbsp;·&nbsp; Specialization: Computer Applications & Programming</div>
                </section>

                {/* Key Achievements */}
                <section>
                    <h3 className="text-base font-bold border-b-2 border-slate-200 pb-2 mb-4 text-slate-800 uppercase tracking-widest">Key Achievements</h3>
                    <ul className="list-disc list-outside ml-5 text-slate-700 space-y-1 text-sm">
                        <li>Improved query performance by <strong>20%</strong> across 500+ stored procedures for HDFC Bank's banking application.</li>
                        <li>Reduced disaster recovery time by <strong>25%</strong> through optimized failover strategies.</li>
                        <li>Automated <strong>40%</strong> of routine DBA maintenance tasks via PowerShell, freeing significant engineering time.</li>
                        <li>Achieved <strong>99.9% uptime</strong> across mission-critical banking databases over 3+ years.</li>
                        <li>Successfully implemented AWS S3 hybrid backup integration across SQL Server 2014–2022 editions.</li>
                    </ul>
                </section>

            </div>
        </div>
    );
};

export default Resume;
