// data-sync.js - 数据同步模块（简化版）

const GitHubDataSync = {
    // 简单的数据同步功能
    exportDataForGitHub: function() {
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
            
            alert('数据已导出为 thought-data.json 文件');
        } catch (error) {
            alert('导出失败: ' + error.message);
        }
    }
};

// 添加导出按钮事件
document.addEventListener('DOMContentLoaded', function() {
    const exportBtn = document.querySelector('.github-export-btn');
    if (exportBtn) {
        exportBtn.addEventListener('click', function(e) {
            e.preventDefault();
            GitHubDataSync.exportDataForGitHub();
        });
    }
});
