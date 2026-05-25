import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShieldAlert, CheckCircle, Activity, Gauge, Terminal, Play, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface Incident {
  id: string;
  name: string;
  severity: 'CRITICAL' | 'WARNING';
  affectedDb: string;
  description: string;
  remediationText: string;
  isResolving: boolean;
}

interface TelemetryPoint {
  time: string;
  cpu: number;
  latency: number;
}

export const DBADashboard = () => {
  const [cpu, setCpu] = useState(18);
  const [connections, setConnections] = useState(143);
  const [tps, setTps] = useState(840);
  const [latency, setLatency] = useState(12);
  const [bufferRatio, setBufferRatio] = useState(99.98);
  const [logText, setLogText] = useState<string[]>([
    'SQL Server Telemetry Agent active on AjayDBA_Cluster.',
    'Buffer Pool usage healthy (99.98% Cache Hit Ratio).',
    'Maintenance Scheduler started successfully.'
  ]);
  const [chartData, setChartData] = useState<TelemetryPoint[]>([]);

  const [incidents, setIncidents] = useState<Incident[]>([
    {
      id: 'INC-201',
      name: 'Transaction Log Deadlock Detected',
      severity: 'CRITICAL',
      affectedDb: 'BankingProdDB',
      description: 'Mutual block detected between SPID 78 (Update Transaction) and SPID 94 (Generate Statement).',
      remediationText: 'KILL BLOCKING SPID & CHOOSE DEADLOCK VICTIM',
      isResolving: false
    },
    {
      id: 'INC-202',
      name: 'High Index Fragmentation (> 87%)',
      severity: 'WARNING',
      affectedDb: 'CustomerERP',
      description: 'Index [IX_Customers_Email] heavily fragmented, leading to page-split overhead and slow scan speeds.',
      remediationText: 'ONLINE INDEX REBUILD & REORGANIZE',
      isResolving: false
    },
    {
      id: 'INC-203',
      name: 'CPU Spike (94% Load)',
      severity: 'CRITICAL',
      affectedDb: 'InventorySystem',
      description: 'Runaway analytical query blocking routine write operations due to inefficient MAXDOP settings.',
      remediationText: 'APPLY MAXDOP 2 HINT & THROTTLE QUERY',
      isResolving: false
    }
  ]);

  // Generate initial chart data history
  useEffect(() => {
    const history: TelemetryPoint[] = [];
    const now = new Date();
    for (let i = 9; i >= 0; i--) {
      const timeStr = new Date(now.getTime() - i * 4000).toLocaleTimeString('en-US', { hour12: false, minute: '2-digit', second: '2-digit' });
      history.push({
        time: timeStr,
        cpu: 15 + Math.round(Math.random() * 15),
        latency: 8 + Math.round(Math.random() * 6)
      });
    }
    setChartData(history);
  }, []);

  // Update telemetry and chart records in a live loop
  useEffect(() => {
    const interval = setInterval(() => {
      const isCpuSpike = incidents.some(inc => inc.id === 'INC-203');
      const isDeadlock = incidents.some(inc => inc.id === 'INC-201');

      const nextCpu = isCpuSpike 
        ? Math.min(99, Math.max(90, cpu + Math.round((Math.random() - 0.5) * 4)))
        : Math.min(45, Math.max(12, cpu + Math.round((Math.random() - 0.5) * 6)));

      const nextLatency = isDeadlock
        ? Math.min(85, Math.max(70, latency + Math.round((Math.random() - 0.5) * 5)))
        : Math.min(22, Math.max(8, latency + Math.round((Math.random() - 0.5) * 4)));

      setCpu(nextCpu);
      setLatency(nextLatency);
      setConnections(prev => Math.min(170, Math.max(120, prev + Math.round((Math.random() - 0.5) * 6))));
      setTps(prev => Math.min(950, Math.max(760, prev + Math.round((Math.random() - 0.5) * 30))));

      // Add to Recharts dataset
      setChartData(prev => {
        const timeStr = new Date().toLocaleTimeString('en-US', { hour12: false, minute: '2-digit', second: '2-digit' });
        const nextSet = [...prev.slice(1), { time: timeStr, cpu: nextCpu, latency: nextLatency }];
        return nextSet;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [incidents, cpu, latency]);

  const addLog = (message: string) => {
    const time = new Date().toLocaleTimeString('en-US', { hour12: false });
    setLogText(prev => [...prev, `[${time}] ${message}`]);
  };

  const handleResolve = (id: string) => {
    // Set resolving active
    setIncidents(prev => prev.map(inc => inc.id === id ? { ...inc, isResolving: true } : inc));
    
    if (id === 'INC-201') {
      addLog('Command: KILL SPID 78; -- terminating blocking thread');
      setTimeout(() => {
        addLog('Success: Terminated transaction SPID 78. Lock released.');
        addLog('Active transaction logs drained. latency restored.');
        setLatency(12);
        setIncidents(prev => prev.filter(inc => inc.id !== id));
      }, 1500);
    } 
    else if (id === 'INC-202') {
      addLog('Command: ALTER INDEX [IX_Customers_Email] ON [Customers] REBUILD WITH (ONLINE = ON);');
      setTimeout(() => {
        addLog('Success: Index rebuilt successfully. Fragmentation: 0.3%.');
        setBufferRatio(99.99);
        setIncidents(prev => prev.filter(inc => inc.id !== id));
      }, 1500);
    }
    else if (id === 'INC-203') {
      addLog('Command: ALTER RESOURCE GOVERNOR CONFIG max_dop = 2;');
      setTimeout(() => {
        addLog('Success: MAXDOP rules updated. analytical core thread pools throttled.');
        setCpu(14);
        setIncidents(prev => prev.filter(inc => inc.id !== id));
      }, 1500);
    }
  };

  return (
    <Card className="bg-slate-950/65 border-[0.5px] border-cyan-500/20 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden relative group">
      {/* Glow effect */}
      <div className="absolute -top-12 -right-12 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Title Header */}
      <div className="bg-slate-900/40 px-6 py-4 border-b border-slate-800/80 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-cyan-500/10 rounded-xl flex items-center justify-center border border-cyan-500/20 animate-pulse">
            <Activity className="text-cyan-400" size={20} />
          </div>
          <div className="text-left">
            <h3 className="text-sm font-mono font-bold text-white uppercase tracking-widest">Live Telemetry Dashboard</h3>
            <p className="text-[10px] text-slate-400 font-mono">Active server metrics and live gamified DBA incident responder alerts</p>
          </div>
        </div>
      </div>

      <CardContent className="p-6 space-y-6">
        {/* Dynamic Telemetry Metrics Panel */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {/* CPU Gauge */}
          <div className="bg-slate-900/40 border border-slate-850 p-4 rounded-2xl flex flex-col justify-between text-left hover:border-slate-700/60 transition-colors">
            <div className="flex items-center justify-between text-slate-500 text-[10px] font-mono uppercase tracking-widest font-bold">
              <span>CPU Core Load</span>
              <Gauge size={14} className={cpu > 80 ? 'text-rose-400' : 'text-slate-500'} />
            </div>
            <div className="my-2.5">
              <span className={`text-2xl font-black font-mono tracking-tight transition-colors duration-200 ${
                cpu > 80 ? 'text-rose-400' : 'text-cyan-400'
              }`}>{cpu}%</span>
            </div>
            <div className="w-full bg-slate-950 h-1 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-300 ${cpu > 80 ? 'bg-rose-500' : 'bg-cyan-400'}`}
                style={{ width: `${cpu}%` }} 
              />
            </div>
          </div>

          {/* Active Sessions */}
          <div className="bg-slate-900/40 border border-slate-850 p-4 rounded-2xl flex flex-col justify-between text-left hover:border-slate-700/60 transition-colors">
            <div className="flex items-center justify-between text-slate-500 text-[10px] font-mono uppercase tracking-widest font-bold">
              <span>Active SPIDs</span>
              <Activity size={14} className="text-slate-500" />
            </div>
            <div className="my-2.5">
              <span className="text-2xl font-black text-white font-mono tracking-tight">{connections}</span>
            </div>
            <span className="text-[9px] text-slate-500 font-mono font-medium">Active connections</span>
          </div>

          {/* TPS */}
          <div className="bg-slate-900/40 border border-slate-850 p-4 rounded-2xl flex flex-col justify-between text-left hover:border-slate-700/60 transition-colors">
            <div className="flex items-center justify-between text-slate-500 text-[10px] font-mono uppercase tracking-widest font-bold">
              <span>Throughput</span>
              <Activity size={14} className="text-emerald-400" />
            </div>
            <div className="my-2.5">
              <span className="text-2xl font-black text-emerald-400 font-mono tracking-tight">{tps} <span className="text-xs text-slate-500">TPS</span></span>
            </div>
            <span className="text-[9px] text-slate-500 font-mono font-medium">Transactions per sec</span>
          </div>

          {/* Latency */}
          <div className="bg-slate-900/40 border border-slate-850 p-4 rounded-2xl flex flex-col justify-between text-left hover:border-slate-700/60 transition-colors">
            <div className="flex items-center justify-between text-slate-500 text-[10px] font-mono uppercase tracking-widest font-bold">
              <span>Read Latency</span>
              <Gauge size={14} className={latency > 45 ? 'text-rose-400 animate-pulse' : 'text-slate-500'} />
            </div>
            <div className="my-2.5">
              <span className={`text-2xl font-black font-mono tracking-tight transition-colors duration-200 ${
                latency > 45 ? 'text-rose-400' : 'text-cyan-400'
              }`}>{latency} <span className="text-xs text-slate-500">ms</span></span>
            </div>
            <div className="w-full bg-slate-950 h-1 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-300 ${latency > 45 ? 'bg-rose-500' : 'bg-cyan-400'}`}
                style={{ width: `${Math.min(100, (latency / 80) * 100)}%` }} 
              />
            </div>
          </div>

          {/* Cache Buffer Hit Ratio */}
          <div className="bg-slate-900/40 border border-slate-850 p-4 rounded-2xl flex flex-col justify-between text-left hover:border-slate-700/60 transition-colors">
            <div className="flex items-center justify-between text-slate-500 text-[10px] font-mono uppercase tracking-widest font-bold">
              <span>Cache Hit Ratio</span>
              <Gauge size={14} className="text-purple-400" />
            </div>
            <div className="my-2.5">
              <span className="text-2xl font-black text-purple-400 font-mono tracking-tight">{bufferRatio}%</span>
            </div>
            <span className="text-[9px] text-slate-500 font-mono font-medium">Memory Cache Pool</span>
          </div>
        </div>

        {/* Real-time Recharts Area Graph Showcase */}
        <div className="bg-slate-900/20 p-5 rounded-2xl border border-slate-850">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block text-left mb-4">
            Live Stream Database performance graphs
          </span>
          <div className="h-44 w-full text-xs font-mono">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00f5ff" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#00f5ff" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="time" stroke="#475569" tick={{ fontSize: 9 }} />
                <YAxis stroke="#475569" tick={{ fontSize: 9 }} />
                <Tooltip contentStyle={{ backgroundColor: '#020617', border: '1px solid #1e293b', fontSize: 10, borderRadius: '8px' }} />
                <Area type="monotone" dataKey="cpu" name="CPU Load (%)" stroke="#00f5ff" fillOpacity={1} fill="url(#colorCpu)" strokeWidth={1.5} />
                <Area type="monotone" dataKey="latency" name="Latency (ms)" stroke="#a855f7" fillOpacity={1} fill="url(#colorLatency)" strokeWidth={1.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gamified Incident Management Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Active alerts board (8/12 Width) */}
          <div className="lg:col-span-8 space-y-4 text-left">
            <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
              <ShieldAlert size={16} className="text-rose-500 animate-bounce" />
              DBA Active Incident Center ({incidents.length})
            </h4>

            <AnimatePresence mode="popLayout">
              {incidents.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-emerald-950/20 border border-emerald-500/25 p-8 rounded-2xl text-center space-y-3 flex flex-col items-center justify-center h-[180px]"
                >
                  <div className="w-11 h-11 bg-emerald-500/10 rounded-full flex items-center justify-center border border-emerald-500/20">
                    <CheckCircle className="text-emerald-400" size={24} />
                  </div>
                  <div>
                    <h5 className="text-white font-bold text-xs uppercase tracking-wide">All Cluster Nodes Healthy</h5>
                    <p className="text-[10px] text-slate-400 mt-1 max-w-sm font-sans leading-relaxed">No blocked threads, lock conflicts, or fragmentation alerts logged. Excellent indexing strategy.</p>
                  </div>
                </motion.div>
              ) : (
                <div className="space-y-3">
                  {incidents.map((incident) => (
                    <motion.div
                      key={incident.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                        incident.severity === 'CRITICAL'
                          ? 'bg-rose-950/20 border-rose-500/20'
                          : 'bg-amber-950/20 border-amber-500/20'
                      }`}
                    >
                      <div className="space-y-1.5 flex-1 text-left">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge className={`${
                            incident.severity === 'CRITICAL' ? 'bg-rose-500 text-white' : 'bg-amber-500 text-slate-950'
                          } font-bold text-[8px] font-mono py-0.5 px-2 rounded-md`}>
                            {incident.severity}
                          </Badge>
                          <span className="text-[9px] font-mono text-slate-500">{incident.id}</span>
                          <span className="text-[9px] font-mono text-cyan-400 font-bold bg-slate-900 px-1.5 py-0.5 rounded-md border border-slate-800">
                            {incident.affectedDb}
                          </span>
                        </div>
                        <h5 className="text-xs font-bold text-white flex items-center gap-1.5 font-sans">
                          <AlertTriangle className={incident.severity === 'CRITICAL' ? 'text-rose-400' : 'text-amber-400'} size={14} />
                          {incident.name}
                        </h5>
                        <p className="text-[10px] text-slate-400 font-sans leading-relaxed">{incident.description}</p>
                      </div>

                      <div className="flex-shrink-0">
                        <Button
                          size="sm"
                          onClick={() => handleResolve(incident.id)}
                          disabled={incident.isResolving}
                          className="bg-slate-900 border border-slate-800 hover:bg-slate-850 text-[10px] font-mono text-cyan-400 font-bold w-full sm:w-auto min-w-[120px] h-9 shadow-md flex items-center justify-center rounded-lg"
                        >
                          {incident.isResolving ? (
                            <span className="flex items-center">
                              <span className="w-3 h-3 border border-t-transparent border-cyan-400 rounded-full animate-spin mr-1.5" />
                              Fixing...
                            </span>
                          ) : (
                            <span className="flex items-center">
                              <Play size={8} className="mr-1 text-emerald-400 fill-emerald-400" />
                              Run script
                            </span>
                          )}
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Monospace output stream panel (4/12 Width) */}
          <div className="lg:col-span-4 bg-slate-950 border border-slate-900 rounded-2xl p-4 flex flex-col justify-between text-left">
            <div className="space-y-3">
              <h4 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <Terminal size={12} className="text-cyan-400" />
                Remediation Terminal
              </h4>
              <div className="bg-slate-950 p-3 border border-slate-900 rounded-xl font-mono text-[9px] text-slate-400 overflow-y-auto h-[170px] space-y-2 scrollbar-thin">
                {logText.map((log, index) => (
                  <div key={index} className="leading-relaxed">
                    <span className="text-slate-700">&gt;</span>{' '}
                    {log.includes('Command') ? (
                      <span className="text-cyan-400">{log}</span>
                    ) : log.includes('Success') ? (
                      <span className="text-emerald-400 font-bold">{log}</span>
                    ) : (
                      <span>{log}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="text-[8px] text-slate-500 font-mono text-center pt-2.5 border-t border-slate-900">
              Agent status: Monitoring diagnostics log...
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
