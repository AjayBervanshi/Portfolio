import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, Play, ShieldAlert, CheckCircle, Network, Server, Cloud, Cpu, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LogEntry {
  timestamp: string;
  type: 'info' | 'warn' | 'success' | 'cmd';
  message: string;
}

export const AlwaysOnSimulator = () => {
  const [isFailoverActive, setIsFailoverActive] = useState(false);
  const [failoverStep, setFailoverStep] = useState(0);
  const [nodes, setNodes] = useState({
    nagpur: { role: 'PRIMARY' as 'PRIMARY' | 'SECONDARY', syncState: 'Synchronized', status: 'HEALTHY' },
    pune: { role: 'SECONDARY' as 'PRIMARY' | 'SECONDARY', syncState: 'Synchronized', status: 'HEALTHY' },
    aws: { role: 'SECONDARY' as 'PRIMARY' | 'SECONDARY', syncState: 'Synchronizing', status: 'HEALTHY' },
  });
  const [logs, setLogs] = useState<LogEntry[]>([
    { timestamp: '12:41:00', type: 'info', message: 'AlwaysOn Availability Group [AjayDBA_AG] initialized.' },
    { timestamp: '12:41:02', type: 'info', message: 'Primary replica PALL-DB-01 connected. status: ONLINE.' },
    { timestamp: '12:41:03', type: 'success', message: 'Synchronous mirror PALL-DB-02 (Pune Node) fully Synchronized.' },
    { timestamp: '12:41:05', type: 'info', message: 'Asynchronous DR replica AWS-DB-DR (AWS cloud) active. Lag: 4ms.' }
  ]);
  const [syncLag, setSyncLag] = useState(4); // Dynamic AWS lag slider state

  const consoleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [logs]);

  // Listen for global command triggers (Spotlight HUD)
  useEffect(() => {
    const handleGlobalFailover = () => {
      handleFailover();
    };
    window.dispatchEvent(new CustomEvent('switch-dba-tab', { detail: 'alwayson' }));
    window.addEventListener('trigger-failover', handleGlobalFailover);
    return () => window.removeEventListener('trigger-failover', handleGlobalFailover);
  }, [isFailoverActive]);

  const addLog = (message: string, type: LogEntry['type'] = 'info') => {
    const time = new Date().toLocaleTimeString('en-US', { hour12: false });
    setLogs((prev) => [...prev, { timestamp: time, type, message }]);
  };

  const handleFailover = () => {
    if (isFailoverActive) return;

    setIsFailoverActive(true);
    setFailoverStep(1);
    setLogs([]); // Reset logs for clean trace

    const isNagpurPrimary = nodes.nagpur.role === 'PRIMARY';
    const activeHost = isNagpurPrimary ? 'PALL-DB-01' : 'PALL-DB-02';
    const targetHost = isNagpurPrimary ? 'PALL-DB-02' : 'PALL-DB-01';
    const targetIP = isNagpurPrimary ? '10.140.2.14' : '10.140.1.12';
    const activeIP = isNagpurPrimary ? '10.140.1.12' : '10.140.2.14';

    // Phase 1: Issue Command
    addLog('Executing command: ALTER AVAILABILITY GROUP [AjayDBA_AG] FAILOVER;', 'cmd');
    addLog(`Manual failover transaction initiated from ${activeHost} to ${targetHost}.`, 'info');

    // Phase 2: Draining Nagpur/Pune Node
    setTimeout(() => {
      setFailoverStep(2);
      addLog(`Primary replica ${activeHost} transitioning to SECONDARY role...`, 'warn');
      addLog('Draining active database transactions. active connection handles: 143', 'info');
    }, 1500);

    // Phase 3: LSN Verification
    setTimeout(() => {
      setFailoverStep(3);
      addLog(`Draining successfully completed. ${activeHost} entered read-only state.`, 'success');
      addLog('Verifying Log Sequence Numbers (LSN) synchronization across nodes...', 'info');
      addLog(`LSN alignment validated. ${activeHost} LSN: [24:412:1] | ${targetHost} LSN: [24:412:1]. Status: Synchronized.`, 'success');
    }, 3000);

    // Phase 4: Redoing logs & promoting target Node
    setTimeout(() => {
      setFailoverStep(4);
      addLog(`Initiating role transition for target node ${targetHost}...`, 'info');
      addLog(`Redoing transaction queue logs on ${targetHost} replica: 100% complete.`, 'success');
      addLog(`Promoting ${targetHost} to PRIMARY role.`, 'warn');
      
      setNodes((prev) => ({
        ...prev,
        nagpur: {
          ...prev.nagpur,
          role: isNagpurPrimary ? 'SECONDARY' : 'PRIMARY',
          syncState: isNagpurPrimary ? 'Synchronizing' : 'Synchronized',
        },
        pune: {
          ...prev.pune,
          role: isNagpurPrimary ? 'PRIMARY' : 'SECONDARY',
          syncState: isNagpurPrimary ? 'Synchronized' : 'Synchronizing',
        },
      }));
    }, 4500);

    // Phase 5: Re-routing DNS and completing failover
    setTimeout(() => {
      setFailoverStep(5);
      addLog(`Rerouting Availability Group Listener [AJAYDBA-LISTENER] IP binding from ${activeIP} to ${targetIP}...`, 'info');
      addLog('Listener binding completed. Endpoint listener status: ONLINE.', 'success');
      addLog('Updating synchronization mapping for asynchronous DR Cloud Node (AWS)...', 'info');
    }, 6000);

    // Phase 6: Finished
    setTimeout(() => {
      setFailoverStep(6);
      addLog('Availability Group Failover Complete. Cluster ONLINE.', 'success');
      addLog(`New Cluster Primary: ${targetHost} (${isNagpurPrimary ? 'Pune Node' : 'Nagpur Node'}).`, 'info');
      
      setNodes((prev) => ({
        ...prev,
        nagpur: {
          ...prev.nagpur,
          syncState: 'Synchronized',
        },
        pune: {
          ...prev.pune,
          syncState: 'Synchronized',
        }
      }));
      setIsFailoverActive(false);
    }, 7500);
  };

  const handleReset = () => {
    if (isFailoverActive) return;
    setFailoverStep(0);
    setNodes({
      nagpur: { role: 'PRIMARY', syncState: 'Synchronized', status: 'HEALTHY' },
      pune: { role: 'SECONDARY', syncState: 'Synchronized', status: 'HEALTHY' },
      aws: { role: 'SECONDARY', syncState: 'Synchronizing', status: 'HEALTHY' },
    });
    setSyncLag(4);
    setLogs([
      { timestamp: '12:41:00', type: 'info', message: 'AlwaysOn Availability Group [AjayDBA_AG] initialized.' },
      { timestamp: '12:41:02', type: 'info', message: 'Primary replica PALL-DB-01 connected. status: ONLINE.' },
      { timestamp: '12:41:03', type: 'success', message: 'Synchronous mirror PALL-DB-02 (Pune Node) fully Synchronized.' },
      { timestamp: '12:41:05', type: 'info', message: 'Asynchronous DR replica AWS-DB-DR (AWS cloud) active. Lag: 4ms.' }
    ]);
  };

  return (
    <Card className="bg-slate-950/65 border-[0.5px] border-cyan-500/20 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden relative group">
      {/* Glow aura */}
      <div className="absolute -top-12 -left-12 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Simulator Control Header */}
      <div className="bg-slate-900/40 px-6 py-4 border-b border-slate-800/80 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-cyan-500/10 rounded-xl flex items-center justify-center border border-cyan-500/20">
            <Network className="text-cyan-400" size={20} />
          </div>
          <div className="text-left">
            <h3 className="text-sm font-mono font-bold text-white uppercase tracking-widest">AlwaysOn Group Manager</h3>
            <p className="text-[10px] text-slate-400 font-mono">Simulate automated high availability failovers & DR routing</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {/* DR Latency Slider */}
          <div className="flex flex-col space-y-1 text-left min-w-[130px] pr-4 border-r border-slate-800 hidden md:flex">
            <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest font-black flex justify-between">
              <span>DR WAN Lag</span>
              <span className={syncLag > 200 ? 'text-rose-400' : syncLag > 80 ? 'text-amber-400' : 'text-indigo-400'}>
                {syncLag}ms
              </span>
            </span>
            <input 
              type="range" 
              min="2" 
              max="300" 
              value={syncLag} 
              disabled={isFailoverActive}
              onChange={(e) => setSyncLag(Number(e.target.value))}
              className="w-full accent-indigo-500 h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={handleReset}
              disabled={isFailoverActive}
              className="border-slate-800 hover:bg-slate-900 font-mono text-[10px] uppercase tracking-wider rounded-lg h-9"
            >
              <RefreshCw size={12} className="mr-1.5" />
              Reset Cluster
            </Button>
            <Button
              size="sm"
              onClick={handleFailover}
              disabled={isFailoverActive}
              className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-mono text-[10px] font-bold uppercase tracking-wider rounded-lg h-9 flex items-center shadow-lg border border-purple-400/20"
            >
              <Play size={10} className="mr-1.5" />
              Failover
            </Button>
          </div>
        </div>
      </div>

      <CardContent className="p-6 space-y-6">
        {/* Interactive 3D/SVG Replication Topology */}
        <div className="bg-slate-900/20 p-6 rounded-2xl border border-slate-850 flex flex-col md:flex-row justify-around items-center gap-6 relative overflow-hidden min-h-[200px]">
          {/* Animated Background Laser Beam */}
          <div className="absolute inset-x-20 top-1/2 h-[1px] bg-gradient-to-r from-cyan-500 via-purple-500 to-indigo-500 opacity-20 -translate-y-1/2 hidden md:block" />

          {/* Node 1: Nagpur (PALL-DB-01) */}
          <motion.div
            layout
            className={`z-10 w-40 p-4 rounded-2xl border text-left transition-all duration-300 relative ${
              nodes.nagpur.role === 'PRIMARY'
                ? 'border-emerald-500/30 bg-slate-950 shadow-xl shadow-emerald-500/5'
                : 'border-slate-850 bg-slate-950/40'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className={`text-[8px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-md ${
                nodes.nagpur.role === 'PRIMARY' ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/20' : 'bg-slate-900 text-slate-400'
              }`}>
                {nodes.nagpur.role}
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <div className="flex items-center gap-2.5 mb-3">
              <Server className={nodes.nagpur.role === 'PRIMARY' ? 'text-emerald-400' : 'text-slate-500'} size={20} />
              <div>
                <div className="text-[11px] font-mono font-bold text-white">PALL-DB-01</div>
                <div className="text-[9px] text-slate-500 font-mono">Nagpur Replica</div>
              </div>
            </div>
            <div className="text-[9px] text-slate-500 border-t border-slate-900 pt-2 font-mono flex justify-between">
              <span>SYNC:</span>
              <span className={nodes.nagpur.role === 'PRIMARY' ? 'text-emerald-400' : 'text-cyan-400'}>{nodes.nagpur.syncState}</span>
            </div>
          </motion.div>

          {/* Connect laser line 1 */}
          <div className="flex flex-col items-center select-none z-10">
            <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest mb-1">Synchronous Pipeline</span>
            <div className="flex items-center justify-center w-10 h-6">
              <ArrowRight size={14} className={`animate-pulse ${isFailoverActive ? 'text-purple-400' : 'text-emerald-400'}`} />
            </div>
            <span className="text-[8px] font-mono text-slate-600">Redo Queue: 0ms</span>
          </div>

          {/* Node 2: Pune (PALL-DB-02) */}
          <motion.div
            layout
            className={`z-10 w-40 p-4 rounded-2xl border text-left transition-all duration-300 relative ${
              nodes.pune.role === 'PRIMARY'
                ? 'border-emerald-500/30 bg-slate-950 shadow-xl shadow-emerald-500/5'
                : 'border-slate-850 bg-slate-950/40'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className={`text-[8px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-md ${
                nodes.pune.role === 'PRIMARY' ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/20' : 'bg-slate-900 text-slate-400'
              }`}>
                {nodes.pune.role}
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <div className="flex items-center gap-2.5 mb-3">
              <Server className={nodes.pune.role === 'PRIMARY' ? 'text-emerald-400' : 'text-slate-500'} size={20} />
              <div>
                <div className="text-[11px] font-mono font-bold text-white">PALL-DB-02</div>
                <div className="text-[9px] text-slate-500 font-mono">Pune Replica</div>
              </div>
            </div>
            <div className="text-[9px] text-slate-500 border-t border-slate-900 pt-2 font-mono flex justify-between">
              <span>SYNC:</span>
              <span className={nodes.pune.role === 'PRIMARY' ? 'text-emerald-400' : 'text-cyan-400'}>{nodes.pune.syncState}</span>
            </div>
          </motion.div>

          {/* Connect laser line 2 */}
          <div className="flex flex-col items-center select-none z-10">
            <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest mb-1">Async DR Pipeline</span>
            <div className="flex items-center justify-center w-10 h-6">
              <ArrowRight size={14} className={`${syncLag > 200 ? 'text-rose-500' : syncLag > 80 ? 'text-amber-500' : 'text-indigo-400'} animate-pulse`} />
            </div>
            <span className="text-[8px] font-mono text-slate-600">Sync Lag: {syncLag}ms</span>
          </div>

          {/* Node 3: AWS Cloud Node (AWS-DB-DR) */}
          <motion.div
            layout
            className="z-10 w-40 p-4 rounded-2xl border border-slate-850 bg-slate-950/40 text-left relative"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[8px] font-mono font-bold tracking-wider bg-slate-900 text-slate-400 px-2 py-0.5 rounded-md">
                {nodes.aws.role}
              </span>
              <span className={`w-2 h-2 rounded-full ${syncLag > 200 ? 'bg-rose-500' : syncLag > 80 ? 'bg-amber-400' : 'bg-indigo-500'} animate-pulse`} />
            </div>
            <div className="flex items-center gap-2.5 mb-3">
              <Cloud className={syncLag > 200 ? 'text-rose-400' : syncLag > 80 ? 'text-amber-400' : 'text-indigo-400'} size={20} />
              <div>
                <div className="text-[11px] font-mono font-bold text-white">AWS-DB-DR</div>
                <div className="text-[9px] text-slate-500 font-mono">AWS Cloud DR</div>
              </div>
            </div>
            <div className="text-[9px] text-slate-500 border-t border-slate-900 pt-2 font-mono flex justify-between">
              <span>SYNC:</span>
              <span className={syncLag > 200 ? 'text-rose-400' : syncLag > 80 ? 'text-amber-400' : 'text-indigo-400'}>
                {syncLag > 200 ? 'Async Disconnect' : syncLag > 80 ? 'Lag Warning' : 'Synchronizing'}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Diagnostic Logs & Metrics Control Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Metrics Center (1/3 Width) */}
          <div className="lg:col-span-1 bg-slate-950/40 border border-slate-900 p-4 rounded-2xl flex flex-col justify-between space-y-4">
            <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
              <Cpu size={14} className="text-cyan-400" />
              AG Health Monitors
            </h4>

            <div className="grid grid-cols-2 gap-3 text-left">
              <div className="bg-slate-900/40 border border-slate-850 p-2.5 rounded-xl">
                <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest block font-bold">AG Listener</span>
                <span className="text-xs font-black text-emerald-400 font-mono block mt-1">ONLINE</span>
                <span className="text-[8px] text-slate-400 font-mono mt-0.5 block truncate">AJAYDBA-LISTENER</span>
              </div>
              <div className="bg-slate-900/40 border border-slate-850 p-2.5 rounded-xl">
                <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest block font-bold">Active Replica</span>
                <span className="text-xs font-black text-cyan-400 font-mono block mt-1 truncate">
                  {nodes.pune.role === 'PRIMARY' ? 'PALL-DB-02 (Pune)' : 'PALL-DB-01 (Nagpur)'}
                </span>
                <span className="text-[8px] text-slate-400 font-mono mt-0.5 block">Role: PRIMARY</span>
              </div>
              <div className="bg-slate-900/40 border border-slate-850 p-2.5 rounded-xl">
                <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest block font-bold">LSN Status</span>
                <span className="text-xs font-black text-emerald-400 font-mono block mt-1">ALIGNED</span>
                <span className="text-[8px] text-slate-400 font-mono mt-0.5 block">Redo lag: 0 kb</span>
              </div>
              <div className="bg-slate-900/40 border border-slate-850 p-2.5 rounded-xl">
                <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest block font-bold">Cloud Sync</span>
                <span className={`text-xs font-black font-mono block mt-1 ${syncLag > 200 ? 'text-rose-400' : syncLag > 80 ? 'text-amber-400' : 'text-indigo-400'}`}>
                  {syncLag > 200 ? 'OUT OF SYNC' : syncLag > 80 ? 'LAG WARNING' : '99.99%'}
                </span>
                <span className="text-[8px] text-slate-400 font-mono mt-0.5 block">Lag: {syncLag} ms</span>
              </div>
            </div>

            {/* Simulated Failover progress bar */}
            {isFailoverActive && (
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-[9px] font-mono">
                  <span className="text-cyan-400 animate-pulse font-bold">FAILOVER ACTIVE...</span>
                  <span className="text-slate-400 font-bold">{Math.round((failoverStep / 6) * 100)}%</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-1 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 animate-pulse"
                    initial={{ width: '0%' }}
                    animate={{ width: `${(failoverStep / 6) * 100}%` }}
                    transition={{ ease: 'linear' }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Diagnostic Console stream (2/3 Width) */}
          <div className="lg:col-span-2 bg-slate-950 border border-slate-900 p-4 rounded-2xl flex flex-col justify-between">
            <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mb-2.5">
              <ShieldAlert size={12} className="text-purple-400 animate-pulse" />
              SQL Clustering Diagnostics Log
            </h4>
            
            <div 
              ref={consoleRef}
              className="flex-1 bg-slate-950 p-3.5 border border-slate-900 rounded-xl font-mono text-[10px] overflow-y-auto max-h-[120px] text-left space-y-1.5"
            >
              {logs.map((log, index) => (
                <div key={index} className="leading-relaxed">
                  <span className="text-slate-600">[{log.timestamp}]</span>{' '}
                  {log.type === 'cmd' ? (
                    <span className="text-cyan-400 font-bold">{log.message}</span>
                  ) : log.type === 'warn' ? (
                    <span className="text-amber-400 font-bold">{log.message}</span>
                  ) : log.type === 'success' ? (
                    <span className="text-emerald-400 font-bold">{log.message}</span>
                  ) : (
                    <span className="text-slate-400">{log.message}</span>
                  )}
                </div>
              ))}
              {isFailoverActive && (
                <div className="flex items-center space-x-1.5 text-cyan-400 text-[10px] animate-pulse py-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>Draining logs...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
