import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import Typewriter from "typewriter-effect";

interface TerminalHeaderProps {
    title: string;
    command: string;
}

export const TerminalHeader = ({ title, command }: TerminalHeaderProps) => {
    return (
        <div className="w-full max-w-4xl mx-auto mb-16">
            {/* Mac-style Window Bar */}
            <div className="flex items-center px-4 py-2 bg-slate-900 rounded-t-lg border-b border-slate-700">
                <div className="flex space-x-2 mr-4">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                </div>
                <div className="flex items-center text-slate-400 text-sm font-mono mx-auto opacity-70">
                    <Terminal size={14} className="mr-2" />
                    {title}
                </div>
            </div>

            {/* Terminal Body */}
            <div className="bg-slate-950 p-6 rounded-b-lg font-mono border border-t-0 border-slate-800 shadow-2xl">
                <div className="flex items-center text-emerald-400 text-xl lg:text-3xl font-bold">
                    <span className="text-pink-500 mr-3">sysadmin@db-server:~$</span>
                    <Typewriter
                        options={{
                            strings: [command],
                            autoStart: true,
                            loop: false,
                            cursor: "█",
                            delay: 50,
                        }}
                    />
                </div>
            </div>
        </div>
    );
};
