import { Linkedin, Mail, Phone, MapPin, Heart, Database } from "lucide-react";
import { PERSONAL_INFO } from "@/utils/constants";

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-slate-900/95 border-t border-slate-700/50 backdrop-blur-xl py-12 px-6">
            {/* Subtle top gradient */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center space-x-3 mb-3">
                            <div className="w-9 h-9 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                                <Database size={18} className="text-white" />
                            </div>
                            <div className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                                {PERSONAL_INFO.NAME}
                            </div>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            {PERSONAL_INFO.TITLE}
                        </p>
                        <div className="flex items-center gap-1.5 mt-3 text-xs text-slate-500">
                            <MapPin size={12} />
                            <span>{PERSONAL_INFO.LOCATION}</span>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
                        <div className="grid grid-cols-2 gap-2">
                            {["home", "wins", "about", "skills", "experience", "education", "certifications", "contact"].map((section) => (
                                <button
                                    key={section}
                                    onClick={() => {
                                        const el = document.getElementById(section);
                                        if (el) el.scrollIntoView({ behavior: "smooth" });
                                    }}
                                    className="text-slate-400 hover:text-cyan-400 transition-colors text-sm capitalize text-left"
                                >
                                    {section}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Get In Touch</h4>
                        <div className="space-y-3">
                            <a
                                href={`mailto:${PERSONAL_INFO.EMAIL}`}
                                className="flex items-center gap-2.5 text-slate-400 hover:text-cyan-400 transition-colors text-sm group"
                            >
                                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center group-hover:bg-cyan-500/10 transition-colors">
                                    <Mail size={14} className="text-cyan-400" />
                                </div>
                                <span>{PERSONAL_INFO.EMAIL}</span>
                            </a>
                            <a
                                href={`tel:${PERSONAL_INFO.PHONE}`}
                                className="flex items-center gap-2.5 text-slate-400 hover:text-cyan-400 transition-colors text-sm group"
                            >
                                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center group-hover:bg-cyan-500/10 transition-colors">
                                    <Phone size={14} className="text-cyan-400" />
                                </div>
                                <span>{PERSONAL_INFO.PHONE}</span>
                            </a>
                            <a
                                href={PERSONAL_INFO.LINKEDIN_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2.5 text-slate-400 hover:text-cyan-400 transition-colors text-sm group"
                            >
                                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center group-hover:bg-cyan-500/10 transition-colors">
                                    <Linkedin size={14} className="text-cyan-400" />
                                </div>
                                <span>LinkedIn Profile</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-slate-500 text-xs flex items-center gap-1">
                        © {currentYear} {PERSONAL_INFO.NAME}. All rights reserved.
                    </p>
                    <p className="text-slate-600 text-xs flex items-center gap-1">
                        Built with <Heart size={11} className="text-rose-500 mx-0.5" fill="currentColor" /> using React, Vite & Supabase
                    </p>
                </div>
            </div>
        </footer>
    );
};
