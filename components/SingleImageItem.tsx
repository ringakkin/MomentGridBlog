import React from 'react';
import Image from 'next/image';
import { PortfolioItem } from '../data/portfolio';

interface SingleImageItemProps {
  item: PortfolioItem;
  viewMode: 'grid' | 'detailed';
}

export const SingleImageItem: React.FC<SingleImageItemProps> = ({ item, viewMode }) => {
  const linkProps = item.href ? { href: item.href } : {};
  const Component = item.href ? 'a' : 'div';

  if (viewMode === 'grid') {
    return (
      <div className="w-full flex flex-col lg:flex-row lg:items-end gap-2 lg:gap-4 cursor-pointer">
        <Component 
          className="cursor-pointer text-xs rounded-[8px] h-full overflow-hidden relative group transition-all w-full ease-in-out aspect-square" 
          {...linkProps}
        >
          <div className="w-full h-full relative overflow-hidden rounded-[8px]">
            <Image
              alt={item.title}
              src={item.images[0]}
              fill
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 20vw"
            />
          </div>
        </Component>
      </div>
    );
  }

  // 详细视图
  return (
    <div className="flex flex-col md:flex-row gap-6 items-start">
      <div className="flex-1 max-w-2xl">
        <div className="aspect-[4/3] relative rounded-[8px] overflow-hidden group">
          <Image
            alt={item.title}
            src={item.images[0]}
            fill
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 70vw"
          />
        </div>
      </div>
      <div className="flex-shrink-0 md:w-80 space-y-4">
        <h3 className="text-charcoal text-sm font-medium">
          {item.title}
        </h3>
        <div className="space-y-2 text-xs text-gray-dark">
          <div className="flex items-center gap-2 transition-all duration-300 hover:translate-x-1">
            <span className="w-2 h-2 bg-gray-dark rounded-full transition-all duration-300"></span>
            <span>Photos</span>
          </div>
          <div className="flex items-center gap-2 transition-all duration-300 hover:translate-x-1">
            <span className="w-2 h-2 bg-gray-dark rounded-full transition-all duration-300"></span>
            <span>{formatDate(item.date)}</span>
          </div>
          {item.location && (
            <div className="flex items-center gap-2 transition-all duration-300 hover:translate-x-1">
              <span className="w-2 h-2 bg-gray-dark rounded-full transition-all duration-300"></span>
              <span>{item.location}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// 格式化日期的辅助函数
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

export default SingleImageItem;
