import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // 主色体系 - 品牌核心色（医疗科技属性）
        'primary': '#0066B3',         // 品牌主色-深海蓝（导航栏、footer、CTA按钮、标题强调）
        'primary-dark': '#004C80',    // 主色深色（点击激活态）
        'primary-light': '#3399FF',   // 二级主色-科技浅蓝（图标高亮、hover态、数据可视化）
        'primary-bg': '#E6F2FF',     // 三级主色-极浅蓝（卡片背景、输入框底色）

        // 辅助色体系 - 强调色（冷暖对比）
        'accent': '#FF7043',         // 品牌辅助色-生命暖橙（核心数据高亮、slogan重点字）
        'accent-light': '#FFAB91',   // 辅助色-浅橙提亮（次要强调内容）

        // 中性色体系 - 基础承载色
        'white': '#FFFFFF',          // 纯白
        'gray-bg': '#F5F8FA',        // 浅灰背景
        'text-primary': '#2A3440',   // 一级文字色-深灰（主标题、重要信息）
        'text-secondary': '#667585', // 二级文字色-中灰（副标题、说明文字）
        'divider': '#E2E8F0',         // 分割线浅灰

        // 兼容性别名
        'medical-blue': '#0066B3',
        'medical-blue-dark': '#004C80',
        'medical-blue-light': '#3399FF',
        'medical-blue-50': '#E6F2FF',
        'medical-blue-100': '#CCE5FF',
        'life-green': '#28A745',
        'tech-gray': '#F5F8FA',
        'warning-red': '#DC3545',
        'warning-orange': '#FF9800',
        'deep-blue': '#0066B3',
        'highlight': '#FF7043',
        'highlight-light': '#FFAB91',
        'bg-primary': '#E6F2FF',
        'bg-secondary': '#F5F8FA',
        'bg-card': '#FFFFFF',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0, 102, 204, 0.08)',
        'medium': '0 8px 30px rgba(0, 102, 204, 0.12)',
        'large': '0 16px 50px rgba(0, 102, 204, 0.16)',
      },
      lineHeight: {
        'relaxed-plus': '1.65',
        'relaxed-extra': '1.75',
      },
    },
  },
  plugins: [],
}
export default config
