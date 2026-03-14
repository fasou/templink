# GitHub Pages 部署详细指南

## 📋 部署前准备

### 1. 确保你拥有以下内容
- ✅ GitHub 账号（如果没有，请先注册：github.com）
- ✅ 本地已安装 Git
- ✅ 所有项目文件已准备就绪

### 2. 检查项目文件
你的项目应包含以下核心文件：
```
✅ index.html      # 主页面
✅ redirect.html   # 跳转页面
✅ app.js         # 主逻辑
✅ redirect.js    # 跳转逻辑
✅ .github/workflows/deploy.yml  # 部署配置
```

## 🚀 部署步骤

### 步骤1：在GitHub创建新仓库
1. 登录 GitHub
2. 点击右上角 "+" → "New repository"
3. 填写仓库信息：
   - **Repository name**: templink（或你喜欢的名称）
   - **Description**: TempLink - 48小时临时链接分享系统
   - **Public**（选择公开，免费托管必须公开）
   - **不要**勾选 "Initialize this repository with a README"
4. 点击 "Create repository"

### 步骤2：获取仓库URL
创建成功后，你会看到类似这样的URL：
```
https://github.com/你的用户名/templink.git
```
请复制这个URL备用。

### 步骤3：配置本地Git并推送代码
打开终端，执行以下命令：

```bash
# 1. 进入项目目录
cd /Users/archeros/CodeBuddy/Claw

# 2. 添加远程仓库（使用你自己的仓库URL）
git remote add origin https://github.com/你的用户名/templink.git

# 3. 重命名分支为main（如果需要）
git branch -M main

# 4. 推送代码到GitHub
git push -u origin main
```

**注意**：如果提示需要登录，请按提示输入GitHub用户名和密码。

### 步骤4：启用GitHub Pages
1. 打开你的GitHub仓库页面
2. 点击顶部菜单的 **Settings**
3. 在左侧菜单找到 **Pages**
4. 在 "Build and deployment" 部分：
   - **Source**: 选择 "Deploy from a branch"
   - **Branch**: 选择 "main" 和 "/ (root)"
5. 点击 **Save**

### 步骤5：等待部署完成
- GitHub会自动开始部署
- 等待约1-3分钟
- 刷新页面，你会看到绿色的部署成功提示
- 点击提供的链接访问你的网站

## 🌐 访问你的网站

### 默认访问地址
```
https://你的用户名.github.io/templink/
```

### 示例
如果你的GitHub用户名是 `johnsmith`，仓库名是 `templink`：
```
https://johnsmith.github.io/templink/
```

## 🔧 可选：配置自定义域名

### 如果你有自己的域名
1. 在项目根目录创建 `CNAME` 文件（已创建）
2. 在文件中添加你的域名，例如：
   ```
   templink.yourdomain.com
   ```
3. 提交并推送更改：
   ```bash
   git add CNAME
   git commit -m "Add custom domain"
   git push
   ```
4. 在域名服务商处配置CNAME记录：
   ```
   templink.yourdomain.com CNAME 你的用户名.github.io
   ```
5. 在GitHub Pages设置中添加自定义域名

## 📱 测试部署

### 测试步骤
1. 访问你的网站链接
2. 测试以下功能：
   - ✅ 输入网址生成链接
   - ✅ 点击生成的链接跳转
   - ✅ 测试分享功能
   - ✅ 检查二维码生成
   - ✅ 验证48小时倒计时

### 常见问题测试
- 链接生成是否正常？
- 跳转页面是否显示正确？
- 分享链接是否继承时间？
- 移动端访问是否正常？

## 🔄 更新网站

### 如何更新已部署的网站
```bash
# 1. 修改文件
# 2. 提交更改
git add .
git commit -m "更新描述"
# 3. 推送到GitHub
git push
# 4. 等待GitHub自动重新部署（约1分钟）
```

## 📊 监控部署状态

### 查看部署日志
1. 访问你的GitHub仓库
2. 点击 **Actions** 标签页
3. 查看最近的部署工作流
4. 点击运行记录查看详细日志

### 部署状态说明
- ✅ 绿色：部署成功
- ❌ 红色：部署失败
- 🟡 黄色：部署中

## 🛠️ 故障排除

### 常见问题及解决方法

#### 问题1：GitHub Pages未显示
**解决**：
- 检查Settings > Pages配置
- 确保选择的是main分支和root目录
- 等待几分钟后刷新

#### 问题2：页面显示404
**解决**：
- 检查文件路径是否正确
- 确保index.html在根目录
- 查看GitHub Actions日志

#### 问题3：JavaScript功能不工作
**解决**：
- 检查浏览器控制台错误
- 确保所有JS文件正确加载
- 检查文件权限

#### 问题4：自定义域名不生效
**解决**：
- 检查CNAME文件内容
- 验证DNS配置
- 等待DNS传播（最长48小时）

## 🔒 安全建议

### 建议配置
1. **强制HTTPS**：GitHub Pages默认启用
2. **定期更新**：保持代码最新
3. **监控访问**：定期检查网站状态
4. **备份数据**：定期备份重要链接数据

### 安全头部
项目已配置以下安全头部：
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin

## 📈 性能优化

### GitHub Pages优势
- ✅ 全球CDN
- ✅ 自动HTTPS
- ✅ 免费SSL证书
- ✅ 自动压缩
- ✅ 浏览器缓存

### 优化建议
1. 图片压缩：如果添加图片，请先压缩
2. 代码精简：保持代码简洁
3. 减少请求：合并文件减少HTTP请求

## 🎯 部署验证清单

### 部署前检查
- [ ] GitHub账号已注册
- [ ] 仓库已创建
- [ ] 本地Git已配置
- [ ] 所有文件已提交
- [ ] 远程仓库已添加

### 部署中检查
- [ ] 代码已推送到GitHub
- [ ] GitHub Pages已启用
- [ ] 分支和目录配置正确
- [ ] 部署工作流已启动

### 部署后检查
- [ ] 网站可以访问
- [ ] 所有功能正常工作
- [ ] 移动端适配正常
- [ ] 性能表现良好

## 💡 高级技巧

### 使用自定义工作流
如果需要更复杂的部署流程，可以修改 `.github/workflows/deploy.yml` 文件。

### 环境变量
GitHub Pages支持环境变量，可以在工作流中配置。

### 预览部署
使用GitHub Pages的预览功能测试更改：
```bash
# 创建新分支测试
git checkout -b feature-branch
# 推送到GitHub
git push -u origin feature-branch
# 在PR中查看预览
```

## 📞 获取帮助

### 官方文档
- [GitHub Pages 文档](https://docs.github.com/en/pages)
- [GitHub Actions 文档](https://docs.github.com/en/actions)

### 社区支持
- GitHub社区论坛
- Stack Overflow
- 项目Issue页面

### 联系维护者
如有部署问题，可以通过项目Issue或GitHub讨论获取帮助。

---

**部署状态**：🎯 按照本指南操作，你的TempLink将在几分钟内上线！

**预估时间**：首次部署约5-10分钟，后续更新约1-3分钟。

**成功标志**：看到绿色的GitHub Pages部署成功提示，并能正常访问网站所有功能。