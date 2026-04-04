'use client';

import React, { useState, useEffect } from 'react';
import {
  Activity,
  Settings,
  User,
  Bell,
  Shield,
  Database,
  Globe,
  Moon,
  Sun,
  ChevronRight,
  Save,
  CheckCircle2,
  X,
  Loader2,
  Key,
  Mail,
  Smartphone,
  FileText,
  Lock,
  Eye,
  EyeOff,
  RefreshCw,
  Download,
  Upload,
  Trash2,
  AlertTriangle
} from 'lucide-react';

const translations = {
  en: {
    nav: {
      home: "Home",
      clinical: "Clinical Application",
      settings: "Settings"
    },
    header: {
      title: "Settings",
      subtitle: "Manage your account and application preferences"
    },
    tabs: {
      profile: "Profile",
      notifications: "Notifications",
      security: "Security",
      system: "System",
      data: "Data Management",
      api: "API Settings"
    },
    profile: {
      title: "Profile Settings",
      name: "Full Name",
      email: "Email",
      phone: "Phone",
      department: "Department",
      jobTitle: "Title",
      hospital: "Hospital",
      license: "Medical License",
      avatar: "Profile Photo",
      update: "Update Profile",
      updated: "Profile updated successfully"
    },
    notifications: {
      title: "Notification Settings",
      email: "Email Notifications",
      push: "Push Notifications",
      sms: "SMS Notifications",
      alerts: "Critical Alerts",
      reports: "Daily Reports",
      updates: "System Updates",
      save: "Save Preferences"
    },
    security: {
      title: "Security Settings",
      currentPassword: "Current Password",
      newPassword: "New Password",
      confirmPassword: "Confirm Password",
      twoFactor: "Two-Factor Authentication",
      twoFactorDesc: "Add an extra layer of security to your account",
      sessions: "Active Sessions",
      changePassword: "Change Password",
      passwordChanged: "Password changed successfully"
    },
    system: {
      title: "System Settings",
      language: "Language",
      theme: "Theme",
      light: "Light",
      dark: "Dark",
      auto: "Auto",
      timezone: "Timezone",
      dateFormat: "Date Format",
      save: "Save Settings"
    },
    data: {
      title: "Data Management",
      export: "Export Data",
      exportDesc: "Download all your data in JSON format",
      import: "Import Data",
      importDesc: "Import data from a backup file",
      clear: "Clear Cache",
      clearDesc: "Clear temporary files and cache",
      delete: "Delete Account",
      deleteDesc: "Permanently delete your account and all data",
      backup: "Create Backup",
      restore: "Restore Backup"
    },
    api: {
      title: "API Settings",
      key: "API Key",
      generate: "Generate New Key",
      regenerate: "Regenerate Key",
      usage: "API Usage",
      requests: "Requests Today",
      limit: "Daily Limit",
      webhook: "Webhook URL",
      docs: "API Documentation"
    }
  },
  zh: {
    nav: {
      home: "首页",
      clinical: "临床应用",
      settings: "设置"
    },
    header: {
      title: "设置",
      subtitle: "管理您的账户和应用偏好"
    },
    tabs: {
      profile: "个人资料",
      notifications: "通知设置",
      security: "安全设置",
      system: "系统设置",
      data: "数据管理",
      api: "API设置"
    },
    profile: {
      title: "个人资料设置",
      name: "姓名",
      email: "邮箱",
      phone: "电话",
      department: "科室",
      jobTitle: "职称",
      hospital: "医院",
      license: "执业证书",
      avatar: "头像",
      update: "更新资料",
      updated: "资料更新成功"
    },
    notifications: {
      title: "通知设置",
      email: "邮件通知",
      push: "推送通知",
      sms: "短信通知",
      alerts: "紧急警报",
      reports: "每日报告",
      updates: "系统更新",
      save: "保存设置"
    },
    security: {
      title: "安全设置",
      currentPassword: "当前密码",
      newPassword: "新密码",
      confirmPassword: "确认密码",
      twoFactor: "双因素认证",
      twoFactorDesc: "为您的账户添加额外的安全层",
      sessions: "活跃会话",
      changePassword: "修改密码",
      passwordChanged: "密码修改成功"
    },
    system: {
      title: "系统设置",
      language: "语言",
      theme: "主题",
      light: "浅色",
      dark: "深色",
      auto: "自动",
      timezone: "时区",
      dateFormat: "日期格式",
      save: "保存设置"
    },
    data: {
      title: "数据管理",
      export: "导出数据",
      exportDesc: "以JSON格式下载所有数据",
      import: "导入数据",
      importDesc: "从备份文件导入数据",
      clear: "清除缓存",
      clearDesc: "清除临时文件和缓存",
      delete: "删除账户",
      deleteDesc: "永久删除您的账户和所有数据",
      backup: "创建备份",
      restore: "恢复备份"
    },
    api: {
      title: "API设置",
      key: "API密钥",
      generate: "生成新密钥",
      regenerate: "重新生成",
      usage: "API使用情况",
      requests: "今日请求数",
      limit: "每日限额",
      webhook: "Webhook地址",
      docs: "API文档"
    }
  }
};

