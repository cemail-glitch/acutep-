'use client';

import React, { useState, useEffect } from 'react';
import {
  Zap,
  ArrowRight,
  Download,
  Eye,
  TrendingUp,
  Network,
  ChevronRight,
  Shield,
  Clock,
  Target
} from 'lucide-react';

interface HeroSectionProps {
  lang: 'en' | 'zh';
}

const coreAdvantages = [
  { icon: Shield, label: '无创', labelEn: 'Non-invasive', desc: '无需抽血 / 无辐射' },
  { icon: Clock, label: '快速', labelEn: 'Fast', desc: '5分钟输出结果' },
  { icon: Target, label: '精准', labelEn: 'Precise', desc: 'AUC 0.91' }
];

const threeCoreTech = [
  {
    icon: Eye,
    key: 'digital',
    label: '数字望诊',
    labelEn: 'Digital Diagnosis',
    desc: 'AP特征面识别，无创无辐射',
    color: 'from-primary to-primary-light'
  },
  {
    icon: TrendingUp,
    key: 'trajectory',
    label: '轨迹解密',
    labelEn: 'Trajectory Decryption',
    desc: '心率轨迹 + T1-T4 分型',
    color: 'from-primary-light to-accent'
  },
  {
    icon: Network,
    key: 'swarm',
    label: '蜂群网络',
    labelEn: 'Swarm Network',
    desc: '数据不动模型动',
    color: 'from-accent to-primary-light'
  }
];

const dataHighlights = [
  { value: '<5min', label: '快速输出', labelEn: 'Fast Results' },
  { value: '7×24h', label: '动态监测', labelEn: 'Dynamic Monitoring' },
  { value: '>90%', label: '重识别率', labelEn: 'Recognition Rate' },
  { value: '0.878', label: '模型AUC', labelEn: 'Model AUC' }
];

