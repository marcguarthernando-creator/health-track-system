
import React from 'react';

interface RESTQFormProps {
    onComplete: () => void;
}

const RESTQForm: React.FC<RESTQFormProps> = ({ onComplete }) => {
    return (
        <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold text-center mb-1 text-white">RESTQ-Sport-36</h2>
            <p className="text-center text-secondary mb-4">Detailed Recovery-Stress Questionnaire (Periodic)</p>

            <div className="bg-surface-dark p-8 rounded-2xl border border-[#334155] text-center">
                <p className="text-white mb-6">This is the periodic RESTQ questionnaire (appears every 2 months).</p>

                {/* Placeholder for the 36 questions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left mb-8">
                    <div className="bg-[#0b1120] p-4 rounded-xl border border-[#334155]">
                        <h4 className="font-bold text-primary mb-2">General Stress</h4>
                        <p className="text-sm text-secondary">Questions about general stress levels...</p>
                    </div>
                    <div className="bg-[#0b1120] p-4 rounded-xl border border-[#334155]">
                        <h4 className="font-bold text-primary mb-2">Emotional Stress</h4>
                        <p className="text-sm text-secondary">Questions about emotional state...</p>
                    </div>
                    <div className="bg-[#0b1120] p-4 rounded-xl border border-[#334155]">
                        <h4 className="font-bold text-primary mb-2">Social Recovery</h4>
                        <p className="text-sm text-secondary">Questions about social interactions...</p>
                    </div>
                    <div className="bg-[#0b1120] p-4 rounded-xl border border-[#334155]">
                        <h4 className="font-bold text-primary mb-2">Physical Recovery</h4>
                        <p className="text-sm text-secondary">Questions about physical state...</p>
                    </div>
                </div>

                <button
                    onClick={onComplete}
                    className="bg-primary text-[#0b1120] font-bold py-3 px-8 rounded-full hover:shadow-glow transition-all"
                >
                    Complete Questionnaire
                </button>
            </div>
        </div>
    );
};

export default RESTQForm;
