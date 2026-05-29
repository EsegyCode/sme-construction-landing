"use client";

import { useState, useRef, useEffect } from "react";

// Ваша URL-адреса Cloudflare Worker, яку ви щойно успішно створили
const WORKER_URL = "https://budpro-chat-worker.budpro-chat-krivtsov.workers.dev";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user" as const, content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Зберігаємо контекст розмови (останні 10 повідомлень)
    const chatHistory = [...messages, userMessage].slice(-10);

    try {
      const res = await fetch(WORKER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: chatHistory }),
      });
      const data = await res.json();
      
      if (data.response) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.response }]);
      } else {
        setMessages((prev) => [...prev, { role: "assistant", content: "Вибачте, виникла помилка. Спробуйте пізніше." }]);
      }
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Не вдалося з'єднатися із сервером ШІ." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 font-sans text-white">
      {/* ПУЛЬСУЮЧА КНОПКА FAB ЛІВОРУЧ */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 group"
        >
          <span className="absolute inset-0 rounded-full bg-orange-500 opacity-40 animate-ping" />
          <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
      )}

      {/* ВІКНО ЧАТУ */}
      {isOpen && (
        <div className="flex h-[450px] w-[330px] flex-col border border-gray-800 bg-[#161616] shadow-2xl md:w-[360px] rounded-lg overflow-hidden">
          {/* Шапка чату */}
          <div className="flex items-center justify-between border-b border-gray-800 bg-[#111111] px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs uppercase tracking-widest font-bold text-gray-400">БудПроф AI</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-orange-500 text-xl font-light">×</button>
          </div>

          {/* Область повідомлень */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-sm bg-[#141414]">
            {messages.length === 0 && (
              <div className="text-gray-500 text-center text-xs mt-10 p-4 border border-dashed border-gray-800 rounded">
                Вітаємо! Я ваш інженерний ШІ-асистент. Запитайте мене про ціни, терміни або матеріали для будівництва котеджу.
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] px-3 py-2 rounded ${msg.role === "user" ? "bg-orange-500 text-white" : "bg-[#202020] border border-gray-800 text-gray-200"}`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-[#202020] border border-gray-800 text-gray-500 px-3 py-2 text-xs animate-pulse rounded">
                  БудПроф ШІ друкує...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Форма введення */}
          <form onSubmit={handleSend} className="border-t border-gray-800 p-2 flex bg-[#111111]">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Напишіть запитання..."
              className="flex-1 bg-transparent px-3 py-2 text-xs focus:outline-none placeholder:text-gray-600 text-white"
            />
            <button type="submit" className="bg-orange-500 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-orange-400 rounded transition-colors">
              ВІДПРАВИТИ
            </button>
          </form>
        </div>
      )}
    </div>
  );
}