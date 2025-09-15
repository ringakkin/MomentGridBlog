import React from 'react';
import { PortfolioItem } from '../data/portfolio';
import { PortfolioItemComponent } from './PortfolioItem';

interface PortfolioGridProps {
  items: PortfolioItem[];
  viewMode: 'grid' | 'detailed';
  isTransitioning?: boolean;
  containerRef?: React.RefObject<HTMLDivElement>;
}

export const PortfolioGrid: React.FC<PortfolioGridProps> = React.memo(({ 
  items, 
  viewMode, 
  isTransitioning = false,
  containerRef
}) => {
  return (
    <div 
      ref={containerRef}
      className={`
        ${viewMode === 'grid' 
          ? 'gap-2 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5' 
          : 'flex flex-col gap-8'
        }
        ${isTransitioning ? 'pointer-events-none' : ''}
      `}
      style={{
        // 在动画期间防止内容溢出，但不裁切元素
        position: 'relative',
        // 防止动画过程中的transform导致额外滚动条
        ...(isTransitioning && {
          overflow: 'visible', // 允许元素临时超出边界，但不产生滚动条
          contain: 'layout style paint' // 限制影响范围，提升性能
        })
      }}
    >
      {items.map((item) => (
        <div 
          key={item.id}
          data-flip-id={item.id}
          className={`
            w-full cursor-pointer
            ${viewMode === 'grid' 
              ? 'flex flex-col lg:flex-row lg:items-end gap-2 lg:gap-4' 
              : ''
            }
          `}
        >
          <PortfolioItemComponent 
            item={item} 
            viewMode={viewMode}
          />
        </div>
      ))}
    </div>
  );
});

export default PortfolioGrid;
