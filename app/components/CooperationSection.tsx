'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Cloud,
  Server,
  Shield,
  Users,
  Network,
  CheckCircle,
  ArrowRight,
  Activity,
  FileText,
  Phone,
  ArrowUpRight,
  Star,
  Zap,
  Check
} from 'lucide-react';

interface CooperationSectionProps {
  lang: 'en' | 'zh';
}

const deploymentOptions = [
  {
    id: 'cloud',
    name: '云端部署（SaaS）',
    subtitle: '快速上线 · 零运维 · 自动更新',
    icon: Cloud,
    color: 'from-accent to-accent-light',
    features: {
      privacy: '医疗合规专属云，VPN安全访问',
      cost: '开通即用，零服务器投入',
      maintenance: '云端统一运维，无需本地支持',
      update: '模型自动迭代，实时同步'
    },
    suitable: '适合基层医疗机构、门诊、急诊'
  },
  {
    id: 'local',
    name: '本地部署（私有化）',
    subtitle: '数据不出院 · 深度集成 · 自主管控',
    icon: Server,
    color: 'from-primary to-primary-light',
    features: {
      privacy: '系统完全部署在内网，数据全程不出院',
      cost: '需本地服务器与运维团队',
      maintenance: '提供定期维护与技术支援',
      update: '定期推送模型更新包'
    },
    suitable: '适合三甲医院、教学科研机构'
  }
];

const pricingPlans = [
  {
    id: 1,
    name: '旗舰版',
    price: '¥50万',
    period: '/套',
    target: '三级医院',
    strategy: '树品牌、保质量',
    icon: Star,
    color: 'from-primary to-primary-light',
    badge: '推荐',
    features: [
      { text: '无限次使用', included: true },
      { text: '专属模型定制', included: true },
      { text: '7×24h技术支持', included: true },
      { text: '年度数据报告', included: true },
      { text: '私有化部署', included: true },
      { text: 'API深度集成', included: true },
    ]
  },
  {
    id: 2,
    name: '标准版',
    price: '¥5万',
    period: '/年',
    target: '二级医院',
    strategy: '扩份额、创利润',
    icon: Activity,
    color: 'from-accent to-accent-light',
    badge: null,
    features: [
      { text: '无限次使用', included: true },
      { text: '标准模型', included: true },
      { text: '工作日支持', included: true },
      { text: '季度数据报告', included: true },
      { text: 'SaaS云端部署', included: true },
      { text: 'API集成', included: true },
    ]
  },
  {
    id: 3,
    name: '轻量版',
    price: '¥50',
    period: '/例',
    target: '一级医院',
    strategy: '占入口、布生态',
    icon: FileText,
    color: 'from-accent-light to-accent',
    badge: null,
    features: [
      { text: '按需付费', included: true },
      { text: '极简版模型', included: true },
      { text: '社区支持', included: true },
      { text: '基础数据报告', included: true },
      { text: 'SaaS云端部署', included: true },
      { text: '标准API', included: true },
    ]
  }
];

const clinicalOutcomes = [
  { value: '89.5%', label: 'SAP预警准确率', desc: '较传统评分提升15.3%' },
  { value: '-2.3天', label: '住院周期缩短', desc: '降低医疗负担' },
  { value: '-25.6%', label: '医疗费用降低', desc: '减少不必要检查' },
  { value: '-38.2%', label: '死亡率下降', desc: '早期预警挽救生命' }
];

