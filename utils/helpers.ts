/**
 * 共享工具函数和样式常量
 */

/**
 * 共享样式常量
 */
export const SHARED_STYLES = {
  // 网格项链接的基础样式
  gridItemLink: "cursor-pointer text-xs rounded-[8px] h-full overflow-hidden relative group transition-all w-full ease-in-out aspect-square",
  // 详细视图的基础布局
  detailViewContainer: "flex flex-col md:flex-row gap-6 items-start",
  detailViewContent: "flex-1 max-w-2xl",
  detailViewSidebar: "flex-shrink-0 md:w-80 space-y-4",
} as const;

/**
 * 格式化日期字符串
 * @param dateString ISO 格式的日期字符串
 * @returns 格式化后的日期字符串
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

/**
 * 根据项目类型生成动态链接
 * @param item 包含 type 和 id 的项目对象
 * @param href 可选的自定义链接
 * @returns 生成的链接字符串
 */
export const getItemLink = (item: { type: string; id: string }, href?: string): string => {
  if (item.type === 'photo') {
    return `/photos/${item.id}`;
  }
  return href || '#';
};