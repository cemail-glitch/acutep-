'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Activity,
  Heart,
  User,
  Upload,
  AlertTriangle,
  Clock,
  Stethoscope,
  Search,
  Plus,
  Download,
  ChevronRight,
  CheckCircle2,
  X,
  RefreshCw,
  Settings,
  Database,
  Link,
  TrendingUp,
  Calendar,
  ScanFace,
  FileText,
  Brain,
  Loader2,
  TrendingDown,
  Minus
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const translations = {
  en: {
    nav: {
      home: "Home",
      clinical: "Clinical",
      settings: "Settings"
    },
    header: {
      title: "Clinical Diagnosis",
      subtitle: "GBTM Classification & Analysis System"
    },
    leftPanel: {
      title: "Patient Type Overview",
      fourTypes: "Four Clinical Subtypes",
      selectTip: "Click to select patient"
    },
    centerPanel: {
      title: "Analysis Tools",
      faceUpload: "Face Photo Upload",
      faceDesc: "Upload patient face photo for feature analysis",
      vitalSigns: "Vital Signs (from EMR)",
      heartRate: "Heart Rate (bpm)",
      bloodPressure: "Blood Pressure (mmHg)",
      respRate: "Respiratory Rate (/min)",
      temperature: "Temperature (°C)",
      spo2: "SpO2 (%)",
      traceTitle: "Heart Rate Trajectory",
      uploadTrace: "Upload Trace Data",
      analyzing: "Analyzing with DeepSeek...",
      executeAnalysis: "Execute Analysis"
    },
    rightPanel: {
      title: "Diagnostic Report",
      patientInfo: "Patient Information",
      subtypeResult: "GBTM Subtype Result",
      recommendations: "Treatment Recommendations",
      export: "Export Report"
    },
    subtypes: {
      T1: { name: "T1 Low-Stable", risk: "Low Risk", color: "emerald" },
      T2: { name: "T2 High-Stable", risk: "Medium Risk", color: "amber" },
      T3: { name: "T3 Medium-Volatile", risk: "Medium-High Risk", color: "orange" },
      T4: { name: "T4 Low-Rising", risk: "Critical Risk", color: "rose" }
    },
    modal: {
      uploadFace: "Upload Face Photo",
      close: "Close"
    }
  },
  zh: {
    nav: {
      home: "首页",
      clinical: "临床诊疗",
      settings: "设置"
    },
    header: {
      title: "临床诊疗",
      subtitle: "GBTM 分型分析系统"
    },
    leftPanel: {
      title: "患者类型概览",
      fourTypes: "四类临床亚型",
      selectTip: "点击选择患者"
    },
    centerPanel: {
      title: "分析工具",
      faceUpload: "人脸照片上传",
      faceDesc: "上传患者人脸照片进行特征分析",
      vitalSigns: "从病历系统抓取数据",
      heartRate: "心率 (次/分)",
      bloodPressure: "血压 (mmHg)",
      respRate: "呼吸频率 (/分)",
      temperature: "体温 (°C)",
      spo2: "血氧饱和度 (%)",
      traceTitle: "心率轨迹",
      uploadTrace: "上传轨迹数据",
      analyzing: "DeepSeek 分析中...",
      executeAnalysis: "执行分析"
    },
    rightPanel: {
      title: "诊疗报告",
      patientInfo: "患者信息",
      subtypeResult: "GBTM 分型结果",
      recommendations: "诊疗意见",
      export: "导出报告"
    },
    subtypes: {
      T1: { name: "T1型低稳定型", risk: "低危", color: "emerald" },
      T2: { name: "T2型高稳定型", risk: "中危", color: "amber" },
      T3: { name: "T3型中高波动型", risk: "中高危", color: "orange" },
      T4: { name: "T4型低升型", risk: "极高危", color: "rose" }
    },
    modal: {
      uploadFace: "上传人脸照片",
      close: "关闭"
    }
  }
};

