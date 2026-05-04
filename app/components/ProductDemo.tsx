'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Activity,
  Heart,
  Brain,
  FileText,
  Download,
  Printer,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowRight,
  Upload,
  Eye,
  TrendingUp,
  Users,
  Camera,
  Hospital,
  Search,
  Monitor,
  Stethoscope,
  Shield,
  ChevronDown,
  X,
  CheckCircle2,
  ScanFace
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';

interface ProductDemoProps {
  lang: 'en' | 'zh';
}

const sampleTrajectoryData = [
  { time: '入院时', hr: 85 },
  { time: '6h', hr: 95 },
  { time: '12h', hr: 105 },
  { time: '24h', hr: 115 },
  { time: '48h', hr: 125 },
  { time: '72h', hr: 130 },
];

const hospitals = [
  { name: '南昌大学第一附属医院', system: 'HIS 系统', connected: true },
  { name: '南昌市高新区人民医院', system: 'EMR 系统', connected: false },
  { name: '广州市第一人民医院', system: 'PACS 系统', connected: false },
];

const patients = [
  { name: '张三', subtype: 'T4型低升型', risk: 'high' },
  { name: '李四', subtype: 'T3型中高波动型', risk: 'medium' },
  { name: '王五', subtype: 'T1型低稳定型', risk: 'low' },
];

const sampleReport = {
  patient: { name: '张三', age: '68岁', gender: '男', id: 'AP-2024-001' },
  admitTime: '2024-01-15 08:30',
  cause: '胆源性',
  vitals: 'T 38.5°C, P 105 次/分, R 22 次/分, BP 95/60mmHg',
  subtype: 'T4型低升型',
  severity: '极高危',
  riskScore: 0.87,
  riskLevel: '重症SAP',
  recommendations: [
    { title: '液体治疗', content: '立即启动目标导向液体治疗（GDFT），晶体液500ml快速输注', guide: '2024 ACG 急性胰腺炎指南 #3.1' },
    { title: '营养支持', content: '早期肠内营养（24-48h内），鼻空肠管喂养', guide: '2024 ACG 急性胰腺炎指南 #3.2' },
    { title: '药物治疗', content: '乌司他丁 20万U bid + 生长抑素持续泵入', guide: '2024 ACG 急性胰腺炎指南 #3.3' },
    { title: '并发症防治', content: '预防性抗生素（头孢曲松 2g qd），密切监测腹腔间隔室综合征', guide: '2024 ACG 急性胰腺炎指南 #3.4' }
  ],
  monitoring: [
    '每2小时监测生命体征、尿量',
    '每6小时复查血常规、生化、血气分析',
    '每日床旁超声评估腹腔积液',
    '预警指标：MAP<65mmHg、尿量<0.5ml/kg/h、乳酸>2mmol/L'
  ],
  outcomes: {
    hospitalStay: '-2.3天',
    cost: '-25.6%',
    mortality: '-38.2%'
  }
};

