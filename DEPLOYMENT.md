# TempLink 部署指南

本文档详细介绍了如何将 TempLink 部署到不同的免费托管平台。

## 🌐 可用托管平台

### 1. GitHub Pages（推荐）
**特点**：完全免费、支持自定义域名、部署简单

**部署步骤**：
```bash
# 1. 在GitHub创建新仓库
# 2. 将所有文件上传到仓库
# 3. 在仓库页面点击 Settings
# 4. 找到 Pages 部分
# 5. 选择分支（main）和文件夹（/ 根目录）
# 6. 保存设置，等待几分钟即可访问
```

**访问地址**：
- `https://你的用户名.github.io/仓库名`
- 支持绑定自定义域名

### 2. Vercel（最快速）
**特点**：一键部署、CDN加速、自动HTTPS

**部署步骤**：
```bash
# 方法一：通过CLI
npm install -g vercel
vercel --prod

# 方法二：通过网页
1. 访问 vercel.com
2. 导入GitHub仓库
3. 点击部署按钮
```

**访问地址**：
- `https://你的项目名.vercel.app`
- 支持自定义域名

### 3. Netlify（最简单）
**特点**：拖拽部署、持续集成、表单支持

**部署步骤**：
```bash
# 方法一：拖拽部署
1. 访问 netlify.com
2. 将项目文件夹拖拽到网页
3. 自动完成部署

# 方法二：通过CLI
npm install -g netlify-cli
netlify deploy --prod
```

**访问地址**：
- `https://随机项目名.netlify.app`
- 支持自定义域名

## 🚀 部署前检查

确保你的项目包含以下文件：
```
templink/
├── index.html          # 主页面
├── redirect.html       # 跳转页面
├── app.js             # 主逻辑
├── redirect.js        # 跳转逻辑
├── demo.html          # 演示页面
├── README.md          # 说明文档
├── vercel.json        # Vercel配置
├── netlify.toml       # Netlify配置
└── .gitignore         # Git忽略文件
```

## ⚙️ 配置说明

### 修改基本URL
如果你需要修改部署后的基础URL，请编辑以下文件：

**app.js**（第8行）：
```javascript
// 修改这一行
this.baseUrl = window.location.origin;
// 如果使用自定义域名，可以改为：
this.baseUrl = 'https://你的自定义域名';
```

**redirect.js**（第95行）：
```javascript
// 生成分享链接时使用的域名
const shareLink = `https://你的域名/redirect.html?id=${shareId}`;
```

## 🔧 高级配置

### 自定义域名
所有平台都支持自定义域名：

1. **GitHub Pages**：
   - 在仓库设置中添加域名
   - 在域名服务商处添加CNAME记录

2. **Vercel**：
   - 在项目设置中添加域名
   - 自动生成DNS配置

3. **Netlify**：
   - 在域名设置中添加自定义域名
   - 提供自动SSL证书

### 性能优化建议
1. **启用HTTPS**：所有现代托管平台都自动提供HTTPS
2. **使用CDN**：Vercel和Netlify自带全球CDN
3. **压缩文件**：所有JS和HTML文件已经过优化
4. **缓存策略**：静态文件已配置合理缓存

## 📊 监控和分析

### 基本统计
系统内置简单统计功能：
- 链接创建时间
- 访问次数
- 剩余时间显示
- 分享链跟踪

### 高级分析（可选）
如需更详细的分析，可以：
1. 添加 Google Analytics
2. 集成 Vercel Analytics
3. 使用 Netlify Analytics

## 🔒 安全注意事项

1. **数据存储**：所有数据存储在用户浏览器localStorage
2. **无后端风险**：没有服务器，没有数据库攻击风险
3. **链接安全**：使用随机ID，难以猜测
4. **跨域保护**：配置了安全HTTP头部

## 🐛 故障排除

### 常见问题

**问题1**：页面无法加载JS文件
**解决**：检查文件路径是否正确，确保所有文件在同一个目录

**问题2**：链接生成后无法跳转
**解决**：检查浏览器是否支持localStorage，尝试清除浏览器缓存

**问题3**：分享链接时间不正确
**解决**：检查客户端时间设置，系统使用本地时间计算

**问题4**：部署后访问显示404
**解决**：检查托管平台的路由配置，确保所有文件都已上传

### 调试步骤
1. 打开浏览器开发者工具（F12）
2. 查看Console标签页的错误信息
3. 检查Application标签页的localStorage内容
4. 验证网络请求是否成功

## 📈 维护建议

1. **定期备份**：定期导出重要的链接数据
2. **版本更新**：关注项目更新，及时升级
3. **性能监控**：使用浏览器开发者工具监控性能
4. **用户反馈**：收集用户反馈，持续改进功能

## 🤝 获取帮助

如有部署问题，请：
1. 查看本指南的故障排除部分
2. 查看对应托管平台的官方文档
3. 提交GitHub Issue
4. 联系技术支持

---

**TempLink** - 简单部署，即开即用！ 🚀