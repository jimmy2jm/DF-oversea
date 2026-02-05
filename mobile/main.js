/* ============================================
   密码指引弹窗
   ============================================ */
const passwordModal = document.getElementById('password-modal-overlay');
const passwordModalClose = document.getElementById('password-modal-close');

// 点击密码区域打开弹窗
document.querySelectorAll('.password-code-box').forEach(box => {
    box.addEventListener('click', function() {
        const mapName = this.parentElement.querySelector('.password-map').textContent;
        const code = this.querySelector('.password-code').textContent;
        openPasswordModal(mapName, code);
    });
});

// 打开弹窗
function openPasswordModal(mapName, code) {
    const content = document.getElementById('password-modal-content');
    // 可以根据 mapName 和 code 动态填充内容
    content.innerHTML = `
        <div style="text-align: center; color: var(--text-secondary); padding-top: 100px;">
            <p>当前地图：${mapName}</p>
            <p>密码：${code}</p>
            <p style="margin-top: 20px;">（指引内容待填充）</p>
        </div>
    `;
    passwordModal.classList.add('active');
}

// 关闭弹窗
function closePasswordModal() {
    passwordModal.classList.remove('active');
}

// 点击关闭按钮
if (passwordModalClose) {
    passwordModalClose.addEventListener('click', closePasswordModal);
}

// 点击遮罩层关闭
if (passwordModal) {
    passwordModal.addEventListener('click', function(e) {
        if (e.target === this) {
            closePasswordModal();
        }
    });
}

/* ============================================
   制造部门弹窗
   ============================================ */
const craftModal = document.getElementById('craft-modal-overlay');
const craftModalClose = document.getElementById('craft-modal-close');
const craftModalTitle = document.getElementById('craft-modal-title');
const craftModalContent = document.getElementById('craft-modal-content');

// 点击制造部门卡片打开弹窗
document.querySelectorAll('.craft-station-card[data-station]').forEach(card => {
    card.addEventListener('click', function() {
        const stationName = this.dataset.station;
        const status = this.dataset.status; // 'idle' 或 'working'
        const itemName = this.dataset.item || '';
        const time = this.dataset.time || '';
        openCraftModal(stationName, status, itemName, time);
    });
});

// 打开制造弹窗
function openCraftModal(stationName, status, itemName, time) {
    craftModalTitle.textContent = stationName;
    
    let contentHtml = '';
    
    if (status === 'working') {
        // 制作中状态
        contentHtml = `
            <div style="text-align: center; color: var(--text-secondary); padding-top: 80px;">
                <div style="font-size: 40px; margin-bottom: 16px;">🔧</div>
                <p style="color: var(--accent-cyan); font-size: 18px; margin-bottom: 8px;">制作中</p>
                <p style="font-size: 14px;">正在制作：${itemName}</p>
                <p style="font-size: 14px;">剩余时间：${time}</p>
                <p style="margin-top: 40px; font-size: 12px; opacity: 0.6;">（制作中状态内容待填充）</p>
            </div>
        `;
    } else {
        // 空闲状态
        contentHtml = `
            <div style="text-align: center; color: var(--text-secondary); padding-top: 80px;">
                <div style="font-size: 40px; margin-bottom: 16px;">💤</div>
                <p style="color: #4ade80; font-size: 18px; margin-bottom: 8px;">空闲中</p>
                <p style="font-size: 14px;">当前无制作任务</p>
                <p style="margin-top: 40px; font-size: 12px; opacity: 0.6;">（空闲状态内容待填充）</p>
            </div>
        `;
    }
    
    craftModalContent.innerHTML = contentHtml;
    craftModal.classList.add('active');
}

// 关闭制造弹窗
function closeCraftModal() {
    craftModal.classList.remove('active');
}

// 点击关闭按钮
if (craftModalClose) {
    craftModalClose.addEventListener('click', closeCraftModal);
}

// 点击遮罩层关闭
if (craftModal) {
    craftModal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeCraftModal();
        }
    });
}

// 日报Tab切换功能
document.querySelectorAll('.report-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.report-tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        
        // 切换内容显示
        const reportType = this.dataset.report;
        document.getElementById('report-fh').classList.remove('active');
        document.getElementById('report-zc').classList.remove('active');
        
        if (reportType === 'fh') {
            document.getElementById('report-fh').classList.add('active');
        } else {
            document.getElementById('report-zc').classList.add('active');
        }
    });
});

// 枪械选择器切换
document.querySelectorAll('.gun-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.gun-tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        // 重绘雷达图（可以根据不同枪械显示不同数据）
        drawRadarCharts();
    });
});

