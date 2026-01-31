// 移动端配置
const MobileConfig = {
    // 隐藏的菜单项（移动端不需要的）
    hiddenMenuItems: [
        'add-structured',
        'add-model',
        'tag-review',
        'network-analysis',
        'timeline',
        'data-management'
    ],
    
    // 只读的页面
    readonlyPages: [
        'add-structured',
        'add-model'
    ],
    
    init: function() {
        if (!this.isMobile()) return;
        
        console.log('移动端配置初始化');
        
        // 隐藏不需要的菜单项
        this.hideMenuItems();
        
        // 添加移动端提示
        this.addMobileNotice();
        
        // 禁用编辑功能
        this.disableEditFunctions();
    },
    
    isMobile: function() {
        return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },
    
    hideMenuItems: function() {
        // 桌面端导航隐藏
        document.querySelectorAll('.nav-links a').forEach(link => {
            const view = link.getAttribute('data-view');
            if (this.hiddenMenuItems.includes(view)) {
                link.style.display = 'none';
            }
        });
        
        // 移动端导航隐藏
        document.querySelectorAll('.mobile-nav-item').forEach(item => {
            const view = item.getAttribute('data-view');
            if (this.hiddenMenuItems.includes(view)) {
                item.style.display = 'none';
            }
        });
        
        // 移动端视图切换器隐藏
        document.querySelectorAll('.mobile-view-option').forEach(item => {
            const view = item.getAttribute('data-view');
            if (this.hiddenMenuItems.includes(view)) {
                item.style.display = 'none';
            }
        });
    },
    
    addMobileNotice: function() {
        const notice = document.createElement('div');
        notice.className = 'mobile-data-notice';
        notice.innerHTML = `
            <i class="fas fa-mobile-alt"></i>
            <h4>移动端只读模式</h4>
            <p>数据从data.json文件加载</p>
            <p><small>如需编辑数据，请在电脑端操作后重新生成data.json</small></p>
        `;
        
        const contentArea = document.getElementById('content-area');
        if (contentArea) {
            contentArea.parentNode.insertBefore(notice, contentArea);
        }
    },
    
    disableEditFunctions: function() {
        // 覆盖DataManager的保存方法
        const originalSave = DataManager.save;
        DataManager.save = function() {
            App.showMessage('移动端：保存功能已禁用', 'info');
            return false;
        };
        
        // 监听页面切换，隐藏编辑按钮
        const originalLoadView = App.loadView;
        App.loadView = function(view) {
            originalLoadView.call(this, view);
            
            setTimeout(() => {
                if (MobileConfig.readonlyPages.includes(view)) {
                    // 隐藏所有操作按钮
                    document.querySelectorAll('.btn-group, .action-buttons').forEach(group => {
                        group.style.display = 'none';
                    });
                }
            }, 100);
        };
        
        // 在页面添加移动端只读样式
        document.body.classList.add('mobile-readonly-mode');
    }
};

// 在应用初始化时调用
document.addEventListener('DOMContentLoaded', function() {
    MobileConfig.init();
});
