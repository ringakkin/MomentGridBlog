# MomentGridBlog ✨

> **"Capture life in beautiful grids"**  
> *用网格捕捉每个珍贵瞬间*

一个专为摄影师和生活记录者设计的现代化博客框架。

## 🎯 项目特色

- 📸 **摄影作品集**: 优雅展示照片和拍摄参数
- 📝 **生活记录**: 记录知识和生活的每个瞬间  
- 🎨 **网格布局**: 美观的响应式网格展示
- ⚡ **FLIP 动画**: 流畅的视图切换动画
- ⚙️ **配置驱动**: 通过 JSON/Markdown 配置自动生成
- 🚀 **现代技术**: Next.js + TypeScript + Tailwind CSS

## 🌟 核心理念

将生活的每个瞬间，以网格的形式优雅地记录和展示。  
无论是摄影作品、旅行记录，还是知识分享，都能在这里找到完美的呈现方式。

## 🚀 核心技术栈

### **前端框架**
- **[Next.js 15.5.2](https://nextjs.org/)** - React 全栈框架 (SSR/SSG)
- **[React 19.1.1](https://react.dev/)** - 用户界面库
- **[TypeScript 4.9.5](https://www.typescriptlang.org/)** - 类型安全开发

### **UI 框架 & 样式**
- **[Tailwind CSS 3.2.7](https://tailwindcss.com/)** - 原子化 CSS 框架
- **CSS Modules** - 作用域样式

### **内容管理**
- **[Gray Matter 4.0.3](https://github.com/jonschlinkert/gray-matter)** - Markdown 元数据解析
- **[React Markdown 8.0.5](https://github.com/remarkjs/react-markdown)** - Markdown 渲染

### **工具链**
- **[PostCSS 8.4.21](https://postcss.org/)** + **[Autoprefixer 10.4.13](https://github.com/postcss/autoprefixer)** - CSS 处理
- **[ESLint 8.35.0](https://eslint.org/)** - 代码质量检查
- **[Day.js 1.11.7](https://day.js.org/)** - 轻量级日期库

## 🎯 核心功能

### **1. FLIP 动画系统**
```typescript
// 自定义 Hook 实现 FLIP 动画
export const useFlipAnimation = (
  isAnimating: boolean,
  onComplete?: () => void,
  duration: number = 600
) => {
  // First - Last - Invert - Play 动画逻辑
}
```
- 平滑的视图切换动画
- 元素位置记录和插值
- 可配置的动画时长

### **2. 响应式网格布局**
支持多种布局类型：
- `single` - 单张图片展示
- `grid-2x2` - 2x2 图片网格
- `grid-special` - 特殊布局 (2+1)
- `card` - 文字卡片
- `project-card` - 项目卡片

### **3. 智能图片处理**
- 自动图片优化和压缩
- 响应式图片加载
- 懒加载支持
- 悬停缩放效果

### **4. 内容筛选系统**
支持按类型筛选：
- 全部内容 (Everything)
- 摄影作品 (Photos)
- 博客文章 (Posts)
- 项目展示 (Projects)

### **5. 键盘快捷键**
- `G` - 切换视图模式
- `1-4` - 快速筛选内容

## 📁 项目结构

```
├── components/           # React 组件
│   ├── PortfolioGrid.tsx # 主网格组件
│   ├── GridImageItem.tsx # 图片网格项
│   ├── SingleImageItem.tsx # 单图片项
│   ├── SpecialGridItem.tsx # 特殊布局项
│   ├── PostCardItem.tsx  # 文章卡片
│   ├── ProjectCardItem.tsx # 项目卡片
│   └── Sidebar.tsx       # 侧边栏
├── data/                 # 数据定义
│   └── portfolio.ts      # 作品数据与类型定义
├── hooks/                # 自定义 Hooks
│   └── useFlipAnimation.ts # FLIP 动画 Hook
├── pages/                # Next.js 页面
│   ├── _app.tsx
│   ├── index.tsx
│   └── project/[slug].tsx
├── public/images/        # 静态图片资源
└── styles/               # 样式文件
```

## 🎨 设计特色

### **视觉设计**
- **极简主义**: 清爽的白色背景 + 精选灰色调色板
- **微交互**: 悬停效果、过渡动画、状态反馈
- **响应式**: 移动端优先的设计原则

### **用户体验**
- **流畅动画**: 60fps 的 FLIP 动画效果
- **快速加载**: Next.js 图片优化 + 懒加载
- **键盘支持**: 完整的键盘导航功能

## 🔧 开发使用

### **安装依赖**
```bash
npm install
# 或
pnpm install
```

### **开发命令**
```bash
npm run dev    # 启动开发服务器
npm run build  # 生产构建
npm run start  # 启动生产服务器
npm run lint   # 代码质量检查
```

### **数据配置**
在 `data/portfolio.ts` 中配置你的内容：

```typescript
export interface PortfolioItem {
  id: string;
  type: 'photo' | 'post' | 'project';
  title: string;
  description?: string;
  date: string;
  location?: string;
  href?: string;
  images: string[];
  gridLayout: {
    type: 'single' | 'grid-2x2' | 'grid-special' | 'card' | 'project-card';
    backgroundColor?: string;
    cardContent?: {
      category: string;
      excerpt: string;
    };
  };
}
```

## 🚀 部署方案

### **推荐平台**
- **[Vercel](https://vercel.com/)** - Next.js 官方推荐，一键部署
- **[Netlify](https://www.netlify.com/)** - 静态站点部署
- **[GitHub Pages](https://pages.github.com/)** - 免费静态托管

### **部署步骤**
1. 推送代码到 GitHub
2. 在 Vercel 中导入项目
3. 自动部署完成

## 🎯 未来计划

### **功能扩展**
- [ ] 暗色主题支持
- [ ] 多语言国际化
- [ ] CMS 集成 (Notion/Contentful)
- [ ] 评论系统
- [ ] 全文搜索
- [ ] RSS 订阅
- [ ] PWA 支持

### **技术升级**
- [ ] React Server Components
- [ ] 增量静态再生 (ISR)
- [ ] 边缘计算部署

## 📄 许可证

MIT License - 详见 [LICENSE](./LICENSE) 文件

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

**MomentGridBlog** - *让每个瞬间都值得被精心记录* ✨
