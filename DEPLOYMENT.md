# 部署指南

本文档提供了 PancreaScan-AI™ Next.js 应用的详细部署说明。

## 部署前准备

### 1. 获取 DeepSeek API Key

1. 访问 [DeepSeek 平台](https://platform.deepseek.com/)
2. 注册账号并登录
3. 在控制台中获取 API Key
4. 确保账户有足够的 API 调用配额

### 2. 环境变量配置

创建 `.env.local` 文件（仅用于本地开发）：

```env
DEEPSEEK_API_KEY=your_actual_api_key_here
```

**重要提示**：
- `.env.local` 文件已被 `.gitignore` 排除，不会被提交到版本控制
- 部署时需要在部署平台配置环境变量
- 永远不要将真实的 API Key 提交到代码仓库

## 本地开发

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

应用将在 `http://localhost:3000` 启动。

### 测试 API 端点

使用 curl 或 Postman 测试诊断 API：

```bash
curl -X POST http://localhost:3000/api/diagnosis \
  -H "Content-Type: application/json" \
  -d '{
    "imaging": "Edematous change, peripancreatic fluid collection noted.",
    "crp": "150",
    "whiteCell": "18",
    "painLevel": "8",
    "lang": "en"
  }'
```

## 生产部署

### Vercel 部署（推荐）

Vercel 是 Next.js 的官方部署平台，提供最佳的部署体验。

#### 步骤 1：准备代码

```bash
# 初始化 Git 仓库（如果还没有）
git init
git add .
git commit -m "Initial commit"

# 推送到 GitHub
git branch -M main
git remote add origin https://github.com/your-username/pancreascan-ai.git
git push -u origin main
```

#### 步骤 2：在 Vercel 部署

1. 访问 [vercel.com](https://vercel.com) 并登录
2. 点击 "New Project"
3. 导入你的 GitHub 仓库
4. 配置项目设置：
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

#### 步骤 3：配置环境变量

在 Vercel 项目设置中添加环境变量：

1. 进入项目设置 → Environment Variables
2. 添加以下变量：
   - **Name**: `DEEPSEEK_API_KEY`
   - **Value**: 你的 DeepSeek API Key
3. 选择环境（Production, Preview, Development）
4. 保存并重新部署

#### 步骤 4：部署

点击 "Deploy" 按钮，Vercel 将自动：
- 安装依赖
- 构建应用
- 部署到全球 CDN

部署完成后，你将获得一个 HTTPS URL，如 `https://your-app.vercel.app`

### 其他部署平台

#### Netlify

1. 将代码推送到 GitHub
2. 在 Netlify 导入项目
3. 配置构建设置：
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
4. 在 Site settings → Environment variables 添加 `DEEPSEEK_API_KEY`

#### Docker 部署

创建 `Dockerfile`：

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

构建和运行：

```bash
# 构建镜像
docker build -t pancreascan-ai .

# 运行容器
docker run -p 3000:3000 -e DEEPSEEK_API_KEY=your_key_here pancreascan-ai
```

#### 传统服务器部署

```bash
# 1. 克隆代码
git clone https://github.com/your-username/pancreascan-ai.git
cd pancreascan-ai

# 2. 安装依赖
npm install

# 3. 配置环境变量
cp .env.example .env.local
# 编辑 .env.local 添加 DEEPSEEK_API_KEY

# 4. 构建应用
npm run build

# 5. 启动应用
npm start
```

使用 PM2 进行进程管理：

```bash
# 安装 PM2
npm install -g pm2

# 启动应用
pm2 start npm --name "pancreascan-ai" -- start

# 设置开机自启
pm2 startup
pm2 save
```

## 环境变量管理

### 开发环境

使用 `.env.local` 文件，该文件不会被提交到 Git。

### 生产环境

在部署平台配置环境变量：

| 平台 | 配置位置 |
|------|---------|
| Vercel | Project Settings → Environment Variables |
| Netlify | Site settings → Environment variables |
| Docker | `-e DEEPSEEK_API_KEY=your_key` 参数 |
| 传统服务器 | `.env` 文件或系统环境变量 |

## 性能优化

### 1. 启用 CDN

- Vercel 和 Netlify 自动提供 CDN
- 确保静态资源在 `public/` 目录

### 2. 图片优化

使用 Next.js Image 组件：

```typescript
import Image from 'next/image'

<Image
  src="/logo.png"
  alt="Logo"
  width={500}
  height={300}
/>
```

### 3. 代码分割

Next.js 自动进行代码分割，无需额外配置。

## 监控和日志

### Vercel Analytics

```bash
npm install @vercel/analytics
```

在 `app/layout.tsx` 中添加：

```typescript
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### 错误跟踪

集成 Sentry 或其他错误跟踪服务。

## 安全检查清单

- [ ] API Key 已配置在服务器端环境变量
- [ ] `.env.local` 已添加到 `.gitignore`
- [ ] 使用 HTTPS 进行生产部署
- [ ] 实施速率限制（可选）
- [ ] 定期更新依赖包
- [ ] 启用 CSP（内容安全策略）
- [ ] 配置 CORS 策略

## 故障排除

### 构建失败

1. 检查 Node.js 版本（建议 18.x 或更高）
2. 清除缓存：`rm -rf .next node_modules && npm install`
3. 检查环境变量是否正确配置

### API 调用失败

1. 验证 API Key 是否有效
2. 检查 DeepSeek 服务状态
3. 查看服务器日志获取详细错误

### 样式问题

1. 确保 Tailwind CSS 配置正确
2. 检查 `tailwind.config.ts` 中的 content 路径
3. 清除浏览器缓存

## 更新和维护

### 更新依赖

```bash
# 检查过时的包
npm outdated

# 更新依赖
npm update

# 更新 Next.js
npm install next@latest
```

### 回滚部署

- Vercel: 在部署历史中选择之前的版本
- 其他平台: 使用 Git 回滚代码并重新部署

## 支持

如有问题，请参考：
- [Next.js 文档](https://nextjs.org/docs)
- [DeepSeek API 文档](https://platform.deepseek.com/docs)
- [Vercel 部署文档](https://vercel.com/docs)
