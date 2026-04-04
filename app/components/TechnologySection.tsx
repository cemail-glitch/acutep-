'use client';

import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Shield, 
  Camera, 
  FileText,
  Lock,
  Database,
  Server,
  CheckCircle,
  ArrowRight,
  Download,
  X,
  Info,
  Activity,
  Users,
  LineChart,
  Brain,
  BookOpen,
  Plus,
  User
} from 'lucide-react';
import { 
  LineChart as RechartsLineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  ReferenceLine,
  Legend,
  BarChart as RechartsBarChart,
  Bar,
  Area
} from 'recharts';

interface TechnologySectionProps {
  lang: 'en' | 'zh';
}

// LCTM 轨迹数据
const lctmTrajectoryData = [
  { time: '0h', high_risk: 38, medium_risk: 38, low_risk: 38 },
  { time: '6h', high_risk: 35, medium_risk: 37, low_risk: 38 },
  { time: '12h', high_risk: 32, medium_risk: 36, low_risk: 37 },
  { time: '24h', high_risk: 28, medium_risk: 34, low_risk: 36 },
  { time: '48h', high_risk: 25, medium_risk: 33, low_risk: 38 },
  { time: '72h', high_risk: 23, medium_risk: 35, low_risk: 42 },
];

// 联邦学习性能对比数据
const federatedPerformanceData = [
  { 
    metric: '重症预测 AUC', 
    single: 0.78, 
    federated: 0.85,
    ci_single: [0.75, 0.81],
    ci_federated: [0.82, 0.88]
  },
  { 
    metric: '泛化性评分', 
    single: 0.72, 
    federated: 0.84,
    ci_single: [0.69, 0.75],
    ci_federated: [0.81, 0.87]
  },
  { 
    metric: '重症识别准确率', 
    single: 0.75, 
    federated: 0.88,
    ci_single: [0.72, 0.78],
    ci_federated: [0.85, 0.91]
  },
];

// ROC 曲线数据
const rocData = [
  { fpr: 0, tpr_joint: 0, tpr_clinical: 0, tpr_bisap: 0 },
  { fpr: 0.1, tpr_joint: 0.72, tpr_clinical: 0.65, tpr_bisap: 0.58 },
  { fpr: 0.2, tpr_joint: 0.82, tpr_clinical: 0.73, tpr_bisap: 0.65 },
  { fpr: 0.3, tpr_joint: 0.88, tpr_clinical: 0.79, tpr_bisap: 0.71 },
  { fpr: 0.4, tpr_joint: 0.91, tpr_clinical: 0.83, tpr_bisap: 0.75 },
  { fpr: 0.5, tpr_joint: 0.93, tpr_clinical: 0.86, tpr_bisap: 0.78 },
  { fpr: 0.6, tpr_joint: 0.95, tpr_clinical: 0.88, tpr_bisap: 0.81 },
  { fpr: 0.7, tpr_joint: 0.96, tpr_clinical: 0.90, tpr_bisap: 0.83 },
  { fpr: 0.8, tpr_joint: 0.97, tpr_clinical: 0.91, tpr_bisap: 0.85 },
  { fpr: 0.9, tpr_joint: 0.98, tpr_clinical: 0.92, tpr_bisap: 0.86 },
  { fpr: 1.0, tpr_joint: 1.0, tpr_clinical: 0.93, tpr_bisap: 0.87 },
];

// LCTM 亚型数据
const lctmSubtypes = [
  {
    name: '快速上升 - 持续心动过速型',
    riskLevel: '极高危',
    riskColor: 'text-[#C76B6B] bg-[#F5E6E6]',
    description: '入院 6h 内快速上升，72h 内持续高于 120bpm，无回落拐点',
    clinicalSignificance: '提示严重全身炎症反应、毛细血管渗漏，极高概率进展为重症 AP、合并多器官功能衰竭',
    probability: '87%',
    curveColor: '#C76B6B'
  },
  {
    name: '缓慢上升 - 延迟回落型',
    riskLevel: '中危',
    riskColor: 'text-[#D4A574] bg-[#FDF5EE]',
    description: '入院 24h 内缓慢上升，峰值 100-120bpm，48h 后出现延迟回落',
    clinicalSignificance: '提示中度炎症反应，存在继发感染、病情进展风险，需密切监测与预防性干预',
    probability: '45%',
    curveColor: '#D4A574'
  },
  {
    name: '稳定 - 快速回落型',
    riskLevel: '低危',
    riskColor: 'text-[#7DAF9C] bg-[#EDF5F1]',
    description: '心率全程稳定在 100bpm 以下，或轻度升高后 24h 内快速回落',
    clinicalSignificance: '提示炎症反应局限，病情自限性高，常规治疗即可获得良好预后',
    probability: '12%',
    curveColor: '#7DAF9C'
  }
];

