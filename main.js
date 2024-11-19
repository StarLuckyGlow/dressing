// 天干地支对照表
const stems = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const branches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

// 五行对应关系
const elementMap = {
  '子': 'water', '亥': 'water',
  '寅': 'wood', '卯': 'wood',
  '巳': 'fire', '午': 'fire',
  '申': 'metal', '酉': 'metal',
  '辰': 'earth', '戌': 'earth', '丑': 'earth', '未': 'earth'
};

// 五行中文名称
const elementChineseMap = {
  'water': '水',
  'wood': '木',
  'fire': '火',
  'metal': '金',
  'earth': '土'
};

// 五行对应的颜色
const colorMap = {
  'water': ['黑色', '蓝色', '灰色'],
  'wood': ['绿色', '青色', '翠色', '浅绿色'],
  'fire': ['红色', '粉色', '橙色', '紫色'],
  'metal': ['白色', '银色', '杏色', '乳白色'],
  'earth': ['黄色', '咖色', '棕色', '卡其色']
};

// 五行次序映射
const elementOrder = {
  'wood': ['fire', 'wood', 'metal', 'water', 'earth'],
  'fire': ['earth', 'fire', 'water', 'wood', 'metal'],
  'earth': ['metal', 'earth', 'wood', 'fire', 'water'],
  'metal': ['water', 'metal', 'fire', 'earth', 'wood'],
  'water': ['wood', 'water', 'earth', 'metal', 'fire']
};

// 运势解释
const fortuneExplanations = {
  0: '这个颜色最适合今天穿着，能让你气场全开，轻松驾驭各种场合，贵人运势旺盛。',
  1: '这个颜色带来稳定平和的能量，有助于保持心情愉悦，提升个人魅力。',
  2: '这个颜色能带来中性能量，适合日常穿着，让你保持平稳运势。',
  3: '这个颜色今天穿着需要谨慎，建议作为点缀使用。',
  4: '这个颜色今天不太适合大面积使用，建议暂时避开。'
};

// 添加五行对应的文字颜色
const elementTextColors = {
  'water': 'text-blue-600',  // 水属性用蓝色
  'wood': 'text-green-600',  // 木属性用绿色
  'fire': 'text-red-600',    // 火属性用红色
  'metal': 'text-gray-600',  // 金属性用灰色
  'earth': 'text-yellow-600' // 土属性用黄色
};

// 添加五行对应的背景颜色（深色用于色块）
const elementBlockColors = {
  'water': '#4B89DC',  // 水属性用蓝色
  'wood': '#48C774',   // 木属性用绿色
  'fire': '#FF3860',   // 火属性用红色
  'metal': '#B5B5B5',  // 金属性用银灰色
  'earth': '#FFB848'   // 土属性用黄色
};

// 添加五行对应的淡色背景
const elementBgColors = {
  'water': '#EEF3FC',  // 淡蓝色背景
  'wood': '#EDFAF1',   // 淡绿色背景
  'fire': '#FFF0F3',   // 淡红色背景
  'metal': '#F5F5F5',  // 淡灰色背景
  'earth': '#FFF8EC'   // 淡黄色背景
};

// 计算年干支
function getYearGanZhi(year) {
  const offset = (year - 4) % 60;
  const stemIndex = offset % 10;
  const branchIndex = offset % 12;
  return `${stems[stemIndex]}${branches[branchIndex]}`;
}

// 计算月干支
function getMonthGanZhi(year, month) {
  // 获取年干的索引
  const yearStem = ((year - 4) % 60) % 10;
  
  // 月支顺序：寅卯辰巳午未申酉戌亥子丑
  const monthToBranch = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1];
  const branchIndex = monthToBranch[month - 1];
  
  // 计算月干
  let monthStemStart;
  if (yearStem === 0 || yearStem === 5) monthStemStart = 2;
  if (yearStem === 1 || yearStem === 6) monthStemStart = 4;
  if (yearStem === 2 || yearStem === 7) monthStemStart = 6;
  if (yearStem === 3 || yearStem === 8) monthStemStart = 8;
  if (yearStem === 4 || yearStem === 9) monthStemStart = 0;
  
  const stemIndex = (monthStemStart + month - 1) % 10;
  
  return `${stems[stemIndex]}${branches[branchIndex]}`;
}

// 计算日干支
function getDayGanZhi(date) {
  const baseDate = new Date(2024, 10, 14);
  const baseStemIndex = stems.indexOf('壬');
  const baseBranchIndex = branches.indexOf('午');
  
  const diffDays = Math.floor((date - baseDate) / (24 * 60 * 60 * 1000));
  
  const stemIndex = (baseStemIndex + diffDays) % 10;
  const branchIndex = (baseBranchIndex + diffDays) % 12;
  
  const finalStemIndex = stemIndex >= 0 ? stemIndex : (stemIndex + 10) % 10;
  const finalBranchIndex = branchIndex >= 0 ? branchIndex : (branchIndex + 12) % 12;
  
  return `${stems[finalStemIndex]}${branches[finalBranchIndex]}`;
}

// 获取完整干支历
function getFullGanZhi(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  
  return {
    year: getYearGanZhi(year),
    month: getMonthGanZhi(year, month),
    day: getDayGanZhi(date)
  };
}

// 获取五行属性
function getElement(branch) {
  return elementMap[branch];
}

// 生成颜色推荐HTML
function generateColorRecommendation(element) {
  const orderedElements = elementOrder[element];
  let html = '';
  
  orderedElements.forEach((elem, index) => {
    const colors = colorMap[elem];
    const explanation = fortuneExplanations[index];
    const blockColor = elementBlockColors[elem];
    const bgColor = elementBgColors[elem];
    
    html += `
      <div class="p-6 rounded-lg shadow-md transition-all duration-300" 
           style="background-color: ${bgColor}">
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-lg shadow-md" style="background-color: ${blockColor}"></div>
            <div class="text-2xl font-bold">${index + 1}</div>
          </div>
          <div>
            <h4 class="text-lg font-bold">${elementChineseMap[elem]}属性</h4>
            <div class="text-gray-600">${colors.join('、')}</div>
          </div>
        </div>
        <p class="mt-2 text-gray-700">${explanation}</p>
      </div>
    `;
  });
  
  return html;
}

document.addEventListener('DOMContentLoaded', () => {
  const dateInput = document.getElementById('dateInput');
  const calculateBtn = document.getElementById('calculateBtn');
  const result = document.getElementById('result');
  const resultText = document.getElementById('resultText');

  const today = new Date();
  dateInput.valueAsDate = today;

  calculateBtn.addEventListener('click', () => {
    if (!dateInput.value) {
      alert('请选择日期');
      return;
    }

    const selectedDate = new Date(dateInput.value);
    const ganZhi = getFullGanZhi(selectedDate);
    const dayBranch = ganZhi.day.slice(-1);
    const element = getElement(dayBranch);

    result.classList.remove('hidden');
    resultText.innerHTML = `
      <div class="space-y-4">
        <div class="mt-8">
          <h3 class="font-bold">今日穿搭建议（按优先级排序）：</h3>
          ${generateColorRecommendation(element)}
        </div>
      </div>
    `;
  });

  calculateBtn.click();
});