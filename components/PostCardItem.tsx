import React from 'react';
import { PortfolioItem } from '../data/portfolio';
import { formatDate } from '../utils/helpers';

interface PostCardItemProps {
  item: PortfolioItem;
  viewMode: 'grid' | 'detailed';
}

export const PostCardItem: React.FC<PostCardItemProps> = ({ item, viewMode }) => {
  const { gridLayout } = item;
  
  if (!gridLayout.cardContent) {
    return null;
  }

  // 在网格视图中显示卡片
  if (viewMode === 'grid') {
    return (
      <a 
        className="cursor-pointer text-xs rounded-[8px] h-full overflow-hidden relative group transition-all w-full ease-in-out aspect-square min-h-[170px] hover:brightness-95" 
        href={item.href}
        style={{ 
          backgroundColor: gridLayout.backgroundColor || '#F4EFE4',
        }}
      >
          <div className="p-4 relative flex flex-col gap-3 h-[100%] justify-end ease-in-out transition-all">
            <span className="absolute left-4 top-4 text-charcoal leading-none">
              {gridLayout.cardContent.category}
            </span>
            <div className="z-10 flex flex-col gap-2 md:gap-4">
              <h2 className="flex-1 flex-grow-0 text-charcoal text-[14px] md:text-md">
                {item.title}
              </h2>
              <p className="text-xs line-clamp-3">
                {gridLayout.cardContent.excerpt}
              </p>
              <p className="text-xs hidden xl:block">
                Posted <time dateTime={item.date}>{formatDate(item.date)}</time>
              </p>
            </div>
          </div>
        </a>
    );
  }

  // 在详细视图中显示为文本条目
  return (
    <div className="flex flex-col md:flex-row gap-6 items-start">
      <div className="flex-1 max-w-2xl">
        <div 
          className="aspect-[4/3] relative rounded-[8px] overflow-hidden flex items-center justify-center"
          style={{ 
            backgroundColor: gridLayout.backgroundColor || '#F4EFE4',
          }}
        >
          <div className="text-center p-8">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 text-xs bg-white/20 rounded-full text-charcoal">
                {gridLayout.cardContent.category}
              </span>
            </div>
            <h3 className="text-charcoal text-lg font-medium mb-4">{item.title}</h3>
            <p className="text-charcoal/80 text-sm leading-relaxed">{gridLayout.cardContent.excerpt}</p>
            <p className="text-charcoal/60 text-xs mt-4">
              Posted {formatDate(item.date)}
            </p>
          </div>
        </div>
      </div>
      <div className="flex-shrink-0 md:w-80 space-y-4">
        <h3 className="text-charcoal text-sm font-medium">
          {item.title}
        </h3>
        <div className="space-y-2 text-xs text-gray-dark">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-gray-dark rounded-full"></span>
            <span>{gridLayout.cardContent.category}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-gray-dark rounded-full"></span>
            <span>{formatDate(item.date)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCardItem;
