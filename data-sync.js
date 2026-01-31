// ==================== GitHub数据同步模块 ====================
const GitHubDataSync = {
    // 导出数据到GitHub文件格式
    exportDataForGitHub: function() {
        const data = {
            thoughts: DataManager.thoughts,
            models: DataManager.models,
            tags: DataManager.tags,
            currentVersion: DataManager.currentVersion,
            lastSaved: DataManager.lastSaved,
            timeline: DataManager.timeline,
            exportDate: new Date().toISOString(),
            exportType: 'github'
        };
        
        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.json'; // 固定文件名，便于移动端加载
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        App.showMessage('数据已导出为data.json，可上传到GitHub仓库根目录', 'success');
        
        // 显示使用说明
        setTimeout(() => {
            if (confirm('是否查看移动端数据同步说明？')) {
                alert('移动端数据同步步骤：\n\n1. 将此data.json文件上传到GitHub仓库根目录\n2. 移动端访问 https://[用户名].github.io/[仓库名]/\n3. 移动端将自动从data.json加载数据\n\n注意：移动端为只读模式，数据更新需要在电脑端重新导出');
            }
        }, 500);
    },
    
    // 从GitHub加载数据（移动端使用）
    loadDataFromGitHub: function() {
        console.log('尝试从GitHub加载数据...');
        
        return fetch('./data.json')
            .then(response => {
                if (!response.ok) throw new Error('data.json文件不存在');
                return response.json();
            })
            .then(data => {
                console.log('从GitHub加载数据成功');
                return this.processGitHubData(data);
            })
            .catch(error => {
                console.error('从GitHub加载数据失败:', error);
                throw error;
            });
    },
    
    // 处理GitHub数据
    processGitHubData: function(data) {
        // 验证数据格式
        if (!data.thoughts || !data.models) {
            throw new Error('数据格式错误：缺少必要字段');
        }
        
        // 导入数据
        DataManager.thoughts = data.thoughts;
        DataManager.models = data.models;
        DataManager.tags = data.tags || {};
        DataManager.currentVersion = data.currentVersion || DataManager.currentVersion;
        DataManager.timeline = data.timeline || DataManager.timeline;
        
        // 更新UI统计
        DataManager.updateUIStats();
        
        // 显示成功消息
        App.showMessage('数据已从data.json加载成功', 'success');
        
        // 标记为只读模式
        this.enableReadonlyMode();
        
        return data;
    },
    
    // 启用只读模式
    enableReadonlyMode: function() {
        // 标记为只读模式
        document.body.classList.add('mobile-readonly-mode');
        
        // 隐藏编辑按钮
        const hideEditButtons = () => {
            const editButtons = document.querySelectorAll('.btn[onclick*="edit"], .btn[onclick*="save"], .btn[onclick*="delete"]');
            editButtons.forEach(btn => {
                btn.style.display = 'none';
            });
            
            // 隐藏输入框
            const inputAreas = document.querySelectorAll('input, textarea');
            inputAreas.forEach(input => {
                input.disabled = true;
                input.style.backgroundColor = '#f5f5f5';
                input.style.cursor = 'not-allowed';
            });
        };
        
        // 立即执行并监听DOM变化
        hideEditButtons();
        const observer = new MutationObserver(hideEditButtons);
        observer.observe(document.body, { childList: true, subtree: true });
    }
};

// ==================== 数据同步初始化 ====================
(function initDataSync() {
    console.log('数据同步模块初始化');
    
    // 如果是移动端，尝试从data.json加载
    if (App.isMobile()) {
        console.log('移动端模式：尝试从data.json加载数据');
        
        // 显示加载提示
        const loading = document.getElementById('loading');
        if (loading) {
            loading.style.display = 'block';
        }
        
        // 尝试从GitHub加载数据
        GitHubDataSync.loadDataFromGitHub()
            .then(() => {
                console.log('移动端数据加载成功');
                
                // 更新存储模式显示
                const storageMode = document.getElementById('storage-mode');
                if (storageMode) {
                    storageMode.textContent = 'GitHub数据';
                }
            })
            .catch(error => {
                console.log('GitHub数据加载失败，使用本地存储：', error);
                
                // 如果data.json不存在，使用本地存储
                DataManager.init();
                
                // 更新存储模式显示
                const storageMode = document.getElementById('storage-mode');
                if (storageMode) {
                    storageMode.textContent = '本地存储';
                }
                
                // 显示数据文件提示
                App.showMessage('未找到data.json文件，使用本地数据。请从电脑端导出数据文件。', 'warning');
            })
            .finally(() => {
                // 隐藏加载动画
                if (loading) {
                    loading.style.display = 'none';
                }
            });
    } else {
        // 电脑端：使用本地存储
        console.log('电脑端模式：使用本地存储');
        DataManager.init();
        
        // 更新存储模式显示
        const storageMode = document.getElementById('storage-mode');
        if (storageMode) {
            storageMode.textContent = '本地存储';
        }
    }
})();

