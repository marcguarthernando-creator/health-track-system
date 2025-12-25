
import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Wk 1', ratio: 0.9 },
  { name: 'Wk 2', ratio: 1.1 },
  { name: 'Wk 3', ratio: 0.85 },
  { name: 'Wk 4', ratio: 1.2 },
  { name: 'Wk 5', ratio: 1.35 },
  { name: 'Wk 6', ratio: 1.1 },
  { name: 'Wk 7', ratio: 1.05 },
];

const Workload: React.FC = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-white">
      <Sidebar />
      <main className="flex-1 flex flex-col h-full overflow-y-auto">
        <header className="sticky top-0 z-10 bg-[#0b1120]/90 backdrop-blur-md border-b border-[#334155] px-8 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-4">
            <span className="material-symbols-outlined text-primary text-3xl">ecg_heart</span>
            <h2 className="text-white text-lg font-bold tracking-wider uppercase">Health Track</h2>
          </Link>
          <div className="flex items-center gap-4">
            <div className="size-10 bg-center bg-cover rounded-full border-2 border-[#1e293b]" style={{ backgroundImage: 'url("https://picsum.photos/seed/alex/100/100")' }}></div>
          </div>
        </header>

        <div className="p-8 max-w-[1400px] w-full mx-auto flex flex-col gap-8">
          <div>
            <div className="flex items-center gap-2 text-primary/80 mb-2">
              <span className="material-symbols-outlined text-sm">analytics</span>
              <span className="text-xs font-bold uppercase tracking-widest">Performance Module</span>
            </div>
            <h1 className="text-5xl font-black tracking-tight mb-4">Workload Management</h1>
            <p className="text-[#9db9a6] text-lg max-w-2xl">
              Monitor your Acute:Chronic Workload Ratio (ACWR) to optimize performance and minimize injury risk.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: 'Current ACWR', val: '1.15', trend: '+2%', color: 'primary', zone: 'Optimal' },
              { label: 'Acute Load (7d)', val: '2,850 AU', trend: '+5%', color: 'primary', zone: 'Steady' },
              { label: 'Chronic Load (28d)', val: '2,400 AU', trend: '+12%', color: 'primary', zone: 'Increasing' },
              { label: 'Injury Risk', val: 'Low', trend: 'Stable', color: 'primary', zone: 'Safe' },
            ].map((stat, idx) => (
              <div key={idx} className="bg-[#1c2e24] p-6 rounded-2xl border border-white/5 flex flex-col gap-2 relative overflow-hidden group">
                <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">{stat.label}</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">{stat.val}</span>
                  <span className="text-primary text-xs font-bold">{stat.trend}</span>
                </div>
                <div className="flex items-center gap-1.5 mt-2">
                  <div className="size-2 rounded-full bg-primary"></div>
                  <span className="text-[#9db9a6] text-xs">{stat.zone}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#1c2e24] p-8 rounded-[2rem] border border-white/5 flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold">ACWR Evolution</h3>
                <p className="text-[#9db9a6] text-sm">Target "Sweet Spot": 0.8 - 1.3</p>
              </div>
            </div>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorRatio" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#13ec5b" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#13ec5b" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#28392e" vertical={false} />
                  <XAxis dataKey="name" stroke="#9db9a6" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#9db9a6" fontSize={12} tickLine={false} axisLine={false} domain={[0, 2]} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#18281e', border: '1px solid #28392e', borderRadius: '1rem' }}
                    itemStyle={{ color: '#13ec5b' }}
                  />
                  <Area type="monotone" dataKey="ratio" stroke="#13ec5b" strokeWidth={3} fillOpacity={1} fill="url(#colorRatio)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Workload;
