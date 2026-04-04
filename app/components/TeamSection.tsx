'use client';

import React, { useState } from 'react';
import { 
  Users, 
  Globe, 
  X, 
  Award, 
  BookOpen, 
  FileText,
  Stethoscope,
  Brain,
  Microscope
} from 'lucide-react';

interface TeamSectionProps {
  lang: 'en' | 'zh';
}

interface Expert {
  id: number;
  name: string;
  title: string;
  institution: string;
  role: string;
  researchDirection: string;
  achievements: string[];
  image: string;
  icon: 'stethoscope' | 'brain' | 'microscope' | 'award';
}

interface Hospital {
  id: number;
  name: string;
  department: string;
  logo: string;
  cooperationContent: string;
}

const experts: Expert[] = [
  {
    id: 1,
    name: '张教授',
    title: '主任医师 / 博士生导师',
    institution: '北京协和医院 消化内科',
    role: '首席科学家 / 项目负责人',
    researchDirection: '急性胰腺炎精准诊疗、人工智能在消化系统疾病中的应用',
    achievements: [
      '主持国家自然科学基金重点项目 3 项',
      '发表 SCI 论文 80 余篇（包括 Gastroenterology、Gut 等顶级期刊）',
      '获省部级科技进步一等奖 2 项',
      '中华医学会消化病学分会委员'
    ],
    image: '/experts/expert1.jpg',
    icon: 'stethoscope'
  },
  {
    id: 2,
    name: '李教授',
    title: '主任医师 / ICU 主任',
    institution: '上海交通大学医学院附属瑞金医院 重症医学科',
    role: '临床负责人',
    researchDirection: '重症急性胰腺炎的救治与临床研究、多器官功能衰竭支持治疗',
    achievements: [
      '牵头制定《中国急性胰腺炎诊疗指南（2024 版）》',
      '主持国家重点研发计划 1 项',
      '发表 SCI 论文 60 余篇',
      '中国医师协会重症医学医师分会常委'
    ],
    image: '/experts/expert2.jpg',
    icon: 'stethoscope'
  },
  {
    id: 3,
    name: '王教授',
    title: '教授 / 博士生导师',
    institution: '清华大学 计算机科学与技术系',
    role: 'AI 技术负责人',
    researchDirection: '医疗机器学习、联邦学习、计算机视觉',
    achievements: [
      '在 NeurIPS、ICML、Nature Medicine 等顶级会议/期刊发表论文 50 余篇',
      '拥有 AI 发明专利 30 余项',
      '国家杰出青年科学基金获得者',
      'IEEE Fellow'
    ],
    image: '/experts/expert3.jpg',
    icon: 'brain'
  },
  {
    id: 4,
    name: '赵教授',
    title: '主任医师 / 放射科主任',
    institution: '四川大学华西医院 放射科',
    role: '影像技术负责人',
    researchDirection: '医学影像组学、炎症性疾病影像诊断、AI 辅助诊断',
    achievements: [
      '主持国家自然科学基金面上项目 4 项',
      '发表 SCI 论文 70 余篇（包括 Radiology 等）',
      '获国家科技进步二等奖 1 项',
      '中华医学会放射学分会委员'
    ],
    image: '/experts/expert4.jpg',
    icon: 'microscope'
  }
];

const hospitals: Hospital[] = [
  {
    id: 1,
    name: '北京协和医院',
    department: '消化内科',
    logo: '/hospitals/pumch.png',
    cooperationContent: '牵头多中心临床研究，负责模型训练与验证，提供高质量标注数据集 1200 例'
  },
  {
    id: 2,
    name: '上海瑞金医院',
    department: '重症医学科',
    logo: '/hospitals/rijin.png',
    cooperationContent: '负责重症患者队列研究，参与联邦学习网络建设，提供 ICU 临床数据 800 例'
  },
  {
    id: 3,
    name: '四川大学华西医院',
    department: '消化内科',
    logo: '/hospitals/huaxi.png',
    cooperationContent: '负责外部验证队列研究，参与 LCTM 分型优化，提供验证数据 950 例'
  },
  {
    id: 4,
    name: '中山大学附属第一医院',
    department: '急诊科',
    logo: '/hospitals/first-affiliated.png',
    cooperationContent: '负责超早期预警模型验证，参与面部识别数据采集，提供急诊数据 600 例'
  },
  {
    id: 5,
    name: '浙江大学医学院附属第二医院',
    department: '重症医学科',
    logo: '/hospitals/zju2.png',
    cooperationContent: '负责 LLM 循证方案临床评估，参与多中心 RCT 研究，提供数据 700 例'
  }
];

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'stethoscope':
      return <Stethoscope className="w-8 h-8" />;
    case 'brain':
      return <Brain className="w-8 h-8" />;
    case 'microscope':
      return <Microscope className="w-8 h-8" />;
    case 'award':
      return <Award className="w-8 h-8" />;
    default:
      return <Award className="w-8 h-8" />;
  }
};

