// 常用教材清单（PDF 托管于 GitHub Releases tag: textbooks，文件名为 ASCII）
export interface TextbookItem {
  id: string;
  name: string;
  author: string;
  note: string;
  file: string; // GitHub Releases 资产文件名
}

export const TEXTBOOKS: TextbookItem[] = [
  {
    id: 'gaodai-6',
    name: '高等代数（第六版）',
    author: '王萼芬、石生明、王立中',
    note: '北京大学经典教材',
    file: 'gaodai-6.pdf',
  },
  {
    id: 'kongjian-jiexi',
    name: '空间解析几何讲义',
    author: '耿薇（南开大学数学科学学院）',
    note: '南开大学课程讲义',
    file: 'kongjian-jiexi.pdf',
  },
  {
    id: 'contest-1',
    name: '全国大学生数学竞赛解析教程（上册）',
    author: '数学专业类',
    note: '竞赛备考经典',
    file: 'contest-1.pdf',
  },
  {
    id: 'contest-2',
    name: '全国大学生数学竞赛解析教程（下册）',
    author: '数学专业类',
    note: '竞赛备考经典',
    file: 'contest-2.pdf',
  },
  {
    id: 'fenxi-2',
    name: '数学分析（中册）',
    author: '刘春根、朱少红、李军、丁龙云',
    note: '南开大学教材',
    file: 'fenxi-2.pdf',
  },
  {
    id: 'fenxi-1',
    name: '数学分析（上册）',
    author: '南开大学',
    note: '南开大学教材',
    file: 'fenxi-1.pdf',
  },
  {
    id: 'fenxi-ex',
    name: '数学分析习题课讲义（第2版 上册）',
    author: '谢惠民、恽自求、易法槐、钱定边',
    note: '习题精讲经典',
    file: 'fenxi-ex.pdf',
  },
];