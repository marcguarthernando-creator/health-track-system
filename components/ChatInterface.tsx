
import React, { useState, useRef, useEffect } from 'react';
import { chatWithCoach, ChatMessage } from '../services/geminiService';

type Message = {
    id: string;
    role: 'user' | 'model';
    text: string;
    timestamp: Date;
};

const ChatInterface: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'model',
            text: "Hello, Alex. I'm Nova, your performance coach. I've analyzed your sleep and HRV data. You're looking ready for today's session. How can I help you fine-tune your preparation?",
            timestamp: new Date()
        }
    ]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputText.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            role: 'user',
            text: inputText,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInputText('');
        setIsTyping(true);

        // Convert internal message format to Gemini history format
        const history: ChatMessage[] = messages.map(m => ({
            role: m.role,
            parts: [{ text: m.text }]
        }));

        try {
            const responseText = await chatWithCoach(history, userMsg.text);

            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'model',
                text: responseText,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, botMsg]);
        } catch (error) {
            console.error("Chat error:", error);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="flex flex-col h-full bg-surface-darker rounded-[2rem] border border-[#334155] overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>

            {/* Header */}
            <div className="p-6 border-b border-[#334155] bg-[#0b1120]/50 backdrop-blur-md flex items-center gap-4">
                <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                    <span className="material-symbols-outlined text-primary text-2xl">psychology</span>
                </div>
                <div>
                    <h3 className="text-white font-bold text-lg">Nova AI Coach</h3>
                    <div className="flex items-center gap-2">
                        <span className="size-2 rounded-full bg-primary animate-pulse"></span>
                        <span className="text-secondary text-xs uppercase tracking-wider">Online • Performance Analytics</span>
                    </div>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-[#334155] scrollbar-track-transparent">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[80%] rounded-2xl p-4 md:p-6 ${msg.role === 'user'
                                ? 'bg-primary text-[#0b1120] rounded-tr-sm'
                                : 'bg-[#334155] text-white rounded-tl-sm'
                                }`}
                        >
                            <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                            <span className={`text-[10px] mt-2 block opacity-60 ${msg.role === 'user' ? 'text-[#0b1120]' : 'text-secondary'}`}>
                                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="flex justify-start">
                        <div className="bg-[#334155] rounded-2xl p-4 rounded-tl-sm flex items-center gap-1">
                            <span className="size-2 bg-secondary/50 rounded-full animate-bounce"></span>
                            <span className="size-2 bg-secondary/50 rounded-full animate-bounce delay-75"></span>
                            <span className="size-2 bg-secondary/50 rounded-full animate-bounce delay-150"></span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 md:p-6 bg-[#0b1120] border-t border-[#334155]">
                <form onSubmit={handleSendMessage} className="relative">
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Ask about your workout, recovery, or nutrition..."
                        className="w-full bg-[#1e293b] text-white rounded-full pl-6 pr-14 py-4 focus:outline-none focus:ring-2 focus:ring-primary/50 border border-[#334155] placeholder-secondary/50 transition-all"
                    />
                    <button
                        type="submit"
                        disabled={!inputText.trim() || isTyping}
                        className="absolute right-2 top-2 size-10 bg-primary rounded-full flex items-center justify-center text-[#0b1120] hover:bg-primary-dim disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <span className="material-symbols-outlined">send</span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatInterface;
