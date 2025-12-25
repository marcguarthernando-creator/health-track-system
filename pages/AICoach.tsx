
import React from 'react';
import Sidebar from '../components/Sidebar';
import ChatInterface from '../components/ChatInterface';

const AICoach: React.FC = () => {
    return (
        <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-white">
            <Sidebar />
            <main className="flex-1 flex flex-col h-full relative overflow-hidden">
                {/* Header - simplified version of Dashboard header for consistency */}
                <header className="sticky top-0 z-10 bg-[#0b1120]/90 backdrop-blur-md border-b border-[#334155] px-8 py-4 flex items-center justify-between flex-shrink-0">
                    <div className="flex flex-col">
                        <h2 className="text-xl font-bold text-white tracking-tight">AI Performance Coach</h2>
                        <span className="text-secondary text-sm">Real-time analysis & guidance</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                            <div className="flex flex-col items-end mr-2">
                                <span className="text-sm font-bold text-white">Alex Morgan</span>
                                <span className="text-xs text-primary">Athlete</span>
                            </div>
                            <div className="size-10 bg-center bg-cover rounded-full border-2 border-[#1e293b]" style={{ backgroundImage: 'url("https://picsum.photos/seed/alex/100/100")' }}></div>
                        </div>
                    </div>
                </header>

                <div className="flex-1 p-4 md:p-8 max-w-[1600px] w-full mx-auto h-full overflow-hidden">
                    <div className="h-full">
                        <ChatInterface />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AICoach;
