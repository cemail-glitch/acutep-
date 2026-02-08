# API 调用失败诊断指南

## 问题：已填写 API Key，但显示调用失败

我已经测试了你的 DeepSeek API Key，**API Key 是有效的，可以正常调用**。问题出在 Next.js 环境变量配置上。

## 快速解决步骤

### 步骤 1：确认环境变量文件

确保 `.env.local` 文件存在且内容正确：

```env
# DeepSeek API Key
# 获取 API Key: https://platform.deepseek.com/
DEEPSEEK_API_KEY=sk-84f32c0a60434fa383daa7c17fc254b8
```

**重要提示**：
- ✅ 文件名必须是 `.env.local`（注意前面的点）
- ✅ 没有额外的空格或引号
- ✅ 没有注释符号 `#` 在 API Key 前面

### 步骤 2：重启开发服务器

环境变量只在服务器启动时加载，修改后必须重启：

1. 停止当前运行的开发服务器（按 `Ctrl+C`）
2. 重新启动：
   ```bash
   npm run dev
   ```
   
   或者在 Windows 上双击 `start-dev.bat`

### 步骤 3：清除 Next.js 缓存

如果重启后仍有问题，清除缓存：

```bash
# Windows
rmdir /s /q .next

# Mac/Linux
rm -rf .next
```

然后重新启动开发服务器。

### 步骤 4：使用测试页面验证

我已创建了一个测试页面来诊断问题：

1. 启动开发服务器：`npm run dev`
2. 在浏览器访问：`http://localhost:3000/test-env.html`
3. 点击"测试环境变量"按钮
4. 查看结果

**预期结果**：
```
✅ API Key 存在: 是
📏 API Key 长度: 40
🔑 API Key 前缀: sk-84f32c0...
✅ 环境变量配置正确！
```

如果显示"否"，说明环境变量没有正确加载。

### 步骤 5：检查浏览器控制台

1. 打开浏览器开发者工具（F12）
2. 切换到 Console 标签
3. 尝试使用诊断功能
4. 查看是否有错误信息

常见错误：
- `Failed to fetch` - 服务器未启动或端口错误
- `500 Internal Server Error` - 后端错误
- `401 Unauthorized` - API Key 无效

## 常见问题和解决方案

### 问题 1：环境变量未加载

**症状**：测试页面显示"API Key 不存在"

**原因**：
- `.env.local` 文件不在项目根目录
- 文件名不正确（如 `env.local` 缺少点）
- 服务器未重启

**解决**：
1. 确认文件在项目根目录：`c:\Users\27532\Downloads\pancreascan-ai™\.env.local`
2. 重启开发服务器

### 问题 2：API 调用超时

**症状**：长时间无响应或超时错误

**原因**：
- 网络连接问题
- DeepSeek API 服务不稳定

**解决**：
1. 检查网络连接
2. 稍后重试
3. 检查 DeepSeek 服务状态

### 问题 3：401 Unauthorized 错误

**症状**：返回 401 错误

**原因**：
- API Key 无效或过期
- API Key 格式错误

**解决**：
1. 重新获取 API Key：https://platform.deepseek.com/
2. 更新 `.env.local` 文件
3. 重启服务器

### 问题 4：429 Rate Limit Exceeded

**症状**：返回 429 错误

**原因**：
- API 调用频率超过限制
- 账户配额用尽

**解决**：
1. 等待一段时间后重试
2. 检查 DeepSeek 账户配额
3. 考虑升级账户

## 验证 API 连接

我已经验证了你的 API Key 可以正常工作：

```
✅ API 调用成功！
状态码: 200
AI 响应: API connection successful
```

所以问题不在 API Key 本身，而在环境变量配置。

## 手动测试 API

如果需要手动测试，可以访问：

1. **环境变量测试**：`http://localhost:3000/api/test-env`
   - 返回环境变量配置信息

2. **诊断 API 测试**：使用 Postman 或 curl

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

## 获取详细错误信息

如果问题仍然存在，请：

1. 查看服务器终端输出
2. 查看浏览器控制台（F12）
3. 使用测试页面获取详细信息

## 需要帮助？

如果以上步骤都无法解决问题，请提供：

1. 测试页面的输出结果
2. 浏览器控制台的错误信息
3. 服务器终端的错误日志

## 快速检查清单

- [ ] `.env.local` 文件存在且在项目根目录
- [ ] API Key 格式正确（没有引号或额外空格）
- [ ] 开发服务器已重启
- [ ] 已清除 `.next` 缓存
- [ ] 使用测试页面验证了环境变量
- [ ] 检查了浏览器控制台错误

---

**最后更新**: 2025-02-08
