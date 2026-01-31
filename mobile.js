// 移动端专用逻辑
const MobileManager = {
    init: function() {
        console.log('MobileManager.init() 开始');
        
        // 只有移动端才执行
        if (!this.isMobile()) return;
        
        try {
            this.bindMobileEvents();
            this.adjustMobileLayout();
            console.log('MobileManager.init() 完成');
        } catch (error) {
            console.error('移动端初始化失败:', error);
        }
    },
    
    isMobile: function() {
        return window.innerWidth <= 768;
    },
    
    bindMobileEvents: function() {
        // 移动端菜单按钮
        const menuToggle = document.getElementById('mobile-menu-toggle');
        if (menuToggle) {
            menuToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                menuToggle.classList.toggle('active');
            });
        }
        
        // 移动端搜索按钮
        const searchToggle = document.getElementById('mobile-search-toggle');
        const searchBar = document.getElementById('mobile-search-bar');
        if (searchToggle && searchBar) {
            searchToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                searchBar.classList.toggle('active');
                searchToggle.classList.toggle('active');
                
                // 如果打开搜索栏，聚焦输入框
                if (searchBar.classList.contains('active')) {
                    setTimeout(() => {
                        const searchInput = document.getElementById('mobile-search-input');
                        if (searchInput) searchInput.focus();
                    }, 100);
                }
            });
        }
        
        // 移动端视图切换按钮
        const viewToggle = document.getElementById('mobile-view-toggle');
        const viewSwitcher = document.getElementById('mobile-view-switcher');
        if (viewToggle && viewSwitcher) {
            viewToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                viewSwitcher.classList.toggle('active');
                viewToggle.classList.toggle('active');
            });
        }
        
        // 移动端搜索清除按钮
        const searchClear = document.getElementById('mobile-search-clear');
        const mobileSearchInput = document.getElementById('mobile-search-input');
        if (searchClear && mobileSearchInput) {
            searchClear.addEventListener('click', () => {
                mobileSearchInput.value = '';
                mobileSearchInput.focus();
                App.performSearch('');
            });
        }
        
        // 移动端搜索输入
        if (mobileSearchInput) {
            mobileSearchInput.addEventListener('input', (e) => {
                App.performSearch(e.target.value);
            });
            
            mobileSearchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    App.performSearch(e.target.value);
                    // 隐藏搜索栏
                    if (searchBar) searchBar.classList.remove('active');
                }
            });
        }
        
        // 移动端导航项
        const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
        mobileNavItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                // 移除所有active类
                mobileNavItems.forEach(nav => nav.classList.remove('active'));
                
                // 添加active类到当前项
                item.classList.add('active');
                
                // 加载视图
                const view = item.getAttribute('data-view');
                App.loadView(view);
                
                // 滚动到顶部
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        });
        
        // 移动端视图切换器选项
        const viewOptions = document.querySelectorAll('.mobile-view-option');
        viewOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const view = option.getAttribute('data-view');
                App.loadView(view);
                
                // 更新活动状态
                viewOptions.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
                
                // 关闭切换器
                if (viewSwitcher) viewSwitcher.classList.remove('active');
            });
        });
    },
    
    adjustMobileLayout: function() {
        // 添加移动端样式类
        document.body.classList.add('mobile-mode');
        
        // 隐藏桌面端元素
        const desktopElements = document.querySelectorAll('.desktop-only');
        desktopElements.forEach(el => el.style.display = 'none');
        
        // 调整内容区域间距
        const contentArea = document.getElementById('content-area');
        if (contentArea) {
            contentArea.style.paddingTop = '80px';
            contentArea.style.paddingBottom = '80px';
        }
    }
};

// 初始化移动端管理器
document.addEventListener('DOMContentLoaded', function() {
    MobileManager.init();
});

// 窗口大小变化时重新检测
window.addEventListener('resize', function() {
    if (MobileManager.isMobile()) {
        document.body.classList.add('mobile-mode');
    } else {
        document.body.classList.remove('mobile-mode');
    }
});
