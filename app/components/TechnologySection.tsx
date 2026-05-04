'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Eye,
  TrendingUp,
  Network,
  CheckCircle,
  Activity,
  Heart,
  Brain,
  Shield,
  AlertTriangle,
  Clock,
  Sparkles,
  ChevronRight,
  Zap,
  ArrowUpRight
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  BarChart,
  Bar,
  Cell
} from 'recharts';

interface TechnologySectionProps {
  lang: 'en' | 'zh';
}

const trajectoryData = [
  { time: '0h', high_risk: 38, medium_risk: 38, low_risk: 38 },
  { time: '6h', high_risk: 35, medium_risk: 37, low_risk: 38 },
  { time: '12h', high_risk: 32, medium_risk: 36, low_risk: 37 },
  { time: '24h', high_risk: 28, medium_risk: 34, low_risk: 37 },
  { time: '48h', high_risk: 24, medium_risk: 32, low_risk: 36 },
  { time: '72h', high_risk: 22, medium_risk: 30, low_risk: 36 },
];

const subtypes = [
  {
    name: 'T1型低稳定型',
    risk: '低危',
    riskColor: 'bg-emerald-500',
    description: '心率全程稳定在100bpm以下',
    probability: '12%',
    curveColor: '#10b981'
  },
  {
    name: 'T2型高稳定型',
    risk: '中危',
    riskColor: 'bg-amber-500',
    description: '心率全程稳定在100-120bpm区间',
    probability: '45%',
    curveColor: '#f59e0b'
  },
  {
    name: 'T3型中高波动型',
    risk: '中高危',
    riskColor: 'bg-orange-500',
    description: '入院24h内缓慢上升，峰值100-120bpm后回落',
    probability: '28%',
    curveColor: '#f97316'
  },
  {
    name: 'T4型低升型',
    risk: '极高危',
    riskColor: 'bg-rose-500',
    description: '入院6h内快速上升，72h内持续高于120bpm',
    probability: '15%',
    curveColor: '#f43f5e'
  }
];

const clinicalMetrics = [
  { name: '胰见 AUC', value: 0.91, color: '#06b6d4' },
  { name: 'APACHE II', value: 0.78, color: '#94a3b8' },
  { name: 'BISAP', value: 0.75, color: '#94a3b8' },
];

const federatedBenefits = [
  '数据不出院，隐私零风险',
  '模型跨中心持续进化',
  '跨中心性能波动≤5%',
  '完全符合医疗合规要求'
];

const techCards = [
  {
    id: 'digital' as const,
    icon: Eye,
    title: '数字望诊',
    subtitle: '多模态融合 AP 特征面',
    color: 'from-primary to-primary-light',
    highlights: ['无创无辐射', '轻/中/重度识别率 89.7%/87.3%/91.5%', '计算复杂度降低 93.2%']
  },
  {
    id: 'trajectory' as const,
    icon: TrendingUp,
    title: '轨迹解密',
    subtitle: '心率轨迹 + T1-T4 分型',
    color: 'from-primary-light to-accent',
    highlights: ['AUC 0.91 重症预测', '72h 连续轨迹分析', '1 分钟内完成预警']
  },
  {
    id: 'swarm' as const,
    icon: Brain,
    title: '蜂群网络',
    subtitle: '数据不动模型动',
    color: 'from-accent to-primary-light',
    highlights: ['边缘密算隐私保护', '跨中心性能波动 ≤5%', '基层准确率提升 29.2%']
  }
];

