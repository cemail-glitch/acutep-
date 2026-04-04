'use client';

import React, { useState, useEffect } from 'react';
import {
  Activity,
  Brain,
  Heart,
  Camera,
  FileText,
  User,
  Upload,
  AlertTriangle,
  Clock,
  Stethoscope,
  Search,
  Plus,
  Save,
  Download,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Printer,
  X,
  ArrowLeft,
  RefreshCw,
  FileUp,
  FileCheck,
  FileDown,
  Settings,
  Database,
  Link,
  Unlink,
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  TrendingUp,
  TrendingDown,
  Activity as ActivityIcon,
  Calendar,
  ClipboardList,
  FilePlus,
  Printer as PrinterIcon,
  Share2,
  Copy,
  Check,
  Loader2
} from 'lucide-react';

const translations = {
  en: {
    nav: {
      home: "Home",
      clinical: "Clinical Application",
      settings: "Settings"
    },
    header: {
      title: "Clinical Application",
      subtitle: "Real-time patient analysis and diagnosis"
    },
    patient: {
      title: "Hospital Medical Record System",
      id: "Patient ID",
      name: "Name",
      gender: "Gender",
      age: "Age",
      admission: "Admission Date",
      chiefComplaint: "Chief Complaint",
      history: "Medical History",
      addPatient: "Add Patient",
      search: "Search Patient",
      hospitalSystems: "Hospital Systems",
      connectSystem: "Connect System",
      pullRecords: "Pull Records",
      recentRecords: "Recent Records"
    },
    analysis: {
      title: "Analysis Tools",
      facialAnalysis: "Facial Analysis",
      heartRate: "Heart Rate Analysis",
      heartRateTrace: "Heart Rate Trace",
      labResults: "Laboratory Results",
      imaging: "Imaging Data",
      execute: "Execute Analysis",
      loading: "Analyzing...",
      uploadTrace: "Upload Trace Data",
      traceData: "Trace Data"
    },
    report: {
      title: "Diagnostic Report",
      patientInfo: "Patient Information",
      analysisResults: "Analysis Results",
      diagnosis: "Diagnosis",
      severity: "Severity",
      confidence: "Confidence",
      recommendations: "Recommendations",
      treatment: "Treatment Plan",
      followUp: "Follow-up Plan",
      export: "Export Report",
      print: "Print Report",
      resultInterpretation: "Result Interpretation",
      treatmentNotes: "Treatment Notes",
      reportAutomation: "Report Interpretation Automation",
      courseComparison: "Course Change Comparison",
      documentStandardization: "Clinical Document Standardization",
      prognosis: "Disease Prediction",
      severityGrade: "Severity Grade",
      clinicalNotes: "Clinical Notes"
    },
    modal: {
      connectSystem: "Connect Hospital System",
      pullRecords: "Pull Medical Records",
      patientDetail: "Patient Details",
      facialUpload: "Upload Facial Photo",
      traceUpload: "Upload Heart Rate Trace",
      analysisDetail: "Analysis Details",
      exportReport: "Export Report",
      generateDocument: "Generate Clinical Document",
      close: "Close",
      confirm: "Confirm",
      cancel: "Cancel",
      loading: "Loading...",
      success: "Success",
      error: "Error"
    }
  },
  zh: {
    nav: {
      home: "首页",
      clinical: "临床应用",
      settings: "设置"
    },
    header: {
      title: "临床应用",
      subtitle: "实时患者分析与诊断"
    },
    patient: {
      title: "医院病历系统",
      id: "患者ID",
      name: "姓名",
      gender: "性别",
      age: "年龄",
      admission: "入院日期",
      chiefComplaint: "主诉",
      history: "病史",
      addPatient: "添加患者",
      search: "搜索患者",
      hospitalSystems: "医院系统",
      connectSystem: "连接系统",
      pullRecords: "拉取病历",
      recentRecords: "最近病历"
    },
    analysis: {
      title: "分析工具",
      facialAnalysis: "面部分析",
      heartRate: "心率分析",
      heartRateTrace: "心率轨迹",
      labResults: "实验室结果",
      imaging: "影像数据",
      execute: "执行分析",
      loading: "分析中...",
      uploadTrace: "上传轨迹数据",
      traceData: "轨迹数据"
    },
    report: {
      title: "诊断报告",
      patientInfo: "患者信息",
      analysisResults: "分析结果",
      diagnosis: "诊断",
      severity: "严重程度",
      confidence: "置信度",
      recommendations: "建议",
      treatment: "治疗方案",
      followUp: "随访计划",
      export: "导出报告",
      print: "打印报告",
      resultInterpretation: "结果解读",
      treatmentNotes: "治疗注意事项",
      reportAutomation: "报告解读自动化",
      courseComparison: "病程变化对比",
      documentStandardization: "临床文书标准化",
      prognosis: "病情预测",
      severityGrade: "严重程度分级",
      clinicalNotes: "临床注意事项"
    },
    modal: {
      connectSystem: "连接医院系统",
      pullRecords: "拉取病历数据",
      patientDetail: "患者详情",
      facialUpload: "上传面部照片",
      traceUpload: "上传心率轨迹",
      analysisDetail: "分析详情",
      exportReport: "导出报告",
      generateDocument: "生成临床文书",
      close: "关闭",
      confirm: "确认",
      cancel: "取消",
      loading: "加载中...",
      success: "成功",
      error: "错误"
    }
  }
};

