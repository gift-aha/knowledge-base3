// ==================== GitHub数据同步模块 ====================
const GitHubDataSync = {
    // 导出数据到GitHub文件格式
    exportDataForGitHub: function() {
        try {
            const data = {
                thoughts: DataManager.thoughts,
                models: DataManager.models,
                tags: DataManager.tags,
                currentVersion: DataManager.currentVersion,
                lastSaved: DataManager.lastSaved,
                timeline: DataManager.timeline,
                exportDate: new Date().toISOString()
            };
            
            const json = JSON.stringify(data, null, 2);
            const blob = new Blob([json], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'data.json';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            App.showMessage('数据已导出为data.json，可上传到GitHub仓库根目录', 'success');
            
        } catch (error) {
            console.error('导出数据失败:', error);
            App.showMessage('导出失败: ' + error.message, 'error');
        }
    },
    
    // 从GitHub加载数据（移动端使用）
    loadDataFromGitHub: function() {
        console.log('尝试从data.json加载数据...');
        
        return fetch('./data.json')
            .then(response => {
                if (!response.ok) throw new Error('data.json文件不存在');
                return response.json();
            })
            .then(data => {
                console.log('从data.json加载数据成功');
                return this.processGitHubData(data);
            })
            .catch(error => {
                console.error('从data.json加载数据失败:', error);
                throw error;
            });
    },
    
    // 处理GitHub数据
    processGitHubData: function(data) {
        // 验证数据格式
        if (!data.thoughts || !data.models) {
            throw new Error('数据格式错误');
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
        };
        
        // 立即执行
        hideEditButtons();
    }
};

// 简化的数据同步初始化
(function initDataSync() {
    console.log('数据同步模块初始化');
    
    // 绑定GitHub导出按钮
    document.addEventListener('DOMContentLoaded', function() {
        const githubBtn = document.getElementById('github-export-btn');
        if (githubBtn) {
            githubBtn.addEventListener('click', function(e) {
                e.preventDefault();
                GitHubDataSync.exportDataForGitHub();
            });
        }
    });
    
    // 如果是移动端，尝试从data.json加载
    if (App.isMobile && App.isMobile()) {
        console.log('移动端模式：尝试从data.json加载数据');
        
        // 尝试从GitHub加载数据
        GitHubDataSync.loadDataFromGitHub()
            .then(() => {
                console.log('移动端数据加载成功');
            })
            .catch(() => {
                console.log('data.json加载失败，使用本地存储');
                DataManager.init();
            });
    }
})();

// 导出到全局作用域
if (typeof window !== 'undefined') {
    window.GitHubDataSync = GitHubDataSync;
}
// 移动端数据加载策略
if (App.isMobile()) {
    console.log('移动端模式：尝试从data.json加载数据');
    
    // 尝试从data.json加载
    fetch('./data.json')
        .then(response => {
            if (!response.ok) throw new Error('data.json文件不存在');
            return response.json();
        })
        .then(data => {
            console.log('从data.json加载数据成功');
            
            // 导入数据
            if (data.thoughts && data.models) {
                DataManager.thoughts = data.thoughts;
                DataManager.models = data.models;
                DataManager.tags = data.tags || {};
                DataManager.currentVersion = data.currentVersion || DataManager.currentVersion;
                DataManager.timeline = data.timeline || DataManager.timeline;
                
                // 禁用保存功能
                DataManager.save = function() {
                    console.log('移动端：保存功能已禁用');
                    return false;
                };
                
                // 禁用添加/编辑功能
                const originalAddThought = DataManager.addStructuredThought;
                DataManager.addStructuredThought = function() {
                    App.showMessage('移动端：添加功能已禁用', 'warning');
                    return null;
                };
                
                const originalAddModel = DataManager.addModel;
                DataManager.addModel = function() {
                    App.showMessage('移动端：添加模型功能已禁用', 'warning');
                    return null;
                };
                
                // 显示移动端提示
                setTimeout(() => {
                    App.showMessage('移动端只读模式：数据从data.json加载', 'info');
                    
                    // 添加移动端只读样式
                    document.body.classList.add('mobile-readonly-mode');
                    
                    // 隐藏编辑按钮
                    const editButtons = document.querySelectorAll('.btn[onclick*="edit"], .btn[onclick*="save"], .btn[onclick*="delete"]');
                    editButtons.forEach(btn => {
                        btn.style.display = 'none';
                    });
                }, 1000);
            }
        })
        .catch(error => {
            console.log('从data.json加载失败，使用本地存储：', error);
            // 如果data.json不存在，使用本地存储
            DataManager.init();
        });
} else {
    // 电脑端：使用本地存储
    DataManager.init();
}
