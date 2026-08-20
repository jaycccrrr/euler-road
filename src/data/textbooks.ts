// 常用教材清单（文件在 D:\学习\欧拉之路\教材，上传至 Supabase Storage 公共桶 textbooks）
export interface TextbookItem {
  id: string;
  name: string;
  author: string;
  note: string;
  file: string; // Supabase Storage 对象名（与教材目录文件名一致）
}

export const TEXTBOOKS: TextbookItem[] = [
  {
    id: 'gaodai-6',
    name: '高等代数（第六版）',
    author: '王萼芬、石生明、王立中',
    note: '北京大学经典教材',
    file: '1_北大 高等代数 第六版 (王萼芬 石生明 王立中) (Z-Library).pdf(1).pdf',
  },
  {
    id: 'kongjian-jiexi',
    name: '空间解析几何讲义',
    author: '耿薇（南开大学数学科学学院）',
    note: '南开大学课程讲义',
    file: '空间解析几何讲义(南开大学数学科学学院) (耿薇) (Z-Library)(1).pdf',
  },
  {
    id: 'math-contest-1',
    name: '全国大学生数学竞赛解析教程（上册）',
    author: '数学专业类',
    note: '竞赛备考经典',
    file: '全国大学生数学竞赛解析教程(数学专业类)(上册)——数_ (z-library.sk, 1lib.sk, z-lib.sk).pdf',
  },
  {
    id: 'math-contest-2',
    name: '全国大学生数学竞赛解析教程（下册）',
    author: '数学专业类',
    note: '竞赛备考经典',
    file: '全国大学生数学竞赛解析教程(数学专业类)(下册)——高_ (z-library.sk, 1lib.sk, z-lib.sk)(1).pdf',
  },
  {
    id: 'math-analysis-2',
    name: '数学分析（中册）',
    author: '刘春根、朱少红、李军、丁龙云',
    note: '南开大学教材',
    file: '数学分析 中册 (刘春根，朱少红，李军，丁龙云 主编) (Z-Library)(1)(1).pdf',
  },
  {
    id: 'math-analysis-1',
    name: '数学分析（上册）',
    author: '南开大学',
    note: '南开大学教材',
    file: '数学分析（1上册） 南开大学(1).pdf',
  },
  {
    id: 'math-analysis-ex',
    name: '数学分析习题课讲义（第2版 上册）',
    author: '谢惠民、恽自求、易法槐、钱定边',
    note: '习题精讲经典',
    file: '数学分析习题课讲义 第2版 上册 谢惠民 恽自求 易法槐 钱定边(1).pdf',
  },
];