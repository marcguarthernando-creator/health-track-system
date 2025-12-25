
import React, { useState } from 'react';

interface ReadinessFormProps {
    onComplete: () => void;
}

const scaleOptions = [
    { val: 1, label: '1 (Best/None)', color: 'bg-[#ecfdf5] text-[#064e3b] dark:bg-[#064e3b] dark:text-[#ecfdf5]' }, // Green-ish
    { val: 2, label: '2', color: 'bg-[#d1fae5] text-[#065f46] dark:bg-[#065f46] dark:text-[#d1fae5]' },
    { val: 3, label: '3', color: 'bg-[#a7f3d0] text-[#064e3b] dark:bg-[#047857] dark:text-[#a7f3d0]' },
    { val: 4, label: '4', color: 'bg-[#fef3c7] text-[#78350f] dark:bg-[#78350f] dark:text-[#fef3c7]' }, // Yellow-ish
    { val: 5, label: '5', color: 'bg-[#fde68a] text-[#854d0e] dark:bg-[#854d0e] dark:text-[#fde68a]' },
    { val: 6, label: '6', color: 'bg-[#fed7aa] text-[#9a3412] dark:bg-[#9a3412] dark:text-[#fed7aa]' }, // Orange-ish
    { val: 7, label: '7 (Worst/Extreme)', color: 'bg-[#fecaca] text-[#991b1b] dark:bg-[#991b1b] dark:text-[#fecaca]' }, // Red-ish
];

const ReadinessForm: React.FC<ReadinessFormProps> = ({ onComplete }) => {
    const [tired, setTired] = useState<number | null>(null);
    const [sore, setSore] = useState<number | null>(null);
    const [stress, setStress] = useState<number | null>(null);
    const [mood, setMood] = useState<number | null>(null);

    const isComplete = tired && sore && stress && mood;

    // Helper to render a question block
    const QuestionBlock = ({
        label,
        value,
        setValue,
        descriptions
    }: {
        label: string,
        value: number | null,
        setValue: (v: number) => void,
        descriptions: { 1: string, 7: string }
    }) => (
        <div className="bg-surface-dark rounded-2xl p-6 border border-[#334155]">
            <label className="block text-lg font-medium text-white mb-4">{label}</label>
            <div className="flex flex-col gap-1">
                {scaleOptions.map((opt) => (
                    <button
                        key={opt.val}
                        onClick={() => setValue(opt.val)}
                        className={`p-3 rounded-lg text-left transition-all flex justify-between items-center ${value === opt.val
                                ? 'ring-2 ring-primary ring-offset-2 ring-offset-[#1e293b] font-bold ' + opt.color.replace('text-', 'text-black ') // Highlight logic simplified
                                : opt.color + ' opacity-80 hover:opacity-100'
                            }`}
                    >
                        <span>{opt.val}</span>
                        <span className="text-xs uppercase font-bold opacity-70">
                            {opt.val === 1 ? descriptions[1] : opt.val === 7 ? descriptions[7] : ''}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );

    return (
        <div className="flex flex-col gap-6 max-w-2xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
            <h2 className="text-2xl font-bold text-center mb-4 text-white">Daily Readiness</h2>

            <QuestionBlock
                label="Do you feel tired today?"
                value={tired}
                setValue={setTired}
                descriptions={{ 1: 'Not Tired', 7: 'Very Tired' }}
            />

            <QuestionBlock
                label="Do you feel sore today?"
                value={sore}
                setValue={setSore}
                descriptions={{ 1: 'Not Sore', 7: 'Very Sore' }}
            />

            <QuestionBlock
                label="What is your stress level today?"
                value={stress}
                setValue={setStress}
                descriptions={{ 1: 'Very Relaxed', 7: 'Highly Stressed' }}
            />

            <QuestionBlock
                label="What is your mood state today?"
                value={mood}
                setValue={setMood}
                descriptions={{ 1: 'Very Positive', 7: 'Highly Annoyed' }}
            />

            <button
                disabled={!isComplete}
                onClick={onComplete}
                className="mt-4 bg-primary text-[#0b1120] font-bold py-4 rounded-2xl text-lg hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
                Submit & View Workout
            </button>
        </div>
    );
};

export default ReadinessForm;
