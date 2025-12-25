
import React from 'react';

interface RESTQFormProps {
    onComplete: () => void;
}

const RESTQForm: React.FC<RESTQFormProps> = ({ onComplete }) => {
    return (
        <div className="max-w-xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
            <header className="text-center space-y-2">
                <h2 className="text-3xl font-black italic tracking-tighter uppercase">REST-Q Form</h2>
                <p className="text-secondary text-xs font-bold uppercase tracking-widest opacity-60">Recovery-Stress Questionnaire</p>
            </header>
            <div className="bg-surface-dark p-8 rounded-3xl border border-white/5">
                <button onClick={onComplete} className="w-full bg-primary text-[#0b1120] font-black py-4 rounded-2xl uppercase tracking-widest mt-8">
                    Complete Survey
                </button>
            </div>
        </div>
    );
};

export default RESTQForm;
