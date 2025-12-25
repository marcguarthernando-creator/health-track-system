
import React from 'react';
import StaffSidebar from '@/components/StaffSidebar';

const ActiveInjuries: React.FC = () => {
    return (
        <div className="flex bg-background-dark min-h-screen text-white font-display">
            <StaffSidebar />
            <main className="flex-1 p-8">
                <header className="mb-12">
                    <h1 className="text-4xl font-black tracking-tighter italic uppercase text-white">LESIONES ACTIVAS</h1>
                    <p className="text-secondary text-sm font-bold uppercase tracking-widest opacity-40">Seguimiento de jugadores en proceso de recuperación.</p>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-surface-dark p-6 rounded-3xl border border-white/5 space-y-4">
                        <div className="flex justify-between items-start">
                            <div className="size-12 rounded-full bg-cover bg-center border border-white/10" style={{ backgroundImage: 'url("/assets/photos/DANIEL_RODRIGUEZ.PNG")' }}></div>
                            <span className="px-3 py-1 bg-red-500/10 text-red-400 border border-red-500/20 rounded-full text-[10px] font-black uppercase tracking-widest">Baja</span>
                        </div>
                        <div>
                            <h3 className="font-black italic uppercase text-lg">Daniel Rodríguez</h3>
                            <p className="text-secondary text-xs font-bold uppercase tracking-widest opacity-60">Esguince de Tobillo Grado II</p>
                        </div>
                        <div className="pt-4 border-t border-white/5 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-secondary">
                            <span>Días de baja: 12</span>
                            <span className="text-primary">Ver Evolución</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ActiveInjuries;