// 五维雷达图绘制
const gunStatsData = {
    mp5: {
        budget: { damage: 55, firerate: 85, accuracy: 70, mobility: 90, control: 75 },
        premium: { damage: 60, firerate: 90, accuracy: 85, mobility: 85, control: 88 }
    },
    ak74: {
        budget: { damage: 72, firerate: 60, accuracy: 65, mobility: 70, control: 60 },
        premium: { damage: 78, firerate: 65, accuracy: 82, mobility: 68, control: 78 }
    },
    m4a1: {
        budget: { damage: 65, firerate: 75, accuracy: 72, mobility: 75, control: 70 },
        premium: { damage: 70, firerate: 80, accuracy: 88, mobility: 72, control: 85 }
    },
    scar: {
        budget: { damage: 80, firerate: 55, accuracy: 70, mobility: 60, control: 65 },
        premium: { damage: 88, firerate: 60, accuracy: 85, mobility: 58, control: 80 }
    },
    vss: {
        budget: { damage: 50, firerate: 70, accuracy: 75, mobility: 85, control: 80 },
        premium: { damage: 55, firerate: 75, accuracy: 90, mobility: 82, control: 92 }
    }
};

function drawRadarChart(canvasId, stats, color, fillColor) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const rect = canvas.parentElement.getBoundingClientRect();
    
    // 设置canvas尺寸
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);
    
    const width = rect.width;
    const height = rect.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 20;
    
    const labels = ['伤害', '射速', '精准', '机动', '控制'];
    const values = [stats.damage, stats.firerate, stats.accuracy, stats.mobility, stats.control];
    const numSides = 5;
    const angleStep = (Math.PI * 2) / numSides;
    const startAngle = -Math.PI / 2; // 从顶部开始
    
    ctx.clearRect(0, 0, width, height);
    
    // 绘制背景网格（多层五边形）
    for (let level = 1; level <= 4; level++) {
        const levelRadius = (radius / 4) * level;
        ctx.beginPath();
        for (let i = 0; i <= numSides; i++) {
            const angle = startAngle + angleStep * i;
            const x = centerX + Math.cos(angle) * levelRadius;
            const y = centerY + Math.sin(angle) * levelRadius;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = 'rgba(42, 58, 74, 0.6)';
        ctx.lineWidth = 0.5;
        ctx.stroke();
    }
    
    // 绘制轴线
    for (let i = 0; i < numSides; i++) {
        const angle = startAngle + angleStep * i;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + Math.cos(angle) * radius, centerY + Math.sin(angle) * radius);
        ctx.strokeStyle = 'rgba(42, 58, 74, 0.6)';
        ctx.lineWidth = 0.5;
        ctx.stroke();
    }
    
    // 绘制数据多边形（填充）
    ctx.beginPath();
    for (let i = 0; i <= numSides; i++) {
        const index = i % numSides;
        const angle = startAngle + angleStep * index;
        const value = values[index] / 100;
        const x = centerX + Math.cos(angle) * radius * value;
        const y = centerY + Math.sin(angle) * radius * value;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // 绘制数据点
    for (let i = 0; i < numSides; i++) {
        const angle = startAngle + angleStep * i;
        const value = values[i] / 100;
        const x = centerX + Math.cos(angle) * radius * value;
        const y = centerY + Math.sin(angle) * radius * value;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
    }
    
    // 绘制标签
    ctx.font = '9px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#8a9bb0';
    
    for (let i = 0; i < numSides; i++) {
        const angle = startAngle + angleStep * i;
        const labelRadius = radius + 12;
        const x = centerX + Math.cos(angle) * labelRadius;
        const y = centerY + Math.sin(angle) * labelRadius;
        ctx.fillText(labels[i], x, y);
    }
}

function drawRadarCharts() {
    const activeGun = document.querySelector('.gun-tab.active');
    const gunType = activeGun ? activeGun.dataset.gun : 'mp5';
    const gunData = gunStatsData[gunType] || gunStatsData.mp5;
    
    // 绘制性价比方案雷达图（绿色）
    drawRadarChart('radar-budget', gunData.budget, '#4ade80', 'rgba(74, 222, 128, 0.2)');
    
    // 绘制满改方案雷达图（紫色）
    drawRadarChart('radar-premium', gunData.premium, '#a78bfa', 'rgba(167, 139, 250, 0.2)');
}

// 初始化雷达图
drawRadarCharts();

// 窗口大小变化时重绘
window.addEventListener('resize', drawRadarCharts);

// 复制按钮
document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        this.textContent = '已复制 ✓';
        this.style.background = 'var(--accent-cyan)';
        this.style.color = '#000';
        setTimeout(() => {
            this.textContent = '复制';
            this.style.background = '';
            this.style.color = '';
        }, 1500);
    });
});

document.querySelectorAll('.news-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.news-tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
    });
});

