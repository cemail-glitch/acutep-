'use client';

import React, { useState, useEffect } from 'react';
import { 
  Activity,
  Mail,
  Phone,
  Globe,
  ChevronUp,
  FileText,
  Shield,
  BookOpen,
  Building,
  ExternalLink
} from 'lucide-react';

interface FooterProps {
  lang: 'en' | 'zh';
}

const navigationLinks = [
  { name: '首页', href: '#hero' },
  { name: '临床痛点', href: '#pain-points' },
  { name: '核心技术', href: '#technology' },
  { name: '产品演示', href: '#product-demo' },
  { name: '专家团队', href: '#team' },
  { name: '合作方式', href: '#cooperation' }
];

const contactChannels = [
  {
    type: '科研合作',
    email: 'research@pancreaagent.com',
    phone: null,
    icon: 'mail'
  },
  {
    type: '医院/商务合作',
    email: 'cooperation@pancreaagent.com',
    phone: '400-XXXX-XXXX',
    icon: 'phone'
  },
  {
    type: '技术支持',
    email: 'support@pancreaagent.com',
    phone: null,
    icon: 'mail'
  }
];

const academicLinks = [
  { name: '中华医学会消化病学分会', url: 'https://www.cma.org.cn' },
  { name: '中国急性胰腺炎诊疗指南', url: '#' },
  { name: 'ClinicalTrials.gov', url: 'https://clinicaltrials.gov' }
];

const partnerLinks = [
  { name: '北京协和医院', url: 'https://www.pumch.cn' },
  { name: '上海瑞金医院', url: 'https://www.rjh.com.cn' },
  { name: '四川大学华西医院', url: 'https://www.wchscu.cn' }
];

const complianceLinks = [
  { name: '隐私政策', url: '#privacy' },
  { name: '服务条款', url: '#terms' },
  { name: '合规资质公示', url: '#compliance' },
  { name: '网站地图', url: '#sitemap' }
];

export default function Footer({ lang }: FooterProps) {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#004C99] text-white">
      {/* 主内容区 - 3 列网格 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* 第一列：品牌区 */}
          <div className="space-y-3">
            {/* 品牌标识 */}
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-white/10 rounded-lg">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold">PancreaScan-AI™</span>
            </div>

            {/* 项目简介 */}
            <div className="text-xs text-[#E8F3FF] leading-relaxed">
              <p>
                国内首个基于动态心率轨迹 LCTM 分型的 AP 异质性分型及早期预测诊疗 Agent，
                为 AP 患者打造全流程个性化精准诊疗闭环。
              </p>
            </div>

            {/* 免责声明 */}
            <div className="bg-white/10 rounded-lg p-3 text-xs text-[#E8F3FF] leading-relaxed">
              <div className="flex items-start gap-2 mb-1.5">
                <Shield className="w-3.5 h-3.5 text-white flex-shrink-0 mt-0.5" />
                <span className="font-semibold text-white">免责声明</span>
              </div>
              <p>
                本系统仅作为临床诊疗辅助工具，所有诊疗决策必须由执业医师结合患者具体情况做出。
              </p>
            </div>
          </div>

          {/* 第二列：导航区 */}
          <div>
            <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
              <Globe className="w-4 h-4" />
              网站导航
            </h3>
            <ul className="space-y-1.5">
              {navigationLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-xs text-[#E8F3FF] hover:text-white hover:underline transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 第三列：联系区 */}
          <div>
            <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              联系我们
            </h3>
            <div className="space-y-2">
              {contactChannels.slice(0, 2).map((channel, index) => (
                <div key={index} className="space-y-1">
                  <p className="text-xs font-semibold text-white">{channel.type}</p>
                  {channel.email && (
                    <a
                      href={`mailto:${channel.email}`}
                      className="flex items-center gap-1.5 text-xs text-[#E8F3FF] hover:text-white transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      {channel.email}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 底部版权栏 */}
        <div className="border-t border-white/10 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-[#E8F3FF]">
              © 2025 PancreaScan-AI Technologies Inc. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {complianceLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="text-xs text-[#E8F3FF] hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 返回顶部按钮 */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-white text-[#004C99] p-3 rounded-full shadow-lg hover:bg-gray-50 transition-all z-50"
          aria-label="返回顶部"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}
    </footer>
  );
}
