
import React, { useState } from 'react';

interface WellnessFormProps {
    onNext: () => void;
}

const WellnessForm: React.FC<WellnessFormProps> = ({ onNext }) => {
    const [sick, setSick] = useState<string | null>(null);
    const [sleepHours, setSleepHours] = useState<string | null>(null);
    const [sleepQuality, setSleepQuality] = useState<number | null>(null);

    const isComplete = sick && sleepHours && sleepQuality;

    return (
        <div className="flex flex-col gap-6 max-w-2xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold text-center mb-4 text-white">Wellness Check</h2>

            {/* Q1: Sick? */}
            <div className="bg-surface-dark rounded-2xl p-6 border border-[#334155]">
                <label className="block text-lg font-medium text-white mb-4">Do you feel sick today?</label>
                <div className="flex flex-col gap-2">
                    {['No', 'Yes'].map((opt) => (
                        <button
                            key={opt}
                            onClick={() => setSick(opt)}
                            className={`p-4 rounded-xl text-left border transition-all ${sick === opt
                                    ? 'bg-primary text-[#0b1120] border-primary font-bold'
                                    : 'bg-[#1e293b] text-white border-[#334155] hover:bg-[#334155]'
                                }`}
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            </div>

            {/* Q2: Sleep Hours */}
            <div className="bg-surface-dark rounded-2xl p-6 border border-[#334155]">
                <label className="block text-lg font-medium text-white mb-4">How many hours did you sleep last night?</label>
                <div className="flex flex-col gap-2">
                    {['≥ 8 h', '7-8 h', '6-7 h', '≤ 6 h'].map((opt) => (
                        <button
                            key={opt}
                            onClick={() => setSleepHours(opt)}
                            className={`p-4 rounded-xl text-left border transition-all ${sleepHours === opt
                                    ? 'bg-primary text-[#0b1120] border-primary font-bold'
                                    : 'bg-[#1e293b] text-white border-[#334155] hover:bg-[#334155]'
                                }`}
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            </div>

            {/* Q3: Sleep Quality */}
            <div className="bg-surface-dark rounded-2xl p-6 border border-[#334155]">
                <label className="block text-lg font-medium text-white mb-4">How did you sleep last night?</label>
                <div className="flex flex-col gap-2">
                    {[
                        { val: 1, label: 'Very rested (1)' },
                        { val: 2, label: '2' },
                        { val: 3, label: '3' },
                        { val: 4, label: '4' },
                        { val: 5, label: '5' },
                        { val: 6, label: '6' },
                        { val: 7, label: 'Insomnia (7)' },
                    ].map((opt) => (
                        <button
                            key={opt.val}
                            onClick={() => setSleepQuality(opt.val)}
                            className={`p-3 px-4 rounded-xl text-left border transition-all flex justify-between items-center ${sleepQuality === opt.val
                                    ? 'bg-primary text-[#0b1120] border-primary font-bold'
                                    : 'bg-[#1e293b] text-white border-[#334155] hover:bg-[#334155]'
                                }`}
                        >
                            <span>{opt.label}</span>
                            {/* Visual color scale indicator could go here if needed, keeping simple for now */}
                        </button>
                    ))}
                </div>
            </div>

            <button
                disabled={!isComplete}
                onClick={onNext}
                className="mt-4 bg-primary text-[#0b1120] font-bold py-4 rounded-2xl text-lg hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
                Next Step
            </button>
        </div>
    );
};

export default WellnessForm;
