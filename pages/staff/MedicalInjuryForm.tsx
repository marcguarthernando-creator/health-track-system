
import React, { useState } from 'react';
import StaffSidebar from '../../components/StaffSidebar';

const MedicalInjuryForm: React.FC = () => {
    return (
        <div className="flex bg-background-dark min-h-screen text-white font-display">
            <StaffSidebar />
            <main className="flex-1 p-8">
                <header className="mb-12">
                    <h1 className="text-4xl font-black tracking-tighter italic uppercase">PARTE MÉDICO</h1>
                    <p className="text-secondary text-sm font-bold uppercase tracking-widest opacity-40">Registro clínico de lesiones y tratamientos.</p>
                </header>
                <div className="bg-surface-dark p-8 rounded-3xl border border-white/5 max-w-4xl">
                    {/* Form content placeholder - keeping it simple for now as we are restoring */}
                    <p className="text-secondary italic">Formulario en proceso de restauración...</p>
                </div>
            </main>
        </div>
    );
};

export default MedicalInjuryForm;