export default function TechnologySection({ lang }: TechnologySectionProps) {
  const [activeTab, setActiveTab] = useState<'digital' | 'trajectory' | 'swarm'>('digital');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const tabs = [
    { id: 'digital' as const, label: '数字望诊', icon: Eye, color: 'primary' },
    { id: 'trajectory' as const, label: '轨迹解密', icon: TrendingUp, color: 'accent' },
    { id: 'swarm' as const, label: '蜂群网络', icon: Network, color: 'primary-light' },
  ];

  const colorMap: Record<string, { bg: string; text: string; border: string; light: string; gradient: string }> = {
    primary: { bg: 'bg-primary', text: 'text-accent', border: 'border-primary', light: 'bg-primary-bg', gradient: 'from-primary to-primary-light' },
    accent: { bg: 'bg-accent', text: 'text-white', border: 'border-accent', light: 'bg-accent/10', gradient: 'from-accent to-accent-light' },
    'primary-light': { bg: 'bg-primary-light', text: 'text-white', border: 'border-primary-light', light: 'bg-primary-bg', gradient: 'from-primary-light to-primary' },
  };

  return (
    <section id="tech" className="py-20 md:py-28 bg-gradient-to-b from-white via-bg-primary to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {lang === 'zh' ? '核心技术解析' : 'Core Technologies'}
          </h2>
          <p className="text-base text-primary/70 max-w-2xl mx-auto">
            {lang === 'zh'
              ? '三大原创技术融合，构建急性胰腺炎智能诊疗新范式'
              : 'Three proprietary technologies for AP intelligent diagnosis'}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {techCards.map((card) => (
            <button
              key={card.id}
              onClick={() => setActiveTab(card.id)}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`relative group p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                activeTab === card.id
                  ? 'bg-white border-accent shadow-xl scale-[1.02]'
                  : 'bg-white/50 border-accent/20 hover:border-accent/40 hover:shadow-lg hover:bg-white'
              }`}
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                <card.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-1">{card.title}</h3>
              <p className="text-sm text-accent mb-4">{card.subtitle}</p>
              <div className="space-y-2">
                {card.highlights.map((highlight, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-primary/70">
                    <CheckCircle className="w-3.5 h-3.5 text-accent" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
              {activeTab === card.id && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center shadow-lg">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="bg-gradient-to-br from-bg-primary to-bg-secondary rounded-3xl p-8 md:p-12">
          {activeTab === 'digital' && (
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary-light rounded-2xl flex items-center justify-center shadow-lg">
                    <Eye className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-primary">{lang === 'zh' ? '数字望诊' : 'Digital Diagnosis'}</h3>
                    <p className="text-sm text-accent">{lang === 'zh' ? '多模态融合 AP 特征面' : 'Multi-modal AP Facial Features'}</p>
                  </div>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  {lang === 'zh'
                    ? '首次将多模态融合技术应用于急性胰腺炎面部特征识别，精准定位面部关键特征指标，构建标准化特征面模型。相较于传统评分系统，计算复杂度大幅降低，全程无创无辐射。'
                    : 'First application of multi-modal fusion technology for AP facial feature recognition, achieving precise localization of key facial indicators with non-invasive, radiation-free assessment.'}
                </p>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: '轻度识别', value: '89.7%', color: '#10b981' },
                    { label: '中度识别', value: '87.3%', color: '#f59e0b' },
                    { label: '重度识别', value: '91.5%', color: '#ef4444' },
                    { label: '效率提升', value: '93.2%', color: '#3b82f6' },
                  ].map((metric, index) => (
                    <div key={index} className="bg-white rounded-xl p-4 border border-accent/20 hover:shadow-md transition-shadow">
                      <div className="text-2xl font-bold mb-1" style={{ color: metric.color }}>{metric.value}</div>
                      <div className="text-xs text-primary/60">{metric.label}</div>
                    </div>
                  ))}
                </div>

                <div className="bg-white rounded-2xl p-6 border border-accent/20">
                  <h4 className="font-bold text-primary mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-accent" />
                    {lang === 'zh' ? '适用场景' : 'Application Scenarios'}
                  </h4>
                  <div className="grid grid-cols-4 gap-3">
                    {[
                      { icon: Activity, label: '急诊初筛' },
                      { icon: Clock, label: '门诊随诊' },
                      { icon: Brain, label: 'ICU 监测' },
                      { icon: Shield, label: '基层筛查' },
                    ].map((item, index) => (
                      <div key={index} className="bg-accent/10 rounded-lg p-3 text-center border border-accent/20 hover:bg-accent/20 transition-colors">
                        <item.icon className="w-5 h-5 text-accent mx-auto mb-1" />
                        <span className="text-xs text-primary font-medium">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-accent/20 shadow-sm">
                <h4 className="font-bold text-primary mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-accent" />
                  {lang === 'zh' ? '面部特征分析示意' : 'Facial Feature Analysis'}
                </h4>
                <div className="aspect-square bg-gradient-to-br from-bg-secondary to-bg-primary rounded-xl flex items-center justify-center mb-4 overflow-hidden">
                  <Image src="/face-demo.png" alt="Face Demo" width={280} height={280} className="object-contain" />
                </div>
                <div className="text-center text-sm text-primary/60">
                  {lang === 'zh' ? 'AI 自动识别面部关键区域，计算炎症特征指标' : 'AI identifies facial key regions, calculates inflammation indicators'}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'trajectory' && (
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary-light to-primary rounded-2xl flex items-center justify-center shadow-lg">
                    <TrendingUp className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-primary">{lang === 'zh' ? '轨迹解密' : 'Trajectory Decryption'}</h3>
                    <p className="text-sm text-accent">{lang === 'zh' ? '心率轨迹 GBTM 分型' : 'Heart Rate Trajectory GBTM Classification'}</p>
                  </div>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  {lang === 'zh'
                    ? '以心率为核心，融合血压、呼吸频率、体温、血氧饱和度等多维生命体征，构建动态轨迹分析。基于 AI 模型将患者分为 T1-T4 四类临床亚型，自动输出风险预警与个性化诊疗建议。'
                    : 'Using heart rate as the core, we construct multi-dimensional vital sign trajectories. AI model classifies patients into 4 clinical subtypes.'}
                </p>

                <div className="bg-white rounded-2xl p-6 border border-accent/20">
                  <h4 className="font-bold text-primary mb-4 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-accent" />
                    {lang === 'zh' ? 'GBTM 临床亚型' : 'GBTM Clinical Subtypes'}
                  </h4>
                  <div className="space-y-3">
                    {subtypes.map((subtype, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-bg-secondary rounded-lg border border-accent/10 hover:border-accent/30 transition-colors">
                        <div className={`w-3 h-3 rounded-full ${subtype.riskColor}`}></div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-primary">{subtype.name}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${subtype.riskColor} text-white`}>{subtype.risk}</span>
                          </div>
                          <p className="text-xs text-primary/60">{subtype.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-primary">{subtype.probability}</div>
                          <div className="text-xs text-primary/50">{lang === 'zh' ? '发生率' : 'Incidence'}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {clinicalMetrics.map((metric, index) => (
                    <div key={index} className="bg-white rounded-xl p-4 text-center border border-accent/20 shadow-sm hover:shadow-md transition-shadow">
                      <div className="text-2xl font-bold mb-1" style={{ color: metric.color }}>{metric.value}</div>
                      <div className="text-xs text-primary/60">{metric.name}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 border border-accent/20 shadow-sm">
                  <h4 className="font-bold text-primary mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-accent" />
                    {lang === 'zh' ? '72h 心率轨迹对比' : '72h Heart Rate Trajectory'}
                  </h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={trajectoryData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e6f2ff" />
                      <XAxis dataKey="time" stroke="#0A2540" fontSize={12} />
                      <YAxis stroke="#0A2540" fontSize={12} domain={[20, 45]} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #e6f2ff',
                          borderRadius: '12px'
                        }}
                      />
                      <ReferenceLine y={38} stroke="#3B82F6" strokeDasharray="5 5" />
                      <Line type="monotone" dataKey="high_risk" stroke="#FF6B35" strokeWidth={2} dot={{ r: 4 }} name={lang === 'zh' ? '高危' : 'High'} />
                      <Line type="monotone" dataKey="medium_risk" stroke="#F59E0B" strokeWidth={2} dot={{ r: 4 }} name={lang === 'zh' ? '中危' : 'Medium'} />
                      <Line type="monotone" dataKey="low_risk" stroke="#10B981" strokeWidth={2} dot={{ r: 4 }} name={lang === 'zh' ? '低危' : 'Low'} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-gradient-to-r from-primary to-primary-light rounded-2xl p-6 text-white shadow-lg">
                  <h4 className="font-bold mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    {lang === 'zh' ? '性能优势' : 'Performance'}
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/20 rounded-xl p-4 text-center backdrop-blur-sm">
                      <div className="text-3xl font-bold">AUC 0.91</div>
                      <div className="text-sm text-white/80">{lang === 'zh' ? '重症预测' : 'Severe'}</div>
                    </div>
                    <div className="bg-white/20 rounded-xl p-4 text-center backdrop-blur-sm">
                      <div className="text-3xl font-bold">&lt;5min</div>
                      <div className="text-sm text-white/80">{lang === 'zh' ? '推理时间' : 'Time'}</div>
                    </div>
                    <div className="bg-white/20 rounded-xl p-4 text-center backdrop-blur-sm">
                      <div className="text-3xl font-bold">+15.3%</div>
                      <div className="text-sm text-white/80">{lang === 'zh' ? '优于 APACHE II' : 'vs APACHE'}</div>
                    </div>
                    <div className="bg-white/20 rounded-xl p-4 text-center backdrop-blur-sm">
                      <div className="text-3xl font-bold">4</div>
                      <div className="text-sm text-white/80">{lang === 'zh' ? '临床亚型' : 'Subtypes'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'swarm' && (
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary-light rounded-2xl flex items-center justify-center shadow-lg">
                    <Network className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-primary">{lang === 'zh' ? '蜂群网络' : 'Swarm Network'}</h3>
                    <p className="text-sm text-accent">{lang === 'zh' ? '可进化的 AI 大脑' : 'Evolving AI Brain'}</p>
                  </div>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  {lang === 'zh'
                    ? '基于边缘密算架构，实现"数据不动模型动"的隐私保护协同模式。各中心数据不出本地，通过加密参数交互持续优化全局模型，跨中心性能波动极小。'
                    : 'Based on edge computing architecture, enabling privacy-preserving collaboration where "data stays local, models move".'}
                </p>

                <div className="bg-white rounded-2xl p-6 border border-accent/20">
                  <h4 className="font-bold text-primary mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-accent" />
                    {lang === 'zh' ? '核心优势' : 'Core Advantages'}
                  </h4>
                  <div className="space-y-3">
                    {federatedBenefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-bg-secondary rounded-lg hover:bg-accent/10 transition-colors">
                        <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-accent" />
                        </div>
                        <span className="text-text-secondary">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-accent to-primary-light rounded-2xl p-6 text-white shadow-lg">
                  <h4 className="font-bold mb-4 flex items-center gap-2">
                    <ArrowUpRight className="w-5 h-5" />
                    {lang === 'zh' ? '临床验证结果' : 'Clinical Results'}
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/20 rounded-xl p-4 text-center backdrop-blur-sm">
                      <div className="text-3xl font-bold">89.5%</div>
                      <div className="text-sm text-white/80">{lang === 'zh' ? 'SAP预警准确率' : 'SAP Accuracy'}</div>
                    </div>
                    <div className="bg-white/20 rounded-xl p-4 text-center backdrop-blur-sm">
                      <div className="text-3xl font-bold">≤5%</div>
                      <div className="text-sm text-white/80">{lang === 'zh' ? '跨中心波动' : 'Variance'}</div>
                    </div>
                    <div className="bg-white/20 rounded-xl p-4 text-center backdrop-blur-sm">
                      <div className="text-3xl font-bold">+29.2%</div>
                      <div className="text-sm text-white/80">{lang === 'zh' ? '基层提升' : 'Primary'}</div>
                    </div>
                    <div className="bg-white/20 rounded-xl p-4 text-center backdrop-blur-sm">
                      <div className="text-3xl font-bold">100%</div>
                      <div className="text-sm text-white/80">{lang === 'zh' ? '隐私合规' : 'Privacy'}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 border border-accent/20 shadow-sm">
                  <h4 className="font-bold text-primary mb-4">{lang === 'zh' ? '边缘密算架构示意' : 'Edge Computing Architecture'}</h4>
                  <div className="relative">
                    <div className="flex justify-center mb-6">
                      <div className="bg-gradient-to-r from-primary to-primary-light text-white px-6 py-3 rounded-full font-semibold shadow-lg flex items-center gap-2">
                        <Network className="w-5 h-5" />
                        {lang === 'zh' ? '全局模型' : 'Global Model'}
                      </div>
                    </div>
                    <div className="flex justify-center gap-6 md:gap-10">
                      {[
                        { src: '/c7f1dbb85e10e235.png', name: '南昌大学第一附属医院' },
                        { src: '/OIP-C (19).webp', name: '南昌市高新区人民医院' },
                        { src: '/home_logo(1).png', name: '广州市第一人民医院' },
                      ].map((hospital, index) => (
                        <div key={index} className="text-center group">
                          <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-xl flex items-center justify-center mb-2 mx-auto border-2 border-accent/30 shadow-sm overflow-hidden transition-all group-hover:border-accent group-hover:scale-105">
                            <Image src={hospital.src} alt={hospital.name} width={60} height={60} className="object-contain" />
                          </div>
                          <div className="text-xs md:text-sm font-medium text-primary">{hospital.name}</div>
                          <div className="text-xs text-primary/50">{lang === 'zh' ? '数据不出院' : 'Local'}</div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-center mt-6">
                      <div className="flex items-center gap-2 text-sm text-primary/60 bg-bg-secondary px-4 py-2 rounded-full">
                        <ChevronRight className="w-4 h-4" />
                        <span>{lang === 'zh' ? '加密参数交互' : 'Encrypted Params' }</span>
                        <ChevronRight className="w-4 h-4 transform rotate-180" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-lg">
                  <h4 className="font-bold mb-4 flex items-center gap-2">
                    <Brain className="w-5 h-5 text-cyan-400" />
                    {lang === 'zh' ? '医疗价值' : 'Medical Value'}
                  </h4>
                  <div className="space-y-3 text-sm">
                    {[
                      { text: '打破数据孤岛，跨院协同不泄露隐私' },
                      { text: '模型随数据增加持续进化，性能不断提升' },
                      { text: '基层医院可获得与顶级医院相当的 AI 辅助能力' },
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                        <span>{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}