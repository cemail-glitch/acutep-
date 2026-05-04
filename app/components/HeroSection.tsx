'use client';

import React, { useState, useEffect } from 'react';
import {
  Activity,
  Zap,
  ArrowRight,
  Download,
  TrendingUp,
  Clock,
  Shield,
  FileText,
  Eye,
  Brain,
  Network,
  ChevronRight
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface HeroSectionProps {
  lang: 'en' | 'zh';
}

const trajectoryData = [
  { time: '0h', value: 38 },
  { time: '6h', value: 37 },
  { time: '12h', value: 35 },
  { time: '24h', value: 32 },
  { time: '48h', value: 28 },
  { time: '72h', value: 25 },
];

const threeCoreTech = [
  {
    icon: Eye,
    key: 'digital',
    label: '数字望诊',
    labelEn: 'Digital Diagnosis',
    desc: '多模态融合 AP 特征面，无创无辐射',
    descEn: 'Multi-modal AP Facial Features',
    color: 'from-primary to-primary-light'
  },
  {
    icon: TrendingUp,
    key: 'trajectory',
    label: '轨迹解密',
    labelEn: 'Trajectory Decryption',
    desc: '多维生命体征 + GBTM 分型，AUC 0.91',
    descEn: 'Multi-dimensional Vitals + GBTM Classification',
    color: 'from-primary-light to-primary'
  },
  {
    icon: Network,
    key: 'swarm',
    label: '蜂群网络',
    labelEn: 'Swarm Network',
    desc: '边缘密算·数据不动模型动',
    descEn: 'Edge Computing',
    color: 'from-primary to-primary-light'
  }
];

const dataHighlights = [
  {
    value: '<5min',
    label: '快速输出结果',
    labelEn: 'Fast Results',
    color: 'text-primary'
  },
  {
    value: '7X24h',
    label: '动态监测病情',
    labelEn: 'Dynamic Monitoring',
    color: 'text-accent'
  },
  {
    value: '>90%',
    label: '重识别率',
    labelEn: 'Recognition Rate',
    color: 'text-primary-light'
  },
  {
    value: '0.878',
    label: '模型AUC值',
    labelEn: 'Model AUC',
    color: 'text-accent'
  }
];

export default function HeroSection({ lang }: HeroSectionProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleDownloadWhitepaper = () => {
    const email = prompt(lang === 'zh' ? '请输入您的邮箱以接收白皮书：' : 'Please enter your email to receive the whitepaper:');
    if (email) {
      alert(lang === 'zh' ? '白皮书已发送至您的邮箱！' : 'Whitepaper sent to your email!');
    }
  };

  return (
    <section className="relative pt-20 pb-16 md:pt-28 md:pb-20 overflow-hidden">
      {/* 背景渐变 - 参考图片的浅蓝白到深蓝渐变 */}
      <div className="absolute inset-0 bg-gradient-to-br from-bg-primary via-white to-bg-secondary"></div>

      {/* 装饰性光晕 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-light/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-6">
              <div className={`transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className="inline-flex items-center gap-2 bg-primary-bg backdrop-blur-sm border border-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium">
                  <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
                  <span>{lang === 'zh' ? '全球首款急性胰腺炎无创评估智能体' : 'World\'s First Non-invasive AP Assessment AI'}</span>
                </div>
              </div>

              <div className={`transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-none tracking-tight">
                  <span className="text-primary">Pancrea</span><span className="text-accent">Scan</span><span className="text-primary">-AI</span>
                  <span className="block text-xl sm:text-2xl lg:text-3xl font-light text-primary-light mt-3 tracking-normal">
                    {lang === 'zh' ? '急性胰腺炎无创评估智能体' : 'Non-invasive AP Assessment Agent'}
                  </span>
                </h1>
              </div>

              <div className={`transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <p className="text-base text-text-secondary leading-relaxed max-w-xl">
                  {lang === 'zh'
                    ? '以"AP特征面+轨迹解密+蜂群网络"三大核心技术融合，实现超早期分层、实时预警、个性化推荐、跨院隐私协同，破解急性胰腺炎诊疗瓶颈。'
                    : 'Integrating "AP Facial Features + Trajectory Decryption + Swarm Network" core technologies for early stratification, real-time warning, personalized recommendations.'}
                </p>
              </div>
            </div>

            <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              {dataHighlights.map((item, index) => (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-accent/20 shadow-soft"
                >
                  <div className={`text-2xl sm:text-3xl font-bold ${item.color} mb-1`}>
                    {item.value}
                  </div>
                  <div className="text-xs text-primary/60 font-medium">
                    {lang === 'zh' ? item.label : item.labelEn}
                  </div>
                </div>
              ))}
            </div>

            <div className={`space-y-3 transition-all duration-700 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <h3 className="text-sm font-semibold text-primary/70 uppercase tracking-wider">
                {lang === 'zh' ? '三大核心技术' : 'Three Core Technologies'}
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {threeCoreTech.map((tech) => (
                  <div
                    key={tech.key}
                    className="group relative bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-accent/20 hover:border-accent/40 hover:shadow-medium transition-all cursor-pointer"
                  >
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${tech.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                      <tech.icon className="text-white" size={18} />
                    </div>
                    <h4 className="text-sm font-semibold text-primary mb-1">{tech.label}</h4>
                    <p className="text-xs text-primary/60 leading-tight">{tech.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className={`flex flex-wrap gap-4 transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <button 
                onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-primary to-primary-light text-white px-8 py-3.5 rounded-full font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all flex items-center gap-2">
                {lang === 'zh' ? '申请试用' : 'Request Demo'}
                <ArrowRight size={18} />
              </button>
              <button
                onClick={handleDownloadWhitepaper}
                className="bg-white/80 backdrop-blur-sm text-primary px-8 py-3.5 rounded-full font-semibold hover:bg-white transition-all flex items-center gap-2 border border-accent/20 shadow-soft"
              >
                <Download size={18} />
                {lang === 'zh' ? '下载白皮书' : 'Whitepaper'}
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className={`relative transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
              <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-accent/20 shadow-medium">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-accent rounded-full animate-pulse"></div>
                    <span className="text-sm text-primary font-medium">{lang === 'zh' ? '实时监测中' : 'Monitoring'}</span>
                  </div>
                  <span className="text-xs text-primary/50">72h {lang === 'zh' ? '心率轨迹' : 'HR Trajectory'}</span>
                </div>

                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={trajectoryData}>
                    <defs>
                      <linearGradient id="hrGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e6f2ff" />
                    <XAxis dataKey="time" stroke="#0A2540" fontSize={12} />
                    <YAxis stroke="#0A2540" fontSize={12} domain={[20, 45]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        border: '1px solid rgba(59, 130, 246, 0.3)',
                        borderRadius: '12px',
                        color: '#0A2540',
                        backdropFilter: 'blur(10px)'
                      }}
                      labelStyle={{ color: '#0A2540' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, fill: '#3b82f6' }}
                    />
                  </LineChart>
                </ResponsiveContainer>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="bg-highlight/10 border border-highlight/30 rounded-xl p-3 text-center">
                    <div className="text-highlight font-bold text-lg">{lang === 'zh' ? '高危' : 'High'}</div>
                    <div className="text-xs text-highlight/80">HR &gt; 120bpm</div>
                  </div>
                  <div className="bg-accent/10 border border-accent/30 rounded-xl p-3 text-center">
                    <div className="text-accent font-bold text-lg">{lang === 'zh' ? '稳定' : 'Stable'}</div>
                    <div className="text-xs text-accent/80">HR &lt; 100bpm</div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-primary to-primary-light text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                {lang === 'zh' ? '1分钟内完成分型' : '1min Classification'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
