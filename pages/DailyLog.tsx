
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    id: 1,
    q: "How was your sleep quality last night?",
    options: [
      { id: 1, label: "Restless", sub: "Below Normal" },
      { id: 2, label: "Normal", sub: "Baseline" },
      { id: 3, label: "Restorative", sub: "Above Normal" }
    ]
  },
  {
    id: 2,
    q: "How is your muscle soreness today?",
    options: [
      { id: 1, label: "Significant", sub: "Tender to touch" },
      { id: 2, label: "Normal", sub: "Some fatigue" },
      { id: 3, label: "None", sub: "Fresh legs" }
    ]
  },
  {
    id: 3,
    q: "Current perceived stress level?",
    options: [
      { id: 1, label: "High", sub: "Distracted" },
      { id: 2, label: "Moderate", sub: "Managing" },
      { id: 3, label: "Low", sub: "Focused" }
    ]
  }
];

const DailyLog: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const handleSelect = (optionId: number) => {
    setAnswers(prev => ({ ...prev, [questions[step].id]: optionId }));
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // Completion Logic
      alert("Wellness log submitted! Syncing with AI coach...");
      navigate('/');
    }
  };

  const currentQ = questions[step];

  return (
    <div className="bg-background-dark text-white h-screen flex flex-col font-display">
      <header className="flex justify-between items-center p-8">
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-full bg-white/10 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined">ecg_heart</span>
          </div>
          <h2 className="text-lg font-bold">HEALTH TRACK</h2>
        </div>
        <button onClick={() => navigate('/')} className="size-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center">
          <span className="material-symbols-outlined">close</span>
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto w-full px-6 pb-20">
        <div className="w-full max-w-md mb-12">
          <div className="flex justify-between items-end mb-3">
            <span className="text-primary font-bold text-xs uppercase">Progress</span>
            <span className="text-white/40 text-xs font-mono">STEP {step + 1} OF {questions.length}</span>
          </div>
          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden flex gap-1">
            {questions.map((_, i) => (
              <div key={i} className={`h-full flex-1 rounded-full ${i <= step ? 'bg-primary' : 'bg-white/5'}`}></div>
            ))}
          </div>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-4">{currentQ.q}</h1>
          <p className="text-white/40 text-lg">Select the most accurate description.</p>
        </div>

        <div className="w-full max-w-lg flex flex-col gap-4">
          {currentQ.options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt.id)}
              className="group flex items-center justify-between w-full p-4 pl-8 pr-4 bg-[#1e293b] border border-[#334155] hover:border-primary/50 hover:bg-[#334155] rounded-full transition-all text-left"
            >
              <div className="flex items-center gap-6">
                <span className="size-8 flex items-center justify-center rounded-full bg-white/5 text-xs font-mono group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                  {opt.id}
                </span>
                <div>
                  <div className="text-lg md:text-xl font-bold">{opt.label}</div>
                  <div className="text-secondary text-sm">{opt.sub}</div>
                </div>
              </div>
              <div className="size-12 rounded-full bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="material-symbols-outlined text-primary">arrow_forward</span>
              </div>
            </button>
          ))}
        </div>
      </main>

      <footer className="p-8 flex justify-center">
        {step > 0 && (
          <button onClick={() => setStep(step - 1)} className="flex items-center gap-2 text-white/30 hover:text-white transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
            <span>Previous Step</span>
          </button>
        )}
      </footer>
    </div>
  );
};

export default DailyLog;
