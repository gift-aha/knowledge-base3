// ==================== GitHub数据同步模块 ====================
const GitHubDataSync = {
    // 导出数据到GitHub文件（电脑端使用）
    exportDataForGitHub: function() {
        console.log('GitHubDataSync.exportDataForGitHub() 调用');
        
        // 获取当前数据
        const data = localStorage.getItem('structuredThoughtAssistant');
        if (!data) {
            alert('没有数据可导出');
            return;
        }
        
        try {
            const parsedData = JSON.parse(data);
            
            // 创建Blob对象
            const blob = new Blob([JSON.stringify(parsedData, null, 2)], { 
                type: 'application/json' 
            });
            
            // 创建下载链接
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'thought-data.json';
            
            // 添加到页面并触发下载
            document.body.appendChild(a);
            a.click();
            
            // 清理
            setTimeout(() => {
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }, 100);
            
            alert('数据已导出为 thought-data.json 文件\n请将此文件上传到GitHub仓库的data文件夹');
        } catch (error) {
            console.error('导出失败:', error);
            alert('导出失败: ' + error.message);
        }
    },
    
    // 从GitHub加载数据（移动端使用）
    loadDataFromGitHub: function() {
        console.log('GitHubDataSync.loadDataFromGitHub() 调用 - 移动端数据加载');
        
        // 这里应该是从GitHub Pages获取数据的逻辑
        // 由于GitHub Pages需要具体的URL，这里提供一个示例
        
        const githubDataUrl = 'https://yourusername.github.io/your-repo/data/thought-data.json';
        
        // 实际使用时，取消注释下面的代码，并替换为正确的URL
        
        /*
        fetch(githubDataUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('网络响应不正常');
                }
                return response.json();
            })
            .then(data => {
                // 将数据保存到localStorage
                localStorage.setItem('structuredThoughtAssistant', JSON.stringify(data));
                
                // 刷新应用
                if (typeof App !== 'undefined') {
                    App.showMessage('从GitHub加载数据成功', 'success');
                    App.loadView(App.currentView);
                }
            })
            .catch(error => {
                console.error('从GitHub加载数据失败:', error);
                App.showMessage('加载失败，使用本地数据', 'warning');
            });
        */
        
        // 临时提示
        App.showMessage('GitHub数据加载功能需要配置GitHub Pages URL', 'info');
    }
};

// 移动端自动检查GitHub数据
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    console.log('移动端设备，检查GitHub数据');
    
    // 可以在这里添加移动端自动同步逻辑
    document.addEventListener('DOMContentLoaded', function() {
        // 移动端可以显示数据同步提示
        setTimeout(() => {
            const syncTip = document.createElement('div');
            syncTip.className = 'mobile-sync-tip';
            syncTip.innerHTML = `
                <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; padding: 15px; border-radius: 10px; margin: 15px; text-align: center;">
                    <h4><i class="fas fa-sync-alt"></i> 数据同步提示</h4>
                    <p style="font-size: 14px; margin: 10px 0;">请在电脑端导出数据文件，然后在移动端导入</p>
                    <div style="display: flex; gap: 10px; justify-content: center; margin-top: 10px;">
                        <button onclick="DataManager.importData()" style="padding: 8px 15px; background: white; color: #4facfe; border: none; border-radius: 5px; font-weight: bold;">
                            <i class="fas fa-upload"></i> 导入数据
                        </button>
                    </div>
                </div>
            `;
            
            const contentArea = document.getElementById('content-area');
            if (contentArea) {
                contentArea.insertAdjacentHTML('afterbegin', syncTip.outerHTML);
            }
        }, 2000);
    });
}

console.log('data-sync.js 加载完成');
