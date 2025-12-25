
import React, { useState } from 'react';

interface WellnessFormProps {
    onNext: () => void;
}

const WellnessForm: React.FC<WellnessFormProps> = ({ onNext }) => {
    return (
        <div className="max-w-xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
            <header className="text-center space-y-2">
                <h2 className="text-3xl font-black italic tracking-tighter uppercase">Wellness Form</h2>
                <p className="text-secondary text-xs font-bold uppercase tracking-widest opacity-60">Morning check-in</p>
            </header>
            <div className="bg-surface-dark p-8 rounded-3xl border border-white/5 space-y-6">
                <div className="space-y-4">
                    <p className="text-center text-sm font-bold uppercase tracking-widest text-primary">How did you sleep?</p>
                    <div className="flex justify-between gap-2">
                        {[1, 2, 3, 4, 5].map(num => (
                            <button key={num} className="size-12 rounded-xl bg-[#0b1120] border border-[#334155] flex items-center justify-center font-bold hover:border-primary transition-all">
                                {num}
                            </button>
                        ))}
                    </div>
                </div>
                <button onClick={onNext} className="w-full bg-primary text-[#0b1120] font-black py-4 rounded-2xl uppercase tracking-widest mt-8">
                    Next
                </button>
            </div>
        </div>
    );
};

export default WellnessForm;
