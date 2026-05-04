'use client';

import React from 'react';
import { AlertTriangle, Clock, Shield, CheckCircle2, Activity, TrendingUp, Brain, ArrowRight, CheckCircle, Users, Hospital } from 'lucide-react';

interface PainPointsSectionProps {
  lang: 'en' | 'zh';
}

const painPointsData = [
  {
    icon: Clock,
    title: '早期识别滞后',
    description: '传统评分系统（APACHE Ⅱ、BISAP）需入院 24-48h 完整数据才能评估，急性胰腺炎发病 6-24h 的黄金干预窗口往往被错过。',
    harm: '高危患者漏判、延误最佳治疗时机',
    solution: '发病 6h 内即可预警'
  },
  {
    icon: TrendingUp,
    title: '评分系统静态',
    description: '瞬时心率仅反映当下状态，而 72h 心率动态轨迹才是预后的核心预测因子。传统单次检测价值有限。',
    harm: '重症转化难以早期预警',
    solution: '72h 连续轨迹分析'
  },
  {
    icon: Shield,
    title: '监测手段有创',
    description: '传统CT、血检及评分体系难以满足急诊黄金救治窗需求，有创检查增加患者负担。',
    harm: '增加患者痛苦与风险',
    solution: '无创快速评估'
  },
  {
    icon: Users,
    title: '诊疗方式单一',
    description: '基层医院AP患者存在转诊不及时的问题，传统诊疗难以满足个性化需求。',
    harm: '20份问卷显示转诊不及时',
    solution: 'AI 技术下沉基层'
  }
];

const statistics = [
  { value: '181亿', label: '全国AP医疗消耗', desc: '年度支出' },
  { value: '30%', label: '重症死亡率', desc: '传统诊疗' },
  { value: '72h', label: '连续监测缺失', desc: '动态轨迹难以追踪' }
];

const solutionsData = [
  {
    tech: 'digital',
    icon: Activity,
    title: '数字望诊',
    subtitle: '无创无辐射',
    color: 'from-primary to-primary-light',
    points: ['多模态融合 AP 特征面', '轻/中/重度识别准确率 89.7%/87.3%/91.5%', '计算复杂度降低 93.2%'],
    highlight: '全程无创'
  },
  {
    tech: 'trajectory',
    icon: TrendingUp,
    title: '轨迹解密',
    subtitle: '实时动态分型',
    color: 'from-primary-light to-primary',
    points: ['心率多维动态轨迹', 'T1-T4 四类亚型自动分型', '1 分钟内完成预警'],
    highlight: 'AUC 0.91'
  },
  {
    tech: 'swarm',
    icon: Brain,
    title: '蜂群网络',
    subtitle: '数据不动模型动',
    color: 'from-primary to-primary-light',
    points: ['边缘密算隐私保护', '跨中心性能波动 ≤5%', '基层准确率提升 29.2%'],
    highlight: '100% 合规'
  }
];

