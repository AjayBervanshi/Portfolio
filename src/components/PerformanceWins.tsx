import { motion } from "framer-motion";
import { Activity, ShieldCheck, DatabaseZap, Workflow, Network, Cloud } from "lucide-react";

interface WinCardProps {
    title: string;
    problem: string;
    whatIDid: string;
    tools: string;
    impact: string;
    icon: any;
    delay: number;
}

const WinCard = ({ title, problem, whatIDid, tools, impact, icon: Icon, delay }: WinCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay }}
            className="bg-slate-900/60 backdrop-blur-md rounded-xl p-8 border border-slate-700/50 hover:border-emerald-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] relative overflow-hidden group flex flex-col h-full"
        >
            <div className="absolute top-0 right-0 w-32 h-32 blur-3xl rounded-full opacity-0 group-hover:opacity-10 bg-emerald-500 transition-opacity duration-500" />

            <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 mr-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors leading-tight">{title}</h3>
            </div>

            <div className="space-y-4 flex-grow text-sm">
                <div>
                    <span className="text-cyan-400 font-semibold mb-1 block">Problem:</span>
                    <p className="text-slate-300 leading-relaxed">{problem}</p>
                </div>

                <div>
                    <span className="text-cyan-400 font-semibold mb-1 block">Solution:</span>
                    <p className="text-slate-300 leading-relaxed">{whatIDid}</p>
                </div>

                <div>
                    <span className="text-cyan-400 font-semibold mb-1 block">Tools Used:</span>
                    <p className="text-slate-400 font-mono text-xs bg-slate-950 p-2 rounded border border-slate-800">
                        {tools}
                    </p>
                </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800">
                <span className="text-emerald-400 font-bold block mb-1">Impact:</span>
                <p className="text-slate-200 font-medium">{impact}</p>
            </div>
        </motion.div>
    );
};

export const PerformanceWins = () => {
    return (
        <section id="wins" className="py-20 px-6 relative bg-slate-900/30 border-y border-cyan-500/10">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center justify-center space-x-2 bg-emerald-500/10 text-emerald-400 px-4 py-1.5 rounded-full text-sm font-medium mb-4 border border-emerald-500/20"
                    >
                        <Activity size={16} />
                        <span>Production Highlights</span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight"
                    >
                        Performance <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Wins</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-slate-400 max-w-2xl mx-auto text-lg italic"
                    >
                        "Real production scenarios solved while working as a SQL Server DBA at Wipro supporting HDFC Bank infrastructure."
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    <WinCard
                        title="Job Automation Setup"
                        problem="SQL Agent job failures were difficult to monitor across multiple servers."
                        whatIDid="Built automated monitoring queries using SQL Agent tables. Created scripts to extract job failures."
                        tools="T-SQL, SQL Server Agent"
                        impact="Faster failure detection. Reduced troubleshooting time by over 60%."
                        icon={Activity}
                        delay={0.1}
                    />

                    <WinCard
                        title="Centralized Reporting"
                        problem="Backup verification required manual checks on 30+ databases."
                        whatIDid="Developed centralized scripts to collect backup statuses. Generated automated CSV reports."
                        tools="SQLCMD, Dynamic SQL"
                        impact="Eliminated daily manual backup checks. 100% automated auditing."
                        icon={DatabaseZap}
                        delay={0.2}
                    />

                    <WinCard
                        title="Failover Health Checks"
                        problem="Validating server health during DR drills was extremely time intensive."
                        whatIDid="Created a master PowerShell script invoking secondary validation scripts across all targets."
                        tools="PowerShell, AlwaysOn AG"
                        impact="Cut failover validation time from 40 minutes to under 5 minutes."
                        icon={ShieldCheck}
                        delay={0.3}
                    />

                    <WinCard
                        title="Space Management"
                        problem="TempDB contention and rapid log file growth caused unexpected outages."
                        whatIDid="Automated tracking of drive space and file growths. Reconfigured TempDB files."
                        tools="Perfmon, DMVs"
                        impact="Zero space-related outages over 12 months. Smoother query processing."
                        icon={Network}
                        delay={0.4}
                    />

                    <WinCard
                        title="AWS Migration Optimization"
                        problem="Lift-and-shift to AWS resulted in poor IOPS performance."
                        whatIDid="Analyzed cloud storage limits. Re-provisioned EBS volumes optimized for SQL Server."
                        tools="AWS EC2, AWS EBS"
                        impact="300% increase in read/write speeds, removing the storage bottleneck."
                        icon={Cloud}
                        delay={0.5}
                    />

                    <WinCard
                        title="Index Maintenance"
                        problem="Generic maintenance plans caused blocking during business hours."
                        whatIDid="Deployed custom, intelligent index rebuild/reorganize scripts based on fragmentation."
                        tools="T-SQL, Ola Hallengren scripts"
                        impact="Reduced nighttime maintenance window by 2 hours. Eliminated daylight blocking."
                        icon={Workflow}
                        delay={0.6}
                    />
                </div>
            </div>
        </section>
    );
};
