class TempLinkManager {
    constructor() {
        // 获取基础URL，处理GitHub Pages的子路径
        this.baseUrl = window.location.origin + window.location.pathname.replace(/\/[^\/]*$/, '');
        if (this.baseUrl.endsWith('/')) {
            this.baseUrl = this.baseUrl.slice(0, -1);
        }
        console.log('Base URL:', this.baseUrl);
        
        this.targetUrlInput = document.getElementById('targetUrl');
        this.customSlugInput = document.getElementById('customSlug');
        this.generateBtn = document.getElementById('generateBtn');
        this.resultSection = document.getElementById('resultSection');
        this.generatedLinkElement = document.getElementById('generatedLink');
        this.timeRemainingElement = document.getElementById('timeRemaining');
        this.copyBtn = document.getElementById('copyBtn');
        this.shareBtn = document.getElementById('shareBtn');
        this.testBtn = document.getElementById('testBtn');
        this.qrCanvas = document.getElementById('qrCanvas');
        
        this.init();
    }
    
    init() {
        this.generateBtn.addEventListener('click', () => this.generateLink());
        this.copyBtn.addEventListener('click', () => this.copyLink());
        this.shareBtn.addEventListener('click', () => this.generateShareLink());
        this.testBtn.addEventListener('click', () => this.testRedirect());
        
        // 检查URL参数，如果是重定向链接则直接跳转
        this.checkForRedirect();
        
        // 显示当前时间（调试用）
        console.log('TempLink 已加载，当前时间：', new Date().toLocaleString('zh-CN'));
    }
    
    generateLinkId() {
        // 生成一个唯一的8位ID
        return Math.random().toString(36).substr(2, 8);
    }
    
    validateUrl(url) {
        try {
            new URL(url);
            return url.startsWith('http://') || url.startsWith('https://');
        } catch (e) {
            return false;
        }
    }
    
    generateLink() {
        const targetUrl = this.targetUrlInput.value.trim();
        const customSlug = this.customSlugInput.value.trim();
        
        if (!this.validateUrl(targetUrl)) {
            alert('请输入有效的网址（以 http:// 或 https:// 开头）');
            return;
        }
        
        const linkId = customSlug || this.generateLinkId();
        const expiryTimestamp = Date.now() + (48 * 60 * 60 * 1000); // 48小时后
        
        // 创建链接数据
        const linkData = {
            targetUrl: targetUrl,
            expiry: expiryTimestamp,
            created: Date.now(),
            clicks: 0
        };
        
        // 保存到 localStorage（用于在同一页面内的分享功能）
        localStorage.setItem(`temp_link_${linkId}`, JSON.stringify(linkData));
        
        // 将链接数据编码为JSON并进行base64编码
        const linkDataEncoded = {
            id: linkId,
            target: targetUrl,
            expiry: expiryTimestamp,
            created: Date.now()
        };
        const dataString = JSON.stringify(linkDataEncoded);
        const encodedData = btoa(encodeURIComponent(dataString)); // 先URL编码再base64编码
        
        // 生成完整的跳转链接，使用加密参数
        const redirectUrl = `${this.baseUrl}/redirect.html?data=${encodedData}`;
        
        // 显示结果
        this.displayResult(redirectUrl, expiryTimestamp);
        
        // 生成二维码
        this.generateQRCode(redirectUrl);
    }
    
    displayResult(link, expiryTimestamp) {
        this.generatedLinkElement.textContent = link;
        this.resultSection.classList.add('active');
        
        // 更新倒计时
        this.updateCountdown(expiryTimestamp);
        
        // 开始倒计时
        this.countdownInterval = setInterval(() => {
            this.updateCountdown(expiryTimestamp);
        }, 1000);
    }
    
