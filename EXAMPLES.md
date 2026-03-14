# TempLink 使用示例

本文档提供 TempLink 的详细使用示例和场景说明。

## 🎯 典型使用场景

### 场景1：临时文件分享
**需求**：分享一个临时文件下载链接，48小时后自动失效
```javascript
// 创建链接
目标网址：https://your-file-storage.com/file.pdf
自定义短链接：company-report
生成链接：https://templink.yourdomain.com/redirect.html?id=company-report
```

### 场景2：限时活动页面
**需求**：分享限时优惠活动，48小时后活动结束
```javascript
// 创建链接
目标网址：https://your-shop.com/sale-2024
自定义短链接：blackfriday-sale
生成链接：https://templink.yourdomain.com/redirect.html?id=blackfriday-sale
```

### 场景3：会议材料分享
**需求**：分享会议资料，会议结束后链接失效
```javascript
// 创建链接
目标网址：https://docs.google.com/presentation/d/abc123
自定义短链接：meeting-notes
生成链接：https://templink.yourdomain.com/redirect.html?id=meeting-notes
```

## 📋 完整使用流程示例

### 示例：团队协作文件分享

**步骤1：项目经理创建原始链接**
```
用户：项目经理张三
操作：创建临时链接
输入：https://company.com/project-plan.docx
生成：https://templink.com/redirect.html?id=project-plan-2024
剩余时间：48小时
```

**步骤2：分享给团队成员**
```
操作：点击"生成分享链接"
系统生成：https://templink.com/redirect.html?id=project-plan-2024_share_abc123
剩余时间：继承原始链接的47小时30分钟
```

**步骤3：团队成员再分享**
```
用户：李四（团队成员）
操作：收到分享链接，继续分享给王五
系统生成：https://templink.com/redirect.html?id=project-plan-2024_share_abc123_share_def456
剩余时间：继承原始链接的47小时15分钟
```

**步骤4：链接过期**
```
48小时后：所有链接自动失效
访问任何链接都会显示"链接已过期"
```

## 🔗 链接结构详解

### 原始链接结构
```
https://templink.yourdomain.com/redirect.html?id=abc123def
                                 │               │
                                 │               └─ 随机8位ID
                                 └─ 跳转页面
```

### 分享链接结构
```
https://templink.yourdomain.com/redirect.html?id=abc123def_share_xyz789ghi
                                 │               │          │       │
                                 │               │          │       └─ 分享随机ID
                                 │               │          └─ 标识为分享链接
                                 │               └─ 原始链接ID
                                 └─ 跳转页面
```

## ⏱️ 时间管理示例

### 时间线示例
```
时间点 00:00：创建原始链接，有效期至后天 00:00
时间点 01:00：生成第一个分享链接，剩余时间：47小时
时间点 02:00：生成第二个分享链接，剩余时间：46小时
时间点 23:00：所有链接剩余时间：25小时
时间点 48:00：所有链接过期
```

### 时间计算规则
```javascript
// 计算公式
剩余时间 = 原始链接过期时间 - 当前时间

// 示例计算
原始链接创建时间：2024-01-01 10:00
原始链接过期时间：2024-01-03 10:00
当前时间：2024-01-02 14:00
剩余时间：2024-01-03 10:00 - 2024-01-02 14:00 = 20小时
```

## 📊 统计信息示例

### 单个链接统计
```json
{
  "链接ID": "project-plan-2024",
  "目标网址": "https://company.com/project-plan.docx",
  "创建时间": "2024-01-01 10:00:00",
  "过期时间": "2024-01-03 10:00:00",
  "访问次数": 15,
  "首次访问": "2024-01-01 10:05:00",
  "最近访问": "2024-01-02 15:30:00",
  "分享次数": 3,
  "分享链": [
    "project-plan-2024_share_abc123",
    "project-plan-2024_share_abc123_share_def456",
    "project-plan-2024_share_ghi789"
  ]
}
```

## 🎨 界面展示示例

### 主页面展示
```
┌─────────────────────────────────────┐
│            ⏰ TempLink               │
│     创建48小时有效期的临时跳转链接    │
├─────────────────────────────────────┤
│ 输入目标网址：                       │
│ [https://example.com            ]   │
│                                      │
│ 自定义短链接（可选）：               │
│ [my-custom-link                 ]   │
│                                      │
│          [生成临时链接]              │
├─────────────────────────────────────┤
│ 📎 你的临时链接已生成                │
│ https://templink.com/redirect.html  │
│ ?id=my-custom-link                  │
│                                      │
│ ⏰ 有效期剩余：47:59:30              │
│                                      │
│ [📋 复制链接] [🔗 生成分享链接]     │
│ [🚀 测试跳转]                       │
└─────────────────────────────────────┘
```

