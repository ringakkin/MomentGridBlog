import { useRef, useLayoutEffect } from 'react';

export const useFlipAnimation = (
  isAnimating: boolean,
  onComplete?: () => void,
  duration: number = 800
) => {
  const flipStatesRef = useRef<Map<string, DOMRect>>(new Map());
  const containerRef = useRef<HTMLDivElement>(null);

  // 记录所有元素的初始位置 (First)
  const captureFirst = () => {
    if (!containerRef.current) return;
    
    const elements = containerRef.current.querySelectorAll('[data-flip-id]');
    flipStatesRef.current.clear();
    
    elements.forEach((element) => {
      const id = element.getAttribute('data-flip-id');
      if (id) {
        const rect = element.getBoundingClientRect();
        flipStatesRef.current.set(id, rect);
      }
    });
  };

  // 执行FLIP动画
  useLayoutEffect(() => {
    if (!isAnimating || !containerRef.current) return;

    // 保存原始样式状态
    const originalOverflowX = document.body.style.overflowX;
    
    // 只防止水平滚动条，保持竖向滚动正常工作
    document.body.style.overflowX = 'hidden';
    
    const elements = containerRef.current.querySelectorAll('[data-flip-id]');
    
    if (elements.length === 0) {
      onComplete?.();
      return;
    }

    const animations: (() => void)[] = [];

    elements.forEach((element) => {
      const htmlElement = element as HTMLElement;
      const id = htmlElement.getAttribute('data-flip-id');
      if (!id) return;

      const first = flipStatesRef.current.get(id);
      if (!first) return;

      // Last - 获取最终位置
      const last = htmlElement.getBoundingClientRect();

      // Invert - 计算变换
      const deltaX = first.left - last.left;
      const deltaY = first.top - last.top;
      const deltaW = first.width / last.width;
      const deltaH = first.height / last.height;

      // 检查是否需要动画
      const hasPositionChange = Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10;
      const hasSizeChange = Math.abs(deltaW - 1) > 0.1 || Math.abs(deltaH - 1) > 0.1;
      const needsAnimation = hasPositionChange || hasSizeChange;

      if (!needsAnimation) return;

      // 限制过大的缩放比例，避免视觉上的突兀
      const maxScale = 3;
      const minScale = 0.3;
      const clampedScaleX = Math.max(minScale, Math.min(maxScale, deltaW));
      const clampedScaleY = Math.max(minScale, Math.min(maxScale, deltaH));

      // 立即应用初始变换 - 使用3D transform强制GPU加速
      htmlElement.style.transformOrigin = 'top left';
      htmlElement.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0) scale3d(${clampedScaleX}, ${clampedScaleY}, 1)`;
      htmlElement.style.transition = 'none';
      htmlElement.style.willChange = 'transform';
      htmlElement.style.zIndex = '10';
      htmlElement.style.backfaceVisibility = 'hidden';

      // 准备播放动画
      animations.push(() => {
        htmlElement.style.transition = `transform ${duration}ms cubic-bezier(0.25, 0.1, 0.25, 1)`;
        htmlElement.style.transform = 'translate3d(0, 0, 0) scale3d(1, 1, 1)';
      });
    });

    // Play - 播放所有动画
    if (animations.length > 0) {
      // 使用双重requestAnimationFrame确保初始变换完全应用
      requestAnimationFrame(() => {
        // 强制重排，确保初始transform生效
        elements.forEach(el => el.getBoundingClientRect());
        
        requestAnimationFrame(() => {
          animations.forEach(animate => animate());

          // 动画完成后清理
          setTimeout(() => {
            cleanupAndComplete();
          }, duration + 50);
        });
      });
    } else {
      onComplete?.();
    }

    // 清理和完成函数
    function cleanupAndComplete() {
      elements.forEach((element) => {
        const htmlElement = element as HTMLElement;
        htmlElement.style.transition = '';
        htmlElement.style.transform = '';
        htmlElement.style.transformOrigin = '';
        htmlElement.style.willChange = '';
        htmlElement.style.zIndex = '';
        htmlElement.style.backfaceVisibility = '';
      });
      
      // 恢复水平滚动设置
      document.body.style.overflowX = originalOverflowX;
      
      onComplete?.();
    }
  }, [isAnimating, duration, onComplete]);

  return {
    containerRef,
    captureFirst
  };
};

export default useFlipAnimation;
