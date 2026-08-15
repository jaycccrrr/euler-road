/// <reference types="next" />

// 静态资源 ?url 导入声明（pdfjs worker 等）
declare module '*?url' {
  const src: string;
  export default src;
}