export default function ProductDemo({ lang }: ProductDemoProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [heartRateInput, setHeartRateInput] = useState('85, 95, 105, 115, 125, 130');

  const trajectoryData = sampleTrajectoryData.map((d, i) => ({
    ...d,
    hr: parseInt(heartRateInput.split(',')[i]?.trim()) || d.hr
  }));

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowReport(true);
    }, 2000);
  };

  const handleReset = () => {
    setShowReport(false);
    setHeartRateInput('85, 95, 105, 115, 125, 130');
  };

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'high':
        return <span className="px-2 py-0.5 bg-rose-100 text-rose-600 text-xs rounded-full">{lang === 'zh' ? '高危' : 'High'}</span>;
      case 'medium':
        return <span className="px-2 py-0.5 bg-amber-100 text-amber-600 text-xs rounded-full">{lang === 'zh' ? '中危' : 'Medium'}</span>;
      case 'low':
        return <span className="px-2 py-0.5 bg-emerald-100 text-emerald-600 text-xs rounded-full">{lang === 'zh' ? '低危' : 'Low'}</span>;
      default:
        return null;
    }
  };

  return (
    <section id="demo" className="py-20 md:py-28 bg-gradient-to-b from-bg-primary to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {lang === 'zh' ? '临床诊疗界面' : 'Clinical Interface'}
          </h2>
          <p className="text-base text-text-secondary max-w-2xl mx-auto">
            {lang === 'zh'
              ? 'PancreaScan-AI 临床智能诊疗系统 V1.0'
              : 'PancreaScan-AI Clinical Intelligent Diagnosis System V1.0'}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-accent/20 overflow-hidden">
          <div className="bg-gradient-to-r from-primary to-primary-light px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Activity className="w-6 h-6 text-white" />
                <div>
                  <span className="text-white font-bold text-lg">PancreaScan-AI</span>
                  <span className="text-white/70 text-sm ml-2">V1.0</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button className="bg-accent hover:bg-primary-light text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                  <span className="text-lg">+</span>
                  {lang === 'zh' ? '连接系统' : 'Connect System'}
                </button>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-0">
            {/* Left Panel - Hospital Connections & Patient List */}
            <div className="lg:col-span-3 border-r border-accent/20 bg-bg-primary p-4">
              <div className="space-y-3 mb-6">
                {hospitals.map((hospital, index) => (
                  <div key={index} className={`rounded-xl p-3 border ${hospital.connected ? 'bg-accent/10 border-accent/30' : 'bg-white border-accent/10'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-primary">{hospital.name}</span>
                      {hospital.connected ? (
                        <CheckCircle2 className="w-4 h-4 text-accent" />
                      ) : (
                        <X className="w-4 h-4 text-primary/30" />
                      )}
                    </div>
                    <div className="text-xs text-primary/60 mb-2">{hospital.system}</div>
                    <div className="text-xs text-accent mb-2">{hospital.connected ? (lang === 'zh' ? '已连接' : 'Connected') : (lang === 'zh' ? '未连接' : 'Not Connected')}</div>
                    <button className={`w-full py-1.5 rounded-lg text-xs font-medium transition-colors ${hospital.connected ? 'bg-accent text-white hover:bg-primary' : 'bg-bg-secondary text-primary/60 hover:bg-accent/10'}`}>
                      {hospital.connected ? (lang === 'zh' ? '获取病历' : 'Get Records') : (lang === 'zh' ? '连接' : 'Connect')}
                    </button>
                  </div>
                ))}
              </div>

              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40" />
                <input
                  type="text"
                  placeholder={lang === 'zh' ? '输入患者姓名/ID 搜索' : 'Search patient name/ID'}
                  className="w-full pl-9 pr-3 py-2 bg-white border border-accent/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div className="space-y-2">
                {patients.map((patient, index) => (
                  <div
                    key={index}
                    className={`rounded-lg p-3 cursor-pointer transition-colors ${index === 0 ? 'bg-accent/10 border border-accent/30' : 'bg-white border border-accent/10 hover:bg-accent/5'}`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-semibold text-primary">{patient.name}</div>
                        <div className="text-xs text-primary/60">{patient.subtype}</div>
                      </div>
                      {getRiskBadge(patient.risk)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Middle Panel - Analysis Tools */}
            <div className="lg:col-span-5 p-6">
              <div className="mb-6">
                <h3 className="text-base font-bold text-primary mb-4 flex items-center gap-2">
                  <span className="w-8 h-0.5 bg-accent"></span>
                  {lang === 'zh' ? '分析工具' : 'Analysis Tools'}
                </h3>
              </div>

              {/* Facial Analysis */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-primary/80 mb-3 flex items-center gap-2">
                  <Camera className="w-4 h-4 text-accent" />
                  {lang === 'zh' ? '面部分析' : 'Facial Analysis'}
                </h4>
                <div className="border-2 border-dashed border-accent/30 rounded-xl p-6 bg-accent/5 text-center">
                  <div className="w-24 h-24 mx-auto bg-bg-secondary rounded-lg flex items-center justify-center mb-3">
                    <Camera className="w-10 h-10 text-primary/30" />
                  </div>
                  <div className="text-sm text-primary/70 mb-2">{lang === 'zh' ? '已上传面部图片' : 'Face image uploaded'}</div>
                  <button className="text-accent text-xs font-medium hover:underline">
                    {lang === 'zh' ? '重新选择' : 'Re-select'}
                  </button>
                </div>
              </div>

              {/* Heart Rate Trajectory Analysis */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-primary/80 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-accent" />
                  {lang === 'zh' ? '心率动态轨迹分析' : 'Heart Rate Dynamic Trajectory Analysis'}
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-primary/60 mb-1 block">{lang === 'zh' ? '心率参考范围（bpm）' : 'HR Reference Range (bpm)'}</label>
                    <input
                      type="text"
                      defaultValue="60-100"
                      className="w-full px-3 py-2 border border-accent/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-primary/60 mb-1 block">{lang === 'zh' ? '多时间点心率值输入框' : 'Multi-timepoint HR Values'}</label>
                    <textarea
                      value={heartRateInput}
                      onChange={(e) => setHeartRateInput(e.target.value)}
                      className="w-full px-3 py-2 border border-accent/20 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-accent"
                      rows={2}
                    />
                  </div>
                </div>
              </div>

              {/* Trajectory Preview */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-primary/80 mb-3">{lang === 'zh' ? '轨迹预览' : 'Trajectory Preview'}</h4>
                <div className="bg-bg-secondary rounded-xl p-4">
                  <ResponsiveContainer width="100%" height={140}>
                    <LineChart data={trajectoryData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e6f2ff" />
                      <XAxis dataKey="time" stroke="#0A2540" fontSize={10} />
                      <YAxis stroke="#0A2540" fontSize={10} domain={[20, 130]} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #e6f2ff',
                          borderRadius: '8px',
                          fontSize: 12
                        }}
                      />
                      <ReferenceLine y={100} stroke="#F59E0B" strokeDasharray="5 5" />
                      <Line type="monotone" dataKey="hr" stroke="#3B82F6" strokeWidth={2} dot={{ r: 4, fill: '#3B82F6' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Upload Face Photo */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-primary/80 mb-3 flex items-center gap-2">
                  <ScanFace className="w-4 h-4 text-accent" />
                  {lang === 'zh' ? '人脸照片上传' : 'Face Photo Upload'}
                </h4>
                <div className="border-2 border-dashed border-accent/30 rounded-xl p-6 bg-accent/5 text-center">
                  <ScanFace className="w-10 h-10 text-primary/30 mx-auto mb-2" />
                  <div className="text-sm text-primary/70 mb-3">{lang === 'zh' ? '从病历系统抓取生命体征数据，仅需上传人脸照片即可完成分析' : 'Vital signs auto-collected from EMR, just upload face photo'}</div>
                  <button className="bg-accent hover:bg-primary-light text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    {lang === 'zh' ? '上传人脸照片' : 'Upload Face Photo'}
                  </button>
                </div>
              </div>

              {/* Execute Analysis Button */}
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="w-full bg-gradient-to-r from-primary to-primary-light text-white py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isAnalyzing ? (
                  <>
                    <Activity className="w-5 h-5 animate-spin" />
                    {lang === 'zh' ? '分析中...' : 'Analyzing...'}
                  </>
                ) : (
                  <>
                    <Brain className="w-5 h-5" />
                    {lang === 'zh' ? '执行分析' : 'Execute Analysis'}
                  </>
                )}
              </button>
            </div>

            {/* Right Panel - Diagnosis Report */}
            <div className="lg:col-span-4 border-l border-accent/20 bg-bg-primary p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-bold text-primary">
                  {lang === 'zh' ? '诊断报告' : 'Diagnosis Report'}
                </h3>
                <div className="flex items-center gap-2">
                  <Download className="w-4 h-4 text-primary/40 cursor-pointer hover:text-accent" />
                  <Printer className="w-4 h-4 text-primary/40 cursor-pointer hover:text-accent" />
                </div>
              </div>

              {!showReport ? (
                <div className="text-center py-12 text-primary/30">
                  <FileText className="w-16 h-16 mx-auto mb-4" />
                  <p className="text-sm">{lang === 'zh' ? '点击"执行分析"生成报告' : 'Click "Execute Analysis" to generate report'}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Patient Basic Info */}
                  <div className="bg-accent/10 rounded-xl p-4 border border-accent/20">
                    <h4 className="text-sm font-semibold text-primary mb-3 flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      {lang === 'zh' ? '患者基本信息' : 'Patient Info'}
                    </h4>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-primary/60">{lang === 'zh' ? '姓名' : 'Name'}:</span>
                        <span className="text-primary font-medium">{sampleReport.patient.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-primary/60">{lang === 'zh' ? '性别' : 'Gender'}:</span>
                        <span className="text-primary font-medium">{sampleReport.patient.gender}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-primary/60">{lang === 'zh' ? '年龄' : 'Age'}:</span>
                        <span className="text-primary font-medium">{sampleReport.patient.age}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-primary/60">{lang === 'zh' ? '入院时间' : 'Admit Time'}:</span>
                        <span className="text-primary font-medium">{sampleReport.admitTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-primary/60">{lang === 'zh' ? '病因' : 'Cause'}:</span>
                        <span className="text-primary font-medium">{sampleReport.cause}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-primary/60">{lang === 'zh' ? '生命体征' : 'Vitals'}:</span>
                        <span className="text-primary font-medium">{sampleReport.vitals}</span>
                      </div>
                    </div>
                  </div>

                  {/* GBTM Subtype */}
                  <div className="bg-accent/10 rounded-xl p-4 border border-accent/20">
                    <h4 className="text-sm font-semibold text-primary mb-3 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      {lang === 'zh' ? 'GBTM 临床亚型' : 'GBTM Clinical Subtype'}
                    </h4>
                    <div className="text-sm font-medium text-primary mb-3">{sampleReport.subtype}</div>
                    <div className="bg-white rounded-lg p-3">
                      <ResponsiveContainer width="100%" height={100}>
                        <LineChart data={trajectoryData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e6f2ff" />
                          <XAxis dataKey="time" stroke="#0A2540" fontSize={9} />
                          <YAxis stroke="#0A2540" fontSize={9} domain={[50, 150]} />
                          <Line type="monotone" dataKey="hr" stroke="#3B82F6" strokeWidth={2} dot={{ r: 3, fill: '#3B82F6' }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="text-xs text-primary/60 mt-2">
                      {lang === 'zh' ? '关键特征：入院72小时内心率呈上升趋势，最低值85 bpm，最高值130 bpm' : 'Key feature: HR shows upward trend within 72h, min 85 bpm, max 130 bpm'}
                    </div>
                  </div>

                  {/* Risk Prediction */}
                  <div className="bg-accent/10 rounded-xl p-4 border border-accent/20">
                    <h4 className="text-sm font-semibold text-primary mb-3 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      {lang === 'zh' ? '重症风险预测' : 'Severe Risk Prediction'}
                    </h4>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-highlight/10 text-highlight text-sm font-bold rounded-full">{sampleReport.severity}</span>
                      <span className="text-xs text-primary/60">{lang === 'zh' ? '预测概率' : 'Prediction'}: {sampleReport.riskScore * 100}%</span>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-highlight/20">
                      <div className="text-xs font-semibold text-highlight mb-1">{lang === 'zh' ? '预警建议' : 'Warning'}</div>
                      <div className="text-xs text-slate-600">{lang === 'zh' ? '立即转入ICU，启动多学科会诊，每2小时监测生命体征' : 'Transfer to ICU immediately, start MDT consultation, monitor vitals every 2h'}</div>
                    </div>
                  </div>

                  {/* Evidence-based Treatment */}
                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                    <h4 className="text-sm font-semibold text-blue-800 mb-3 flex items-center gap-2">
                      <Stethoscope className="w-4 h-4" />
                      {lang === 'zh' ? '循证诊疗方案' : 'Evidence-based Treatment'}
                    </h4>
                    <div className="space-y-2">
                      {sampleReport.recommendations.map((rec, index) => (
                        <div key={index} className="bg-white rounded-lg p-3 border border-blue-100">
                          <div className="text-xs font-semibold text-blue-700 mb-1">{rec.title}</div>
                          <div className="text-xs text-slate-600 mb-1">{rec.content}</div>
                          <div className="text-xs text-blue-500">
                            {lang === 'zh' ? '循证依据' : 'Evidence'}: {rec.guide}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Monitoring Suggestions */}
                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                    <h4 className="text-sm font-semibold text-blue-800 mb-3 flex items-center gap-2">
                      <Monitor className="w-4 h-4" />
                      {lang === 'zh' ? '监测建议' : 'Monitoring Suggestions'}
                    </h4>
                    <div className="space-y-2">
                      {sampleReport.monitoring.map((item, index) => (
                        <div key={index} className="flex items-start gap-2 text-xs text-slate-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