/* 底部导航切换 */
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
        this.classList.add('active');
        
        // 切换页面内容
        const pageName = this.dataset.page;
        showPage(pageName);
    });
});

// 页面切换函数
function showPage(pageName) {
    // 隐藏所有页面
    document.querySelectorAll('.page-content').forEach(page => {
        page.style.display = 'none';
    });
    
    // 显示对应页面
    if (pageName === '首页') {
        document.getElementById('page-home').style.display = 'block';
    } else if (pageName === '工具') {
        document.getElementById('page-tools').style.display = 'block';
        // 页面显示后初始化制造推荐（因为隐藏时canvas尺寸为0）
        setTimeout(() => {
            updateCraftItemsMobile(currentCraftTypeMobile);
            initMarketPriceMobile();
        }, 50);
    } else if (pageName === 'Wiki') {
        document.getElementById('page-guides').style.display = 'block';
    } else if (pageName === '我的') {
        document.getElementById('page-profile').style.display = 'block';
    }
}

// 制造 - 主Tab切换 (制造详情/制造推荐) - 支持首页和工具页
document.querySelectorAll('.craft-main-tab-mobile').forEach(tab => {
    tab.addEventListener('click', function() {
        const isHome = this.dataset.for === 'home';
        const parentTabs = isHome ? 
            document.querySelectorAll('.craft-main-tab-mobile[data-for="home"]') : 
            document.querySelectorAll('.craft-main-tab-mobile:not([data-for="home"])');
        
        parentTabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        
        const mainTab = this.dataset.mainTab;
        const detailContent = document.getElementById(isHome ? 'craft-detail-content-home' : 'craft-detail-content');
        const recommendContent = document.getElementById(isHome ? 'craft-recommend-content-home' : 'craft-recommend-content');
        
        if (mainTab === 'detail') {
            detailContent.classList.add('active');
            recommendContent.classList.remove('active');
        } else {
            detailContent.classList.remove('active');
            recommendContent.classList.add('active');
            // 工具页切换到推荐时刷新数据
            if (!isHome) {
                setTimeout(() => {
                    updateCraftItemsMobile(currentCraftTypeMobile);
                }, 50);
            }
        }
    });
});

// 制造推荐 - Tab切换 - 仅工具页需要
document.querySelectorAll('.craft-tab-mobile:not([data-for="home"])').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.craft-tab-mobile:not([data-for="home"])').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        
        const craftType = this.dataset.craft;
        updateCraftItemsMobile(craftType);
    });
});

// 制造推荐数据
const craftDataMobile = {
    tech: [
        { name: 'OLIGHT Baldr Pro R手电', profit: 18578, change: 12.6, positive: true },
        { name: '灵眼3/7测距瞄准镜', profit: 8083, change: 7.0, positive: true },
        { name: 'DBAL-X2激光镭指', profit: 7487, change: -1.9, positive: false }
    ],
    work: [
        { name: 'PMAG D-60弹鼓', profit: 15230, change: 8.3, positive: true },
        { name: 'Zenit PT-1枪托', profit: 9120, change: 5.2, positive: true },
        { name: 'Magpul前握把', profit: 6540, change: -2.5, positive: false }
    ],
    med: [
        { name: '军用急救包', profit: 12450, change: 15.8, positive: true },
        { name: '肾上腺素注射器', profit: 7890, change: 3.2, positive: true },
        { name: '高级止痛药', profit: 5670, change: -4.1, positive: false }
    ],
    armor: [
        { name: '6级防弹插板', profit: 22340, change: 18.5, positive: true },
        { name: 'Ops-Core头盔', profit: 11200, change: 6.7, positive: true },
        { name: 'THORAX背心', profit: 8950, change: -0.8, positive: false }
    ]
};

let selectedCraftIndexMobile = 0;
let currentCraftTypeMobile = 'tech';

function updateCraftItemsMobile(craftType) {
    currentCraftTypeMobile = craftType;
    selectedCraftIndexMobile = 0;
    const items = craftDataMobile[craftType];
    const container = document.getElementById('craft-items-mobile');
    if (!container || !items) return;
    
    container.innerHTML = items.map((item, index) => `
        <div class="craft-item-mobile ${index === selectedCraftIndexMobile ? 'selected' : ''}" data-index="${index}">
            <div class="craft-item-image-mobile"></div>
            <div class="craft-item-name-mobile">${item.name}</div>
            <div class="craft-item-stats-mobile">
                <div class="craft-stat-row">
                    <span class="craft-stat-label">每小时收益</span>
                    <span class="craft-stat-value">${item.profit.toLocaleString()}</span>
                </div>
                <div class="craft-item-change-mobile ${item.positive ? 'positive' : 'negative'}">
                    ${item.positive ? '+' : ''}${item.change}%${item.positive ? '↑' : '↓'}
                </div>
            </div>
        </div>
    `).join('');
    
    // 绑定点击事件
    container.querySelectorAll('.craft-item-mobile').forEach(itemEl => {
        itemEl.addEventListener('click', function() {
            container.querySelectorAll('.craft-item-mobile').forEach(el => el.classList.remove('selected'));
            this.classList.add('selected');
            selectedCraftIndexMobile = parseInt(this.dataset.index);
            drawCraftChartMobile();
        });
    });
    
    drawCraftChartMobile();
}

