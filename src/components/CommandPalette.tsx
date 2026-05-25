import { useState, useEffect, useRef } from 'react';
import { Terminal, Database, ShieldAlert, FileText, Send, X, Search, Activity, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { downloadResume } from '@/utils/navigation';

export const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Toggle Command Palette on Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Autofocus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const commands = [
    {
      category: "Operational Directives",
      items: [
        {
          label: "Execute AlwaysOn Failover Drill",
          desc: "Initiate Nagpur to Pune primary replica switchover simulation",
          icon: Activity,
          action: () => {
            window.dispatchEvent(new CustomEvent('switch-dba-tab', { detail: 'alwayson' }));
            // Small timeout to let tab change, then trigger failover
            setTimeout(() => {
              window.dispatchEvent(new CustomEvent('trigger-failover'));
            }, 300);
          }
        },
        {
          label: "Open T-SQL Query IDE Console",
          desc: "Run custom SQL statements against the local resume database",
          icon: Terminal,
          action: () => {
            window.dispatchEvent(new CustomEvent('switch-dba-tab', { detail: 'tsql' }));
          }
        },
        {
          label: "Access Live Diagnostics & Incidents",
          desc: "Play DBA and resolve deadlock alerts or index fragmentation",
          icon: ShieldAlert,
          action: () => {
            window.dispatchEvent(new CustomEvent('switch-dba-tab', { detail: 'incidents' }));
          }
        }
      ]
    },
    {
      category: "Chronicles & Resume",
      items: [
        {
          label: "View DBA Career Chronicles",
          desc: "Jump to chronological experience case studies",
          icon: FileText,
          action: () => {
            const element = document.getElementById("experience");
            element?.scrollIntoView({ behavior: 'smooth' });
          }
        },
        {
          label: "Download PDF Resume Document",
          desc: "Get Ajay Bervanshi's official DBA resume PDF",
          icon: FileText,
          action: () => {
            downloadResume();
          }
        },
        {
          label: "Inspect Core DB Skills Arsenal",
          desc: "Scroll directly to domain skills metrics",
          icon: Database,
          action: () => {
            const element = document.getElementById("operations-center");
            element?.scrollIntoView({ behavior: 'smooth' });
          }
        }
      ]
    },
    {
      category: "Secure Communication",
      items: [
        {
          label: "Open Supabase Connection Desk",
          desc: "Write a message directly to Ajay's catalog table",
          icon: Send,
          action: () => {
            const element = document.getElementById("contact");
            element?.scrollIntoView({ behavior: 'smooth' });
          }
        }
      ]
    }
  ];

  // Fuzzy search filter
  const filteredCommands = commands.map(group => ({
    ...group,
    items: group.items.filter(item => 
      item.label.toLowerCase().includes(search.toLowerCase()) ||
      item.desc.toLowerCase().includes(search.toLowerCase())
    )
  })).filter(group => group.items.length > 0);

  const handleCommandClick = (action: () => void) => {
    action();
    setIsOpen(false);
    setSearch('');
  };

  return (
    <>
      {/* Floating Toggle HUD Icon (Fixed right-middle screen) */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-6 bottom-24 z-40 w-11 h-11 bg-slate-950/90 border border-cyan-500/30 hover:border-cyan-400 rounded-full flex items-center justify-center text-cyan-400 hover:text-cyan-300 shadow-lg shadow-cyan-500/10 hover:shadow-cyan-400/20 hover:scale-105 transition-all duration-300 backdrop-blur-md group"
        title="Open Command Console (Ctrl+K)"
      >
        <Search size={18} className="group-hover:rotate-12 transition-transform" />
      </button>

      {/* Backdrop Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4">
            {/* Dark glass backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-slate-950/75 backdrop-blur-md"
            />

            {/* Glowing Search Box dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative w-full max-w-xl bg-slate-950 border-[0.5px] border-cyan-500/20 rounded-3xl shadow-2xl overflow-hidden shadow-cyan-500/5 font-mono text-left max-h-[500px] flex flex-col"
            >
              {/* Input field area */}
              <div className="p-4 border-b border-slate-900 flex items-center gap-3 relative">
                <Search size={16} className="text-cyan-400 flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Fuzzy-search directives, experience, skills... (e.g. failover)"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-transparent text-xs text-white placeholder-slate-600 focus:outline-none w-full leading-relaxed"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-slate-500 hover:text-white transition-colors p-1.5 hover:bg-slate-900 rounded-lg"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Action items list */}
              <div className="flex-1 overflow-y-auto p-4 space-y-5 scrollbar-thin">
                {filteredCommands.length === 0 ? (
                  <div className="text-center py-8 space-y-2">
                    <HelpCircle size={20} className="mx-auto text-slate-800" />
                    <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">No matching directives found</div>
                    <div className="text-[10px] text-slate-600">Try searching 'failover', 'sql', or 'resume'</div>
                  </div>
                ) : (
                  filteredCommands.map((group, idx) => (
                    <div key={idx} className="space-y-2">
                      <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest pl-2">
                        {group.category}
                      </span>
                      <div className="space-y-1">
                        {group.items.map((item, itemIdx) => (
                          <button
                            key={itemIdx}
                            onClick={() => handleCommandClick(item.action)}
                            className="w-full p-2.5 hover:bg-slate-900/60 rounded-2xl flex items-start gap-3 transition-colors text-left group/item border border-transparent hover:border-slate-850"
                          >
                            <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-850 flex items-center justify-center text-slate-400 group-hover/item:text-cyan-400 group-hover/item:border-cyan-500/20 transition-all flex-shrink-0">
                              <item.icon size={14} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-[11px] font-bold text-slate-200 group-hover/item:text-white truncate">
                                {item.label}
                              </div>
                              <div className="text-[9px] text-slate-500 group-hover/item:text-slate-400 truncate mt-0.5 font-sans">
                                {item.desc}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Status Bar footer */}
              <div className="bg-slate-900/40 border-t border-slate-900 px-5 py-2.5 text-[9px] text-slate-500 flex items-center justify-between">
                <span>Select command to execute directive</span>
                <span className="hidden sm:inline">Press <kbd className="bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800 text-[8px] font-bold">ESC</kbd> to exit console</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
