// 移动端配置
const MobileConfig = {
    init: function() {
        console.log('MobileConfig初始化');
        
        if (!this.isMobile()) return;
        
        console.log('移动端模式启用');
        
        // 添加移动端只读提示
        this.addMobileNotice();
        
        // 标记为移动端模式
        document.body.classList.add('mobile-mode');
    },
    
    isMobile: function() {
        return window.innerWidth <= 768;
    },
    
    addMobileNotice: function() {
        // 检查是否已有通知
        if (document.querySelector('.mobile-data-notice')) return;
        
        const notice = document.createElement('div');
        notice.className = 'mobile-data-notice';
        notice.innerHTML = `
            <i class="fas fa-mobile-alt"></i>
            <h4>移动端只读模式</h4>
            <p>数据从data.json文件加载</p>
            <p><small>如需编辑数据，请在电脑端操作</small></p>
        `;
        
        const contentArea = document.getElementById('content-area');
        if (contentArea) {
            contentArea.parentNode.insertBefore(notice, contentArea);
        }
    }
};

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    MobileConfig.init();
});
