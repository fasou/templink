#!/bin/bash

echo "🚀 TempLink 部署脚本"
echo "========================"

# 检查是否已安装git
if ! command -v git &> /dev/null; then
    echo "❌ 未找到git，请先安装git"
    exit 1
fi

echo "✅ Git 已安装"

# 初始化Git仓库（如果不存在）
if [ ! -d ".git" ]; then
    echo "📁 初始化Git仓库..."
    git init
    git add .
    git commit -m "Initial commit - TempLink project"
    echo "✅ Git仓库初始化完成"
fi

echo ""
echo "📋 请选择部署方式："
echo "1. GitHub Pages（推荐）"
echo "2. Vercel（一键部署）"
echo "3. Netlify（拖拽部署）"
echo ""
read -p "请输入选项 (1-3): " choice

case $choice in
    1)
        echo "📦 部署到 GitHub Pages"
        echo ""
        echo "步骤："
        echo "1. 在GitHub创建新仓库"
        echo "2. 将代码推送到仓库"
        echo "3. 在仓库设置中启用GitHub Pages"
        echo ""
        read -p "请输入GitHub仓库URL（例如：https://github.com/用户名/仓库名）: " repo_url
        
        if [[ -z "$repo_url" ]]; then
            echo "❌ 请输入有效的仓库URL"
            exit 1
        fi
        
        # 添加远程仓库并推送
        git remote add origin "$repo_url"
        git branch -M main
        git push -u origin main
        
        echo ""
        echo "✅ 代码已推送到GitHub"
        echo ""
        echo "📝 接下来手动操作："
        echo "1. 访问你的GitHub仓库页面"
        echo "2. 点击 Settings > Pages"
        echo "3. 选择 Branch: main 和 Folder: / (root)"
        echo "4. 点击 Save"
        echo "5. 等待几分钟，访问 https://你的用户名.github.io/仓库名"
        ;;
    
    2)
        echo "🌐 部署到 Vercel"
        echo ""
        echo "确保已安装Vercel CLI："
        echo "npm install -g vercel"
        echo ""
        echo "然后运行："
        echo "vercel --prod"
        echo ""
        echo "或访问 vercel.com，导入GitHub仓库一键部署"
        ;;
    
    3)
        echo "🌐 部署到 Netlify"
        echo ""
        echo "步骤："
        echo "1. 访问 netlify.com"
        echo "2. 注册/登录账号"
        echo "3. 点击 'Add new site' > 'Deploy manually'"
        echo "4. 拖拽整个项目文件夹到页面"
        echo "5. 等待部署完成"
        ;;
    
    *)
        echo "❌ 无效选项"
        exit 1
        ;;
esac

echo ""
echo "🎉 部署指南完成！"
echo "📖 更多详情请查看 DEPLOYMENT.md 文件"