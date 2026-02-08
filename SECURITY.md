# 安全指南

本文档详细说明了 PancreaScan-AI™ 应用的安全措施和最佳实践。

## API Key 安全性

### 核心原则

**DeepSeek API Key 永远不会暴露给前端**

我们的架构确保 API Key 仅在服务器端使用，前端完全无法访问。

### 实现细节

#### 1. 服务器端存储

API Key 存储在服务器端环境变量中：

```typescript
// lib/deepseekService.ts
const apiKey = process.env.DEEPSEEK_API_KEY;

if (!apiKey) {
  throw new Error('DEEPSEEK_API_KEY is not configured');
}
```

#### 2. 前端隔离

前端通过 API Routes 调用后端，而不是直接调用 DeepSeek API：

```typescript
// app/page.tsx (前端)
const response = await fetch('/api/diagnosis', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    imaging: formData.imaging,
    crp: formData.crp,
    whiteCell: formData.whiteCell,
    painLevel: formData.painLevel,
    lang,
  }),
});
```

```typescript
// app/api/diagnosis/route.ts (后端)
// 只有这里才能访问 process.env.DEEPSEEK_API_KEY
const result = await getAiDiagnosisSimulation(diagnosisData, lang);
```

#### 3. 环境变量保护

- `.env.local` 文件已被 `.gitignore` 排除
- 生产环境变量在部署平台配置
- 环境变量不会打包到客户端 JavaScript 中

### 安全架构图

```
用户浏览器
    ↓
前端 (React/Next.js)
    ↓ (HTTP 请求，无 API Key)
后端 API Routes (/api/diagnosis)
    ↓ (使用环境变量中的 API Key)
DeepSeek API
```

## 环境变量管理

### 本地开发

创建 `.env.local` 文件：

```env
DEEPSEEK_API_KEY=your_actual_api_key_here
```

**安全规则**：
- ✅ `.env.local` - 本地开发使用，已排除在 Git 外
- ❌ `.env` - 不要提交到版本控制
- ❌ 硬编码在代码中 - 绝对禁止

### 生产环境

在部署平台配置环境变量：

#### Vercel
1. 项目设置 → Environment Variables
2. 添加 `DEEPSEEK_API_KEY`
3. 选择环境（Production, Preview, Development）

#### 其他平台
参考各平台的环境变量配置文档。

### 环境变量验证

应用启动时会验证 API Key 是否配置：

```typescript
if (!apiKey) {
  throw new Error('DEEPSEEK_API_KEY is not configured');
}
```

## 数据传输安全

### HTTPS 强制使用

生产环境必须使用 HTTPS：

- Vercel 自动提供 HTTPS
- 其他平台需要配置 SSL 证书

### 请求加密

所有 API 请求都通过 HTTPS 加密：

```typescript
const response = await axios.post(
  DEEPSEEK_API_URL, // https://api.deepseek.com/v1/chat/completions
  { /* ... */ },
  {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
  }
);
```

### 数据不存储

- 用户数据不会在前端持久化存储
- 诊断结果仅在会话期间显示
- 不记录用户的医疗数据

## API 安全措施

### 速率限制

建议在生产环境中实施速率限制：

```typescript
// app/api/diagnosis/route.ts
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "1 m"),
});

export async function POST(request: NextRequest) {
  const ip = request.ip ?? "127.0.0.1";
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429 }
    );
  }
  // ... 继续处理请求
}
```

### 输入验证

所有输入都经过验证：

```typescript
const { imaging, crp, whiteCell, painLevel, lang = 'en' } = body;

if (!imaging || !crp || !whiteCell || !painLevel) {
  return NextResponse.json(
    { error: 'Missing required fields' },
    { status: 400 }
  );
}

if (!['en', 'zh'].includes(lang)) {
  return NextResponse.json(
    { error: 'Invalid language' },
    { status: 400 }
  );
}
```

### 错误处理

不向客户端暴露敏感信息：

```typescript
try {
  const result = await getAiDiagnosisSimulation(diagnosisData, lang);
  return NextResponse.json(result);
} catch (error) {
  console.error('Diagnosis API Error:', error);
  return NextResponse.json(
    { error: 'Failed to generate diagnosis' },
    { status: 500 }
  );
}
```

## 部署安全

### Vercel 安全配置

在 `vercel.json` 中配置安全头：

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    }
  ]
}
```

### 内容安全策略 (CSP)

在 `app/layout.tsx` 中添加 CSP：

```typescript
export const metadata = {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}
```

## 依赖安全

### 定期更新依赖

```bash
# 检查过时的包
npm outdated

# 更新依赖
npm update

# 审计安全漏洞
npm audit
npm audit fix
```

### 使用锁定文件

- `package-lock.json` 确保依赖版本一致性
- 提交到版本控制

## 监控和日志

### 错误跟踪

集成错误跟踪服务（如 Sentry）：

```typescript
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
});
```

### 日志管理

- 不要在生产环境中记录敏感信息
- 使用结构化日志格式
- 定期清理旧日志

## 合规性考虑

### 医疗数据处理

⚠️ **重要提示**：

本应用是演示系统，不应用于真实医疗诊断。如用于生产环境，需要：

1. **HIPAA 合规**（美国）
2. **GDPR 合规**（欧盟）
3. **数据加密**（静态和传输）
4. **访问控制**和审计日志
5. **数据保留**和删除策略

### 隐私保护

- 不收集个人身份信息
- 不存储用户数据
- 提供隐私政策

## 安全检查清单

部署前检查：

- [ ] API Key 仅在服务器端环境变量中
- [ ] `.env.local` 已添加到 `.gitignore`
- [ ] 生产环境使用 HTTPS
- [ ] 实施了输入验证
- [ ] 错误消息不泄露敏感信息
- [ ] 依赖包已更新到最新版本
- [ ] 配置了安全响应头
- [ ] 实施了速率限制（推荐）
- [ ] 设置了监控和日志
- [ ] 定期进行安全审计

## 常见安全问题

### Q: 如何验证 API Key 未泄露？

**A**: 
1. 检查浏览器开发者工具的 Network 标签
2. 确认没有 API Key 出现在请求中
3. 检查打包后的 JavaScript 文件

### Q: 可以在前端使用 API Key 吗？

**A**: 绝对不可以。前端代码可以被任何人查看，API Key 会被泄露。

### Q: 如何轮换 API Key？

**A**:
1. 在 DeepSeek 平台生成新的 API Key
2. 更新部署平台的环境变量
3. 重新部署应用
4. 删除旧的 API Key

### Q: 如何防止 API 滥用？

**A**:
1. 实施速率限制
2. 监控 API 使用情况
3. 设置预算警报
4. 考虑使用 API 网关

## 报告安全问题

如发现安全漏洞，请：
1. 不要公开披露
2. 通过安全渠道联系开发团队
3. 提供详细的重现步骤
4. 给予时间修复

## 资源

- [OWASP 安全最佳实践](https://owasp.org/www-project-top-ten/)
- [Next.js 安全文档](https://nextjs.org/docs/app/building-your-application/configuring/security)
- [DeepSeek API 安全指南](https://platform.deepseek.com/docs/security)

---

**最后更新**: 2025-02-08