### 跳转页面展示
```
┌─────────────────────────────────────┐
│            ⏰ TempLink               │
│        正在跳转到目标页面...        │
│               ⭘                     │
│              倒计时：3              │
├─────────────────────────────────────┤
│ https://example.com/page            │
├─────────────────────────────────────┤
│ 📋 链接信息                         │
│ • 链接类型：原始链接                │
│ • 剩余时间：47小时58分钟            │
│ • 创建时间：2024-01-01 10:00:00    │
│ • 访问次数：1                       │
└─────────────────────────────────────┘
```

## 🔧 高级使用技巧

### 技巧1：批量创建链接
使用JavaScript API批量创建：
```javascript
const links = [
  "https://example.com/page1",
  "https://example.com/page2",
  "https://example.com/page3"
];

links.forEach((url, index) => {
  const linkId = `link-${index}`;
  const linkData = {
    targetUrl: url,
    expiry: Date.now() + (48 * 60 * 60 * 1000),
    created: Date.now(),
    clicks: 0
  };
  localStorage.setItem(`temp_link_${linkId}`, JSON.stringify(linkData));
});
```

### 技巧2：链接管理
手动管理localStorage中的链接：
```javascript
// 查看所有链接
const allLinks = [];
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  if (key.startsWith('temp_link_')) {
    const data = JSON.parse(localStorage.getItem(key));
    allLinks.push({ id: key.replace('temp_link_', ''), ...data });
  }
}

// 删除过期链接
allLinks.forEach(link => {
  if (Date.now() > link.expiry) {
    localStorage.removeItem(`temp_link_${link.id}`);
  }
});
```

### 技巧3：自定义样式
修改CSS来自定义界面：
```css
/* 修改主题颜色 */
body {
  background: linear-gradient(135deg, #4CAF50 0%, #2196F3 100%);
}

button {
  background: linear-gradient(45deg, #FF9800, #FF5722);
}

/* 修改字体 */
* {
  font-family: 'Microsoft YaHei', sans-serif;
}
```

## 🚀 集成示例

### 集成到现有网站
```html
<!-- 在现有网站中嵌入链接生成器 -->
<div id="templink-container">
  <h3>生成临时分享链接</h3>
  <input type="url" id="templink-url" placeholder="输入网址">
  <button onclick="generateTempLink()">生成链接</button>
  <div id="templink-result"></div>
</div>

<script>
function generateTempLink() {
  const url = document.getElementById('templink-url').value;
  const linkId = Math.random().toString(36).substr(2, 8);
  const linkData = {
    targetUrl: url,
    expiry: Date.now() + (48 * 60 * 60 * 1000),
    created: Date.now()
  };
  
  localStorage.setItem(`temp_link_${linkId}`, JSON.stringify(linkData));
  
  const resultLink = `${window.location.origin}/redirect.html?id=${linkId}`;
  document.getElementById('templink-result').innerHTML = `
    <p>临时链接：<a href="${resultLink}" target="_blank">${resultLink}</a></p>
  `;
}
</script>
```

## 📝 最佳实践

### 实践1：链接命名规范
```
好的命名：project-report-2024
不好的命名：abc123（难以记忆）

好的命名：marketing-plan-q1
不好的命名：link1
```

### 实践2：使用场景规划
```
短期分享（<48小时）：使用TempLink
长期分享（>48小时）：使用其他永久链接服务
敏感信息：结合密码保护使用
团队协作：建立统一的链接命名规范
```

### 实践3：监控和维护
```
每日检查：查看链接使用情况
每周清理：清理过期的测试链接
每月统计：分析链接使用模式
定期备份：备份重要的链接数据
```

## ❓ 常见问题解答

**Q：链接可以提前删除吗？**
A：可以，通过localStorage手动删除或使用管理界面。

**Q：链接被点击多少次有限制吗？**
A：没有限制，但会统计访问次数。

**Q：可以修改已创建的链接吗？**
A：可以修改localStorage中存储的链接数据。

**Q：链接支持密码保护吗？**
A：当前版本不支持，可以后续扩展。

**Q：如何备份链接数据？**
A：导出localStorage数据或定期备份。

---

**TempLink** - 更多示例，更多可能！ 🎯