import React, { useState, useEffect } from "react";
import Head from "next/head";
import Sidebar from "../components/Sidebar";
import { PortfolioGrid } from "../components/PortfolioGrid";
import { portfolioItems } from "../data/portfolio";
import useFlipAnimation from "../hooks/useFlipAnimation";

export default function Home() {
  const [viewMode, setViewMode] = useState<'grid' | 'detailed'>('grid');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'photo' | 'post' | 'project'>('all');

  // 筛选数据
  const filteredItems = portfolioItems.filter(item => {
    if (activeFilter === 'all') return true;
    return item.type === activeFilter;
  });

  // 暂时注释掉复杂的FLIP动画
  // const { containerRef, captureFirst } = useFlipAnimation(
  //   isTransitioning,
  //   () => {
  //     console.log('Portfolio animation completed');
  //     setIsTransitioning(false);
  //   },
  //   350
  // );
  
  // 使用简单的ref
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleFilterChange = (filter: 'all' | 'photo' | 'post' | 'project') => {
    if (isTransitioning || activeFilter === filter) {
      return;
    }
    
    console.log('=== Portfolio filter change ===');
    console.log('Changing filter to:', filter);
    
    // 立即设置过渡状态
    setIsTransitioning(true);
    
    // 延迟状态变化
    requestAnimationFrame(() => {
      setActiveFilter(filter);
      // 简单的延迟后重置状态
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    });
  };

  const handleViewModeChange = () => {
    if (isTransitioning) {
      console.log('Already transitioning, ignoring click');
      return;
    }
    
    console.log('=== Portfolio view mode change ===');
    console.log('Current view mode:', viewMode);
    
    // 防止重复点击
    setIsTransitioning(true);
    
    // 立即切换视图
    setViewMode(prev => {
      const newMode = prev === 'grid' ? 'detailed' : 'grid';
      console.log('📝 Switching portfolio to:', newMode);
      return newMode;
    });
    
    // 短暂延迟后允许下次点击
    setTimeout(() => {
      setIsTransitioning(false);
    }, 200);
  };

  // 键盘快捷键
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (isTransitioning) return;
      
      switch (e.key) {
        case 'g':
          handleViewModeChange();
          break;
        case '1':
          handleFilterChange('all');
          break;
        case '2':
          handleFilterChange('post');
          break;
        case '3':
          handleFilterChange('project');
          break;
        case '4':
          handleFilterChange('photo');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isTransitioning, activeFilter, viewMode]);

  return (
    <>
      <Head>
        <title>Lin Hsüeh-chin</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="min-h-screen flex flex-col">
        <Sidebar />
        <main className="ml-0 md:ml-[340px] pl-8 pr-8 md:pl-0 relative flex-1 flex-grow-0 pb-8 md:pb-14">
        <div className="flex flex-col">
          <h1 className="flex-1 flex-grow-0 p-0 m-0 text-charcoal text-sm leading-6 max-w-md mt-32 md:mt-24 mb-4">
            Hi, my name is Lin Hsüeh-chin. I am a software engineer and designer living in Nanchang. I
            work remotely and travel often, bringing my camera along with me. Sometimes I write.
            Here's what I'm up to <a className="underline" href="/now">now</a>.
          </h1>
          <small className="flex-1 flex-grow-0 p-0 m-0 text-gray-dark text-xs max-w-sm mb-12 md:mb-20">
            Updated <time dateTime="2024-06-18">June 19, 2024</time>
            <span className="block mt-1 text-[10px] text-gray-400">
              Press 'G' to toggle view, '1-4' for filters
            </span>
          </small>
          
          <div className="flex flex-col gap-6 relative flex-grow flex-1">
            <div className="flex flex-row items-end md:items-center justify-center mb-2 gap-4">
              <div className="flex flex-row gap-5 w-full flex-wrap">
                <button
                  className="transition-all ease-in-out cursor-pointer text-gray-dark text-xs"
                  aria-label="Everything"
                  onClick={() => handleFilterChange('all')}
                  style={{ color: activeFilter === 'all' ? 'rgb(35,35,35)' : 'rgb(173,173,173)' }}
                >
                  Everything ({portfolioItems.length})
                </button>
                <button
                  className="transition-all ease-in-out cursor-pointer text-gray-dark text-xs"
                  aria-label="Post"
                  onClick={() => handleFilterChange('post')}
                  style={{ color: activeFilter === 'post' ? 'rgb(35,35,35)' : 'rgb(173,173,173)' }}
                >
                  Posts ({portfolioItems.filter(item => item.type === 'post').length})
                </button>
                <button
                  className="transition-all ease-in-out cursor-pointer text-gray-dark text-xs"
                  aria-label="Project"
                  onClick={() => handleFilterChange('project')}
                  style={{ color: activeFilter === 'project' ? 'rgb(35,35,35)' : 'rgb(173,173,173)' }}
                >
                  Projects ({portfolioItems.filter(item => item.type === 'project').length})
                </button>
                <button
                  className="transition-all ease-in-out cursor-pointer text-gray-dark text-xs"
                  aria-label="Photo"
                  onClick={() => handleFilterChange('photo')}
                  style={{ color: activeFilter === 'photo' ? 'rgb(35,35,35)' : 'rgb(173,173,173)' }}
                >
                  Photos ({portfolioItems.filter(item => item.type === 'photo').length})
                </button>
              </div>
              <div>
                <button 
                  className="text-xs w-fit ml-auto flex-grow-0 hidden sm:block transition-all hover:scale-105" 
                  aria-label={`Switch to ${viewMode === 'grid' ? 'detailed' : 'grid'} view`}
                  onClick={handleViewModeChange}
                  disabled={isTransitioning}
                >
                  {viewMode === 'grid' ? (
                    // 网格视图图标 (当前是网格视图)
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#232323" style={{ opacity: isTransitioning ? 0.5 : 1 }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4.75 5.75C4.75 5.19772 5.19772 4.75 5.75 4.75H9.25C9.80228 4.75 10.25 5.19772 10.25 5.75V9.25C10.25 9.80228 9.80228 10.25 9.25 10.25H5.75C5.19772 10.25 4.75 9.80228 4.75 9.25V5.75Z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4.75 14.75C4.75 14.1977 5.19772 13.75 5.75 13.75H9.25C9.80228 13.75 10.25 14.1977 10.25 14.75V18.25C10.25 18.8023 9.80228 19.25 9.25 19.25H5.75C5.19772 19.25 4.75 18.8023 4.75 18.25V14.75Z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M13.75 5.75C13.75 5.19772 14.1977 4.75 14.75 4.75H18.25C18.8023 4.75 19.25 5.19772 19.25 5.75V9.25C19.25 9.80228 18.8023 10.25 18.25 10.25H14.75C14.1977 10.25 13.75 9.80228 13.75 9.25V5.75Z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M13.75 14.75C13.75 14.1977 14.1977 13.75 14.75 13.75H18.25C18.8023 13.75 19.25 14.1977 19.25 14.75V18.25C19.25 18.8023 18.8023 19.25 18.25 19.25H14.75C14.1977 19.25 13.75 18.8023 13.75 18.25V14.75Z"></path>
                    </svg>
                  ) : (
                    // 详细视图图标 (当前是详细视图)
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#232323" style={{ opacity: isTransitioning ? 0.5 : 1 }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M5.75 10.2502H18.25C18.8023 10.2502 19.25 9.80253 19.25 9.25025V5.75C19.25 5.19772 18.8023 4.75 18.25 4.75H5.75C5.19772 4.75 4.75 5.19772 4.75 5.75V9.25025C4.75 9.80253 5.19772 10.2502 5.75 10.2502Z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M5.75 19.2502H18.25C18.8023 19.2502 19.25 18.8025 19.25 18.2502V14.75C19.25 14.1977 18.8023 13.75 18.25 13.75H5.75C5.19772 13.75 4.75 14.1977 4.75 14.75V18.2502C4.75 18.8025 5.19772 19.2502 5.75 19.2502Z"></path>
                    </svg>
                  )}
                </button>
              </div>
            </div>
            
            {/* FLIP动画网格 */}
            <div className="relative">
              {filteredItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="text-gray-400 mb-4">
                    <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.034 0-3.952.62-5.5 1.681C6.5 16.681 6.5 16.681 6.5 16.681z" />
                    </svg>
                  </div>
                  <h3 className="text-charcoal text-sm font-medium mb-2">No items found</h3>
                  <p className="text-gray-500 text-xs">
                    {activeFilter === 'all' 
                      ? 'No portfolio items available.' 
                      : `No ${activeFilter}s found. Try a different filter.`
                    }
                  </p>
                </div>
              ) : (
                <PortfolioGrid 
                  items={filteredItems}
                  viewMode={viewMode}
                  isTransitioning={isTransitioning}
                  containerRef={containerRef}
                />
              )}
            </div>
            
          </div>
        </div>
      </main>
      </div>
    </>
  );
}
