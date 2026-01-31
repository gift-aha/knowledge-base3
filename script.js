// ==================== 核心应用对象 ====================
const App = {
    // 应用状态
    currentView: 'overview',
    deleteTarget: null,
    deleteType: null,
    editingThought: null,
    editingModel: null,
    
    // 初始化应用
    init: function() {
        console.log('App.init() 开始执行');
        
        // 1. 初始化数据存储
        DataManager.init();
        
        // 2. 绑定事件
        this.bindEvents();
        
        // 3. 加载初始视图
        this.loadView('overview');
        
        // 4. 隐藏加载动画
        setTimeout(() => {
            const loading = document.getElementById('loading');
            if (loading) loading.style.display = 'none';
        }, 300);
        
        // 5. 如果是移动端，初始化移动端功能
        if (this.isMobile()) {
            this.initMobile();
        }
        
        console.log('App.init() 完成');
    },
    
    // 判断是否为移动端
    isMobile: function() {
        return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },
    
    // 初始化移动端
    initMobile: function() {
        console.log('初始化移动端功能');
        
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
    },
    
    // 绑定所有事件
    bindEvents: function() {
        console.log('绑定事件...');
        
        // 桌面端导航
        this.bindDesktopNavigation();
        
        // 移动端导航
        this.bindMobileNavigation();
        
        // 搜索功能
        this.bindSearch();
        
        // 数据操作按钮
        this.bindDataActions();
        
        // 版本选择器
        this.bindVersionSelector();
        
        // 点击模态框外部关闭
        this.bindModalClose();
    },
    
    // 绑定桌面端导航
    bindDesktopNavigation: function() {
        const navLinks = document.querySelectorAll('.nav-links a');
        console.log(`找到 ${navLinks.length} 个桌面端导航链接`);
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                // 移除所有active类
                navLinks.forEach(nav => nav.classList.remove('active'));
                
                // 添加active类到当前项
                link.classList.add('active');
                
                // 加载视图
                const view = link.getAttribute('data-view');
                this.loadView(view);
                
                console.log(`桌面端导航: 切换到 ${view}`);
            });
        });
    },
    
    // 绑定移动端导航
    bindMobileNavigation: function() {
        // 底部导航
        const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
        console.log(`找到 ${mobileNavItems.length} 个移动端导航项`);
        
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
                this.loadView(view);
                
                // 滚动到顶部
                window.scrollTo({ top: 0, behavior: 'smooth' });
                
                console.log(`移动端导航: 切换到 ${view}`);
            });
        });
        
        // 视图切换器选项
        const viewOptions = document.querySelectorAll('.mobile-view-option');
        viewOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const view = option.getAttribute('data-view');
                this.loadView(view);
                
                // 更新活动状态
                viewOptions.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
                
                // 关闭切换器
                const switcher = document.getElementById('mobile-view-switcher');
                if (switcher) switcher.classList.remove('active');
                
                console.log(`移动端视图切换: 切换到 ${view}`);
            });
        });
        
        // 移动端菜单按钮
        const menuToggle = document.getElementById('mobile-menu-toggle');
        if (menuToggle) {
            menuToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                menuToggle.classList.toggle('active');
                console.log('移动端菜单按钮点击');
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
                
                console.log('移动端搜索按钮点击');
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
                console.log('移动端视图切换按钮点击');
            });
        }
        
        // 移动端搜索清除按钮
        const searchClear = document.getElementById('mobile-search-clear');
        const mobileSearchInput = document.getElementById('mobile-search-input');
        if (searchClear && mobileSearchInput) {
            searchClear.addEventListener('click', () => {
                mobileSearchInput.value = '';
                mobileSearchInput.focus();
                console.log('移动端搜索清除按钮点击');
            });
        }
    },
    
    // 绑定搜索功能
    bindSearch: function() {
        // 桌面端搜索
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.performSearch(e.target.value);
            });
        }
        
        // 移动端搜索
        const mobileSearchInput = document.getElementById('mobile-search-input');
        if (mobileSearchInput) {
            mobileSearchInput.addEventListener('input', (e) => {
                this.performSearch(e.target.value);
            });
            
            // 回车键搜索
            mobileSearchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.performSearch(e.target.value);
                    // 隐藏搜索栏
                    const searchBar = document.getElementById('mobile-search-bar');
                    if (searchBar) searchBar.classList.remove('active');
                }
            });
        }
    },
    
    // 绑定数据操作按钮
    bindDataActions: function() {
        // 同步按钮
        const syncBtn = document.getElementById('sync-btn');
        if (syncBtn) {
            syncBtn.addEventListener('click', () => {
                DataManager.save();
                this.showMessage('数据已同步', 'success');
            });
        }
        
        // 导出按钮
        const exportBtn = document.getElementById('export-btn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                DataManager.exportData();
            });
        }
        
        // 导出全部数据按钮
        const exportAllBtn = document.getElementById('export-all-btn');
        if (exportAllBtn) {
            exportAllBtn.addEventListener('click', () => {
                DataManager.exportData();
            });
        }
        
        // 导入数据按钮
        const importBtn = document.getElementById('import-data-btn');
        if (importBtn) {
            importBtn.addEventListener('click', () => {
                DataManager.importData();
            });
        }
    },
    
    // 绑定版本选择器
    bindVersionSelector: function() {
        const versionSelect = document.getElementById('version-select');
        if (versionSelect) {
            versionSelect.addEventListener('change', function() {
                if (this.value === 'initial') {
                    if (confirm('确定要加载初始版本数据吗？当前修改将丢失。')) {
                        DataManager.loadInitialData();
                        App.loadView(App.currentView);
                        App.showMessage('已加载初始版本数据', 'success');
                    } else {
                        this.value = 'current';
                    }
                }
            });
        }
    },
    
    // 绑定模态框关闭
    bindModalClose: function() {
        document.addEventListener('click', (e) => {
            const modals = document.querySelectorAll('.modal-overlay');
            modals.forEach(modal => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });
        });
    },
    
    // 加载视图
    loadView: function(view) {
        console.log(`加载视图: ${view}`);
        
        this.currentView = view;
        
        // 更新当前视图显示
        const currentViewEl = document.getElementById('current-view');
        if (currentViewEl) {
            const viewNames = {
                overview: "核心资产总览",
                "add-structured": "结构化输入思考",
                thoughts: "思考目录完整清单",
                models: "核心思维模型索引",
                "add-model": "创建思维模型",
                keywords: "标签分类检索",
                "how-to-use": "如何使用本系统",
                milestones: "系统演进里程碑",
                architecture: "系统架构特性",
                "tag-review": "标签复核中心",
                "network-analysis": "模型关联网络分析",
                timeline: "系统演进历程",
                "data-management": "数据管理与备份"
            };
            currentViewEl.textContent = viewNames[view] || view;
        }
        
        // 显示加载中
        const contentArea = document.getElementById('content-area');
        contentArea.innerHTML = '<div id="loading" class="loading" style="margin: 100px auto;"></div>';
        
        // 根据视图类型渲染内容
        setTimeout(() => {
            try {
                switch(view) {
                    case 'overview':
                        this.renderOverview();
                        break;
                    case 'add-structured':
                        this.renderAddStructured();
                        break;
                    case 'thoughts':
                        this.renderThoughts();
                        break;
                    case 'models':
                        this.renderModels();
                        break;
                    case 'add-model':
                        this.renderAddModel();
                        break;
                    case 'keywords':
                        this.renderKeywords();
                        break;
                    case 'how-to-use':
                        this.renderHowToUse();
                        break;
                    case 'milestones':
                        this.renderMilestones();
                        break;
                    case 'architecture':
                        this.renderArchitecture();
                        break;
                    case 'tag-review':
                        this.renderTagReview();
                        break;
                    case 'network-analysis':
                        this.renderNetworkAnalysis();
                        break;
                    case 'timeline':
                        this.renderTimeline();
                        break;
                    case 'data-management':
                        this.renderDataManagement();
                        break;
                    default:
                        this.renderOverview();
                }
                
                // 更新调试信息
                if (DEBUG) {
                    document.getElementById('debug-info').innerHTML = `
                        当前视图: ${view}<br>
                        思考记录: ${DataManager.thoughts.length}<br>
                        思维模型: ${DataManager.models.length}<br>
                        屏幕尺寸: ${window.innerWidth}×${window.innerHeight}
                    `;
                }
            } catch (error) {
                console.error(`渲染视图 ${view} 时出错:`, error);
                contentArea.innerHTML = `
                    <div class="error-state">
                        <i class="fas fa-exclamation-triangle"></i>
                        <h3>加载失败</h3>
                        <p>${error.message}</p>
                        <button onclick="App.loadView('overview')" class="btn btn-primary">返回首页</button>
                    </div>
                `;
            }
        }, 50);
    },
    
    // ==================== 视图渲染方法 ====================
    
    renderOverview: function() {
        const html = `
            <div class="content-header">
                <h2>核心资产总览</h2>
                <p>系统版本: ${DataManager.currentVersion} | 本地存储数据状态</p>
            </div>
            
            <div class="stats-grid">
                <div class="stat-card">
                    <h3><i class="fas fa-brain"></i> 思考记录总数</h3>
                    <div class="stat-value">${DataManager.thoughts.length}</div>
                    <div class="stat-desc">完整结构化思考条目</div>
                </div>
                
                <div class="stat-card">
                    <h3><i class="fas fa-cubes"></i> 核心思维模型</h3>
                    <div class="stat-value">${DataManager.models.length}</div>
                    <div class="stat-desc">可迁移的分析框架</div>
                </div>
                
                <div class="stat-card">
                    <h3><i class="fas fa-tags"></i> 标签关键词</h3>
                    <div class="stat-value">${Object.keys(DataManager.tags).length}</div>
                    <div class="stat-desc">跨主题分类标签</div>
                </div>
            </div>
            
            <div class="detail-view">
                <div class="detail-header">
                    <div class="detail-title">系统功能说明</div>
                </div>
                <div class="detail-content">
                    <p><strong>电脑端功能：</strong>完整的数据编辑、模型管理、导出功能</p>
                    <p><strong>移动端功能：</strong>数据浏览、搜索、查看，可通过导入同步电脑端数据</p>
                    <p><strong>数据同步：</strong>电脑端导出数据文件 → 移动端导入文件</p>
                </div>
            </div>
        `;
        
        document.getElementById('content-area').innerHTML = html;
    },
    
    renderAddStructured: function() {
        const html = `
            <div class="content-header">
                <h2>结构化输入思考内容</h2>
                <p>按照格式输入，系统将智能解析并归类</p>
            </div>
            
            <div class="format-hint">
                <i class="fas fa-lightbulb"></i> <strong>推荐格式：</strong>
                <div style="margin-top: 10px; font-size: 0.9rem;">
                    <div><strong>💎 状态看板</strong> - 系统版本、思考ID、思考主题、思考类型、关键标记</div>
                    <div><strong>🌌 核心结论</strong> - 主要观点和发现</div>
                    <div><strong>🧩 模型延伸与整合</strong> - 模型扩展和关联</div>
                    <div><strong>📚 行动/思维要点</strong> - 行动建议和思考要点</div>
                    <div><strong>📂 架构更新</strong> - 系统或模型的更新</div>
                </div>
            </div>
            
            <div class="input-section">
                <h3>输入思考内容</h3>
                <textarea id="structured-input" placeholder="请输入您的思考内容..."></textarea>
                <div class="btn-group">
                    <button class="btn btn-primary" onclick="App.parseAndPreview()">
                        <i class="fas fa-search"></i> 解析预览
                    </button>
                    <button class="btn btn-success" onclick="App.saveStructuredThought()">
                        <i class="fas fa-save"></i> 保存思考
                    </button>
                </div>
                <div id="parse-preview" class="parse-preview"></div>
            </div>
        `;
        
        document.getElementById('content-area').innerHTML = html;
    },
    
    renderThoughts: function() {
        const thoughts = DataManager.thoughts;
        
        if (thoughts.length === 0) {
            document.getElementById('content-area').innerHTML = `
                <div class="content-header">
                    <h2>思考目录完整清单</h2>
                    <p>系统版本: ${DataManager.currentVersion}</p>
                </div>
                <div class="empty-state">
                    <i class="fas fa-inbox"></i>
                    <p>暂无思考记录</p>
                    <button onclick="App.loadView('add-structured')" class="btn btn-primary">创建第一个思考</button>
                </div>
            `;
            return;
        }
        
        let thoughtsHTML = '';
        thoughts.forEach(thought => {
            const summary = thought.sections && thought.sections["核心结论"] ? 
                thought.sections["核心结论"].substring(0, 100) + '...' : 
                '暂无摘要';
            
            thoughtsHTML += `
                <div class="record-card" onclick="App.showThoughtDetail('${thought.id}')">
                    <div class="card-actions">
                        <div class="action-icon edit" onclick="event.stopPropagation(); App.editThought('${thought.id}')" title="编辑">
                            <i class="fas fa-edit"></i>
                        </div>
                        <div class="action-icon delete" onclick="event.stopPropagation(); App.openDeleteModal('thought', '${thought.id}')" title="删除">
                            <i class="fas fa-trash"></i>
                        </div>
                    </div>
                    <div class="record-id">${thought.id}</div>
                    <div class="record-title">${thought.title || '无标题'}</div>
                    <div class="record-desc">${summary}</div>
                    <div class="record-tags">
                        ${thought.tags ? thought.tags.map(tag => `<span class="tag">${tag}</span>`).join('') : ''}
                    </div>
                    <div class="record-date">${thought.date}</div>
                </div>
            `;
        });
        
        const html = `
            <div class="content-header">
                <h2>思考目录完整清单</h2>
                <p>系统版本: ${DataManager.currentVersion} | 共 ${thoughts.length} 条思考记录</p>
            </div>
            
            <div class="records-list">
                ${thoughtsHTML}
            </div>
        `;
        
        document.getElementById('content-area').innerHTML = html;
    },
    
    renderModels: function() {
        const models = DataManager.models;
        
        if (models.length === 0) {
            document.getElementById('content-area').innerHTML = `
                <div class="content-header">
                    <h2>核心思维模型索引</h2>
                    <p>系统版本: ${DataManager.currentVersion}</p>
                </div>
                <div class="empty-state">
                    <i class="fas fa-cubes"></i>
                    <p>暂无思维模型</p>
                    <button onclick="App.loadView('add-model')" class="btn btn-primary">创建第一个模型</button>
                </div>
            `;
            return;
        }
        
        let modelsHTML = '';
        models.forEach(model => {
            modelsHTML += `
                <div class="model-card" onclick="App.showModelDetail('${model.id}')">
                    <div class="card-actions">
                        <div class="action-icon edit" onclick="event.stopPropagation(); App.editModel('${model.id}')" title="编辑">
                            <i class="fas fa-edit"></i>
                        </div>
                        <div class="action-icon delete" onclick="event.stopPropagation(); App.openDeleteModal('model', '${model.id}')" title="删除">
                            <i class="fas fa-trash"></i>
                        </div>
                    </div>
                    <div class="model-id">${model.id}</div>
                    <div class="model-name">${model.name}</div>
                    <div class="model-desc">${model.description.substring(0, 120)}...</div>
                    <div class="model-tags">
                        ${model.tags ? model.tags.map(tag => `<span class="tag">${tag}</span>`).join('') : ''}
                    </div>
                    <div class="model-date">${model.date}</div>
                </div>
            `;
        });
        
        const html = `
            <div class="content-header">
                <h2>核心思维模型索引</h2>
                <p>系统版本: ${DataManager.currentVersion} | 共 ${models.length} 个思维模型</p>
            </div>
            
            <div class="models-list">
                ${modelsHTML}
            </div>
        `;
        
        document.getElementById('content-area').innerHTML = html;
    },
    
    renderAddModel: function() {
        const html = `
            <div class="content-header">
                <h2>创建思维模型</h2>
                <p>定义新的思维框架和分析模型</p>
            </div>
            
            <div class="input-section">
                <h3>模型信息</h3>
                <input type="text" id="model-id" placeholder="模型ID (例如: M-81)">
                <input type="text" id="model-name" placeholder="模型名称">
                <input type="text" id="model-from-thought" placeholder="来源思考ID (例如: #123)">
                <textarea id="model-description" placeholder="请详细描述这个模型的定义、应用场景等..." style="min-height: 200px;"></textarea>
                <div class="btn-group">
                    <button class="btn btn-primary" onclick="App.saveModel()">
                        <i class="fas fa-save"></i> 保存模型
                    </button>
                </div>
            </div>
        `;
        
        document.getElementById('content-area').innerHTML = html;
    },
    
    renderKeywords: function() {
        const topTags = DataManager.getTopTags(20);
        
        let tagsHTML = '';
        topTags.forEach(({ tag, count }) => {
            tagsHTML += `<span class="tag" style="cursor:pointer; font-size: ${14 + Math.min(count, 10)}px;" onclick="App.filterByTag('${tag}')">${tag} (${count})</span>`;
        });
        
        const html = `
            <div class="content-header">
                <h2>标签分类检索</h2>
                <p>系统版本: ${DataManager.currentVersion} | 共 ${Object.keys(DataManager.tags).length} 个标签</p>
            </div>
            
            <div class="detail-view">
                <div class="detail-content">
                    <h4>热门标签</h4>
                    <div class="tag-cloud" style="margin-top: 15px; margin-bottom: 25px;">
                        ${tagsHTML}
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById('content-area').innerHTML = html;
    },
    
    // 其他视图渲染方法（简化版）
    renderHowToUse: function() {
        document.getElementById('content-area').innerHTML = `
            <div class="content-header">
                <h2>如何使用本系统</h2>
                <p>将知识转化为智慧</p>
            </div>
            <div class="detail-view">
                <div class="detail-content">
                    <p>1. 电脑端：完整的数据编辑和管理功能</p>
                    <p>2. 移动端：数据浏览和搜索功能</p>
                    <p>3. 数据同步：电脑端导出 → 移动端导入</p>
                </div>
            </div>
        `;
    },
    
    renderMilestones: function() {
        const milestones = DataManager.timeline;
        
        let milestonesHTML = '';
        milestones.forEach(milestone => {
            milestonesHTML += `
                <div class="record-card">
                    <div class="record-id">${milestone.version}</div>
                    <div class="record-desc">${milestone.event}</div>
                    <div class="record-date">${milestone.date}</div>
                </div>
            `;
        });
        
        document.getElementById('content-area').innerHTML = `
            <div class="content-header">
                <h2>系统演进里程碑</h2>
                <p>系统版本: ${DataManager.currentVersion}</p>
            </div>
            <div class="records-list">
                ${milestonesHTML}
            </div>
        `;
    },
    
    renderArchitecture: function() {
        document.getElementById('content-area').innerHTML = `
            <div class="content-header">
                <h2>系统架构特性</h2>
                <p>系统版本: ${DataManager.currentVersion}</p>
            </div>
            <div class="detail-view">
                <div class="detail-content">
                    <p>• 双端协同：电脑编辑 + 移动浏览</p>
                    <p>• 本地存储：数据保存在浏览器中</p>
                    <p>• 文件同步：通过导入/导出文件同步数据</p>
                </div>
            </div>
        `;
    },
    
    renderTagReview: function() {
        document.getElementById('content-area').innerHTML = `
            <div class="content-header">
                <h2>标签复核中心</h2>
                <p>系统版本: ${DataManager.currentVersion}</p>
            </div>
            <div class="empty-state">
                <i class="fas fa-tags"></i>
                <p>标签复核功能</p>
            </div>
        `;
    },
    
    renderNetworkAnalysis: function() {
        document.getElementById('content-area').innerHTML = `
            <div class="content-header">
                <h2>模型关联网络分析</h2>
                <p>系统版本: ${DataManager.currentVersion}</p>
            </div>
            <div class="empty-state">
                <i class="fas fa-project-diagram"></i>
                <p>关联网络分析功能</p>
            </div>
        `;
        const models = DataManager.models;
        
        let html = `
            <div class="content-header">
                <h2>模型关联网络分析</h2>
                <p>系统版本: ${DataManager.currentVersion} | 共 ${models.length} 个思维模型</p>
            </div>
            
            <div class="network-graph-container">
                <div style="text-align: center; padding: 20px; color: var(--text-light);" id="network-graph">
                    <i class="fas fa-project-diagram" style="font-size: 48px; margin-bottom: 15px;"></i>
                    <p>模型关联网络可视化</p>
                    <p><small>点击下方模型查看关联关系</small></p>
                </div>
            </div>
            
            <div class="model-index-section">
                <h3><i class="fas fa-list"></i> 模型索引</h3>
                <p>点击模型查看详细信息</p>
                
                <div class="model-index-grid">
        `;
        
        models.forEach(model => {
            html += `
                <div class="model-index-item" onclick="App.showModelDetail('${model.id}')">
                    <div class="model-index-name">${model.name}</div>
                    <div class="model-index-desc">${model.description.substring(0, 80)}...</div>
                    <div style="margin-top: 8px;">
                        ${model.tags ? model.tags.slice(0, 2).map(tag => `<span class="tag">${tag}</span>`).join(' ') : ''}
                    </div>
                </div>
            `;
        });
        
        html += `
                </div>
            </div>
        `;
        
        document.getElementById('content-area').innerHTML = html;
        
        // 简单的网络图实现
        this.renderSimpleNetwork();        
    },
    
    renderTimeline: function() {
        document.getElementById('content-area').innerHTML = `
            <div class="content-header">
                <h2>系统演进历程</h2>
                <p>系统版本: ${DataManager.currentVersion}</p>
            </div>
            <div class="detail-view">
                <div class="detail-content">
                    <p>系统演进时间线</p>
                </div>
            </div>
        `;
    },
    
    renderDataManagement: function() {
        document.getElementById('content-area').innerHTML = `
            <div class="content-header">
                <h2>数据管理与备份</h2>
                <p>系统版本: ${DataManager.currentVersion}</p>
            </div>
            <div class="detail-view">
                <div class="detail-content">
                    <p><strong>电脑端功能：</strong></p>
                    <p>• 完整的数据编辑和管理</p>
                    <p>• 数据导出为JSON文件</p>
                    <p>• 模型创建和编辑</p>
                    
                    <p><strong>移动端功能：</strong></p>
                    <p>• 数据浏览和搜索</p>
                    <p>• 导入电脑端导出的数据文件</p>
                    <p>• 查看思考记录和模型</p>
                    
                    <div class="action-buttons" style="margin-top: 20px;">
                        <button class="btn btn-primary" onclick="DataManager.exportData()">
                            <i class="fas fa-download"></i> 导出数据
                        </button>
                        <button class="btn btn-secondary" onclick="DataManager.importData()">
                            <i class="fas fa-upload"></i> 导入数据
                        </button>
                    </div>
                </div>
            </div>
        `;
    },
    
    // ==================== 功能方法 ====================
    
    parseAndPreview: function() {
        const input = document.getElementById('structured-input');
        if (!input || !input.value.trim()) {
            this.showMessage('请输入要解析的内容', 'warning');
            return;
        }
        
        const thought = DataManager.parseStructuredContent(input.value);
        const previewDiv = document.getElementById('parse-preview');
        
        if (previewDiv) {
            previewDiv.style.display = 'block';
            previewDiv.innerHTML = `
                <h4><i class="fas fa-check-circle"></i> 解析成功</h4>
                <p><strong>思考ID:</strong> ${thought.id}</p>
                <p><strong>思考主题:</strong> ${thought.title}</p>
                <p><strong>系统版本:</strong> ${thought.systemVersion}</p>
                <div style="margin-top: 15px; font-size: 0.9rem; color: var(--success-color);">
                    <i class="fas fa-check"></i> 解析完成，点击"保存思考"按钮保存到系统
                </div>
            `;
        }
    },
    
    saveStructuredThought: function() {
        const input = document.getElementById('structured-input');
        if (!input || !input.value.trim()) {
            this.showMessage('请输入思考内容', 'warning');
            return;
        }
        
        const thought = DataManager.addStructuredThought(input.value);
        
        // 显示成功消息
        this.showMessage(`思考记录已保存: ${thought.id}`, 'success');
        
        // 刷新当前视图
        this.loadView('thoughts');
        
        // 清空输入框
        input.value = '';
        
        // 隐藏预览
        const previewDiv = document.getElementById('parse-preview');
        if (previewDiv) previewDiv.style.display = 'none';
    },
    
    saveModel: function() {
        const idInput = document.getElementById('model-id');
        const nameInput = document.getElementById('model-name');
        const descInput = document.getElementById('model-description');
        
        if (!nameInput || !nameInput.value.trim()) {
            this.showMessage('请输入模型名称', 'warning');
            return;
        }
        
        if (!descInput || !descInput.value.trim()) {
            this.showMessage('请输入模型描述', 'warning');
            return;
        }
        
        const model = DataManager.addModel({
            id: idInput && idInput.value.trim() ? idInput.value.trim() : undefined,
            name: nameInput.value.trim(),
            description: descInput.value.trim(),
            date: new Date().toISOString().split('T')[0],
            tags: [],
            fromThought: document.getElementById('model-from-thought')?.value.trim() || null
        });
        
        // 显示成功消息
        this.showMessage(`思维模型已保存: ${model.id}`, 'success');
        
        // 刷新当前视图
        this.loadView('models');
        
        // 清空输入框
        if (idInput) idInput.value = '';
        if (nameInput) nameInput.value = '';
        if (descInput) descInput.value = '';
    },
    
    showThoughtDetail: function(id) {
        const thought = DataManager.getThoughtById(id);
        if (!thought) {
            this.showMessage('未找到思考记录', 'error');
            return;
        }
        
        let html = `
            <div class="detail-view">
                <div class="detail-header">
                    <div>
                        <div class="detail-title">${thought.title || '无标题'}</div>
                        <div class="detail-id">${thought.id}</div>
                        <div style="margin-top: 10px;">
                            ${thought.tags ? thought.tags.map(tag => `<span class="tag" onclick="App.filterByTag('${tag}')" style="cursor: pointer;">${tag}</span>`).join(' ') : ''}
                        </div>
                    </div>
                    <div style="color: var(--text-light); font-size: 0.9rem;">${thought.date}</div>
                </div>
                
                <div class="action-buttons">
                    <button class="btn btn-primary" onclick="App.editThoughtSegments('${thought.id}')">
                        <i class="fas fa-edit"></i> 分段编辑
                    </button>
                    <button class="btn btn-warning" onclick="App.editThought('${thought.id}')">
                        <i class="fas fa-pen"></i> 完整编辑
                    </button>
                    <button class="btn btn-danger" onclick="App.openDeleteModal('thought', '${thought.id}')">
                        <i class="fas fa-trash"></i> 删除
                    </button>
                    <button class="btn btn-secondary" onclick="App.loadView('thoughts')">
                        <i class="fas fa-arrow-left"></i> 返回
                    </button>
                </div>
        `;
        
        // 渲染各个部分
        if (thought.sections) {
            if (thought.sections["状态看板"]) {
                html += `
                    <div class="detail-section">
                        <h4><i class="fas fa-tachometer-alt"></i> 状态看板</h4>
                        <div class="detail-section-content">
                            <pre style="white-space: pre-wrap; font-family: inherit;">${thought.sections["状态看板"]}</pre>
                        </div>
                    </div>
                `;
            }
            
            if (thought.sections["核心结论"]) {
                html += `
                    <div class="detail-section">
                        <h4><i class="fas fa-bullseye"></i> 核心结论</h4>
                        <div class="detail-section-content">
                            <pre style="white-space: pre-wrap; font-family: inherit;">${thought.sections["核心结论"]}</pre>
                        </div>
                    </div>
                `;
            }
            
            if (thought.sections["模型延伸与整合"]) {
                html += `
                    <div class="detail-section">
                        <h4><i class="fas fa-puzzle-piece"></i> 模型延伸与整合</h4>
                        <div class="detail-section-content">
                            <pre style="white-space: pre-wrap; font-family: inherit;">${thought.sections["模型延伸与整合"]}</pre>
                        </div>
                    </div>
                `;
            }
            
            if (thought.sections["行动/思维要点"]) {
                html += `
                    <div class="detail-section">
                        <h4><i class="fas fa-lightbulb"></i> 行动/思维要点</h4>
                        <div class="detail-section-content">
                            <pre style="white-space: pre-wrap; font-family: inherit;">${thought.sections["行动/思维要点"]}</pre>
                        </div>
                    </div>
                `;
            }
            
            if (thought.sections["架构更新"]) {
                html += `
                    <div class="detail-section">
                        <h4><i class="fas fa-code-branch"></i> 架构更新</h4>
                        <div class="detail-section-content">
                            <pre style="white-space: pre-wrap; font-family: inherit;">${thought.sections["架构更新"]}</pre>
                        </div>
                    </div>
                `;
            }
        }
        
        html += `</div>`;
        document.getElementById('content-area').innerHTML = html;
    },
    
    showModelDetail: function(id) {
        const model = DataManager.getModelById(id);
        if (!model) {
            this.showMessage('未找到思维模型', 'error');
            return;
        }
        
        let html = `
            <div class="detail-view">
                <div class="detail-header">
                    <div>
                        <div class="detail-title">${model.name}</div>
                        <div class="detail-id">${model.id}</div>
                        <div style="margin-top: 10px;">
                            ${model.tags ? model.tags.map(tag => `<span class="tag">${tag}</span>`).join(' ') : ''}
                        </div>
                    </div>
                    <div style="color: var(--text-light); font-size: 0.9rem;">${model.date}</div>
                </div>
                
                <div class="action-buttons">
                    <button class="btn btn-warning" onclick="App.editModel('${model.id}')">
                        <i class="fas fa-edit"></i> 编辑
                    </button>
                    <button class="btn btn-danger" onclick="App.openDeleteModal('model', '${model.id}')">
                        <i class="fas fa-trash"></i> 删除
                    </button>
                    <button class="btn btn-secondary" onclick="App.loadView('models')">
                        <i class="fas fa-arrow-left"></i> 返回
                    </button>
                </div>
                
                <div class="detail-section">
                    <h4><i class="fas fa-info-circle"></i> 模型描述</h4>
                    <div class="detail-section-content">
                        <pre style="white-space: pre-wrap; font-family: inherit;">${model.description}</pre>
                    </div>
                </div>
        `;
        
        if (model.fromThought) {
            html += `
                <div class="detail-section">
                    <h4><i class="fas fa-link"></i> 来源思考</h4>
                    <div class="detail-section-content">
                        <p>此模型来源于思考记录: <span style="color: var(--accent-color); font-weight: 500;">${model.fromThought}</span></p>
                    </div>
                </div>
            `;
        }
        
        html += `</div>`;
        document.getElementById('content-area').innerHTML = html;
    },
    
    editThought: function(id) {
        const thought = DataManager.getThoughtById(id);
        if (!thought) {
            this.showMessage('未找到思考记录', 'error');
            return;
        }
        
        // 跳转到添加思考页面，并填充内容
        this.loadView('add-structured');
        
        // 延迟填充内容，确保DOM已加载
        setTimeout(() => {
            const input = document.getElementById('structured-input');
            if (input && thought.sections) {
                let content = '';
                if (thought.sections["状态看板"]) content += `💎 **状态看板**\n${thought.sections["状态看板"]}\n\n`;
                if (thought.sections["核心结论"]) content += `🌌 **核心结论**\n${thought.sections["核心结论"]}\n\n`;
                if (thought.sections["模型延伸与整合"]) content += `🧩 **模型延伸与整合**\n${thought.sections["模型延伸与整合"]}\n\n`;
                if (thought.sections["行动/思维要点"]) content += `📚 **行动/思维要点**\n${thought.sections["行动/思维要点"]}\n\n`;
                if (thought.sections["架构更新"]) content += `📂 **架构更新**\n${thought.sections["架构更新"]}\n\n`;
                
                input.value = content.trim();
                
                // 解析预览
                this.parseAndPreview();
                
                this.showMessage('已加载思考内容，可编辑后保存', 'info');
            }
        }, 300);
    },
    
    editModel: function(id) {
        const model = DataManager.getModelById(id);
        if (!model) {
            this.showMessage('未找到思维模型', 'error');
            return;
        }
        
        // 跳转到添加模型页面，并填充内容
        this.loadView('add-model');
        
        // 延迟填充内容
        setTimeout(() => {
            const idInput = document.getElementById('model-id');
            const nameInput = document.getElementById('model-name');
            const fromThoughtInput = document.getElementById('model-from-thought');
            const descInput = document.getElementById('model-description');
            
            if (idInput) idInput.value = model.id;
            if (nameInput) nameInput.value = model.name;
            if (fromThoughtInput) fromThoughtInput.value = model.fromThought || '';
            if (descInput) descInput.value = model.description;
            
            this.showMessage('已加载模型内容，可编辑后保存', 'info');
        }, 300);
    },
    
    filterByTag: function(tag) {
        this.showMessage(`过滤标签: ${tag}`, 'info'); 
        // 切换到思考列表视图并筛选
        this.loadView('thoughts');
        
        // 保存筛选状态
        setTimeout(() => {
            // 高亮显示筛选的标签
            const tagElements = document.querySelectorAll('.tag');
            tagElements.forEach(el => {
                if (el.textContent === tag) {
                    el.style.backgroundColor = 'var(--accent-color)';
                    el.style.color = 'white';
                }
            });
            
            // 筛选思考记录
            const filteredThoughts = DataManager.thoughts.filter(thought => 
                thought.tags && thought.tags.includes(tag)
            );
            
            // 筛选模型
            const filteredModels = DataManager.models.filter(model => 
                model.tags && model.tags.includes(tag)
            );
            
            // 如果结果不多，直接显示
            if (filteredThoughts.length + filteredModels.length <= 10) {
                this.renderTagSearchResults(tag, filteredThoughts, filteredModels);
            } else {
                this.showMessage(`找到 ${filteredThoughts.length} 条思考记录和 ${filteredModels.length} 个模型使用标签 "${tag}"`, 'info');
            }
        }, 100);
    },
    
    renderTagSearchResults: function(tag, thoughts, models) {
        let html = `
            <div class="content-header">
                <h2>标签搜索结果</h2>
                <p>标签: <span class="tag">${tag}</span> | 共 ${thoughts.length + models.length} 个结果</p>
                <button class="btn btn-secondary" onclick="App.loadView('keywords')" style="margin-top: 10px;">
                    <i class="fas fa-arrow-left"></i> 返回标签页面
                </button>
            </div>
        `;
        
        if (thoughts.length > 0) {
            html += `<h3>思考记录 (${thoughts.length})</h3>`;
            html += '<div class="records-list">';
            thoughts.forEach(thought => {
                html += `
                    <div class="record-card" onclick="App.showThoughtDetail('${thought.id}')">
                        <div class="record-id">${thought.id}</div>
                        <div class="record-title">${thought.title || '无标题'}</div>
                        <div class="record-tags">
                            ${thought.tags.map(t => `<span class="tag">${t}</span>`).join('')}
                        </div>
                    </div>
                `;
            });
            html += '</div>';
        }
        
        if (models.length > 0) {
            html += `<h3>思维模型 (${models.length})</h3>`;
            html += '<div class="models-list">';
            models.forEach(model => {
                html += `
                    <div class="model-card" onclick="App.showModelDetail('${model.id}')">
                        <div class="model-id">${model.id}</div>
                        <div class="model-name">${model.name}</div>
                        <div class="model-tags">
                            ${model.tags.map(t => `<span class="tag">${t}</span>`).join('')}
                        </div>
                    </div>
                `;
            });
            html += '</div>';
        }
        
        document.getElementById('content-area').innerHTML = html;
    }
    
    performSearch: function(query) {
        if (!query.trim()) {
            this.loadView(this.currentView);
            return;
        }
        
        const searchTerm = query.toLowerCase();
        
        // 搜索思考记录
        const filteredThoughts = DataManager.thoughts.filter(thought => {
            return (
                (thought.title && thought.title.toLowerCase().includes(searchTerm)) ||
                (thought.id && thought.id.toLowerCase().includes(searchTerm)) ||
                (thought.tags && thought.tags.some(tag => tag.toLowerCase().includes(searchTerm))) ||
                (thought.sections && Object.values(thought.sections).some(section => 
                    section && section.toLowerCase().includes(searchTerm)
                ))
            );
        });
        
        // 搜索思维模型
        const filteredModels = DataManager.models.filter(model => {
            return (
                (model.name && model.name.toLowerCase().includes(searchTerm)) ||
                (model.id && model.id.toLowerCase().includes(searchTerm)) ||
                (model.tags && model.tags.some(tag => tag.toLowerCase().includes(searchTerm))) ||
                (model.description && model.description.toLowerCase().includes(searchTerm))
            );
        });
        
        // 渲染搜索结果
        this.renderSearchResults(query, filteredThoughts, filteredModels);
    },
    
    renderSearchResults: function(query, thoughts, models) {
        let resultsHTML = '';
        
        if (thoughts.length > 0) {
            thoughts.forEach(thought => {
                resultsHTML += `
                    <div class="record-card" onclick="App.showThoughtDetail('${thought.id}')">
                        <div class="record-id">${thought.id}</div>
                        <div class="record-title">${thought.title || '无标题'}</div>
                        <div class="record-tags">
                            ${thought.tags ? thought.tags.map(tag => `<span class="tag">${tag}</span>`).join('') : ''}
                        </div>
                    </div>
                `;
            });
        }
        
        if (models.length > 0) {
            models.forEach(model => {
                resultsHTML += `
                    <div class="model-card" onclick="App.showModelDetail('${model.id}')">
                        <div class="model-id">${model.id}</div>
                        <div class="model-name">${model.name}</div>
                        <div class="model-tags">
                            ${model.tags ? model.tags.map(tag => `<span class="tag">${tag}</span>`).join('') : ''}
                        </div>
                    </div>
                `;
            });
        }
        
        const html = `
            <div class="content-header">
                <h2>搜索结果</h2>
                <p>搜索关键词: "${query}" | 找到 ${thoughts.length + models.length} 个结果</p>
                <button class="btn btn-secondary" onclick="App.loadView(App.currentView)" style="margin-top: 10px;">
                    <i class="fas fa-arrow-left"></i> 返回
                </button>
            </div>
            
            <div class="records-list">
                ${resultsHTML || '<div class="empty-state"><i class="fas fa-search"></i><p>未找到相关结果</p></div>'}
            </div>
        `;
        
        document.getElementById('content-area').innerHTML = html;
    },
    
    // ==================== 模态框操作 ====================
    
    openDeleteModal: function(type, id) {
        this.deleteType = type;
        this.deleteTarget = id;
        
        const modal = document.getElementById('delete-modal');
        const message = document.getElementById('delete-message');
        
        if (type === 'thought') {
            const thought = DataManager.getThoughtById(id);
            message.textContent = `确定要删除思考记录 "${thought?.title || id}" 吗？此操作不可撤销。`;
        } else if (type === 'model') {
            const model = DataManager.getModelById(id);
            message.textContent = `确定要删除思维模型 "${model?.name || id}" 吗？此操作不可撤销。`;
        }
        
        modal.style.display = 'flex';
    },
    
    confirmDelete: function() {
        if (!this.deleteType || !this.deleteTarget) return;
        
        let success = false;
        let itemName = '';
        
        if (this.deleteType === 'thought') {
            const thought = DataManager.getThoughtById(this.deleteTarget);
            if (thought) itemName = thought.title || thought.id;
            success = DataManager.deleteThought(this.deleteTarget);
        } else if (this.deleteType === 'model') {
            const model = DataManager.getModelById(this.deleteTarget);
            if (model) itemName = model.name || model.id;
            success = DataManager.deleteModel(this.deleteTarget);
        }
        
        if (success) {
            this.closeModal('delete-modal');
            this.showMessage(`已删除: ${itemName}`, 'success');
            
            // 重新加载当前视图
            this.loadView(this.currentView);
        } else {
            this.showMessage('删除失败', 'error');
        }
        
        this.deleteType = null;
        this.deleteTarget = null;
    },
    
    closeModal: function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.style.display = 'none';
    },
    
    // ==================== 工具方法 ====================
    
    showMessage: function(message, type = 'info') {
        // 创建消息元素
        const messageEl = document.createElement('div');
        messageEl.className = `alert alert-${type}`;
        messageEl.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            ${message}
        `;
        
        // 添加到页面
        const contentArea = document.getElementById('content-area');
        if (contentArea.firstChild) {
            contentArea.insertBefore(messageEl, contentArea.firstChild);
        } else {
            contentArea.appendChild(messageEl);
        }
        
        // 自动移除
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.remove();
            }
        }, 3000);
    }
};

