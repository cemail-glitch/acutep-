'use client';

import React, { useState, useEffect } from 'react';
import {
  Activity,
  Mail,
  Phone,
  MapPin,
  ArrowUp,
  Shield,
  FileText,
  ExternalLink,
  ArrowRight
} from 'lucide-react';

interface FooterProps {
  lang: 'en' | 'zh';
}

const footerLinks = [
  { label: '首页', href: '#' },
  { label: '核心技术', href: '#tech' },
  { label: '产品演示', href: '#demo' },
  { label: '关于我们', href: '#team' }
];

const contactInfo = [
  { icon: Mail, label: 'contact@yijian-med.com', href: 'mailto:contact@yijian-med.com' },
  { icon: Phone, label: '400-888-9999', href: 'tel:400-888-9999' },
  { icon: MapPin, label: '江西省南昌市', href: '#' }
];

export default function Footer({ lang }: FooterProps) {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-b from-primary to-primary-dark text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent-light rounded-xl flex items-center justify-center shadow-lg">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold">胰见</span>
                <span className="block text-sm text-white/60">急性胰腺炎无创评估智能体</span>
              </div>
            </div>
            <p className="text-white/70 leading-relaxed mb-6 max-w-md">
              {lang === 'zh'
                ? '全球首款急性胰腺炎无创评估智能体。以"AP特征面+轨迹解密+蜂群网络"三大核心技术，破解急性胰腺炎诊疗瓶颈，助力分级诊疗与医疗资源下沉。'
                : 'World\'s first non-invasive AP assessment AI. With "Facial Features + Trajectory + Swarm Network" core technologies, solving AP diagnosis bottlenecks.'}
            </p>
            <div className="flex items-center gap-4 mb-6">
              <Shield className="w-5 h-5 text-accent-light" />
              <span className="text-sm text-white/60">符合医疗数据隐私合规要求</span>
            </div>
            <button className="bg-gradient-to-r from-accent to-accent-light text-white px-6 py-2.5 rounded-full font-semibold hover:shadow-lg hover:shadow-accent/25 transition-all inline-flex items-center gap-2 text-sm">
              {lang === 'zh' ? '商务合作咨询' : 'Business Cooperation'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{lang === 'zh' ? '快速链接' : 'Quick Links'}</h4>
            <ul className="space-y-3">
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-white/60 hover:text-white transition-colors text-sm flex items-center gap-1 group">
                    <span>{link.label}</span>
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{lang === 'zh' ? '联系我们' : 'Contact Us'}</h4>
            <ul className="space-y-3">
              {contactInfo.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <item.icon className="w-4 h-4 text-accent-light flex-shrink-0" />
                  <a href={item.href} className="text-white/60 hover:text-white transition-colors text-sm">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/50">
            {lang === 'zh'
              ? '© 2025 江西胰见科技有限责任公司. 保留所有权利.'
              : '© 2025 Jiangxi Yijian Technology Co., Ltd. All rights reserved.'}
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-white/50 hover:text-white text-sm transition-colors">
              {lang === 'zh' ? '隐私政策' : 'Privacy Policy'}
            </a>
            <a href="#" className="text-white/50 hover:text-white text-sm transition-colors">
              {lang === 'zh' ? '服务条款' : 'Terms of Service'}
            </a>
          </div>
        </div>
      </div>

      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 w-12 h-12 bg-gradient-to-br from-accent to-accent-light text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center z-50 ${
          showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label={lang === 'zh' ? '返回顶部' : 'Back to top'}
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </footer>
  );
}