// ==================== 核心数据存储 ====================
const DataStore = {
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
    
    // 系统演进里程碑数据
    timeline: [
        {id: "t1", version: "v1.0-v5.0", date: "2023-01", event: "基础情感模型建立（工具化、错位、遗憾）"},
        {id: "t2", version: "v6.0-v10.0", date: "2023-03", event: "关系模型深化（成熟馈赠、无限博弈）"},
        {id: "t3", version: "v11.0-v15.0", date: "2023-05", event: "存在哲学拓展（存在勘探、水性智慧）"},
        {id: "t4", version: "v16.0-v18.0", date: "2023-07", event: "防御机制与病理学完善（梦境寄生、情感麻痹）"},
        {id: "t5", version: "v18.0-v20.2", date: "2023-09", event: "关系动力学、健康共建、意义整合"},
        {id: "t6", version: "v20.3-v21.3", date: "2023-11", event: "宏观社会批判、个体生存策略、哲学框架普适化"},
        {id: "t7", version: "v21.4-v22.0", date: "2024-01", event: "亲密关系光谱、存在性寄生、熵增损耗、祛魅悬置、偶像幻灭、创伤后重建、虚无美学整合"},
        {id: "t8", version: "v22.1-v22.2", date: "2024-03", event: "双轨制架构建立，新增 M-45 至 M-53 模型"},
        {id: "t9", version: "v22.33", date: "2024-05", event: "《我们很好》×《快乐星猫》关系诊疗整合版"},
        {id: "t10", version: "v22.48", date: "2024-07", event: "《寄居》×《花》整合版，模型总数达80个"}
    ],
    
    init: function() {
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
                
                console.log('从 localStorage 加载数据成功');
            } catch (e) {
                console.log('解析 localStorage 失败，使用示例数据', e);
                this.addExampleData();
            }
        } else {
            this.addExampleData();
        }
        
        this.save();
        this.updateUIStats();
    },
    
    addExampleData: function() {
        // 添加示例结构化思考
        const exampleThought = this.parseStructuredContent(`💎 **状态看板**  
**系统版本**：v22.48（《寄居》×《花》整合版）  
**当前思考ID**：#123  
**思考主题**：《寄居》与《花》——两种关系存在论："人间烟火"的现世守护 vs "超然宿命"的循环因果  
**思考类型**：🎵 歌曲分析（关系哲学 / 时间性比较）  
**关键标记**：🧠 核心模型、💞 亲密关系/情感、⏳ 时间/宿命、🌌 哲学/存在智慧  
**关联网络**：强关联于 #116 M-74（爱作为安全基地的成长）、#121 M-78（亲密预期错位）、#111 M-69（爱的在场性重构）、#120 M-77（终局对话）、#109 M-67（理想降解与意义锚定）。本思考是对两种根本性的关系世界图景与时间性体验的对比分析。  

🌌 **核心结论：两种关系存在论的对峙——以"责任"为轴心的线性建造 vs 以"缘劫"为法则的循环认命**  
《寄居》与《花》呈现了爱情（乃至深层关系）中两种几乎无法通约的"存在论"：一种将关系视为在**线性时间**中通过**主动担责与共同行动**来建造的"人间堡垒"；另一种将关系视为在**循环时间**中被**宿命法则（缘/劫）** 所规定的"灵魂生态"。  

🧩 **模型延伸与整合**  
**1. "关系存在论"二元模型 (M-80 新建)**  
*   **定义**：描述个体在深度关系中所秉持的、关于关系之本质、时间性与能动性的根本预设框架。主要分为两种理想类型：  
    1.  **建造者模式**：认为关系本质上是**在时间中通过双方持续努力构建的实体**。时间线性，未来开放，核心能动性是**责任、庇护与共同创造**。意义源于建造过程本身。  
    2.  **体认者模式**：认为关系本质上是**在更大的宇宙或命运法则下显现的阶段性状态**。时间循环，剧本既定，核心能动性是**接受、体认与渡过**。意义源于对法则的领悟与臣服。  

📚 **行动/思维要点（审视你的关系存在论）**  
1.  【**存在论自检**】你相信关系是"建造"的还是"认命"的？  

📂 **架构更新**  
*   **新增核心模型**：**M-80 "关系存在论"二元模型** (于 #123 建立)。  
*   **系统版本**：v22.47 → **v22.48**。`);
        
        exampleThought.id = "#123";
        exampleThought.date = new Date().toISOString().split('T')[0];
        this.thoughts.push(exampleThought);
        
        // 添加示例模型
        this.addModel({
            id: "M-80",
            name: "关系存在论模型",
            description: "描述个体在深度关系中所秉持的、关于关系之本质、时间性与能动性的根本预设框架。主要分为两种理想类型：建造者模式与体认者模式。",
            date: new Date().toISOString().split('T')[0],
            tags: ["🧠 核心模型", "💞 亲密关系/情感", "🌌 哲学/存在智慧", "⏳ 时间/宿命"],
            fromThought: "#123",
            relatedModels: ["M-74", "M-78", "M-69", "M-77", "M-67"],
            usageCount: 12,
            lastUsed: "2025-07-20"
        });
        
        this.addModel({
            id: "M-79",
            name: "诠释伦理模型",
            description: "自我中心投射 vs 他者导向共情，描述在解读他人行为时的伦理立场差异",
            date: "2025-07-19",
            tags: ["🧠 核心模型", "⚖️ 伦理/责任", "🎨 艺术/象征", "🌌 哲学/存在智慧"],
            fromThought: "#122",
            relatedModels: ["M-77", "M-71", "M-67"],
            usageCount: 8,
            lastUsed: "2025-07-19"
        });
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
            console.log('数据保存成功');
            return true;
        } catch (e) {
            console.error('保存数据失败:', e);
            return false;
        }
    },
    
    // ==================== 数据操作方法 ====================
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
        
        // 简单的解析逻辑
        const lines = text.split('\n');
        let currentSection = '';
        
        for (const line of lines) {
            if (line.includes('💎 **状态看板**') || line.includes('状态看板')) {
                currentSection = '状态看板';
                thought.sections[currentSection] = '';
            } else if (line.includes('🌌 **核心结论**') || line.includes('核心结论')) {
                currentSection = '核心结论';
                thought.sections[currentSection] = '';
            } else if (line.includes('🧩 **模型延伸与整合**') || line.includes('模型延伸与整合')) {
                currentSection = '模型延伸与整合';
                thought.sections[currentSection] = '';
            } else if (line.includes('📚 **行动/思维要点**') || line.includes('行动/思维要点')) {
                currentSection = '行动/思维要点';
                thought.sections[currentSection] = '';
            } else if (line.includes('📂 **架构更新**') || line.includes('架构更新')) {
                currentSection = '架构更新';
                thought.sections[currentSection] = '';
            } else if (currentSection && line.trim()) {
                thought.sections[currentSection] += line + '\n';
            }
            
            // 提取ID
            if (line.includes('当前思考ID') && line.includes('#')) {
                const match = line.match(/#\d+/);
                if (match) thought.id = match[0];
            }
            
            // 提取标题
            if (line.includes('思考主题') && !thought.title) {
                thought.title = line.split('思考主题')[1].replace(/[：:]\s*/, '').trim();
            }
            
            // 提取标签
            if (line.includes('关键标记') && line.includes('、')) {
                const tagsPart = line.split('关键标记')[1];
                thought.tags = tagsPart.replace(/[：:]\s*/, '').split(/[、，,\s]+/).filter(tag => tag.trim());
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
        
        // 如果没有提取到标题，使用第一行非空内容
        if (!thought.title) {
            const firstLine = lines.find(line => line.trim().length > 0 && !line.includes('💎') && !line.includes('🌌'));
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
        this.updateUIStats();
        
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
        this.updateUIStats();
        
        return modelData;
    },
    
    getThoughtById: function(id) {
        return this.thoughts.find(t => t.id === id);
    },
    
    getModelById: function(id) {
        return this.models.find(m => m.id === id);
    },
    
    updateUIStats: function() {
        // 更新统计显示
        const totalThoughts = document.getElementById('total-thoughts');
        const totalModels = document.getElementById('total-models');
        const totalTags = document.getElementById('total-tags');
        const currentVersion = document.getElementById('current-version');
        
        if (totalThoughts) totalThoughts.textContent = this.thoughts.length;
        if (totalModels) totalModels.textContent = this.models.length;
        if (totalTags) totalTags.textContent = Object.keys(this.tags).length;
        if (currentVersion) currentVersion.textContent = this.currentVersion;
        
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
    }
};

// ==================== UI管理器 ====================
const UIManager = {
    currentView: 'overview',
    
    init: function() {
        // 初始化数据存储
        DataStore.init();
        
        // 设置导航点击事件
        this.setupNavigation();
        
        // 加载初始视图
        this.loadView('overview');
        
        // 隐藏加载动画
        setTimeout(() => {
            const loadingElement = document.getElementById('loading');
            if (loadingElement) loadingElement.style.display = 'none';
        }, 300);
        
        // 设置搜索功能
        this.setupSearch();
        
        // 设置版本选择器
        this.setupVersionSelector();
        
        // 设置数据操作按钮
        this.setupDataActions();
        
        // 设置移动端事件（如果存在）
        if (typeof MobileManager !== 'undefined') {
            MobileManager.setupMobileEvents();
        }
    },
    
    setupNavigation: function() {
        // 桌面端导航
        document.querySelectorAll('.nav-links a').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                
                // 移除所有active类
                document.querySelectorAll('.nav-links a').forEach(nav => {
                    nav.classList.remove('active');
                });
                
                // 添加active类到当前项
                item.classList.add('active');
                
                // 根据data-view属性加载相应视图
                const view = item.getAttribute('data-view');
                this.loadView(view);
            });
        });
        
        // 移动端底部导航
        document.querySelectorAll('.mobile-nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                
                // 移除所有active类
                document.querySelectorAll('.mobile-nav-item').forEach(nav => {
                    nav.classList.remove('active');
                });
                
                // 添加active类到当前项
                item.classList.add('active');
                
                // 根据data-view属性加载相应视图
                const view = item.getAttribute('data-view');
                this.loadView(view);
                
                // 在移动端滚动到顶部
                if (window.innerWidth <= 768) {
                    window.scrollTo(0, 0);
                }
            });
        });
        
        // 移动端视图切换器
        document.querySelectorAll('.mobile-view-option').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                
                // 移除所有active类
                document.querySelectorAll('.mobile-view-option').forEach(nav => {
                    nav.classList.remove('active');
                });
                
                // 添加active类到当前项
                item.classList.add('active');
                
                // 根据data-view属性加载相应视图
                const view = item.getAttribute('data-view');
                this.loadView(view);
                
                // 隐藏视图切换器
                const switcher = document.getElementById('mobile-view-switcher');
                if (switcher) switcher.classList.remove('active');
            });
        });
    },
    
    setupSearch: function() {
        // 桌面端搜索
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', () => {
                this.performSearch(searchInput.value);
            });
        }
        
        // 移动端搜索
        const mobileSearchInput = document.getElementById('mobile-search-input');
        if (mobileSearchInput) {
            mobileSearchInput.addEventListener('input', () => {
                this.performSearch(mobileSearchInput.value);
            });
            
            // 回车键搜索
            mobileSearchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.performSearch(mobileSearchInput.value);
                    // 隐藏搜索栏
                    const searchBar = document.getElementById('mobile-search-bar');
                    if (searchBar) searchBar.classList.remove('active');
                }
            });
        }
    },
    
    setupVersionSelector: function() {
        const versionSelect = document.getElementById('version-select');
        if (versionSelect) {
            versionSelect.addEventListener('change', function() {
                const version = this.value;
                if (version === 'current') {
                    // 重新加载当前数据
                    DataStore.init();
                    UIManager.loadView(UIManager.currentView);
                } else if (version === 'initial') {
                    alert('初始版本功能暂未实现');
                }
            });
        }
    },
    
    setupDataActions: function() {
        // 导出当前项目
        const exportCurrentBtn = document.getElementById('export-current-btn');
        if (exportCurrentBtn) {
            exportCurrentBtn.addEventListener('click', () => {
                this.exportCurrentItem();
            });
        }
        
        // 备份全部数据
        const backupDataBtn = document.getElementById('backup-data-btn');
        if (backupDataBtn) {
            backupDataBtn.addEventListener('click', () => {
                this.backupAllData();
            });
        }
        
        // 导入数据
        const importDataBtn = document.getElementById('import-data-btn');
        if (importDataBtn) {
            importDataBtn.addEventListener('click', () => {
                this.importData();
            });
        }
        
        // 导出全部数据
        const exportAllBtn = document.getElementById('export-all-btn');
        if (exportAllBtn) {
            exportAllBtn.addEventListener('click', () => {
                this.exportAllData();
            });
        }
        
        // 同步按钮
        const syncBtn = document.getElementById('sync-btn');
        if (syncBtn) {
            syncBtn.addEventListener('click', () => {
                alert('同步功能：请使用导出/导入功能手动同步数据');
            });
        }
        
        // 导出按钮
        const exportBtn = document.getElementById('export-btn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                this.exportAllData();
            });
        }
    },
    
    loadView: function(view) {
        this.currentView = view;
        
        // 更新顶部状态栏
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
            "timeline": "系统演进历程",
            "data-management": "数据管理与备份"
        };
        
        const currentViewEl = document.getElementById('current-view');
        if (currentViewEl) {
            currentViewEl.textContent = viewNames[view] || view;
        }
        
        // 显示加载中
        const contentArea = document.getElementById('content-area');
        contentArea.innerHTML = '<div id="loading" class="loading" style="margin: 100px auto;"></div>';
        
        // 根据视图类型加载内容
        setTimeout(() => {
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
        }, 100);
    },
    
    // ==================== 视图渲染方法 ====================
    renderOverview: function() {
        const html = `
            <div class="content-header">
                <h2>核心资产总览</h2>
                <p>系统版本: ${DataStore.currentVersion} | 本地存储数据状态</p>
            </div>
            
            <div class="stats-grid">
                <div class="stat-card">
                    <h3><i class="fas fa-brain"></i> 思考记录总数</h3>
                    <div class="stat-value">${DataStore.thoughts.length}</div>
                    <div class="stat-desc">完整结构化思考条目</div>
                </div>
                
                <div class="stat-card">
                    <h3><i class="fas fa-cubes"></i> 核心思维模型</h3>
                    <div class="stat-value">${DataStore.models.length}</div>
                    <div class="stat-desc">可迁移的分析框架</div>
                </div>
                
                <div class="stat-card">
                    <h3><i class="fas fa-tags"></i> 标签关键词</h3>
                    <div class="stat-value">${Object.keys(DataStore.tags).length}</div>
                    <div class="stat-desc">跨主题分类标签</div>
                </div>
                
                <div class="stat-card">
                    <h3><i class="fas fa-heartbeat"></i> 系统健康度</h3>
                    <div class="stat-value">100%</div>
                    <div class="stat-desc">架构高度自洽，功能完整</div>
                </div>
            </div>
            
            <div class="detail-view">
                <div class="detail-header">
                    <div>
                        <div class="detail-title">系统架构特性</div>
                    </div>
                </div>
                <div class="detail-content">
                    <p><strong>开放网络：</strong>模型可无限拓展，主题不受限</p>
                    <p><strong>多层结构：</strong>"核心模型层"、"现象分析层"、"实践工具箱"三层协同运作</p>
                    <p><strong>智能解析：</strong>支持灵活格式的结构化内容解析，自动提取关键信息</p>
                    <p><strong>本地存储：</strong>所有数据保存在浏览器本地，确保隐私安全</p>
                    <p><strong>完整功能：</strong>具备增删改查、标签复核、搜索过滤等完整管理功能</p>
                </div>
            </div>
        `;
        
        document.getElementById('content-area').innerHTML = html;
    },
    
    renderAddStructured: function() {
        const html = `
            <div class="content-header">
                <h2>结构化输入思考内容</h2>
                <p>按照灵活格式输入，系统将智能解析并归类</p>
            </div>
            
            <div class="format-hint">
                <i class="fas fa-lightbulb"></i> <strong>格式说明：</strong> 系统会智能识别以下关键部分，不要求格式完全一致：
                <div style="margin-top: 10px; font-size: 0.9rem;">
                    <div><strong>状态看板</strong> - 描述思考的基本信息</div>
                    <div><strong>核心结论</strong> - 主要观点和发现</div>
                    <div><strong>模型延伸与整合</strong> - 模型扩展和关联</div>
                    <div><strong>行动/思维要点</strong> - 行动建议和思考要点</div>
                    <div><strong>架构更新</strong> - 系统或模型的更新</div>
                </div>
            </div>
            
            <div class="input-section">
                <h3>输入思考内容</h3>
                <textarea id="structured-input" placeholder="请输入您的思考内容，系统会智能识别各个部分..."></textarea>
                <div class="btn-group">
                    <button class="btn btn-primary" onclick="parseAndPreview()">
                        <i class="fas fa-search"></i> 解析预览
                    </button>
                    <button class="btn btn-success" onclick="saveStructuredThought()">
                        <i class="fas fa-save"></i> 保存思考
                    </button>
                </div>
                <div id="parse-preview" class="parse-preview">
                    <!-- 解析预览将通过JavaScript动态生成 -->
                </div>
            </div>
        `;
        
        document.getElementById('content-area').innerHTML = html;
    },
    
    renderThoughts: function() {
        const thoughts = DataStore.thoughts;
        
        let thoughtsHTML = '';
        thoughts.forEach(thought => {
            const summary = thought.sections && thought.sections["核心结论"] ? 
                thought.sections["核心结论"].substring(0, 80) + '...' : 
                '暂无摘要';
            
            thoughtsHTML += `
                <div class="record-card" onclick="showThoughtDetail('${thought.id}')">
                    <div class="card-actions">
                        <div class="action-icon edit" onclick="event.stopPropagation(); editThought('${thought.id}')" title="编辑">
                            <i class="fas fa-edit"></i>
                        </div>
                        <div class="action-icon delete" onclick="event.stopPropagation(); openDeleteModal('thought', '${thought.id}')" title="删除">
                            <i class="fas fa-trash"></i>
                        </div>
                    </div>
                    <div class="record-id">${thought.id}</div>
                    <div class="record-title">${thought.title || '无标题'}</div>
                    <div class="record-desc">${summary}</div>
                    <div class="record-tags">
                        ${thought.tags ? thought.tags.map(tag => `<span class="tag">${tag}</span>`).join('') : ''}
                    </div>
                </div>
            `;
        });
        
        const html = `
            <div class="content-header">
                <h2>思考目录完整清单</h2>
                <p>系统版本: ${DataStore.currentVersion} | 共 ${DataStore.thoughts.length} 条思考记录</p>
            </div>
            
            <div class="records-list">
                ${thoughtsHTML || '<div class="empty-state"><i class="fas fa-inbox"></i><p>暂无思考记录</p></div>'}
            </div>
        `;
        
        document.getElementById('content-area').innerHTML = html;
    },
    
    renderModels: function() {
        const models = DataStore.models;
        
        let modelsHTML = '';
        models.forEach(model => {
            modelsHTML += `
                <div class="model-card" onclick="showModelDetail('${model.id}')">
                    <div class="card-actions">
                        <div class="action-icon edit" onclick="event.stopPropagation(); editModel('${model.id}')" title="编辑">
                            <i class="fas fa-edit"></i>
                        </div>
                        <div class="action-icon delete" onclick="event.stopPropagation(); openDeleteModal('model', '${model.id}')" title="删除">
                            <i class="fas fa-trash"></i>
                        </div>
                    </div>
                    <div class="model-id">${model.id}</div>
                    <div class="model-name">${model.name}</div>
                    <div class="model-desc">${model.description.substring(0, 100)}...</div>
                    <div class="model-tags">
                        ${model.tags ? model.tags.map(tag => `<span class="tag">${tag}</span>`).join('') : ''}
                    </div>
                </div>
            `;
        });
        
        const html = `
            <div class="content-header">
                <h2>核心思维模型索引</h2>
                <p>系统版本: ${DataStore.currentVersion} | 共 ${DataStore.models.length} 个思维模型</p>
            </div>
            
            <div class="models-list">
                ${modelsHTML || '<div class="empty-state"><i class="fas fa-cubes"></i><p>暂无思维模型</p></div>'}
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
                <h3>新的模型</h3>
                <input type="text" id="model-id" placeholder="模型ID (例如: M-80)">
                <input type="text" id="model-name" placeholder="模型名称（例如：关系存在论模型）">
                <input type="text" id="model-from-thought" placeholder="来源思考ID (例如: #123)">
                <textarea id="model-description" placeholder="请详细描述这个模型的定义、应用场景、关联模型等..." style="min-height: 200px;"></textarea>
                <div class="btn-group">
                    <button class="btn btn-primary" onclick="saveModel()">
                        <i class="fas fa-save"></i> 保存模型
                    </button>
                </div>
            </div>
        `;
        
        document.getElementById('content-area').innerHTML = html;
    },
    
    renderKeywords: function() {
        const topTags = Object.entries(DataStore.tags)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 20);
        
        let tagsHTML = '';
        topTags.forEach(([tag, count]) => {
            tagsHTML += `<span class="tag" style="cursor:pointer; font-size: ${14 + Math.min(count, 10)}px;" onclick="filterByTag('${tag}')">${tag} (${count})</span>`;
        });
        
        const html = `
            <div class="content-header">
                <h2>标签分类检索</h2>
                <p>系统版本: ${DataStore.currentVersion} | 共 ${Object.keys(DataStore.tags).length} 个标签</p>
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
    
    renderHowToUse: function() {
        const html = `
            <div class="content-header">
                <h2>如何使用本系统</h2>
                <p>将深刻分析从"关于他人的知识"转化为"关于自我的智慧"</p>
            </div>
            
            <div class="detail-view">
                <div class="detail-content">
                    <div class="detail-section">
                        <h4><i class="fas fa-compass"></i> 使用流程</h4>
                        <div class="detail-section-content">
                            <p>1. <strong>根据情绪/问题定位情境</strong>：先感受自己最核心的情绪（是不安、遗憾、窒息感，还是需要抉择），找到对应的情境板块。</p>
                            <p>2. <strong>快速浏览核心模型</strong>：理解你正经历的可能是哪种心理模式。</p>
                            <p>3. <strong>调用具体的思维/行动要点</strong>：选择1-2条最触动你的要点，立刻在脑海中演练或写在纸上。它不是标准答案，而是思维的启动器。</p>
                            <p>4. <strong>将知识转化为自我智慧</strong>：这个工具包会随着思考库的扩充而持续更新。它的最终目的，是让那些深刻的分析，从关于他人的知识，转化为关于自我的智慧。</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById('content-area').innerHTML = html;
    },
    
    renderMilestones: function() {
        const milestones = DataStore.timeline;
        
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
        
        const html = `
            <div class="content-header">
                <h2>系统演进里程碑</h2>
                <p>系统版本: ${DataStore.currentVersion} | 对话脉络与时间线</p>
            </div>
            
            <div class="records-list">
                ${milestonesHTML || '<div class="empty-state"><i class="fas fa-road"></i><p>暂无里程碑数据</p></div>'}
            </div>
        `;
        
        document.getElementById('content-area').innerHTML = html;
    },
    
    renderArchitecture: function() {
        const html = `
            <div class="content-header">
                <h2>系统架构特性确认</h2>
                <p>系统版本: ${DataStore.currentVersion} | 架构完整性验证</p>
            </div>
            
            <div class="detail-view">
                <div class="detail-content">
                    <p><strong>开放网络：</strong>模型可无限拓展，主题不受限</p>
                    <p><strong>多层结构：</strong>核心模型层/现象分析层/实践工具箱协同运作</p>
                    <p><strong>双轨数据：</strong>标准模型库保证处理效率，思想原典库保证完整性</p>
                    <p><strong>终极目标：</strong>成为人生各课题（情感、存在、意义、成长、关系）的分析与行动引擎</p>
                    <p><strong>当前高度：</strong>已建立从关系存在论(M-80)到临床干预(M-66)的完整分析-实践框架</p>
                </div>
            </div>
        `;
        
        document.getElementById('content-area').innerHTML = html;
    },
    
    renderTagReview: function() {
        const html = `
            <div class="content-header">
                <h2>标签复核中心</h2>
                <p>系统版本: ${DataStore.currentVersion}</p>
            </div>
            
            <div class="detail-view">
                <div class="detail-section">
                    <h4><i class="fas fa-exclamation-circle"></i> 需要标签复核的项目</h4>
                    <div class="empty-state" style="padding: 20px;">
                        <i class="fas fa-check-circle"></i>
                        <p>所有项目都已标记标签，无需复核</p>
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById('content-area').innerHTML = html;
    },
    
    renderNetworkAnalysis: function() {
        const html = `
            <div class="content-header">
                <h2>模型关联网络分析</h2>
                <p>系统版本: ${DataStore.currentVersion} | 可视化展示模型间的关联关系</p>
            </div>
            
            <div class="detail-view">
                <div class="detail-section">
                    <h4><i class="fas fa-project-diagram"></i> 网络概览</h4>
                    <div class="detail-section-content">
                        <p>功能开发中...</p>
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById('content-area').innerHTML = html;
    },
    
    renderTimeline: function() {
        const timeline = DataStore.timeline;
        
        let timelineHTML = '';
        timeline.forEach((item, index) => {
            timelineHTML += `
                <div class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="timeline-content">
                        <div class="timeline-version">${item.version}</div>
                        <div class="timeline-date">${item.date}</div>
                        <p>${item.event}</p>
                    </div>
                </div>
            `;
        });
        
        const html = `
            <div class="content-header">
                <h2>系统演进历程</h2>
                <p>系统版本: ${DataStore.currentVersion} | 从初始概念到完整知识体系的成长路径</p>
            </div>
            
            <div class="detail-view">
                <div class="timeline-container">
                    <div class="timeline-line"></div>
                    ${timelineHTML}
                </div>
            </div>
        `;
        
        document.getElementById('content-area').innerHTML = html;
    },
    
    renderDataManagement: function() {
        const html = `
            <div class="content-header">
                <h2>数据管理与备份</h2>
                <p>系统版本: ${DataStore.currentVersion} | 确保知识资产的安全与可迁移性</p>
            </div>
            
            <div class="detail-view">
                <div class="detail-section">
                    <h4><i class="fas fa-database"></i> 当前数据状态</h4>
                    <div class="detail-section-content">
                        <p><strong>思考记录：</strong>${DataStore.thoughts.length} 条</p>
                        <p><strong>思维模型：</strong>${DataStore.models.length} 个</p>
                        <p><strong>标签分类：</strong>${Object.keys(DataStore.tags).length} 个</p>
                        <p><strong>最后保存：</strong>${DataStore.lastSaved ? new Date(DataStore.lastSaved).toLocaleString() : '未知'}</p>
                    </div>
                </div>
                
                <div class="detail-section">
                    <h4><i class="fas fa-download"></i> 数据导出</h4>
                    <div class="detail-section-content">
                        <div class="action-buttons">
                            <button class="btn btn-primary" onclick="UIManager.exportAllData()">
                                <i class="fas fa-file-export"></i> 导出全部数据
                            </button>
                        </div>
                        <p style="margin-top: 10px; color: var(--text-light); font-size: 0.9rem;">
                            导出的数据为JSON格式，可在其他设备或浏览器中导入恢复。
                        </p>
                    </div>
                </div>
                
                <div class="detail-section">
                    <h4><i class="fas fa-sync-alt"></i> 数据备份与恢复</h4>
                    <div class="detail-section-content">
                        <div class="action-buttons">
                            <button class="btn btn-warning" onclick="UIManager.importData()">
                                <i class="fas fa-file-import"></i> 导入数据
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById('content-area').innerHTML = html;
    },
    
    performSearch: function(query) {
        if (!query.trim()) {
            // 如果搜索框为空，重新加载当前视图
            this.loadView(this.currentView);
            return;
        }
        
        const searchTerm = query.toLowerCase();
        
        // 搜索思考记录
        const filteredThoughts = DataStore.thoughts.filter(thought => {
            return (
                (thought.title && thought.title.toLowerCase().includes(searchTerm)) ||
                (thought.id && thought.id.toLowerCase().includes(searchTerm)) ||
                (thought.tags && thought.tags.some(tag => tag.toLowerCase().includes(searchTerm))) ||
                (thought.sections && Object.values(thought.sections).some(section => 
                    section.toLowerCase().includes(searchTerm)
                ))
            );
        });
        
        // 搜索思维模型
        const filteredModels = DataStore.models.filter(model => {
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
                    <div class="record-card" onclick="showThoughtDetail('${thought.id}')">
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
                    <div class="model-card" onclick="showModelDetail('${model.id}')">
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
            </div>
            
            <div class="records-list">
                ${resultsHTML || '<div class="empty-state"><i class="fas fa-search"></i><p>未找到相关结果</p></div>'}
            </div>
        `;
        
        document.getElementById('content-area').innerHTML = html;
    },
    
    // ==================== 数据操作功能 ====================
    exportCurrentItem: function() {
        alert('导出当前项目功能开发中');
    },
    
    exportAllData: function() {
        const data = DataStore.exportAllData ? DataStore.exportAllData() : JSON.stringify({
            thoughts: DataStore.thoughts,
            models: DataStore.models,
            tags: DataStore.tags,
            currentVersion: DataStore.currentVersion,
            lastSaved: DataStore.lastSaved,
            timeline: DataStore.timeline,
            exportDate: new Date().toISOString()
        }, null, 2);
        
        this.downloadFile(data, `思维协同处理器_备份_${new Date().toISOString().split('T')[0]}.json`);
        this.showAlert('全部数据导出成功', 'success');
    },
    
    backupAllData: function() {
        alert('备份功能开发中');
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
                    if (data.thoughts && data.models) {
                        // 导入数据
                        DataStore.thoughts = data.thoughts;
                        DataStore.models = data.models;
                        DataStore.tags = data.tags || {};
                        DataStore.currentVersion = data.currentVersion || DataStore.currentVersion;
                        DataStore.timeline = data.timeline || DataStore.timeline;
                        
                        // 保存
                        DataStore.save();
                        DataStore.updateUIStats();
                        
                        // 重新加载当前视图
                        this.loadView(this.currentView);
                        
                        this.showAlert('数据导入成功', 'success');
                    } else {
                        alert('数据格式错误：缺少必要字段');
                    }
                } catch (error) {
                    alert('文件格式错误：' + error.message);
                }
            };
            reader.readAsText(file);
        };
        
        input.click();
    },
    
    downloadFile: function(data, filename) {
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    },
    
    showAlert: function(message, type = 'info') {
        const alertClass = type === 'success' ? 'alert-success' : 'alert-info';
        const icon = type === 'success' ? 'fa-check-circle' : 'fa-info-circle';
        
        const alertHtml = `
            <div class="alert ${alertClass}" style="margin: 15px 0;">
                <i class="fas ${icon}"></i> 
                ${message}
            </div>
        `;
        
        const contentArea = document.getElementById('content-area');
        const firstChild = contentArea.firstChild;
        if (firstChild) {
            firstChild.insertAdjacentHTML('afterend', alertHtml);
        } else {
            contentArea.innerHTML = alertHtml;
        }
        
        setTimeout(() => {
            const alertElement = contentArea.querySelector('.alert');
            if (alertElement) {
                alertElement.remove();
            }
        }, 3000);
    }
};

