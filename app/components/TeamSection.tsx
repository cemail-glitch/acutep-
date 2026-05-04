'use client';

import React from 'react';
import Image from 'next/image';
import {
  Users,
  Globe,
  Award,
  CheckCircle,
  Microscope,
  ArrowRight,
  Building2,
  Heart,
  User
} from 'lucide-react';

interface TeamSectionProps {
  lang: 'en' | 'zh';
}

const experts = [
    {
      id: 1,
      name: '金佳保',
      title: '创始人',
      institution: '南昌大学第一附属医院',
      role: '项目创始人',
      researchDirection: '依托南昌大学科研训练平台，进入"胰见"项目组开展临床实践与科研探索',
      achievements: ['临床调研与各级医院实地走访', '急性胰腺炎智能诊疗研发'],
      icon: User,
      color: 'from-accent to-accent-light'
    },
    {
      id: 2,
      name: '南昌大学第一附属医院',
      title: '牵头单位',
      institution: '江西省消化研究所',
      role: '临床验证基地',
      researchDirection: '急性胰腺炎多中心临床研究',
      achievements: ['SAP预警准确率89.5%', '多中心数据验证'],
      icon: null,
      iconSrc: '/c7f1dbb85e10e235.png',
      color: 'from-accent to-accent-light'
    },
    {
      id: 3,
      name: '跨学科复合团队',
      title: '医学 + 计算机 + 经济',
      institution: '南昌大学',
      role: '技术研发',
      researchDirection: 'AI算法 + 边缘密算 + 临床医学',
      achievements: ['完整知识产权壁垒', '三大核心技术'],
      icon: null,
      iconSrc: '/标准-图.png',
      color: 'from-primary to-primary-light'
    }
  ];

const teamAdvantages = [
  {
    icon: Award,
    title: '原创技术壁垒',
    desc: '形成完整知识产权保护，数字望诊+轨迹解密+蜂群网络三大核心专利'
  },
  {
    icon: CheckCircle,
    title: '多中心验证',
    desc: '南昌大学第一附属医院等多中心临床验证，模型泛化性已验证'
  },
  {
    icon: Globe,
    title: '产学研协同',
    desc: '依托南昌大学科研平台与江西省消化研究所，医工深度融合'
  }
];

export default function TeamSection({ lang }: TeamSectionProps) {
  return (
    <section id="team" className="py-20 md:py-28 bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {lang === 'zh' ? '核心团队' : 'Core Team'}
          </h2>
          <p className="text-base text-primary/70 max-w-2xl mx-auto">
            {lang === 'zh'
              ? '依托南昌大学科研平台与江西省消化研究所，组建跨医学、计算机、经济复合型团队'
              : 'Interdisciplinary team from Nanchang University and Jiangxi Digestive Research Institute'}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {experts.map((expert) => (
            <div
              key={expert.id}
              className="bg-white rounded-2xl p-6 border border-accent/10 hover:shadow-lg transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center flex-shrink-0 overflow-hidden border border-accent/20">
                  {expert.iconSrc ? (
                    <Image src={expert.iconSrc} alt={expert.name} width={40} height={40} className="object-contain" />
                  ) : (
                    typeof expert.icon === 'function' ? (
                      <expert.icon className="w-7 h-7 text-accent" />
                    ) : null
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-primary mb-1">{expert.name}</h3>
                  <p className="text-sm text-accent font-medium mb-1">{expert.title}</p>
                  <p className="text-xs text-primary/60 mb-2">{expert.institution}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-2 py-1 bg-bg-secondary text-primary/70 text-xs rounded-full">{expert.role}</span>
                  </div>
                </div>
              </div>
              <div className="border-t border-accent/10 pt-4 mt-4">
                <p className="text-sm text-primary/80 mb-3 leading-relaxed">{expert.researchDirection}</p>
                <div className="flex flex-wrap gap-2">
                  {expert.achievements.map((ach, i) => (
                    <span key={i} className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      {ach}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-primary to-primary rounded-3xl p-8 md:p-12">
          <h3 className="text-xl font-bold text-white mb-8 text-center">
            {lang === 'zh' ? '团队核心优势' : 'Team Advantages'}
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {teamAdvantages.map((adv, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent-light rounded-xl flex items-center justify-center mb-4">
                  <adv.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{adv.title}</h4>
                <p className="text-sm text-white/70">{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-primary/60 mb-4">
            {lang === 'zh' ? '拟成立：江西胰见科技有限责任公司' : 'To be established: Jiangxi Yijian Technology Co., Ltd.'}
          </p>
          <button className="bg-gradient-to-r from-accent to-accent-light text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all inline-flex items-center gap-2">
            {lang === 'zh' ? '商务合作咨询' : 'Business Cooperation'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}