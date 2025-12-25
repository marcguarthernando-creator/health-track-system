
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

const RoleSelection: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useUser();

    const handleRoleSelect = (role: 'player' | 'staff') => {
        login(role);
        if (role === 'player') {
            navigate('/player');
        } else {
            navigate('/staff');
        }
    };

    return (
        <div className="flex h-screen items-center justify-center bg-background-dark text-white p-6 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

            <div className="max-w-4xl w-full z-10 flex flex-col gap-12">
                <div className="text-center flex flex-col items-center gap-4">
                    <div className="size-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-2 border border-primary/20 shadow-[0_0_30px_-5px_rgba(0,212,255,0.3)]">
                        <img src="/logo.png" alt="Logo" className="h-12 w-auto" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight">HEALTH TRACK</h1>
                    <p className="text-secondary text-lg uppercase tracking-widest font-bold">Elite Performance System</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <button
                        onClick={() => handleRoleSelect('player')}
                        className="group relative h-64 rounded-[2.5rem] bg-surface-dark border border-[#334155] p-8 flex flex-col items-center justify-center gap-6 hover:border-primary/50 hover:bg-[#1e293b] transition-all hover:-translate-y-1 hover:shadow-glow overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <span className="material-symbols-outlined text-6xl text-primary group-hover:scale-110 transition-transform duration-300">directions_run</span>
                        <div className="text-center relative z-10">
                            <h2 className="text-3xl font-bold mb-2">Player Zone</h2>
                            <p className="text-secondary group-hover:text-white transition-colors">Access your daily plan, metrics, and recovery.</p>
                        </div>
                    </button>

                    <button
                        onClick={() => handleRoleSelect('staff')}
                        className="group relative h-64 rounded-[2.5rem] bg-surface-dark border border-[#334155] p-8 flex flex-col items-center justify-center gap-6 hover:border-primary/50 hover:bg-[#1e293b] transition-all hover:-translate-y-1 hover:shadow-glow overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <span className="material-symbols-outlined text-6xl text-primary group-hover:scale-110 transition-transform duration-300">shield_person</span>
                        <div className="text-center relative z-10">
                            <h2 className="text-3xl font-bold mb-2">Staff Portal</h2>
                            <p className="text-secondary group-hover:text-white transition-colors">Manage workloads, monitor readiness, and analysis.</p>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RoleSelection;