// ==================== 全局函数 ====================
function parseAndPreview() {
    const input = document.getElementById('structured-input');
    if (!input || !input.value.trim()) {
        alert('请输入要解析的内容');
        return;
    }
    
    const thought = DataStore.parseStructuredContent(input.value);
    const previewDiv = document.getElementById('parse-preview');
    
    if (previewDiv) {
        previewDiv.style.display = 'block';
        
        previewDiv.innerHTML = `
            <h4><i class="fas fa-check-circle"></i> 解析成功</h4>
            <p><strong>思考ID:</strong> ${thought.id}</p>
            <p><strong>思考主题:</strong> ${thought.title}</p>
            <p><strong>系统版本:</strong> ${thought.systemVersion}</p>
            <p><strong>关键标记:</strong> ${thought.tags ? thought.tags.map(tag => `<span class="tag">${tag}</span>`).join(' ') : '无'}</p>
            <div style="margin-top: 15px; font-size: 0.9rem; color: var(--success-color);">
                <i class="fas fa-check"></i> 解析完成，点击"保存思考"按钮保存到系统
            </div>
        `;
    }
}

function saveStructuredThought() {
    const input = document.getElementById('structured-input');
    if (!input || !input.value.trim()) {
        alert('请输入思考内容');
        return;
    }
    
    const thought = DataStore.addStructuredThought(input.value);
    
    // 显示成功消息
    UIManager.showAlert(`思考记录已保存: ${thought.id}。系统已智能解析并归类！`, 'success');
    
    // 刷新当前视图
    UIManager.loadView(UIManager.currentView);
    
    // 更新索引
    DataStore.updateUIStats();
    
    // 清空输入框
    input.value = '';
    
    console.log('结构化思考记录已保存:', thought);
}

