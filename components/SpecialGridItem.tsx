import React from 'react';
import Image from 'next/image';
import { PortfolioItem } from '../data/portfolio';

interface SpecialGridItemProps {
  item: PortfolioItem;
  viewMode: 'grid' | 'detailed';
}

export const SpecialGridItem: React.FC<SpecialGridItemProps> = ({ item, viewMode }) => {
  const linkProps = item.href ? { href: item.href } : {};
  const Component = item.href ? 'a' : 'div';

  if (viewMode === 'grid') {
    return (
      <div className="w-full flex flex-col lg:flex-row lg:items-end gap-2 lg:gap-4 cursor-pointer">
        <Component 
          className="cursor-pointer text-xs rounded-[8px] h-full overflow-hidden relative group transition-all w-full ease-in-out aspect-square" 
          {...linkProps}
        >
          <div className="w-full h-full relative grid grid-cols-2 gap-1 overflow-hidden rounded-[8px]">
            {/* 前两张图片 */}
            {item.images.slice(0, 2).map((image, index) => (
              <div key={index} className="relative aspect-square overflow-hidden group">
                <Image
                  alt={item.title}
                  src={image}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  sizes="(max-width: 768px) 25vw, (max-width: 1024px) 12.5vw, 10vw"
                />
              </div>
            ))}
            {/* 第三张图片跨两列 */}
            {item.images[2] && (
              <div className="relative col-span-2 aspect-[2/1] overflow-hidden group">
                <Image
                  alt={item.title}
                  src={item.images[2]}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 20vw"
                />
              </div>
            )}
          </div>
        </Component>
      </div>
    );
  }

  // 详细视图
  return (
    <div className="flex flex-col md:flex-row gap-6 items-start">
      <div className="flex-1 max-w-2xl">
        <div className="w-full h-full relative grid grid-cols-2 gap-1 rounded-[8px] overflow-hidden">
          {item.images.slice(0, 2).map((image, index) => (
            <div key={index} className="relative aspect-square overflow-hidden group">
              <Image
                alt={item.title}
                src={image}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 35vw"
              />
            </div>
          ))}
          {item.images[2] && (
            <div className="relative col-span-2 aspect-[2/1] overflow-hidden group">
              <Image
                alt={item.title}
                src={item.images[2]}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 70vw"
              />
            </div>
          )}
        </div>
      </div>
      <div className="flex-shrink-0 md:w-80 space-y-4">
        <h3 className="text-charcoal text-sm font-medium">
          {item.title}
        </h3>
        <div className="space-y-2 text-xs text-gray-dark">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-gray-dark rounded-full"></span>
            <span>Photos</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-gray-dark rounded-full"></span>
            <span>{formatDate(item.date)}</span>
          </div>
          {item.location && (
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-gray-dark rounded-full"></span>
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

export default SpecialGridItem;