// LLM 方案示例
const llmTreatmentPlans = {
  high_risk: {
    subtype: '快速下降 - 持续低蛋白型',
    riskLevel: '极高危',
    sections: [
      {
        title: '液体治疗',
        content: '立即启动目标导向液体治疗（GDFT），晶体液 500ml 快速输注（30 分钟内），随后根据 CVP、尿量调整输液速度，维持尿量>0.5ml/kg/h',
        evidence: '2024 ACG 急性胰腺炎指南 #3.1; 中国 AP 诊疗指南 #2.3'
      },
      {
        title: '营养支持',
        content: '早期肠内营养（24-48h 内），鼻空肠管喂养，起始速度 20ml/h，逐步增加至目标热量 25-30kcal/kg/d',
        evidence: 'ESPEN 重症营养指南 #5.2; AGA 临床指南 #4.1'
      },
      {
        title: '药物治疗',
        content: '乌司他汀 20 万 U bid + 生长抑素 3mg 持续泵入；预防性抗生素（头孢曲松 2g qd）仅限合并感染高危患者',
        evidence: '中国 AP 药物治疗专家共识 #1.4; WGO 指南 #3.5'
      },
      {
        title: '并发症防治',
        content: '密切监测腹腔间隔室综合征（IAP>12mmHg 预警）；预防性抗凝（低分子肝素 4000IU qd）；器官功能支持',
        evidence: '2024 ACG 指南 #6.2; 中国重症 AP 诊治指南 #4.1'
      }
    ]
  },
  medium_risk: {
    subtype: '缓慢下降 - 延迟回升型',
    riskLevel: '中危',
    sections: [
      {
        title: '液体治疗',
        content: '平衡盐溶液维持，根据 CVP 调整输液速度（80-120ml/h），避免过度液体复苏',
        evidence: '2024 ACG 指南 #3.2; 中国 AP 诊疗指南 #2.4'
      },
      {
        title: '营养支持',
        content: '48h 后启动肠内营养，低脂配方，起始半量，耐受后逐步增加',
        evidence: 'ESPEN 指南 #5.3; AGA 指南 #4.2'
      },
      {
        title: '药物治疗',
        content: '乌司他汀 10 万 U bid + 胰岛素控制血糖（目标 7.8-10mmol/L）',
        evidence: '中国 AP 药物治疗共识 #1.5'
      },
      {
        title: '并发症防治',
        content: '血脂净化治疗（甘油三酯>11.3mmol/L）；监测肝功能；预防性抗凝',
        evidence: '中国高脂血症性 AP 专家共识 #2.1'
      }
    ]
  },
  low_risk: {
    subtype: '稳定 - 快速回升型',
    riskLevel: '低危',
    sections: [
      {
        title: '液体治疗',
        content: '口服补液为主，静脉补液为辅（维持量 80-100ml/h），鼓励早期经口进食',
        evidence: '2024 ACG 指南 #3.3; 中国 AP 诊疗指南 #2.5'
      },
      {
        title: '营养支持',
        content: '24h 后恢复经口进食，低脂流质→半流质→普食，循序渐进',
        evidence: 'AGA 指南 #4.3'
      },
      {
        title: '药物治疗',
        content: 'PPI 抑酸（泮托拉唑 40mg bid）+ 补充电解质（钾、镁、磷）',
        evidence: '中国 AP 药物治疗共识 #1.6'
      },
      {
        title: '并发症防治',
        content: '戒酒教育；监测血糖；3 天后复查腹部超声',
        evidence: '酒精性 AP 诊治共识 #3.1'
      }
    ]
  }
};