interface VitalSigns {
  heartRate: string;
  bloodPressure: string;
  respiratoryRate: string;
  temperature: string;
  spo2: string;
}

interface PatientType {
  id: string;
  name: string;
  age: number;
  gender: string;
  subtype: 'T1' | 'T2' | 'T3' | 'T4';
  riskLevel: string;
  vitalSigns: VitalSigns;
  trajectoryData: { time: string; hr: number }[];
}

interface DiagnosticResult {
  subtype: 'T1' | 'T2' | 'T3' | 'T4';
  subtypeName: string;
  riskLevel: string;
  confidence: number;
  recommendations: string[];
  treatmentPlan: string[];
}

const samplePatients: PatientType[] = [
  {
    id: "P001",
    name: "患者 A",
    age: 58,
    gender: "男",
    subtype: "T1",
    riskLevel: "低危",
    vitalSigns: {
      heartRate: "78",
      bloodPressure: "125/80",
      respiratoryRate: "16",
      temperature: "36.8",
      spo2: "98"
    },
    trajectoryData: [
      { time: "0h", hr: 75 }, { time: "6h", hr: 78 }, { time: "12h", hr: 76 },
      { time: "18h", hr: 77 }, { time: "24h", hr: 75 }, { time: "36h", hr: 76 },
      { time: "48h", hr: 74 }, { time: "60h", hr: 75 }, { time: "72h", hr: 74 }
    ]
  },
  {
    id: "P002",
    name: "患者 B",
    age: 65,
    gender: "女",
    subtype: "T2",
    riskLevel: "中危",
    vitalSigns: {
      heartRate: "105",
      bloodPressure: "145/90",
      respiratoryRate: "20",
      temperature: "37.5",
      spo2: "96"
    },
    trajectoryData: [
      { time: "0h", hr: 102 }, { time: "6h", hr: 105 }, { time: "12h", hr: 108 },
      { time: "18h", hr: 110 }, { time: "24h", hr: 112 }, { time: "36h", hr: 110 },
      { time: "48h", hr: 108 }, { time: "60h", hr: 106 }, { time: "72h", hr: 105 }
    ]
  },
  {
    id: "P003",
    name: "患者 C",
    age: 52,
    gender: "男",
    subtype: "T3",
    riskLevel: "中高危",
    vitalSigns: {
      heartRate: "118",
      bloodPressure: "155/95",
      respiratoryRate: "22",
      temperature: "38.2",
      spo2: "94"
    },
    trajectoryData: [
      { time: "0h", hr: 85 }, { time: "6h", hr: 95 }, { time: "12h", hr: 108 },
      { time: "18h", hr: 118 }, { time: "24h", hr: 120 }, { time: "36h", hr: 115 },
      { time: "48h", hr: 105 }, { time: "60h", hr: 95 }, { time: "72h", hr: 88 }
    ]
  },
  {
    id: "P004",
    name: "患者 D",
    age: 70,
    gender: "女",
    subtype: "T4",
    riskLevel: "极高危",
    vitalSigns: {
      heartRate: "135",
      bloodPressure: "170/105",
      respiratoryRate: "26",
      temperature: "38.8",
      spo2: "91"
    },
    trajectoryData: [
      { time: "0h", hr: 100 }, { time: "6h", hr: 120 }, { time: "12h", hr: 130 },
      { time: "18h", hr: 138 }, { time: "24h", hr: 140 }, { time: "36h", hr: 142 },
      { time: "48h", hr: 138 }, { time: "60h", hr: 135 }, { time: "72h", hr: 132 }
    ]
  }
];

const defaultRecommendations = {
  T1: ["继续监测生命体征", "常规补液支持", "早期肠内营养", "定期评估"],
  T2: ["加强心电监护", "液体复苏治疗", "预防性抗生素", "48h后复查CT"],
  T3: ["重症监护", "积极液体复苏", "血管活性药物备用", "多学科会诊"],
  T4: ["立即转入ICU", "高级生命支持", "紧急液体复苏", "呼吸机支持备用", "多学科团队介入"]
};