function drawCraftChartMobile() {
    const canvas = document.getElementById('craft-chart-mobile');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const rect = canvas.parentElement.getBoundingClientRect();
    
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);
    
    const width = rect.width;
    const height = rect.height;
    const padding = { top: 15, right: 10, bottom: 20, left: 35 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;
    
    const items = craftDataMobile[currentCraftTypeMobile];
    const item = items[selectedCraftIndexMobile];
    const isPositive = item.positive;
    
    // 生成数据
    const times = ['10:00', '14:00', '18:00', '22:00', '02:00', '06:00', '11:00'];
    const basePrice = Math.round(item.profit / 1000 * 2);
    let data = [];
    let currentValue = basePrice + (Math.random() - 0.5) * 2;
    
    if (isPositive) {
        for (let i = 0; i < times.length; i++) {
            if (i < 4) {
                currentValue += (Math.random() - 0.3) * 0.5;
            } else {
                currentValue += Math.random() * 1.5 + 0.5;
            }
            data.push({ time: times[i], value: Math.max(1, currentValue) });
        }
    } else {
        for (let i = 0; i < times.length; i++) {
            if (i < 3) {
                currentValue += (Math.random() - 0.5) * 0.3;
            } else {
                currentValue -= Math.random() * 0.8 + 0.2;
            }
            data.push({ time: times[i], value: Math.max(1, currentValue) });
        }
    }
    
    const values = data.map(d => d.value);
    const dataMin = Math.min(...values);
    const dataMax = Math.max(...values);
    const range = dataMax - dataMin || 1;
    const minValue = dataMin - range * 0.2;
    const maxValue = dataMax + range * 0.2;
    const valueRange = maxValue - minValue;
    
    ctx.clearRect(0, 0, width * 2, height * 2);
    
    // 绘制网格线
    ctx.strokeStyle = '#2a3a4a';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= 4; i++) {
        const val = minValue + (valueRange / 4) * i;
        const y = padding.top + chartHeight - ((val - minValue) / valueRange) * chartHeight;
        ctx.beginPath();
        ctx.moveTo(padding.left, y);
        ctx.lineTo(width - padding.right, y);
        ctx.stroke();
        
        ctx.fillStyle = '#8a9bb0';
        ctx.font = '9px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(val.toFixed(1) + '万', padding.left - 4, y + 3);
    }
    
    // 绘制填充区域
    ctx.beginPath();
    data.forEach((point, index) => {
        const x = padding.left + (index / (data.length - 1)) * chartWidth;
        const y = padding.top + chartHeight - ((point.value - minValue) / valueRange) * chartHeight;
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.lineTo(padding.left + chartWidth, padding.top + chartHeight);
    ctx.lineTo(padding.left, padding.top + chartHeight);
    ctx.closePath();
    ctx.fillStyle = isPositive ? 'rgba(0, 212, 170, 0.15)' : 'rgba(239, 68, 68, 0.15)';
    ctx.fill();
    
    // 绘制曲线
    ctx.beginPath();
    data.forEach((point, index) => {
        const x = padding.left + (index / (data.length - 1)) * chartWidth;
        const y = padding.top + chartHeight - ((point.value - minValue) / valueRange) * chartHeight;
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.strokeStyle = isPositive ? '#00d4aa' : '#ef4444';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // 绘制数据点
    data.forEach((point, index) => {
        const x = padding.left + (index / (data.length - 1)) * chartWidth;
        const y = padding.top + chartHeight - ((point.value - minValue) / valueRange) * chartHeight;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = isPositive ? '#00d4aa' : '#ef4444';
        ctx.fill();
    });
    
    // X轴时间标签
    ctx.fillStyle = '#8a9bb0';
    ctx.font = '8px sans-serif';
    ctx.textAlign = 'center';
    [0, 3, 6].forEach(index => {
        const x = padding.left + (index / (data.length - 1)) * chartWidth;
        ctx.fillText(data[index].time, x, height - 5);
    });
}

// 初始化制造推荐
if (document.getElementById('craft-items-mobile')) {
    updateCraftItemsMobile('tech');
}

/* ============================================
   地图工具 - 交互逻辑
   ============================================ */
// 地图数据
const mapDataMobile = {
    fenghuodiqu: [
        { id: 'chaoxi', name: '潮汐监狱', icon: '🏚️' },
        { id: 'bakeshi', name: '巴克什', icon: '🗼' },
        { id: 'hangtian', name: '航天基地', icon: '🚀' },
        { id: 'linghao', name: '零号大坝', icon: '🌊' }
    ],
    quanmianzhanchang: [
        { id: 'duicheng', name: '对称城镇', icon: '🏘️' },
        { id: 'gongchang', name: '工厂区', icon: '🏭' },
        { id: 'jichang', name: '机场', icon: '✈️' },
        { id: 'shamo', name: '沙漠小镇', icon: '🏜️' }
    ]
};

let currentMapMode = 'fenghuodiqu';
let currentMapId = 'chaoxi';

// 地图模式Tab切换
document.querySelectorAll('.map-mode-tab-mobile').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.map-mode-tab-mobile').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        
        currentMapMode = this.dataset.mapMode;
        updateMapSelector(currentMapMode);
    });
});

