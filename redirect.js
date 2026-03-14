class RedirectManager {
    constructor() {
        this.urlParams = new URLSearchParams(window.location.search);
        this.linkId = this.urlParams.get('id');
        
        this.countdownElement = document.getElementById('countdown');
        this.timeRemainingElement = document.getElementById('timeRemaining');
        this.createdAtElement = document.getElementById('createdAt');
        this.clickCountElement = document.getElementById('clickCount');
        this.linkTypeElement = document.getElementById('linkType');
        this.warningElement = document.getElementById('warning');
        this.shareInfoElement = document.getElementById('shareInfo');
        this.copyShareBtn = document.getElementById('copyShareBtn');
        this.showShareBtn = document.getElementById('showShareBtn');
        
        this.init();
    }
    
    init() {
        if (!this.linkId) {
            this.showError('缺少链接ID参数');
            return;
        }
        
        this.loadLinkData();
        
        this.copyShareBtn.addEventListener('click', () => this.copyShareLink());
        this.showShareBtn.addEventListener('click', () => this.showShareRules());
    }
    
    loadLinkData() {
        // 尝试从加密的URL参数获取数据（主要方式）
        // 先尝试新的紧凑格式（d=参数）
        const encodedData = this.urlParams.get('d') || this.urlParams.get('data');
        
        if (encodedData) {
            try {
                // 解码base64
                const decodedString = atob(encodedData);
                
                // 解析紧凑格式：id|target|expiry|created
                const parts = decodedString.split('|');
                
                if (parts.length >= 4) {
                    const data = {
                        targetUrl: parts[1],
                        expiry: parseInt(parts[2]),
                        created: parts[3] ? parseInt(parts[3]) : Date.now(),
                        clicks: 0
                    };
                    
                    // 保存linkId用于后续处理
                    this.linkId = parts[0];
                    
                    this.linkData = data;
                    
                    // 检查链接是否过期
                    const now = Date.now();
                    if (now > data.expiry) {
                        this.showExpired();
                        return;
                    }
                    
                    // 显示链接信息
                    this.displayLinkInfo(data);
                    
                    // 开始跳转倒计时
                    this.startRedirectCountdown(data.targetUrl);
                    return;
                }
            } catch (error) {
                console.error('紧凑格式数据解码失败:', error);
                
                // 如果紧凑格式失败，尝试旧的JSON格式
                try {
                    // 解码base64并解析JSON数据
                    const decodedString = decodeURIComponent(atob(encodedData));
                    const decodedData = JSON.parse(decodedString);
                    
                    const data = {
                        targetUrl: decodedData.target,
                        expiry: parseInt(decodedData.expiry),
                        created: decodedData.created ? parseInt(decodedData.created) : Date.now(),
                        clicks: 0
                    };
                    
                    // 保存linkId用于后续处理
                    this.linkId = decodedData.id;
                    
                    this.linkData = data;
                    
                    // 检查链接是否过期
                    const now = Date.now();
                    if (now > data.expiry) {
                        this.showExpired();
                        return;
                    }
                    
                    // 显示链接信息
                    this.displayLinkInfo(data);
                    
                    // 开始跳转倒计时
                    this.startRedirectCountdown(data.targetUrl);
                    return;
                } catch (jsonError) {
                    console.error('JSON格式数据解码失败:', jsonError);
                }
            }
        }
        
        // 如果没有加密数据，尝试旧的URL参数方式（向后兼容）
        const targetUrl = this.urlParams.get('target');
        const expiryParam = this.urlParams.get('expiry');
        const createdParam = this.urlParams.get('created');
        
        if (targetUrl && expiryParam) {
            // 使用URL参数中的数据
            const data = {
                targetUrl: decodeURIComponent(targetUrl),
                expiry: parseInt(expiryParam),
                created: createdParam ? parseInt(createdParam) : Date.now(),
                clicks: 0
            };
            this.linkData = data;
            
            // 检查链接是否过期
            const now = Date.now();
            if (now > data.expiry) {
                this.showExpired();
                return;
            }
            
            // 显示链接信息
            this.displayLinkInfo(data);
            
            // 开始跳转倒计时
            this.startRedirectCountdown(data.targetUrl);
            return;
        }
        
        // 如果URL参数中没有数据，尝试从localStorage读取（向后兼容）
        const linkData = localStorage.getItem(`temp_link_${this.linkId}`);
        
        if (!linkData) {
            this.showError('链接不存在或已删除');
            return;
        }
        
        const data = JSON.parse(linkData);
        this.linkData = data;
        
        // 检查链接是否过期
        const now = Date.now();
        if (now > data.expiry) {
            this.showExpired();
            return;
        }
        
        // 显示链接信息
        this.displayLinkInfo(data);
        
        // 更新点击次数
        data.clicks = (data.clicks || 0) + 1;
        localStorage.setItem(`temp_link_${this.linkId}`, JSON.stringify(data));
        
        // 开始跳转倒计时
        this.startRedirectCountdown(data.targetUrl);
    }
    
    displayLinkInfo(data) {
        // 计算剩余时间
        const remaining = data.expiry - Date.now();
        const hours = Math.floor(remaining / (1000 * 60 * 60));
        const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
        
        this.timeRemainingElement.textContent = `${hours}小时${minutes}分钟`;
        
        // 创建时间
        const createdDate = new Date(data.created);
        this.createdAtElement.textContent = createdDate.toLocaleString('zh-CN');
        
        // 访问次数（URL参数传递的链接初始点击数为0）
        this.clickCountElement.textContent = (data.clicks || 0) + 1;
        
        // 链接类型
        const sharedFrom = data.sharedFrom;
        if (sharedFrom) {
            this.linkTypeElement.textContent = '分享链接（继承剩余时间）';
            data.sharedFrom = sharedFrom; // 保存到data对象中
            this.showShareRules();
        } else {
            this.linkTypeElement.textContent = '原始链接';
        }
        
        // 如果是分享链接，隐藏分享按钮
        if (sharedFrom) {
            this.shareInfoElement.style.display = 'none';
        }
    }
    
    startRedirectCountdown(targetUrl) {
        let count = 3;
        
        const countdownInterval = setInterval(() => {
            this.countdownElement.textContent = count;
            
            if (count <= 0) {
                clearInterval(countdownInterval);
                this.performRedirect(targetUrl);
            }
            
            count--;
        }, 1000);
    }
    
    performRedirect(targetUrl) {
        // 记录跳转时间
        this.recordRedirectTime();
        
        // 跳转到目标页面
        window.location.href = targetUrl;
    }
    
    recordRedirectTime() {
        // 记录首次访问时间（如果还没有记录的话）
        if (!this.linkData.firstAccess) {
            this.linkData.firstAccess = Date.now();
            localStorage.setItem(`temp_link_${this.linkId}`, JSON.stringify(this.linkData));
        }
    }
    
    copyShareLink() {
        if (!this.linkData) {
            alert('链接数据未加载');
            return;
        }
        
        const remaining = this.linkData.expiry - Date.now();
        if (remaining <= 0) {
            alert('链接已过期，无法分享');
            return;
        }
        
        // 生成分享ID
        const shareId = `${this.linkId}_share_${this.generateLinkId()}`;
        const shareExpiry = Date.now() + remaining;
        
        // 创建分享链接数据
        const shareData = {
            targetUrl: this.linkData.targetUrl,
            expiry: shareExpiry,
            sharedFrom: this.linkId,
            created: Date.now(),
            clicks: 0
        };
        
        // 保存分享链接（用于向后兼容）
        localStorage.setItem(`temp_link_${shareId}`, JSON.stringify(shareData));
        
        // 生成紧凑格式的分享链接数据
        const compactData = `${shareId}|${this.linkData.targetUrl}|${shareExpiry}|${Date.now()}|${this.linkId}`;
        const encodedData = btoa(compactData);
        
        // 获取正确的base URL（处理子路径）
        const baseUrl = window.location.origin + window.location.pathname.replace(/\/[^\/]*$/, '');
        const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
        const shareLink = `${cleanBaseUrl}/redirect.html?d=${encodedData}`;
        
        // 复制到剪贴板
        navigator.clipboard.writeText(shareLink)
            .then(() => {
                alert(`分享链接已复制！\n\n${shareLink}\n\n剩余时间：${Math.floor(remaining / (1000 * 60 * 60))}小时`);
            })
            .catch(err => {
                console.error('复制失败:', err);
                alert('复制失败，请手动复制：\n' + shareLink);
            });
    }
    
    generateLinkId() {
        return Math.random().toString(36).substr(2, 8);
    }
    
    showShareRules() {
        alert(
            '📋 分享规则说明：\n\n' +
            '1. 点击"复制分享链接"按钮可以生成新的分享链接\n' +
            '2. 分享链接会继承原始链接的剩余时间\n' +
            '3. 被分享的链接可以继续分享给其他人\n' +
            '4. 所有链接都在48小时后统一失效\n' +
            '5. 链接的时效性基于原始链接的创建时间\n' +
            '\n例如：\n' +
            '• 原始链接在10:00创建，48小时后（第二天10:00）失效\n' +
            '• 所有分享的链接都在第二天10:00失效\n'
        );
    }
    
    showExpired() {
        this.warningElement.classList.add('active');
        this.shareInfoElement.style.display = 'none';
    }
    
    showError(message) {
        this.warningElement.innerHTML = `
            <h3 style="color: #f44336;">❌ 错误</h3>
            <p>${message}</p>
            <button onclick="window.location.href='index.html'">返回主页创建新链接</button>
        `;
        this.warningElement.classList.add('active');
        this.shareInfoElement.style.display = 'none';
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    new RedirectManager();
    
    // 显示调试信息
    console.log('重定向管理器已初始化，链接ID：', new URLSearchParams(window.location.search).get('id'));
});