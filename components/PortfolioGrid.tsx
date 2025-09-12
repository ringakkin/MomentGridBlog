import React from 'react';
import { PortfolioItem } from '../data/portfolio';
import { PortfolioItemComponent } from './PortfolioItem';

interface PortfolioGridProps {
  items: PortfolioItem[];
  viewMode: 'grid' | 'detailed';
  isTransitioning?: boolean;
  containerRef?: React.RefObject<HTMLDivElement>;
}

export const PortfolioGrid: React.FC<PortfolioGridProps> = ({ 
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
          style={{ opacity: 1, width: 'auto' }}
        >
          <PortfolioItemComponent 
            item={item} 
            viewMode={viewMode}
          />
        </div>
      ))}
    </div>
  );
};

export default PortfolioGrid;
