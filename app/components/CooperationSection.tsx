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
  ArrowUpRight
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

const cooperationModels = [
  {
    id: 1,
    title: '一次性授权订阅制',
    price: '¥ 50万元/套',
    target: '三级医院',
    strategy: '树品牌、保质量',
    desc: '针对三级医院财力强、病人流量大、技术接受度高，可以长期合作并更新数据',
    icon: Activity,
    color: 'from-primary to-primary-light',
    hospitals: [
      { name: '南昌大学第一附属医院', logo: '/c7f1dbb85e10e235.png' },
      { name: '赣南医科大学第一附属医院', logo: '/87818440-2c0f-4366-82fa-d35ea2a3fec9_wps图片_2(1).png' }
    ]
  },
  {
    id: 2,
    title: 'SaaS年费订阅制',
    price: '¥ 5万元/套',
    target: '二级医院',
    strategy: '扩份额、创利润',
    desc: '针对二级医院财力较强、辅助转诊决策的需求强烈，是我们的重点拓展市场',
    icon: Cloud,
    color: 'from-accent to-accent-light',
    hospitals: [
      { name: '余干县人民医院', logo: '/OIP-C (18).webp' },
      { name: '鄱阳县人民医院', logo: '/OIP-C (5).jpg' }
    ]
  },
  {
    id: 3,
    title: '按检测量付费制',
    price: '¥ 50元/例',
    target: '一级医院',
    strategy: '占入口、布生态',
    desc: '针对一级医院财力与支付能力弱、病人流量不稳定，推出极简版，按次收费，价格亲民',
    icon: FileText,
    color: 'from-accent-light to-accent',
    hospitals: [
      { name: '塘山街道卫生服务中心', logo: '/OIP-C (20).webp' },
      { name: '十字街街道社区卫生服务中心', logo: '/OIP-C (21)(1).webp' }
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
  const [selectedModel, setSelectedModel] = useState<number | null>(null);

  return (
    <section id="cooperation" className="py-20 md:py-28 bg-white">
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

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {deploymentOptions.map((option) => (
            <div
              key={option.id}
              className="bg-gradient-to-br from-bg-primary to-white rounded-3xl p-8 border border-accent/10 hover:shadow-xl transition-all"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-14 h-14 bg-gradient-to-br ${option.color} rounded-2xl flex items-center justify-center`}>
                  <option.icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary">{option.name}</h3>
                  <p className="text-sm text-primary/60">{option.subtitle}</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-accent mt-0.5" />
                  <span className="text-sm text-primary/80">{option.features.privacy}</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent mt-0.5" />
                  <span className="text-sm text-primary/80">{option.features.cost}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-accent mt-0.5" />
                  <span className="text-sm text-primary/80">{option.features.maintenance}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Network className="w-5 h-5 text-accent mt-0.5" />
                  <span className="text-sm text-primary/80">{option.features.update}</span>
                </div>
              </div>

              <div className="bg-bg-secondary rounded-xl p-4">
                <p className="text-sm text-primary/70">
                  <span className="font-semibold">{lang === 'zh' ? '适用场景：' : 'Suitable for: '}</span>
                  {option.suitable}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-primary to-primary rounded-3xl p-8 md:p-12 mb-16">
          <h3 className="text-xl font-bold text-white mb-8 text-center">
            {lang === 'zh' ? '临床价值' : 'Clinical Value'}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {clinicalOutcomes.map((item, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10">
                <div className="text-3xl font-bold text-white mb-1">{item.value}</div>
                <div className="text-sm text-white/80 font-medium mb-1">{item.label}</div>
                <div className="text-xs text-white/60">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h3 className="text-xl font-bold text-primary mb-6 text-center">
            {lang === 'zh' ? '盈利模式' : 'Revenue Models'}
          </h3>
          <p className="text-center text-primary/70 mb-12 text-lg">
            {lang === 'zh' ? '摒弃单一盈利模式，搭建多层分元定价体系' : 'Multi-tier pricing system for different hospital levels'}
          </p>
          <div className="space-y-8">
            {cooperationModels.map((model, index) => (
              <div
                key={model.id}
                className={`relative rounded-3xl p-8 border-2 transition-all ${
                  selectedModel === model.id
                    ? 'border-accent shadow-xl'
                    : 'border-accent/10 hover:border-accent/20 hover:shadow-lg'
                } bg-gradient-to-br from-white to-bg-primary`}
                onClick={() => setSelectedModel(model.id)}
              >
                <div className="grid md:grid-cols-12 gap-6 items-center">
                  {/* Left: Model Info */}
                  <div className="md:col-span-5">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${model.color} rounded-xl flex items-center justify-center`}>
                        <model.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-primary">{model.title}</h4>
                        <span className="text-sm text-accent font-medium">模式 {model.id}</span>
                      </div>
                    </div>
                    <p className="text-sm text-primary/70 leading-relaxed">{model.desc}</p>
                    <div className="mt-4 inline-block px-4 py-1.5 bg-highlight/10 text-highlight text-sm font-semibold rounded-full">
                      {lang === 'zh' ? '策略：' : 'Strategy: '}{model.strategy}
                    </div>
                  </div>

                  {/* Center: Price */}
                  <div className="md:col-span-3 text-center">
                    <div className="text-4xl font-bold text-accent">{model.price}</div>
                    <div className="mt-2 text-sm text-primary/60">
                      {lang === 'zh' ? '目标客户：' : 'Target: '}{model.target}
                    </div>
                  </div>

                  {/* Right: Hospitals */}
                  <div className="md:col-span-4">
                    <div className="bg-white rounded-2xl p-4 border border-accent/10">
                      <div className="text-xs text-primary/50 mb-3 font-medium">
                        {lang === 'zh' ? '合作医院' : 'Partner Hospitals'}
                      </div>
                      <div className="space-y-2">
                        {model.hospitals.map((hospital, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center flex-shrink-0 border border-accent/20 overflow-hidden">
                              <Image src={hospital.logo} alt={hospital.name} width={24} height={24} className="object-contain" />
                            </div>
                            <span className="text-sm text-primary/80">{hospital.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-bg-primary to-bg-secondary rounded-3xl p-8 md:p-12 text-center border border-accent/20">
          <h3 className="text-2xl font-bold text-primary mb-4">
            {lang === 'zh' ? '立即体验胰见' : 'Experience Yijian Now'}
          </h3>
          <p className="text-primary/70 mb-8 max-w-xl mx-auto">
            {lang === 'zh'
              ? '聚焦急性胰腺炎刚需蓝海，同步拓展至急危重症领域，助力分级诊疗与医疗资源下沉'
              : 'Focus on acute pancreatitis market, expand to critical care, support hierarchical medical system'}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-gradient-to-r from-accent to-accent-light text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all inline-flex items-center gap-2">
              {lang === 'zh' ? '申请试用' : 'Request Demo'}
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all inline-flex items-center gap-2 border border-accent/20">
              <Phone className="w-4 h-4" />
              {lang === 'zh' ? '联系我们' : 'Contact Us'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}