interface Patient {
  id: string;
  name: string;
  gender: 'male' | 'female' | 'other';
  age: number;
  admissionDate: string;
  chiefComplaint: string;
  medicalHistory: string;
  bedNumber?: string;
  department?: string;
  doctor?: string;
}

interface LabResult {
  test: string;
  value: string;
  unit: string;
  reference: string;
  status: 'normal' | 'abnormal';
}

interface ImagingData {
  type: string;
  date: string;
  findings: string;
  imageUrl?: string;
}

interface AnalysisResult {
  diagnosis: string;
  severity: 'Mild' | 'Moderate' | 'Severe' | 'Critical';
  confidence: number;
  riskFactors: string[];
  recommendations: string[];
  treatmentPlan: string[];
  followUpPlan: string[];
}

interface HospitalSystem {
  id: string;
  name: string;
  type: string;
  status: 'connected' | 'disconnected';
  lastSync?: string;
}

// 模态框组件
const Modal = ({ isOpen, onClose, title, children, size = 'md' }: { 
  isOpen: boolean; 
  onClose: () => void; 
  title: string; 
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}) => {
  if (!isOpen) return null;
  
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4'
  };
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        <div className={`inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle ${sizeClasses[size]} w-full`}>
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">{title}</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <X size={20} />
              </button>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

