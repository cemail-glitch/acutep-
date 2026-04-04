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
  FileText
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

const coreCapabilities = [
  {
    icon: TrendingUp,
    label: 'LCTM 精准分型',
    labelEn: 'LCTM Classification'
  },
  {
    icon: Clock,
    label: '超早期风险预测',
    labelEn: 'Early Risk Prediction'
  },
  {
    icon: Shield,
    label: '联邦隐私合规',
    labelEn: 'Federated Privacy'
  },
  {
    icon: FileText,
    label: 'LLM 循证方案',
    labelEn: 'LLM Evidence-based'
  }
];

const dataHighlights = [
  {
    value: '≥0.85',
    label: '重症预测 AUC-ROC',
    labelEn: 'Severe Prediction AUC-ROC'
  },
  {
    value: '≥15%',
    label: '住院时间缩短',
    labelEn: 'Hospital Stay Reduction'
  },
  {
    value: '≥20%',
    label: '重症转化率降低',
    labelEn: 'Severe Conversion Reduction'
  }
];

export default function HeroSection({ lang }: HeroSectionProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredCapability, setHoveredCapability] = useState<number | null>(null);

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
    <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-gradient-to-br from-medical-blue-50 via-white to-blue-100">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-medical-blue-100 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full opacity-30 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column - Content (55%) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Title System */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 bg-medical-blue-100 text-medical-blue-dark px-4 py-2 rounded-full text-sm font-semibold animate-fade-in">
                <Zap size={16} />
                <span>{lang === 'zh' ? '新一代临床智能 AI' : 'Next-Gen Clinical AI'}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-deep-blue leading-tight animate-slide-up">
                {lang === 'zh' ? '急性胰腺炎异质性分型及早期预测诊疗 Agent' : 'AP Heterogeneity Classification & Early Prediction Agent'}
              </h1>
              <p className="text-base text-gray-600 leading-relaxed-plus max-w-2xl animate-fade-in">
                {lang === 'zh'
                  ? '国内首个基于动态心率轨迹 LCTM 分型的 AP 专属诊疗 Agent，融合联邦学习、面部炎症识别与医学大模型，实现「早期分层 - 风险预警 - 循证施治」全流程个性化诊疗。'
                  : 'China\'s first AP diagnostic agent based on dynamic heart rate trajectory LCTM classification, integrating federated learning, facial inflammation recognition, and medical LLM for personalized diagnosis.'}
              </p>
            </div>

            {/* Core Data Highlights */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {dataHighlights.map((item, index) => (
                <div
                  key={index}
                  className="relative group"
                >
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-soft hover:shadow-medium transition-all duration-300 border border-medical-blue-100 hover:-translate-y-1">
                    <div className="text-2xl sm:text-3xl font-bold text-medical-blue mb-1">
                      {item.value}
                    </div>
                    <div className="text-xs text-gray-700 font-semibold">
                      {lang === 'zh' ? item.label : item.labelEn}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Core Capabilities */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 py-3">
              {coreCapabilities.map((capability, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center p-3 rounded-lg hover:bg-medical-blue-50 transition-all cursor-pointer group"
                  onMouseEnter={() => setHoveredCapability(index)}
                  onMouseLeave={() => setHoveredCapability(null)}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2 transition-all ${
                    hoveredCapability === index 
                      ? 'bg-medical-blue text-white' 
                      : 'bg-medical-blue-100 text-medical-blue'
                  }`}>
                    <capability.icon size={20} strokeWidth={hoveredCapability === index ? 2.5 : 2} />
                  </div>
                  <div className={`text-xs font-semibold transition-all ${
                    hoveredCapability === index ? 'text-medical-blue' : 'text-gray-700'
                  }`}>
                    {lang === 'zh' ? capability.label : capability.labelEn}
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                className="group bg-gradient-to-r from-medical-blue to-medical-blue-light text-white px-6 py-3 rounded-lg font-semibold text-base hover:shadow-large transition-all duration-300 hover:-translate-y-1 flex items-center justify-center"
                onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Activity size={18} className="mr-2" />
                {lang === 'zh' ? '产品演示' : 'Product Demo'}
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                className="bg-white text-medical-blue px-6 py-3 rounded-lg font-semibold text-base border-2 border-medical-blue hover:bg-medical-blue-50 transition-all duration-300 shadow-soft hover:shadow-medium flex items-center justify-center"
                onClick={handleDownloadWhitepaper}
              >
                <Download size={18} className="mr-2" />
                {lang === 'zh' ? '项目白皮书' : 'Whitepaper'}
              </button>
            </div>
          </div>

          {/* Right Column - Visual KV (45%) */}
          <div className="lg:col-span-5 relative">
            <div className="relative h-[500px] bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden shadow-2xl">
              {/* Dynamic Albumin Trajectory Curves */}
              <div className="absolute inset-0 p-4">
                <ResponsiveContainer width="100%" height="60%">
                  <LineChart data={trajectoryData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="time" stroke="#666" fontSize={11} />
                    <YAxis stroke="#666" fontSize={11} domain={[20, 45]} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '8px' }}
                      labelStyle={{ color: '#333', fontWeight: 'bold' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#DC3545" 
                      strokeWidth={3}
                      dot={{ fill: '#DC3545', strokeWidth: 2, r: 5 }}
                      activeDot={{ r: 7 }}
                      className={isLoaded ? 'animate-draw' : ''}
                    />
                  </LineChart>
                </ResponsiveContainer>

                {/* Workflow Diagram */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white to-transparent">
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { icon: Activity, label: lang === 'zh' ? '数据输入' : 'Data Input' },
                      { icon: TrendingUp, label: lang === 'zh' ? 'LCTM 分型' : 'LCTM' },
                      { icon: Clock, label: lang === 'zh' ? '风险预测' : 'Prediction' },
                      { icon: FileText, label: lang === 'zh' ? '循证方案' : 'Treatment' }
                    ].map((step, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-1 transition-all ${
                          isLoaded ? 'bg-medical-blue text-white' : 'bg-gray-300 text-gray-500'
                        }`}>
                          <step.icon size={16} />
                        </div>
                        <div className="text-xs text-gray-600 font-medium text-center">{step.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1.5 rounded-lg shadow-sm">
                <div className="text-xs text-gray-500">{lang === 'zh' ? '动态心率轨迹' : 'Dynamic Heart Rate Trajectory'}</div>
                <div className="text-xs font-bold text-medical-blue">72h Monitoring</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes draw {
          from {
            stroke-dasharray: 1000;
            stroke-dashoffset: 1000;
          }
          to {
            stroke-dasharray: 1000;
            stroke-dashoffset: 0;
          }
        }
        .animate-draw {
          animation: draw 2s ease-out forwards;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        @keyframes slide-up {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.5s ease-out;
        }
      `}</style>
    </section>
  );
}