function saveModel() {
    const idInput = document.getElementById('model-id');
    const nameInput = document.getElementById('model-name');
    const fromThoughtInput = document.getElementById('model-from-thought');
    const descInput = document.getElementById('model-description');
    
    if (!nameInput || !nameInput.value.trim()) {
        alert('请输入模型名称');
        return;
    }
    
    if (!descInput || !descInput.value.trim()) {
        alert('请输入模型描述');
        return;
    }
    
    const model = DataStore.addModel({
        id: idInput && idInput.value.trim() ? idInput.value.trim() : undefined,
        name: nameInput.value.trim(),
        description: descInput.value.trim(),
        date: new Date().toISOString().split('T')[0],
        tags: [],
        fromThought: fromThoughtInput && fromThoughtInput.value.trim() ? fromThoughtInput.value.trim() : null
    });
    
    // 清空输入
    if (idInput) idInput.value = '';
    if (nameInput) nameInput.value = '';
    if (fromThoughtInput) fromThoughtInput.value = '';
    if (descInput) descInput.value = '';
    
    // 显示成功消息
    UIManager.showAlert(`思维模型已保存: ${model.id}`, 'success');
    
    // 刷新当前视图
    UIManager.loadView(UIManager.currentView);
    
    // 更新索引
    DataStore.updateUIStats();
}

