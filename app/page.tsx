'use client';

import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Brain, 
  Zap, 
  ArrowRight, 
  ChevronRight, 
  CheckCircle2, 
  LayoutDashboard,
  Mail,
  Phone,
  Loader2,
  FileText,
  Globe,
  User,
  Upload
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { DiagnosisData, DiagnosisResult } from '@/lib/types';
import PainPointsSection from '@/app/components/PainPointsSection';
import HeroSection from '@/app/components/HeroSection';
import ProductDemo from '@/app/components/ProductDemo';
import TechnologySection from '@/app/components/TechnologySection';
import TeamSection from '@/app/components/TeamSection';
import CooperationSection from '@/app/components/CooperationSection';
import Footer from '@/app/components/Footer';
import ExpertChat from '@/app/components/ExpertChat';

const translations = {
  en: {
    nav: {
      features: "Features",
      tech: "Technology",
      demo: "Demo",
      request: "Request Demo"
    },
    hero: {
      badge: "NEXT GEN CLINICAL AI",
      title_part1: "PancreaScan-AI",
      title_part2: "AP Heterogeneity Classification Agent",
      subtitle: "China's first AP diagnostic agent based on dynamic heart rate trajectory LCTM classification, achieving 94.7% accuracy.",
      apply: "Request Demo",
      whitepaper: "Whitepaper"
    },
    stats: {
      accuracy: "Accuracy",
      processing: "Processing",
      sites: "Clinical Sites",
      patents: "AI Patents"
    },
    footer: {
      desc: "Advanced medical intelligence for high-precision diagnosis of pancreatic diseases.",
      trial: "Request Trial",
      trialDesc: "Apply for institutional access for clinical research purposes.",
      getStarted: "Get Started",
      copy: "© 2025 PancreaScan-AI Technologies Inc. All rights reserved."
    }
  },
  zh: {
    nav: {
      features: "功能特性",
      tech: "核心技术",
      demo: "在线演示",
      request: "索取演示"
    },
    hero: {
      badge: "新一代临床智能 AI",
      title_part1: "PancreaScan-AI",
      title_part2: "AP 异质性分型 Agent",
      subtitle: "国内首个基于动态心率轨迹 LCTM 分型的 AP 专属诊疗 Agent，实现 94.7% 的超高准确率。",
      apply: "申请产品演示",
      whitepaper: "技术白皮书"
    },
    stats: {
      accuracy: "准确率",
      processing: "处理耗时",
      sites: "临床合作机构",
      patents: "AI 专利"
    },
    footer: {
      desc: "致力于为胰腺疾病的高精度诊断提供先进的医疗智能方案。",
      copy: "© 2025 PancreaScan-AI 科技有限公司。保留所有权利。"
    }
  }
};

