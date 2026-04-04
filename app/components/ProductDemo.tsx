'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Camera, 
  Activity, 
  Download, 
  Printer, 
  Search, 
  Plus,
  CheckCircle,
  XCircle,
  FileText,
  Brain,
  TrendingUp,
  AlertTriangle,
  ClipboardList,
  Eye,
  X
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

interface ProductDemoProps {
  lang: 'en' | 'zh';
}

interface HospitalSystem {
  id: number;
  name: string;
  type: 'HIS' | 'EMR' | 'PACS';
  connected: boolean;
}

interface Patient {
  id: number;
  name: string;
  type: string;
  riskLevel: 'high' | 'medium' | 'low';
  data: PatientData;
}

interface PatientData {
  basicInfo: {
    name: string;
    gender: string;
    age: string;
    admissionTime: string;
    cause: string;
    vitalSigns: string;
  };
  heartRateData: number[];
  trajectoryType: string;
  riskLevel: string;
  riskProbability: number;
  treatmentPlan: string[];
  monitoringPlan: string[];
}

const hospitalSystems: HospitalSystem[] = [
  { id: 1, name: '北京协和医院', type: 'HIS', connected: true },
  { id: 2, name: '上海瑞金医院', type: 'EMR', connected: false },
  { id: 3, name: '华西医院', type: 'PACS', connected: false },
];

const patients: Patient[] = [
  {
    id: 1,
    name: '张三',
    type: '快速下降 - 持续低蛋白型',
    riskLevel: 'high',
    data: {
      basicInfo: {
        name: '张三',
        gender: '男',
        age: '68 岁',
        admissionTime: '2024-01-15 08:30',
        cause: '胆源性',
        vitalSigns: 'T 38.5℃, P 105 次/分，R 22 次/分，BP 95/60mmHg'
      },
      heartRateData: [85, 95, 105, 115, 125, 130],
      trajectoryType: '快速上升 - 持续心动过速型',
      riskLevel: '极高危',
      riskProbability: 0.87,
      treatmentPlan: [
        '液体治疗：立即启动目标导向液体治疗（GDFT），晶体液 500ml 快速输注',
        '营养支持：早期肠内营养（24-48h 内），鼻空肠管喂养',
        '药物治疗：乌司他汀 20 万 U bid + 生长抑素持续泵入',
        '并发症防治：预防性抗生素（头孢曲松 2g qd），密切监测腹腔间隔室综合征'
      ],
      monitoringPlan: [
        '每 2 小时监测生命体征、尿量',
        '每 6 小时复查血常规、生化、血气分析',
        '每日床旁超声评估腹腔积液',
        '预警指标：MAP<65mmHg、尿量<0.5ml/kg/h、乳酸>2mmol/L'
      ]
    }
  },
  {
    id: 2,
    name: '李四',
    type: '缓慢下降 - 延迟回升型',
    riskLevel: 'medium',
    data: {
      basicInfo: {
        name: '李四',
        gender: '女',
        age: '55 岁',
        admissionTime: '2024-01-16 10:15',
        cause: '高脂血症性',
        vitalSigns: 'T 37.8℃, P 92 次/分，R 20 次/分，BP 110/70mmHg'
      },
      heartRateData: [85, 88, 95, 100, 95, 90],
      trajectoryType: '缓慢上升 - 延迟回落型',
      riskLevel: '中危',
      riskProbability: 0.45,
      treatmentPlan: [
        '液体治疗：平衡盐溶液维持，根据 CVP 调整输液速度',
        '营养支持：48h 后启动肠内营养，低脂配方',
        '药物治疗：乌司他汀 10 万 U bid + 胰岛素控制血糖',
        '并发症防治：血脂净化治疗，监测肝功能'
      ],
      monitoringPlan: [
        '每 4 小时监测生命体征',
        '每 12 小时复查血常规、生化',
        '每日监测血脂、肝功能',
        '预警指标：WBC>16×10⁹/L、Cr 进行性升高'
      ]
    }
  },
  {
    id: 3,
    name: '王五',
    type: '稳定 - 快速回升型',
    riskLevel: 'low',
    data: {
      basicInfo: {
        name: '王五',
        gender: '男',
        age: '42 岁',
        admissionTime: '2024-01-17 14:20',
        cause: '酒精性',
        vitalSigns: 'T 37.2℃, P 85 次/分，R 18 次/分，BP 125/80mmHg'
      },
      heartRateData: [85, 82, 80, 78, 75, 72],
      trajectoryType: '稳定 - 快速回落型',
      riskLevel: '低危',
      riskProbability: 0.12,
      treatmentPlan: [
        '液体治疗：口服补液为主，静脉补液为辅',
        '营养支持：24h 后恢复经口进食，低脂流质',
        '药物治疗：PPI 抑酸 + 补充电解质',
        '并发症防治：戒酒教育，监测血糖'
      ],
      monitoringPlan: [
        '每 8 小时监测生命体征',
        '每日复查血常规、生化',
        '3 天后复查腹部超声',
        '预警指标：腹痛加重、发热>38.5℃'
      ]
    }
  }
];

