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
        'medical-blue': '#0066CC',
        'medical-blue-dark': '#004C99',
        'medical-blue-light': '#3399FF',
        'medical-blue-50': '#E6F2FF',
        'medical-blue-100': '#CCE5FF',
        'life-green': '#28A745',
        'tech-gray': '#F5F7FA',
        'warning-red': '#DC3545',
        'warning-orange': '#FF9800',
        'deep-blue': '#0A2540',
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
