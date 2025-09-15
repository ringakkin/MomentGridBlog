import React from 'react';
import { PortfolioItem } from '../data/portfolio';
import SingleImageItem from './SingleImageItem';
import GridImageItem from './GridImageItem';
import PostCardItem from './PostCardItem';
import SpecialGridItem from './SpecialGridItem';
import ProjectCardItem from './ProjectCardItem';

interface PortfolioItemProps {
  item: PortfolioItem;
  viewMode: 'grid' | 'detailed';
}

export const PortfolioItemComponent: React.FC<PortfolioItemProps> = React.memo(({ 
  item, 
  viewMode
}) => {
  const { gridLayout } = item;

  // 根据布局类型选择对应的组件
  switch (gridLayout.type) {
    case 'single':
      return <SingleImageItem item={item} viewMode={viewMode} />;
    
    case 'grid-2x2':
      return <GridImageItem item={item} viewMode={viewMode} />;
    
    case 'grid-special':
      return <SpecialGridItem item={item} viewMode={viewMode} />;
    
    case 'card':
      return <PostCardItem item={item} viewMode={viewMode} />;
    
    case 'project-card':
      return <ProjectCardItem item={item} viewMode={viewMode} />;
    
    default:
      return <SingleImageItem item={item} viewMode={viewMode} />;
  }
});

export default PortfolioItemComponent;