const SettingsPage = () => {
  const [lang, setLang] = useState<'en' | 'zh'>('zh');
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
  const [notifications, setNotifications] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  
  // Profile state
  const [profile, setProfile] = useState({
    name: '张医生',
    email: 'doctor@hospital.com',
    phone: '138****8888',
    department: '消化内科',
    title: '主任医师',
    hospital: '北京协和医院',
    license: '京医执字第12345号'
  });
  
  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    push: true,
    sms: false,
    alerts: true,
    reports: true,
    updates: false
  });
  
  // Security settings
  const [passwordForm, setPasswordForm] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [twoFactor, setTwoFactor] = useState(false);
  
  // System settings
  const [systemSettings, setSystemSettings] = useState({
    language: 'zh',
    theme: 'light',
    timezone: 'Asia/Shanghai',
    dateFormat: 'YYYY-MM-DD'
  });
  
  // API settings
  const [apiKey, setApiKey] = useState('sk-live-xxxxxxxxxxxxxxxxxxxxxxxx');
  const [apiUsage, setApiUsage] = useState({
    requests: 1250,
    limit: 5000
  });

  const t = translations[lang];

  const showNotification = (key: string, message: string) => {
    setNotifications(prev => ({ ...prev, [key]: message }));
    setTimeout(() => {
      setNotifications(prev => ({ ...prev, [key]: '' }));
    }, 3000);
  };

  const handleUpdateProfile = async () => {
    setLoading(prev => ({ ...prev, profile: true }));
    setTimeout(() => {
      setLoading(prev => ({ ...prev, profile: false }));
      showNotification('profile', t.profile.updated);
    }, 1500);
  };

  const handleChangePassword = async () => {
    if (passwordForm.new !== passwordForm.confirm) {
      showNotification('error', '两次输入的密码不一致');
      return;
    }
    setLoading(prev => ({ ...prev, password: true }));
    setTimeout(() => {
      setLoading(prev => ({ ...prev, password: false }));
      showNotification('password', t.security.passwordChanged);
      setPasswordForm({ current: '', new: '', confirm: '' });
    }, 1500);
  };

  const handleSaveNotifications = async () => {
    setLoading(prev => ({ ...prev, notifications: true }));
    setTimeout(() => {
      setLoading(prev => ({ ...prev, notifications: false }));
      showNotification('notifications', '通知设置已保存');
    }, 1000);
  };

  const handleSaveSystem = async () => {
    setLoading(prev => ({ ...prev, system: true }));
    setTimeout(() => {
      setLoading(prev => ({ ...prev, system: false }));
      showNotification('system', '系统设置已保存');
      setLang(systemSettings.language as 'en' | 'zh');
    }, 1000);
  };

  const handleGenerateApiKey = () => {
    setLoading(prev => ({ ...prev, apiKey: true }));
    setTimeout(() => {
      setApiKey('sk-live-' + Math.random().toString(36).substring(2, 30));
      setLoading(prev => ({ ...prev, apiKey: false }));
      showNotification('api', 'API密钥已重新生成');
    }, 1000);
  };

  const handleExportData = () => {
    setLoading(prev => ({ ...prev, export: true }));
    setTimeout(() => {
      setLoading(prev => ({ ...prev, export: false }));
      showNotification('export', '数据导出成功');
    }, 2000);
  };

  const handleClearCache = () => {
    setLoading(prev => ({ ...prev, cache: true }));
    setTimeout(() => {
      setLoading(prev => ({ ...prev, cache: false }));
      showNotification('cache', '缓存已清除');
    }, 1500);
  };

  const tabs = [
    { id: 'profile', label: t.tabs.profile, icon: User },
    { id: 'notifications', label: t.tabs.notifications, icon: Bell },
    { id: 'security', label: t.tabs.security, icon: Shield },
    { id: 'system', label: t.tabs.system, icon: Settings },
    { id: 'data', label: t.tabs.data, icon: Database },
    { id: 'api', label: t.tabs.api, icon: Key }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 通知提示 */}
      {Object.entries(notifications).map(([key, message]) => message && (
        <div key={key} className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg">
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
              <a href="/clinical" className="hover:text-medical-blue transition-colors">{t.nav.clinical}</a>
              <span className="text-medical-blue border-b-2 border-medical-blue">{t.nav.settings}</span>
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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                      activeTab === tab.id ? 'bg-blue-50 text-medical-blue border-l-4 border-medical-blue' : 'text-gray-700'
                    }`}
                  >
                    <Icon size={20} className="mr-3" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-gray-900">{t.profile.title}</h2>
                  
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-20 h-20 bg-medical-blue rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      {profile.name.charAt(0)}
                    </div>
                    <div>
                      <button className="bg-medical-blue text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                        {t.profile.avatar}
                      </button>
                      <p className="text-sm text-gray-500 mt-1">支持 JPG, PNG 格式</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t.profile.name}</label>
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-medical-blue focus:border-medical-blue"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t.profile.email}</label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-medical-blue focus:border-medical-blue"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t.profile.phone}</label>
                      <input
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-medical-blue focus:border-medical-blue"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t.profile.department}</label>
                      <input
                        type="text"
                        value={profile.department}
                        onChange={(e) => setProfile({ ...profile, department: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-medical-blue focus:border-medical-blue"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t.profile.jobTitle}</label>
                      <input
                        type="text"
                        value={profile.title}
                        onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-medical-blue focus:border-medical-blue"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t.profile.hospital}</label>
                      <input
                        type="text"
                        value={profile.hospital}
                        onChange={(e) => setProfile({ ...profile, hospital: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-medical-blue focus:border-medical-blue"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t.profile.license}</label>
                      <input
                        type="text"
                        value={profile.license}
                        onChange={(e) => setProfile({ ...profile, license: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-medical-blue focus:border-medical-blue"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={handleUpdateProfile}
                      disabled={loading.profile}
                      className="bg-medical-blue text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 disabled:opacity-50 flex items-center"
                    >
                      {loading.profile ? (
                        <><Loader2 className="animate-spin mr-2" size={18} /> 保存中...</>
                      ) : (
                        <><Save className="mr-2" size={18} /> {t.profile.update}</>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-gray-900">{t.notifications.title}</h2>
                  
                  <div className="space-y-4">
                    {[
                      { key: 'email', label: t.notifications.email, icon: Mail },
                      { key: 'push', label: t.notifications.push, icon: Bell },
                      { key: 'sms', label: t.notifications.sms, icon: Smartphone },
                      { key: 'alerts', label: t.notifications.alerts, icon: AlertTriangle },
                      { key: 'reports', label: t.notifications.reports, icon: FileText },
                      { key: 'updates', label: t.notifications.updates, icon: RefreshCw }
                    ].map((item) => {
                      const Icon = item.icon;
                      return (
                        <div key={item.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
                          <div className="flex items-center">
                            <Icon className="text-gray-400 mr-3" size={20} />
                            <span className="font-medium">{item.label}</span>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={notificationSettings[item.key as keyof typeof notificationSettings]}
                              onChange={(e) => setNotificationSettings({ ...notificationSettings, [item.key]: e.target.checked })}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-medical-blue"></div>
                          </label>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={handleSaveNotifications}
                      disabled={loading.notifications}
                      className="bg-medical-blue text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 disabled:opacity-50 flex items-center"
                    >
                      {loading.notifications ? (
                        <><Loader2 className="animate-spin mr-2" size={18} /> 保存中...</>
                      ) : (
                        <><Save className="mr-2" size={18} /> {t.notifications.save}</>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-gray-900">{t.security.title}</h2>
                  
                  {/* Password Change */}
                  <div className="p-4 border border-gray-200 rounded-md">
                    <h3 className="font-medium text-gray-900 mb-4">{t.security.changePassword}</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t.security.currentPassword}</label>
                        <div className="relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            value={passwordForm.current}
                            onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-medical-blue focus:border-medical-blue pr-10"
                          />
                          <button
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-2.5 text-gray-400"
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t.security.newPassword}</label>
                        <input
                          type="password"
                          value={passwordForm.new}
                          onChange={(e) => setPasswordForm({ ...passwordForm, new: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-medical-blue focus:border-medical-blue"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t.security.confirmPassword}</label>
                        <input
                          type="password"
                          value={passwordForm.confirm}
                          onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-medical-blue focus:border-medical-blue"
                        />
                      </div>
                      <button
                        onClick={handleChangePassword}
                        disabled={loading.password || !passwordForm.current || !passwordForm.new || !passwordForm.confirm}
                        className="bg-medical-blue text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 disabled:opacity-50 flex items-center"
                      >
                        {loading.password ? (
                          <><Loader2 className="animate-spin mr-2" size={16} /> 修改中...</>
                        ) : (
                          <><Lock className="mr-2" size={16} /> {t.security.changePassword}</>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Two-Factor Auth */}
                  <div className="p-4 border border-gray-200 rounded-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">{t.security.twoFactor}</h3>
                        <p className="text-sm text-gray-500 mt-1">{t.security.twoFactorDesc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={twoFactor}
                          onChange={(e) => setTwoFactor(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-medical-blue"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* System Tab */}
              {activeTab === 'system' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-gray-900">{t.system.title}</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t.system.language}</label>
                      <select
                        value={systemSettings.language}
                        onChange={(e) => setSystemSettings({ ...systemSettings, language: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-medical-blue focus:border-medical-blue"
                      >
                        <option value="zh">中文</option>
                        <option value="en">English</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t.system.theme}</label>
                      <div className="flex space-x-4">
                        {['light', 'dark', 'auto'].map((theme) => (
                          <button
                            key={theme}
                            onClick={() => setSystemSettings({ ...systemSettings, theme })}
                            className={`flex items-center px-4 py-2 border rounded-md ${
                              systemSettings.theme === theme ? 'border-medical-blue bg-blue-50 text-medical-blue' : 'border-gray-300'
                            }`}
                          >
                            {theme === 'light' && <Sun size={18} className="mr-2" />}
                            {theme === 'dark' && <Moon size={18} className="mr-2" />}
                            {theme === 'auto' && <Settings size={18} className="mr-2" />}
                            {theme === 'light' ? t.system.light : theme === 'dark' ? t.system.dark : t.system.auto}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t.system.timezone}</label>
                      <select
                        value={systemSettings.timezone}
                        onChange={(e) => setSystemSettings({ ...systemSettings, timezone: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-medical-blue focus:border-medical-blue"
                      >
                        <option value="Asia/Shanghai">Asia/Shanghai (GMT+8)</option>
                        <option value="Asia/Tokyo">Asia/Tokyo (GMT+9)</option>
                        <option value="America/New_York">America/New_York (GMT-5)</option>
                        <option value="Europe/London">Europe/London (GMT+0)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t.system.dateFormat}</label>
                      <select
                        value={systemSettings.dateFormat}
                        onChange={(e) => setSystemSettings({ ...systemSettings, dateFormat: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-medical-blue focus:border-medical-blue"
                      >
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={handleSaveSystem}
                      disabled={loading.system}
                      className="bg-medical-blue text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 disabled:opacity-50 flex items-center"
                    >
                      {loading.system ? (
                        <><Loader2 className="animate-spin mr-2" size={18} /> 保存中...</>
                      ) : (
                        <><Save className="mr-2" size={18} /> {t.system.save}</>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Data Tab */}
              {activeTab === 'data' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-gray-900">{t.data.title}</h2>
                  
                  <div className="space-y-4">
                    <div className="p-4 border border-gray-200 rounded-md">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start">
                          <Download className="text-medical-blue mr-3 mt-1" size={24} />
                          <div>
                            <h3 className="font-medium text-gray-900">{t.data.export}</h3>
                            <p className="text-sm text-gray-500 mt-1">{t.data.exportDesc}</p>
                          </div>
                        </div>
                        <button
                          onClick={handleExportData}
                          disabled={loading.export}
                          className="bg-medical-blue text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
                        >
                          {loading.export ? <Loader2 className="animate-spin" size={16} /> : t.data.export}
                        </button>
                      </div>
                    </div>

                    <div className="p-4 border border-gray-200 rounded-md">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start">
                          <Upload className="text-medical-blue mr-3 mt-1" size={24} />
                          <div>
                            <h3 className="font-medium text-gray-900">{t.data.import}</h3>
                            <p className="text-sm text-gray-500 mt-1">{t.data.importDesc}</p>
                          </div>
                        </div>
                        <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200">
                          {t.data.import}
                        </button>
                      </div>
                    </div>

                    <div className="p-4 border border-gray-200 rounded-md">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start">
                          <RefreshCw className="text-medical-blue mr-3 mt-1" size={24} />
                          <div>
                            <h3 className="font-medium text-gray-900">{t.data.clear}</h3>
                            <p className="text-sm text-gray-500 mt-1">{t.data.clearDesc}</p>
                          </div>
                        </div>
                        <button
                          onClick={handleClearCache}
                          disabled={loading.cache}
                          className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 disabled:opacity-50"
                        >
                          {loading.cache ? <Loader2 className="animate-spin" size={16} /> : t.data.clear}
                        </button>
                      </div>
                    </div>

                    <div className="p-4 border border-red-200 rounded-md bg-red-50">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start">
                          <Trash2 className="text-red-500 mr-3 mt-1" size={24} />
                          <div>
                            <h3 className="font-medium text-red-600">{t.data.delete}</h3>
                            <p className="text-sm text-red-500 mt-1">{t.data.deleteDesc}</p>
                          </div>
                        </div>
                        <button className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-600">
                          {t.data.delete}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* API Tab */}
              {activeTab === 'api' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-gray-900">{t.api.title}</h2>
                  
                  {/* API Key */}
                  <div className="p-4 border border-gray-200 rounded-md">
                    <h3 className="font-medium text-gray-900 mb-3">{t.api.key}</h3>
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={apiKey}
                        readOnly
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm font-mono"
                      />
                      <button
                        onClick={() => navigator.clipboard.writeText(apiKey)}
                        className="p-2 border border-gray-300 rounded-md hover:bg-gray-50"
                        title="复制"
                      >
                        <FileText size={18} />
                      </button>
                      <button
                        onClick={handleGenerateApiKey}
                        disabled={loading.apiKey}
                        className="bg-medical-blue text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50 flex items-center"
                      >
                        {loading.apiKey ? <Loader2 className="animate-spin mr-1" size={16} /> : <RefreshCw className="mr-1" size={16} />}
                        {t.api.regenerate}
                      </button>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">请妥善保管您的API密钥，不要与他人分享。</p>
                  </div>

                  {/* API Usage */}
                  <div className="p-4 border border-gray-200 rounded-md">
                    <h3 className="font-medium text-gray-900 mb-4">{t.api.usage}</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-md">
                        <div className="text-2xl font-bold text-medical-blue">{apiUsage.requests}</div>
                        <div className="text-sm text-gray-600">{t.api.requests}</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-md">
                        <div className="text-2xl font-bold text-green-600">{apiUsage.limit}</div>
                        <div className="text-sm text-gray-600">{t.api.limit}</div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>使用率</span>
                        <span>{Math.round((apiUsage.requests / apiUsage.limit) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-medical-blue h-2 rounded-full transition-all"
                          style={{ width: `${(apiUsage.requests / apiUsage.limit) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Webhook */}
                  <div className="p-4 border border-gray-200 rounded-md">
                    <h3 className="font-medium text-gray-900 mb-3">{t.api.webhook}</h3>
                    <input
                      type="text"
                      placeholder="https://your-domain.com/webhook"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-medical-blue focus:border-medical-blue"
                    />
                    <p className="text-sm text-gray-500 mt-2">用于接收实时分析结果的通知。</p>
                  </div>

                  <div className="pt-4">
                    <a 
                      href="#" 
                      className="text-medical-blue hover:underline flex items-center"
                    >
                      <FileText className="mr-2" size={18} />
                      {t.api.docs}
                    </a>
                  </div>
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
    </div>
  );
};

export default SettingsPage;
