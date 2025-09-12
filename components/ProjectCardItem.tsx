import React from 'react';
import Image from 'next/image';
import { PortfolioItem } from '../data/portfolio';

interface ProjectCardItemProps {
  item: PortfolioItem;
  viewMode: 'grid' | 'detailed';
}

export const ProjectCardItem: React.FC<ProjectCardItemProps> = ({ item, viewMode }) => {
  // 在网格视图中显示项目卡片
  if (viewMode === 'grid') {
    return (
      <div className="w-full flex flex-col lg:flex-row lg:items-end gap-2 lg:gap-4 cursor-pointer">
        <a 
          className="cursor-pointer text-xs rounded-[8px] h-full overflow-hidden relative group transition-all w-full ease-in-out aspect-square" 
          href={item.href}
        >
          <div className="w-full h-full relative flex items-center bg-charcoal">
            <div className="absolute top-0 left-0 bottom-0 right-0 bg-white/5 z-10"></div>
            {item.images[0] && (
              <Image
                alt={item.title}
                src={item.images[0]}
                fill
                className="w-full h-full object-cover absolute top-0 left-0 bottom-0 right-0 blur-md scale-150"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 20vw"
              />
            )}
            <span className="absolute left-4 top-4 text-white leading-none">Project</span>
            {item.images[1] && (
              <Image
                alt={item.title}
                src={item.images[1]}
                width={0}
                height={0}
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 20vw"
                className="w-full h-auto object-contain mx-auto z-10 rounded-[8px] overflow-hidden transition-all mx-4 my-4 group-hover:scale-105"
                style={{ width: 'auto', height: 'auto' }}
              />
            )}
          </div>
        </a>
      </div>
    );
  }

  // 在详细视图中显示项目详情
  return (
    <div className="flex flex-col md:flex-row gap-6 items-start">
      <div className="flex-1 max-w-2xl">
        <div className="space-y-4">
          {/* 主要项目图片 */}
          {item.images[1] && (
            <div className="aspect-[4/3] relative rounded-[8px] overflow-hidden group">
              <Image
                alt={item.title}
                src={item.images[1]}
                fill
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 70vw"
                priority
              />
            </div>
          )}
          
          {/* 额外的项目截图 */}
          {item.images.slice(2).length > 0 && (
            <div className="grid grid-cols-2 gap-2">
              {item.images.slice(2).map((image, index) => (
                <div key={index} className="aspect-[4/3] relative rounded-[8px] overflow-hidden group">
                  <Image
                    alt={`${item.title} - Screenshot ${index + 1}`}
                    src={image}
                    fill
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 35vw"
                  />
                </div>
              ))}
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
            <span>Project</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-gray-dark rounded-full"></span>
            <span>{formatDate(item.date)}</span>
          </div>
          {item.description && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-600 leading-relaxed">{item.description}</p>
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

export default ProjectCardItem;