// ==================== 数据管理器 ====================
const DataManager = {
    thoughts: [],
    models: [],
    tags: {},
    nextThoughtId: 124,
    nextModelId: 81,
    currentVersion: "v22.48",
    lastSaved: null,
    
    // 标签分类系统
    tagCategories: {
        "核心模型": ["🧠 核心模型", "🌌 哲学/存在智慧", "🔄 系统/模型整合", "⚙️ 决策/行动", "🎭 荒诞/幽默"],
        "关系与情感": ["💞 亲密关系/情感", "💔 失去/告别", "⚖️ 期望/错位", "🌱 成长/历程", "😶 道德/伦理"],
        "时间与存在": ["⏳ 时间/宿命", "⏰ 记忆/遗忘", "🌍 存在/感知", "🌀 循环/重复", "🚶 历程/路径"],
        "艺术与表达": ["🎵 歌曲分析", "🎭 文艺批评", "🎨 艺术/象征", "🗣️ 语言/叙事", "📚 文本分析"],
        "社会与系统": ["⚔️ 反抗/边缘", "🔄 系统/结构", "🏛️ 制度/权力", "🌐 网络/连接", "⚖️ 伦理/责任"],
        "特殊状态": ["🔥 极端体验", "🌀 解构/重构", "🎯 聚焦/专注", "💡 灵感/洞见", "🛡️ 防御/保护"]
    },
    
    // 系统演进里程碑
    timeline: [
        {id: "t1", version: "v1.0-v5.0", date: "2023-01", event: "基础情感模型建立"},
        {id: "t2", version: "v6.0-v10.0", date: "2023-03", event: "关系模型深化"},
        {id: "t3", version: "v11.0-v15.0", date: "2023-05", event: "存在哲学拓展"},
        {id: "t10", version: "v22.48", date: "2024-07", event: "《寄居》×《花》整合版"}
    ],
    
    init: function() {
        console.log('DataManager.init() 开始');
        
        // 从localStorage加载数据
        const saved = localStorage.getItem('structuredThoughtAssistant');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                this.thoughts = data.thoughts || [];
                this.models = data.models || [];
                this.tags = data.tags || {};
                this.nextThoughtId = data.nextThoughtId || 124;
                this.nextModelId = data.nextModelId || 81;
                this.currentVersion = data.currentVersion || "v22.48";
                this.lastSaved = data.lastSaved || new Date().toISOString();
                this.timeline = data.timeline || this.timeline;
                
                console.log('从localStorage加载数据成功');
                this.updateUIStats();
            } catch (e) {
                console.error('解析localStorage失败:', e);
                this.addExampleData();
            }
        } else {
            console.log('localStorage无数据，添加示例数据');
            this.addExampleData();
        }
        
        // 保存数据
        this.save();
        
        console.log('DataManager.init() 完成');
    },
    
    addExampleData: function() {
        // 示例思考记录
        const exampleThought = this.parseStructuredContent(`💎 **状态看板**  
**系统版本**：v22.48  
**当前思考ID**：#123  
**思考主题**：《寄居》与《花》——两种关系存在论  
**思考类型**：🎵 歌曲分析  
**关键标记**：🧠 核心模型、💞 亲密关系/情感、⏳ 时间/宿命  

🌌 **核心结论**  
《寄居》与《花》呈现了爱情中两种几乎无法通约的"存在论"：一种将关系视为在线性时间中通过主动担责与共同行动来建造的"人间堡垒"；另一种将关系视为在循环时间中被宿命法则所规定的"灵魂生态"。  

🧩 **模型延伸与整合**  
**1. "关系存在论"二元模型 (M-80 新建)**  
*   **定义**：描述个体在深度关系中所秉持的、关于关系之本质、时间性与能动性的根本预设框架。  

📚 **行动/思维要点**  
1.  【**存在论自检**】你相信关系是"建造"的还是"认命"的？  

📂 **架构更新**  
*   **新增核心模型**：**M-80 "关系存在论"二元模型** (于 #123 建立)。`);
        
        exampleThought.id = "#123";
        exampleThought.date = new Date().toISOString().split('T')[0];
        this.thoughts.push(exampleThought);
        
        // 示例模型
        this.addModel({
            id: "M-80",
            name: "关系存在论模型",
            description: "描述个体在深度关系中所秉持的、关于关系之本质、时间性与能动性的根本预设框架。主要分为两种理想类型：建造者模式与体认者模式。",
            date: new Date().toISOString().split('T')[0],
            tags: ["🧠 核心模型", "💞 亲密关系/情感", "🌌 哲学/存在智慧"],
            fromThought: "#123",
            relatedModels: [],
            usageCount: 12
        });
        
        this.addModel({
            id: "M-79",
            name: "诠释伦理模型",
            description: "自我中心投射 vs 他者导向共情，描述在解读他人行为时的伦理立场差异",
            date: "2025-07-19",
            tags: ["🧠 核心模型", "⚖️ 伦理/责任"],
            fromThought: "#122",
            relatedModels: [],
            usageCount: 8
        });
        
        this.save();
    },
    
    save: function() {
        const data = {
            thoughts: this.thoughts,
            models: this.models,
            tags: this.tags,
            nextThoughtId: this.nextThoughtId,
            nextModelId: this.nextModelId,
            currentVersion: this.currentVersion,
            lastSaved: new Date().toISOString(),
            timeline: this.timeline
        };
        
        try {
            localStorage.setItem('structuredThoughtAssistant', JSON.stringify(data));
            this.lastSaved = data.lastSaved;
            this.updateUIStats();
            console.log('数据保存成功');
            return true;
        } catch (e) {
            console.error('保存数据失败:', e);
            return false;
        }
    },
    
    updateUIStats: function() {
        // 更新页面统计信息
        const elements = {
            'total-thoughts': this.thoughts.length,
            'total-models': this.models.length,
            'total-tags': Object.keys(this.tags).length,
            'current-version': this.currentVersion
        };
        
        for (const [id, value] of Object.entries(elements)) {
            const el = document.getElementById(id);
            if (el) el.textContent = value;
        }
        
        // 更新最后保存时间
        if (this.lastSaved) {
            const savedTime = new Date(this.lastSaved);
            const now = new Date();
            const diffMinutes = Math.floor((now - savedTime) / (1000 * 60));
            
            let timeText = "刚刚";
            if (diffMinutes >= 60) {
                const diffHours = Math.floor(diffMinutes / 60);
                timeText = `${diffHours}小时前`;
            } else if (diffMinutes > 0) {
                timeText = `${diffMinutes}分钟前`;
            }
            
            const lastSavedEl = document.getElementById('last-saved');
            if (lastSavedEl) lastSavedEl.textContent = timeText;
        }
    },
    
    parseStructuredContent: function(text) {
        const thought = {
            id: null,
            title: null,
            type: null,
            date: new Date().toISOString().split('T')[0],
            tags: [],
            sections: {},
            related: [],
            newModels: [],
            systemVersion: this.currentVersion
        };
        
        // 简单解析逻辑
        const lines = text.split('\n');
        let currentSection = '';
        
        for (const line of lines) {
            const trimmed = line.trim();
            
            // 检测章节标题
            if (trimmed.includes('💎') || trimmed.includes('状态看板')) {
                currentSection = '状态看板';
                thought.sections[currentSection] = '';
            } else if (trimmed.includes('🌌') || trimmed.includes('核心结论')) {
                currentSection = '核心结论';
                thought.sections[currentSection] = '';
            } else if (trimmed.includes('🧩') || trimmed.includes('模型延伸与整合')) {
                currentSection = '模型延伸与整合';
                thought.sections[currentSection] = '';
            } else if (trimmed.includes('📚') || trimmed.includes('行动/思维要点')) {
                currentSection = '行动/思维要点';
                thought.sections[currentSection] = '';
            } else if (trimmed.includes('📂') || trimmed.includes('架构更新')) {
                currentSection = '架构更新';
                thought.sections[currentSection] = '';
            } else if (currentSection && trimmed) {
                thought.sections[currentSection] += trimmed + '\n';
                
                // 从状态看板提取信息
                if (currentSection === '状态看板') {
                    // 提取ID
                    if (trimmed.includes('当前思考ID') && trimmed.includes('#')) {
                        const match = trimmed.match(/#\d+/);
                        if (match) thought.id = match[0];
                    }
                    
                    // 提取标题
                    if (trimmed.includes('思考主题') && !thought.title) {
                        thought.title = trimmed.split('思考主题')[1].replace(/[：:]\s*/, '').trim();
                    }
                    
                    // 提取标签
                    if (trimmed.includes('关键标记') && trimmed.includes('、')) {
                        const tagsPart = trimmed.split('关键标记')[1];
                        thought.tags = tagsPart.replace(/[：:]\s*/, '').split(/[、，,\s]+/).filter(tag => tag.trim());
                    }
                }
            }
        }
        
        // 清理每个部分
        for (const section in thought.sections) {
            thought.sections[section] = thought.sections[section].trim();
        }
        
        // 如果没有提取到ID，自动生成一个
        if (!thought.id) {
            thought.id = `#${this.nextThoughtId}`;
            this.nextThoughtId++;
        }
        
        // 如果没有提取到标题，使用前50个字符
        if (!thought.title) {
            const firstLine = lines.find(line => line.trim().length > 0);
            if (firstLine) {
                thought.title = firstLine.substring(0, 50).replace(/^\s*[#*\-•]+\s*/, '');
                if (firstLine.length > 50) thought.title += '...';
            } else {
                thought.title = `思考记录 ${thought.id}`;
            }
        }
        
        return thought;
    },
    
    addStructuredThought: function(text) {
        const thought = this.parseStructuredContent(text);
        
        // 检查ID是否已存在
        const existingIndex = this.thoughts.findIndex(t => t.id === thought.id);
        if (existingIndex >= 0) {
            // 更新现有思考
            this.thoughts[existingIndex] = thought;
        } else {
            // 添加到数组开头
            this.thoughts.unshift(thought);
        }
        
        // 更新标签
        if (thought.tags && Array.isArray(thought.tags)) {
            thought.tags.forEach(tag => {
                this.tags[tag] = (this.tags[tag] || 0) + 1;
            });
        }
        
        // 保存数据
        this.save();
        
        return thought;
    },
    
    addModel: function(modelData) {
        // 确保有ID
        if (!modelData.id) {
            modelData.id = `M-${this.nextModelId}`;
            this.nextModelId++;
        }
        
        // 添加到数组开头
        this.models.unshift(modelData);
        
        // 更新标签
        if (modelData.tags && Array.isArray(modelData.tags)) {
            modelData.tags.forEach(tag => {
                this.tags[tag] = (this.tags[tag] || 0) + 1;
            });
        }
        
        // 保存数据
        this.save();
        
        return modelData;
    },
    
    getThoughtById: function(id) {
        return this.thoughts.find(t => t.id === id);
    },
    
    getModelById: function(id) {
        return this.models.find(m => m.id === id);
    },
    
    deleteThought: function(id) {
        const index = this.thoughts.findIndex(t => t.id === id);
        if (index === -1) return false;
        
        // 移除思考记录
        this.thoughts.splice(index, 1);
        
        // 重新计算标签
        this.recalculateTags();
        
        // 保存数据
        this.save();
        
        return true;
    },
    
    deleteModel: function(id) {
        const index = this.models.findIndex(m => m.id === id);
        if (index === -1) return false;
        
        // 移除模型
        this.models.splice(index, 1);
        
        // 重新计算标签
        this.recalculateTags();
        
        // 保存数据
        this.save();
        
        return true;
    },
    
    recalculateTags: function() {
        // 清空标签计数
        this.tags = {};
        
        // 重新统计思考记录的标签
        this.thoughts.forEach(thought => {
            if (thought.tags && Array.isArray(thought.tags)) {
                thought.tags.forEach(tag => {
                    this.tags[tag] = (this.tags[tag] || 0) + 1;
                });
            }
        });
        
        // 重新统计模型的标签
        this.models.forEach(model => {
            if (model.tags && Array.isArray(model.tags)) {
                model.tags.forEach(tag => {
                    this.tags[tag] = (this.tags[tag] || 0) + 1;
                });
            }
        });
    },
    
    getTopTags: function(limit = 20) {
        return Object.entries(this.tags)
            .sort((a, b) => b[1] - a[1])
            .slice(0, limit)
            .map(([tag, count]) => ({ tag, count }));
    },
    
    loadInitialData: function() {
        // 清空当前数据
        this.thoughts = [];
        this.models = [];
        this.tags = {};
        
        // 添加示例数据
        this.addExampleData();
        
        return true;
    },
    
    exportData: function() {
        const data = {
            thoughts: this.thoughts,
            models: this.models,
            tags: this.tags,
            currentVersion: this.currentVersion,
            lastSaved: this.lastSaved,
            timeline: this.timeline,
            exportDate: new Date().toISOString()
        };
        
        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `思维协同数据_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        App.showMessage('数据导出成功', 'success');
        return true;
    },
    
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
                        this.thoughts = data.thoughts;
                        this.models = data.models;
                        this.tags = data.tags || {};
                        this.currentVersion = data.currentVersion || this.currentVersion;
                        this.timeline = data.timeline || this.timeline;
                        
                        // 保存
                        this.save();
                        
                        // 重新加载当前视图
                        App.loadView(App.currentView);
                        
                        App.showMessage('数据导入成功', 'success');
                    }
                } catch (error) {
                    console.error('导入数据失败:', error);
                    App.showMessage('导入失败：' + error.message, 'error');
                }
            };
            reader.readAsText(file);
        };
        
        input.click();
    }
};

// 初始化应用
console.log('script.js 加载完成');
// ==================== 分段编辑功能 ====================

// 在App对象中添加分段编辑相关方法
editThoughtSegments: function(id) {
    const thought = DataManager.getThoughtById(id);
    if (!thought) {
        this.showMessage('未找到思考记录', 'error');
        return;
    }
    
    let html = `
        <div class="content-header">
            <h2>分段编辑思考内容</h2>
            <p>编辑思考记录: ${thought.id}</p>
        </div>
        
        <div class="detail-view">
            <div class="detail-header">
                <div class="detail-title">${thought.title || '无标题'}</div>
                <div class="detail-id">${thought.id}</div>
                <div class="action-buttons" style="margin-top: 15px;">
                    <button class="btn btn-success" onclick="App.saveThoughtSegments('${thought.id}')">
                        <i class="fas fa-save"></i> 保存所有修改
                    </button>
                    <button class="btn btn-secondary" onclick="App.showThoughtDetail('${thought.id}')">
                        <i class="fas fa-arrow-left"></i> 返回详情
                    </button>
                </div>
            </div>
            
            <div class="segments-container">
    `;
    
    // 定义标准分段
    const segments = [
        { id: 'status', name: '💎 状态看板', key: '状态看板' },
        { id: 'conclusion', name: '🌌 核心结论', key: '核心结论' },
        { id: 'models', name: '🧩 模型延伸与整合', key: '模型延伸与整合' },
        { id: 'actions', name: '📚 行动/思维要点', key: '行动/思维要点' },
        { id: 'architecture', name: '📂 架构更新', key: '架构更新' }
    ];
    
    // 为每个分段创建编辑器
    segments.forEach(segment => {
        const content = thought.sections && thought.sections[segment.key] ? 
            thought.sections[segment.key] : '';
        
        html += `
            <div class="segment-editor">
                <div class="segment-header">
                    <h4>${segment.name}</h4>
                    <div class="segment-stats">${content.length} 字符</div>
                </div>
                <textarea id="${segment.id}-editor" class="segment-textarea" 
                          placeholder="输入${segment.name.replace(/[💎🌌🧩📚📂]/g, '').trim()}内容...">${content}</textarea>
            </div>
        `;
    });
    
    html += `
            </div>
        </div>
    `;
    
    document.getElementById('content-area').innerHTML = html;
    
    // 为每个编辑器添加实时字符计数
    segments.forEach(segment => {
        const textarea = document.getElementById(`${segment.id}-editor`);
        if (textarea) {
            const counter = document.createElement('div');
            counter.className = 'segment-counter';
            counter.innerHTML = `${textarea.value.length} 字符`;
            textarea.parentNode.insertBefore(counter, textarea.nextSibling);
            
            textarea.addEventListener('input', function() {
                counter.innerHTML = `${this.value.length} 字符`;
            });
        }
    });
},

saveThoughtSegments: function(thoughtId) {
    const thought = DataManager.getThoughtById(thoughtId);
    if (!thought) {
        this.showMessage('未找到思考记录', 'error');
        return;
    }
    
    // 获取各个分段的内容
    const segments = [
        { id: 'status', key: '状态看板' },
        { id: 'conclusion', key: '核心结论' },
        { id: 'models', key: '模型延伸与整合' },
        { id: 'actions', key: '行动/思维要点' },
        { id: 'architecture', key: '架构更新' }
    ];
    
    let hasChanges = false;
    
    // 更新每个分段
    segments.forEach(segment => {
        const editor = document.getElementById(`${segment.id}-editor`);
        if (editor) {
            const newContent = editor.value.trim();
            const oldContent = thought.sections && thought.sections[segment.key] ? 
                thought.sections[segment.key] : '';
            
            if (newContent !== oldContent) {
                if (!thought.sections) thought.sections = {};
                thought.sections[segment.key] = newContent;
                hasChanges = true;
            }
        }
    });
    
    if (hasChanges) {
        // 保存到数据管理器
        DataManager.save();
        
        // 从状态看板提取最新信息
        const statusContent = thought.sections && thought.sections['状态看板'];
        if (statusContent) {
            // 提取ID（如果更新了）
            const idMatch = statusContent.match(/#\d+/);
            if (idMatch && idMatch[0] !== thought.id) {
                thought.id = idMatch[0];
            }
            
            // 提取标题
            const titleMatch = statusContent.match(/思考主题[：:]\s*(.+?)(?:\n|$)/);
            if (titleMatch) {
                thought.title = titleMatch[1].trim();
            }
        }
        
        this.showMessage('分段内容已保存', 'success');
        
        // 返回到思考详情
        setTimeout(() => {
            this.showThoughtDetail(thoughtId);
        }, 1000);
    } else {
        this.showMessage('没有内容变化', 'info');
    }
},

// ==================== 标签复核功能 ====================

renderTagReview: function() {
    // 收集所有未分类的标签
    const allTags = DataManager.tags;
    const categorizedTags = new Set();
    
    // 获取所有已分类的标签
    Object.values(DataManager.tagCategories).forEach(category => {
        category.forEach(tag => categorizedTags.add(tag));
    });
    
    // 找出未分类的标签
    const uncategorizedTags = Object.keys(allTags).filter(tag => 
        !categorizedTags.has(tag) && allTags[tag] > 0
    ).map(tag => ({
        tag,
        count: allTags[tag],
        items: this.getItemsByTag(tag)
    })).sort((a, b) => b.count - a.count);
    
    // 按类别统计标签
    const categorized = {};
    Object.keys(DataManager.tagCategories).forEach(category => {
        categorized[category] = [];
        DataManager.tagCategories[category].forEach(tag => {
            if (allTags[tag] > 0) {
                categorized[category].push({
                    tag,
                    count: allTags[tag]
                });
            }
        });
        // 按数量排序
        categorized[category].sort((a, b) => b.count - a.count);
    });
    
    let html = `
        <div class="content-header">
            <h2>标签复核中心</h2>
            <p>系统版本: ${DataManager.currentVersion} | 共 ${Object.keys(allTags).length} 个标签</p>
        </div>
        
        <div class="tag-review-container">
    `;
    
    // 未分类标签
    if (uncategorizedTags.length > 0) {
        html += `
            <div class="tag-review-section">
                <div class="section-header">
                    <h3><i class="fas fa-exclamation-circle"></i> 待分类标签 (${uncategorizedTags.length})</h3>
                    <p>这些标签尚未归类，请为它们选择合适的分类</p>
                </div>
                <div class="tag-grid">
        `;
        
        uncategorizedTags.forEach(({ tag, count, items }) => {
            html += `
                <div class="tag-review-card">
                    <div class="tag-review-header">
                        <span class="tag-badge">${tag}</span>
                        <span class="tag-count">${count} 次使用</span>
                    </div>
                    <div class="tag-actions">
                        <select class="category-select" id="category-${tag.replace(/\s/g, '-')}" onchange="App.assignTagToCategory('${tag}', this.value)">
                            <option value="">选择分类...</option>
            `;
            
            Object.keys(DataManager.tagCategories).forEach(category => {
                html += `<option value="${category}">${category}</option>`;
            });
            
            html += `
                        </select>
                        <button class="btn btn-sm btn-danger" onclick="App.deleteTag('${tag}')" title="删除此标签">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                    <div class="tag-preview">
                        <small>用于：${items.slice(0, 2).map(item => item.title).join('、')}${items.length > 2 ? '等' : ''}</small>
                    </div>
                </div>
            `;
        });
        
        html += `
                </div>
            </div>
        `;
    }
    
    // 已分类标签
    html += `
        <div class="tag-review-section">
            <div class="section-header">
                <h3><i class="fas fa-check-circle"></i> 已分类标签</h3>
                <p>按类别管理的标签系统</p>
            </div>
    `;
    
    Object.keys(categorized).forEach(category => {
        if (categorized[category].length > 0) {
            html += `
                <div class="category-section">
                    <h4>${category} (${categorized[category].length})</h4>
                    <div class="tag-list">
            `;
            
            categorized[category].forEach(({ tag, count }) => {
                html += `
                    <div class="categorized-tag">
                        <span class="tag-badge">${tag}</span>
                        <span class="tag-count">${count}</span>
                        <button class="btn btn-xs btn-warning" onclick="App.removeTagFromCategory('${tag}')" title="移出此分类">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                `;
            });
            
            html += `
                    </div>
                </div>
            `;
        }
    });
    
    html += `
            </div>
        </div>
    </div>`;
    
    document.getElementById('content-area').innerHTML = html;
},

// 获取使用某个标签的项目
getItemsByTag: function(tag) {
    const items = [];
    
    // 从思考记录中查找
    DataManager.thoughts.forEach(thought => {
        if (thought.tags && thought.tags.includes(tag)) {
            items.push({
                type: '思考记录',
                id: thought.id,
                title: thought.title || '无标题'
            });
        }
    });
    
    // 从思维模型中查找
    DataManager.models.forEach(model => {
        if (model.tags && model.tags.includes(tag)) {
            items.push({
                type: '思维模型',
                id: model.id,
                title: model.name
            });
        }
    });
    
    return items;
},

// 将标签分配到分类
assignTagToCategory: function(tag, category) {
    if (!category) return;
    
    // 从其他分类中移除
    Object.keys(DataManager.tagCategories).forEach(cat => {
        DataManager.tagCategories[cat] = DataManager.tagCategories[cat].filter(t => t !== tag);
    });
    
    // 添加到新分类
    if (!DataManager.tagCategories[category].includes(tag)) {
        DataManager.tagCategories[category].push(tag);
    }
    
    // 保存到本地存储
    DataManager.save();
    
    // 重新渲染标签复核页面
    this.renderTagReview();
    
    this.showMessage(`标签 "${tag}" 已分配到 "${category}"`, 'success');
},

// 从分类中移除标签
removeTagFromCategory: function(tag) {
    let removed = false;
    
    Object.keys(DataManager.tagCategories).forEach(category => {
        const index = DataManager.tagCategories[category].indexOf(tag);
        if (index > -1) {
            DataManager.tagCategories[category].splice(index, 1);
            removed = true;
        }
    });
    
    if (removed) {
        DataManager.save();
        this.renderTagReview();
        this.showMessage(`标签 "${tag}" 已从分类中移除`, 'success');
    }
},

// 删除标签
deleteTag: function(tag) {
    if (confirm(`确定要删除标签 "${tag}" 吗？所有使用此标签的记录将被更新。`)) {
        // 从思考记录中移除
        DataManager.thoughts.forEach(thought => {
            if (thought.tags) {
                thought.tags = thought.tags.filter(t => t !== tag);
            }
        });
        
        // 从思维模型中移除
        DataManager.models.forEach(model => {
            if (model.tags) {
                model.tags = model.tags.filter(t => t !== tag);
            }
        });
        
        // 从标签索引中移除
        delete DataManager.tags[tag];
        
        // 从分类中移除
        this.removeTagFromCategory(tag);
        
        // 保存数据
        DataManager.save();
        
        this.showMessage(`标签 "${tag}" 已删除`, 'success');
    }
},

// ==================== 时间线编辑功能 ====================

renderTimeline: function() {
    const timeline = DataManager.timeline;
    
    let html = `
        <div class="content-header">
            <h2>系统演进历程</h2>
            <p>系统版本: ${DataManager.currentVersion} | 共 ${timeline.length} 个里程碑</p>
            <button class="btn btn-primary" onclick="App.showAddTimelineModal()" style="margin-top: 10px;">
                <i class="fas fa-plus"></i> 添加里程碑
            </button>
        </div>
        
        <div class="timeline-container">
    `;
    
    // 按日期排序时间线
    const sortedTimeline = [...timeline].sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });
    
    sortedTimeline.forEach((milestone, index) => {
        const dateObj = new Date(milestone.date);
        const year = dateObj.getFullYear();
        const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
        
        html += `
            <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <div class="timeline-header">
                        <div class="timeline-date">${year}年${month}月</div>
                        <div class="timeline-actions">
                            <button class="btn btn-xs btn-warning" onclick="App.editTimelineItem('${milestone.id}')">
                                <i class="fas fa-edit"></i> 编辑
                            </button>
                            <button class="btn btn-xs btn-danger" onclick="App.deleteTimelineItem('${milestone.id}')">
                                <i class="fas fa-trash"></i> 删除
                            </button>
                        </div>
                    </div>
                    <div class="timeline-version">${milestone.version}</div>
                    <div class="timeline-event">${milestone.event}</div>
                </div>
            </div>
        `;
    });
    
    html += `
        </div>
    `;
    
    document.getElementById('content-area').innerHTML = html;
},

// 显示添加时间线模态框
showAddTimelineModal: function() {
    let html = `
        <div class="modal-overlay" id="timeline-modal" style="display: flex;">
            <div class="modal">
                <div class="modal-header">
                    <h3>添加里程碑</h3>
                    <button class="modal-close" onclick="App.closeModal('timeline-modal')">&times;</button>
                </div>
                <div class="modal-content">
                    <div class="form-group">
                        <label>版本号</label>
                        <input type="text" id="timeline-version" placeholder="例如: v22.48">
                    </div>
                    <div class="form-group">
                        <label>日期</label>
                        <input type="month" id="timeline-date" value="${new Date().toISOString().slice(0, 7)}">
                    </div>
                    <div class="form-group">
                        <label>事件描述</label>
                        <textarea id="timeline-event" placeholder="描述这个里程碑的内容..." rows="3"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" onclick="App.closeModal('timeline-modal')">取消</button>
                    <button class="btn btn-primary" onclick="App.saveTimelineItem()">保存里程碑</button>
                </div>
            </div>
        </div>
    `;
    
    // 添加到页面
    document.body.insertAdjacentHTML('beforeend', html);
},

// 保存时间线项目
saveTimelineItem: function() {
    const version = document.getElementById('timeline-version')?.value.trim();
    const date = document.getElementById('timeline-date')?.value;
    const event = document.getElementById('timeline-event')?.value.trim();
    
    if (!version || !date || !event) {
        this.showMessage('请填写所有字段', 'warning');
        return;
    }
    
    const newItem = {
        id: `t${Date.now()}`,
        version,
        date: `${date}-01`, // 格式化为完整日期
        event
    };
    
    DataManager.timeline.push(newItem);
    DataManager.save();
    
    this.closeModal('timeline-modal');
    this.renderTimeline();
    this.showMessage('里程碑已添加', 'success');
},

// 编辑时间线项目
editTimelineItem: function(id) {
    const item = DataManager.timeline.find(item => item.id === id);
    if (!item) {
        this.showMessage('未找到时间线项目', 'error');
        return;
    }
    
    // 移除年份和月份
    const date = item.date.slice(0, 7); // 获取 YYYY-MM
    
    let html = `
        <div class="modal-overlay" id="timeline-edit-modal" style="display: flex;">
            <div class="modal">
                <div class="modal-header">
                    <h3>编辑里程碑</h3>
                    <button class="modal-close" onclick="App.closeModal('timeline-edit-modal')">&times;</button>
                </div>
                <div class="modal-content">
                    <input type="hidden" id="edit-timeline-id" value="${item.id}">
                    <div class="form-group">
                        <label>版本号</label>
                        <input type="text" id="edit-timeline-version" value="${item.version}">
                    </div>
                    <div class="form-group">
                        <label>日期</label>
                        <input type="month" id="edit-timeline-date" value="${date}">
                    </div>
                    <div class="form-group">
                        <label>事件描述</label>
                        <textarea id="edit-timeline-event" rows="3">${item.event}</textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" onclick="App.closeModal('timeline-edit-modal')">取消</button>
                    <button class="btn btn-primary" onclick="App.updateTimelineItem('${item.id}')">更新里程碑</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', html);
},

// 更新时间线项目
updateTimelineItem: function(id) {
    const version = document.getElementById('edit-timeline-version')?.value.trim();
    const date = document.getElementById('edit-timeline-date')?.value;
    const event = document.getElementById('edit-timeline-event')?.value.trim();
    
    if (!version || !date || !event) {
        this.showMessage('请填写所有字段', 'warning');
        return;
    }
    
    const item = DataManager.timeline.find(item => item.id === id);
    if (item) {
        item.version = version;
        item.date = `${date}-01`;
        item.event = event;
        
        DataManager.save();
        this.closeModal('timeline-edit-modal');
        this.renderTimeline();
        this.showMessage('里程碑已更新', 'success');
    }
},

// 删除时间线项目
deleteTimelineItem: function(id) {
    if (confirm('确定要删除这个里程碑吗？')) {
        const index = DataManager.timeline.findIndex(item => item.id === id);
        if (index > -1) {
            DataManager.timeline.splice(index, 1);
            DataManager.save();
            this.renderTimeline();
            this.showMessage('里程碑已删除', 'success');
        }
    }
}
// 简单的网络图实现
renderSimpleNetwork: function() {
    const models = DataManager.models;
    if (models.length === 0) return;
    
    const container = document.getElementById('network-graph');
    if (!container) return;
    
    // 清空容器
    container.innerHTML = '';
    
    // 创建canvas
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 400;
    canvas.style.width = '100%';
    canvas.style.height = '400px';
    canvas.style.maxWidth = '600px';
    canvas.style.margin = '0 auto';
    canvas.style.display = 'block';
    canvas.style.background = '#f8f9fa';
    canvas.style.borderRadius = '8px';
    container.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // 简单的网络布局
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 60;
    
    // 绘制连线
    ctx.strokeStyle = 'rgba(92, 107, 192, 0.3)';
    ctx.lineWidth = 1;
    
    for (let i = 0; i < models.length; i++) {
        const angle1 = (i * 2 * Math.PI) / models.length;
        const x1 = centerX + radius * Math.cos(angle1);
        const y1 = centerY + radius * Math.sin(angle1);
        
        for (let j = i + 1; j < models.length; j++) {
            // 根据标签相似度决定是否连线
            const model1 = models[i];
            const model2 = models[j];
            const commonTags = model1.tags?.filter(tag => 
                model2.tags?.includes(tag)
            ) || [];
            
            if (commonTags.length > 0) {
                const angle2 = (j * 2 * Math.PI) / models.length;
                const x2 = centerX + radius * Math.cos(angle2);
                const y2 = centerY + radius * Math.sin(angle2);
                
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();
            }
        }
    }
    
    // 绘制节点
    models.forEach((model, i) => {
        const angle = (i * 2 * Math.PI) / models.length;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        
        // 绘制节点
        ctx.fillStyle = i === 0 ? '#1a237e' : '#5c6bc0';
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI * 2);
        ctx.fill();
        
        // 节点文字
        ctx.fillStyle = 'white';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(model.id, x, y);
        
        // 节点交互
        canvas.addEventListener('click', (e) => {
            const rect = canvas.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const clickY = e.clientY - rect.top;
            
            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;
            const scaledX = clickX * scaleX;
            const scaledY = clickY * scaleY;
            
            const distance = Math.sqrt(
                Math.pow(scaledX - x, 2) + Math.pow(scaledY - y, 2)
            );
            
            if (distance <= 20) {
                App.showModelDetail(model.id);
            }
        });
    });
    
    // 添加提示
    const info = document.createElement('div');
    info.innerHTML = `
        <div style="text-align: center; margin-top: 15px; color: var(--text-light); font-size: 0.9rem;">
            <i class="fas fa-mouse-pointer"></i> 点击节点查看模型详情 | 
            <i class="fas fa-link"></i> 连线表示标签关联
        </div>
    `;
    container.appendChild(info);
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
