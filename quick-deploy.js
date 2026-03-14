#!/usr/bin/env node

/**
 * TempLink 快速部署脚本
 * 提供三种部署方式：GitHub Pages、Vercel、Netlify
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const consoleColors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m'
};

function logSuccess(message) {
  console.log(`${consoleColors.green}✅ ${message}${consoleColors.reset}`);
}

function logError(message) {
  console.log(`${consoleColors.red}❌ ${message}${consoleColors.reset}`);
}

function logInfo(message) {
  console.log(`${consoleColors.blue}📘 ${message}${consoleColors.reset}`);
}

function logWarning(message) {
  console.log(`${consoleColors.yellow}⚠️  ${message}${consoleColors.reset}`);
}

function logStep(message) {
  console.log(`${consoleColors.cyan}📋 ${message}${consoleColors.reset}`);
}

function checkGitInstalled() {
  try {
    execSync('git --version', { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}

function checkNodeInstalled() {
  try {
    execSync('node --version', { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}

function checkNpmInstalled() {
  try {
    execSync('npm --version', { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}

function displayBanner() {
  console.log(`
${consoleColors.magenta}╔══════════════════════════════════════════════════════════╗
║${consoleColors.bright}                   TempLink 部署助手                   ${consoleColors.magenta}║
║${consoleColors.dim}           48小时临时链接分享系统 - 一键部署             ${consoleColors.magenta}║
╚══════════════════════════════════════════════════════════╝${consoleColors.reset}
`);
}

function displayMenu() {
  console.log(`
${consoleColors.bright}请选择部署平台：${consoleColors.reset}

${consoleColors.green}1. GitHub Pages${consoleColors.reset}
  ✅ 完全免费，支持自定义域名
  ✅ 无需安装额外工具
  ✅ 适合静态网站

${consoleColors.green}2. Vercel${consoleColors.reset}
  ✅ 全球CDN，自动HTTPS
  ✅ 一键部署，快速简便
  ✅ 适合需要全球加速

${consoleColors.green}3. Netlify${consoleColors.reset}
  ✅ 拖拽部署，最简单
  ✅ 内置表单和身份验证
  ✅ 适合团队协作

${consoleColors.yellow}4. 查看所有部署指南${consoleColors.reset}
  📘 查看详细的部署文档
  📘 故障排除和高级配置

${consoleColors.red}0. 退出${consoleColors.reset}
`);
}

function deployGitHubPages() {
  logStep('GitHub Pages 部署指南');
  console.log(`
${consoleColors.bright}📋 GitHub Pages 部署步骤：${consoleColors.reset}

${consoleColors.cyan}步骤1：创建GitHub仓库${consoleColors.reset}
1. 访问 github.com 并登录
2. 点击右上角 "+" → "New repository"
3. 填写仓库信息：
   - 仓库名：templink
   - 描述：TempLink - 48小时临时链接分享系统
   - 选择 Public（公开）
   - 不要勾选 "Initialize with README"
4. 点击 "Create repository"

${consoleColors.cyan}步骤2：获取仓库URL${consoleColors.reset}
创建成功后，复制仓库URL，格式为：
https://github.com/你的用户名/templink.git

${consoleColors.cyan}步骤3：配置本地Git${consoleColors.reset}
运行以下命令：

${consoleColors.yellow}cd /Users/archeros/CodeBuddy/Claw${consoleColors.reset}

${consoleColors.yellow}# 如果还没有初始化Git仓库${consoleColors.reset}
git init
git add .
git commit -m "Initial commit: TempLink"

${consoleColors.yellow}# 添加远程仓库（替换为你的URL）${consoleColors.reset}
git remote add origin https://github.com/你的用户名/templink.git
git branch -M main
git push -u origin main

${consoleColors.cyan}步骤4：启用GitHub Pages${consoleColors.reset}
1. 访问你的GitHub仓库页面
2. 点击 Settings → Pages
3. 在 "Build and deployment" 部分：
   - Source: 选择 "Deploy from a branch"
   - Branch: 选择 "main" 和 "/ (root)"
4. 点击 Save

${consoleColors.cyan}步骤5：访问你的网站${consoleColors.reset}
等待1-3分钟，然后访问：
https://你的用户名.github.io/templink/

${consoleColors.green}✅ 部署完成！${consoleColors.reset}
`);
}

function deployVercel() {
  logStep('Vercel 部署指南');
  console.log(`
${consoleColors.bright}📋 Vercel 部署步骤：${consoleColors.reset}

${consoleColors.cyan}方法1：通过网站部署（推荐新手）${consoleColors.reset}
1. 访问 vercel.com
2. 使用GitHub账号登录
3. 点击 "Add New Project"
4. 导入你的GitHub仓库
5. 点击 "Deploy"

${consoleColors.cyan}方法2：通过CLI部署（推荐开发者）${consoleColors.reset}
${consoleColors.yellow}# 安装Vercel CLI${consoleColors.reset}
npm install -g vercel

${consoleColors.yellow}# 登录Vercel${consoleColors.reset}
vercel login

${consoleColors.yellow}# 进入项目目录并部署${consoleColors.reset}
cd /Users/archeros/CodeBuddy/Claw
vercel --prod

${consoleColors.cyan}部署后访问地址${consoleColors.reset}
格式为：https://templink.vercel.app
或：https://templink-你的用户名.vercel.app

${consoleColors.green}✅ 部署完成！${consoleColors.reset}

${consoleColors.cyan}更多详情请查看：${consoleColors.reset}
- 项目目录中的 VERCEL_DEPLOYMENT.md
- https://vercel.com/docs
`);
}

function deployNetlify() {
  logStep('Netlify 部署指南');
  console.log(`
${consoleColors.bright}📋 Netlify 部署步骤：${consoleColors.reset}

${consoleColors.cyan}方法1：拖拽部署（最简单）${consoleColors.reset}
1. 访问 netlify.com
2. 注册/登录账号
3. 点击 "Add new site" → "Deploy manually"
4. 拖拽整个项目文件夹到指定区域
5. 等待部署完成

${consoleColors.cyan}方法2：通过GitHub部署${consoleColors.reset}
1. 登录Netlify
2. 点击 "Add new site" → "Import an existing project"
3. 选择GitHub授权
4. 选择你的仓库
5. 配置部署设置（保持默认）
6. 点击 "Deploy site"

${consoleColors.cyan}方法3：通过CLI部署${consoleColors.reset}
${consoleColors.yellow}# 安装Netlify CLI${consoleColors.reset}
npm install -g netlify-cli

${consoleColors.yellow}# 登录Netlify${consoleColors.reset}
netlify login

${consoleColors.yellow}# 部署到生产环境${consoleColors.reset}
cd /Users/archeros/CodeBuddy/Claw
netlify deploy --prod

${consoleColors.cyan}部署后访问地址${consoleColors.reset}
格式为：https://随机名称.netlify.app

${consoleColors.green}✅ 部署完成！${consoleColors.reset}

${consoleColors.cyan}更多详情请查看：${consoleColors.reset}
- 项目目录中的 NETLIFY_DEPLOYMENT.md
- https://docs.netlify.com
`);
}

function showAllGuides() {
  logStep('所有部署指南');
  console.log(`
${consoleColors.bright}📚 可用的部署指南：${consoleColors.reset}

${consoleColors.green}1. GitHub Pages${consoleColors.reset}
   文件：GITHUB_DEPLOYMENT.md
   特点：完全免费，支持自定义域名

${consoleColors.green}2. Vercel${consoleColors.reset}
   文件：VERCEL_DEPLOYMENT.md
   特点：全球CDN，一键部署

${consoleColors.green}3. Netlify${consoleColors.reset}
   文件：NETLIFY_DEPLOYMENT.md
   特点：拖拽部署，内置表单

${consoleColors.green}4. 通用部署指南${consoleColors.reset}
   文件：DEPLOYMENT.md
   特点：所有平台的综合指南

${consoleColors.cyan}快速查看命令：${consoleColors.reset}
${consoleColors.yellow}cat GITHUB_DEPLOYMENT.md | head -50${consoleColors.reset}
${consoleColors.yellow}cat DEPLOYMENT.md | head -50${consoleColors.reset}

${consoleColors.cyan}或直接在编辑器中打开查看${consoleColors.reset}
`);
}

function checkPrerequisites() {
  logStep('检查系统依赖');
  
  const checks = [];
  
  // 检查Git
  if (checkGitInstalled()) {
    logSuccess('Git 已安装');
    checks.push({ name: 'Git', status: true });
  } else {
    logError('Git 未安装，部分功能可能受限');
    checks.push({ name: 'Git', status: false });
  }
  
  // 检查Node.js
  if (checkNodeInstalled()) {
    logSuccess('Node.js 已安装');
    checks.push({ name: 'Node.js', status: true });
  } else {
    logWarning('Node.js 未安装，CLI部署方式可能受限');
    checks.push({ name: 'Node.js', status: false });
  }
  
  // 检查npm
  if (checkNpmInstalled()) {
    logSuccess('npm 已安装');
    checks.push({ name: 'npm', status: true });
  } else {
    logWarning('npm 未安装，CLI部署方式可能受限');
    checks.push({ name: 'npm', status: false });
  }
  
  // 检查项目文件
  const requiredFiles = ['index.html', 'redirect.html', 'app.js', 'redirect.js'];
  const missingFiles = [];
  
  requiredFiles.forEach(file => {
    if (fs.existsSync(path.join(__dirname, file))) {
      logSuccess(`项目文件: ${file}`);
    } else {
      logError(`项目文件: ${file} 缺失`);
      missingFiles.push(file);
    }
  });
  
  if (missingFiles.length > 0) {
    logError(`缺少必要文件: ${missingFiles.join(', ')}`);
    return false;
  }
  
  logSuccess('所有必要文件检查通过');
  return true;
}

function main() {
  displayBanner();
  
  if (!checkPrerequisites()) {
    logWarning('系统依赖检查未完全通过，部署可能受影响');
  }
  
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  function askQuestion() {
    displayMenu();
    
    readline.question(`${consoleColors.bright}请输入选项 (0-4): ${consoleColors.reset}`, (answer) => {
      switch (answer.trim()) {
        case '1':
          deployGitHubPages();
          readline.close();
          break;
          
        case '2':
          deployVercel();
          readline.close();
          break;
          
        case '3':
          deployNetlify();
          readline.close();
          break;
          
        case '4':
          showAllGuides();
          readline.close();
          break;
          
        case '0':
          logInfo('退出部署助手');
          readline.close();
          break;
          
        default:
          logError('无效选项，请重新输入');
          askQuestion();
          break;
      }
    });
  }
  
  askQuestion();
}

// 运行主函数
if (require.main === module) {
  try {
    main();
  } catch (error) {
    logError(`部署助手运行出错: ${error.message}`);
    console.error(error);
    process.exit(1);
  }
}

module.exports = {
  checkPrerequisites,
  deployGitHubPages,
  deployVercel,
  deployNetlify
};