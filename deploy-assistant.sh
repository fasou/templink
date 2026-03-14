#!/bin/bash

# TempLink 部署助手
# 提供三种部署方式：GitHub Pages、Vercel、Netlify

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
NC='\033[0m' # No Color

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

log_info() {
    echo -e "${BLUE}📘 $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_step() {
    echo -e "${CYAN}📋 $1${NC}"
}

display_banner() {
    clear
    echo -e "${MAGENTA}"
    echo "╔══════════════════════════════════════════════════════════╗"
    echo "║                   TempLink 部署助手                      ║"
    echo "║           48小时临时链接分享系统 - 一键部署             ║"
    echo "╚══════════════════════════════════════════════════════════╝"
    echo -e "${NC}"
}

check_prerequisites() {
    log_step "检查系统依赖"
    
    # 检查Git
    if command -v git &> /dev/null; then
        log_success "Git 已安装"
    else
        log_error "Git 未安装"
        echo "请先安装Git：https://git-scm.com/"
        return 1
    fi
    
    # 检查项目文件
    required_files=("index.html" "redirect.html" "app.js" "redirect.js")
    missing_files=()
    
    for file in "${required_files[@]}"; do
        if [[ -f "$file" ]]; then
            log_success "项目文件: $file"
        else
            log_error "项目文件: $file 缺失"
            missing_files+=("$file")
        fi
    done
    
    if [[ ${#missing_files[@]} -gt 0 ]]; then
        log_error "缺少必要文件: ${missing_files[*]}"
        return 1
    fi
    
    log_success "所有必要文件检查通过"
    return 0
}

deploy_github_pages() {
    log_step "GitHub Pages 部署指南"
    echo ""
    echo -e "${CYAN}📋 GitHub Pages 部署步骤：${NC}"
    echo ""
    echo -e "${BLUE}步骤1：创建GitHub仓库${NC}"
    echo "1. 访问 github.com 并登录"
    echo "2. 点击右上角 '+' → 'New repository'"
    echo "3. 填写仓库信息："
    echo "   - 仓库名：templink"
    echo "   - 描述：TempLink - 48小时临时链接分享系统"
    echo "   - 选择 Public（公开）"
    echo "   - 不要勾选 'Initialize with README'"
    echo "4. 点击 'Create repository'"
    echo ""
    echo -e "${BLUE}步骤2：获取仓库URL${NC}"
    echo "创建成功后，复制仓库URL，格式为："
    echo "https://github.com/你的用户名/templink.git"
    echo ""
    echo -e "${BLUE}步骤3：配置本地Git${NC}"
    echo "运行以下命令："
    echo ""
    echo -e "${YELLOW}# 进入项目目录${NC}"
    echo "cd $(pwd)"
    echo ""
    echo -e "${YELLOW}# 如果还没有初始化Git仓库${NC}"
    echo "git init"
    echo "git add ."
    echo "git commit -m 'Initial commit: TempLink'"
    echo ""
    echo -e "${YELLOW}# 添加远程仓库（替换为你的URL）${NC}"
    echo "git remote add origin https://github.com/你的用户名/templink.git"
    echo "git branch -M main"
    echo "git push -u origin main"
    echo ""
    echo -e "${BLUE}步骤4：启用GitHub Pages${NC}"
    echo "1. 访问你的GitHub仓库页面"
    echo "2. 点击 Settings → Pages"
    echo "3. 在 'Build and deployment' 部分："
    echo "   - Source: 选择 'Deploy from a branch'"
    echo "   - Branch: 选择 'main' 和 '/ (root)'"
    echo "4. 点击 Save"
    echo ""
    echo -e "${BLUE}步骤5：访问你的网站${NC}"
    echo "等待1-3分钟，然后访问："
    echo "https://你的用户名.github.io/templink/"
    echo ""
    echo -e "${GREEN}✅ 部署完成！${NC}"
    echo ""
    echo -e "${CYAN}更多详情请查看：${NC}"
    echo "- 项目目录中的 GITHUB_DEPLOYMENT.md"
    echo "- https://pages.github.com"
}

deploy_vercel() {
    log_step "Vercel 部署指南"
    echo ""
    echo -e "${CYAN}📋 Vercel 部署步骤：${NC}"
    echo ""
    echo -e "${BLUE}方法1：通过网站部署（推荐新手）${NC}"
    echo "1. 访问 vercel.com"
    echo "2. 使用GitHub账号登录"
    echo "3. 点击 'Add New Project'"
    echo "4. 导入你的GitHub仓库"
    echo "5. 点击 'Deploy'"
    echo ""
    echo -e "${BLUE}方法2：通过CLI部署（需要Node.js）${NC}"
    echo -e "${YELLOW}# 安装Vercel CLI${NC}"
    echo "npm install -g vercel"
    echo ""
    echo -e "${YELLOW}# 登录Vercel${NC}"
    echo "vercel login"
    echo ""
    echo -e "${YELLOW}# 进入项目目录并部署${NC}"
    echo "cd $(pwd)"
    echo "vercel --prod"
    echo ""
    echo -e "${BLUE}部署后访问地址${NC}"
    echo "格式为：https://templink.vercel.app"
    echo "或：https://templink-你的用户名.vercel.app"
    echo ""
    echo -e "${GREEN}✅ 部署完成！${NC}"
    echo ""
    echo -e "${CYAN}更多详情请查看：${NC}"
    echo "- 项目目录中的 VERCEL_DEPLOYMENT.md"
    echo "- https://vercel.com/docs"
}

deploy_netlify() {
    log_step "Netlify 部署指南"
    echo ""
    echo -e "${CYAN}📋 Netlify 部署步骤：${NC}"
    echo ""
    echo -e "${BLUE}方法1：拖拽部署（最简单）${NC}"
    echo "1. 访问 netlify.com"
    echo "2. 注册/登录账号"
    echo "3. 点击 'Add new site' → 'Deploy manually'"
    echo "4. 拖拽整个项目文件夹到指定区域"
    echo "5. 等待部署完成"
    echo ""
    echo -e "${BLUE}方法2：通过GitHub部署${NC}"
    echo "1. 登录Netlify"
    echo "2. 点击 'Add new site' → 'Import an existing project'"
    echo "3. 选择GitHub授权"
    echo "4. 选择你的仓库"
    echo "5. 配置部署设置（保持默认）"
    echo "6. 点击 'Deploy site'"
    echo ""
    echo -e "${BLUE}方法3：通过CLI部署（需要Node.js）${NC}"
    echo -e "${YELLOW}# 安装Netlify CLI${NC}"
    echo "npm install -g netlify-cli"
    echo ""
    echo -e "${YELLOW}# 登录Netlify${NC}"
    echo "netlify login"
    echo ""
    echo -e "${YELLOW}# 部署到生产环境${NC}"
    echo "cd $(pwd)"
    echo "netlify deploy --prod"
    echo ""
    echo -e "${BLUE}部署后访问地址${NC}"
    echo "格式为：https://随机名称.netlify.app"
    echo ""
    echo -e "${GREEN}✅ 部署完成！${NC}"
    echo ""
    echo -e "${CYAN}更多详情请查看：${NC}"
    echo "- 项目目录中的 NETLIFY_DEPLOYMENT.md"
    echo "- https://docs.netlify.com"
}

show_all_guides() {
    log_step "所有部署指南"
    echo ""
    echo -e "${CYAN}📚 可用的部署指南：${NC}"
    echo ""
    echo -e "${GREEN}1. GitHub Pages${NC}"
    echo "   文件：GITHUB_DEPLOYMENT.md"
    echo "   特点：完全免费，支持自定义域名"
    echo ""
    echo -e "${GREEN}2. Vercel${NC}"
    echo "   文件：VERCEL_DEPLOYMENT.md"
    echo "   特点：全球CDN，一键部署"
    echo ""
    echo -e "${GREEN}3. Netlify${NC}"
    echo "   文件：NETLIFY_DEPLOYMENT.md"
    echo "   特点：拖拽部署，内置表单"
    echo ""
    echo -e "${GREEN}4. 通用部署指南${NC}"
    echo "   文件：DEPLOYMENT.md"
    echo "   特点：所有平台的综合指南"
    echo ""
    echo -e "${CYAN}快速查看命令：${NC}"
    echo -e "${YELLOW}head -50 GITHUB_DEPLOYMENT.md${NC}"
    echo -e "${YELLOW}head -50 DEPLOYMENT.md${NC}"
    echo ""
    echo -e "${CYAN}或直接在编辑器中打开查看${NC}"
}

display_menu() {
    echo ""
    echo -e "${CYAN}请选择部署平台：${NC}"
    echo ""
    echo -e "${GREEN}1. GitHub Pages${NC}"
    echo "  ✅ 完全免费，支持自定义域名"
    echo "  ✅ 无需安装额外工具"
    echo "  ✅ 适合静态网站"
    echo ""
    echo -e "${GREEN}2. Vercel${NC}"
    echo "  ✅ 全球CDN，自动HTTPS"
    echo "  ✅ 一键部署，快速简便"
    echo "  ✅ 适合需要全球加速"
    echo ""
    echo -e "${GREEN}3. Netlify${NC}"
    echo "  ✅ 拖拽部署，最简单"
    echo "  ✅ 内置表单和身份验证"
    echo "  ✅ 适合团队协作"
    echo ""
    echo -e "${YELLOW}4. 查看所有部署指南${NC}"
    echo "  📘 查看详细的部署文档"
    echo "  📘 故障排除和高级配置"
    echo ""
    echo -e "${RED}0. 退出${NC}"
    echo ""
}

main() {
    display_banner
    
    if ! check_prerequisites; then
        log_warning "系统依赖检查未完全通过，部署可能受影响"
        read -p "按回车键继续..." 
    fi
    
    while true; do
        display_menu
        read -p "请输入选项 (0-4): " choice
        
        case $choice in
            1)
                deploy_github_pages
                read -p "按回车键返回主菜单..." 
                ;;
            2)
                deploy_vercel
                read -p "按回车键返回主菜单..." 
                ;;
            3)
                deploy_netlify
                read -p "按回车键返回主菜单..." 
                ;;
            4)
                show_all_guides
                read -p "按回车键返回主菜单..." 
                ;;
            0)
                log_info "退出部署助手"
                exit 0
                ;;
            *)
                log_error "无效选项，请重新输入"
                ;;
        esac
    done
}

# 运行主函数
main "$@"