// mobile.js - 移动端专用功能

// 移动端管理器
const MobileManager = {
    isMobile: function() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },
    
    init: function() {
        if (!this.isMobile()) return;
        
        console.log('移动端模式已激活');
        
        // 添加移动端样式类
        document.body.classList.add('mobile-mode');
        
        // 设置移动端导航
        this.setupMobileNavigation();
        
        // 设置移动端搜索
        this.setupMobileSearch();
        
        // 设置移动端视图切换器
        this.setupMobileViewSwitcher();
        
        // 设置移动端底部导航
        this.setupMobileBottomNav();
        
        // 设置触摸事件优化
        this.setupTouchEvents();
        
        // 设置视口修复
        this.setupViewportFix();
        
        // 监听窗口大小变化
        window.addEventListener('resize', this.handleResize.bind(this));
        
        // 初始处理
        this.handleResize();
    },
    
    setupMobileNavigation: function() {
        const menuToggle = document.getElementById('mobile-menu-toggle');
        
        if (menuToggle) {
            menuToggle.addEventListener('click', () => {
                menuToggle.classList.toggle('active');
                // 这里可以添加侧边栏菜单的显示/隐藏逻辑
                alert('移动端菜单功能开发中');
            });
        }
    },
    
    setupMobileSearch: function() {
        const searchToggle = document.getElementById('mobile-search-toggle');
        const searchBar = document.getElementById('mobile-search-bar');
        const searchInput = document.getElementById('mobile-search-input');
        const searchClear = document.getElementById('mobile-search-clear');
        
        if (searchToggle && searchBar) {
            searchToggle.addEventListener('click', () => {
                // 关闭视图切换器
                const viewSwitcher = document.getElementById('mobile-view-switcher');
                const viewToggle = document.getElementById('mobile-view-toggle');
                if (viewSwitcher) viewSwitcher.classList.remove('active');
                if (viewToggle) viewToggle.classList.remove('active');
                
                // 切换搜索栏
                searchBar.classList.toggle('active');
                searchToggle.classList.toggle('active');
                
                // 聚焦搜索框
                if (searchBar.classList.contains('active')) {
                    setTimeout(() => {
                        if (searchInput) searchInput.focus();
                    }, 300);
                }
            });
        }
        
        if (searchClear && searchInput) {
            searchClear.addEventListener('click', () => {
                searchInput.value = '';
                searchInput.focus();
            });
        }
    },
    
    setupMobileViewSwitcher: function() {
        const viewToggle = document.getElementById('mobile-view-toggle');
        const viewSwitcher = document.getElementById('mobile-view-switcher');
        const viewOptions = document.querySelectorAll('.mobile-view-option');
        
        if (viewToggle && viewSwitcher) {
            viewToggle.addEventListener('click', () => {
                // 关闭搜索栏
                const searchBar = document.getElementById('mobile-search-bar');
                const searchToggle = document.getElementById('mobile-search-toggle');
                if (searchBar) searchBar.classList.remove('active');
                if (searchToggle) searchToggle.classList.remove('active');
                
                // 切换视图切换器
                viewSwitcher.classList.toggle('active');
                viewToggle.classList.toggle('active');
            });
        }
        
        // 点击视图选项
        if (viewOptions.length > 0) {
            viewOptions.forEach(option => {
                option.addEventListener('click', () => {
                    const view = option.getAttribute('data-view');
                    
                    // 更新活动状态
                    viewOptions.forEach(opt => opt.classList.remove('active'));
                    option.classList.add('active');
                    
                    // 加载视图
                    if (typeof UIManager !== 'undefined') {
                        UIManager.loadView(view);
                    }
                    
                    // 关闭切换器
                    if (viewSwitcher) viewSwitcher.classList.remove('active');
                    if (viewToggle) viewToggle.classList.remove('active');
                });
            });
        }
    },
    
    setupMobileBottomNav: function() {
        const navItems = document.querySelectorAll('.mobile-nav-item');
        
        // 底部导航点击事件
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                
                const view = item.getAttribute('data-view');
                
                // 更新活动状态
                navItems.forEach(navItem => navItem.classList.remove('active'));
                item.classList.add('active');
                
                // 加载视图
                if (typeof UIManager !== 'undefined') {
                    UIManager.loadView(view);
                }
                
                // 滚动到顶部
                window.scrollTo(0, 0);
            });
        });
    },
    
    setupTouchEvents: function() {
        // 防止双击缩放
        let lastTouchEnd = 0;
        document.addEventListener('touchend', function(event) {
            const now = Date.now();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
        
        // 优化长按行为
        document.addEventListener('contextmenu', function(e) {
            if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') {
                e.preventDefault();
            }
        });
    },
    
    setupViewportFix: function() {
        // 防止输入框聚焦时页面缩放
        let viewport = document.querySelector('meta[name="viewport"]');
        
        function preventZoom() {
            viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
        }
        
        function allowZoom() {
            viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes');
        }
        
        const inputs = document.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', preventZoom);
            input.addEventListener('blur', allowZoom);
        });
    },
    
    handleResize: function() {
        const isMobile = window.innerWidth <= 1024;
        
        // 更新UI状态
        if (isMobile) {
            // 移动端模式
            document.body.classList.add('mobile-mode');
            document.body.classList.remove('desktop-mode');
        } else {
            // 桌面端模式
            document.body.classList.add('desktop-mode');
            document.body.classList.remove('mobile-mode');
        }
    }
};

// 初始化移动端管理器
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        if (typeof MobileManager !== 'undefined' && MobileManager.isMobile()) {
            MobileManager.init();
        }
    }, 100);
});