// 更新地图选择器
function updateMapSelector(mode) {
    const maps = mapDataMobile[mode];
    const container = document.getElementById('map-selector-mobile');
    if (!container || !maps) return;
    
    container.innerHTML = maps.map((map, index) => `
        <div class="map-selector-item ${index === 0 ? 'active' : ''}" data-map="${map.id}">
            <div class="map-thumb">
                <div class="map-thumb-placeholder">${map.icon}</div>
            </div>
            <div class="map-selector-name">${map.name}</div>
        </div>
    `).join('');
    
    // 默认选中第一个
    currentMapId = maps[0].id;
    updateMapPreview(maps[0].name);
    
    // 绑定点击事件
    bindMapSelectorEvents();
}

// 绑定地图选择器点击事件
function bindMapSelectorEvents() {
    document.querySelectorAll('.map-selector-item').forEach(item => {
        item.addEventListener('click', function() {
            document.querySelectorAll('.map-selector-item').forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            currentMapId = this.dataset.map;
            const mapName = this.querySelector('.map-selector-name').textContent;
            updateMapPreview(mapName);
        });
    });
}

// 更新地图预览
function updateMapPreview(mapName) {
    const previewName = document.getElementById('map-preview-name');
    if (previewName) {
        previewName.textContent = mapName;
    }
}

// 初始化地图选择器事件
bindMapSelectorEvents();

/* ============================================
   Wiki页面 - 攻略Tab切换
   ============================================ */
document.querySelectorAll('.guide-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.guide-tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
    });
});

/* ============================================
   我的页面 - 交互逻辑
   ============================================ */
// 当前战绩模式
let currentBattleMode = 'fenghuodiDai';

// 烽火地带数据
const fenghuoData = {
    stats: [
        { value: '55.1M', label: '带出总价值' },
        { value: '37.6%', label: '撤离率' },
        { value: '333', label: '击败干员' },
        { value: '535.0K', label: '赚损比' }
    ],
    records: [
        { avatar: '🎖️', status: 'fail', statusText: '撤离失败', operator: '威龙', mode: '烽火地带', map: '零号大坝-机密', time: '02-01 10:52', profit: '68,304', kills: '4' },
        { avatar: '⚔️', status: 'fail', statusText: '撤离失败', operator: '骇爪', mode: '烽火地带', map: '零号大坝-机密', time: '02-01 10:45', profit: '95,960', kills: '7' },
        { avatar: '🛡️', status: 'fail', statusText: '撤离失败', operator: '威龙', mode: '烽火地带', map: '航天基地-机密', time: '02-01 10:30', profit: '0', kills: '2' }
    ]
};

// 全面战场数据
const zhancahngData = {
    stats: [
        { value: '28', label: '胜场数' },
        { value: '45.2%', label: '胜率' },
        { value: '12162', label: '场均得分' },
        { value: '2.8', label: '分均击杀' }
    ],
    records: [
        { avatar: '⚔️', status: 'fail', statusText: '失败', operator: '威龙', mode: '全面战场', map: '余震-攻防', time: '02-01 10:55', score: '12607', kills: '39' },
        { avatar: '🏆', status: 'success', statusText: '胜利', operator: '骇爪', mode: '全面战场', map: '余震-攻防', time: '02-01 09:30', score: '15320', kills: '45' },
        { avatar: '⚔️', status: 'fail', statusText: '失败', operator: '威龙', mode: '全面战场', map: '余震-攻防', time: '02-01 08:15', score: '8650', kills: '22' }
    ]
};