const heartRateTimePoints = ['入院时', '6h', '12h', '24h', '48h', '72h'];

export default function ProductDemo({ lang }: ProductDemoProps) {
  const [selectedHospital, setSelectedHospital] = useState<HospitalSystem | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);
  const [heartRateInput, setHeartRateInput] = useState<string>('');
  const [heartRateData, setHeartRateData] = useState<number[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [showDataModal, setShowDataModal] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);
  const [heartRateRange, setHeartRateRange] = useState('60-100');

  const pullRecordBtnRef = useRef<HTMLButtonElement>(null);
  const analyzeBtnRef = useRef<HTMLButtonElement>(null);
  const reportSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTutorial(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handlePullRecords = (hospital: HospitalSystem) => {
    setSelectedHospital(hospital);
    setSelectedPatient(patients[0]);
    setHeartRateData(patients[0].data.heartRateData);
    setHeartRateInput(patients[0].data.heartRateData.join(', '));
  };

  const handleSelectPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setHeartRateData(patient.data.heartRateData);
    setHeartRateInput(patient.data.heartRateData.join(', '));
  };

  const handlePhotoUpload = () => {
    setUploadedPhoto('/example-face.jpg');
    setShowPhotoModal(false);
  };

  const handleDataUpload = (exampleData: number[]) => {
    setHeartRateData(exampleData);
    setHeartRateInput(exampleData.join(', '));
    setShowDataModal(false);
  };

  const handleManualInput = (value: string) => {
    setHeartRateInput(value);
    const values = value.split(',').map(v => parseFloat(v.trim())).filter(v => !isNaN(v));
    if (values.length > 0) {
      setHeartRateData(values);
    }
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
    }, 2000);
  };

  const handleDownloadReport = () => {
    alert(`正在下载：PancreaAgent-AI_诊断报告_${selectedPatient?.data.basicInfo.name || '患者'}.pdf`);
  };

  const handlePrintReport = () => {
    window.print();
  };

  const nextTutorialStep = () => {
    if (tutorialStep < 2) {
      setTutorialStep(tutorialStep + 1);
    } else {
      setShowTutorial(false);
    }
  };

  const getTutorialHighlight = () => {
    switch (tutorialStep) {
      case 0:
        return pullRecordBtnRef.current?.getBoundingClientRect() || { top: 0, left: 0, width: 0, height: 0 };
      case 1:
        return analyzeBtnRef.current?.getBoundingClientRect() || { top: 0, left: 0, width: 0, height: 0 };
      case 2:
        return reportSectionRef.current?.getBoundingClientRect() || { top: 0, left: 0, width: 0, height: 0 };
      default:
        return { top: 0, left: 0, width: 0, height: 0 };
    }
  };

  const getTutorialContent = () => {
    switch (tutorialStep) {
      case 0:
        return {
          title: '第一步：拉取病历',
          description: '点击左侧「拉取病历」按钮，获取预设患者病历数据',
          position: 'left'
        };
      case 1:
        return {
          title: '第二步：执行分析',
          description: '点击中间「执行分析」按钮，AI 将自动完成分型与风险预测',
          position: 'center'
        };
      case 2:
        return {
          title: '第三步：查看报告',
          description: '右侧将展示完整的结构化诊断报告与循证治疗方案',
          position: 'right'
        };
      default:
        return { title: '', description: '', position: 'center' };
    }
  };

  const generateChartData = () => {
    return heartRateData.map((value, index) => ({
      time: heartRateTimePoints[index] || `${index * 6}h`,
      value: value
    }));
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case '极高危': return 'text-[#C76B6B] bg-[#F5E6E6]';
      case '高危': return 'text-[#D4A574] bg-[#FDF5EE]';
      case '中危': return 'text-[#9DB4C0] bg-[#F0F4F5]';
      case '低危': return 'text-[#7DAF9C] bg-[#EDF5F1]';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <section id="product-demo" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* 标题区域 */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#0066CC] mb-4">
            1:1 还原临床操作界面，沉浸式体验全流程诊疗辅助
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            模拟临床医生真实工作流，无需部署即可体验从病历对接、数据分析到报告生成的完整功能
          </p>
        </div>

        {/* 核心功能说明 */}
        <div className="bg-white rounded-2xl shadow-soft p-8 mb-12">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#0066CC]/10 rounded-lg">
              <Activity className="w-8 h-8 text-[#0066CC]" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">核心功能说明</h3>
              <p className="text-gray-600 leading-relaxed">
                本演示界面完整还原 <span className="font-semibold text-[#0066CC]">PancreaAgent-AI™</span> 的临床应用工作台，支持医院 HIS/EMR/PACS 系统对接、多模态数据上传、自动化分型分析、循证诊断报告生成四大核心能力，让您直观感受产品如何融入真实临床工作流，提升诊疗效率与精准度。
              </p>
            </div>
          </div>
        </div>

        {/* 三栏式布局 */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
          {/* 左侧栏：医院病历系统 - 30% */}
          <div className="lg:col-span-3 bg-white rounded-2xl shadow-soft overflow-hidden">
            {/* 品牌标识 */}
            <div className="bg-gradient-to-r from-[#0066CC] to-[#004C99] p-6 text-white text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Activity className="w-6 h-6" />
                <span className="text-lg font-bold">PancreaAgent-AI™</span>
              </div>
              <p className="text-sm opacity-90">V1.0</p>
            </div>

            {/* 核心功能区 */}
            <div className="p-6 space-y-4">
              <button
                ref={pullRecordBtnRef}
                className="w-full bg-[#0066CC] hover:bg-[#004C99] text-white py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
                onClick={() => handlePullRecords(hospitalSystems[0])}
              >
                <Plus className="w-5 h-5" />
                连接系统
              </button>

              <div className="space-y-3">
                {hospitalSystems.map((hospital) => (
                  <div
                    key={hospital.id}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedHospital?.id === hospital.id
                        ? 'border-[#0066CC] bg-[#E6F2FF]'
                        : 'border-gray-200 hover:border-[#0066CC]/50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">{hospital.name}</h4>
                        <p className="text-sm text-gray-500">{hospital.type} 系统</p>
                      </div>
                      {hospital.connected ? (
                        <CheckCircle className="w-5 h-5 text-[#7DAF9C]" />
                      ) : (
                        <XCircle className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    <div className="text-sm mb-2">
                      <span className={`px-2 py-1 rounded ${
                        hospital.connected ? 'bg-[#EDF5F1] text-[#7DAF9C]' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {hospital.connected ? '已连接' : '未连接'}
                      </span>
                    </div>
                    {hospital.connected ? (
                      <button
                        className="w-full bg-[#0066CC] hover:bg-[#004C99] text-white py-2 px-3 rounded text-sm transition-all"
                        onClick={() => handlePullRecords(hospital)}
                      >
                        拉取病历
                      </button>
                    ) : (
                      <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-600 py-2 px-3 rounded text-sm transition-all">
                        连接
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 底部功能区 */}
            <div className="p-6 border-t border-gray-200 space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="输入患者姓名/ID 搜索"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>

              <div className="space-y-2">
                {patients.map((patient) => (
                  <div
                    key={patient.id}
                    className={`p-3 rounded-lg cursor-pointer transition-all ${
                      selectedPatient?.id === patient.id
                        ? 'bg-[#E6F2FF] border-2 border-[#0066CC]'
                        : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                    }`}
                    onClick={() => handleSelectPatient(patient)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{patient.name}</p>
                        <p className="text-xs text-gray-500">{patient.type}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${
                        patient.riskLevel === 'high' ? 'bg-[#F5E6E6] text-[#C76B6B]' :
                        patient.riskLevel === 'medium' ? 'bg-[#F0F4F5] text-[#9DB4C0]' :
                        'bg-[#EDF5F1] text-[#7DAF9C]'
                      }`}>
                        {patient.riskLevel === 'high' ? '高危' :
                         patient.riskLevel === 'medium' ? '中危' : '低危'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 中间栏：核心分析工具 - 40% */}
          <div className="lg:col-span-4 bg-white rounded-2xl shadow-soft overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-[#0066CC] mb-2">分析工具</h3>
              <div className="h-1 w-20 bg-[#0066CC]/20 rounded"></div>
            </div>

            <div className="p-6 space-y-6">
              {/* 面部分析 */}
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Camera className="w-5 h-5 text-[#0066CC]" />
                  面部分析
                </h4>
                {uploadedPhoto ? (
                  <div className="border-2 border-dashed border-[#0066CC] rounded-lg p-6 text-center bg-[#E6F2FF]">
                    <div className="w-32 h-32 mx-auto bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                      <Camera className="w-12 h-12 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-600 mb-3">已上传面部照片</p>
                    <button
                      className="text-[#0066CC] hover:underline text-sm"
                      onClick={() => setShowPhotoModal(true)}
                    >
                      重新选择
                    </button>
                  </div>
                ) : (
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#0066CC] transition-colors cursor-pointer"
                    onClick={() => setShowPhotoModal(true)}
                  >
                    <Camera className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600 mb-3">上传面部照片</p>
                    <button className="bg-[#0066CC] hover:bg-[#004C99] text-white py-2 px-6 rounded-lg transition-all">
                      上传照片
                    </button>
                  </div>
                )}
              </div>

              {/* 心率动态轨迹分析 */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#0066CC]" />
                  心率动态轨迹分析
                </h4>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      心率参考范围（bpm）
                    </label>
                    <input
                      type="text"
                      value={heartRateRange}
                      onChange={(e) => setHeartRateRange(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      多时间点心率值输入框
                    </label>
                    <textarea
                      value={heartRateInput}
                      onChange={(e) => handleManualInput(e.target.value)}
                      placeholder="入院时/6h/12h/24h/48h/72h 心率值（按时间顺序输入，用逗号分隔）"
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
                    />
                  </div>

                  {heartRateData.length > 0 && (
                    <div className="bg-[#E6F2FF] rounded-lg p-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">轨迹预览</p>
                      <div className="h-40">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={generateChartData()}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                            <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                            <YAxis domain={[20, 50]} tick={{ fontSize: 12 }} />
                            <Tooltip />
                            <ReferenceLine y={35} stroke="#999" strokeDasharray="3 3" />
                            <ReferenceLine y={55} stroke="#999" strokeDasharray="3 3" />
                            <Line
                              type="monotone"
                              dataKey="value"
                              stroke="#0066CC"
                              strokeWidth={2}
                              dot={{ fill: '#0066CC', r: 4 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* 心率轨迹数据上传 */}
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-[#0066CC]" />
                  心率轨迹数据上传
                </h4>
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#0066CC] transition-colors cursor-pointer"
                  onClick={() => setShowDataModal(true)}
                >
                  <Activity className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 mb-3">上传轨迹数据</p>
                  <button className="bg-[#0066CC] hover:bg-[#004C99] text-white py-2 px-6 rounded-lg transition-all">
                    上传轨迹数据
                  </button>
                </div>
              </div>

              {/* 执行分析按钮 */}
              <button
                ref={analyzeBtnRef}
                disabled={heartRateData.length === 0 || isAnalyzing}
                onClick={handleAnalyze}
                className={`w-full py-4 rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-2 ${
                  heartRateData.length === 0 || isAnalyzing
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-[#0066CC] hover:bg-[#004C99] text-white shadow-medium'
                }`}
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    正在分析...
                  </>
                ) : (
                  <>
                    <Brain className="w-6 h-6" />
                    执行分析
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 右侧栏：诊断报告 - 30% */}
          <div 
            ref={reportSectionRef}
            className="lg:col-span-3 bg-white rounded-2xl shadow-soft overflow-hidden"
          >
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl font-bold text-[#0066CC]">诊断报告</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownloadReport}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="下载报告"
                >
                  <Download className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  onClick={handlePrintReport}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="打印报告"
                >
                  <Printer className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="p-6">
              {!analysisComplete ? (
                <div className="h-[600px] flex flex-col items-center justify-center text-gray-400">
                  <Brain className="w-16 h-16 mb-4" />
                  <p className="text-lg">请执行分析以生成诊断报告</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* 1. 患者基本信息 */}
                  <div className="bg-[#E6F2FF] rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <ClipboardList className="w-5 h-5 text-[#0066CC]" />
                      <h4 className="font-semibold text-gray-900">患者基本信息</h4>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-gray-600">姓名：</span><span className="font-medium">{selectedPatient?.data.basicInfo.name}</span></p>
                      <p><span className="text-gray-600">性别：</span><span className="font-medium">{selectedPatient?.data.basicInfo.gender}</span></p>
                      <p><span className="text-gray-600">年龄：</span><span className="font-medium">{selectedPatient?.data.basicInfo.age}</span></p>
                      <p><span className="text-gray-600">入院时间：</span><span className="font-medium">{selectedPatient?.data.basicInfo.admissionTime}</span></p>
                      <p><span className="text-gray-600">病因：</span><span className="font-medium">{selectedPatient?.data.basicInfo.cause}</span></p>
                      <p><span className="text-gray-600">生命体征：</span><span className="font-medium">{selectedPatient?.data.basicInfo.vitalSigns}</span></p>
                    </div>
                  </div>

                  {/* 2. LCTM 心率轨迹亚型 */}
                  <div className="bg-[#E6F2FF] rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp className="w-5 h-5 text-[#0066CC]" />
                      <h4 className="font-semibold text-gray-900">LCTM 心率轨迹亚型</h4>
                    </div>
                    <p className="font-medium text-gray-900 mb-2">{selectedPatient?.data.trajectoryType}</p>
                    <div className="h-32 mb-2">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={generateChartData()}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                          <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                          <YAxis domain={[50, 150]} tick={{ fontSize: 10 }} />
                          <Tooltip />
                          <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#0066CC"
                            strokeWidth={2}
                            dot={{ fill: '#0066CC', r: 3 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <p className="text-sm text-gray-600">
                      关键特征：入院 72 小时内心率呈{heartRateData[0] > heartRateData[heartRateData.length - 1] ? '下降' : '上升'}趋势，
                      最低值{Math.min(...heartRateData)} bpm，最高值{Math.max(...heartRateData)} bpm
                    </p>
                  </div>

                  {/* 3. 重症风险预测 */}
                  <div className="bg-[#E6F2FF] rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="w-5 h-5 text-[#0066CC]" />
                      <h4 className="font-semibold text-gray-900">重症风险预测</h4>
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-3 py-1 rounded-full font-bold ${getRiskColor(selectedPatient?.data.riskLevel || '')}`}>
                        {selectedPatient?.data.riskLevel}
                      </span>
                      <span className="text-sm text-gray-600">
                        预测概率：{(selectedPatient?.data.riskProbability || 0) * 100}%
                      </span>
                    </div>
                    <div className="bg-white rounded p-3">
                      <p className="text-sm font-medium text-gray-900 mb-1">预警建议：</p>
                      <p className="text-sm text-gray-600">
                        {selectedPatient?.data.riskLevel === '极高危' ? '立即转入 ICU，启动多学科会诊，每 2 小时监测生命体征' :
                         selectedPatient?.data.riskLevel === '中危' ? '加强病房监测，每 4 小时评估病情变化' :
                         '常规病房监测，每日评估病情'}
                      </p>
                    </div>
                  </div>

                  {/* 4. 循证诊疗方案 */}
                  <div className="bg-[#E6F2FF] rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <FileText className="w-5 h-5 text-[#0066CC]" />
                      <h4 className="font-semibold text-gray-900">循证诊疗方案</h4>
                    </div>
                    <div className="space-y-3">
                      {selectedPatient?.data.treatmentPlan.map((plan, index) => (
                        <div key={index} className="bg-white rounded p-3">
                          <p className="text-sm text-gray-900">{plan}</p>
                          <button className="text-xs text-[#0066CC] underline mt-2">
                            循证依据：2024 ACG 急性胰腺炎指南 #3.{index + 1}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 5. 监测建议 */}
                  <div className="bg-[#E6F2FF] rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Eye className="w-5 h-5 text-[#0066CC]" />
                      <h4 className="font-semibold text-gray-900">监测建议</h4>
                    </div>
                    <div className="space-y-2">
                      {selectedPatient?.data.monitoringPlan.map((item, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-[#0066CC] mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-gray-900">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 新手引导弹窗 */}
        {showTutorial && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-large max-w-md w-full p-6 relative">
              <button
                onClick={() => setShowTutorial(false)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>

              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-[#0066CC]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-[#0066CC]">{tutorialStep + 1}/3</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {getTutorialContent().title}
                </h3>
                <p className="text-gray-600">
                  {getTutorialContent().description}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => tutorialStep > 0 ? setTutorialStep(tutorialStep - 1) : setShowTutorial(false)}
                  className="flex-1 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {tutorialStep === 0 ? '跳过引导' : '上一步'}
                </button>
                <button
                  onClick={nextTutorialStep}
                  className="flex-1 py-3 bg-[#0066CC] hover:bg-[#004C99] text-white rounded-lg transition-colors"
                >
                  {tutorialStep === 2 ? '立即体验' : '下一步'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 照片上传模态框 */}
        {showPhotoModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-large max-w-2xl w-full p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">选择面部照片</h3>
                <button
                  onClick={() => setShowPhotoModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-[#0066CC] transition-all"
                    onClick={handlePhotoUpload}
                  >
                    <Camera className="w-12 h-12 text-gray-400" />
                  </div>
                ))}
              </div>

              <p className="text-sm text-gray-500 text-center">
                点击任意示例图片完成上传
              </p>
            </div>
          </div>
        )}

        {/* 数据上传模态框 */}
        {showDataModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-large max-w-2xl w-full p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">选择轨迹数据示例</h3>
                <button
                  onClick={() => setShowDataModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                {patients.map((patient, index) => (
                  <div
                    key={patient.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-[#0066CC] cursor-pointer transition-all"
                    onClick={() => handleDataUpload(patient.data.heartRateData)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">示例 {index + 1}：{patient.type}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          数据：{patient.data.heartRateData.join(', ')} bpm
                        </p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${
                        patient.riskLevel === 'high' ? 'bg-[#F5E6E6] text-[#C76B6B]' :
                        patient.riskLevel === 'medium' ? 'bg-[#F0F4F5] text-[#9DB4C0]' :
                        'bg-[#EDF5F1] text-[#7DAF9C]'
                      }`}>
                        {patient.riskLevel === 'high' ? '高危' :
                         patient.riskLevel === 'medium' ? '中危' : '低危'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-sm text-gray-500 text-center">
                点击任意示例文件自动填充数据
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