export default function PainPointsSection({ lang }: PainPointsSectionProps) {
  return (
    <section id="painpoints" className="py-20 md:py-28 bg-gradient-to-b from-bg-primary to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {lang === 'zh' ? '破解急性胰腺炎诊疗瓶颈' : 'Solving AP Diagnosis Bottlenecks'}
          </h2>
          <p className="text-base text-primary/70 max-w-2xl mx-auto">
            {lang === 'zh'
              ? '通过 AI 技术将顶级医院经验下沉基层，以标准化、智能化工具弥补基层在设备、人才和经验上的短板'
              : 'Bringing top hospital expertise to grassroots through AI'}
          </p>
        </div>

        <div className="bg-gradient-to-br from-primary via-primary-light to-primary rounded-3xl p-8 md:p-10 mb-12 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-light/10 rounded-full blur-3xl"></div>
          </div>
          <div className="relative z-10">
            <div className="text-center mb-8">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                {lang === 'zh' ? '急性胰腺炎（AP）四大核心痛点' : 'Four Core Pain Points of AP'}
              </h3>
              <p className="text-white/80">
                {lang === 'zh' ? '"早期识别滞后、评分系统静态、监测手段有创、诊疗方式单一"' : '"Delayed recognition, Static scoring, Invasive monitoring, Single treatment"'}
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {statistics.map((stat, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-white/80 font-medium mb-1">{stat.label}</div>
                  <div className="text-xs text-white/60">{stat.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {painPointsData.map((point, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-6 shadow-sm border border-accent/20 hover:shadow-lg hover:border-accent/40 transition-all"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                  <point.icon className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-2">{point.title}</h3>
                  <p className="text-sm text-primary/70 leading-relaxed">{point.description}</p>
                </div>
              </div>
              <div className="bg-accent/10 border-l-4 border-accent p-3 rounded-r-lg mb-3">
                <p className="text-xs text-primary font-medium">{point.harm}</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-accent font-medium">
                <CheckCircle className="w-4 h-4" />
                <span>{point.solution}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-primary via-primary-light to-primary rounded-3xl p-8 md:p-12 mb-16 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-light/10 rounded-full blur-3xl"></div>
          </div>
          <div className="relative z-10">
            <div className="text-center mb-10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                {lang === 'zh' ? '三大核心技术融合解决方案' : 'Three Core Technology Solutions'}
              </h3>
              <p className="text-white/80">
                {lang === 'zh' ? '数字望诊 + 轨迹解密 + 蜂群网络' : 'Digital Diagnosis + Trajectory + Swarm Network'}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {solutionsData.map((solution) => (
                <div
                  key={solution.tech}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${solution.color} rounded-xl flex items-center justify-center`}>
                      <solution.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white">{solution.title}</h4>
                      <p className="text-xs text-white/70">{solution.subtitle}</p>
                    </div>
                  </div>
                  <ul className="space-y-2 mb-4">
                    {solution.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-white/90">
                        <CheckCircle className="w-4 h-4 text-accent-light mt-0.5 flex-shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r ${solution.color} rounded-full text-xs font-semibold text-white`}>
                    <CheckCircle className="w-3 h-3" />
                    {solution.highlight}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-bg-primary to-bg-secondary rounded-2xl p-8 border border-accent/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-primary">{lang === 'zh' ? '数字望诊' : 'Digital Diagnosis'}</h4>
                <p className="text-xs text-accent">{lang === 'zh' ? '无创无辐射' : 'Non-invasive'}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-accent/20">
                <span className="text-sm text-primary/70">{lang === 'zh' ? '轻度识别' : 'Mild Accuracy'}</span>
                <span className="font-bold text-accent">89.7%</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-accent/20">
                <span className="text-sm text-primary/70">{lang === 'zh' ? '中度识别' : 'Moderate Accuracy'}</span>
                <span className="font-bold text-accent">87.3%</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-accent/20">
                <span className="text-sm text-primary/70">{lang === 'zh' ? '重度识别' : 'Severe Accuracy'}</span>
                <span className="font-bold text-accent">91.5%</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-primary/70">{lang === 'zh' ? '计算复杂度降低' : 'Complexity Reduction'}</span>
                <span className="font-bold text-accent">93.2%</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-bg-primary to-bg-secondary rounded-2xl p-8 border border-accent/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-light to-primary rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-primary">{lang === 'zh' ? '轨迹解密' : 'Trajectory'}</h4>
                <p className="text-xs text-accent">{lang === 'zh' ? '实时动态分型' : 'Real-time Classification'}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-accent/20">
                <span className="text-sm text-primary/70">{lang === 'zh' ? '重症预测 AUC' : 'Severe AUC'}</span>
                <span className="font-bold text-accent">0.91</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-accent/20">
                <span className="text-sm text-primary/70">{lang === 'zh' ? '优于 APACHE II' : 'vs APACHE II'}</span>
                <span className="font-bold text-accent">+15.3%</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-accent/20">
                <span className="text-sm text-primary/70">{lang === 'zh' ? '单例推理时间' : 'Inference Time'}</span>
                <span className="font-bold text-accent">&lt;5 min</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-primary/70">{lang === 'zh' ? '临床亚型分类' : 'Clinical Subtypes'}</span>
                <span className="font-bold text-accent">4 {lang === 'zh' ? '类' : 'Types'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