const ClinicalPage = () => {
  const [lang, setLang] = useState<'en' | 'zh'>('zh');
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: "P2023001",
      name: "张三",
      gender: "male",
      age: 45,
      admissionDate: "2024-01-15",
      chiefComplaint: "上腹痛2天",
      medicalHistory: "胆结石病史3年，否认高血压、糖尿病",
      bedNumber: "A-101",
      department: "消化内科",
      doctor: "李医生"
    },
    {
      id: "P2023002",
      name: "李四",
      gender: "female",
      age: 52,
      admissionDate: "2024-01-16",
      chiefComplaint: "腹痛伴呕吐1天",
      medicalHistory: "高血压病史5年，规律服药",
      bedNumber: "A-102",
      department: "消化内科",
      doctor: "王医生"
    }
  ]);
  
  const [hospitalSystems, setHospitalSystems] = useState<HospitalSystem[]>([
    { id: '1', name: '北京协和医院', type: 'HIS系统', status: 'connected', lastSync: '2024-01-15 14:30' },
    { id: '2', name: '上海瑞金医院', type: 'EMR系统', status: 'disconnected' },
    { id: '3', name: '华西医院', type: 'PACS系统', status: 'disconnected' }
  ]);
  
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(patients[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [facialImage, setFacialImage] = useState<File | null>(null);
  const [heartRate, setHeartRate] = useState('');
  const [labResults, setLabResults] = useState<LabResult[]>([
    { test: "CRP", value: "120", unit: "mg/L", reference: "0-5", status: "abnormal" },
    { test: "WBC", value: "15.6", unit: "x10^9/L", reference: "4-10", status: "abnormal" },
    { test: "Amylase", value: "850", unit: "U/L", reference: "25-125", status: "abnormal" },
    { test: "Lipase", value: "1200", unit: "U/L", reference: "10-140", status: "abnormal" }
  ]);
  const [imagingData, setImagingData] = useState<ImagingData[]>([
    {
      type: "CT",
      date: "2024-01-15",
      findings: "胰腺肿胀，周围渗出"
    }
  ]);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // 模态框状态
  const [modals, setModals] = useState({
    connectSystem: false,
    pullRecords: false,
    patientDetail: false,
    facialUpload: false,
    traceUpload: false,
    analysisDetail: false,
    exportReport: false,
    generateDocument: false
  });
  
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
  const [notifications, setNotifications] = useState<{ [key: string]: string }>({});
  
  const t = translations[lang];
  
  const openModal = (modalName: keyof typeof modals) => {
    setModals(prev => ({ ...prev, [modalName]: true }));
  };
  
  const closeModal = (modalName: keyof typeof modals) => {
    setModals(prev => ({ ...prev, [modalName]: false }));
  };
  
  const handlePatientSelect = (patient: Patient) => {
    setSelectedPatient(patient);
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFacialImage(e.target.files[0]);
      showNotification('facialUpload', '照片上传成功');
    }
  };
  
  const handleConnectSystem = async (systemId: string) => {
    setLoading(prev => ({ ...prev, [`connect_${systemId}`]: true }));
    
    setTimeout(() => {
      setHospitalSystems(prev => prev.map(sys => 
        sys.id === systemId ? { ...sys, status: 'connected', lastSync: new Date().toLocaleString() } : sys
      ));
      setLoading(prev => ({ ...prev, [`connect_${systemId}`]: false }));
      showNotification('connectSystem', '系统连接成功');
      closeModal('connectSystem');
    }, 2000);
  };
  
  const handlePullRecords = async () => {
    setLoading(prev => ({ ...prev, pullRecords: true }));
    
    setTimeout(() => {
      setLoading(prev => ({ ...prev, pullRecords: false }));
      showNotification('pullRecords', '病历数据拉取成功');
      closeModal('pullRecords');
    }, 3000);
  };
  
  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const result: AnalysisResult = {
        diagnosis: "急性胰腺炎",
        severity: heartRate && parseInt(heartRate) > 120 ? "Severe" : "Moderate",
        confidence: 94.5,
        riskFactors: ["高CRP", "高WBC", "淀粉酶升高"],
        recommendations: [
          "禁食禁饮",
          "静脉补液",
          "止痛治疗",
          "密切监测生命体征"
        ],
        treatmentPlan: [
          "静脉补液：20ml/kg/小时",
          "止痛：吗啡 2-4mg IV q4-6h",
          "抗生素：如果有感染迹象",
          "营养支持：病情稳定后"
        ],
        followUpPlan: [
          "24小时复查实验室指标",
          "48小时复查CT",
          "每日临床评估",
          "出院后1周门诊随访"
        ]
      };
      setAnalysisResult(result);
      setIsAnalyzing(false);
      showNotification('analysis', '分析完成');
    }, 2000);
  };
  
  const handleExportReport = (format: 'pdf' | 'word' | 'excel') => {
    setLoading(prev => ({ ...prev, [`export_${format}`]: true }));
    
    setTimeout(() => {
      setLoading(prev => ({ ...prev, [`export_${format}`]: false }));
      showNotification('export', `报告已导出为${format.toUpperCase()}格式`);
      closeModal('exportReport');
    }, 1500);
  };
  
  const handleGenerateDocument = (type: 'admission' | 'progress') => {
    setLoading(prev => ({ ...prev, [`doc_${type}`]: true }));
    
    setTimeout(() => {
      setLoading(prev => ({ ...prev, [`doc_${type}`]: false }));
      showNotification('document', `${type === 'admission' ? '入院记录' : '病程记录'}生成成功`);
      closeModal('generateDocument');
    }, 2000);
  };

  const handlePrintReport = () => {
    setLoading(prev => ({ ...prev, print: true }));
    
    setTimeout(() => {
      setLoading(prev => ({ ...prev, print: false }));
      window.print();
      showNotification('print', '报告打印成功');
    }, 1500);
  };

  const handleNavigateToSettings = () => {
    window.location.href = '/settings';
  };
  
  const showNotification = (key: string, message: string) => {
    setNotifications(prev => ({ ...prev, [key]: message }));
    setTimeout(() => {
      setNotifications(prev => ({ ...prev, [key]: '' }));
    }, 3000);
  };
  
  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.id.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 通知提示 */}
      {Object.entries(notifications).map(([key, message]) => message && (
        <div key={key} className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg animate-fade-in">
          <div className="flex items-center">
            <CheckCircle2 className="mr-2" size={18} />
            {message}
          </div>
        </div>
      ))}
      
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2">
              <div className="bg-medical-blue p-1 rounded-lg">
                <Activity className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-medical-blue">PancreaAgent-AI<span className="text-gray-400 font-light">™</span></span>
            </div>
            <nav className="hidden md:flex space-x-8 font-medium text-gray-600">
              <a href="/" className="hover:text-medical-blue transition-colors">{t.nav.home}</a>
              <a href="/clinical" className="text-medical-blue border-b-2 border-medical-blue">{t.nav.clinical}</a>
              <button 
                onClick={handleNavigateToSettings}
                className="hover:text-medical-blue transition-colors"
              >
                {t.nav.settings}
              </button>
            </nav>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
                className="flex items-center space-x-1 text-sm text-gray-600 hover:text-medical-blue"
              >
                {lang === 'en' ? '中文' : 'English'}
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">{t.header.title}</h1>
          <p className="text-gray-600 mt-2">{t.header.subtitle}</p>
        </div>
        
        {/* Three-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left column - Hospital Medical Record System */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">{t.patient.title}</h2>
                <button 
                  onClick={() => openModal('connectSystem')}
                  className="bg-medical-blue text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 active:bg-blue-800 active:scale-95 transition-all duration-150"
                >
                  <Plus size={16} className="inline mr-1" />
                  {t.patient.connectSystem}
                </button>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">{t.patient.hospitalSystems}</h3>
                <div className="space-y-3">
                  {hospitalSystems.map(system => (
                    <div key={system.id} className="p-4 border border-gray-200 rounded-md bg-gray-50">
                      <div className="font-medium">{system.name}</div>
                      <div className="text-sm text-gray-500 mt-1">{system.type}</div>
                      <div className="flex items-center mt-2">
                        <div className={`w-2 h-2 rounded-full mr-2 ${system.status === 'connected' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <span className="text-sm text-gray-600">
                          {system.status === 'connected' ? '已连接' : '未连接'}
                        </span>
                      </div>
                      {system.status === 'connected' && (
                        <button 
                          onClick={() => openModal('pullRecords')}
                          className="mt-2 text-sm text-medical-blue hover:underline active:underline active:scale-95 transition-all duration-150"
                        >
                          {t.patient.pullRecords}
                        </button>
                      )}
                      {system.status === 'disconnected' && (
                        <button 
                          onClick={() => handleConnectSystem(system.id)}
                          className="mt-2 text-sm text-medical-blue hover:underline active:underline active:scale-95 transition-all duration-150"
                        >
                          {loading[`connect_${system.id}`] ? (
                            <><Loader2 className="inline animate-spin mr-1" size={14} />连接中...</>
                          ) : '连接'}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={t.patient.search}
                    className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-medical-blue focus:border-medical-blue"
                  />
                  <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
                </div>
              </div>
              
              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {filteredPatients.map((patient) => (
                  <div 
                    key={patient.id}
                    onClick={() => {
                      handlePatientSelect(patient);
                      openModal('patientDetail');
                    }}
                    className={`p-4 rounded-md cursor-pointer transition-all duration-150 ${selectedPatient?.id === patient.id ? 'bg-blue-50 border border-medical-blue' : 'hover:bg-gray-50 border border-transparent active:bg-gray-100 active:scale-98'}`}
                  >
                    <div className="font-medium text-gray-900">{patient.name}</div>
                    <div className="text-sm text-gray-500">{patient.id}</div>
                    <div className="text-sm text-gray-500 mt-1">
                      {patient.age}岁 | {patient.gender === 'male' ? '男' : patient.gender === 'female' ? '女' : '其他'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Middle column - Analysis Tools */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">{t.analysis.title}</h2>
              
              <div className="space-y-6">
                {/* Facial Analysis */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">{t.analysis.facialAnalysis}</h3>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    {facialImage ? (
                      <div className="flex items-center justify-center">
                        <div className="text-sm text-gray-600">
                          {facialImage.name}
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <Camera className="h-12 w-12 text-gray-400 mb-3" />
                        <p className="text-sm text-gray-500 mb-3">{lang === 'zh' ? '上传面部照片' : 'Upload facial photo'}</p>
                        <button
                          onClick={() => openModal('facialUpload')}
                          className="bg-medical-blue text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 active:bg-blue-800 active:scale-95 transition-all duration-150"
                        >
                          <Upload className="inline mr-2" size={16} />
                          {lang === 'zh' ? '上传照片' : 'Upload Photo'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Heart Rate Analysis */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">{t.analysis.heartRate}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {lang === 'zh' ? '心率 (bpm)' : 'Heart Rate (bpm)'}
                      </label>
                      <input
                        type="number"
                        value={heartRate}
                        onChange={(e) => setHeartRate(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-medical-blue focus:border-medical-blue"
                        placeholder="60-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {lang === 'zh' ? '心率状态' : 'Heart Rate Status'}
                      </label>
                      <div className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50">
                        {heartRate ? (
                          parseInt(heartRate) < 60 ? '心动过缓' :
                          parseInt(heartRate) > 100 ? '心动过速' : '正常'
                        ) : '请输入心率'}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Heart Rate Trace */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">{t.analysis.heartRateTrace}</h3>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Heart className="h-12 w-12 text-gray-400 mb-3" />
                    <p className="text-sm text-gray-500 mb-3">{t.analysis.uploadTrace}</p>
                    <button
                      onClick={() => openModal('traceUpload')}
                      className="bg-medical-blue text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 active:bg-blue-800 active:scale-95 transition-all duration-150"
                    >
                      <Upload className="inline mr-2" size={16} />
                      {lang === 'zh' ? '上传轨迹数据' : 'Upload Trace Data'}
                    </button>
                  </div>
                </div>
                
                {/* Laboratory Results */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">{t.analysis.labResults}</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{lang === 'zh' ? '检查项' : 'Test'}</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{lang === 'zh' ? '结果' : 'Result'}</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{lang === 'zh' ? '参考值' : 'Reference'}</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{lang === 'zh' ? '状态' : 'Status'}</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {labResults.map((result, index) => (
                          <tr key={index}>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{result.test}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{result.value} {result.unit}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{result.reference}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${result.status === 'normal' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {result.status === 'normal' ? (lang === 'zh' ? '正常' : 'Normal') : (lang === 'zh' ? '异常' : 'Abnormal')}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                {/* Imaging Data */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">{t.analysis.imaging}</h3>
                  <div className="space-y-3">
                    {imagingData.map((imaging, index) => (
                      <div key={index} className="p-4 border border-gray-200 rounded-md">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{imaging.type}</span>
                          <span className="text-sm text-gray-500">{imaging.date}</span>
                        </div>
                        <p className="text-sm text-gray-600">{imaging.findings}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Execute Analysis */}
                <div className="pt-4">
                  <button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className="w-full bg-medical-blue text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 active:bg-blue-800 active:scale-98 transition-all duration-150 flex items-center justify-center"
                  >
                    {isAnalyzing ? (
                      <>
                        <Clock className="animate-spin mr-2" size={18} />
                        {t.analysis.loading}
                      </>
                    ) : (
                      <>
                        <Brain className="mr-2" size={18} />
                        {t.analysis.execute}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right column - Diagnostic Report */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">{t.report.title}</h2>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => openModal('exportReport')}
                    className="p-2 text-gray-600 hover:bg-gray-100 active:bg-gray-200 active:scale-95 transition-all duration-150 rounded-md"
                  >
                    <Download size={18} />
                  </button>
                  <button 
                    onClick={handlePrintReport}
                    disabled={loading.print}
                    className="p-2 text-gray-600 hover:bg-gray-100 active:bg-gray-200 active:scale-95 transition-all duration-150 rounded-md"
                  >
                    {loading.print ? <Loader2 className="animate-spin" size={18} /> : <Printer size={18} />}
                  </button>
                </div>
              </div>
              
              {analysisResult ? (
                <div className="space-y-6">
                  {/* Patient Information */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">{t.report.patientInfo}</h3>
                    {selectedPatient && (
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">{t.patient.name}:</span>
                          <span>{selectedPatient.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">{t.patient.id}:</span>
                          <span>{selectedPatient.id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">{t.patient.age}:</span>
                          <span>{selectedPatient.age}岁</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">{t.patient.admission}:</span>
                          <span>{selectedPatient.admissionDate}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Analysis Results */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-medium text-gray-900">{t.report.analysisResults}</h3>
                      <button
                        onClick={() => openModal('analysisDetail')}
                        className="text-sm text-medical-blue hover:underline"
                      >
                        查看详情 →
                      </button>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">{t.report.diagnosis}:</span>
                          <span className="font-medium">{analysisResult.diagnosis}</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">{t.report.severity}:</span>
                          <span className={`font-medium ${analysisResult.severity === 'Severe' || analysisResult.severity === 'Critical' ? 'text-red-600' : analysisResult.severity === 'Moderate' ? 'text-amber-600' : 'text-green-600'}`}>
                            {analysisResult.severity === 'Mild' ? '轻度' :
                             analysisResult.severity === 'Moderate' ? '中度' :
                             analysisResult.severity === 'Severe' ? '重度' : '危重型'}
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">{t.report.confidence}:</span>
                          <span className="font-medium">{analysisResult.confidence}%</span>
                        </div>
                      </div>
                      <div>
                        <span className="block text-gray-600 mb-2">{lang === 'zh' ? '风险因素' : 'Risk Factors'}:</span>
                        <ul className="space-y-1">
                          {analysisResult.riskFactors.map((factor, index) => (
                            <li key={index} className="flex items-center text-sm">
                              <AlertTriangle className="h-4 w-4 text-amber-500 mr-2" />
                              <span>{factor}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  {/* Result Interpretation */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">{t.report.resultInterpretation}</h3>
                    <div className="text-sm text-gray-600">
                      <p>根据患者的临床表现、实验室检查和影像学结果，结合面部表情分析和心率数据，患者目前诊断为急性胰腺炎。</p>
                      <p className="mt-2">患者的CRP和WBC显著升高，淀粉酶和脂肪酶也明显升高，符合胰腺炎的实验室特征。面部表情分析显示患者存在中度疼痛，心率偏快，提示炎症反应活跃。</p>
                    </div>
                  </div>
                  
                  {/* Treatment Notes */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">{t.report.treatmentNotes}</h3>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-start">
                        <AlertTriangle className="h-4 w-4 text-amber-500 mr-2 mt-0.5" />
                        <span>注意补液速度，避免过度补液导致肺水肿</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="h-4 w-4 text-amber-500 mr-2 mt-0.5" />
                        <span>止痛药物应选择对胰腺无刺激的药物</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="h-4 w-4 text-amber-500 mr-2 mt-0.5" />
                        <span>密切监测呼吸功能，警惕ARDS的发生</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="h-4 w-4 text-amber-500 mr-2 mt-0.5" />
                        <span>早期肠内营养支持，维护肠道屏障功能</span>
                      </li>
                    </ul>
                  </div>
                  
                  {/* Recommendations */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">{t.report.recommendations}</h3>
                    <ul className="space-y-1">
                      {analysisResult.recommendations.map((recommendation, index) => (
                        <li key={index} className="flex items-start text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                          <span>{recommendation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Treatment Plan */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">{t.report.treatment}</h3>
                    <ul className="space-y-1">
                      {analysisResult.treatmentPlan.map((item, index) => (
                        <li key={index} className="flex items-start text-sm">
                          <Stethoscope className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Follow-up Plan */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">{t.report.followUp}</h3>
                    <ul className="space-y-1">
                      {analysisResult.followUpPlan.map((item, index) => (
                        <li key={index} className="flex items-start text-sm">
                          <Clock className="h-4 w-4 text-purple-500 mr-2 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Disease Prediction */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">{t.report.prognosis}</h3>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <div className="text-sm">
                        <div className="font-medium mb-2">病情预测</div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>恢复概率</span>
                            <span className="font-medium">85%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>并发症风险</span>
                            <span className="font-medium text-amber-600">中等</span>
                          </div>
                          <div className="flex justify-between">
                            <span>预计住院时间</span>
                            <span className="font-medium">7-10天</span>
                          </div>
                          <div className="mt-3">
                            <p>根据当前数据，患者有望在1-2周内逐渐恢复，但需要密切监测病情变化，特别是在发病后72小时内。</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Clinical Document Standardization */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">{t.report.documentStandardization}</h3>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => openModal('generateDocument')}
                        className="flex-1 bg-medical-blue text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 active:bg-blue-800 active:scale-95 transition-all duration-150"
                      >
                        生成入院记录
                      </button>
                      <button 
                        onClick={() => openModal('generateDocument')}
                        className="flex-1 bg-medical-blue text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 active:bg-blue-800 active:scale-95 transition-all duration-150"
                      >
                        生成病程记录
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Brain className="h-16 w-16 text-gray-300 mb-4" />
                  <p className="text-gray-500">{lang === 'zh' ? '请执行分析以生成诊断报告' : 'Please execute analysis to generate diagnostic report'}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-800 pt-8">
            <p className="text-gray-400 text-center">© 2025 PancreaAgent-AI 科技有限公司. 保留所有权利。</p>
          </div>
        </div>
      </footer>
      
      {/* 连接系统模态框 */}
      <Modal
        isOpen={modals.connectSystem}
        onClose={() => closeModal('connectSystem')}
        title={t.modal.connectSystem}
        size="md"
      >
        <div className="space-y-4">
          <div className="text-sm text-gray-600 mb-4">
            选择要连接的医院系统：
          </div>
          {hospitalSystems.filter(sys => sys.status === 'disconnected').map(system => (
            <div key={system.id} className="p-4 border border-gray-200 rounded-md">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">{system.name}</div>
                  <div className="text-sm text-gray-500">{system.type}</div>
                </div>
                <button
                  onClick={() => handleConnectSystem(system.id)}
                  disabled={loading[`connect_${system.id}`]}
                  className="bg-medical-blue text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading[`connect_${system.id}`] ? (
                    <><Loader2 className="inline animate-spin mr-1" size={14} />连接中...</>
                  ) : '连接'}
                </button>
              </div>
            </div>
          ))}
          {hospitalSystems.filter(sys => sys.status === 'disconnected').length === 0 && (
            <div className="text-center text-gray-500 py-4">
              所有系统已连接
            </div>
          )}
        </div>
      </Modal>
      
      {/* 拉取病历模态框 */}
      <Modal
        isOpen={modals.pullRecords}
        onClose={() => closeModal('pullRecords')}
        title={t.modal.pullRecords}
        size="lg"
      >
        <div className="space-y-4">
          <div className="text-sm text-gray-600 mb-4">
            从已连接的医院系统拉取病历数据：
          </div>
          
          {hospitalSystems.filter(sys => sys.status === 'connected').map(system => (
            <div key={system.id} className="p-4 border border-gray-200 rounded-md">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <div className="font-medium">{system.name}</div>
                  <div className="text-sm text-gray-500">{system.type}</div>
                </div>
                <div className="text-sm text-gray-500">
                  上次同步: {system.lastSync}
                </div>
              </div>
              
              <div className="mt-3 space-y-2">
                <div className="flex items-center">
                  <input type="checkbox" id={`records_${system.id}`} className="mr-2" defaultChecked />
                  <label htmlFor={`records_${system.id}`} className="text-sm">基本信息</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id={`lab_${system.id}`} className="mr-2" defaultChecked />
                  <label htmlFor={`lab_${system.id}`} className="text-sm">实验室检查</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id={`imaging_${system.id}`} className="mr-2" defaultChecked />
                  <label htmlFor={`imaging_${system.id}`} className="text-sm">影像资料</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id={`history_${system.id}`} className="mr-2" />
                  <label htmlFor={`history_${system.id}`} className="text-sm">既往病史</label>
                </div>
              </div>
            </div>
          ))}
          
          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={() => closeModal('pullRecords')}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              {t.modal.cancel}
            </button>
            <button
              onClick={handlePullRecords}
              disabled={loading.pullRecords}
              className="px-4 py-2 bg-medical-blue text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
            >
              {loading.pullRecords ? (
                <><Loader2 className="inline animate-spin mr-1" size={14} />拉取中...</>
              ) : '开始拉取'}
            </button>
          </div>
        </div>
      </Modal>
      
      {/* 患者详情模态框 */}
      <Modal
        isOpen={modals.patientDetail}
        onClose={() => closeModal('patientDetail')}
        title={t.modal.patientDetail}
        size="lg"
      >
        {selectedPatient && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">{t.patient.name}</label>
                <div className="mt-1 text-lg font-medium">{selectedPatient.name}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">{t.patient.id}</label>
                <div className="mt-1">{selectedPatient.id}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">{t.patient.gender}</label>
                <div className="mt-1">{selectedPatient.gender === 'male' ? '男' : selectedPatient.gender === 'female' ? '女' : '其他'}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">{t.patient.age}</label>
                <div className="mt-1">{selectedPatient.age}岁</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">床号</label>
                <div className="mt-1">{selectedPatient.bedNumber}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">科室</label>
                <div className="mt-1">{selectedPatient.department}</div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">{t.patient.admission}</label>
              <div className="mt-1">{selectedPatient.admissionDate}</div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">{t.patient.chiefComplaint}</label>
              <div className="mt-1 p-3 bg-gray-50 rounded-md">{selectedPatient.chiefComplaint}</div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">{t.patient.history}</label>
              <div className="mt-1 p-3 bg-gray-50 rounded-md">{selectedPatient.medicalHistory}</div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">主治医生</label>
              <div className="mt-1">{selectedPatient.doctor}</div>
            </div>
          </div>
        )}
      </Modal>
      
      {/* 面部照片上传模态框 */}
      <Modal
        isOpen={modals.facialUpload}
        onClose={() => closeModal('facialUpload')}
        title={t.modal.facialUpload}
        size="md"
      >
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Camera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">拖拽照片到此处，或点击选择文件</p>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="facial-upload-modal"
            />
            <label
              htmlFor="facial-upload-modal"
              className="bg-medical-blue text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 cursor-pointer inline-block"
            >
              <Upload className="inline mr-2" size={18} />
              选择照片
            </label>
          </div>
          
          <div className="text-sm text-gray-500">
            <p>支持格式：JPG, PNG, BMP</p>
            <p>文件大小：不超过 10MB</p>
          </div>
          
          {facialImage && (
            <div className="p-4 bg-green-50 rounded-md">
              <div className="flex items-center text-green-700">
                <CheckCircle2 className="mr-2" size={18} />
                <span>已选择: {facialImage.name}</span>
              </div>
            </div>
          )}
        </div>
      </Modal>
      
      {/* 心率轨迹上传模态框 */}
      <Modal
        isOpen={modals.traceUpload}
        onClose={() => closeModal('traceUpload')}
        title={t.modal.traceUpload}
        size="md"
      >
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">上传心率轨迹数据文件</p>
            <input
              type="file"
              accept=".csv,.json,.txt"
              className="hidden"
              id="trace-upload-modal"
            />
            <label
              htmlFor="trace-upload-modal"
              className="bg-medical-blue text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 cursor-pointer inline-block"
            >
              <Upload className="inline mr-2" size={18} />
              选择文件
            </label>
          </div>
          
          <div className="text-sm text-gray-500">
            <p>支持格式：CSV, JSON, TXT</p>
            <p>文件大小：不超过 50MB</p>
            <p className="mt-2 text-gray-400">数据格式：时间戳,心率值</p>
          </div>
        </div>
      </Modal>
      
      {/* 导出报告模态框 */}
      <Modal
        isOpen={modals.exportReport}
        onClose={() => closeModal('exportReport')}
        title={t.modal.exportReport}
        size="md"
      >
        <div className="space-y-4">
          <div className="text-sm text-gray-600 mb-4">
            选择导出格式：
          </div>
          
          <div className="space-y-3">
            <button
              onClick={() => handleExportReport('pdf')}
              disabled={loading.export_pdf}
              className="w-full p-4 border border-gray-200 rounded-md hover:bg-gray-50 flex items-center justify-between"
            >
              <div className="flex items-center">
                <FileText className="text-red-500 mr-3" size={24} />
                <div className="text-left">
                  <div className="font-medium">PDF 格式</div>
                  <div className="text-sm text-gray-500">适用于打印和存档</div>
                </div>
              </div>
              {loading.export_pdf ? <Loader2 className="animate-spin" size={20} /> : <ChevronRight size={20} />}
            </button>
            
            <button
              onClick={() => handleExportReport('word')}
              disabled={loading.export_word}
              className="w-full p-4 border border-gray-200 rounded-md hover:bg-gray-50 flex items-center justify-between"
            >
              <div className="flex items-center">
                <FileText className="text-blue-500 mr-3" size={24} />
                <div className="text-left">
                  <div className="font-medium">Word 格式</div>
                  <div className="text-sm text-gray-500">适用于编辑和修改</div>
                </div>
              </div>
              {loading.export_word ? <Loader2 className="animate-spin" size={20} /> : <ChevronRight size={20} />}
            </button>
            
            <button
              onClick={() => handleExportReport('excel')}
              disabled={loading.export_excel}
              className="w-full p-4 border border-gray-200 rounded-md hover:bg-gray-50 flex items-center justify-between"
            >
              <div className="flex items-center">
                <FileText className="text-green-500 mr-3" size={24} />
                <div className="text-left">
                  <div className="font-medium">Excel 格式</div>
                  <div className="text-sm text-gray-500">适用于数据分析</div>
                </div>
              </div>
              {loading.export_excel ? <Loader2 className="animate-spin" size={20} /> : <ChevronRight size={20} />}
            </button>
          </div>
        </div>
      </Modal>
      
      {/* 生成临床文书模态框 */}
      <Modal
        isOpen={modals.generateDocument}
        onClose={() => closeModal('generateDocument')}
        title={t.modal.generateDocument}
        size="lg"
      >
        <div className="space-y-4">
          <div className="text-sm text-gray-600 mb-4">
            选择要生成的文书类型：
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleGenerateDocument('admission')}
              disabled={loading.doc_admission}
              className="p-6 border-2 border-gray-200 rounded-lg hover:border-medical-blue hover:bg-blue-50 transition-all"
            >
              <FilePlus className="mx-auto mb-3 text-medical-blue" size={32} />
              <div className="font-medium">入院记录</div>
              <div className="text-sm text-gray-500 mt-1">生成标准入院记录</div>
              {loading.doc_admission && (
                <div className="mt-3">
                  <Loader2 className="animate-spin mx-auto" size={20} />
                </div>
              )}
            </button>
            
            <button
              onClick={() => handleGenerateDocument('progress')}
              disabled={loading.doc_progress}
              className="p-6 border-2 border-gray-200 rounded-lg hover:border-medical-blue hover:bg-blue-50 transition-all"
            >
              <ClipboardList className="mx-auto mb-3 text-medical-blue" size={32} />
              <div className="font-medium">病程记录</div>
              <div className="text-sm text-gray-500 mt-1">生成病程记录</div>
              {loading.doc_progress && (
                <div className="mt-3">
                  <Loader2 className="animate-spin mx-auto" size={20} />
                </div>
              )}
            </button>
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <h4 className="font-medium mb-2">文书预览</h4>
            <div className="text-sm text-gray-600 space-y-2">
              <p>患者：{selectedPatient?.name}</p>
              <p>诊断：{analysisResult?.diagnosis || '待分析'}</p>
              <p>生成时间：{new Date().toLocaleString()}</p>
            </div>
          </div>
        </div>
      </Modal>

      {/* 分析详情模态框 */}
      <Modal
        isOpen={modals.analysisDetail}
        onClose={() => closeModal('analysisDetail')}
        title={t.modal.analysisDetail}
        size="xl"
      >
        {analysisResult ? (
          <div className="space-y-6">
            {/* 分析概览 */}
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg text-center">
                <div className="text-sm text-gray-600 mb-1">诊断结果</div>
                <div className="text-xl font-bold text-medical-blue">{analysisResult.diagnosis}</div>
              </div>
              <div className="p-4 bg-amber-50 rounded-lg text-center">
                <div className="text-sm text-gray-600 mb-1">严重程度</div>
                <div className={`text-xl font-bold ${analysisResult.severity === 'Severe' || analysisResult.severity === 'Critical' ? 'text-red-600' : analysisResult.severity === 'Moderate' ? 'text-amber-600' : 'text-green-600'}`}>
                  {analysisResult.severity === 'Mild' ? '轻度' :
                   analysisResult.severity === 'Moderate' ? '中度' :
                   analysisResult.severity === 'Severe' ? '重度' : '危重型'}
                </div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg text-center">
                <div className="text-sm text-gray-600 mb-1">置信度</div>
                <div className="text-xl font-bold text-green-600">{analysisResult.confidence}%</div>
              </div>
            </div>

            {/* 面部特征分析 */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                <Camera className="mr-2 text-medical-blue" size={20} />
                面部特征分析
              </h4>
              <div className="p-4 bg-gray-50 rounded-md">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">疼痛表情识别：</span>
                    <span className="font-medium ml-2">{analysisResult.severity === 'Severe' || analysisResult.severity === 'Critical' ? '重度疼痛' : analysisResult.severity === 'Moderate' ? '中度疼痛' : '轻度疼痛'}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">面色分析：</span>
                    <span className="font-medium ml-2">苍白</span>
                  </div>
                  <div>
                    <span className="text-gray-600">出汗程度：</span>
                    <span className="font-medium ml-2">明显</span>
                  </div>
                  <div>
                    <span className="text-gray-600">表情痛苦指数：</span>
                    <span className="font-medium ml-2">{analysisResult.severity === 'Severe' || analysisResult.severity === 'Critical' ? '8.5/10' : analysisResult.severity === 'Moderate' ? '6.2/10' : '4.1/10'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 心率分析 */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                <Heart className="mr-2 text-red-500" size={20} />
                心率轨迹分析
              </h4>
              <div className="p-4 bg-gray-50 rounded-md">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">平均心率：</span>
                    <span className="font-medium ml-2">{heartRate || '95'} bpm</span>
                  </div>
                  <div>
                    <span className="text-gray-600">心率变异性：</span>
                    <span className="font-medium ml-2">{parseInt(heartRate || '95') > 100 ? '异常' : '正常'}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">心律状态：</span>
                    <span className="font-medium ml-2">{parseInt(heartRate || '95') > 100 ? '心动过速' : '正常窦性心律'}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">应激反应：</span>
                    <span className="font-medium ml-2">{parseInt(heartRate || '95') > 100 ? '明显' : '轻微'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 实验室指标分析 */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                <Activity className="mr-2 text-green-500" size={20} />
                实验室指标分析
              </h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">指标</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">数值</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">参考范围</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">临床意义</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 text-sm">
                    {labResults.map((result, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 font-medium">{result.test}</td>
                        <td className={`px-4 py-2 ${result.status === 'abnormal' ? 'text-red-600 font-medium' : ''}`}>
                          {result.value} {result.unit}
                        </td>
                        <td className="px-4 py-2 text-gray-500">{result.reference}</td>
                        <td className="px-4 py-2">
                          {result.test === 'CRP' && result.status === 'abnormal' && '提示急性炎症反应'}
                          {result.test === 'WBC' && result.status === 'abnormal' && '提示感染或炎症'}
                          {result.test === 'Amylase' && result.status === 'abnormal' && '胰腺炎特异性指标'}
                          {result.test === 'Lipase' && result.status === 'abnormal' && '胰腺炎特异性指标'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 综合评估 */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                <Brain className="mr-2 text-purple-500" size={20} />
                AI综合评估
              </h4>
              <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-md">
                <p className="text-sm text-gray-700 leading-relaxed">
                  基于患者的临床表现、面部特征分析、心率监测数据和实验室检查结果，AI系统综合分析认为患者目前处于
                  <span className="font-medium text-medical-blue">{analysisResult.severity === 'Mild' ? '轻度' : analysisResult.severity === 'Moderate' ? '中度' : analysisResult.severity === 'Severe' ? '重度' : '危重'}急性胰腺炎</span>
                  阶段。患者的淀粉酶和脂肪酶显著升高，符合胰腺炎的生化特征。面部疼痛表情识别显示患者存在明显疼痛，心率监测提示交感神经兴奋。建议立即采取相应的治疗措施，并密切监测病情变化。
                </p>
              </div>
            </div>

            {/* 风险因素 */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">风险因素评估</h4>
              <div className="space-y-2">
                {analysisResult.riskFactors.map((factor, index) => (
                  <div key={index} className="flex items-center p-3 bg-red-50 rounded-md">
                    <AlertTriangle className="h-5 w-5 text-red-500 mr-3" />
                    <span className="text-sm">{factor}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <button
                onClick={() => closeModal('analysisDetail')}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                {t.modal.close}
              </button>
              <button
                onClick={() => {
                  closeModal('analysisDetail');
                  openModal('exportReport');
                }}
                className="px-4 py-2 bg-medical-blue text-white rounded-md text-sm font-medium hover:bg-blue-700"
              >
                <Download className="inline mr-2" size={16} />
                导出详细报告
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Brain className="h-16 w-16 text-gray-300 mb-4" />
            <p className="text-gray-500">请先执行分析以查看详细结果</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ClinicalPage;
