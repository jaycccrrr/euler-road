/** 数学家名言，按日期确定性地轮换（同一天不变） */
export const MATH_QUOTES: { text: string; author: string }[] = [
  { text: '读读欧拉，读读欧拉，他是我们大家的老师。', author: '拉普拉斯' },
  { text: '数学是科学的皇后。', author: '高斯' },
  { text: '自然界的书是用数学的语言写成的。', author: '伽利略' },
  { text: '数学的本质在于它的自由。', author: '康托尔' },
  { text: '问题是数学的心脏。', author: '哈尔莫斯' },
  { text: '数学是无穷的科学。', author: '外尔' },
  { text: '如果我看得更远，那是因为我站在巨人的肩膀上。', author: '牛顿' },
  { text: '数学是打开科学大门的钥匙。', author: '培根' },
  { text: '纯数学是魔术家真正的魔杖。', author: '诺瓦利斯' },
  { text: '上帝是一位算术家。', author: '雅可比' },
  { text: '数学家越是纯粹，就越接近真理。', author: '哈代' },
  { text: '宇宙之大，粒子之微，无处不用数学。', author: '华罗庚' },
  { text: '新的数学方法和概念，常常比解决数学问题本身更重要。', author: '华罗庚' },
  { text: '一个没有几分诗人才能的数学家，决不会成为一个完全的数学家。', author: '魏尔斯特拉斯' },
  { text: '数学是一种理性的精神，使人类的思维得以运用到最完善的程度。', author: '克莱因' },
  { text: '几何无王者之道。', author: '欧几里得' },
];

export function pickQuote(dateStr: string) {
  let h = 0;
  for (const ch of dateStr) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return MATH_QUOTES[h % MATH_QUOTES.length];
}