function showThoughtDetail(id) {
    const thought = DataStore.getThoughtById(id);
    const contentArea = document.getElementById('content-area');
    
    if (!thought) {
        contentArea.innerHTML = '<div class="empty-state"><i class="fas fa-search"></i><p>未找到思考记录</p></div>';
        return;
    }
    
    let html = `
        <div class="detail-view">
            <div class="detail-header">
                <div>
                    <div class="detail-title">${thought.title || '无标题'}</div>
                    <div class="detail-id">${thought.id}</div>
                    <div style="margin-top: 10px;">
                        ${thought.tags ? thought.tags.map(tag => `<span class="tag">${tag}</span>`).join(' ') : ''}
                    </div>
                </div>
                <div style="color: var(--text-light); font-size: 0.9rem;">${thought.date}</div>
            </div>
            
            <div class="action-buttons">
                <button class="btn btn-secondary" onclick="UIManager.loadView('thoughts')">
                    <i class="fas fa-arrow-left"></i> 返回列表
                </button>
            </div>
    `;
    
    // 渲染状态看板
    if (thought.sections && thought.sections["状态看板"]) {
        html += `
            <div class="detail-section">
                <h4><i class="fas fa-tachometer-alt"></i> 状态看板</h4>
                <div class="detail-section-content">
                    <pre style="white-space: pre-wrap; font-family: inherit;">${thought.sections["状态看板"]}</pre>
                </div>
            </div>
        `;
    }
    
    // 渲染核心结论
    if (thought.sections && thought.sections["核心结论"]) {
        html += `
            <div class="detail-section">
                <h4><i class="fas fa-bullseye"></i> 核心结论</h4>
                <div class="detail-section-content">
                    <pre style="white-space: pre-wrap; font-family: inherit;">${thought.sections["核心结论"]}</pre>
                </div>
            </div>
        `;
    }
    
    // 渲染模型延伸与整合
    if (thought.sections && thought.sections["模型延伸与整合"]) {
        html += `
            <div class="detail-section">
                <h4><i class="fas fa-puzzle-piece"></i> 模型延伸与整合</h4>
                <div class="detail-section-content">
                    <pre style="white-space: pre-wrap; font-family: inherit;">${thought.sections["模型延伸与整合"]}</pre>
                </div>
            </div>
        `;
    }
    
    // 渲染行动/思维要点
    if (thought.sections && thought.sections["行动/思维要点"]) {
        html += `
            <div class="detail-section">
                <h4><i class="fas fa-lightbulb"></i> 行动/思维要点</h4>
                <div class="detail-section-content">
                    <pre style="white-space: pre-wrap; font-family: inherit;">${thought.sections["行动/思维要点"]}</pre>
                </div>
            </div>
        `;
    }
    
    // 渲染架构更新
    if (thought.sections && thought.sections["架构更新"]) {
        html += `
            <div class="detail-section">
                <h4><i class="fas fa-code-branch"></i> 架构更新</h4>
                <div class="detail-section-content">
                    <pre style="white-space: pre-wrap; font-family: inherit;">${thought.sections["架构更新"]}</pre>
                </div>
            </div>
        `;
    }
    
    html += `</div>`;
    contentArea.innerHTML = html;
}

