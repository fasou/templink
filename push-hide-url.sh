#!/bin/bash

echo "🔒 推送隐藏目标网址修改"
echo "========================"
echo ""
echo "这个脚本将推送修改，使跳转页面不再显示目标网址。"
echo ""
echo "修改内容："
echo "1. 从redirect.html移除目标网址显示区域"
echo "2. 从redirect.js移除目标网址设置代码"
echo "3. 移除相关的CSS样式"
echo ""
echo "按回车键开始..."
read

cd /Users/archeros/CodeBuddy/Claw

echo "📋 检查修改..."
git status
echo ""

echo "📝 提交修改..."
git add .
git commit -m "隐藏跳转页面的目标网址显示，保护隐私"
echo ""

echo "🚀 推送到GitHub..."
echo "注意：需要输入GitHub用户名和令牌"
echo ""
echo "如果提示输入："
echo "- 用户名: fasou"
echo "- 密码: 你的个人访问令牌"
echo ""

git push origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ 修改推送成功！"
    echo ""
    echo "⏳ 等待GitHub Pages重新部署..."
    echo "大约需要1-3分钟"
    echo ""
    echo "🌐 部署完成后访问："
    echo "https://fasou.github.io/templink/"
    echo ""
    echo "🎯 测试："
    echo "1. 生成一个链接"
    echo "2. 点击链接跳转"
    echo "3. 验证页面不再显示目标网址"
else
    echo ""
    echo "❌ 推送失败"
    echo ""
    echo "可能的原因："
    echo "1. 认证失败"
    echo "2. 网络问题"
    echo "3. 仓库权限问题"
    echo ""
    echo "解决方案："
    echo "使用完整命令推送："
    echo "git push https://fasou:你的令牌@github.com/fasou/templink.git main"
fi