// 更新战绩数据显示
function updateBattleModeData(mode) {
    currentBattleMode = mode;
    const data = mode === 'fenghuodiDai' ? fenghuoData : zhancahngData;
    const statsGrid = document.getElementById('stats-grid');
    const recordList = document.querySelector('.battle-record-list');
    
    // 更新统计数据
    if (statsGrid) {
        statsGrid.innerHTML = data.stats.map(stat => `
            <div class="profile-stat-item">
                <div class="profile-stat-value">${stat.value}</div>
                <div class="profile-stat-label">${stat.label}</div>
            </div>
        `).join('');
    }
    
    // 更新对局记录
    if (recordList) {
        if (mode === 'fenghuodiDai') {
            recordList.innerHTML = data.records.map(record => `
                <div class="battle-record-item">
                    <div class="battle-record-avatar">${record.avatar}</div>
                    <div class="battle-record-info">
                        <div class="battle-record-status">
                            <span class="battle-status-tag ${record.status}">${record.statusText}</span>
                            <span class="battle-operator-name">${record.operator}</span>
                        </div>
                        <div class="battle-record-map">${record.mode} | ${record.map}</div>
                        <div class="battle-record-time">${record.time}</div>
                    </div>
                    <div class="battle-record-result">
                        <div class="battle-result-profit">💰 ${record.profit}</div>
                        <div class="battle-result-kills">💀 ${record.kills}</div>
                    </div>
                    <span class="battle-record-arrow">›</span>
                </div>
            `).join('');
        } else {
            recordList.innerHTML = data.records.map(record => `
                <div class="battle-record-item">
                    <div class="battle-record-avatar">${record.avatar}</div>
                    <div class="battle-record-info">
                        <div class="battle-record-status">
                            <span class="battle-status-tag ${record.status}">${record.statusText}</span>
                            <span class="battle-operator-name">${record.operator}</span>
                        </div>
                        <div class="battle-record-map">${record.mode} | ${record.map}</div>
                        <div class="battle-record-time">${record.time}</div>
                    </div>
                    <div class="battle-record-result">
                        <div class="battle-result-score">🏅 ${record.score}</div>
                        <div class="battle-result-kills">💀 ${record.kills}</div>
                    </div>
                    <span class="battle-record-arrow">›</span>
                </div>
            `).join('');
        }
    }
}

// 模式切换 (烽火地带/全面战场)
document.querySelectorAll('.profile-mode-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.profile-mode-tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        const mode = this.dataset.mode;
        updateBattleModeData(mode);
    });
});

// 内容Tab切换 (战绩生涯/大红藏馆/资产)
document.querySelectorAll('.profile-content-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        // 切换Tab样式
        document.querySelectorAll('.profile-content-tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        
        // 切换内容显示
        const tabName = this.dataset.tab;
        document.querySelectorAll('.profile-tab-content').forEach(content => {
            content.style.display = 'none';
        });
        document.getElementById('tab-' + tabName).style.display = 'block';
        
        // 更新统计卡片
        updateProfileStats(tabName);
    });
});

// 更新统计卡片内容
function updateProfileStats(tabName) {
    const statsTitle = document.getElementById('stats-title');
    const statsLink = document.getElementById('stats-link');
    const statsGrid = document.getElementById('stats-grid');
    const modeTabs = document.getElementById('profile-mode-tabs');
    
    // 仅战绩页显示模式Tab
    if (modeTabs) {
        modeTabs.style.display = tabName === 'battle' ? 'flex' : 'none';
    }
    
    if (tabName === 'battle') {
        statsTitle.style.display = 'none';
        statsLink.style.display = 'none';
        statsGrid.innerHTML = `
            <div class="profile-stat-item">
                <div class="profile-stat-value">55.1M</div>
                <div class="profile-stat-label">带出总价值</div>
            </div>
            <div class="profile-stat-item">
                <div class="profile-stat-value">37.6%</div>
                <div class="profile-stat-label">撤离率</div>
            </div>
            <div class="profile-stat-item">
                <div class="profile-stat-value">333</div>
                <div class="profile-stat-label">击败干员</div>
            </div>
            <div class="profile-stat-item">
                <div class="profile-stat-value">535.0K</div>
                <div class="profile-stat-label">赚损比</div>
            </div>
        `;
    } else if (tabName === 'collection') {
        statsTitle.textContent = '大红藏馆总览';
        statsTitle.style.display = 'block';
        statsLink.style.display = 'none';
        statsGrid.innerHTML = `
            <div class="profile-stat-item">
                <div class="profile-stat-value">12</div>
                <div class="profile-stat-label">大红总数</div>
            </div>
            <div class="profile-stat-item">
                <div class="profile-stat-value">20</div>
                <div class="profile-stat-label">大红数量</div>
            </div>
            <div class="profile-stat-item">
                <div class="profile-stat-value">8.5M</div>
                <div class="profile-stat-label">大红累计价值</div>
            </div>
            <div class="profile-stat-item">
                <div class="profile-stat-value">0</div>
                <div class="profile-stat-label">本周收集数量</div>
            </div>
        `;
    } else if (tabName === 'asset') {
        statsTitle.textContent = '游戏资产总览';
        statsTitle.style.display = 'block';
        statsLink.style.display = 'inline-block';
        statsGrid.innerHTML = `
            <div class="profile-stat-item">
                <div class="profile-stat-value">910</div>
                <div class="profile-stat-label">三角币</div>
            </div>
            <div class="profile-stat-item">
                <div class="profile-stat-value">72.1M</div>
                <div class="profile-stat-label">总资产</div>
            </div>
            <div class="profile-stat-item">
                <div class="profile-stat-value">23.2M</div>
                <div class="profile-stat-label">哈夫币</div>
            </div>
            <div class="profile-stat-item">
                <div class="profile-stat-value">1</div>
                <div class="profile-stat-label">典藏枪械外观</div>
            </div>
        `;
    }
}