    updateCountdown(expiryTimestamp) {
        const now = Date.now();
        const remaining = expiryTimestamp - now;
        
        if (remaining <= 0) {
            this.timeRemainingElement.textContent = '已过期';
            clearInterval(this.countdownInterval);
            return;
        }
        
        const hours = Math.floor(remaining / (1000 * 60 * 60));
        const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
        
        this.timeRemainingElement.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    generateQRCode(text) {
        const canvas = this.qrCanvas;
        const ctx = canvas.getContext('2d');
        
        // 清空画布
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 简单的二维码生成（简化版）
        const size = 200;
        canvas.width = size;
        canvas.height = size;
        
        // 绘制二维码背景
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, size, size);
        
        // 生成简单的二维码图案
        ctx.fillStyle = '#000';
        
        // 定位标记
        ctx.fillRect(10, 10, 50, 50);
        ctx.fillRect(10, size - 60, 50, 50);
        ctx.fillRect(size - 60, 10, 50, 50);
        
        // 数据区域（简化，实际应用应使用QR库）
        const textLength = text.length;
        for (let i = 0; i < textLength; i++) {
            const charCode = text.charCodeAt(i);
            const x = 70 + (i % 10) * 10;
            const y = 70 + Math.floor(i / 10) * 10;
            
            if (charCode % 2 === 0) {
                ctx.fillRect(x, y, 8, 8);
            }
        }
    }
    
    copyLink() {
        const link = this.generatedLinkElement.textContent;
        navigator.clipboard.writeText(link)
            .then(() => alert('链接已复制到剪贴板！'))
            .catch(err => {
                console.error('复制失败:', err);
                alert('复制失败，请手动复制链接');
            });
    }
    
    generateShareLink() {
        const link = this.generatedLinkElement.textContent;
        const url = new URL(link);
        const encodedData = url.searchParams.get('data');
        
        if (!encodedData) {
            alert('无法生成分享链接');
            return;
        }
        
        try {
            // 解码当前链接的数据
            const decodedString = decodeURIComponent(atob(encodedData));
            const linkData = JSON.parse(decodedString);
            
            const remainingTime = linkData.expiry - Date.now();
            
            if (remainingTime <= 0) {
                alert('链接已过期，无法分享');
                return;
            }
            
            // 生成分享ID
            const shareId = `${linkData.id}_share_${this.generateLinkId()}`;
            const shareExpiry = Date.now() + remainingTime;
            
            // 创建分享链接数据
            const shareLinkData = {
                targetUrl: linkData.target,
                expiry: shareExpiry,
                sharedFrom: linkData.id,
                created: Date.now(),
                clicks: 0
            };
            
            // 保存分享链接（用于向后兼容）
            localStorage.setItem(`temp_link_${shareId}`, JSON.stringify(shareLinkData));
            
            // 生成加密的分享链接
            const shareLinkEncoded = {
                id: shareId,
                target: linkData.target,
                expiry: shareExpiry,
                created: Date.now(),
                shared: linkData.id
            };
            const dataString = JSON.stringify(shareLinkEncoded);
            const newEncodedData = btoa(encodeURIComponent(dataString));
            
            const shareLink = `${this.baseUrl}/redirect.html?data=${newEncodedData}`;
            
            // 显示分享链接
            alert(`分享链接已生成：\n\n${shareLink}\n\n剩余时间与原始链接相同：${Math.floor(remainingTime / (1000 * 60 * 60))}小时`);
        } catch (error) {
            console.error('生成分享链接失败:', error);
            alert('生成分享链接失败，请重试');
        }
    }
    
    testRedirect() {
        const link = this.generatedLinkElement.textContent;
        window.open(link, '_blank');
    }
    
    checkForRedirect() {
        const urlParams = new URLSearchParams(window.location.search);
        const redirectId = urlParams.get('redirect');
        
        if (redirectId) {
            const linkData = localStorage.getItem(`temp_link_${redirectId}`);
            if (linkData) {
                const data = JSON.parse(linkData);
                
                // 检查是否过期
                if (Date.now() > data.expiry) {
                    this.showExpiredPage();
                    return;
                }
                
                // 更新点击次数
                data.clicks = (data.clicks || 0) + 1;
                localStorage.setItem(`temp_link_${redirectId}`, JSON.stringify(data));
                
                // 跳转到目标页面
                window.location.href = data.targetUrl;
            }
        }
    }
    
    showExpiredPage() {
        document.body.innerHTML = `
            <div class="container" style="max-width: 600px;">
                <h1 style="color: #ff4757; font-size: 48px;">⌛</h1>
                <h2>链接已过期</h2>
                <p>此链接已超过48小时有效期，无法继续访问。</p>
                <p>请向链接创建者请求新的链接。</p>
                <button onclick="window.location.href='index.html'" style="margin-top: 20px;">
                    返回主页创建新链接
                </button>
            </div>
        `;
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    new TempLinkManager();
});