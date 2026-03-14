#!/bin/bash

echo "🔐 TempLink 使用令牌部署"
echo "========================"
echo ""
echo "GitHub要求使用个人访问令牌进行认证。"
echo "请按照以下步骤操作："
echo ""

echo "📋 步骤1：生成个人访问令牌"
echo "1. 访问 https://github.com/settings/tokens"
echo "2. 点击 'Generate new token' → 'Generate new token (classic)'"
echo "3. 设置："
echo "   - Note: TempLink Deployment Token"
echo "   - Expiration: 建议90天"
echo "4. 选择权限：勾选 'repo'"
echo "5. 点击 'Generate token'"
echo "6. 立即复制生成的令牌（只显示一次！）"
echo ""

read -p "已复制令牌？按回车继续..." 

echo ""
echo "📋 步骤2：使用令牌推送代码"
echo ""

# 使用curl方式推送（避免交互式提示）
echo "方法A：使用Git命令（需要手动输入）"
echo "--------------------------------"
echo "运行："
echo "git push https://fasou:你的令牌@github.com/fasou/templink.git main"
echo ""
echo "将 '你的令牌' 替换为实际令牌"
echo ""

echo "方法B：使用令牌文件"
echo "------------------"
read -p "输入你的GitHub令牌: " token

if [ -z "$token" ]; then
    echo "❌ 未输入令牌"
    exit 1
fi

echo ""
echo "📤 开始推送代码..."
echo ""

# 使用令牌配置远程URL
git remote set-url origin https://fasou:$token@github.com/fasou/templink.git

# 尝试推送
git push -u origin main

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
    
    # 清理令牌信息
    git remote set-url origin https://github.com/fasou/templink.git
else
    echo ""
    echo "❌ 推送失败"
    echo ""
    echo "可能的原因："
    echo "1. 令牌无效或已过期"
    echo "2. 网络连接问题"
    echo "3. 仓库权限问题"
    echo ""
    echo "解决方案："
    echo "1. 重新生成令牌"
    echo "2. 检查网络"
    echo "3. 确认仓库存在"
    
    # 清理令牌信息
    git remote set-url origin https://github.com/fasou/templink.git
fi

echo ""
echo "脚本执行完毕"
echo ""
echo "💡 提示：令牌应该妥善保管，不要分享给他人"