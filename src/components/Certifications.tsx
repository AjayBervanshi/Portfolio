import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Award, CheckCircle2, Clock, Target } from "lucide-react";

interface CertCardProps {
    title: string;
    issuer: string;
    status: "Achieved" | "In Progress" | "Planned";
    description: string;
    relevance: string;
    delay: number;
}

const statusConfig = {
    "Achieved": { color: "bg-emerald-600", icon: CheckCircle2, iconColor: "text-emerald-400", border: "border-emerald-500/30", glow: "hover:shadow-emerald-500/10" },
    "In Progress": { color: "bg-amber-600", icon: Clock, iconColor: "text-amber-400", border: "border-amber-500/30", glow: "hover:shadow-amber-500/10" },
    "Planned": { color: "bg-blue-600", icon: Target, iconColor: "text-blue-400", border: "border-blue-500/30", glow: "hover:shadow-blue-500/10" },
};

const CertCard = ({ title, issuer, status, description, relevance, delay }: CertCardProps) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });
    const config = statusConfig[status];
    const StatusIcon = config.icon;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay }}
            className={`bg-slate-800/60 border ${config.border} rounded-xl p-6 backdrop-blur-sm hover:bg-slate-800/80 hover:shadow-lg ${config.glow} transition-all duration-300 group flex flex-col h-full`}
        >
            <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-slate-900/60 border border-slate-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Award size={24} className={config.iconColor} />
                </div>
                <Badge className={`${config.color} text-white text-xs flex items-center gap-1`}>
                    <StatusIcon size={11} />
                    {status}
                </Badge>
            </div>

            <h3 className="text-white font-semibold text-base mb-1 leading-tight">{title}</h3>
            <p className={`text-sm font-medium mb-3 ${config.iconColor}`}>{issuer}</p>
            <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-grow">{description}</p>

            <div className="border-t border-slate-700/50 pt-3">
                <p className="text-xs text-slate-500">
                    <span className="text-slate-400 font-medium">Relevance: </span>{relevance}
                </p>
            </div>
        </motion.div>
    );
};

export const Certifications = () => {
    const sectionRef = useRef(null);
    const inView = useInView(sectionRef, { once: true, margin: "-100px" });

    const certs = [
        {
            title: "Microsoft Certified: Azure Database Administrator Associate",
            issuer: "Microsoft",
            status: "Planned" as const,
            description: "Validates skills in implementing and managing cloud and on-premises relational databases built with Azure SQL Database and SQL Server.",
            relevance: "Direct extension of current SQL Server expertise to Azure cloud environment.",
        },
        {
            title: "AWS Certified Solutions Architect – Associate",
            issuer: "Amazon Web Services",
            status: "In Progress" as const,
            description: "Validates ability to design distributed systems on AWS — directly applicable to current work managing AWS EC2 instances at Pall Corporation.",
            relevance: "Applied daily — managing EC2, EBS, RDS, S3, and CloudWatch in production.",
        },
        {
            title: "Microsoft Certified: SQL Server (DP-300)",
            issuer: "Microsoft",
            status: "Planned" as const,
            description: "Administering Relational Databases on Microsoft Azure — covers SQL Server on-premises and in the cloud, migration, and performance tuning.",
            relevance: "Formalises 3+ years of hands-on SQL Server experience with an industry credential.",
        },
        {
            title: "Ola Hallengren Maintenance Solution Expert",
            issuer: "Industry Practice",
            status: "Achieved" as const,
            description: "Hands-on expertise implementing and customising Ola Hallengren's widely-adopted SQL Server maintenance solution for index, backup, and integrity checks.",
            relevance: "Used in production at Wipro to reduce maintenance windows by 2+ hours.",
        },
    ];

    return (
        <section id="certifications" className="py-20 px-6 bg-slate-900/30">
            <div className="max-w-6xl mx-auto" ref={sectionRef}>
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.4 }}
                        className="inline-flex items-center gap-2 bg-cyan-500/10 text-cyan-400 px-4 py-1.5 rounded-full text-sm font-medium mb-4 border border-cyan-500/20"
                    >
                        <Award size={15} />
                        <span>Credentials & Certifications</span>
                    </motion.div>
                    <motion.h2
                        className="text-4xl font-bold text-white mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        Certifications
                    </motion.h2>
                    <motion.p
                        className="text-slate-400 max-w-xl mx-auto"
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Industry credentials that validate deep expertise in database administration, cloud infrastructure, and enterprise automation.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {certs.map((cert, i) => (
                        <CertCard key={i} {...cert} delay={i * 0.1} />
                    ))}
                </div>

                {/* Status Legend */}
                <motion.div
                    className="mt-10 flex flex-wrap justify-center gap-4"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    {(["Achieved", "In Progress", "Planned"] as const).map((s) => {
                        const c = statusConfig[s];
                        const Icon = c.icon;
                        return (
                            <div key={s} className="flex items-center gap-2 text-sm text-slate-400">
                                <Icon size={13} className={c.iconColor} />
                                <span>{s}</span>
                            </div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};
