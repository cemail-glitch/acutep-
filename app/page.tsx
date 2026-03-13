'use client';

import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Brain, 
  Zap, 
  ArrowRight, 
  ChevronRight, 
  CheckCircle2, 
  LayoutDashboard,
  Mail,
  Phone,
  Loader2,
  FileText,
  Globe,
  User,
  Upload
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { DiagnosisData, DiagnosisResult } from '@/lib/types';

const translations = {
  en: {
    nav: {
      features: "Features",
      tech: "Technology",
      workflow: "Workflow",
      clinical: "Clinical",
      demo: "Simulation",
      request: "Request Demo"
    },
    hero: {
      badge: "NEXT GEN CLINICAL AI",
      title_part1: "PancreaScan-AI",
      title_part2: "Redefining Pancreatitis Diagnosis",
      subtitle: "The first multi-modal AI system combining facial imaging, clinical metrics, and laboratory markers to achieve 94.7% diagnostic accuracy in acute pancreatitis.",
      apply: "Apply for Product Demo",
      whitepaper: "Technical Whitepaper"
    },
    stats: {
      accuracy: "Accuracy",
      processing: "Processing",
      sites: "Clinical Sites",
      patents: "AI Patents"
    },
    challenges: {
      title: "Challenges in Traditional Pancreatitis Management",
      items: [
        "Diagnostic delay in critical early windows",
        "Subjective severity classification",
        "Difficulty in predicting complications like necrosis",
        "High variability in expert interpretation"
      ]
    },
    features: {
      neural: { title: "Neural Fusion", desc: "Proprietary fusion engine combining facial imaging features with EMR clinical sequences and laboratory markers." },
      grading: { title: "Real-time Grading", desc: "Immediate severity grading based on Atlanta criteria with facial expression analysis." },
      prognosis: { title: "Prognosis Engine", desc: "Prediction of persistent organ failure with over 90% confidence using multi-modal data." },
      reports: { title: "Smart Reports", desc: "Auto-generated standardized reports ready for hospital EMR integration." },
      facial: { title: "Facial Analysis", desc: "AI-powered facial recognition to estimate BMI and assess pain expression as clinical proxies." }
    },
    workflow: {
      badge: "Process",
      title: "Intelligent Diagnostic Workflow",
      subtitle: "How PancreaScan-AI seamlessly integrates into clinical practice",
      steps: [
        { title: "Data Acquisition", desc: "Upload facial photos and sync clinical/lab data from EMR." },
        { title: "Feature Extraction", desc: "AI extracts facial features for BMI estimation and pain expression analysis." },
        { title: "Multi-Modal Analysis", desc: "Fusion model cross-references facial features with lab markers and clinical data." },
        { title: "Clinical Support", desc: "Receive grading, prediction, and evidence-based suggestions." }
      ]
    },
    demo: {
      title: "Interactive AI Diagnosis Simulation",
      subtitle: "Experience the power of our multi-modal engine. Input clinical data to see how the system generates a simulated diagnostic report.",
      labelImaging: "Facial Analysis (Textual)",
      labelCrp: "CRP (mg/L)",
      labelWbc: "WBC (x10⁹/L)",
      labelPain: "Pain (1-10)",
      btnExecute: "Execute Diagnostic Simulation",
      btnLoading: "AI Engine Analyzing...",
      reportTitle: "Simulation Report",
      badgeOutput: "AI Output Result",
      confidence: "Confidence",
      impression: "Clinical Impression",
      severity: "Severity Grade",
      actions: "Recommended Actions",
      placeholder: "Perform a simulation on the left to view the AI analysis output"
    },
    clinical: {
      badge: "Evidence",
      title: "Clinically Validated Performance",
      subtitle: "Comparing PancreaScan-AI against traditional diagnostic methodologies in multi-center clinical trials.",
      chart_acc: "Accuracy (%)",
      chart_sens: "Sensitivity (%)",
      chart_spec: "Specificity (%)",
      acc_box: { title: "94.7% Accuracy", desc: "Outperforming standard Atlanta criteria evaluations by over 18% in prospective cohorts." },
      early_box: { title: "Early Intervention", desc: "System identifies severe cases 24-48 hours earlier than traditional lab biomarkers." },
      icu_box: { title: "Reduced ICU Load", desc: "Accurate mild/moderate grading helps optimize resource allocation in tertiary hospitals." }
    },
    footer: {
      desc: "Advanced medical intelligence for high-precision diagnosis of pancreatic diseases.",
      trial: "Request Trial",
      trialDesc: "Apply for institutional access for clinical research purposes.",
      getStarted: "Get Started",
      copy: "© 2025 PancreaScan-AI Technologies Inc. All rights reserved."
    }
  },
  zh: {
    nav: {
      features: "功能特性",
      tech: "核心技术",
      workflow: "诊断流程",
      clinical: "临床数据",
      demo: "在线演示",
      request: "索取演示"
    },
    hero: {
      badge: "新一代临床智能AI",
      title_part1: "PancreaScan-AI",
      title_part2: "重新定义胰腺炎诊断标准",
      subtitle: "全球首款结合人脸影像、临床指标与实验室标志物的多模态AI系统，在急性胰腺炎诊断中实现 94.7% 的超高准确率。",
      apply: "申请产品演示",
      whitepaper: "技术白皮书"
    },
    stats: {
      accuracy: "准确率",
      processing: "处理耗时",
      sites: "临床合作机构",
      patents: "AI 专利"
    },
    challenges: {
      title: "传统胰腺炎管理的挑战",
      items: [
        "关键早期诊断窗口的延误",
        "严重程度分类的主观性",
        "坏死等并发症预测困难",
        "专家解读的一致性差异较大"
      ]
    },
    features: {
      neural: { title: "神经融合引擎", desc: "专利融合技术，将人脸影像特征与 EMR 临床序列及实验室指标深度耦合。" },
      grading: { title: "实时分级", desc: "基于亚特兰大标准，结合面部表情分析，即时给出严重程度分级。" },
      prognosis: { title: "预后评估", desc: "利用多模态数据预测持续性器官衰竭的置信度超过 90%。" },
      reports: { title: "智能报告", desc: "自动生成标准化的临床报告，支持与医院 EMR 系统无缝对接。" },
      facial: { title: "人脸分析", desc: "AI 驱动的面部识别技术，用于估计 BMI 和评估疼痛表情作为临床代理指标。" }
    },
    workflow: {
      badge: "诊断流程",
      title: "智能诊断工作流",
      subtitle: "PancreaScan-AI 如何无缝融入临床实践",
      steps: [
        { title: "数据采集", desc: "上传人脸照片并同步 EMR 中的临床和实验室数据。" },
        { title: "特征提取", desc: "AI 提取面部特征用于 BMI 估计和疼痛表情分析。" },
        { title: "多模态分析", desc: "融合模型交叉引用面部特征与实验室指标和临床数据。" },
        { title: "临床辅助", desc: "接收分级建议、预后预测及基于证据的治疗方案。" }
      ]
    },
    demo: {
      title: "交互式 AI 诊断模拟",
      subtitle: "体验多模态引擎的强大功能。输入临床数据，查看系统如何生成模拟诊断报告。",
      labelImaging: "人脸分析 (文本描述)",
      labelCrp: "CRP (mg/L)",
      labelWbc: "WBC (x10⁹/L)",
      labelPain: "疼痛评分 (1-10)",
      btnExecute: "执行诊断模拟",
      btnLoading: "AI 引擎正在分析...",
      reportTitle: "模拟诊断报告",
      badgeOutput: "AI 输出结果",
      confidence: "置信度",
      impression: "临床印象",
      severity: "严重程度分级",
      actions: "建议措施",
      placeholder: "请在左侧输入数据并点击执行，以查看 AI 分析结果"
    },
    clinical: {
      badge: "临床证据",
      title: "经临床验证的性能",
      subtitle: "在多中心临床试验中，将 PancreaScan-AI 与传统诊断方法进行对比。",
      chart_acc: "准确率 (%)",
      chart_sens: "灵敏度 (%)",
      chart_spec: "特异性 (%)",
      acc_box: { title: "94.7% 准确率", desc: "在前瞻性队列研究中，表现优于标准亚特兰大标准评估 18% 以上。" },
      early_box: { title: "早期干预", desc: "系统识别重症病例的时间比传统实验室生物标志物提前 24-48 小时。" },
      icu_box: { title: "优化 ICU 负载", desc: "精准的轻/中度分级有助于三级医院优化医疗资源配置。" }
    },
    footer: {
      desc: "致力于为胰腺疾病的高精度诊断提供先进的医疗智能方案。",
      trial: "申请试用",
      trialDesc: "申请用于临床研究目的的机构访问权限。",
      getStarted: "立即开始",
      copy: "© 2025 PancreaScan-AI 科技有限公司。保留所有权利。"
    }
  }
};

