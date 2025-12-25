
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { getHealthInsight } from '../services/geminiService';
import { LineChart, Line, ResponsiveContainer, YAxis, Tooltip } from 'recharts';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [insight, setInsight] = useState<string>("Analyzing your latest biometric data...");
  const [loadingInsight, setLoadingInsight] = useState(true);

  useEffect(() => {
    const fetchInsight = async () => {
      const metrics = "Readiness: 85%, HRV: 42ms (Trending Down), Sleep: 7h 45m (Good), Training Load: 450 AU.";
      const aiResponse = await getHealthInsight(metrics);
      setInsight(aiResponse);
      setLoadingInsight(false);
    };
    fetchInsight();
  }, []);

  const readinessScore = 85;

  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-white">
      <Sidebar />
      <main className="flex-1 flex flex-col h-full relative overflow-y-auto">
        <header className="sticky top-0 z-10 bg-[#0b1120]/90 backdrop-blur-md border-b border-[#334155] px-8 py-4 flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-secondary text-sm">
              <span>Oct 24, Tuesday</span>
              <span className="size-1 rounded-full bg-secondary"></span>
              <span>Pre-Competition Phase</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex gap-4">
              <button className="size-10 rounded-full bg-[#1e293b] text-white flex items-center justify-center hover:bg-[#334155] transition-colors relative">
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-2 right-2 size-2 bg-primary rounded-full border border-[#1e293b]"></span>
              </button>
            </div>
            <div className="h-8 w-px bg-[#334155]"></div>
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-end mr-2">
                <span className="text-sm font-bold text-white">Alex Morgan</span>
                <span className="text-xs text-primary">Athlete</span>
              </div>
              <div className="size-10 bg-center bg-cover rounded-full border-2 border-[#1e293b]" style={{ backgroundImage: 'url("https://picsum.photos/seed/alex/100/100")' }}></div>
            </div>
          </div>
        </header>

        <div className="p-8 max-w-[1600px] w-full mx-auto flex flex-col gap-6">
          <div className="flex flex-wrap justify-between items-end gap-4">
            <div>
              <h2 className="text-4xl font-black tracking-tight text-white mb-1">Welcome back, Alex</h2>
              <p className="text-secondary">Your morning readiness report is available.</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => navigate('/log')} className="px-5 py-2.5 rounded-full bg-primary text-[#0b1120] text-sm font-bold hover:bg-primary-dim transition-colors shadow-glow flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px]">add</span>
                Log Wellness
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Readiness Score Ring */}
            <div className="lg:col-span-4 bg-surface-dark rounded-[2rem] p-8 border border-[#334155] relative overflow-hidden flex flex-col items-center justify-center cursor-pointer group hover:border-primary/20 transition-all" onClick={() => navigate('/recovery')}>
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-50"></div>
              <div className="relative z-10 w-full flex flex-col items-center gap-6">
                <h3 className="text-secondary text-sm font-bold tracking-widest uppercase text-center">Daily Readiness</h3>
                <div className="relative size-64">
                  <svg className="size-full -rotate-90 transform" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" fill="none" r="45" stroke="#334155" strokeWidth="8"></circle>
                    <circle
                      cx="50" cy="50" fill="none" r="45" stroke="#00d4ff" strokeWidth="8"
                      strokeDasharray={`${readinessScore * 2.82} 282`}
                      strokeLinecap="round"
                    ></circle>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-6xl font-black text-white tracking-tighter">{readinessScore}</span>
                    <span className="text-primary font-bold text-sm mt-1">OPTIMAL</span>
                  </div>
                </div>
                <p className="text-secondary text-center text-sm px-4">
                  You are in peak condition. High intensity training is recommended today.
                </p>
              </div>
            </div>

            {/* AI Coach Card */}
            <div className="lg:col-span-8 bg-gradient-to-r from-surface-dark to-[#1e293b] rounded-[2rem] p-8 border border-[#334155] flex flex-col justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="flex items-start gap-5 relative z-10">
                <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 border border-primary/20">
                  <span className="material-symbols-outlined text-primary text-2xl">psychology</span>
                </div>
                <div className="flex flex-col gap-2 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="text-primary font-bold tracking-wide text-xs uppercase bg-primary/10 px-2 py-0.5 rounded">AI Analysis</span>
                    <span className="text-secondary text-xs">{loadingInsight ? 'Processing...' : 'Updated now'}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
                    {loadingInsight ? "Calculating performance trends..." : insight}
                  </h3>
                </div>
              </div>
            </div>

            {/* Mini Charts Bento */}
            <div className="lg:col-span-3 bg-surface-dark rounded-[2rem] p-6 border border-[#334155] flex flex-col justify-between hover:border-primary/30 transition-colors cursor-pointer" onClick={() => navigate('/log')}>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2 text-secondary">
                  <span className="material-symbols-outlined text-xl">bedtime</span>
                  <span className="text-sm font-medium">Sleep</span>
                </div>
                <div className="size-2.5 rounded-full bg-primary shadow-[0_0_8px_#00d4ff]"></div>
              </div>
              <div className="mt-4">
                <span className="text-3xl font-bold text-white block">7h 45m</span>
                <span className="text-xs text-secondary mt-1 block">+15m vs. 7d avg</span>
              </div>
            </div>

            <div className="lg:col-span-3 bg-surface-dark rounded-[2rem] p-6 border border-[#334155] flex flex-col justify-between hover:border-warning/30 transition-colors cursor-pointer" onClick={() => navigate('/recovery')}>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2 text-secondary">
                  <span className="material-symbols-outlined text-xl">ecg_heart</span>
                  <span className="text-sm font-medium">HRV</span>
                </div>
                <div className="size-2.5 rounded-full bg-warning"></div>
              </div>
              <div className="mt-4">
                <span className="text-3xl font-bold text-white block">42 ms</span>
                <span className="text-xs text-secondary mt-1 block">-5% Downward Trend</span>
              </div>
            </div>

            <div className="lg:col-span-6 bg-surface-dark rounded-[2rem] p-6 border border-[#334155] flex flex-col gap-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-white font-bold">Injury Risk Status</h4>
                <span className="text-xs text-primary font-bold uppercase tracking-wide">Safe Zone</span>
              </div>
              <div className="h-16 flex items-end gap-1">
                {[40, 60, 50, 80, 70, 90, 85].map((val, i) => (
                  <div key={i} className={`flex-1 rounded-t-sm transition-all ${i === 6 ? 'bg-primary' : 'bg-[#334155]'}`} style={{ height: `${val}%` }}></div>
                ))}
              </div>
              <div className="flex justify-between text-[10px] text-secondary">
                <span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