export default function CooperationSection({ lang }: CooperationSectionProps) {
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);

  return (
    <section id="cooperation" className="py-20 md:py-28 bg-gradient-to-b from-white to-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {lang === 'zh' ? '商业合作' : 'Business Cooperation'}
          </h2>
          <p className="text-base text-primary/70 max-w-2xl mx-auto">
            {lang === 'zh'
              ? '多元盈利模式，覆盖基层医疗机构全层级，早期以江西为核心、打造标杆后全国扩张'
              : 'Multiple revenue models, covering all levels of primary care institutions'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {deploymentOptions.map((option) => (
            <div
              key={option.id}
              className="group bg-white rounded-2xl p-6 border border-accent/20 hover:shadow-xl hover:border-accent/30 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className={`w-12 h-12 bg-gradient-to-br ${option.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <option.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary">{option.name}</h3>
                  <p className="text-xs text-primary/60">{option.subtitle}</p>
                </div>
              </div>

              <div className="space-y-2.5 mb-5">
                <div className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-primary/80">{option.features.privacy}</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-primary/80">{option.features.cost}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Users className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-primary/80">{option.features.maintenance}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Network className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-primary/80">{option.features.update}</span>
                </div>
              </div>

              <div className="bg-bg-secondary rounded-xl p-3">
                <p className="text-sm text-primary/70">
                  <span className="font-semibold">{lang === 'zh' ? '适用：' : 'For: '}</span>
                  {option.suitable}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-primary via-primary-light to-primary rounded-3xl p-8 md:p-10 mb-16 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          </div>
          <div className="relative z-10">
            <h3 className="text-xl font-bold text-white mb-8 text-center">
              {lang === 'zh' ? '临床价值' : 'Clinical Value'}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {clinicalOutcomes.map((item, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 text-center border border-white/10 hover:bg-white/15 transition-all">
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">{item.value}</div>
                  <div className="text-sm text-white/80 font-medium mb-1">{item.label}</div>
                  <div className="text-xs text-white/60">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-xl md:text-2xl font-bold text-primary mb-3">
              {lang === 'zh' ? '定价方案' : 'Pricing Plans'}
            </h3>
            <p className="text-primary/70">
              {lang === 'zh' ? '摒弃单一盈利模式，搭建多层分元定价体系' : 'Multi-tier pricing system for different hospital levels'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {pricingPlans.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-2xl p-6 border-2 transition-all duration-300 cursor-pointer ${
                  hoveredPlan === plan.id
                    ? 'border-accent shadow-xl scale-[1.02]'
                    : 'border-accent/20 hover:border-accent/30 hover:shadow-lg'
                } bg-white`}
                onMouseEnter={() => setHoveredPlan(plan.id)}
                onMouseLeave={() => setHoveredPlan(null)}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-accent to-accent-light text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg">
                    {lang === 'zh' ? plan.badge : 'Recommended'}
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className={`w-12 h-12 bg-gradient-to-br ${plan.color} rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg`}>
                    <plan.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-primary mb-1">{plan.name}</h4>
                  <div className="inline-block px-3 py-1 bg-bg-secondary rounded-full text-xs text-primary/70 mb-3">
                    {lang === 'zh' ? '目标：' : 'Target: '}{plan.target}
                  </div>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-3xl font-bold text-accent">{plan.price}</span>
                    <span className="text-sm text-primary/60">{plan.period}</span>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                        feature.included ? 'bg-emerald-100' : 'bg-gray-100'
                      }`}>
                        {feature.included ? (
                          <Check className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <span className="text-gray-400 text-xs">×</span>
                        )}
                      </div>
                      <span className={feature.included ? 'text-primary/80' : 'text-primary/40'}>{feature.text}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-accent/10">
                  <div className="flex items-center justify-center gap-2 text-xs text-accent font-medium">
                    <Zap className="w-3 h-3" />
                    <span>{plan.strategy}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-bg-primary via-white to-bg-secondary rounded-3xl p-8 md:p-12 text-center border border-accent/20">
          <h3 className="text-2xl font-bold text-primary mb-4">
            {lang === 'zh' ? '立即体验胰见' : 'Experience Yijian Now'}
          </h3>
          <p className="text-primary/70 mb-8 max-w-xl mx-auto">
            {lang === 'zh'
              ? '聚焦急性胰腺炎刚需蓝海，同步拓展至急危重症领域，助力分级诊疗与医疗资源下沉'
              : 'Focus on acute pancreatitis market, expand to critical care, support hierarchical medical system'}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-gradient-to-r from-accent to-accent-light text-white px-8 py-3.5 rounded-full font-semibold hover:shadow-lg hover:shadow-accent/25 transition-all inline-flex items-center gap-2">
              {lang === 'zh' ? '申请试用' : 'Request Demo'}
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button className="bg-white text-primary px-8 py-3.5 rounded-full font-semibold hover:shadow-lg transition-all inline-flex items-center gap-2 border border-accent/20">
              <Phone className="w-4 h-4" />
              {lang === 'zh' ? '联系我们' : 'Contact Us'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}