export default function HeroSection({ lang }: HeroSectionProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleDownloadWhitepaper = () => {
    const email = prompt(lang === 'zh' ? '请输入您的邮箱以接收白皮书：' : 'Please enter your email to receive the whitepaper:');
    if (email) {
      alert(lang === 'zh' ? '白皮书已发送至您的邮箱！' : 'Whitepaper sent to your email!');
    }
  };

  return (
    <section className="relative pt-20 pb-16 md:pt-24 md:pb-20 overflow-hidden min-h-[90vh] flex items-center">
      <div className="absolute inset-0 bg-gradient-to-br from-bg-primary via-white to-bg-secondary"></div>
      
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl transition-transform duration-1000"
          style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }}
        ></div>
        <div 
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl transition-transform duration-1000"
          style={{ transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)` }}
        ></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-8">
              <div className={`transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className="inline-flex items-center gap-2 bg-primary-bg border border-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
                  <span>{lang === 'zh' ? '全球首款急性胰腺炎无创评估智能体' : "World's First Non-invasive AP Assessment AI"}</span>
                </div>
              </div>

              <div className={`transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-4">
                  <span className="text-primary">Pancrea</span><span className="text-accent">Scan</span><span className="text-primary">-AI</span>
                </h1>
                <p className="text-xl sm:text-2xl text-primary/80 font-light">
                  {lang === 'zh' ? '急性胰腺炎无创评估智能体' : 'Non-invasive AP Assessment Agent'}
                </p>
              </div>

              <div className={`transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-xl">
                  {lang === 'zh'
                    ? '以"数字望诊 + 轨迹解密 + 蜂群网络"三大核心技术，实现超早期分层、实时预警、个性化推荐，破解急性胰腺炎诊疗瓶颈。'
                    : 'Integrating three core technologies for early stratification, real-time warning, and personalized recommendations in AP diagnosis.'}
                </p>
              </div>

              <div className={`grid grid-cols-3 gap-3 sm:gap-4 transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                {coreAdvantages.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white/90 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-accent/30 shadow-sm hover:shadow-md hover:border-accent/50 transition-all group cursor-default"
                  >
                    <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-accent mb-2 group-hover:scale-110 transition-transform" />
                    <div className="text-lg sm:text-xl font-bold text-primary mb-0.5">{item.label}</div>
                    <div className="text-xs text-primary/60">{lang === 'zh' ? item.desc : item.desc}</div>
                  </div>
                ))}
              </div>

              <div className={`grid grid-cols-4 gap-2 sm:gap-3 transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                {dataHighlights.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white/60 backdrop-blur-sm rounded-lg p-2 sm:p-3 border border-primary/10 text-center"
                  >
                    <div className="text-lg sm:text-xl font-bold text-primary mb-0.5">{item.value}</div>
                    <div className="text-xs text-primary/60 truncate">{lang === 'zh' ? item.label : item.labelEn}</div>
                  </div>
                ))}
              </div>

              <div className={`space-y-3 transition-all duration-700 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <h3 className="text-xs font-semibold text-primary/50 uppercase tracking-wider">
                  {lang === 'zh' ? '三大核心技术' : 'Three Core Technologies'}
                </h3>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {threeCoreTech.map((tech) => (
                    <div
                      key={tech.key}
                      className="group bg-white/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-accent/20 hover:border-accent/40 hover:shadow-md transition-all cursor-pointer"
                    >
                      <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br ${tech.color} flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-105 transition-transform`}>
                        <tech.icon className="text-white" size={16} />
                      </div>
                      <h4 className="text-sm font-semibold text-primary mb-0.5">{tech.label}</h4>
                      <p className="text-xs text-primary/50 leading-tight">{tech.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`flex flex-wrap gap-3 transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <button 
                  onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-gradient-to-r from-primary to-primary-light text-white px-6 sm:px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all flex items-center gap-2 text-sm sm:text-base"
                >
                  {lang === 'zh' ? '申请试用' : 'Request Demo'}
                  <ArrowRight size={16} />
                </button>
                <button
                  onClick={handleDownloadWhitepaper}
                  className="bg-white/90 backdrop-blur-sm text-primary px-6 sm:px-8 py-3 rounded-full font-semibold hover:bg-white transition-all flex items-center gap-2 border border-accent/30 shadow-sm text-sm sm:text-base"
                >
                  <Download size={16} />
                  {lang === 'zh' ? '下载白皮书' : 'Whitepaper'}
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className={`relative transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
                <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 border border-accent/20 shadow-xl">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-primary font-medium">{lang === 'zh' ? '实时监测中' : 'Live Monitoring'}</span>
                    </div>
                    <span className="text-xs text-primary/40">72h {lang === 'zh' ? '心率轨迹' : 'HR Trajectory'}</span>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-primary/10 to-transparent rounded-xl p-4 border-l-4 border-primary">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-primary/60">{lang === 'zh' ? '当前状态' : 'Current Status'}</span>
                        <span className="text-xs font-semibold text-emerald-600">{lang === 'zh' ? '稳定' : 'Stable'}</span>
                      </div>
                      <div className="text-2xl font-bold text-primary">98 <span className="text-sm font-normal">bpm</span></div>
                    </div>

                    <div className="bg-gradient-to-r from-accent/10 to-transparent rounded-xl p-4 border-l-4 border-accent">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-primary/60">{lang === 'zh' ? '分型结果' : 'Classification'}</span>
                        <span className="text-xs font-semibold text-accent">T2 {lang === 'zh' ? '高稳定型' : 'High Stable'}</span>
                      </div>
                      <div className="w-full bg-primary/10 rounded-full h-2 mb-2">
                        <div className="bg-gradient-to-r from-primary to-accent h-2 rounded-full" style={{ width: '45%' }}></div>
                      </div>
                      <div className="text-xs text-primary/40">{lang === 'zh' ? '中危 · 建议持续监测' : 'Medium Risk · Continue Monitoring'}</div>
                    </div>

                    <div className="bg-gradient-to-r from-primary/5 to-transparent rounded-xl p-4">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-primary/60">{lang === 'zh' ? '预警等级' : 'Alert Level'}</span>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                          <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                          {lang === 'zh' ? '低风险' : 'Low Risk'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-primary/10">
                    <div className="flex items-center justify-between text-xs text-primary/40">
                      <span>{lang === 'zh' ? '最近更新' : 'Last Update'}</span>
                      <span>2 {lang === 'zh' ? '分钟前' : 'min ago'}</span>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-accent to-accent-light text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg">
                  {lang === 'zh' ? '5分钟内出结果' : 'Results in 5min'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}