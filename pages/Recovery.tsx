
import React from 'react';
import Sidebar from '../components/Sidebar';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell } from 'recharts';

const hrvData = [
   { day: 'Oct 15', val: 78 },
   { day: 'Oct 16', val: 82 },
   { day: 'Oct 17', val: 80 },
   { day: 'Oct 18', val: 45 },
   { day: 'Oct 19', val: 60 },
   { day: 'Oct 20', val: 85 },
   { day: 'Oct 21', val: 90 },
];

const Recovery: React.FC = () => {
   return (
      <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-white">
         <Sidebar />
         <main className="flex-1 flex flex-col h-full overflow-y-auto">
            <header className="sticky top-0 z-10 bg-[#0b1120]/90 backdrop-blur-md border-b border-[#334155] px-8 py-4 flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">hotel</span>
                  <h2 className="text-white text-lg font-bold tracking-tight">Recovery & Stress</h2>
               </div>
            </header>

            <div className="p-8 max-w-[1400px] w-full mx-auto flex flex-col gap-8">
               <section className="flex flex-col md:flex-row gap-6 justify-between items-center bg-surface-dark p-6 rounded-3xl border border-white/5">
                  <div className="flex gap-5 items-center">
                     <div className="size-10 bg-center bg-cover rounded-full border-2 border-[#1e293b]" style={{ backgroundImage: 'url("https://picsum.photos/seed/alex/100/100")' }}></div>
                     <div className="flex flex-col">
                        <h1 className="text-3xl font-bold">Marcus Thorne</h1>
                        <span className="text-secondary">Sprinter • Pre-Competition Phase</span>
                     </div>
                  </div>
                  <div className="flex gap-3">
                     <div className="flex h-10 items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4">
                        <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                        <p className="text-primary text-sm font-bold">High Strain Allowed</p>
                     </div>
                  </div>
               </section>

               <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                     { label: 'Resting HR', val: '42', unit: 'bpm', icon: 'favorite', sub: '-2 vs 7d' },
                     { label: 'Readiness', val: '94', unit: '/100', icon: 'bolt', sub: 'Peak State' },
                     { label: 'Stress Balance', val: '0.8', unit: 'Optimal', icon: 'balance', sub: 'Sympathetic Dominance' }
                  ].map((m, i) => (
                     <div key={i} className="bg-surface-darker p-8 rounded-3xl border border-white/5 flex flex-col gap-4 relative overflow-hidden group">
                        <div className="absolute -top-10 -right-10 size-40 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all"></div>
                        <div className="flex justify-between items-start">
                           <div>
                              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{m.label}</p>
                              <div className="flex items-baseline gap-1 mt-1">
                                 <span className="text-4xl font-bold">{m.val}</span>
                                 <span className="text-slate-500 text-sm">{m.unit}</span>
                              </div>
                           </div>
                           <span className="material-symbols-outlined text-slate-500">{m.icon}</span>
                        </div>
                        <p className="text-primary text-xs font-bold mt-auto">{m.sub}</p>
                     </div>
                  ))}
               </section>

               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 bg-surface-darker p-8 rounded-[2rem] border border-white/5">
                     <div className="flex justify-between items-center mb-8">
                        <h3 className="text-xl font-bold">30-Day HRV Trend</h3>
                        <span className="text-slate-400 text-sm">RMSSD Analysis</span>
                     </div>
                     <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                           <BarChart data={hrvData}>
                              <XAxis dataKey="day" hide />
                              <YAxis hide domain={[0, 100]} />
                              <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ backgroundColor: '#18281e', border: 'none', borderRadius: '1rem' }} />
                              <Bar dataKey="val" radius={[10, 10, 10, 10]}>
                                 {hrvData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.val < 50 ? '#ef4444' : '#13ec5b'} />
                                 ))}
                              </Bar>
                           </BarChart>
                        </ResponsiveContainer>
                     </div>
                  </div>

                  <div className="bg-surface-dark rounded-[2rem] p-8 border border-[#334155] flex flex-col gap-6">
                     <div className="flex items-center gap-3 mb-2">
                        <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                           <span className="material-symbols-outlined text-sm">smart_toy</span>
                        </div>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-secondary">AI Recovery Insight</h3>
                     </div>
                     <p className="text-lg font-medium leading-relaxed">
                        Your parasympathetic activity is currently <span className="text-primary">elevated</span>.
                     </p>
                     <div className="p-4 bg-white/5 rounded-xl border-l-4 border-primary">
                        <p className="text-slate-300 text-sm">
                           Recommendation: High-intensity neural work is recommended. Your central nervous system has fully recovered from Sunday's session.
                        </p>
                     </div>
                     <div className="mt-auto space-y-4">
                        <h4 className="text-xs font-bold uppercase text-slate-500">Key Metrics</h4>
                        <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                           <span className="text-sm">SDNN</span>
                           <span className="font-mono">145 ms</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                           <span className="text-sm">Vagal Tone</span>
                           <span className="font-mono text-primary">High</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </main>
      </div>
   );
};

export default Recovery;