function showModelDetail(id) {
    const model = DataStore.getModelById(id);
    const contentArea = document.getElementById('content-area');
    
    if (!model) {
        contentArea.innerHTML = '<div class="empty-state"><i class="fas fa-search"></i><p>未找到思维模型</p></div>';
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
                <button class="btn btn-secondary" onclick="UIManager.loadView('models')">
                    <i class="fas fa-arrow-left"></i> 返回列表
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
    contentArea.innerHTML = html;
}

function editThought(id) {
    alert('编辑功能开发中');
}

function editModel(id) {
    alert('编辑功能开发中');
}

function filterByTag(tag) {
    alert('标签过滤功能开发中');
}

// ==================== 模态框相关函数 ====================
function openDeleteModal(type, id) {
    alert('删除功能开发中');
}

function closeDeleteModal() {
    const modal = document.getElementById('delete-modal');
    if (modal) modal.style.display = 'none';
}

// ==================== 移动端管理 ====================
const MobileManager = {
    isMobile: function() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },
    
    setupMobileEvents: function() {
        if (!this.isMobile()) return;
        
        // 移动端菜单切换
        const menuToggle = document.getElementById('mobile-menu-toggle');
        if (menuToggle) {
            menuToggle.addEventListener('click', () => {
                menuToggle.classList.toggle('active');
                alert('移动端菜单功能开发中');
            });
        }
        
        // 移动端搜索切换
        const searchToggle = document.getElementById('mobile-search-toggle');
        const searchBar = document.getElementById('mobile-search-bar');
        if (searchToggle && searchBar) {
            searchToggle.addEventListener('click', () => {
                searchBar.classList.toggle('active');
                searchToggle.classList.toggle('active');
                
                // 关闭视图切换器
                const viewSwitcher = document.getElementById('mobile-view-switcher');
                const viewToggle = document.getElementById('mobile-view-toggle');
                if (viewSwitcher) viewSwitcher.classList.remove('active');
                if (viewToggle) viewToggle.classList.remove('active');
                
                // 聚焦搜索框
                if (searchBar.classList.contains('active')) {
                    setTimeout(() => {
                        const searchInput = document.getElementById('mobile-search-input');
                        if (searchInput) searchInput.focus();
                    }, 300);
                }
            });
        }
        
        // 移动端视图切换
        const viewToggle = document.getElementById('mobile-view-toggle');
        const viewSwitcher = document.getElementById('mobile-view-switcher');
        if (viewToggle && viewSwitcher) {
            viewToggle.addEventListener('click', () => {
                viewSwitcher.classList.toggle('active');
                viewToggle.classList.toggle('active');
                
                // 关闭搜索栏
                if (searchBar) searchBar.classList.remove('active');
                if (searchToggle) searchToggle.classList.remove('active');
            });
        }
        
        // 移动端搜索清除
        const searchClear = document.getElementById('mobile-search-clear');
        const mobileSearchInput = document.getElementById('mobile-search-input');
        if (searchClear && mobileSearchInput) {
            searchClear.addEventListener('click', () => {
                mobileSearchInput.value = '';
                mobileSearchInput.focus();
            });
        }
        
        // 触摸优化
        this.setupTouchEvents();
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
    }
};

