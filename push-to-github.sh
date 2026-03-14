#!/bin/bash

echo "🚀 TempLink 代码推送脚本"
echo "========================"
echo ""
echo "这个脚本将把TempLink项目推送到GitHub仓库："
echo "https://github.com/fasou/templink.git"
echo ""
echo "注意：推送时需要你授权（输入GitHub用户名和密码）"
echo ""
echo "按回车键开始推送..."
read

# 检查是否在正确目录
if [ ! -f "index.html" ]; then
    echo "❌ 错误：不在项目根目录"
    echo "请切换到：/Users/archeros/CodeBuddy/Claw"
    exit 1
fi

# 检查Git配置
echo "📋 检查Git配置..."
git remote -v
echo ""

# 推送代码
echo "📤 开始推送代码到GitHub..."
echo "这可能需要几秒钟，请耐心等待..."
echo ""
echo "如果提示输入用户名，请输入：fasou"
echo "如果提示输入密码，请输入GitHub密码或个人访问令牌"
echo ""

# 执行推送
git push -u origin main

# 检查推送结果
if [ $? -eq 0 ]; then
    echo ""
    echo "✅ 代码推送成功！"
    echo ""
    echo "🎉 下一步：启用GitHub Pages"
    echo "1. 访问 https://github.com/fasou/templink"
    echo "2. 点击 Settings → Pages"
    echo "3. 配置："
    echo "   - Source: Deploy from a branch"
    echo "   - Branch: main"
    echo "   - Folder: / (root)"
    echo "4. 点击 Save"
    echo ""
    echo "📱 部署完成后访问："
    echo "https://fasou.github.io/templink/"
else
    echo ""
    echo "❌ 代码推送失败"
    echo ""
    echo "📋 可能的原因："
    echo "1. 网络连接问题"
    echo "2. 认证失败（用户名/密码错误）"
    echo "3. 仓库权限问题"
    echo ""
    echo "🔧 解决方案："
    echo "1. 检查网络连接"
    echo "2. 使用个人访问令牌代替密码"
    echo "   （GitHub → Settings → Developer settings → Personal access tokens）"
    echo "3. 确认仓库存在且有写入权限"
fi

echo ""
echo "脚本执行完毕"