const Navbar = ({ lang, setLang }: { lang: 'en' | 'zh', setLang: (l: 'en' | 'zh') => void }) => {
  const t = translations[lang].nav;
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-2">
            <div className="bg-medical-blue p-1.5 rounded-lg">
              <Activity className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-medical-blue">PancreaScan-AI<span className="text-gray-400 font-light">™</span></span>
          </div>
          <div className="hidden md:flex space-x-6 font-medium text-gray-600 text-sm">
            <a href="#tech" className="hover:text-medical-blue transition-colors">{t.tech}</a>
            <a href="#demo" className="hover:text-medical-blue transition-colors">{t.demo}</a>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
              className="flex items-center space-x-1.5 text-gray-600 hover:text-medical-blue transition-colors font-medium text-sm"
            >
              <Globe size={16} />
              <span>{lang === 'en' ? '中文' : 'English'}</span>
            </button>
            <button className="bg-medical-blue text-white px-5 py-2 rounded-full font-semibold hover:bg-opacity-90 transition-all shadow-lg shadow-blue-900/10 text-sm">
              {t.request}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
    <div className="mb-6 p-3 bg-blue-50 w-fit rounded-xl group-hover:bg-medical-blue group-hover:text-white transition-colors text-medical-blue">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

const SectionHeading = ({ badge, title, subtitle }: { badge?: string, title: string, subtitle?: string }) => (
  <div className="text-center mb-16">
    {badge && <span className="text-sm font-bold tracking-widest text-medical-blue uppercase bg-blue-50 px-4 py-1.5 rounded-full mb-4 inline-block">{badge}</span>}
    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">{title}</h2>
    {subtitle && <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>}
  </div>
);

const WorkflowStep = ({ number, title, description, isLast = false }: { number: number, title: string, description: string, isLast?: boolean }) => (
  <div className="relative flex-1 flex flex-col items-center text-center px-4">
    <div className="w-16 h-16 bg-white border-4 border-blue-50 rounded-full flex items-center justify-center text-2xl font-bold text-medical-blue mb-6 shadow-sm z-10">
      {number}
    </div>
    {!isLast && <div className="hidden lg:block absolute top-8 left-1/2 w-full h-0.5 bg-blue-100 -z-0"></div>}
    <h4 className="text-xl font-bold mb-2 text-gray-900">{title}</h4>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default function Home() {
  const [lang, setLang] = useState<'en' | 'zh'>('zh');
  const t = translations[lang];

  const [formData, setFormData] = useState<DiagnosisData>({
    imaging: lang === 'zh' ? '面部表情显示中度疼痛，体型偏胖。' : 'Facial expression shows moderate pain, body type appears overweight.',
    crp: '150',
    whiteCell: '18',
    painLevel: '8'
  });

  useEffect(() => {
    // Reset imaging field when language changes
    setFormData(prev => ({
      ...prev,
      imaging: lang === 'zh' ? '面部表情显示中度疼痛，体型偏胖。' : 'Facial expression shows moderate pain, body type appears overweight.'
    }));
  }, [lang]);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [chatMessages, setChatMessages] = useState<Array<{role: 'user' | 'expert', content: string}>>([
    { role: 'expert', content: lang === 'zh' ? '您好，我是胰腺炎领域的 AI 专家，有什么可以帮助您的？' : 'Hello, I\'m an AI expert in pancreatitis. How can I help you?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  const handleSimulate = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/diagnosis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          lang,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get diagnosis');
      }

      const diagnosis = await response.json();
      setResult(diagnosis);
    } catch (err) {
      alert(lang === 'zh' ? "模拟失败。请检查您的 API 密钥。" : "Simulation failed. Please check your API key.");
    } finally {
      setLoading(false);
    }
  };

  const handleChatSend = async () => {
    if (!chatInput.trim()) return;
    
    const userMessage = chatInput;
    setChatMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setChatInput('');
    setChatLoading(true);

    try {
      const response = await fetch('/api/diagnosis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imaging: '',
          crp: '0',
          whiteCell: '0',
          painLevel: '0',
          lang,
          question: userMessage
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      const expertResponse = data.diagnosis || (lang === 'zh' ? '抱歉，我无法回答这个问题。' : 'Sorry, I cannot answer this question.');
      setChatMessages(prev => [...prev, { role: 'expert', content: expertResponse }]);
    } catch (err) {
      setChatMessages(prev => [...prev, { role: 'expert', content: lang === 'zh' ? '抱歉，发生了一些错误。请稍后再试。' : 'Sorry, an error occurred. Please try again later.' }]);
    } finally {
      setChatLoading(false);
    }
  };

  const clinicalPerformanceData = [
    { name: lang === 'zh' ? '传统方法' : 'Traditional', accuracy: 76.5, sensitivity: 72.1, specificity: 78.4 },
    { name: lang === 'zh' ? 'PancreaScan-AI' : 'PancreaScan-AI', accuracy: 94.7, sensitivity: 93.2, specificity: 95.8 },
  ];

  return (
    <div className="min-h-screen">
      <Navbar lang={lang} setLang={setLang} />

      <HeroSection lang={lang} />

      <PainPointsSection lang={lang} />

      <TechnologySection lang={lang} />

      <ProductDemo lang={lang} />

      <TeamSection lang={lang} />

      <CooperationSection lang={lang} />

      <ExpertChat lang={lang} />

      <Footer lang={lang} />
    </div>
  );
}