// ==================== 导出到全局作用域 ====================
window.GitHubDataSync = GitHubDataSync;
// ==================== 数据同步模块 ====================
const DataSync = {
    // 导出数据
    exportData: function() {
        const data = {
            thoughts: DataManager.thoughts,
            models: DataManager.models,
            tags: DataManager.tags,
            currentVersion: DataManager.currentVersion,
            lastSaved: new Date().toISOString(),
            timeline: DataManager.timeline,
            exportDate: new Date().toISOString()
        };
        
        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `data.json`; // 固定文件名
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        if (App && App.showMessage) {
            App.showMessage('数据已导出为data.json文件', 'success');
        }
        
        return true;
    },
    
    // 导入数据
    importData: function() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (!file) return;
            
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const data = JSON.parse(event.target.result);
                    
                    // 验证数据格式
                    if (!data.thoughts || !data.models) {
                        throw new Error('数据格式错误：缺少必要字段');
                    }
                    
                    if (confirm('导入数据将覆盖当前数据，确定继续吗？')) {
                        // 导入数据
                        DataManager.thoughts = data.thoughts;
                        DataManager.models = data.models;
                        DataManager.tags = data.tags || {};
                        DataManager.currentVersion = data.currentVersion || DataManager.currentVersion;
                        DataManager.timeline = data.timeline || DataManager.timeline;
                        
                        // 保存到localStorage
                        DataManager.save();
                        
                        // 重新加载当前视图
                        if (App && App.currentView) {
                            App.loadView(App.currentView);
                        }
                        
                        if (App && App.showMessage) {
                            App.showMessage('数据导入成功', 'success');
                        }
                    }
                } catch (error) {
                    console.error('导入数据失败:', error);
                    if (App && App.showMessage) {
                        App.showMessage('导入失败：' + error.message, 'error');
                    }
                }
            };
            reader.readAsText(file);
        };
        
        input.click();
    },
    
    // 移动端数据加载
    loadMobileData: function() {
        console.log('尝试从data.json加载移动端数据');
        
        return fetch('./data.json')
            .then(response => {
                if (!response.ok) throw new Error('data.json文件不存在');
                return response.json();
            })
            .then(data => {
                console.log('从data.json加载数据成功');
                return this.processMobileData(data);
            })
            .catch(error => {
                console.error('从data.json加载数据失败:', error);
                // 如果没有data.json，使用本地存储
                DataManager.init();
                throw error;
            });
    },
    
    // 处理移动端数据
    processMobileData: function(data) {
        // 验证数据格式
        if (!data.thoughts || !data.models) {
            throw new Error('数据格式错误：缺少必要字段');
        }
        
        // 导入数据
        DataManager.thoughts = data.thoughts;
        DataManager.models = data.models;
        DataManager.tags = data.tags || {};
        DataManager.currentVersion = data.currentVersion || DataManager.currentVersion;
        DataManager.timeline = data.timeline || DataManager.timeline;
        
        // 移动端只读模式：禁用保存功能
        const originalSave = DataManager.save;
        DataManager.save = function() {
            console.log('移动端：保存功能已禁用');
            return false;
        };
        
        // 更新UI统计
        DataManager.updateUIStats();
        
        console.log('移动端数据加载完成');
        return data;
    }
};

// 全局导出
window.DataSync = DataSync;

// 自动初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('data-sync.js: DOM加载完成');
    
    // 移动端模式自动加载data.json
    if (window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        console.log('移动端检测，尝试加载data.json');
        
        // 显示加载中
        const contentArea = document.getElementById('content-area');
        if (contentArea) {
            contentArea.innerHTML = '<div id="loading" class="loading" style="margin: 100px auto;"></div>';
        }
        
        // 加载数据
        DataSync.loadMobileData()
            .then(() => {
                console.log('移动端数据加载成功');
                // 隐藏加载动画
                setTimeout(() => {
                    const loading = document.getElementById('loading');
                    if (loading) loading.style.display = 'none';
                }, 300);
                
                // 加载默认视图
                if (App && App.loadView) {
                    App.loadView('overview');
                }
            })
            .catch(() => {
                console.log('使用本地存储数据');
                // 隐藏加载动画
                setTimeout(() => {
                    const loading = document.getElementById('loading');
                    if (loading) loading.style.display = 'none';
                }, 300);
                
                // 加载默认视图
                if (App && App.loadView) {
                    App.loadView('overview');
                }
            });
    } else {
        // 桌面端：正常初始化
        console.log('桌面端模式');
        // DataManager会在App.init()中初始化
    }
});