export default function TechnologySection({ lang }: TechnologySectionProps) {
  const [activeSection, setActiveSection] = useState('lctm');
  const [lctmParams, setLctmParams] = useState({
    initial: 38,
    maxDrop: 15,
    minTime: 24
  });
  const [selectedSubtype, setSelectedSubtype] = useState<number | null>(null);
  const [showLctmModal, setShowLctmModal] = useState(false);
  const [showFederatedModal, setShowFederatedModal] = useState(false);
  const [showFaceModal, setShowFaceModal] = useState(false);
  const [showLlmModal, setShowLlmModal] = useState(false);
  const [selectedLlmPlan, setSelectedLlmPlan] = useState<'high_risk' | 'medium_risk' | 'low_risk'>('high_risk');
  const [showCooperationForm, setShowCooperationForm] = useState(false);
  const [cooperationForm, setCooperationForm] = useState({
    hospital: '',
    province: '',
    department: '',
    contact: '',
    position: '',
    phone: '',
    email: ''
  });

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleLctmParamChange = (param: string, value: number) => {
    setLctmParams(prev => ({ ...prev, [param]: value }));
  };

  const generateLctmPreview = () => {
    const { initial, maxDrop, minTime } = lctmParams;
    return [
      { time: '0h', value: initial },
      { time: '6h', value: initial - maxDrop * 0.3 },
      { time: '12h', value: initial - maxDrop * 0.5 },
      { time: '24h', value: initial - maxDrop * 0.8 },
      { time: '48h', value: initial - maxDrop + 2 },
      { time: '72h', value: initial - maxDrop + 5 },
    ];
  };

  const getSubtypeFromParams = () => {
    const { initial, maxDrop } = lctmParams;
    if (maxDrop >= 12) return lctmSubtypes[0];
    if (maxDrop >= 6) return lctmSubtypes[1];
    return lctmSubtypes[2];
  };

  const handleCooperationSubmit = () => {
    alert('申请已收到，我们将在 1 个工作日内与您对接合作细节');
    setShowCooperationForm(false);
  };

  return (
    <section id="technology" className="py-20 md:py-28 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* 标题区域 */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0066CC] mb-3">
            四大核心技术，构建 AP 精准诊疗全闭环
          </h2>
          <p className="text-base text-gray-500 max-w-3xl mx-auto">
            从动态生物标志物分型、隐私安全多中心训练、多模态超早期预警到循证方案生成，全链条技术创新
          </p>
        </div>

        {/* 全局导航锚点 */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => scrollToSection('lctm')}
            className={`px-5 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2 text-sm ${
              activeSection === 'lctm'
                ? 'bg-[#0066CC] text-white shadow-medium'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            LCTM 分型技术
          </button>
          <button
            onClick={() => scrollToSection('federated')}
            className={`px-5 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2 text-sm ${
              activeSection === 'federated'
                ? 'bg-[#0066CC] text-white shadow-medium'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            <Shield className="w-4 h-4" />
            联邦学习架构
          </button>
          <button
            onClick={() => scrollToSection('face')}
            className={`px-5 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2 text-sm ${
              activeSection === 'face'
                ? 'bg-[#0066CC] text-white shadow-medium'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            <Camera className="w-4 h-4" />
            人脸炎症识别
          </button>
          <button
            onClick={() => scrollToSection('llm')}
            className={`px-5 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2 text-sm ${
              activeSection === 'llm'
                ? 'bg-[#0066CC] text-white shadow-medium'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            LLM 循证方案
          </button>
        </div>

        {/* 子板块 3.1: LCTM 分型技术 */}
        <div id="lctm" className="mb-16 md:mb-20 scroll-mt-24">
          <div className="bg-white rounded-xl shadow-soft overflow-hidden">
            <div className="bg-gradient-to-r from-[#0066CC] to-[#004C99] p-5 text-white">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-7 h-7" />
                <h3 className="text-lg font-bold text-white">动态心率轨迹 LCTM 分型技术</h3>
              </div>
              <p className="text-xs opacity-90">潜在类别轨迹模型 · 72h 动态监测 · 精准风险分层</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 p-8">
              {/* 左栏：文案 */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Info className="w-5 h-5 text-[#0066CC]" />
                    技术核心原理
                  </h4>
                  <p className="text-gray-700 leading-relaxed-plus">
                    采用<span className="font-semibold text-[#0066CC]">潜在类别轨迹模型（LCTM）</span>，对患者入院 72h 内 6 个关键时间节点（0h/6h/12h/24h/48h/72h）的心率时间序列数据进行无监督聚类拟合，识别出具有显著预后差异的特征轨迹亚型，精准量化患者全身炎症反应强度、毛细血管渗漏程度与疾病进展趋势。
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">典型轨迹亚型与临床意义</h4>
                  <div className="space-y-3">
                    {lctmSubtypes.map((subtype, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                          selectedSubtype === index
                            ? 'border-[#0066CC] bg-[#E6F2FF]'
                            : 'border-gray-200 hover:border-[#0066CC]/50'
                        }`}
                        onMouseEnter={() => setSelectedSubtype(index)}
                        onMouseLeave={() => setSelectedSubtype(null)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-semibold text-gray-900">{subtype.name}</p>
                            <p className="text-sm text-gray-600 mt-1">{subtype.description}</p>
                          </div>
                          <span className={`text-xs px-3 py-1 rounded-full font-bold whitespace-nowrap ${subtype.riskColor}`}>
                            {subtype.riskLevel}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700">{subtype.clinicalSignificance}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#E6F2FF] rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">分型核心优势</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-[#0066CC] flex-shrink-0 mt-0.5" />
                      <span>比传统单次心率检测提前<span className="font-semibold">24-48h</span>识别高危患者</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-[#0066CC] flex-shrink-0 mt-0.5" />
                      <span>对重症 AP 的预测效能较瞬时值提升<span className="font-semibold">32%</span></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-[#0066CC] flex-shrink-0 mt-0.5" />
                      <span>与 AP 诊疗指南专家分层结果一致性<span className="font-semibold">Cohen's kappa≥0.75</span></span>
                    </li>
                  </ul>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowLctmModal(true)}
                    className="flex-1 py-3 border-2 border-[#0066CC] text-[#0066CC] rounded-lg hover:bg-[#E6F2FF] transition-colors font-medium"
                  >
                    查看完整亚型研究数据
                  </button>
                  <button
                    onClick={() => scrollToSection('demo')}
                    className="flex-1 py-3 bg-[#0066CC] hover:bg-[#004C99] text-white rounded-lg transition-colors font-medium"
                  >
                    体验全流程分型演示
                  </button>
                </div>
              </div>

              {/* 右栏：视觉 */}
              <div className="space-y-6">
                {/* 主视觉：3 种典型亚型动态轨迹曲线图 */}
                <div className="bg-[#F5F7FA] rounded-lg p-8">
                  <h4 className="font-semibold text-gray-900 mb-4">3 种典型亚型动态轨迹曲线</h4>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart data={lctmTrajectoryData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                        <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                        <YAxis domain={[20, 45]} tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <ReferenceLine y={35} stroke="#999" strokeDasharray="3 3" label={{ value: '正常下限', fontSize: 10 }} />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="high_risk"
                          name="快速下降 - 持续低蛋白型（极高危）"
                          stroke="#DC3545"
                          strokeWidth={3}
                          dot={{ fill: '#DC3545', r: 5 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="medium_risk"
                          name="缓慢下降 - 延迟回升型（中危）"
                          stroke="#FF8C00"
                          strokeWidth={3}
                          dot={{ fill: '#FF8C00', r: 5 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="low_risk"
                          name="稳定 - 快速回升型（低危）"
                          stroke="#28A745"
                          strokeWidth={3}
                          dot={{ fill: '#28A745', r: 5 }}
                        />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* 辅助视觉：LCTM 模型工作原理流程图 */}
                <div className="bg-[#F5F7FA] rounded-lg p-8">
                  <h4 className="font-semibold text-gray-900 mb-4">LCTM 模型工作原理</h4>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex-1 bg-white rounded-lg p-4 text-center border-2 border-[#0066CC]">
                      <Database className="w-8 h-8 text-[#0066CC] mx-auto mb-2" />
                      <p className="text-xs font-medium text-gray-900">多时间点心率<br/>时序数据输入</p>
                    </div>
                    <ArrowRight className="w-6 h-6 text-gray-400" />
                    <div className="flex-1 bg-white rounded-lg p-4 text-center border-2 border-[#0066CC]">
                      <Activity className="w-8 h-8 text-[#0066CC] mx-auto mb-2" />
                      <p className="text-xs font-medium text-gray-900">时序特征工程<br/>与标准化</p>
                    </div>
                    <ArrowRight className="w-6 h-6 text-gray-400" />
                    <div className="flex-1 bg-white rounded-lg p-4 text-center border-2 border-[#0066CC]">
                      <Brain className="w-8 h-8 text-[#0066CC] mx-auto mb-2" />
                      <p className="text-xs font-medium text-gray-900">LCTM 模型拟合<br/>与优度检验</p>
                    </div>
                    <ArrowRight className="w-6 h-6 text-gray-400" />
                    <div className="flex-1 bg-white rounded-lg p-4 text-center border-2 border-[#0066CC]">
                      <TrendingUp className="w-8 h-8 text-[#0066CC] mx-auto mb-2" />
                      <p className="text-xs font-medium text-gray-900">亚型标签 +<br/>转归概率输出</p>
                    </div>
                  </div>
                </div>

                {/* 核心交互式分型演示模块 */}
                <div className="bg-[#E6F2FF] rounded-lg p-8">
                  <h4 className="font-semibold text-gray-900 mb-4">分型演示</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        入院初始心率值：{lctmParams.initial} bpm
                      </label>
                      <input
                        type="range"
                        min="50"
                        max="130"
                        value={lctmParams.initial}
                        onChange={(e) => handleLctmParamChange('initial', parseInt(e.target.value))}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        72h 最大波动幅度：{lctmParams.maxDrop} bpm
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="50"
                        value={lctmParams.maxDrop}
                        onChange={(e) => handleLctmParamChange('maxDrop', parseInt(e.target.value))}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        峰值出现时间：{lctmParams.minTime} h
                      </label>
                      <input
                        type="range"
                        min="6"
                        max="72"
                        value={lctmParams.minTime}
                        onChange={(e) => handleLctmParamChange('minTime', parseInt(e.target.value))}
                        className="w-full"
                      />
                    </div>
                    <div className="h-40 bg-white rounded-lg p-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsLineChart data={generateLctmPreview()}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                          <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                          <YAxis domain={[50, 150]} tick={{ fontSize: 10 }} />
                          <Tooltip />
                          <ReferenceLine y={100} stroke="#999" strokeDasharray="3 3" />
                          <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#0066CC"
                            strokeWidth={2}
                            dot={{ fill: '#0066CC', r: 3 }}
                          />
                        </RechartsLineChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className={`px-3 py-2 rounded-lg font-bold ${getSubtypeFromParams().riskColor}`}>
                        匹配亚型：{getSubtypeFromParams().name}
                      </div>
                      <button
                        onClick={() => setLctmParams({ initial: 85, maxDrop: 20, minTime: 24 })}
                        className="text-[#0066CC] hover:underline text-sm font-medium"
                      >
                        重置参数
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 子板块 3.2: 联邦学习架构 */}
        <div id="federated" className="mb-32 scroll-mt-24">
          <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
            <div className="bg-gradient-to-r from-[#0066CC] to-[#004C99] p-6 text-white">
              <div className="flex items-center gap-3 mb-2">
                <Shield className="w-8 h-8" />
                <h3 className="text-lg font-bold text-white">横向联邦学习隐私安全训练架构</h3>
              </div>
              <p className="text-sm opacity-90">数据不出院 · 隐私零风险 · 模型共建共享</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 p-8">
              {/* 左栏：文案 */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Lock className="w-5 h-5 text-[#0066CC]" />
                    技术核心原理
                  </h4>
                  <p className="text-gray-700 leading-relaxed-plus">
                    采用<span className="font-semibold text-[#0066CC]">「横向联邦学习 + 同态加密 + 差分隐私」</span>三重隐私保护技术，搭建「中心协调服务器 + 多中心本地客户端」的分布式训练架构。<span className="font-semibold">原始数据 100% 留存医院本地，不出院、不流转、不共享</span>，仅加密后的模型梯度参数在中心服务器完成安全聚合。
                  </p>
                </div>

                <div className="bg-[#E6F2FF] rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">架构核心优势</h4>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-[#0066CC] flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold">隐私合规零风险：</span>原始数据全程不出本地，通过国家网络安全等级保护三级认证
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-[#0066CC] flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold">模型泛化性显著提升：</span>多中心验证显示，联邦全局模型的预测效能较单中心模型<span className="font-semibold">提升≥5%</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-[#0066CC] flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold">协作成本大幅降低：</span>无需多中心数据流转，模型迭代效率提升<span className="font-semibold">40% 以上</span>
                      </div>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Users className="w-5 h-5 text-[#0066CC]" />
                    合作网络现状
                  </h4>
                  <p className="text-gray-700 leading-relaxed-plus">
                    已联合国内<span className="font-semibold">3 家顶级三甲医院</span>消化内科/ICU 完成首期联邦训练与模型验证，现开放招募全国二甲及以上医院消化内科、ICU、急诊科加入联邦学习网络。
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowFederatedModal(true)}
                    className="flex-1 py-3 border-2 border-[#0066CC] text-[#0066CC] rounded-lg hover:bg-[#E6F2FF] transition-colors font-medium"
                  >
                    查看联邦学习合规白皮书
                  </button>
                  <button
                    onClick={() => setShowCooperationForm(true)}
                    className="flex-1 py-3 bg-[#0066CC] hover:bg-[#004C99] text-white rounded-lg transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    申请加入联邦学习网络
                  </button>
                </div>
              </div>

              {/* 右栏：视觉 */}
              <div className="space-y-6">
                {/* 核心主视觉：联邦学习架构拓扑图 */}
                <div className="bg-[#F5F7FA] rounded-lg p-8">
                  <h4 className="font-semibold text-gray-900 mb-4">联邦学习架构拓扑图</h4>
                  <div className="space-y-4">
                    {/* 上层：3 个医院节点 */}
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { name: '北京协和医院', samples: 1200 },
                        { name: '上海瑞金医院', samples: 980 },
                        { name: '华西医院', samples: 1150 },
                      ].map((hospital, index) => (
                        <div
                          key={index}
                          className="bg-white rounded-lg p-3 border-2 border-[#0066CC] text-center relative shadow-sm hover:shadow-md transition-all"
                        >
                          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
                            <div className="bg-white rounded-full p-1 border-2 border-[#0066CC]">
                              <Lock className="w-4 h-4 text-[#0066CC]" />
                            </div>
                          </div>
                          <Users className="w-6 h-6 text-[#0066CC] mx-auto mb-2 mt-1" />
                          <p className="text-xs font-bold text-gray-900 leading-tight mb-1">{hospital.name}</p>
                          <p className="text-[10px] text-gray-500">本地训练客户端</p>
                          <p className="text-[10px] text-gray-500">入组样本：{hospital.samples} 例</p>
                          <div className="mt-2 bg-[#EDF5F1] text-[#7DAF9C] text-[10px] font-medium px-2 py-1 rounded-full inline-block">
                            原始数据不出院
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* 中层：连接线 */}
                    <div className="relative h-12 flex items-center justify-center">
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 50" preserveAspectRatio="none">
                        <line x1="50" y1="0" x2="150" y2="50" stroke="#0066CC" strokeWidth="2" strokeDasharray="5,5" opacity="0.3" />
                        <line x1="150" y1="0" x2="150" y2="50" stroke="#0066CC" strokeWidth="2" strokeDasharray="5,5" opacity="0.3" />
                        <line x1="250" y1="0" x2="150" y2="50" stroke="#0066CC" strokeWidth="2" strokeDasharray="5,5" opacity="0.3" />
                      </svg>
                    </div>
                    
                    {/* 下层：中心服务器 */}
                    <div className="flex justify-center">
                      <div className="bg-[#0066CC] text-white rounded-xl p-4 shadow-large text-center min-w-[180px]">
                        <Server className="w-10 h-10 mx-auto mb-2" />
                        <p className="text-xs font-bold">全局模型协调服务器</p>
                        <p className="text-xs opacity-80 mt-1">加密参数聚合</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 辅助视觉：模型性能对比柱状图 */}
                <div className="bg-[#F5F7FA] rounded-lg p-8">
                  <h4 className="font-semibold text-gray-900 mb-4">模型性能对比</h4>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart data={federatedPerformanceData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                        <XAxis dataKey="metric" tick={{ fontSize: 10 }} angle={-15} textAnchor="end" height={60} />
                        <YAxis domain={[0, 1]} tick={{ fontSize: 10 }} />
                        <Tooltip />
                        <Legend />
                        <Bar name="单中心模型" fill="#9CA3AF" />
                        <Bar name="联邦全局模型" fill="#0066CC" />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 子板块 3.3: 人脸炎症识别 */}
        <div id="face" className="mb-32 scroll-mt-24">
          <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
            <div className="bg-gradient-to-r from-[#0066CC] to-[#004C99] p-6 text-white">
              <div className="flex items-center gap-3 mb-2">
                <Camera className="w-8 h-8" />
                <h3 className="text-lg font-bold text-white">基于 Med-ViT 的人脸炎症早期识别模型</h3>
              </div>
              <p className="text-sm opacity-90">无创 · 超早期 · 6h 内预警</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 p-8">
              {/* 左栏：文案 */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Info className="w-5 h-5 text-[#0066CC]" />
                    技术核心原理
                  </h4>
                  <p className="text-gray-700 leading-relaxed-plus">
                    采用医疗领域专项微调的<span className="font-semibold text-[#0066CC]">Medical Vision Transformer（Med-ViT）</span>模型，自动提取患者入院面部图像中的多维度炎症相关特征，包括眶周/面部黄疸、面部软组织水肿、疼痛相关微表情、红外热像面部温度分布，同时融合入院 6h 内的基础临床指标。
                  </p>
                </div>

                <div className="bg-[#E6F2FF] rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">预测核心优势</h4>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-[#0066CC] flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold">预警时间大幅提前：</span>入院 6h 内仅需 1 张面部照片 + 基础临床指标，比传统 APACHE Ⅱ、BISAP 评分的有效预测时间<span className="font-semibold">提前 18-42h</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-[#0066CC] flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold">预测效能优异：</span>重症预测<span className="font-semibold">AUC-ROC≥0.85</span>，对黄疸、水肿等早期炎症体征的识别准确率≥92%
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-[#0066CC] flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold">临床适配性强：</span>操作无创、便捷、可重复监测，适配急诊、普通病房、ICU 等多场景
                      </div>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() => setShowFaceModal(true)}
                  className="w-full py-3 border-2 border-[#0066CC] text-[#0066CC] rounded-lg hover:bg-[#E6F2FF] transition-colors font-medium"
                >
                  查看完整预测流程示例
                </button>
              </div>

              {/* 右栏：视觉 */}
              <div className="space-y-6">
                {/* 核心主视觉：Grad-CAM 热力可视化对比图 */}
                <div className="bg-[#F5F7FA] rounded-lg p-8">
                  <h4 className="font-semibold text-gray-900 mb-4">模型特征提取 Grad-CAM 热力图</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 text-center">
                      <div className="aspect-square bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                        <User className="w-16 h-16 text-gray-400" />
                      </div>
                      <p className="text-sm font-medium text-gray-900">原始面部照片</p>
                      <p className="text-xs text-gray-500 mt-1">入院 6h 拍摄</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 text-center">
                      <div className="aspect-square bg-gradient-to-br from-red-500 via-yellow-500 to-transparent rounded-lg mb-3 flex items-center justify-center relative">
                        <User className="w-16 h-16 text-white relative z-10" />
                        <div className="absolute inset-0 bg-red-500/30 rounded-lg"></div>
                      </div>
                      <p className="text-sm font-medium text-gray-900">Grad-CAM 热力图</p>
                      <p className="text-xs text-gray-500 mt-1">红色高亮为模型关注区域</p>
                    </div>
                  </div>
                  <div className="mt-4 bg-white rounded-lg p-4">
                    <p className="text-xs font-medium text-gray-900 mb-2">模型核心关注区域：</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-[#F5E6E6] text-[#C76B6B] text-xs rounded">眶周黄疸</span>
                      <span className="px-2 py-1 bg-[#F5E6E6] text-[#C76B6B] text-xs rounded">面部水肿</span>
                      <span className="px-2 py-1 bg-[#F5E6E6] text-[#C76B6B] text-xs rounded">鼻唇沟变浅（疼痛表情）</span>
                      <span className="px-2 py-1 bg-[#F5E6E6] text-[#C76B6B] text-xs rounded">面部温度分布</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-3">
                      模型核心关注区域与临床炎症体征高度吻合，具备完整的临床可解释性
                    </p>
                  </div>
                </div>

                {/* 辅助视觉：ROC 曲线对比图 */}
                <div className="bg-[#F5F7FA] rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">预测性能 ROC 曲线对比</h4>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart data={rocData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                        <XAxis dataKey="fpr" tick={{ fontSize: 10 }} label={{ value: '1-特异度', position: 'insideBottom', offset: -5 }} />
                        <YAxis tick={{ fontSize: 10 }} label={{ value: '灵敏度', angle: -90, position: 'insideLeft' }} />
                        <Tooltip />
                        <Legend />
                        <ReferenceLine y={0.8} stroke="#999" strokeDasharray="3 3" />
                        <Line
                          type="monotone"
                          dataKey="tpr_joint"
                          name="人脸特征 + 临床指标联合模型 (AUC=0.85)"
                          stroke="#DC3545"
                          strokeWidth={3}
                          dot={false}
                        />
                        <Line
                          type="monotone"
                          dataKey="tpr_clinical"
                          name="仅临床指标模型 (AUC=0.76)"
                          stroke="#FF8C00"
                          strokeWidth={3}
                          dot={false}
                        />
                        <Line
                          type="monotone"
                          dataKey="tpr_bisap"
                          name="传统 BISAP 评分 (AUC=0.72)"
                          stroke="#9CA3AF"
                          strokeWidth={3}
                          dot={false}
                        />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 子板块 3.4: LLM 循证方案 */}
        <div id="llm" className="mb-32 scroll-mt-24">
          <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
            <div className="bg-gradient-to-r from-[#0066CC] to-[#004C99] p-6 text-white">
              <div className="flex items-center gap-3 mb-2">
                <FileText className="w-8 h-8" />
                <h3 className="text-lg font-bold text-white">医学微调 LLM 循证个性化方案生成引擎</h3>
              </div>
              <p className="text-sm opacity-90">DeepSeek-V3-Med 专项微调 · RAG 检索增强 · 全链路循证可溯源</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 p-8">
              {/* 左栏：文案 */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-[#0066CC]" />
                    技术核心原理
                  </h4>
                  <p className="text-gray-700 leading-relaxed-plus">
                    基于<span className="font-semibold text-[#0066CC]">DeepSeek-V3-Med 医学大模型</span>进行 AP 专项微调，搭建<span className="font-semibold text-[#0066CC]">定制化 RAG 检索增强知识库</span>，深度整合《中国急性胰腺炎诊疗指南（2024 版）》、AGA/WGO 国际指南、近 5 年 AP 领域顶级循证文献。
                  </p>
                </div>

                <div className="bg-[#E6F2FF] rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">方案核心优势</h4>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-[#0066CC] flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold">全链路循证可溯源：</span>每一条诊疗推荐均标注明确的指南条款/文献来源，支持一键查看原文
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-[#0066CC] flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold">强个性化适配：</span>基于患者的 LCTM 亚型、重症风险等级、基础疾病，生成专属方案，告别"一刀切"
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-[#0066CC] flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold">高临床接受度：</span>多中心临床盲评验证，方案评分<span className="font-semibold">≥8 分（满分 10 分）</span>，90% 以上医生认为可直接参考
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowLlmModal(true)}
                    className="flex-1 py-3 border-2 border-[#0066CC] text-[#0066CC] rounded-lg hover:bg-[#E6F2FF] transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    下载示例方案 PDF
                  </button>
                  <button
                    onClick={() => scrollToSection('demo')}
                    className="flex-1 py-3 bg-[#0066CC] hover:bg-[#004C99] text-white rounded-lg transition-colors font-medium"
                  >
                    体验方案生成演示
                  </button>
                </div>
              </div>

              {/* 右栏：视觉 */}
              <div className="space-y-6">
                {/* 核心主视觉：LLM 方案生成全流程闭环示意图 */}
                <div className="bg-[#F5F7FA] rounded-lg p-8">
                  <h4 className="font-semibold text-gray-900 mb-4">LLM 循证方案生成流程</h4>
                  <div className="space-y-3">
                    {[
                      { icon: TrendingUp, title: 'LCTM 亚型标签 +\n患者临床数据输入', color: '#0066CC' },
                      { icon: Database, title: 'RAG 知识库\n精准检索', color: '#0066CC' },
                      { icon: Brain, title: '医学 LLM\n推理生成', color: '#0066CC' },
                      { icon: FileText, title: '结构化循证\n诊疗方案输出', color: '#0066CC' },
                      { icon: CheckCircle, title: '医生审核\n修改', color: '#28A745' },
                      { icon: Activity, title: '临床应用与\n效果反馈', color: '#28A745' },
                      { icon: LineChart, title: '模型迭代\n优化', color: '#28A745' },
                    ].map((step, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: step.color + '20' }}
                        >
                          <step.icon className="w-6 h-6" style={{ color: step.color }} />
                        </div>
                        <ArrowRight className="w-6 h-6 text-gray-400 flex-shrink-0" />
                        <div className="bg-white rounded-lg p-3 flex-1 border-2" style={{ borderColor: step.color }}>
                          <p className="text-xs font-medium text-gray-900 whitespace-pre-line">{step.title}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 辅助视觉：方案生成演示 */}
                <div className="bg-[#E6F2FF] rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">方案生成演示</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        选择 LCTM 亚型
                      </label>
                      <select
                        value={selectedLlmPlan}
                        onChange={(e) => setSelectedLlmPlan(e.target.value as typeof selectedLlmPlan)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
                      >
                        <option value="high_risk">快速下降 - 持续低蛋白型（极高危）</option>
                        <option value="medium_risk">缓慢下降 - 延迟回升型（中危）</option>
                        <option value="low_risk">稳定 - 快速回升型（低危）</option>
                      </select>
                    </div>
                    <div className="bg-white rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <h5 className="font-semibold text-gray-900">{llmTreatmentPlans[selectedLlmPlan].subtype}</h5>
                        <span className={`text-xs px-3 py-1 rounded-full font-bold ${
                          selectedLlmPlan === 'high_risk' ? 'bg-red-100 text-red-700' :
                          selectedLlmPlan === 'medium_risk' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {llmTreatmentPlans[selectedLlmPlan].riskLevel}
                        </span>
                      </div>
                      {llmTreatmentPlans[selectedLlmPlan].sections.slice(0, 2).map((section, index) => (
                        <div key={index} className="border-t border-gray-200 pt-3">
                          <p className="text-sm font-semibold text-gray-900 mb-1">{section.title}</p>
                          <p className="text-sm text-gray-700">{section.content}</p>
                          <button className="text-xs text-[#0066CC] underline mt-2">
                            循证依据：{section.evidence}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LCTM 数据模态框 */}
        {showLctmModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-large max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">LCTM 亚型完整研究数据</h3>
                <button onClick={() => setShowLctmModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">模型拟合优度指标</h4>
                  <div className="bg-[#F5F7FA] rounded-lg p-4 grid grid-cols-3 gap-6">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">BIC</p>
                      <p className="text-2xl font-bold text-[#0066CC]">-12458.3</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">AIC</p>
                      <p className="text-2xl font-bold text-[#0066CC]">-12389.7</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">平均后验概率</p>
                      <p className="text-2xl font-bold text-[#0066CC]">0.94</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">多中心验证数据</h4>
                  <p className="text-sm text-gray-700 mb-3">
                    纳入 3 家三甲医院共 2,847 例 AP 患者，其中重症 AP 523 例（18.4%）。LCTM 分型对重症 AP 的预测 AUC-ROC 为 0.87（95%CI: 0.84-0.90），敏感性 82.3%，特异性 85.6%。
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">亚型预后差异</h4>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p>• 快速下降 - 持续低蛋白型：重症转化率 67.8%，器官衰竭发生率 54.2%，死亡率 12.3%</p>
                    <p>• 缓慢下降 - 延迟回升型：重症转化率 28.5%，器官衰竭发生率 15.7%，死亡率 3.2%</p>
                    <p>• 稳定 - 快速回升型：重症转化率 5.4%，器官衰竭发生率 2.1%，死亡率 0.3%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 联邦学习合作申请表单 */}
        {showCooperationForm && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-large max-w-2xl w-full">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">申请加入联邦学习网络</h3>
                <button onClick={() => setShowCooperationForm(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">医院名称 *</label>
                    <input
                      type="text"
                      value={cooperationForm.hospital}
                      onChange={(e) => setCooperationForm(prev => ({ ...prev, hospital: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
                      placeholder="请输入医院全称"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">所在省市 *</label>
                    <input
                      type="text"
                      value={cooperationForm.province}
                      onChange={(e) => setCooperationForm(prev => ({ ...prev, province: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
                      placeholder="例：北京市海淀区"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">合作科室 *</label>
                  <select
                    value={cooperationForm.department}
                    onChange={(e) => setCooperationForm(prev => ({ ...prev, department: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
                  >
                    <option value="">请选择科室</option>
                    <option value="消化内科">消化内科</option>
                    <option value="ICU">ICU</option>
                    <option value="急诊科">急诊科</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">联系人姓名 *</label>
                    <input
                      type="text"
                      value={cooperationForm.contact}
                      onChange={(e) => setCooperationForm(prev => ({ ...prev, contact: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">职务 *</label>
                    <input
                      type="text"
                      value={cooperationForm.position}
                      onChange={(e) => setCooperationForm(prev => ({ ...prev, position: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">联系电话 *</label>
                    <input
                      type="tel"
                      value={cooperationForm.phone}
                      onChange={(e) => setCooperationForm(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">邮箱 *</label>
                    <input
                      type="email"
                      value={cooperationForm.email}
                      onChange={(e) => setCooperationForm(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
                    />
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setShowCooperationForm(false)}
                    className="flex-1 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    取消
                  </button>
                  <button
                    onClick={handleCooperationSubmit}
                    className="flex-1 py-3 bg-[#0066CC] hover:bg-[#004C99] text-white rounded-lg transition-colors font-medium"
                  >
                    提交申请
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 人脸预测流程模态框 */}
        {showFaceModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-large max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">完整预测流程示例</h3>
                <button onClick={() => setShowFaceModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#F5F7FA] rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">步骤 1：入院 6h 数据</h4>
                    <div className="aspect-square bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                      <User className="w-16 h-16 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-700">面部照片 + 基础临床指标</p>
                  </div>
                  <div className="bg-[#F5F7FA] rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">步骤 2：Grad-CAM 热力图</h4>
                    <div className="aspect-square bg-gradient-to-br from-red-500 via-yellow-500 to-transparent rounded-lg flex items-center justify-center relative">
                      <User className="w-16 h-16 text-white relative z-10" />
                    </div>
                    <p className="text-sm text-gray-700">特征提取与可视化</p>
                  </div>
                </div>
                <div className="bg-[#F5F7FA] rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">步骤 3：重症风险预测结果</h4>
                  <div className="flex items-center gap-4">
                    <span className="px-4 py-2 bg-[#F5E6E6] text-[#C76B6B] rounded-lg font-bold">极高危</span>
                    <span className="text-gray-700">预测概率：87%</span>
                    <span className="text-gray-700">AUC-ROC：0.85</span>
                  </div>
                </div>
                <div className="bg-[#F5F7FA] rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">步骤 4：临床转归验证</h4>
                  <p className="text-sm text-gray-700">
                    该患者于入院 48h 后进展为重症 AP，合并急性呼吸窘迫综合征（ARDS）与急性肾损伤（AKI），经 ICU 多学科救治后好转出院。模型预测与临床实际转归高度一致。
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* LLM 方案模态框 */}
        {showLlmModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-large max-w-3xl w-full">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">示例方案 PDF 下载</h3>
                <button onClick={() => setShowLlmModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="p-6 text-center">
                <FileText className="w-16 h-16 text-[#0066CC] mx-auto mb-4" />
                <p className="text-gray-700 mb-6">
                  正在生成示例方案 PDF 文件，请稍候...
                </p>
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => {
                      alert('正在下载：PancreaAgent-AI_循证诊疗方案示例.pdf');
                      setShowLlmModal(false);
                    }}
                    className="px-6 py-3 bg-[#0066CC] hover:bg-[#004C99] text-white rounded-lg font-medium"
                  >
                    确认下载
                  </button>
                  <button
                    onClick={() => setShowLlmModal(false)}
                    className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    取消
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
