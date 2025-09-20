import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PortfolioItem } from '../data/portfolio';
import { formatDate, getItemLink, SHARED_STYLES } from '../utils/helpers';

interface GridImageItemProps {
  item: PortfolioItem;
  viewMode: 'grid' | 'detailed';
}

export const GridImageItem: React.FC<GridImageItemProps> = ({ item, viewMode }) => {
  const itemLink = getItemLink(item, item.href);

  if (viewMode === 'grid') {
    return (
      <Link 
        href={itemLink}
        prefetch={true}
        className={SHARED_STYLES.gridItemLink}
      >
          <div className="w-full h-full relative grid grid-cols-2 gap-1 overflow-hidden rounded-[8px]">
            {item.images.slice(0, 4).map((image, index) => (
              <div key={index} className="relative aspect-square overflow-hidden group">
                <Image
                  alt={item.title}
                  src={image}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  sizes="(max-width: 768px) 25vw, (max-width: 1024px) 12.5vw, 10vw"
                  priority={false}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </Link>
    );
  }

  // 详细视图
  return (
    <div className="flex flex-col md:flex-row gap-6 items-start">
      <div className="flex-1 max-w-2xl">
        <div className="grid grid-cols-2 gap-2 rounded-[8px] overflow-hidden">
          {item.images.slice(0, 4).map((image, index) => (
            <div key={index} className="aspect-square relative overflow-hidden group">
              <Image
                alt={item.title}
                src={image}
                fill
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 35vw"
                priority={index === 0}
              />
            </div>
          ))}
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

export default GridImageItem;
