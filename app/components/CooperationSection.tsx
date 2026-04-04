'use client';

import React, { useState } from 'react';
import { 
  Cloud, 
  Server, 
  Shield, 
  DollarSign, 
  Wrench, 
  RefreshCw,
  Users,
  Network,
  BookOpen,
  MapPin,
  X,
  CheckCircle,
  ArrowRight,
  FileText,
  Download,
  Phone,
  Mail,
  Building,
  Globe
} from 'lucide-react';

interface CooperationSectionProps {
  lang: 'en' | 'zh';
}

interface DeploymentOption {
  id: 'cloud' | 'local';
  name: string;
  subtitle: string;
  icon: 'cloud' | 'server';
  features: {
    privacy: string;
    cost: string;
    maintenance: string;
    update: string;
  };
  suitable: string;
  color: string;
}

interface CooperationModel {
  id: number;
  title: string;
  description: string;
  icon: string;
  benefits: string[];
}

interface ProcessStep {
  id: number;
  title: string;
  description: string;
  icon: string;
  details: string[];
}

const deploymentOptions: DeploymentOption[] = [
  {
    id: 'cloud',
    name: '云端部署（SaaS 模式）',
    subtitle: '快速上线 · 零运维 · 自动更新',
    icon: 'cloud',
    features: {
      privacy: '医疗合规专属云，VPN 安全访问',
      cost: '开通即用，零服务器投入',
      maintenance: '云端统一运维，无需本地支持',
      update: '模型自动迭代，实时同步'
    },
    suitable: '适合开展多中心协作、试点先行、快速上线验证的医院',
    color: '#0066CC'
  },
  {
    id: 'local',
    name: '本地部署（私有化模式）',
    subtitle: '数据不出院 · 深度集成 · 自主管控',
    icon: 'server',
    features: {
      privacy: '系统完全部署在内网，数据全程不出院',
      cost: '需本地服务器与运维团队',
      maintenance: '提供定期维护与技术支援',
      update: '定期推送模型更新包'
    },
    suitable: '适合对数据隐私有极高要求的三甲医院与教学科研机构',
    color: '#004C99'
  }
];

const cooperationModels: CooperationModel[] = [
  {
    id: 1,
    title: '临床试点合作',
    description: '医院免费/优惠部署系统，开展真实世界临床应用',
    icon: 'users',
    benefits: [
      '共同收集数据、优化模型',
      '共享临床成果与案例宣传',
      '获得优先技术支持',
      '参与产品功能优化'
    ]
  },
  {
    id: 2,
    title: '联邦学习网络共建',
    description: '加入 AP 多中心联邦学习联盟，参与模型训练',
    icon: 'network',
    benefits: [
      '数据不出院，隐私零风险',
      '共享更精准的全局模型',
      '提升本院科研与诊疗水平',
      '联合发表科研成果'
    ]
  },
  {
    id: 3,
    title: '科研课题合作',
    description: '联合申报国家级/省部级课题，发表高分 SCI 论文',
    icon: 'book',
    benefits: [
      '支持临床研究设计',
      '提供统计分析与论文撰写',
      '联合申请发明专利',
      '共享研究数据与成果'
    ]
  },
  {
    id: 4,
    title: '医联体/区域推广合作',
    description: '面向区域医疗中心，共建 AP 精准诊疗规范',
    icon: 'map',
    benefits: [
      '实现分级诊疗智能化',
      '重症早筛与双向转诊',
      '区域协同诊疗网络',
      '统一质控标准'
    ]
  }
];

const processSteps: ProcessStep[] = [
  {
    id: 1,
    title: '提交合作意向',
    description: '在线填写合作申请表',
    icon: 'file',
    details: [
      '填写基本信息与合作意向',
      '提交至项目合作办公室',
      '1 个工作日内初步回复'
    ]
  },
  {
    id: 2,
    title: '初步沟通与需求评估',
    description: '专职联络员对接沟通',
    details: [
      '了解医院信息化基础',
      '评估临床使用场景',
      '确定合作模式与部署方案'
    ]
  },
  {
    id: 3,
    title: '方案定制与伦理报备',
    description: '制定个性化实施方案',
    details: [
      '提供详细技术方案',
      '协助伦理审查报备',
      '准备合作协议草案'
    ]
  },
  {
    id: 4,
    title: '签署合作协议',
    description: '明确双方权责',
    details: [
      '审议并签署合作协议',
      '明确数据使用与知识产权',
      '确定时间节点与交付物'
    ]
  },
  {
    id: 5,
    title: '部署实施与培训',
    description: '系统部署与人员培训',
    details: [
      '完成系统部署与调试',
      '组织临床操作培训',
      '建立技术支持通道'
    ]
  },
  {
    id: 6,
    title: '临床落地与持续迭代',
    description: '正式投入使用',
    details: [
      '开展临床应用',
      '定期随访与效果评估',
      '模型持续优化迭代'
    ]
  }
];

