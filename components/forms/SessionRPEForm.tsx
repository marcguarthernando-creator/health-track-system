
import React, { useState } from 'react';

interface SessionRPEFormProps {
    onComplete: () => void;
}

const rpeOptions = [
    { val: 0, label: 'Rest', color: 'bg-[#10b981]' }, // Emerald-500
    { val: 1, label: 'Very, Very Easy', color: 'bg-[#34d399]' }, // Emerald-400
    { val: 2, label: 'Easy', color: 'bg-[#6ee7b7]' }, // Emerald-300
    { val: 3, label: 'Moderate', color: 'bg-[#facc15]' }, // Yellow-400
    { val: 4, label: 'Somewhat Hard', color: 'bg-[#fbbf24]' }, // Amber-400
    { val: 5, label: 'Hard', color: 'bg-[#f59e0b]' }, // Amber-500
    { val: 6, label: '*', color: 'bg-[#f97316]' }, // Orange-500
    { val: 7, label: 'Very Hard', color: 'bg-[#ea580c]' }, // Orange-600
    { val: 8, label: '*', color: 'bg-[#dc2626]' }, // Red-600
    { val: 9, label: '*', color: 'bg-[#991b1b]' }, // Red-800
    { val: 10, label: 'Maximal', color: 'bg-[#450a0a]' }, // Red-950
];

const SessionRPEForm: React.FC<SessionRPEFormProps> = ({ onComplete }) => {
    const [rpe, setRpe] = useState<number | null>(null);
    const [duration, setDuration] = useState<string>('');

    const handleSubmit = () => {
        if (rpe !== null && duration) {
            // In real app, save sRPE = rpe * duration
            onComplete();
        }
    };

    return (
        <div className="flex flex-col gap-6 max-w-2xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold text-center mb-4 text-white">Session RPE</h2>
            <p className="text-center text-secondary mb-4">Considering the session as a whole, how hard was it?</p>

            {/* Manual Duration Input if not auto-tracked */}
            <div className="bg-surface-dark rounded-2xl p-6 border border-[#334155] flex flex-col gap-2">
                <label className="text-white font-bold">Session Duration (minutes)</label>
                <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full bg-[#0b1120] border border-[#334155] rounded-xl p-3 text-white focus:outline-none focus:border-primary"
                    placeholder="e.g. 60"
                />
            </div>

            <div className="bg-surface-dark rounded-2xl border border-[#334155] overflow-hidden flex flex-col">
                {rpeOptions.map((opt) => (
                    <button
                        key={opt.val}
                        onClick={() => setRpe(opt.val)}
                        className={`p-4 flex items-center justify-between transition-all hover:brightness-110 ${opt.color} ${rpe === opt.val ? 'ring-4 ring-white z-10' : ''}`}
                    >
                        <div className="flex items-center gap-4">
                            <span className="font-bold text-xl w-8 text-black/80">{opt.val}</span>
                            <span className="font-medium text-black/80 uppercase tracking-wider text-sm">{opt.label !== '*' ? opt.label : ''}</span>
                        </div>
                        {/* Faces icons could be mapped here */}
                        <span className="material-symbols-outlined text-black/60">
                            {opt.val < 3 ? 'sentiment_satisfied' : opt.val < 5 ? 'sentiment_neutral' : opt.val < 8 ? 'sentiment_dissatisfied' : 'sentiment_very_dissatisfied'}
                        </span>
                    </button>
                ))}
            </div>

            <button
                disabled={!rpe || !duration}
                onClick={handleSubmit}
                className="mt-4 bg-primary text-[#0b1120] font-bold py-4 rounded-2xl text-lg hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
                Submit Session
            </button>
        </div>
    );
};

export default SessionRPEForm;
