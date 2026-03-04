import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useStore } from '../store';

function AIAssistant() {
    const { user } = useStore();
    const location = useLocation();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const chatEndRef = useRef(null);

    useEffect(() => {
        // Initial fetch of products to send to the AI for recommendation context
        fetch('http://localhost:5000/api/products')
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(console.error);

        // Initial greeting or product context
        const initialMsg = location.state?.productContext
            ? `I have a question about ${location.state.productContext}`
            : "Hello! I need some shopping advice.";

        if (messages.length === 0) setInput(initialMsg);
    }, [location]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async (e) => {
        e?.preventDefault();
        if (!input.trim() || loading) return;

        const userMsg = input.trim();
        setInput('');
        const newMessages = [...messages, { role: 'user', content: userMsg }];
        setMessages(newMessages);
        setLoading(true);

        try {
            // Determine if they are asking for recommendations or general chat
            const isRecommendation = userMsg.toLowerCase().includes('recommend') || userMsg.toLowerCase().includes('suggest') || userMsg.toLowerCase().includes('find');

            let endpoint = 'http://localhost:5000/api/ai/chat';
            let payload = { message: userMsg, history: messages.filter(m => !m.recommendations) };

            if (isRecommendation && products.length > 0) {
                endpoint = 'http://localhost:5000/api/ai/recommend';
                payload = { userMessage: userMsg, products: products };
            }

            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(payload)
            });

            const data = await res.json();

            if (isRecommendation && data.recommendations) {
                setMessages([...newMessages, {
                    role: 'ai',
                    content: data.reply,
                    recommendations: data.recommendations
                }]);
            } else {
                setMessages([...newMessages, {
                    role: 'ai',
                    content: data.reply || "I'm sorry, I couldn't process that request."
                }]);
            }

            // If user is logged in, perhaps save chat to backend (optional for now based on complexity)
        } catch (err) {
            console.error(err);
            setMessages([...newMessages, { role: 'ai', content: "Sorry, I'm having trouble connecting right now." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex-1 flex max-w-5xl w-full mx-auto flex-col md:flex-row h-[calc(100vh-64px)] mt-[64px] rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl mb-10">

            {/* Main Chat Area */}
            <section className="flex-1 flex flex-col relative bg-white/30 dark:bg-slate-900/40">

                {/* Header */}
                <header className="bg-primary/5 dark:bg-primary/10 px-4 py-3 flex items-center gap-3 border-b border-primary/10">
                    <div className="bg-primary p-2 rounded-lg text-white">
                        <span className="material-symbols-outlined text-xl">smart_toy</span>
                    </div>
                    <div>
                        <h1 className="text-base font-bold leading-tight tracking-tight">ShopAI <span className="text-primary">Assistant</span></h1>
                        <p className="text-xs text-slate-500 font-medium">Online</p>
                    </div>
                </header>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-6 flex flex-col">
                    {messages.length === 0 && (
                        <div className="flex-1 flex items-center justify-center text-slate-400 p-8 text-center flex-col">
                            <span className="material-symbols-outlined text-4xl mb-2">forum</span>
                            <p>Send a message to start chatting with your AI shopping assistant.</p>
                            <p className="text-sm mt-2">Try: "Find me headphones under $200"</p>
                        </div>
                    )}

                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} items-start gap-3`}>
                            {msg.role === 'ai' && (
                                <div className="size-8 rounded-xl bg-primary flex items-center justify-center shrink-0 shadow-lg shadow-primary/30 mt-1">
                                    <span className="material-symbols-outlined text-white text-sm">auto_awesome</span>
                                </div>
                            )}

                            <div className={`max-w-[80%] flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                                <div className={`${msg.role === 'user' ? 'bg-primary text-white text-right' : 'bg-white dark:bg-slate-800 border border-primary/10'} px-4 py-3 rounded-2xl ${msg.role === 'user' ? 'rounded-tr-none' : 'rounded-tl-none'} shadow-sm`}>
                                    <p className="text-sm md:text-base whitespace-pre-wrap">{msg.content}</p>
                                </div>

                                {msg.recommendations && msg.recommendations.length > 0 && (
                                    <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl">
                                        {msg.recommendations.map((rec, i) => {
                                            const prod = products.find(p => p._id === rec.productId || p.id === rec.productId);
                                            if (!prod) return null;
                                            return (
                                                <div key={i} className="bg-background-light dark:bg-slate-900/60 rounded-xl p-3 border border-primary/10 text-left">
                                                    <h4 className="font-bold text-sm mb-1 line-clamp-1">{prod.name}</h4>
                                                    <p className="text-xs text-slate-500 mb-2">${prod.price} - {rec.reason}</p>
                                                    <Link to={`/products/${prod._id}`} className="text-xs text-primary font-bold hover:underline">View Product</Link>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            {msg.role === 'user' && (
                                <div className="size-8 rounded-xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center shrink-0 mt-1">
                                    <span className="material-symbols-outlined text-sm">{user ? 'person' : 'face'}</span>
                                </div>
                            )}
                        </div>
                    ))}

                    {loading && (
                        <div className="flex justify-start items-start gap-3">
                            <div className="size-8 rounded-xl bg-primary flex items-center justify-center shrink-0 shadow-lg shadow-primary/30 mt-1 animate-pulse">
                                <span className="material-symbols-outlined text-white text-sm">auto_awesome</span>
                            </div>
                            <div className="bg-white dark:bg-slate-800 border border-primary/10 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm flex gap-1 items-center">
                                <div className="w-2 h-2 bg-primary/50 text-slate-400 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-primary/50 text-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                <div className="w-2 h-2 bg-primary/50 text-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                            </div>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-t border-primary/10">
                    <form onSubmit={handleSend} className="relative flex items-center">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="w-full bg-background-light dark:bg-slate-800 border border-primary/20 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl py-3 pl-4 pr-12 text-sm transition-all outline-none"
                            placeholder="Ask for recommendations..."
                            autoFocus
                        />
                        <button
                            type="submit"
                            disabled={loading || !input.trim()}
                            className="absolute right-2 bg-primary text-white p-2 rounded-lg hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className="material-symbols-outlined text-sm block">send</span>
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
}

export default AIAssistant;
