'use client';

import React, { useState } from 'react';
import { Activity, CheckCircle2, ArrowRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface PainPointsSectionProps {
  lang: 'en' | 'zh';
}

const painPointsData = [
  {
    title: '传统评分系统无法早期精准分层',
    description: 'AP 呈现「轻症自限、重症致命」的极端异质性。传统评分工具（APACHE Ⅱ、Ranson、BISAP）需入院 24-48h 完整数据，错过发病 6-24h 黄金干预窗。',
    harm: '高危患者漏判、低危患者过度治疗'
  },
  {
    title: '单次心率检测价值有限',
    description: '指南明确心率是 AP 严重程度评估的核心标志物，但临床常规仅采用单次检测。瞬时值仅能反映当下生理状态。',
    harm: '72h 动态轨迹才是反映炎症反应强度、预后的核心窗口'
  },
  {
    title: '数据隐私壁垒高，单中心数据泛化性不足',
    description: 'AP 重症病例占比低，单中心样本有限，模型易过拟合。医疗数据属于敏感信息，跨院流转有严格合规要求。',
    harm: '多中心数据「共享难、协同难」成为 AI 落地瓶颈'
  }
];

const trajectoryData = [
  { time: '0h', high_risk: 38, medium_risk: 38, low_risk: 38 },
  { time: '6h', high_risk: 35, medium_risk: 37, low_risk: 38 },
  { time: '12h', high_risk: 32, medium_risk: 36, low_risk: 37 },
  { time: '24h', high_risk: 28, medium_risk: 34, low_risk: 37 },
  { time: '48h', high_risk: 24, medium_risk: 32, low_risk: 36 },
  { time: '72h', high_risk: 22, medium_risk: 30, low_risk: 36 },
];

interface ProcessStepProps {
  number: number;
  title: string;
  isTraditional: boolean;
  highlight?: string;
  isAdvantage?: boolean;
}

const ProcessStep: React.FC<ProcessStepProps> = ({ number, title, isTraditional, highlight, isAdvantage }) => {
  return (
    <div className="flex-shrink-0">
      <div className={`relative px-4 py-3 rounded-lg ${
        isTraditional 
          ? 'bg-gray-100 border-2 border-gray-300' 
          : isAdvantage 
            ? 'bg-medical-blue text-white border-2 border-medical-blue shadow-lg'
            : 'bg-white border-2 border-medical-blue'
      }`}>
        <div className={`text-xs font-bold mb-1 ${
          isTraditional 
            ? 'text-gray-500' 
            : isAdvantage 
              ? 'text-white/80'
              : 'text-medical-blue'
        }`}>
          Step {number}
        </div>
        <div className={`text-sm font-semibold ${
          isTraditional 
            ? 'text-gray-700' 
            : isAdvantage 
              ? 'text-white'
              : 'text-gray-900'
        }`}>
          {title}
        </div>
        {highlight && (
          <div className={`mt-2 text-xs font-bold px-2 py-1 rounded inline-block ${
            isTraditional 
              ? 'bg-red-100 text-red-700' 
              : 'bg-green-100 text-green-700'
          }`}>
            {highlight}
          </div>
        )}
      </div>
    </div>
  );
};

export default function PainPointsSection({ lang }: PainPointsSectionProps) {
  const [selectedCase, setSelectedCase] = useState<number | null>(null);

  return (
    <>
      <section id="painpoints" className="py-20 md:py-28 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title System */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-medical-blue mb-4">
              {lang === 'zh' ? '为什么需要 AP 异质性分型 Agent？' : 'Why AP Heterogeneity Classification Agent?'}
            </h2>
            <p className="text-base text-gray-500 max-w-3xl mx-auto">
              {lang === 'zh' 
                ? '直击急性胰腺炎诊疗核心困境，填补动态精准诊疗的全链条临床空白' 
                : 'Addressing core challenges in AP diagnosis, filling the gap in dynamic precision medicine'}
            </p>
          </div>

          {/* 3 Core Pain Points */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {painPointsData.map((point, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-100"
              >
                <div className="w-10 h-10 bg-[#F5E6E6] rounded-full flex items-center justify-center mb-4">
                  <Activity className="w-5 h-5 text-[#C76B6B]" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{point.title}</h3>
                <p className="text-gray-600 leading-relaxed-plus mb-4 text-sm">{point.description}</p>
                <div className="bg-[#F5E6E6] border-l-4 border-[#C76B6B] p-3 rounded-r-lg">
                  <p className="text-xs text-[#C76B6B] font-semibold">{point.harm}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Project Positioning */}
          <div className="bg-gradient-to-r from-medical-blue to-blue-600 text-white p-8 rounded-xl shadow-xl mb-12">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">
                  {lang === 'zh' ? '项目定位：国内首个基于动态心率轨迹 LCTM 分型的 AP 专属诊疗 Agent' : 'Project Positioning: China\'s First LCTM-based AP Classification Agent'}
                </h3>
                <p className="text-white/90 leading-relaxed text-sm">
                  {lang === 'zh'
                    ? '打造国内首个基于动态心率轨迹 LCTM 分型的 AP 专属诊疗 Agent，针对三大核心困境，填补「动态轨迹精准分型 - 超早期风险预警 - 个性化循证方案生成」的全链条临床空白；通过隐私安全的联邦学习架构，实现多中心医疗数据「可用不可见」。'
                    : 'Creating China\'s first LCTM-based AP classification agent, addressing three core challenges and filling the gap in dynamic precision medicine. Through privacy-preserving federated learning, enabling multi-center data collaboration.'}
                </p>
              </div>
            </div>
          </div>

          {/* Visual Comparison: Single vs Dynamic */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {/* Traditional: Single Test */}
            <div className="bg-gray-50 p-8 rounded-2xl border-2 border-gray-200">
              <h3 className="text-base font-semibold text-gray-500 mb-6 flex items-center">
                <div className="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
                {lang === 'zh' ? '传统诊疗模式：单次检测' : 'Traditional Model: Single Test'}
              </h3>
              <div className="bg-white p-8 rounded-xl mb-6">
                <div className="text-center py-8">
                  <div className="text-5xl font-bold text-gray-400 mb-2">85bpm</div>
                  <div className="text-gray-500 text-sm mb-4">{lang === 'zh' ? '入院时心率' : 'Admission Heart Rate'}</div>
                  <div className="inline-block bg-gray-100 px-4 py-2 rounded-full text-gray-600 text-sm">
                    {lang === 'zh' ? '参考范围：60-100bpm' : 'Reference: 60-100bpm'}
                  </div>
                  <div className="mt-4 text-gray-400 text-sm">
                    {lang === 'zh' ? '判定为正常' : 'Classified as Normal'}
                  </div>
                </div>
              </div>
              <div className="bg-[#F5E6E6] border-l-4 border-[#C76B6B] p-4 rounded-r-lg">
                <p className="text-[#C76B6B] text-sm font-semibold">
                  {lang === 'zh'
                    ? '⚠ 无法预判 48h 后快速下降的重症风险'
                    : '⚠ Cannot predict severe risk of rapid decline after 48h'}
                </p>
              </div>
              <p className="text-gray-500 text-sm mt-4 text-center">
                {lang === 'zh' 
                  ? '仅能反映瞬时状态，无法识别炎症进展趋势' 
                  : 'Only reflects instantaneous state, cannot identify inflammation progression'}
              </p>
            </div>

            {/* Agent: Dynamic Trajectory */}
            <div className="bg-blue-50 p-8 rounded-2xl border-2 border-medical-blue">
              <h3 className="text-base font-semibold text-medical-blue mb-6 flex items-center">
                <div className="w-2 h-2 bg-medical-blue rounded-full mr-3"></div>
                {lang === 'zh' ? 'Agent 辅助诊疗：72h 动态轨迹' : 'Agent-Assisted: 72h Dynamic Trajectory'}
              </h3>
              <div className="bg-white p-6 rounded-xl mb-6">
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={trajectoryData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                      <XAxis dataKey="time" stroke="#666" fontSize={12} />
                      <YAxis stroke="#666" fontSize={12} domain={[20, 45]} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '8px' }}
                        labelStyle={{ color: '#333', fontWeight: 'bold' }}
                      />
                      <Legend />
                      <Bar dataKey="high_risk" name={lang === 'zh' ? '快速下降 - 高危型' : 'Rapid Decline - High Risk'} fill="#DC3545" />
                      <Bar dataKey="medium_risk" name={lang === 'zh' ? '缓慢下降 - 中危型' : 'Slow Decline - Medium Risk'} fill="#FF9800" />
                      <Bar dataKey="low_risk" name={lang === 'zh' ? '稳定 - 低危型' : 'Stable - Low Risk'} fill="#28A745" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="bg-[#EDF5F1] border-l-4 border-[#7DAF9C] p-4 rounded-r-lg">
                <p className="text-[#7DAF9C] text-sm font-semibold">
                  {lang === 'zh'
                    ? '✓ 入院 6h 识别快速下降趋势，提前 48h 预警高危风险'
                    : '✓ Identified rapid decline at 6h, 48h early warning for high risk'}
                </p>
              </div>
              <p className="text-gray-500 text-sm mt-4 text-center">
                {lang === 'zh' 
                  ? '动态捕捉炎症进展，精准匹配预后亚型' 
                  : 'Dynamically captures inflammation progression, precisely matches prognosis subtypes'}
              </p>
            </div>
          </div>

          {/* Process Comparison */}
          <div className="space-y-8">
            {/* Traditional Process */}
            <div className="bg-gray-50 p-8 rounded-2xl border-2 border-gray-200">
              <h3 className="text-xl font-bold text-gray-700 mb-6 flex items-center">
                <div className="w-3 h-3 bg-gray-400 rounded-full mr-3"></div>
                {lang === 'zh' ? '传统 AP 诊疗流程' : 'Traditional AP Diagnostic Process'}
              </h3>
              <div className="flex flex-wrap items-center gap-4">
                <ProcessStep 
                  number={1} 
                  title={lang === 'zh' ? '入院诊断' : 'Admission Diagnosis'} 
                  isTraditional={true}
                />
                <ArrowRight className="w-5 h-5 text-gray-400" />
                <ProcessStep 
                  number={2} 
                  title={lang === 'zh' ? '单次检验检查' : 'Single Lab Test'} 
                  isTraditional={true}
                />
                <ArrowRight className="w-5 h-5 text-gray-400" />
                <ProcessStep 
                  number={3} 
                  title={lang === 'zh' ? '24-48h 完成评分' : '24-48h Scoring'} 
                  isTraditional={true}
                  highlight={lang === 'zh' ? '风险分层滞后' : 'Delayed Stratification'}
                />
                <ArrowRight className="w-5 h-5 text-gray-400" />
                <ProcessStep 
                  number={4} 
                  title={lang === 'zh' ? '经验性常规治疗' : 'Empirical Treatment'} 
                  isTraditional={true}
                  highlight={lang === 'zh' ? '治疗同质化' : 'Homogeneous Treatment'}
                />
                <ArrowRight className="w-5 h-5 text-gray-400" />
                <ProcessStep 
                  number={5} 
                  title={lang === 'zh' ? '病情进展后被动调整' : 'Passive Adjustment'} 
                  isTraditional={true}
                  highlight={lang === 'zh' ? '错失黄金干预窗' : 'Missed Golden Window'}
                />
              </div>
            </div>

            {/* Agent Process */}
            <div className="bg-blue-50 p-8 rounded-2xl border-2 border-medical-blue">
              <h3 className="text-xl font-bold text-medical-blue mb-6 flex items-center">
                <div className="w-3 h-3 bg-medical-blue rounded-full mr-3"></div>
                {lang === 'zh' ? 'Agent 辅助诊疗流程' : 'Agent-Assisted Diagnostic Process'}
              </h3>
              <div className="flex flex-wrap items-center gap-4">
                <ProcessStep 
                  number={1} 
                  title={lang === 'zh' ? '入院诊断' : 'Admission Diagnosis'} 
                  isTraditional={false}
                />
                <ArrowRight className="w-5 h-5 text-medical-blue" />
                <ProcessStep 
                  number={2} 
                  title={lang === 'zh' ? '实时对接 HIS/EMR' : 'Real-time HIS/EMR'} 
                  isTraditional={false}
                />
                <ArrowRight className="w-5 h-5 text-medical-blue" />
                <ProcessStep 
                  number={3} 
                  title={lang === 'zh' ? 'LCTM 分型 + 人脸识别' : 'LCTM + Facial Analysis'} 
                  isTraditional={false}
                  highlight={lang === 'zh' ? '超早期分层' : 'Ultra-early Stratification'}
                  isAdvantage={true}
                />
                <ArrowRight className="w-5 h-5 text-medical-blue" />
                <ProcessStep 
                  number={4} 
                  title={lang === 'zh' ? '入院 6h 内预警' : '6h Early Warning'} 
                  isTraditional={false}
                  highlight={lang === 'zh' ? '动态持续评估' : 'Dynamic Assessment'}
                  isAdvantage={true}
                />
                <ArrowRight className="w-5 h-5 text-medical-blue" />
                <ProcessStep 
                  number={5} 
                  title={lang === 'zh' ? 'LLM 个性化方案' : 'LLM Personalized Plan'} 
                  isTraditional={false}
                  highlight={lang === 'zh' ? '个体化精准干预' : 'Personalized Intervention'}
                  isAdvantage={true}
                />
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-12">
            <button
              onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-medical-blue text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-medical-blue-dark transition-all shadow-lg hover:shadow-xl inline-flex items-center group"
            >
              {lang === 'zh' ? '立即体验产品演示' : 'Experience Product Demo'}
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Clinical Case Modal */}
      {selectedCase !== null && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedCase(null)}>
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  {lang === 'zh' ? '真实临床案例' : 'Real Clinical Case'}
                </h3>
                <button
                  onClick={() => setSelectedCase(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="bg-blue-50 border-l-4 border-medical-blue p-6 rounded-r-lg">
                  <h4 className="font-bold text-medical-blue mb-3">
                    {lang === 'zh' ? '患者基本信息' : 'Patient Information'}
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    {lang === 'zh'
                      ? '患者男性，38 岁，胆源性急性胰腺炎，入院时腹痛 6h，APACHE Ⅱ评分 5 分，BISAP 评分 1 分，传统评估判定为轻症 AP，予常规补液治疗。'
                      : 'Male patient, 38 years old, biliary acute pancreatitis, abdominal pain for 6h on admission, APACHE II score 5, BISAP score 1, traditional assessment classified as mild AP, given conventional fluid therapy.'}
                  </p>
                </div>

                <div className="bg-[#F5E6E6] border-l-4 border-[#C76B6B] p-6 rounded-r-lg">
                  <h4 className="font-bold text-[#C76B6B] mb-3">
                    {lang === 'zh' ? '传统诊疗困境' : 'Traditional Diagnostic Dilemma'}
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    {lang === 'zh'
                      ? '入院 36h 患者出现气促、氧合下降，复查 CT 提示胰腺坏死，进展为重症 AP 合并 ARDS。传统评分系统未能早期识别高危风险，错失黄金干预窗。'
                      : 'At 36h after admission, the patient developed shortness of breath and decreased oxygenation. Repeat CT showed pancreatic necrosis, progressing to severe AP with ARDS. Traditional scoring systems failed to identify high-risk early, missing the golden intervention window.'}
                  </p>
                </div>

                <div className="bg-[#EDF5F1] border-l-4 border-[#7DAF9C] p-6 rounded-r-lg">
                  <h4 className="font-bold text-[#7DAF9C] mb-3">
                    {lang === 'zh' ? 'Agent 辅助干预效果' : 'Agent-Assisted Intervention Effect'}
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    {lang === 'zh'
                      ? '若采用 Agent 辅助：入院 12h 即通过心率动态轨迹 + 面部炎症特征，识别高危亚型，提前预警重症风险，予强化器官功能保护、目标导向液体治疗，可有效阻断病情进展。'
                      : 'With Agent assistance: At 12h after admission, identified high-risk subtype through heart rate dynamic trajectory + facial inflammation features, provided early warning of severe risk, given intensive organ function protection and goal-directed fluid therapy, effectively blocking disease progression.'}
                  </p>
                </div>
              </div>

              <div className="mt-8 flex justify-end space-x-4">
                <button
                  onClick={() => setSelectedCase(null)}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  {lang === 'zh' ? '关闭' : 'Close'}
                </button>
                <button
                  onClick={() => {
                    setSelectedCase(null);
                    document.getElementById('validation')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3 bg-medical-blue text-white rounded-lg font-semibold hover:bg-medical-blue-dark transition-colors"
                >
                  {lang === 'zh' ? '查看更多临床数据' : 'View More Clinical Data'}
                  <ArrowRight className="w-4 h-4 ml-2 inline" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
