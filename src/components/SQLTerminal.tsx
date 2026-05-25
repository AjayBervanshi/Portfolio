import { useState, useEffect } from 'react';
import { executeSQLQuery, SQLQueryResult, SCHEMA_INFO } from '@/utils/sqlEngine';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, RotateCcw, Database, Table as TableIcon, GitFork, CheckCircle, AlertCircle, Terminal, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const SQLTerminal = () => {
  const [query, setQuery] = useState("SELECT * FROM Skills WHERE level = 'Expert'");
  const [result, setResult] = useState<SQLQueryResult | null>(null);
  const [showERD, setShowERD] = useState(false);
  const [activeTab, setActiveTab] = useState<'results' | 'messages'>('results');
  const [isExecuting, setIsExecuting] = useState(false);

  // Automatically execute initial query on mount
  useEffect(() => {
    handleExecute();
  }, []);

  const handleExecute = () => {
    setIsExecuting(true);
    setTimeout(() => {
      const res = executeSQLQuery(query);
      setResult(res);
      setIsExecuting(false);
      setActiveTab('results');
    }, 250); // Simulated delay to feel like database server latency
  };

  const handleClear = () => {
    setQuery("");
  };

  const handleQuerySelect = (selectedQuery: string) => {
    setQuery(selectedQuery);
    setTimeout(() => {
      setIsExecuting(true);
      const res = executeSQLQuery(selectedQuery);
      setResult(res);
      setIsExecuting(false);
      setActiveTab('results');
    }, 150);
  };

  return (
    <Card className="bg-slate-950/65 border-[0.5px] border-cyan-500/20 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden relative group">
      {/* Glow aura */}
      <div className="absolute -top-12 -right-12 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Decorative Console Header bar */}
      <div className="bg-slate-900/40 px-6 py-3.5 border-b border-slate-800/80 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold text-emerald-400 uppercase tracking-widest text-[10px]">Active Session</span>
          </div>
          <span className="text-slate-700">|</span>
          <span className="text-slate-400 truncate max-w-[150px] md:max-w-none">PALL-DB-CLUSTER.NODE_01 (SQL 2022)</span>
          <span className="text-slate-700 hidden md:inline">|</span>
          <span className="text-cyan-400 font-bold hidden md:inline">sa (AjayPortfolioDB)</span>
        </div>
        <Badge className="bg-slate-900 text-slate-400 border border-slate-800 text-[9px] rounded-md font-bold px-2 py-0.5">
          SPID: 54
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[480px]">
        {/* SQL Browser Side Navigation (3/12 Width) */}
        <div className="lg:col-span-4 border-r border-slate-800/80 bg-slate-950/30 p-5 space-y-6">
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
              <Database size={14} className="text-cyan-400" />
              Database Explorer
            </h4>
            
            <div className="space-y-3 pl-1">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold">
                <Database size={12} />
                <span>AjayPortfolioDB</span>
              </div>
              
              <div className="pl-4 space-y-2.5">
                <div className="text-[9px] text-slate-500 font-mono font-bold uppercase tracking-wider">System Tables</div>
                {SCHEMA_INFO.map((table) => (
                  <button
                    key={table.table_name}
                    onClick={() => handleQuerySelect(`SELECT * FROM ${table.table_name}`)}
                    className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors w-full text-left pl-2 group font-mono text-[11px]"
                  >
                    <TableIcon size={12} className="text-slate-600 group-hover:text-cyan-400 transition-colors" />
                    <span className="group-hover:underline group-hover:text-cyan-300">{table.table_name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-900 space-y-3">
            <h5 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Terminal size={12} className="text-purple-400" />
              Preloaded Macros
            </h5>
            
            <div className="space-y-2 pl-1">
              <button
                onClick={() => handleQuerySelect("SELECT name, level, experience FROM Skills WHERE level = 'Expert'")}
                className="text-[10px] text-left text-slate-400 hover:text-cyan-400 hover:underline block truncate w-full font-mono"
                title="Get Expert Skills"
              >
                ⚡ Get Expert Skills
              </button>
              <button
                onClick={() => handleQuerySelect("SELECT * FROM Experience WHERE location LIKE '%Pune%'")}
                className="text-[10px] text-left text-slate-400 hover:text-cyan-400 hover:underline block truncate w-full font-mono"
                title="Query Pune Experience"
              >
                🏢 Query Pune Experience
              </button>
              <button
                onClick={() => handleQuerySelect("SELECT title, company, duration FROM Experience ORDER BY id ASC")}
                className="text-[10px] text-left text-slate-400 hover:text-cyan-400 hover:underline block truncate w-full font-mono"
                title="Career History"
              >
                📜 Chronological Career
              </button>
              <button
                onClick={() => handleQuerySelect("HELP")}
                className="text-[10px] text-left text-slate-400 hover:text-cyan-400 hover:underline block truncate w-full font-mono"
                title="View Database HELP documentation"
              >
                ❓ View DB HELP Manual
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-900">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowERD(!showERD)}
              className="w-full border-purple-500/30 text-purple-400 hover:bg-purple-500/10 hover:text-purple-300 font-mono text-[10px] uppercase tracking-wider py-2"
            >
              <GitFork className="mr-1" size={12} />
              {showERD ? "Hide ER Schema" : "Show ER Schema"}
            </Button>
          </div>
        </div>

        {/* T-SQL Query Editor & Result Grid (9/12 Width) */}
        <div className="lg:col-span-8 flex flex-col min-h-[480px]">
          {/* Code Editor Deck */}
          <div className="p-5 bg-slate-950/20 border-b border-slate-800/80">
            <div className="flex items-center justify-between mb-3.5">
              <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
                <Terminal size={12} />
                T-SQL Command Deck
              </span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={handleClear}
                  variant="ghost"
                  className="h-8 text-slate-400 hover:text-white font-mono text-[10px] px-3 hover:bg-slate-900/60"
                >
                  <RotateCcw size={12} className="mr-1" />
                  Clear
                </Button>
                <Button
                  size="sm"
                  onClick={handleExecute}
                  disabled={isExecuting}
                  className="h-8 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-mono text-[10px] font-bold px-4 border border-cyan-400/20 shadow-md flex items-center rounded-lg"
                >
                  <Play size={10} className="mr-1.5 text-emerald-400 fill-emerald-400" />
                  EXEC (F5)
                </Button>
              </div>
            </div>

            {/* Glowing simulated SSMS editor */}
            <div className="relative border border-slate-800/80 rounded-2xl overflow-hidden bg-slate-950/80 shadow-inner">
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full h-28 p-4 bg-transparent font-mono text-xs text-cyan-100 placeholder-slate-700 focus:outline-none focus:ring-0 resize-none leading-relaxed"
                spellCheck="false"
                onKeyDown={(e) => {
                  if (e.key === 'F5') {
                    e.preventDefault();
                    handleExecute();
                  }
                }}
              />
              <div className="absolute bottom-2.5 right-4 text-[9px] font-mono text-slate-600 pointer-events-none tracking-widest font-bold">
                Press [F5] or Click EXEC
              </div>
            </div>
          </div>

          {/* Expanded Entity-Relationship (ER) Schema Map */}
          <AnimatePresence>
            {showERD && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden bg-slate-950/90 border-b border-slate-850"
              >
                <div className="p-5 space-y-4">
                  <h5 className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-widest flex items-center gap-1.5">
                    <GitFork size={12} />
                    AjayPortfolioDB Schema Diagram
                  </h5>
                  
                  <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 p-4 border border-slate-800/80 rounded-2xl bg-slate-900/20 overflow-x-auto min-w-[480px] md:min-w-0">
                    {/* Table: AboutMe */}
                    <div className="border border-cyan-500/20 rounded-xl bg-slate-950 p-3 w-36 shadow-lg font-mono text-[9px] text-left">
                      <div className="bg-cyan-950/40 text-cyan-400 font-black px-2 py-1 rounded border-b border-cyan-500/10 flex justify-between uppercase">
                        <span>AboutMe</span>
                        <span>PK</span>
                      </div>
                      <div className="p-1.5 space-y-1 text-slate-400">
                        <div className="text-cyan-300 font-bold">🔑 id (INT)</div>
                        <div>name (VARCHAR)</div>
                        <div>title (VARCHAR)</div>
                        <div>experience (VARCHAR)</div>
                      </div>
                    </div>

                    <div className="hidden md:block text-slate-700 font-mono text-xs select-none">
                      ──[1:N]──▶
                    </div>

                    {/* Table: Skills */}
                    <div className="border border-purple-500/20 rounded-xl bg-slate-950 p-3 w-36 shadow-lg font-mono text-[9px] text-left">
                      <div className="bg-purple-950/40 text-purple-400 font-black px-2 py-1 rounded border-b border-purple-500/10 flex justify-between uppercase">
                        <span>Skills</span>
                        <span>PK</span>
                      </div>
                      <div className="p-1.5 space-y-1 text-slate-400">
                        <div className="text-purple-300 font-bold">🔑 id (INT)</div>
                        <div>name (VARCHAR)</div>
                        <div>category (VARCHAR)</div>
                        <div>level (VARCHAR)</div>
                      </div>
                    </div>

                    <div className="hidden md:block text-slate-700 font-mono text-xs select-none">
                      ◀──[N:1]──
                    </div>

                    {/* Table: Experience */}
                    <div className="border border-cyan-500/20 rounded-xl bg-slate-950 p-3 w-40 shadow-lg font-mono text-[9px] text-left">
                      <div className="bg-cyan-950/40 text-cyan-400 font-black px-2 py-1 rounded border-b border-cyan-500/10 flex justify-between uppercase">
                        <span>Experience</span>
                        <span>PK</span>
                      </div>
                      <div className="p-1.5 space-y-1 text-slate-400">
                        <div className="text-cyan-300 font-bold">🔑 id (INT)</div>
                        <div>title (VARCHAR)</div>
                        <div>company (VARCHAR)</div>
                        <div>duration (VARCHAR)</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results Spreadsheet Matrix View */}
          <div className="flex-1 flex flex-col bg-slate-950">
            {/* Grid Tabs */}
            <div className="bg-slate-900/20 border-b border-slate-800/80 flex items-center justify-between px-5">
              <div className="flex gap-1">
                <button
                  onClick={() => setActiveTab('results')}
                  className={`px-4 py-3 text-[10px] font-mono font-bold uppercase tracking-wider border-b-2 transition-colors ${
                    activeTab === 'results'
                      ? 'border-cyan-400 text-cyan-400 bg-slate-950/80'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Results Grid
                </button>
                <button
                  onClick={() => setActiveTab('messages')}
                  className={`px-4 py-3 text-[10px] font-mono font-bold uppercase tracking-wider border-b-2 transition-colors ${
                    activeTab === 'messages'
                      ? 'border-cyan-400 text-cyan-400 bg-slate-950/80'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Console Stream
                </button>
              </div>

              {result && !result.error && (
                <div className="text-[10px] font-mono text-slate-500 flex items-center gap-3">
                  <span>Rows: <strong className="text-cyan-400">{result.rows.length}</strong></span>
                  <span className="text-slate-800">|</span>
                  <span>Latency: <strong className="text-cyan-400">{result.executionTimeMs}ms</strong></span>
                </div>
              )}
            </div>

            {/* Grid display block */}
            <div className="flex-1 overflow-auto p-4 min-h-[200px] max-h-[300px]">
              {isExecuting ? (
                <div className="h-full flex flex-col items-center justify-center space-y-3 py-10">
                  <div className="w-6 h-6 rounded-full border-2 border-t-cyan-400 border-r-transparent border-slate-700 animate-spin" />
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">Querying local catalog...</span>
                </div>
              ) : activeTab === 'results' ? (
                result ? (
                  result.error ? (
                    <div className="flex items-start gap-2.5 text-rose-400 bg-rose-950/20 p-4 border border-rose-500/20 rounded-2xl">
                      <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                      <div className="font-mono text-xs text-left space-y-1">
                        <div className="font-bold text-rose-300">Msg 102, Level 15, Transaction Block Aborted</div>
                        <pre className="whitespace-pre-wrap leading-relaxed text-[11px] font-mono">{result.error}</pre>
                      </div>
                    </div>
                  ) : result.rows.length === 0 ? (
                    <div className="text-center py-10 space-y-1">
                      <TableIcon size={20} className="mx-auto text-slate-850" />
                      <div className="text-xs font-mono text-slate-400 font-bold">Transaction complete.</div>
                      <div className="text-[10px] font-mono text-slate-600">(0 rows affected)</div>
                    </div>
                  ) : (
                    <div className="overflow-x-auto border border-slate-900 rounded-xl bg-slate-950/80">
                      <table className="w-full text-left font-mono text-[11px] border-collapse">
                        <thead>
                          <tr className="bg-slate-900/40 border-b border-slate-800 text-slate-400">
                            <th className="px-3 py-2 text-center w-8 bg-slate-950 border-r border-slate-800"></th>
                            {result.columns.map((col) => (
                              <th key={col} className="px-3 py-2 border-r border-slate-800 font-bold uppercase text-[9px] tracking-wider text-cyan-400">
                                {col}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {result.rows.map((row, idx) => (
                            <tr key={idx} className="border-b border-slate-900/50 hover:bg-slate-900/20 transition-colors">
                              <td className="px-2 py-1.5 border-r border-slate-800 text-center text-slate-600 bg-slate-950/60 text-[9px] select-none font-bold">
                                {idx + 1}
                              </td>
                              {result.columns.map((col) => (
                                <td key={col} className="px-3 py-1.5 border-r border-slate-800 max-w-sm truncate text-slate-300" title={row[col]?.toString()}>
                                  {row[col] === null || row[col] === undefined ? (
                                    <span className="text-slate-600 italic">NULL</span>
                                  ) : (
                                    row[col].toString()
                                  )}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-1.5 py-10">
                    <Database size={20} className="text-slate-800" />
                    <div className="text-xs font-mono text-slate-500 font-bold uppercase tracking-wider">Awaiting query command execution</div>
                    <div className="text-[10px] font-mono text-slate-600">Select a table or write SQL and hit EXEC to inspect ledger.</div>
                  </div>
                )
              ) : (
                <div className="font-mono text-xs text-left text-slate-500 space-y-2">
                  {result ? (
                    result.error ? (
                      <div className="text-rose-400 font-bold">Transaction encountered severe syntax errors. Review Results Grid.</div>
                    ) : (
                      <>
                        <div className="text-emerald-400 flex items-center font-bold">
                          <CheckCircle size={12} className="mr-1" />
                          Commands completed successfully.
                        </div>
                        <div className="text-slate-600 mt-2">
                          ({result.rows.length} row(s) affected)
                        </div>
                        <div className="text-slate-600">
                          Total database transaction execution time: {result.executionTimeMs} ms.
                        </div>
                      </>
                    )
                  ) : (
                    <div>No transactions recorded in current connection session.</div>
                  )}
                </div>
              )}
            </div>

            {/* Console Status Footer */}
            <div className="bg-slate-900/40 px-5 py-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500 font-mono flex-shrink-0">
              <span className="text-emerald-400/80 flex items-center font-bold">
                <CheckCircle size={10} className="mr-1" />
                Query executed successfully
              </span>
              <div className="flex gap-4">
                <span>Catalog: <strong className="text-slate-400">AjayPortfolioDB</strong></span>
                <span>Session: <strong className="text-slate-400">99.99% Uptime</strong></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