// 战绩页子Tab切换
document.querySelectorAll('.battle-sub-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.battle-sub-tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
    });
});

// 藏品分类Tab切换
document.querySelectorAll('.collection-category-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.collection-category-tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
    });
});

// 资产皮肤Tab切换
document.querySelectorAll('.asset-skin-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.asset-skin-tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
    });
});

// 资产筛选Tab切换
document.querySelectorAll('.asset-filter-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.asset-filter-tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
    });
});

/* ============================================
   物价模块逻辑 (复刻网页端)
   ============================================ */
let currentMarketCategoryMobile = 'all';
let currentMarketRankMobile = 'rise';
let selectedMarketItemIndexMobile = 0;

function initMarketPriceMobile() {
    updateMarketListMobile();
    drawMarketMiniChartMobile();
    
    // 分类下拉菜单
    const categorySelect = document.getElementById('market-category-mobile');
    if (categorySelect) {
        categorySelect.addEventListener('change', function() {
            currentMarketCategoryMobile = this.value;
            selectedMarketItemIndexMobile = 0;
            updateMarketListMobile();
            drawMarketMiniChartMobile();
        });
    }
    
    // 涨跌榜Tab
    document.querySelectorAll('.market-rank-tab-mobile').forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.market-rank-tab-mobile').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            currentMarketRankMobile = this.dataset.rank;
            selectedMarketItemIndexMobile = 0;
            updateMarketListMobile();
            drawMarketMiniChartMobile();
        });
    });
    
    // 搜索框
    const searchInput = document.querySelector('.market-search-input-mobile');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const keyword = this.value.trim().toLowerCase();
            filterMarketListMobile(keyword);
        });
    }
}

function updateMarketListMobile() {
    const container = document.getElementById('market-list-mobile');
    if (!container || typeof marketPriceData === 'undefined') return;
    
    const key = `${currentMarketCategoryMobile}_${currentMarketRankMobile}`;
    const items = marketPriceData[key] || [];
    
    container.innerHTML = items.map((item, index) => `
        <div class="market-item-mobile" data-index="${index}">
            <span class="market-item-rarity-mobile" style="background-color: ${rarityColors[item.rarity] || '#9ca3af'}"></span>
            <span class="market-item-name-mobile">${item.name}</span>
            <span class="market-item-price-mobile">${item.price.toLocaleString()}</span>
            <span class="market-item-change-mobile ${item.positive ? 'positive' : 'negative'}">
                ${item.positive ? '+' : ''}${item.change}%${item.positive ? '↑' : '↓'}
            </span>
        </div>
    `).join('');
    
    // 绑定点击事件
    container.querySelectorAll('.market-item-mobile').forEach(itemEl => {
        itemEl.addEventListener('click', function() {
            selectedMarketItemIndexMobile = parseInt(this.dataset.index);
            drawMarketMiniChartMobile();
        });
    });
}

function filterMarketListMobile(keyword) {
    const container = document.getElementById('market-list-mobile');
    if (!container || typeof marketPriceData === 'undefined') return;
    
    if (!keyword) {
        updateMarketListMobile();
        return;
    }
    
    // 搜索逻辑
    let allItems = [];
    Object.keys(marketPriceData).forEach(key => {
        marketPriceData[key].forEach(item => {
            if (item.name.toLowerCase().includes(keyword)) {
                allItems.push(item);
            }
        });
    });
    
    // 去重并限制数量
    const uniqueItems = allItems.filter((item, index, self) => 
        index === self.findIndex(t => t.name === item.name)
    ).slice(0, 5);
    
    container.innerHTML = uniqueItems.map((item, index) => `
        <div class="market-item-mobile" data-index="${index}">
            <span class="market-item-rarity-mobile" style="background-color: ${rarityColors[item.rarity] || '#9ca3af'}"></span>
            <span class="market-item-name-mobile">${item.name}</span>
            <span class="market-item-price-mobile">${item.price.toLocaleString()}</span>
            <span class="market-item-change-mobile ${item.positive ? 'positive' : 'negative'}">
                ${item.positive ? '+' : ''}${item.change}%${item.positive ? '↑' : '↓'}
            </span>
        </div>
    `).join('');
    
    selectedMarketItemIndexMobile = 0;
    drawMarketMiniChartMobile();
    
    // 绑定事件
    container.querySelectorAll('.market-item-mobile').forEach(itemEl => {
        itemEl.addEventListener('click', function() {
            selectedMarketItemIndexMobile = parseInt(this.dataset.index);
            drawMarketMiniChartMobile();
        });
    });
}

