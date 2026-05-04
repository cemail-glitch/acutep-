'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
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
  Upload,
  Menu,
  X
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
      features: "Core Features",
      solution: "Solution",
      clinical: "Clinical",
      team: "Team",
      experience: "Experience"
    },
    hero: {
      badge: "NEXT GEN CLINICAL AI",
      title_part1: "PancreaScan-AI",
      title_part2: "AP Heterogeneity Classification Agent",
      subtitle: "China's first AP diagnostic agent based on dynamic heart rate trajectory GBTM classification, achieving 94.7% accuracy.",
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
      features: "核心功能",
      solution: "解决方案",
      clinical: "临床验证",
      team: "团队合作",
      experience: "体验"
    },
    hero: {
      badge: "新一代临床智能 AI",
      title_part1: "PancreaScan-AI",
      title_part2: "AP 异质性分型 Agent",
      subtitle: "国内首个基于动态心率轨迹 GBTM 分型的 AP 专属诊疗 Agent，实现 94.7% 的超高准确率。",
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#pain-points', label: t.features },
    { href: '#solution', label: t.solution },
    { href: '#clinical', label: t.clinical },
    { href: '#team', label: t.team },
    { href: '#demo', label: t.experience }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white/80 backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-2">
            <div className="relative w-8 h-8">
              <Image src="/logo.png" alt="Logo" fill className="object-contain" />
            </div>
            <span className="text-xl font-bold tracking-tight text-primary">PancreaScan-AI<span className="text-gray-400 font-light">™</span></span>
          </div>

          <div className="hidden md:flex space-x-8 font-medium text-primary/70 text-sm">
            {navItems.map((item) => (
              <a 
                key={item.href} 
                href={item.href} 
                className="hover:text-accent transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full"></span>
              </a>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
              className="flex items-center space-x-1.5 text-primary/70 hover:text-accent transition-colors font-medium text-sm"
            >
              <Globe size={16} />
              <span>{lang === 'en' ? '中文' : 'English'}</span>
            </button>
            <button className="hidden sm:flex bg-gradient-to-r from-primary to-primary-light text-white px-5 py-2 rounded-full font-semibold hover:shadow-lg hover:shadow-primary/20 transition-all text-sm">
              {translations[lang].nav.features === '核心功能' ? '索取演示' : 'Request Demo'}
            </button>
            <button 
              className="md:hidden p-2 text-primary"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden transition-all duration-300 overflow-hidden ${
        mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="bg-white border-t border-gray-100 px-4 py-4 space-y-3">
          {navItems.map((item) => (
            <a 
              key={item.href} 
              href={item.href} 
              className="block py-2 text-primary/70 hover:text-accent font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <button className="w-full bg-gradient-to-r from-primary to-primary-light text-white px-5 py-2 rounded-full font-semibold text-sm mt-4">
            {translations[lang].nav.features === '核心功能' ? '索取演示' : 'Request Demo'}
          </button>
        </div>
      </div>
    </nav>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
    <div className="mb-6 p-3 bg-blue-50 w-fit rounded-xl group-hover:bg-primary group-hover:text-white transition-colors text-primary">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

const SectionHeading = ({ badge, title, subtitle }: { badge?: string, title: string, subtitle?: string }) => (
  <div className="text-center mb-16">
    {badge && <span className="text-sm font-bold tracking-widest text-primary uppercase bg-primary-bg px-4 py-1.5 rounded-full mb-4 inline-block">{badge}</span>}
    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">{title}</h2>
    {subtitle && <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>}
  </div>
);

const WorkflowStep = ({ number, title, description, isLast = false }: { number: number, title: string, description: string, isLast?: boolean }) => (
  <div className="relative flex-1 flex flex-col items-center text-center px-4">
    <div className="w-16 h-16 bg-white border-4 border-primary-bg rounded-full flex items-center justify-center text-2xl font-bold text-primary mb-6 shadow-sm z-10">
      {number}
    </div>
    {!isLast && <div className="hidden lg:block absolute top-8 left-1/2 w-full h-0.5 bg-gray-200 -z-0"></div>}
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
    setFormData(prev => ({
      ...prev,
      imaging: lang === 'zh' ? '面部表情显示中度疼痛，体型偏胖。' : 'Facial expression shows moderate pain, body type appears overweight.'
    }));
  }, [lang]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

      <section id="hero">
        <HeroSection lang={lang} />
      </section>

      <section id="pain-points">
        <PainPointsSection lang={lang} />
      </section>

      <section id="solution">
        <TechnologySection lang={lang} />
      </section>

      <section id="clinical">
        <ProductDemo lang={lang} />
      </section>

      <section id="team">
        <TeamSection lang={lang} />
      </section>

      <section id="demo">
        <CooperationSection lang={lang} />
      </section>

      <ExpertChat lang={lang} />

      <Footer lang={lang} />
    </div>
  );
}