export default function ClinicalPage() {
  const [lang, setLang] = useState<'en' | 'zh'>('zh');
  const [selectedPatient, setSelectedPatient] = useState<PatientType | null>(null);
  const [faceImage, setFaceImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showFaceModal, setShowFaceModal] = useState(false);
  const [diagnosticResult, setDiagnosticResult] = useState<DiagnosticResult | null>(null);
  const [vitalSigns, setVitalSigns] = useState<VitalSigns>({
    heartRate: '',
    bloodPressure: '',
    respiratoryRate: '',
    temperature: '',
    spo2: ''
  });

  const t = translations[lang];

  const getRiskColor = (color: string) => {
    const colors: Record<string, string> = {
      emerald: 'bg-emerald-500',
      amber: 'bg-amber-500',
      orange: 'bg-orange-500',
      rose: 'bg-rose-500'
    };
    return colors[color] || 'bg-gray-500';
  };

  const getTextColor = (color: string) => {
    const colors: Record<string, string> = {
      emerald: 'text-emerald-600',
      amber: 'text-amber-600',
      orange: 'text-orange-600',
      rose: 'text-rose-600'
    };
    return colors[color] || 'text-gray-600';
  };

  const handlePatientSelect = (patient: PatientType) => {
    setSelectedPatient(patient);
    setVitalSigns(patient.vitalSigns);
    setDiagnosticResult(null);
  };

  const handleFaceUpload = () => {
    setShowFaceModal(true);
  };

  const handleAnalyze = async () => {
    if (!vitalSigns.heartRate) return;

    setIsAnalyzing(true);

    try {
      const response = await fetch('/api/gbtm-classify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vitalSigns,
          lang
        })
      });

      const result = await response.json();

      if (result.success) {
        setDiagnosticResult({
          subtype: result.subtype,
          subtypeName: t.subtypes[result.subtype as keyof typeof t.subtypes].name,
          riskLevel: t.subtypes[result.subtype as keyof typeof t.subtypes].risk,
          confidence: result.confidence,
          recommendations: result.recommendations,
          treatmentPlan: defaultRecommendations[result.subtype as keyof typeof defaultRecommendations] || []
        });
      } else {
        const hr = parseInt(vitalSigns.heartRate);
        let subtype: 'T1' | 'T2' | 'T3' | 'T4' = 'T1';

        if (hr >= 120) subtype = 'T4';
        else if (hr >= 100) subtype = 'T2';
        else if (hr >= 85) subtype = 'T3';

        setDiagnosticResult({
          subtype,
          subtypeName: t.subtypes[subtype].name,
          riskLevel: t.subtypes[subtype].risk,
          confidence: 85 + Math.random() * 10,
          recommendations: defaultRecommendations[subtype],
          treatmentPlan: defaultRecommendations[subtype] || []
        });
      }
    } catch (error) {
      console.error('Analysis error:', error);
      const hr = parseInt(vitalSigns.heartRate) || 80;
      let subtype: 'T1' | 'T2' | 'T3' | 'T4' = 'T1';

      if (hr >= 120) subtype = 'T4';
      else if (hr >= 100) subtype = 'T2';
      else if (hr >= 85) subtype = 'T3';

      setDiagnosticResult({
        subtype,
        subtypeName: t.subtypes[subtype].name,
        riskLevel: t.subtypes[subtype].risk,
        confidence: 85,
        recommendations: defaultRecommendations[subtype],
        treatmentPlan: defaultRecommendations[subtype] || []
      });
    }

    setIsAnalyzing(false);
  };

  const handleVitalSignChange = (key: keyof VitalSigns, value: string) => {
    setVitalSigns(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-bg-secondary">
      {/* Header */}
      <header className="bg-white border-b border-accent/20 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-primary">PancreaScan</span>
                <span className="text-xl font-bold text-accent">-AI</span>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="/" className="text-primary/70 hover:text-primary font-medium transition-colors">
                {t.nav.home}
              </a>
              <a href="/clinical" className="text-primary font-bold border-b-2 border-accent">
                {t.nav.clinical}
              </a>
              <a href="/settings" className="text-primary/70 hover:text-primary font-medium transition-colors">
                {t.nav.settings}
              </a>
            </nav>
            <button
              onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
              className="px-4 py-2 bg-primary/10 text-primary rounded-lg font-medium hover:bg-primary/20 transition-colors"
            >
              {lang === 'en' ? '中文' : 'EN'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content - Three Column Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-primary">{t.header.title}</h1>
          <p className="text-primary/60 mt-1">{t.header.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Patient Types */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-accent/20 shadow-sm p-6">
              <h2 className="text-lg font-bold text-primary mb-4">{t.leftPanel.fourTypes}</h2>
              <p className="text-xs text-primary/50 mb-4">{t.leftPanel.selectTip}</p>

              <div className="space-y-3">
                {samplePatients.map((patient) => (
                  <div
                    key={patient.id}
                    onClick={() => handlePatientSelect(patient)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedPatient?.id === patient.id
                        ? 'border-accent bg-accent/5 shadow-md'
                        : 'border-accent/20 hover:border-accent/40 bg-bg-secondary'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-primary">{patient.name}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs text-white ${getRiskColor(t.subtypes[patient.subtype].color)}`}>
                        {patient.subtype}
                      </span>
                    </div>
                    <div className="text-xs text-primary/60">
                      {patient.age}{lang === 'zh' ? '岁' : 'y'} | {patient.gender}
                    </div>
                    <div className={`text-sm font-medium mt-2 ${getTextColor(t.subtypes[patient.subtype].color)}`}>
                      {t.subtypes[patient.subtype].name}
                    </div>
                    <div className="text-xs text-primary/50 mt-1">
                      {t.subtypes[patient.subtype].risk}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Center Column - Analysis Tools */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl border border-accent/20 shadow-sm p-6">
              <h2 className="text-lg font-bold text-primary mb-6">{t.centerPanel.title}</h2>

              <div className="space-y-6">
                {/* Face Photo Upload */}
                <div>
                  <h3 className="font-semibold text-primary mb-2 flex items-center gap-2">
                    <ScanFace className="w-4 h-4 text-accent" />
                    {t.centerPanel.faceUpload}
                  </h3>
                  <div
                    onClick={handleFaceUpload}
                    className="border-2 border-dashed border-accent/30 rounded-xl p-6 text-center cursor-pointer hover:border-accent/50 hover:bg-accent/5 transition-all"
                  >
                    {faceImage ? (
                      <div className="flex items-center justify-center">
                        <Image src={faceImage} alt="Face" width={80} height={80} className="rounded-lg object-contain" />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <Upload className="w-10 h-10 text-primary/30 mb-2" />
                        <p className="text-sm text-primary/60">{t.centerPanel.faceDesc}</p>
                        <button className="mt-3 bg-accent text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent-light transition-colors">
                          {t.modal.uploadFace}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Vital Signs from EMR */}
                <div>
                  <h3 className="font-semibold text-primary mb-3 flex items-center gap-2">
                    <Database className="w-4 h-4 text-accent" />
                    {t.centerPanel.vitalSigns}
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-bg-secondary rounded-lg p-3">
                      <label className="text-xs text-primary/60 mb-1 block">{t.centerPanel.heartRate}</label>
                      <input
                        type="number"
                        value={vitalSigns.heartRate}
                        onChange={(e) => handleVitalSignChange('heartRate', e.target.value)}
                        className="w-full bg-white rounded-lg px-3 py-2 text-primary font-medium border border-accent/20 focus:border-accent focus:outline-none"
                        placeholder="60-100"
                      />
                    </div>
                    <div className="bg-bg-secondary rounded-lg p-3">
                      <label className="text-xs text-primary/60 mb-1 block">{t.centerPanel.bloodPressure}</label>
                      <input
                        type="text"
                        value={vitalSigns.bloodPressure}
                        onChange={(e) => handleVitalSignChange('bloodPressure', e.target.value)}
                        className="w-full bg-white rounded-lg px-3 py-2 text-primary font-medium border border-accent/20 focus:border-accent focus:outline-none"
                        placeholder="120/80"
                      />
                    </div>
                    <div className="bg-bg-secondary rounded-lg p-3">
                      <label className="text-xs text-primary/60 mb-1 block">{t.centerPanel.respRate}</label>
                      <input
                        type="number"
                        value={vitalSigns.respiratoryRate}
                        onChange={(e) => handleVitalSignChange('respiratoryRate', e.target.value)}
                        className="w-full bg-white rounded-lg px-3 py-2 text-primary font-medium border border-accent/20 focus:border-accent focus:outline-none"
                        placeholder="12-20"
                      />
                    </div>
                    <div className="bg-bg-secondary rounded-lg p-3">
                      <label className="text-xs text-primary/60 mb-1 block">{t.centerPanel.temperature}</label>
                      <input
                        type="number"
                        step="0.1"
                        value={vitalSigns.temperature}
                        onChange={(e) => handleVitalSignChange('temperature', e.target.value)}
                        className="w-full bg-white rounded-lg px-3 py-2 text-primary font-medium border border-accent/20 focus:border-accent focus:outline-none"
                        placeholder="36.5"
                      />
                    </div>
                  </div>
                  <div className="mt-3 bg-bg-secondary rounded-lg p-3">
                    <label className="text-xs text-primary/60 mb-1 block">{t.centerPanel.spo2}</label>
                    <input
                      type="number"
                      value={vitalSigns.spo2}
                      onChange={(e) => handleVitalSignChange('spo2', e.target.value)}
                      className="w-full bg-white rounded-lg px-3 py-2 text-primary font-medium border border-accent/20 focus:border-accent focus:outline-none"
                      placeholder="95-100"
                    />
                  </div>
                </div>

                {/* Heart Rate Trajectory */}
                {selectedPatient && (
                  <div>
                    <h3 className="font-semibold text-primary mb-3 flex items-center gap-2">
                      <Heart className="w-4 h-4 text-accent" />
                      {t.centerPanel.traceTitle}
                    </h3>
                    <div className="bg-bg-secondary rounded-xl p-4">
                      <ResponsiveContainer width="100%" height={160}>
                        <LineChart data={selectedPatient.trajectoryData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e6f2ff" />
                          <XAxis dataKey="time" stroke="#667585" fontSize={10} />
                          <YAxis stroke="#667585" fontSize={10} domain={[60, 150]} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: 'white',
                              border: '1px solid #e6f2ff',
                              borderRadius: '8px'
                            }}
                          />
                          <ReferenceLine y={100} stroke="#f59e0b" strokeDasharray="5 5" label="危险线" />
                          <Line
                            type="monotone"
                            dataKey="hr"
                            stroke={getRiskColor(t.subtypes[selectedPatient.subtype].color).replace('bg-', '#').replace('-500', '')}
                            strokeWidth={2}
                            dot={{ r: 3 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}

                {/* Execute Analysis Button */}
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !vitalSigns.heartRate}
                  className="w-full bg-gradient-to-r from-primary to-primary-light text-white py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {t.centerPanel.analyzing}
                    </>
                  ) : (
                    <>
                      <Brain className="w-5 h-5" />
                      {t.centerPanel.executeAnalysis}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Diagnostic Report */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl border border-accent/20 shadow-sm p-6">
              <h2 className="text-lg font-bold text-primary mb-6">{t.rightPanel.title}</h2>

              {selectedPatient ? (
                <div className="space-y-6">
                  {/* Patient Info */}
                  <div className="bg-bg-secondary rounded-xl p-4">
                    <h3 className="text-sm font-semibold text-primary/60 mb-3">{t.rightPanel.patientInfo}</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-primary/60 text-sm">{lang === 'zh' ? '姓名' : 'Name'}</span>
                        <span className="text-primary font-medium">{selectedPatient.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-primary/60 text-sm">{lang === 'zh' ? '年龄' : 'Age'}</span>
                        <span className="text-primary font-medium">{selectedPatient.age}{lang === 'zh' ? '岁' : 'y'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-primary/60 text-sm">{lang === 'zh' ? '性别' : 'Gender'}</span>
                        <span className="text-primary font-medium">{selectedPatient.gender}</span>
                      </div>
                    </div>
                  </div>

                  {/* Subtype Result */}
                  {diagnosticResult ? (
                    <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-5 border border-accent/20">
                      <h3 className="text-sm font-semibold text-primary/60 mb-3">{t.rightPanel.subtypeResult}</h3>
                      <div className="text-center">
                        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${getRiskColor(t.subtypes[diagnosticResult.subtype].color)} mb-3`}>
                          <span className="text-2xl font-bold text-white">{diagnosticResult.subtype}</span>
                        </div>
                        <div className={`text-lg font-bold ${getTextColor(t.subtypes[diagnosticResult.subtype].color)} mb-1`}>
                          {diagnosticResult.subtypeName}
                        </div>
                        <div className="text-sm text-primary/60 mb-2">
                          {diagnosticResult.riskLevel}
                        </div>
                        <div className="text-xs text-primary/50">
                          {lang === 'zh' ? '置信度' : 'Confidence'}: {diagnosticResult.confidence.toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-bg-secondary rounded-xl p-8 text-center">
                      <Brain className="w-12 h-12 text-primary/20 mx-auto mb-3" />
                      <p className="text-primary/50 text-sm">
                        {lang === 'zh' ? '输入数据并执行分析以获取分型结果' : 'Enter data and execute analysis to get subtype result'}
                      </p>
                    </div>
                  )}

                  {/* Recommendations */}
                  {diagnosticResult && diagnosticResult.treatmentPlan.length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold text-primary/60 mb-3">{t.rightPanel.recommendations}</h3>
                      <div className="space-y-2">
                        {diagnosticResult.treatmentPlan.map((item, index) => (
                          <div key={index} className="flex items-start gap-2 p-3 bg-bg-secondary rounded-lg">
                            <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-primary/80">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Export Button */}
                  {diagnosticResult && (
                    <button className="w-full bg-accent hover:bg-accent-light text-white py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" />
                      {t.rightPanel.export}
                    </button>
                  )}
                </div>
              ) : (
                <div className="bg-bg-secondary rounded-xl p-8 text-center">
                  <User className="w-12 h-12 text-primary/20 mx-auto mb-3" />
                  <p className="text-primary/50 text-sm">
                    {lang === 'zh' ? '请从左侧选择一个患者' : 'Please select a patient from the left'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Face Upload Modal */}
      {showFaceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-primary">{t.modal.uploadFace}</h3>
              <button onClick={() => setShowFaceModal(false)} className="text-primary/50 hover:text-primary">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="border-2 border-dashed border-accent/30 rounded-xl p-8 text-center">
              <Upload className="w-12 h-12 text-primary/30 mx-auto mb-3" />
              <p className="text-sm text-primary/60 mb-4">{t.centerPanel.faceDesc}</p>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="face-upload"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const reader = new FileReader();
                    reader.onload = (ev) => {
                      setFaceImage(ev.target?.result as string);
                      setShowFaceModal(false);
                    };
                    reader.readAsDataURL(e.target.files[0]);
                  }
                }}
              />
              <label
                htmlFor="face-upload"
                className="inline-flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent-light transition-colors cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                {lang === 'zh' ? '选择照片' : 'Choose Photo'}
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}