const getIcon = (iconName: string, className: string = "w-6 h-6") => {
  switch (iconName) {
    case 'cloud':
      return <Cloud className={className} />;
    case 'server':
      return <Server className={className} />;
    case 'users':
      return <Users className={className} />;
    case 'network':
      return <Network className={className} />;
    case 'book':
      return <BookOpen className={className} />;
    case 'map':
      return <MapPin className={className} />;
    case 'file':
      return <FileText className={className} />;
    default:
      return <CheckCircle className={className} />;
  }
};

export default function CooperationSection({ lang }: CooperationSectionProps) {
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [showDownloadForm, setShowDownloadForm] = useState(false);
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const [applicationForm, setApplicationForm] = useState({
    name: '',
    institution: '',
    department: '',
    phone: '',
    email: '',
    cooperationType: ''
  });

  const handleApplicationSubmit = () => {
    alert('申请已提交！我们将在 1 个工作日内与您联系。');
    setShowApplicationForm(false);
  };

  const handleDownloadSubmit = () => {
    alert('正在下载：PancreaAgent-AI_合作方案手册.pdf');
    setShowDownloadForm(false);
  };

  return (
    <section id="cooperation" className="py-28 md:py-32 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 标题区域 */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#0066CC] mb-4">
            灵活的部署方式，开放的合作网络
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            适配不同医院信息化与隐私合规要求，多维度合作模式，共同推进急性胰腺炎精准诊疗落地
          </p>
        </div>

        {/* 两种部署方式对比 */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            两种合规部署方案
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {deploymentOptions.map((option) => (
              <div
                key={option.id}
                className="bg-white rounded-2xl shadow-soft overflow-hidden hover:shadow-large hover:-translate-y-1 transition-all duration-300"
              >
                {/* 头部 */}
                <div 
                  className="p-6 text-white"
                  style={{ backgroundColor: option.color }}
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className="p-3 bg-white/20 rounded-lg">
                      {getIcon(option.icon, "w-8 h-8 text-white")}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold">{option.name}</h4>
                      <p className="text-sm opacity-90">{option.subtitle}</p>
                    </div>
                  </div>
                </div>

                {/* 特性对比 */}
                <div className="p-6 space-y-4">
                  <h5 className="font-semibold text-gray-900 mb-3">核心特性对比</h5>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-[#0066CC] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">隐私安全</p>
                        <p className="text-sm text-gray-600">{option.features.privacy}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <DollarSign className="w-5 h-5 text-[#0066CC] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">部署成本</p>
                        <p className="text-sm text-gray-600">{option.features.cost}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Wrench className="w-5 h-5 text-[#0066CC] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">维护难度</p>
                        <p className="text-sm text-gray-600">{option.features.maintenance}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <RefreshCw className="w-5 h-5 text-[#0066CC] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">迭代速度</p>
                        <p className="text-sm text-gray-600">{option.features.update}</p>
                      </div>
                    </div>
                  </div>

                  {/* 适用场景 */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold text-gray-900">适用场景：</span>
                      {option.suitable}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 多元化合作模式 */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            多元化合作模式
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {cooperationModels.map((model) => (
              <div
                key={model.id}
                className="bg-white rounded-2xl shadow-soft p-6 hover:shadow-medium transition-all"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-[#E8F3FF] rounded-lg flex-shrink-0">
                    {getIcon(model.icon, "w-8 h-8 text-[#0066CC]")}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{model.title}</h4>
                    <p className="text-gray-700">{model.description}</p>
                  </div>
                </div>
                
                <ul className="space-y-2">
                  {model.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-5 h-5 text-[#0066CC] flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* 标准合作流程 */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            标准合作流程
          </h3>
          <div className="bg-white rounded-2xl shadow-soft p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {processSteps.map((step, index) => (
                <div
                  key={step.id}
                  className="relative cursor-pointer"
                  onClick={() => setExpandedStep(expandedStep === step.id ? null : step.id)}
                >
                  {/* 步骤序号 */}
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 bg-[#0066CC] text-white rounded-full flex items-center justify-center font-bold text-lg">
                      {step.id}
                    </div>
                    <ArrowRight className="w-6 h-6 text-gray-300 hidden md:block" />
                  </div>

                  {/* 步骤内容 */}
                  <div className="ml-16">
                    <h4 className="font-bold text-gray-900 mb-2">{step.title}</h4>
                    <p className="text-sm text-gray-600 mb-3">{step.description}</p>
                    
                    {/* 展开详情 */}
                    {expandedStep === step.id && (
                      <div className="bg-[#E8F3FF] rounded-lg p-4 mt-3">
                        <ul className="space-y-2">
                          {step.details.map((detail, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                              <div className="w-1.5 h-1.5 bg-[#0066CC] rounded-full mt-1.5 flex-shrink-0" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {expandedStep !== step.id && (
                      <p className="text-xs text-[#0066CC] font-medium">
                        点击展开详情
                      </p>
                    )}
                  </div>

                  {/* 连接线 */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-6 left-16 w-full h-0.5 bg-gradient-to-r from-[#0066CC] to-transparent" />
                  )}
                </div>
              ))}
            </div>

            {/* 服务保障 */}
            <div className="mt-12 pt-8 border-t border-gray-200 text-center">
              <p className="text-gray-700">
                <span className="font-semibold text-[#0066CC]">全程服务保障：</span>
                配备专职临床联络与技术实施团队，保障上线效率与使用体验
              </p>
            </div>
          </div>
        </div>

        {/* 合作中心地图示意 */}
        <div className="mb-20 bg-[#F5F7FA] rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            合作中心分布
          </h3>
          <div className="relative aspect-[2/1] bg-gradient-to-br from-[#E8F3FF] to-white rounded-xl flex items-center justify-center">
            {/* 简化地图示意 */}
            <div className="text-center">
              <Globe className="w-32 h-32 text-[#0066CC]/20 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">合作网络覆盖全国</p>
              <div className="flex justify-center gap-8 mt-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#0066CC] rounded-full animate-pulse" />
                  <span className="text-sm text-gray-600">北京</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#0066CC] rounded-full animate-pulse" />
                  <span className="text-sm text-gray-600">上海</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#0066CC] rounded-full animate-pulse" />
                  <span className="text-sm text-gray-600">成都</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#0066CC] rounded-full animate-pulse" />
                  <span className="text-sm text-gray-600">广州</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#0066CC] rounded-full animate-pulse" />
                  <span className="text-sm text-gray-600">杭州</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 行动按钮 */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            立即开启合作之旅
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => setShowApplicationForm(true)}
              className="px-8 py-4 bg-[#0066CC] hover:bg-[#004C99] text-white rounded-lg font-bold text-lg transition-all shadow-medium hover:shadow-large flex items-center gap-3"
            >
              <Users className="w-6 h-6" />
              立即申请合作咨询
            </button>
            <button
              onClick={() => setShowDownloadForm(true)}
              className="px-8 py-4 bg-white border-2 border-[#0066CC] text-[#0066CC] hover:bg-[#E8F3FF] rounded-lg font-bold text-lg transition-all flex items-center gap-3"
            >
              <Download className="w-6 h-6" />
              下载合作方案手册
            </button>
          </div>
        </div>
      </div>

      {/* 合作申请表单弹窗 */}
      {showApplicationForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-large max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">合作咨询申请</h3>
              <button
                onClick={() => setShowApplicationForm(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  姓名 *
                </label>
                <input
                  type="text"
                  value={applicationForm.name}
                  onChange={(e) => setApplicationForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
                  placeholder="请输入您的姓名"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  单位 *
                </label>
                <input
                  type="text"
                  value={applicationForm.institution}
                  onChange={(e) => setApplicationForm(prev => ({ ...prev, institution: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
                  placeholder="请输入医院/机构全称"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  科室 *
                </label>
                <select
                  value={applicationForm.department}
                  onChange={(e) => setApplicationForm(prev => ({ ...prev, department: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
                >
                  <option value="">请选择科室</option>
                  <option value="消化内科">消化内科</option>
                  <option value="重症医学科">重症医学科</option>
                  <option value="急诊科">急诊科</option>
                  <option value="放射科">放射科</option>
                  <option value="科研处">科研处</option>
                  <option value="其他">其他</option>
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    电话 *
                  </label>
                  <input
                    type="tel"
                    value={applicationForm.phone}
                    onChange={(e) => setApplicationForm(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
                    placeholder="请输入联系电话"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    邮箱 *
                  </label>
                  <input
                    type="email"
                    value={applicationForm.email}
                    onChange={(e) => setApplicationForm(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
                    placeholder="请输入工作邮箱"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  意向合作类型 *
                </label>
                <select
                  value={applicationForm.cooperationType}
                  onChange={(e) => setApplicationForm(prev => ({ ...prev, cooperationType: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
                >
                  <option value="">请选择合作类型</option>
                  <option value="临床试点">临床试点合作</option>
                  <option value="联邦学习">联邦学习网络共建</option>
                  <option value="科研课题">科研课题合作</option>
                  <option value="医联体">医联体/区域推广</option>
                  <option value="其他">其他</option>
                </select>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowApplicationForm(false)}
                  className="flex-1 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={handleApplicationSubmit}
                  className="flex-1 py-3 bg-[#0066CC] hover:bg-[#004C99] text-white rounded-lg transition-colors font-medium"
                >
                  提交申请
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 下载合作方案手册表单 */}
      {showDownloadForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-large max-w-md w-full">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">下载合作方案手册</h3>
              <button
                onClick={() => setShowDownloadForm(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <p className="text-sm text-gray-600">
                请填写以下信息，获取完整的合作方案手册（PDF 格式）
              </p>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  姓名
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
                  placeholder="请输入您的姓名"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  单位
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
                  placeholder="请输入医院/机构名称"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  邮箱 *
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
                  placeholder="用于接收手册文件"
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowDownloadForm(false)}
                  className="flex-1 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={handleDownloadSubmit}
                  className="flex-1 py-3 bg-[#0066CC] hover:bg-[#004C99] text-white rounded-lg transition-colors font-medium"
                >
                  确认下载
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
