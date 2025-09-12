import React, { useRef, useLayoutEffect } from 'react';

interface FlipAnimationProps {
  children: React.ReactNode;
  flipKey: string; // 用于标识需要动画的元素
  className?: string;
  isAnimating: boolean;
  onAnimationComplete?: () => void;
}

export const FlipAnimation: React.FC<FlipAnimationProps> = ({
  children,
  flipKey,
  className = '',
  isAnimating,
  onAnimationComplete
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const previousRect = useRef<DOMRect | null>(null);

  useLayoutEffect(() => {
    const element = elementRef.current;
    if (!element || !isAnimating) return;

    // FLIP 的 First 步骤 - 记录初始位置（在state变化前）
    if (previousRect.current) {
      const first = previousRect.current;
      
      // FLIP 的 Last 步骤 - 获取最终位置（state变化后）
      const last = element.getBoundingClientRect();
      
      // FLIP 的 Invert 步骤 - 计算差值
      const deltaX = first.left - last.left;
      const deltaY = first.top - last.top;
      const deltaW = first.width / last.width;
      const deltaH = first.height / last.height;

      // 如果位置没有变化，跳过动画
      if (Math.abs(deltaX) < 1 && Math.abs(deltaY) < 1 && Math.abs(deltaW - 1) < 0.01 && Math.abs(deltaH - 1) < 0.01) {
        onAnimationComplete?.();
        return;
      }

      // 立即应用初始变换（将元素"伪装"回原位置）
      element.style.transformOrigin = 'top left';
      element.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${deltaW}, ${deltaH})`;
      element.style.transition = 'none';

      // FLIP 的 Play 步骤 - 播放动画
      requestAnimationFrame(() => {
        element.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        element.style.transform = 'translate(0, 0) scale(1, 1)';

        // 动画完成后清理
        const cleanup = () => {
          element.style.transition = '';
          element.style.transform = '';
          element.style.transformOrigin = '';
          onAnimationComplete?.();
        };

        setTimeout(cleanup, 600);
      });
    }

    // 重置previous rect
    previousRect.current = null;
  }, [isAnimating, onAnimationComplete]);

  // 在每次render前记录当前位置
  useLayoutEffect(() => {
    const element = elementRef.current;
    if (element && !isAnimating) {
      previousRect.current = element.getBoundingClientRect();
    }
  });

  return (
    <div 
      ref={elementRef}
      className={className}
      data-flip-key={flipKey}
    >
      {children}
    </div>
  );
};

export default FlipAnimation;
