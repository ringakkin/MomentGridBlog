import { useRef, useLayoutEffect } from 'react';

interface FlipState {
  element: HTMLElement;
  first: DOMRect;
  id: string;
}

export const useFlipAnimation = (
  isAnimating: boolean,
  onComplete?: () => void,
  duration: number = 800
) => {
  const flipStatesRef = useRef<Map<string, DOMRect>>(new Map());
  const containerRef = useRef<HTMLDivElement>(null);

  // 记录所有元素的初始位置 (First)
  const captureFirst = () => {
    if (!containerRef.current) {
      console.log('❌ No container ref available for captureFirst');
      return;
    }
    
    const elements = containerRef.current.querySelectorAll('[data-flip-id]');
    console.log(`📸 Capturing positions for ${elements.length} elements`);
    
    if (elements.length === 0) {
      console.log('❌ No elements with data-flip-id found in container');
      console.log('Container HTML:', containerRef.current.innerHTML.substring(0, 200) + '...');
    }
    
    flipStatesRef.current.clear();
    
    elements.forEach((element) => {
      const id = element.getAttribute('data-flip-id');
      if (id) {
        const rect = element.getBoundingClientRect();
        flipStatesRef.current.set(id, rect);
        console.log(`✅ Captured ${id}:`, { x: Math.round(rect.left), y: Math.round(rect.top), w: Math.round(rect.width), h: Math.round(rect.height) });
      } else {
        console.log('❌ Element without data-flip-id found:', element);
      }
    });
    
    console.log(`📦 Total captured states: ${flipStatesRef.current.size}`);
  };

  // 执行FLIP动画
  useLayoutEffect(() => {
    console.log('🔄 useLayoutEffect triggered:', { isAnimating, hasContainer: !!containerRef.current });
    
    if (!isAnimating || !containerRef.current) {
      console.log('❌ Not animating or no container:', { isAnimating, hasContainer: !!containerRef.current });
      return;
    }

    console.log('✅ === FLIP Animation Started ===');
    
    const elements = containerRef.current.querySelectorAll('[data-flip-id]');
    console.log(`Found ${elements.length} elements to animate`);
    
    if (elements.length === 0) {
      console.log('No elements found, calling onComplete');
      onComplete?.();
      return;
    }

    const animations: (() => void)[] = [];

    elements.forEach((element) => {
      const htmlElement = element as HTMLElement;
      const id = htmlElement.getAttribute('data-flip-id');
      if (!id) return;

      const first = flipStatesRef.current.get(id);
      if (!first) {
        console.log(`No first position recorded for ${id}`);
        return;
      }

      // Last - 获取最终位置
      const last = htmlElement.getBoundingClientRect();

      // Invert - 计算变换
      const deltaX = first.left - last.left;
      const deltaY = first.top - last.top;
      const deltaW = first.width / last.width;
      const deltaH = first.height / last.height;

      // 调试信息
      console.log(`Element ${id}:`, {
        first: { x: Math.round(first.left), y: Math.round(first.top), w: Math.round(first.width), h: Math.round(first.height) },
        last: { x: Math.round(last.left), y: Math.round(last.top), w: Math.round(last.width), h: Math.round(last.height) },
        delta: { x: Math.round(deltaX), y: Math.round(deltaY), scaleX: deltaW.toFixed(2), scaleY: deltaH.toFixed(2) }
      });

      // 对于视图模式切换，我们需要更宽松的条件
      // 即使位置相同，尺寸变化也应该触发动画
      const needsAnimation = true; // 强制所有元素都执行动画

      if (!needsAnimation) {
        console.log(`❌ Skipping animation for ${id} - no significant change`);
        return;
      }

      console.log(`✓ Will animate ${id} - significant change detected`);

      // 立即应用初始变换
      htmlElement.style.transformOrigin = 'top left';
      htmlElement.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${deltaW}, ${deltaH})`;
      htmlElement.style.transition = 'none';
      htmlElement.style.willChange = 'transform';
      htmlElement.style.zIndex = '10';

      // 准备播放动画
      animations.push(() => {
        console.log(`Animating ${id}...`);
        htmlElement.style.transition = `transform ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
        htmlElement.style.transform = 'translate(0, 0) scale(1, 1)';
      });
    });

    // Play - 播放所有动画
    if (animations.length > 0) {
      console.log(`Starting ${animations.length} animations with proper timing`);
      
      // 使用双重requestAnimationFrame确保初始变换完全应用
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          console.log('Executing animations...');
          animations.forEach(animate => animate());

          // 监听第一个元素的动画完成
          const firstElement = elements[0] as HTMLElement;
          const handleTransitionEnd = (e: TransitionEvent) => {
            if (e.target === firstElement && e.propertyName === 'transform') {
              console.log('Animation completed via transitionend');
              firstElement.removeEventListener('transitionend', handleTransitionEnd);
              cleanupAndComplete();
            }
          };

          firstElement.addEventListener('transitionend', handleTransitionEnd);

          // 备用完成机制
          setTimeout(() => {
            console.log('Animation completed via timeout backup');
            firstElement.removeEventListener('transitionend', handleTransitionEnd);
            cleanupAndComplete();
          }, duration + 100);
        });
      });
    } else {
      console.log('No animations needed');
      onComplete?.();
    }

    // 清理和完成函数
    function cleanupAndComplete() {
      console.log('Cleaning up animations');
      elements.forEach((element) => {
        const htmlElement = element as HTMLElement;
        htmlElement.style.transition = '';
        htmlElement.style.transform = '';
        htmlElement.style.transformOrigin = '';
        htmlElement.style.willChange = '';
        htmlElement.style.zIndex = '';
      });
      onComplete?.();
    }
  }, [isAnimating, duration, onComplete]);

  return {
    containerRef,
    captureFirst
  };
};

export default useFlipAnimation;