const Navbar = ({ lang, setLang }: { lang: 'en' | 'zh', setLang: (l: 'en' | 'zh') => void }) => {
  const t = translations[lang].nav;
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center space-x-2">
            <div className="bg-medical-blue p-2 rounded-lg">
              <Activity className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-medical-blue">PancreaScan-AI<span className="text-gray-400 font-light">™</span></span>
          </div>
          <div className="hidden md:flex space-x-8 font-medium text-gray-600">
            <a href="#features" className="hover:text-medical-blue transition-colors">{t.features}</a>
            <a href="#system" className="hover:text-medical-blue transition-colors">{lang === 'zh' ? '系统方案' : 'System'}</a>
            <a href="#workflow" className="hover:text-medical-blue transition-colors">{t.workflow}</a>
            <a href="#clinical" className="hover:text-medical-blue transition-colors">{t.clinical}</a>
            <a href="#demo" className="hover:text-medical-blue transition-colors">{t.demo}</a>
          </div>
          <div className="flex items-center space-x-6">
            <button 
              onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
              className="flex items-center space-x-2 text-gray-600 hover:text-medical-blue transition-colors font-medium"
            >
              <Globe size={18} />
              <span>{lang === 'en' ? '中文' : 'English'}</span>
            </button>
            <button className="bg-medical-blue text-white px-6 py-2.5 rounded-full font-semibold hover:bg-opacity-90 transition-all shadow-lg shadow-blue-900/10">
              {t.request}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
    <div className="mb-6 p-3 bg-blue-50 w-fit rounded-xl group-hover:bg-medical-blue group-hover:text-white transition-colors text-medical-blue">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

const SectionHeading = ({ badge, title, subtitle }: { badge?: string, title: string, subtitle?: string }) => (
  <div className="text-center mb-16">
    {badge && <span className="text-sm font-bold tracking-widest text-medical-blue uppercase bg-blue-50 px-4 py-1.5 rounded-full mb-4 inline-block">{badge}</span>}
    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">{title}</h2>
    {subtitle && <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>}
  </div>
);

const WorkflowStep = ({ number, title, description, isLast = false }: { number: number, title: string, description: string, isLast?: boolean }) => (
  <div className="relative flex-1 flex flex-col items-center text-center px-4">
    <div className="w-16 h-16 bg-white border-4 border-blue-50 rounded-full flex items-center justify-center text-2xl font-bold text-medical-blue mb-6 shadow-sm z-10">
      {number}
    </div>
    {!isLast && <div className="hidden lg:block absolute top-8 left-1/2 w-full h-0.5 bg-blue-100 -z-0"></div>}
    <h4 className="text-xl font-bold mb-2 text-gray-900">{title}</h4>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default function Home() {
  const [lang, setLang] = useState<'en' | 'zh'>('zh');
  const t = translations[lang];

  const [formData, setFormData] = useState<DiagnosisData>({
    imaging: lang === 'zh' ? '面部表情显示中度疼痛，体型偏胖。' : 'Facial expression shows moderate pain, body type appears overweight.',
    crp: '150',
    whiteCell: '18',
    painLevel: '8'
  });

  useEffect(() => {
    if (formData.imaging === translations['en'].demo.labelImaging || formData.imaging === translations['zh'].demo.labelImaging || formData.imaging === 'Edematous change, peripancreatic fluid collection noted.' || formData.imaging === '见水肿样改变，胰周积液明显。' || formData.imaging === 'Facial expression shows moderate pain, body type appears overweight.' || formData.imaging === '面部表情显示中度疼痛，体型偏胖。') {
      setFormData(prev => ({
        ...prev,
        imaging: lang === 'zh' ? '面部表情显示中度疼痛，体型偏胖。' : 'Facial expression shows moderate pain, body type appears overweight.'
      }));
    }
  }, [lang]);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [chatMessages, setChatMessages] = useState<Array<{role: 'user' | 'expert', content: string}>>([
    { role: 'expert', content: lang === 'zh' ? '您好，我是胰腺炎领域的AI专家，有什么可以帮助您的？' : 'Hello, I\'m an AI expert in pancreatitis. How can I help you?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  const handleSimulate = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/diagnosis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          lang,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get diagnosis');
      }

      const diagnosis = await response.json();
      setResult(diagnosis);
    } catch (err) {
      alert(lang === 'zh' ? "模拟失败。请检查您的 API 密钥。" : "Simulation failed. Please check your API key.");
    } finally {
      setLoading(false);
    }
  };

  const handleChatSend = async () => {
    if (!chatInput.trim()) return;
    
    const userMessage = chatInput;
    setChatMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setChatInput('');
    setChatLoading(true);

    try {
      const response = await fetch('/api/diagnosis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imaging: '',
          crp: '0',
          whiteCell: '0',
          painLevel: '0',
          lang,
          question: userMessage
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      const expertResponse = data.diagnosis || (lang === 'zh' ? '抱歉，我无法回答这个问题。' : 'Sorry, I cannot answer this question.');
      setChatMessages(prev => [...prev, { role: 'expert', content: expertResponse }]);
    } catch (err) {
      setChatMessages(prev => [...prev, { role: 'expert', content: lang === 'zh' ? '抱歉，发生了一些错误。请稍后再试。' : 'Sorry, an error occurred. Please try again later.' }]);
    } finally {
      setChatLoading(false);
    }
  };

  const clinicalPerformanceData = [
    { name: lang === 'zh' ? '传统方法' : 'Traditional', accuracy: 76.5, sensitivity: 72.1, specificity: 78.4 },
    { name: lang === 'zh' ? 'PancreaScan-AI' : 'PancreaScan-AI', accuracy: 94.7, sensitivity: 93.2, specificity: 95.8 },
  ];

  return (
    <div className="min-h-screen">
      <Navbar lang={lang} setLang={setLang} />

      <section className="relative pt-40 pb-24 overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 opacity-20 pointer-events-none">
           <Brain size={600} className="text-medical-blue animate-float" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-1/2">
              <span className="inline-flex items-center px-4 py-1 rounded-full bg-blue-100 text-medical-blue text-sm font-bold mb-6">
                <Zap className="w-4 h-4 mr-2" /> {t.hero.badge}
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight mb-8">
                {t.hero.title_part1}<span className="text-medical-blue">™</span><br />
                <span className="text-gray-600">{t.hero.title_part2}</span>
              </h1>
              <p className="text-xl text-gray-600 mb-10 max-w-xl leading-relaxed">
                {t.hero.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button 
                  onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-medical-blue text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center hover:bg-opacity-90 shadow-xl shadow-blue-500/20 transition-all text-lg group"
                >
                  {t.hero.apply} <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="bg-white border-2 border-gray-100 text-gray-700 px-8 py-4 rounded-xl font-bold flex items-center justify-center hover:border-medical-blue hover:text-medical-blue transition-all text-lg shadow-sm">
                  {t.hero.whitepaper}
                </button>
              </div>
            </div>
            
            <div className="lg:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 bg-medical-blue/10 rounded-3xl blur-3xl animate-pulse"></div>
                <div className="relative bg-white p-6 rounded-3xl shadow-2xl border border-gray-100">
                  <div className="aspect-square overflow-hidden rounded-2xl">
                    <img 
                      src="/heatmap.png" 
                      alt="Facial Analysis" 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="mt-6 text-center">
                    <h3 className="text-lg font-bold text-gray-900">{lang === 'zh' ? 'AI 面部分析' : 'AI Facial Analysis'}</h3>
                    <p className="text-gray-600 mt-2">{lang === 'zh' ? '实时评估面部表情和疼痛程度' : 'Real-time facial expression and pain assessment'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '94.7%', label: t.stats.accuracy },
              { value: '30s', label: t.stats.processing },
              { value: '150+', label: t.stats.sites },
              { value: '25+', label: t.stats.patents },
            ].map((stat, i) => (
              <div key={i} className="border-l-2 border-medical-blue pl-6 flex flex-col items-center text-center">
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-gray-500 font-medium uppercase text-xs tracking-wider mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title={t.challenges.title} />
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-6">
              {t.challenges.items.map((item, i) => (
                <div key={i} className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                  <div className="bg-red-50 p-2 rounded-full text-red-500 mt-0.5 flex-shrink-0">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                  <p className="text-lg text-gray-700 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FeatureCard 
                icon={<Brain size={24} />} 
                title={t.features.neural.title} 
                description={t.features.neural.desc} 
              />
              <FeatureCard 
                icon={<Zap size={24} />} 
                title={t.features.grading.title} 
                description={t.features.grading.desc} 
              />
              <FeatureCard 
                icon={<Activity size={24} />} 
                title={t.features.prognosis.title} 
                description={t.features.prognosis.desc} 
              />
              <FeatureCard 
                icon={<FileText size={24} />} 
                title={t.features.reports.title} 
                description={t.features.reports.desc} 
              />
              <div className="sm:col-span-2">
                <FeatureCard 
                  icon={<User size={24} />} 
                  title={t.features.facial.title} 
                  description={t.features.facial.desc} 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="workflow" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            badge={t.workflow.badge} 
            title={t.workflow.title} 
            subtitle={t.workflow.subtitle}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {t.workflow.steps.map((step, i) => (
              <div key={i} className="relative">
                <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all group h-full">
                  <div className="w-16 h-16 bg-white border-4 border-blue-100 rounded-full flex items-center justify-center text-2xl font-bold text-medical-blue mb-6 shadow-sm group-hover:scale-110 transition-transform">
                    {i+1}
                  </div>
                  <h4 className="text-xl font-bold mb-3 text-gray-900">{step.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                </div>
                {i < t.workflow.steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 right-0 w-8 h-0.5 bg-gradient-to-r from-blue-100 to-transparent -translate-x-1/2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="system" className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            badge={lang === 'zh' ? "系统方案" : "System Solution"} 
            title={lang === 'zh' ? "AI辅助早期识别MSAP/SAP系统" : "AI-Assisted Early Identification System for MSAP/SAP"} 
            subtitle={lang === 'zh' ? "基于人脸图像和实验室指标的多模态融合方案" : "Multi-modal fusion solution based on facial imaging and laboratory indicators"}
          />
          
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold mb-6 text-gray-900">{lang === 'zh' ? "模型平均脸描述" : "Model Average Face Description"}</h3>
                <div className="mb-8 overflow-hidden rounded-xl">
                  <img 
                    src="/heatmap.png" 
                    alt="Facial Analysis Heatmap" 
                    className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <p className="text-sm text-gray-500 text-center mb-6">{lang === 'zh' ? "面部特征热图分析示例" : "Facial Feature Heatmap Analysis Example"}</p>
                <h4 className="text-lg font-semibold mb-4 text-gray-900">{lang === 'zh' ? "平均脸分析流程" : "Average Face Analysis Process"}</h4>
                <div className="space-y-4 mb-6">
                  <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-xl">
                    <div className="bg-medical-blue text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">A</div>
                    <div>
                      <p className="text-gray-700 leading-relaxed">
                        {lang === 'zh' ? "使用ASM/AAM算法，将患者的面部形状拟合到健康平均脸的模型空间中，得到一个参数向量 b。这个 b 就代表了患者的形状相对于健康平均脸的偏移。" : "Using ASM/AAM algorithms, fit patient's facial shape into model space of a healthy average face to obtain a parameter vector b. This b represents patient's shape deviation from healthy average face."}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-xl">
                    <div className="bg-medical-blue text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">B</div>
                    <div>
                      <p className="text-gray-700 leading-relaxed">
                        {lang === 'zh' ? "分析这个偏移 b。胰腺炎导致的痛苦面容（皱眉、眯眼）、面部水肿等，会表现为特定方向上的、超出正常范围的巨大偏移。" : "Analyze this deviation b. Pancreatitis-induced painful facial expressions (frowning, squinting), facial edema, etc., will manifest as significant deviations in specific directions beyond normal range."}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-xl">
                    <div className="bg-medical-blue text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">C</div>
                    <div>
                      <p className="text-gray-700 leading-relaxed">
                        {lang === 'zh' ? "通过机器学习（如SVM）或统计分析，找出与疾病最相关的偏移方向，其大小即可作为疾病严重程度的量化指标。" : "Through machine learning (such as SVM) or statistical analysis, identify deviation directions most relevant to disease, whose magnitude can be used as a quantitative indicator of disease severity."}
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {lang === 'zh' ? "通过对比平均脸与患者实际面部特征，医生可以快速评估患者的风险等级，结合实验室指标进行综合判断。" : "By comparing average faces with patients' actual facial features, doctors can quickly assess patients' risk levels and make comprehensive judgments combined with laboratory indicators."}
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-medical-blue/5 to-blue-50 p-8 rounded-3xl border border-blue-100">
                <h3 className="text-xl font-bold mb-6 text-gray-900">{lang === 'zh' ? "系统目标" : "System Objectives"}</h3>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3 p-3 bg-white rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-medical-blue mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{lang === 'zh' ? "基于人脸照片和实验室指标，实现入院48小时内的准确分型（MAP/MSAP/SAP）" : "Based on facial photos and laboratory indicators, achieve accurate classification (MAP/MSAP/SAP) within 48 hours of admission"}</span>
                  </li>
                  <li className="flex items-start space-x-3 p-3 bg-white rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-medical-blue mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{lang === 'zh' ? "通过中间融合（feature-level fusion）方式，充分建模模态间关联" : "Through intermediate fusion (feature-level fusion), fully model inter-modal associations"}</span>
                  </li>
                  <li className="flex items-start space-x-3 p-3 bg-white rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-medical-blue mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{lang === 'zh' ? "在SAP识别上达到敏感性> 85%，AUC > 0.9" : "Achieve sensitivity > 85% and AUC > 0.9 in SAP identification"}</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <h4 className="text-xl font-bold mb-6 text-gray-900 flex items-center">
                  <User className="w-6 h-6 text-medical-blue mr-3" />
                  {lang === 'zh' ? "数据模态" : "Data Modalities"}
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                    <div className="bg-blue-100 p-3 rounded-xl">
                      <User className="w-6 h-6 text-medical-blue" />
                    </div>
                    <span className="text-gray-700 font-medium">{lang === 'zh' ? "人脸图像：推断BMI和疼痛表情" : "Facial imaging: Infer BMI and pain expression"}</span>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                    <div className="bg-blue-100 p-3 rounded-xl">
                      <FileText className="w-6 h-6 text-medical-blue" />
                    </div>
                    <span className="text-gray-700 font-medium">{lang === 'zh' ? "实验室指标：CRP、胰脂肪酶、胰淀粉酶等" : "Laboratory indicators: CRP, pancreatic lipase, amylase, etc."}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <h4 className="text-xl font-bold mb-6 text-gray-900 flex items-center">
                  <Brain className="w-6 h-6 text-medical-blue mr-3" />
                  {lang === 'zh' ? "模型架构" : "Model Architecture"}
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                    <div className="bg-blue-100 p-3 rounded-xl">
                      <Brain className="w-6 h-6 text-medical-blue" />
                    </div>
                    <span className="text-gray-700 font-medium">{lang === 'zh' ? "图像分支：ResNet/Swin Transformer" : "Image branch: ResNet/Swin Transformer"}</span>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                    <div className="bg-blue-100 p-3 rounded-xl">
                      <Brain className="w-6 h-6 text-medical-blue" />
                    </div>
                    <span className="text-gray-700 font-medium">{lang === 'zh' ? "实验室数据分支：MLP" : "Laboratory data branch: MLP"}</span>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                    <div className="bg-blue-100 p-3 rounded-xl">
                      <Brain className="w-6 h-6 text-medical-blue" />
                    </div>
                    <span className="text-gray-700 font-medium">{lang === 'zh' ? "融合层：attention机制提权融合" : "Fusion layer: attention mechanism for weighted fusion"}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-medical-blue/5 to-blue-50 p-8 rounded-3xl border border-blue-100 hover:shadow-xl transition-shadow">
                <h4 className="text-xl font-bold mb-6 text-gray-900 flex items-center">
                  <Zap className="w-6 h-6 text-medical-blue mr-3" />
                  {lang === 'zh' ? "部署策略" : "Deployment Strategy"}
                </h4>
                <p className="text-gray-700 leading-relaxed">{lang === 'zh' ? "本地边缘部署+ HIS集成混合方案，保障数据隐私，提高系统稳定性。" : "Local edge deployment + HIS integration hybrid solution to ensure data privacy and improve system stability."}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="demo" className="py-24 bg-gradient-to-br from-medical-blue to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">{t.demo.title}</h2>
            <p className="text-blue-100 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              {t.demo.subtitle}
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-8">
              <div className="bg-white/10 p-8 rounded-3xl backdrop-blur-sm border border-white/20">
                <div>
                  <label className="block text-sm font-semibold mb-3 opacity-90 uppercase tracking-wider">{lang === 'zh' ? "上传人脸照片" : "Upload Facial Photo"}</label>
                  <div className="border-2 border-dashed border-white/40 rounded-xl p-8 text-center hover:border-white/70 transition-all cursor-pointer hover:bg-white/5">
                    <Upload className="w-16 h-16 text-white/60 mx-auto mb-4" />
                    <p className="text-white/80 mb-4 text-lg">{lang === 'zh' ? "点击或拖拽文件到此处上传" : "Click or drag file to upload"}</p>
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden"
                      id="file-upload"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          console.log('File uploaded:', e.target.files[0]);
                        }
                      }}
                    />
                    <button 
                      onClick={() => document.getElementById('file-upload')?.click()}
                      className="bg-white/20 hover:bg-white/30 text-white px-8 py-3 rounded-lg transition-all font-medium"
                    >
                      {lang === 'zh' ? "选择文件" : "Select File"}
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2 opacity-90 uppercase tracking-wider">{t.demo.labelCrp}</label>
                    <input 
                      type="text" 
                      className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      value={formData.crp}
                      onChange={(e) => setFormData({...formData, crp: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 opacity-90 uppercase tracking-wider">{t.demo.labelWbc}</label>
                    <input 
                      type="text" 
                      className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      value={formData.whiteCell}
                      onChange={(e) => setFormData({...formData, whiteCell: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 opacity-90 uppercase tracking-wider">{t.demo.labelPain}</label>
                    <input 
                      type="text" 
                      className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      value={formData.painLevel}
                      onChange={(e) => setFormData({...formData, painLevel: e.target.value})}
                    />
                  </div>
                </div>
                <button 
                  onClick={handleSimulate}
                  disabled={loading}
                  className="w-full bg-white text-medical-blue font-bold py-4 rounded-xl flex items-center justify-center space-x-2 hover:bg-blue-50 transition-all shadow-lg mt-6"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin mr-2" /> <span>{t.demo.btnLoading}</span>
                    </>
                  ) : (
                    <>
                      <Activity className="mr-2" /> <span>{t.demo.btnExecute}</span>
                    </>
                  )}
                </button>
              </div>
              
              <div className="bg-white/10 p-8 rounded-3xl backdrop-blur-sm border border-white/20">
                <h3 className="text-2xl font-bold mb-4">{lang === 'zh' ? "与胰腺炎专家对话" : "Talk with Pancreatitis Expert"}</h3>
                <p className="text-blue-100 mb-6">{lang === 'zh' ? "向AI专家咨询胰腺炎相关问题" : "Ask AI expert about pancreatitis-related questions"}</p>
                <div className="space-y-4">
                  <div className="bg-white/10 border border-white/20 rounded-xl p-6 max-h-[300px] overflow-y-auto space-y-4">
                    {chatMessages.map((msg, index) => (
                      <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-4 rounded-xl ${
                          msg.role === 'user' 
                            ? 'bg-medical-blue text-white' 
                            : 'bg-white/20 text-white'
                        }`}>
                          {msg.role === 'expert' && <span className="text-xs font-bold text-blue-200 block mb-1">{lang === 'zh' ? '专家' : 'Expert'}</span>}
                          <div className="leading-relaxed whitespace-pre-wrap">
                            {msg.content.split('\n').map((line, i) => {
                              const isBold = line.includes('**');
                              const cleanLine = line.replace(/\*\*/g, '');
                              return (
                                <p key={i} className={isBold ? 'font-bold my-2' : 'my-1'}>
                                  {cleanLine}
                                </p>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    ))}
                    {chatLoading && (
                      <div className="flex justify-start">
                        <div className="bg-white/20 text-white p-4 rounded-xl">
                          <div className="flex space-x-2">
                            <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex space-x-3">
                    <input 
                      type="text" 
                      placeholder={lang === 'zh' ? "输入您的问题..." : "Type your question..."}
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleChatSend();
                        }
                      }}
                      className="flex-1 bg-white/10 border border-white/30 rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    />
                    <button 
                      onClick={handleChatSend}
                      disabled={chatLoading || !chatInput.trim()}
                      className="bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-xl transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {chatLoading ? (lang === 'zh' ? '发送中...' : 'Sending...') : (lang === 'zh' ? "发送" : "Send")}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 text-gray-900 shadow-2xl min-h-[500px] flex flex-col relative overflow-hidden">
               {result ? (
                 <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex justify-between items-start mb-8">
                       <div>
                         <span className="text-xs font-bold text-medical-blue uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">{t.demo.badgeOutput}</span>
                         <h3 className="text-2xl font-bold mt-2">{t.demo.reportTitle}</h3>
                       </div>
                       <div className="bg-life-green/10 text-life-green px-4 py-2 rounded-xl text-center">
                          <div className="text-sm font-bold">{result.probability}</div>
                          <div className="text-[10px] font-medium uppercase">{t.demo.confidence}</div>
                       </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="bg-gray-50 p-4 rounded-2xl">
                         <div className="text-xs text-gray-400 uppercase font-bold mb-1">{t.demo.impression}</div>
                         <div className="text-lg font-semibold text-gray-800">{result.diagnosis}</div>
                      </div>
                      <div className="flex space-x-4">
                        <div className="flex-1 bg-gray-50 p-4 rounded-2xl">
                           <div className="text-xs text-gray-400 uppercase font-bold mb-1">{t.demo.severity}</div>
                           <div className={`text-lg font-bold ${result.severity.toLowerCase().includes('severe') || result.severity.includes('重度') ? 'text-red-600' : 'text-medical-blue'}`}>
                             {result.severity}
                           </div>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 uppercase font-bold mb-3">{t.demo.actions}</div>
                        <ul className="space-y-3">
                          {result.recommendations.map((rec, i) => (
                            <li key={i} className="flex items-start text-sm text-gray-600">
                               <CheckCircle2 className="w-4 h-4 text-life-green mr-2 flex-shrink-0 mt-0.5" />
                               {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                 </div>
               ) : (
                 <div className="flex-1 flex flex-col items-center justify-center text-center opacity-40">
                    <LayoutDashboard size={64} className="mb-4 text-gray-300" />
                    <p className="max-w-[200px]">{t.demo.placeholder}</p>
                 </div>
               )}
               <div className="absolute -bottom-5 -right-5 text-gray-50 pointer-events-none select-none opacity-30 z-0">
                 <Brain size={180} />
               </div>
            </div>
          </div>
        </div>
      </section>

      <section id="clinical" className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            badge={t.clinical.badge} 
            title={t.clinical.title} 
            subtitle={t.clinical.subtitle}
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={clinicalPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="accuracy" name={t.clinical.chart_acc} fill="#0A5C8A" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="sensitivity" name={t.clinical.chart_sens} fill="#2E8B57" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="specificity" name={t.clinical.chart_spec} fill="#CBD5E1" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-medical-blue/5 to-blue-50 p-6 rounded-2xl border border-blue-100 hover:shadow-lg transition-shadow">
                 <div className="text-sm font-bold text-medical-blue mb-2">{t.clinical.acc_box.title}</div>
                 <p className="text-gray-700 text-sm leading-relaxed">{t.clinical.acc_box.desc}</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100 hover:shadow-lg transition-shadow">
                 <div className="text-sm font-bold text-green-700 mb-2">{t.clinical.early_box.title}</div>
                 <p className="text-gray-700 text-sm leading-relaxed">{t.clinical.early_box.desc}</p>
              </div>
              <div className="bg-gradient-to-br from-gray-50 to-slate-50 p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
                 <div className="text-sm font-bold text-gray-700 mb-2">{t.clinical.icu_box.title}</div>
                 <p className="text-gray-700 text-sm leading-relaxed">{t.clinical.icu_box.desc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center space-x-2 mb-6">
                <Activity className="text-white w-6 h-6" />
                <span className="text-xl font-bold tracking-tight">PancreaScan-AI</span>
              </div>
              <p className="text-gray-400 mb-8 leading-relaxed">{t.footer.desc}</p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all cursor-pointer">
                  <Mail size={18} />
                </div>
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all cursor-pointer">
                  <Phone size={18} />
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6">{lang === 'zh' ? '核心技术' : 'Technology'}</h4>
              <ul className="space-y-4 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">{t.features.neural.title}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t.features.grading.title}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Integration</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6">{lang === 'zh' ? '公司' : 'Company'}</h4>
              <ul className="space-y-4 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">{lang === 'zh' ? '关于我们' : 'About Us'}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{lang === 'zh' ? '科研伙伴' : 'Research Partners'}</a></li>
              </ul>
            </div>
            <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
              <h4 className="font-bold text-lg mb-4">{t.footer.trial}</h4>
              <p className="text-gray-400 text-sm mb-6">{t.footer.trialDesc}</p>
              <button className="w-full bg-medical-blue text-white py-3 rounded-xl font-bold hover:bg-opacity-90 transition-all">
                {t.footer.getStarted}
              </button>
            </div>
          </div>
          <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>{t.footer.copy}</p>
            <div className="flex space-x-8 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">{lang === 'zh' ? '隐私政策' : 'Privacy Policy'}</a>
              <a href="#" className="hover:text-white transition-colors">{lang === 'zh' ? '服务条款' : 'Terms of Service'}</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
