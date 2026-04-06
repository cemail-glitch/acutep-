'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, MessageCircle, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ExpertChatProps {
  lang: 'en' | 'zh';
}

interface Message {
  id: string;
  role: 'user' | 'expert';
  content: string;
  timestamp: Date;
}

const ExpertChat: React.FC<ExpertChatProps> = ({ lang }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'expert',
      content: lang === 'zh'
        ? '您好！我是您的消化科 AI 助手。请描述您的症状或提出问题，我会尽力为您提供专业的医学建议。'
        : 'Hello! I am your gastroenterology AI assistant. Please describe your symptoms or ask questions, and I will do my best to provide you with professional medical advice.',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/expert-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: input.trim(),
          lang,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      const expertMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'expert',
        content: data.answer,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, expertMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'expert',
        content: lang === 'zh'
          ? '抱歉，发生了错误。请稍后再试。'
          : 'Sorry, an error occurred. Please try again later.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const translations = {
    zh: {
      title: '与消化专家对话',
      titleEn: 'Chat with GI Expert',
      placeholder: '输入您的问题...',
      send: '发送',
      thinking: '正在思考...'
    },
    en: {
      title: 'Chat with GI Expert',
      titleEn: '与消化专家对话',
      placeholder: 'Type your question...',
      send: 'Send',
      thinking: 'Thinking...'
    }
  };

  const t = translations[lang];

  return (
    <section id="expert" className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-medical-blue px-4 py-2 rounded-full text-sm font-bold mb-4">
            <Sparkles size={16} />
            <span>AI 咨询</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            {t.title}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {lang === 'zh'
              ? '基于 DeepSeek 大语言模型，24/7 为您解答消化系统疾病相关问题'
              : 'Powered by DeepSeek LLM, available 24/7 to answer your questions about gastrointestinal diseases'}
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-medical-blue to-blue-600 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="text-white" size={20} />
              </div>
              <div>
                <h3 className="text-white font-bold">消化科 AI 专家</h3>
                <p className="text-blue-100 text-sm">
                  {lang === 'zh' ? '在线' : 'Online'} · DeepSeek GPT
                </p>
              </div>
            </div>
          </div>

          <div className="h-96 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === 'user'
                      ? 'bg-gray-100 text-gray-600'
                      : 'bg-gradient-to-br from-medical-blue to-blue-600 text-white'
                  }`}
                >
                  {message.role === 'user' ? <User size={18} /> : <Bot size={18} />}
                </div>
                <div
                  className={`max-w-[80%] rounded-2xl px-5 py-3 ${
                    message.role === 'user'
                      ? 'bg-medical-blue text-white rounded-tr-sm'
                      : 'bg-gray-100 text-gray-800 rounded-tl-sm'
                  }`}
                >
                  <div className="prose prose-sm max-w-none">
                    <ReactMarkdown
                      components={{
                        p: ({ children }) => (
                          <p className={`${message.role === 'user' ? '' : 'text-gray-700'} mb-2 last:mb-0`}>
                            {children}
                          </p>
                        ),
                        ul: ({ children }) => (
                          <ul className={`list-disc pl-4 space-y-1 ${message.role === 'user' ? '' : 'text-gray-700'}`}>
                            {children}
                          </ul>
                        ),
                        ol: ({ children }) => (
                          <ol className={`list-decimal pl-4 space-y-1 ${message.role === 'user' ? '' : 'text-gray-700'}`}>
                            {children}
                          </ol>
                        ),
                        li: ({ children }) => (
                          <li className={message.role === 'user' ? 'text-white' : 'text-gray-700'}>
                            {children}
                          </li>
                        ),
                        strong: ({ children }) => (
                          <strong className={message.role === 'user' ? 'text-yellow-200' : 'text-medical-blue'}>
                            {children}
                          </strong>
                        ),
                        em: ({ children }) => (
                          <em className={message.role === 'user' ? 'text-blue-200' : 'text-gray-500'}>
                            {children}
                          </em>
                        ),
                        code: ({ children }) => (
                          <code className={`px-1.5 py-0.5 rounded text-sm ${
                            message.role === 'user'
                              ? 'bg-white/20 text-white'
                              : 'bg-blue-50 text-medical-blue'
                          }`}>
                            {children}
                          </code>
                        ),
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-medical-blue to-blue-600 text-white">
                  <Bot size={18} />
                </div>
                <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-5 py-4">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Loader2 size={16} className="animate-spin" />
                    <span className="text-sm">{t.thinking}</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-gray-100 p-4 bg-gray-50">
            <form onSubmit={handleSubmit} className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t.placeholder}
                disabled={isLoading}
                className="flex-1 px-5 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-medical-blue focus:border-transparent text-gray-800 placeholder-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="bg-medical-blue text-white px-6 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg shadow-blue-900/20"
              >
                {isLoading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Send size={18} />
                )}
                <span className="hidden sm:inline">{t.send}</span>
              </button>
            </form>
          </div>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          {lang === 'zh'
            ? '⚠️ 本 AI 助手仅供参考，不能替代专业医生的诊断和建议。如有严重症状，请及时就医。'
            : '⚠️ This AI assistant is for reference only and cannot replace professional medical diagnosis. If you have serious symptoms, please seek medical attention promptly.'}
        </p>
      </div>
    </section>
  );
};

export default ExpertChat;