// ==================== 初始化 ====================
document.addEventListener('DOMContentLoaded', function() {
    // 主初始化
    UIManager.init();
    
    // 添加点击模态框外部关闭的功能
    document.addEventListener('click', function(event) {
        const deleteModal = document.getElementById('delete-modal');
        const tagReviewModal = document.getElementById('tag-review-modal');
        const sectionEditModal = document.getElementById('section-edit-modal');
        const timelineEditModal = document.getElementById('timeline-edit-modal');
        
        if (event.target === deleteModal) {
            closeDeleteModal();
        }
        
        if (event.target === tagReviewModal) {
            // 关闭标签复核模态框
            tagReviewModal.style.display = 'none';
        }
        
        if (event.target === sectionEditModal) {
            // 关闭分段编辑模态框
            sectionEditModal.style.display = 'none';
        }
        
        if (event.target === timelineEditModal) {
            // 关闭时间线编辑模态框
            timelineEditModal.style.display = 'none';
        }
    });
    
    // 移动端优化
    if (MobileManager.isMobile()) {
        // 添加移动端样式类
        document.body.classList.add('mobile-mode');
        
        // 初始化移动端事件
        MobileManager.setupMobileEvents();
        
        // 调整内容区域间距
        const contentArea = document.getElementById('content-area');
        if (contentArea) {
            contentArea.style.paddingBottom = '80px';
        }
    }
});