export default function TeamSection({ lang }: TeamSectionProps) {
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
  const [hoveredHospital, setHoveredHospital] = useState<number | null>(null);

  const scrollToCooperation = () => {
    const element = document.getElementById('cooperation');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="team" className="py-28 md:py-32 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 标题区域 */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#0066CC] mb-4">
            多学科、多中心团队，保障项目临床落地
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            汇聚国内顶尖消化内科、重症医学与人工智能专家，联合多家三甲医院，构建产学研协同创新生态
          </p>
        </div>

        {/* 专家团队照片墙 */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-[#0066CC]/10 rounded-lg">
              <Users className="w-8 h-8 text-[#0066CC]" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">核心专家团队</h3>
          </div>

          {/* 专家卡片网格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {experts.map((expert) => (
              <div
                key={expert.id}
                className="bg-gradient-to-br from-[#E8F3FF] to-white rounded-2xl shadow-soft overflow-hidden hover:shadow-medium transition-all cursor-pointer group"
                onClick={() => setSelectedExpert(expert)}
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    {/* 专家头像 */}
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#0066CC] to-[#004C99] flex items-center justify-center text-white shadow-medium group-hover:shadow-large transition-all">
                        {getIcon(expert.icon)}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                        <Award className="w-4 h-4 text-[#0066CC]" />
                      </div>
                    </div>

                    {/* 专家信息 */}
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-[#0066CC] mb-1">{expert.name}</h4>
                      <p className="text-sm text-gray-600 mb-1">{expert.title}</p>
                      <p className="text-sm text-gray-500 mb-2">{expert.institution}</p>
                      <div className="inline-block px-3 py-1 bg-[#0066CC]/10 rounded-full text-xs font-medium text-[#0066CC]">
                        {expert.role}
                      </div>
                    </div>
                  </div>

                  {/* 研究方向 */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-700 line-clamp-2">
                      <span className="font-medium text-gray-900">研究方向：</span>
                      {expert.researchDirection}
                    </p>
                  </div>

                  {/* 查看详情按钮 */}
                  <div className="mt-4 flex items-center text-[#0066CC] text-sm font-medium group-hover:underline">
                    <BookOpen className="w-4 h-4 mr-2" />
                    查看完整简介
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 团队核心优势 */}
          <div className="mt-12 bg-white rounded-2xl shadow-soft p-8">
            <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Award className="w-6 h-6 text-[#0066CC]" />
              团队核心优势
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-[#E8F3FF] rounded-lg flex items-center justify-center">
                  <Stethoscope className="w-6 h-6 text-[#0066CC]" />
                </div>
                <h5 className="font-semibold text-gray-900">临床与 AI 深度融合</h5>
                <p className="text-sm text-gray-600 leading-relaxed">
                  消化内科、ICU 临床专家全程参与算法设计与模型迭代，确保技术方案符合临床实践，解决真实临床痛点
                </p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 bg-[#E8F3FF] rounded-lg flex items-center justify-center">
                  <Brain className="w-6 h-6 text-[#0066CC]" />
                </div>
                <h5 className="font-semibold text-gray-900">产学研协同创新</h5>
                <p className="text-sm text-gray-600 leading-relaxed">
                  联合高校 AI 实验室与医院临床中心，实现从基础研究到临床转化的全链条创新，加速技术落地
                </p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 bg-[#E8F3FF] rounded-lg flex items-center justify-center">
                  <Globe className="w-6 h-6 text-[#0066CC]" />
                </div>
                <h5 className="font-semibold text-gray-900">多中心验证网络</h5>
                <p className="text-sm text-gray-600 leading-relaxed">
                  依托已建立的多中心合作网络，快速完成模型的外部验证与优化，确保模型的泛化性与可靠性
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 合作中心 Logo 墙 */}
        <div className="bg-[#F5F7FA] rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-white rounded-lg shadow-sm">
              <Globe className="w-8 h-8 text-[#0066CC]" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">合作中心网络</h3>
          </div>

          {/* Logo 墙网格 */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-10">
            {hospitals.map((hospital) => (
              <div
                key={hospital.id}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-medium transition-all cursor-pointer group"
                onMouseEnter={() => setHoveredHospital(hospital.id)}
                onMouseLeave={() => setHoveredHospital(null)}
              >
                {/* Logo 占位 */}
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-50 rounded-lg mb-4 flex items-center justify-center group-hover:from-[#E8F3FF] group-hover:to-white transition-all">
                  <Globe className="w-12 h-12 text-gray-400 group-hover:text-[#0066CC] transition-colors" />
                </div>
                
                {/* 医院信息 */}
                <h4 className="text-sm font-bold text-gray-900 text-center mb-1">{hospital.name}</h4>
                <p className="text-xs text-gray-500 text-center">{hospital.department}</p>

                {/* Hover 信息 */}
                {hoveredHospital === hospital.id && (
                  <div className="absolute mt-2 w-64 bg-white rounded-lg shadow-large p-4 border border-gray-200 z-10">
                    <p className="text-sm text-gray-700">{hospital.cooperationContent}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 合作引导文案 */}
          <div className="text-center mb-8">
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              我们诚挚邀请更多有远见的医疗机构加入我们的合作网络，共同推动急性胰腺炎精准诊疗的发展
            </p>
            <button
              onClick={scrollToCooperation}
              className="px-8 py-4 bg-[#0066CC] hover:bg-[#004C99] text-white rounded-lg font-medium transition-all shadow-medium hover:shadow-large inline-flex items-center gap-2"
            >
              <Users className="w-5 h-5" />
              申请加入合作网络
            </button>
          </div>

          {/* 合作数据展示 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-gray-200">
            <div className="text-center">
              <p className="text-3xl font-bold text-[#0066CC] mb-2">5+</p>
              <p className="text-sm text-gray-600">核心合作中心</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-[#0066CC] mb-2">4,250+</p>
              <p className="text-sm text-gray-600">累计入组患者</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-[#0066CC] mb-2">10+</p>
              <p className="text-sm text-gray-600">参与研究专家</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-[#0066CC] mb-2">3</p>
              <p className="text-sm text-gray-600">多中心 RCT 研究</p>
            </div>
          </div>
        </div>

        {/* 悬浮合作咨询按钮 */}
        <div className="fixed bottom-8 right-8 z-40">
          <button
            onClick={scrollToCooperation}
            className="px-6 py-3 bg-white border-2 border-[#0066CC] text-[#0066CC] rounded-lg font-medium shadow-large hover:bg-[#E8F3FF] transition-all flex items-center gap-2"
          >
            <FileText className="w-5 h-5" />
            合作咨询
          </button>
        </div>
      </div>

      {/* 专家详情弹窗 */}
      {selectedExpert && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-large max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">专家简介</h3>
              <button
                onClick={() => setSelectedExpert(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="p-6">
              {/* 专家头部信息 */}
              <div className="flex items-start gap-6 mb-6">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#0066CC] to-[#004C99] flex items-center justify-center text-white shadow-medium flex-shrink-0">
                  {getIcon(selectedExpert.icon)}
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-[#0066CC] mb-2">{selectedExpert.name}</h4>
                  <p className="text-gray-700 mb-1">{selectedExpert.title}</p>
                  <p className="text-gray-600 mb-2">{selectedExpert.institution}</p>
                  <div className="inline-block px-4 py-2 bg-[#0066CC]/10 rounded-lg text-sm font-medium text-[#0066CC]">
                    {selectedExpert.role}
                  </div>
                </div>
              </div>

              {/* 研究方向 */}
              <div className="mb-6">
                <h5 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#0066CC]" />
                  研究方向
                </h5>
                <p className="text-gray-700 leading-relaxed bg-[#F5F7FA] rounded-lg p-4">
                  {selectedExpert.researchDirection}
                </p>
              </div>

              {/* 主要成就 */}
              <div>
                <h5 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#0066CC]" />
                  主要成就
                </h5>
                <ul className="space-y-2">
                  {selectedExpert.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#0066CC] rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-700">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 关闭按钮 */}
              <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                <button
                  onClick={() => setSelectedExpert(null)}
                  className="px-8 py-3 bg-[#0066CC] hover:bg-[#004C99] text-white rounded-lg font-medium transition-colors"
                >
                  关闭
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
