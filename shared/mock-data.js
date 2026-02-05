// ============================================
// 模拟数据文件
// ============================================

// 交易物价数据
const marketPriceData = {
    // 全部分类 - 涨幅榜
    all_rise: [
        { name: '动力电池组', price: 52000, change: 15.2, positive: true, rarity: 'red' },
        { name: '金块', price: 38500, change: 8.7, positive: true, rarity: 'red' },
        { name: 'PMAG D-60弹鼓', price: 12300, change: 5.2, positive: true, rarity: 'purple' },
        { name: '军用急救包', price: 8900, change: 4.8, positive: true, rarity: 'blue' },
        { name: '加密U盘', price: 45000, change: 3.9, positive: true, rarity: 'red' }
    ],
    // 全部分类 - 跌幅榜
    all_fall: [
        { name: '普通绷带', price: 850, change: -5.3, positive: false, rarity: 'white' },
        { name: '止痛药', price: 2100, change: -4.1, positive: false, rarity: 'green' },
        { name: 'AK-74M', price: 28000, change: -3.2, positive: false, rarity: 'purple' },
        { name: '3级防弹插板', price: 15600, change: -2.8, positive: false, rarity: 'blue' },
        { name: '红点瞄准镜', price: 3200, change: -1.9, positive: false, rarity: 'green' }
    ],
    // 枪械 - 涨幅榜
    guns_rise: [
        { name: 'SCAR-H', price: 85000, change: 6.8, positive: true, rarity: 'red' },
        { name: 'M4A1', price: 42000, change: 4.5, positive: true, rarity: 'purple' },
        { name: 'VSS', price: 38000, change: 3.2, positive: true, rarity: 'purple' },
        { name: 'MP5', price: 18000, change: 2.1, positive: true, rarity: 'blue' },
        { name: 'Glock 17', price: 5500, change: 1.5, positive: true, rarity: 'green' }
    ],
    // 枪械 - 跌幅榜
    guns_fall: [
        { name: 'AK-74M', price: 28000, change: -3.2, positive: false, rarity: 'purple' },
        { name: 'SKS', price: 22000, change: -2.5, positive: false, rarity: 'blue' },
        { name: 'PP-19', price: 12000, change: -1.8, positive: false, rarity: 'blue' },
        { name: 'P226', price: 4800, change: -1.2, positive: false, rarity: 'green' },
        { name: 'Mosin', price: 35000, change: -0.9, positive: false, rarity: 'purple' }
    ],
    // 装备 - 涨幅榜
    armor_rise: [
        { name: '6级防弹插板', price: 68000, change: 12.5, positive: true, rarity: 'red' },
        { name: 'Ops-Core头盔', price: 45000, change: 7.3, positive: true, rarity: 'purple' },
        { name: 'THORAX背心', price: 52000, change: 5.8, positive: true, rarity: 'purple' },
        { name: '战术背包', price: 18000, change: 3.2, positive: true, rarity: 'blue' },
        { name: '3级头盔', price: 12000, change: 2.1, positive: true, rarity: 'blue' }
    ],
    // 装备 - 跌幅榜
    armor_fall: [
        { name: '3级防弹插板', price: 15600, change: -2.8, positive: false, rarity: 'blue' },
        { name: '2级头盔', price: 5500, change: -2.1, positive: false, rarity: 'green' },
        { name: '轻型背包', price: 3200, change: -1.5, positive: false, rarity: 'green' },
        { name: '战术腰带', price: 8900, change: -1.2, positive: false, rarity: 'blue' },
        { name: '护目镜', price: 1800, change: -0.8, positive: false, rarity: 'white' }
    ],
    // 配件 - 涨幅榜
    parts_rise: [
        { name: 'PMAG D-60弹鼓', price: 12300, change: 5.2, positive: true, rarity: 'purple' },
        { name: '消音器', price: 8500, change: 4.1, positive: true, rarity: 'blue' },
        { name: '4倍镜', price: 15000, change: 3.8, positive: true, rarity: 'purple' },
        { name: '激光指示器', price: 6200, change: 2.9, positive: true, rarity: 'blue' },
        { name: '垂直握把', price: 3500, change: 1.8, positive: true, rarity: 'green' }
    ],
    // 配件 - 跌幅榜
    parts_fall: [
        { name: '红点瞄准镜', price: 3200, change: -1.9, positive: false, rarity: 'green' },
        { name: '枪托', price: 2800, change: -1.5, positive: false, rarity: 'green' },
        { name: '弹匣', price: 1500, change: -1.2, positive: false, rarity: 'white' },
        { name: '手电筒', price: 2200, change: -0.9, positive: false, rarity: 'green' },
        { name: '护木', price: 4500, change: -0.6, positive: false, rarity: 'blue' }
    ],
    // 收集品 - 涨幅榜
    collect_rise: [
        { name: '动力电池组', price: 52000, change: 15.2, positive: true, rarity: 'red' },
        { name: '金块', price: 38500, change: 8.7, positive: true, rarity: 'red' },
        { name: '加密U盘', price: 45000, change: 3.9, positive: true, rarity: 'red' },
        { name: '铱星电话', price: 42000, change: 3.5, positive: true, rarity: 'red' },
        { name: '稀有芯片', price: 28000, change: 2.8, positive: true, rarity: 'purple' }
    ],
    // 收集品 - 跌幅榜
    collect_fall: [
        { name: '螺丝刀', price: 1200, change: -3.5, positive: false, rarity: 'white' },
        { name: '电子元件', price: 2800, change: -2.2, positive: false, rarity: 'green' },
        { name: '工具箱', price: 5500, change: -1.8, positive: false, rarity: 'blue' },
        { name: '电路板', price: 3800, change: -1.4, positive: false, rarity: 'green' },
        { name: '润滑油', price: 950, change: -0.9, positive: false, rarity: 'white' }
    ],
    // 医疗 - 涨幅榜
    medical_rise: [
        { name: '军用急救包', price: 8900, change: 4.8, positive: true, rarity: 'blue' },
        { name: '肾上腺素', price: 12000, change: 3.5, positive: true, rarity: 'purple' },
        { name: '手术刀套装', price: 15000, change: 2.9, positive: true, rarity: 'purple' },
        { name: '高级止血带', price: 4500, change: 2.2, positive: true, rarity: 'blue' },
        { name: '生理盐水', price: 1800, change: 1.5, positive: true, rarity: 'green' }
    ],
    // 医疗 - 跌幅榜
    medical_fall: [
        { name: '普通绷带', price: 850, change: -5.3, positive: false, rarity: 'white' },
        { name: '止痛药', price: 2100, change: -4.1, positive: false, rarity: 'green' },
        { name: '碘酒', price: 650, change: -2.8, positive: false, rarity: 'white' },
        { name: '纱布', price: 450, change: -1.9, positive: false, rarity: 'white' },
        { name: '创可贴', price: 280, change: -1.2, positive: false, rarity: 'white' }
    ],
    // 弹药 - 涨幅榜
    ammo_rise: [
        { name: '7.62x51mm AP', price: 850, change: 6.2, positive: true, rarity: 'purple' },
        { name: '5.56x45mm M995', price: 620, change: 4.5, positive: true, rarity: 'blue' },
        { name: '9x19mm AP', price: 280, change: 3.1, positive: true, rarity: 'blue' },
        { name: '12号霰弹', price: 150, change: 2.2, positive: true, rarity: 'green' },
        { name: '5.45x39mm BP', price: 380, change: 1.8, positive: true, rarity: 'blue' }
    ],
    // 弹药 - 跌幅榜
    ammo_fall: [
        { name: '9x19mm FMJ', price: 85, change: -3.2, positive: false, rarity: 'white' },
        { name: '5.56x45mm FMJ', price: 120, change: -2.5, positive: false, rarity: 'white' },
        { name: '7.62x39mm PS', price: 95, change: -1.8, positive: false, rarity: 'white' },
        { name: '.45 ACP', price: 110, change: -1.2, positive: false, rarity: 'green' },
        { name: '12号鹿弹', price: 80, change: -0.8, positive: false, rarity: 'white' }
    ]
};

// 分类配置
const marketCategories = [
    { id: 'all', name: '全部分类' },
    { id: 'guns', name: '枪械' },
    { id: 'armor', name: '装备' },
    { id: 'parts', name: '配件' },
    { id: 'collect', name: '收集品' },
    { id: 'medical', name: '医疗' },
    { id: 'ammo', name: '弹药' }
];

// 稀有度颜色映射
const rarityColors = {
    red: '#ff4757',
    purple: '#a855f7',
    blue: '#3b82f6',
    green: '#22c55e',
    white: '#9ca3af'
};

// 获取市场数据的辅助函数
function getMarketData(category, type) {
    const key = `${category}_${type}`;
    return marketPriceData[key] || marketPriceData['all_rise'];
}