function drawMarketMiniChartMobile() {
    const canvas = document.getElementById('market-price-chart-mobile');
    if (!canvas || typeof marketPriceData === 'undefined') return;
    
    const ctx = canvas.getContext('2d');
    const rect = canvas.parentElement.getBoundingClientRect();
    
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);
    
    const width = rect.width;
    const height = rect.height;
    const padding = { top: 15, right: 10, bottom: 20, left: 35 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;
    
    // 获取选中物品
    const key = `${currentMarketCategoryMobile}_${currentMarketRankMobile}`;
    const items = marketPriceData[key] || [];
    const item = items[selectedMarketItemIndexMobile];
    
    if (!item) return;
    
    // 模拟数据生成 (复刻逻辑)
    const isPositive = item.positive;
    const times = ['1日', '2日', '3日', '4日', '5日', '6日', '7日'];
    const basePrice = item.price / 1000; // 转换为K单位
    let data = [];
    let currentVal = basePrice * 0.85;
    
    for(let i = 0; i < 7; i++) {
        if(isPositive) {
            currentVal += (basePrice * 0.03) * (Math.random() + 0.5);
        } else {
            currentVal -= (basePrice * 0.02) * (Math.random() + 0.3);
        }
        data.push({ time: times[i], value: Math.max(1, currentVal) });
    }
    
    const values = data.map(d => d.value);
    const dataMin = Math.min(...values);
    const dataMax = Math.max(...values);
    const range = dataMax - dataMin || 1;
    const minValue = dataMin - range * 0.15;
    const maxValue = dataMax + range * 0.15;
    const valueRange = maxValue - minValue;
    
    ctx.clearRect(0, 0, width * 2, height * 2);
    
    // 绘制网格线和Y轴标签
    ctx.strokeStyle = '#2a3a4a';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= 4; i++) {
        const val = minValue + (valueRange / 4) * i;
        const y = padding.top + chartHeight - ((val - minValue) / valueRange) * chartHeight;
        ctx.beginPath();
        ctx.moveTo(padding.left, y);
        ctx.lineTo(width - padding.right, y);
        ctx.stroke();
        
        // Y轴数值标签
        ctx.fillStyle = '#8a9bb0';
        ctx.font = '9px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(val.toFixed(1) + 'K', padding.left - 4, y + 3);
    }
    
    // 绘制填充区域
    ctx.beginPath();
    data.forEach((point, index) => {
        const x = padding.left + (index / (data.length - 1)) * chartWidth;
        const y = padding.top + chartHeight - ((point.value - minValue) / valueRange) * chartHeight;
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.lineTo(padding.left + chartWidth, padding.top + chartHeight);
    ctx.lineTo(padding.left, padding.top + chartHeight);
    ctx.closePath();
    ctx.fillStyle = isPositive ? 'rgba(0, 212, 170, 0.15)' : 'rgba(239, 68, 68, 0.15)';
    ctx.fill();
    
    // 绘制曲线
    ctx.beginPath();
    data.forEach((point, index) => {
        const x = padding.left + (index / (data.length - 1)) * chartWidth;
        const y = padding.top + chartHeight - ((point.value - minValue) / valueRange) * chartHeight;
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.strokeStyle = isPositive ? '#00d4aa' : '#ef4444';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // 绘制数据点
    data.forEach((point, index) => {
        const x = padding.left + (index / (data.length - 1)) * chartWidth;
        const y = padding.top + chartHeight - ((point.value - minValue) / valueRange) * chartHeight;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = isPositive ? '#00d4aa' : '#ef4444';
        ctx.fill();
    });
    
    // X轴时间标签
    ctx.fillStyle = '#8a9bb0';
    ctx.font = '8px sans-serif';
    ctx.textAlign = 'center';
    [0, 3, 6].forEach(index => {
        const x = padding.left + (index / (data.length - 1)) * chartWidth;
        ctx.fillText(data[index].time, x, height - 5);
    });
}

// 初始化
initMarketPriceMobile();
