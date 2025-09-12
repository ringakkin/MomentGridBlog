import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import useFlipAnimation from "../hooks/useFlipAnimation";

// 简化的测试数据
const testItems = [
  {
    id: 'test-1',
    title: 'Test Item 1',
    image: '/images/image003.webp'
  },
  {
    id: 'test-2', 
    title: 'Test Item 2',
    image: '/images/image004.webp'
  },
  {
    id: 'test-3',
    title: 'Test Item 3', 
    image: '/images/image005.webp'
  }
];

export default function FlipTest() {
  const [isGrid, setIsGrid] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const { containerRef, captureFirst } = useFlipAnimation(
    isTransitioning,
    () => {
      console.log('Animation completed');
      setIsTransitioning(false);
    },
    1000 // 更长的动画时间便于观察
  );

  const handleToggle = () => {
    if (isTransitioning) return;
    
    console.log('=== Toggle clicked ===');
    console.log('Current isGrid:', isGrid);
    
    // 记录当前位置
    captureFirst();
    
    // 延迟状态变化
    setTimeout(() => {
      console.log('Changing state...');
      setIsTransitioning(true);
      setIsGrid(prev => !prev);
    }, 10);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Sidebar />
      <main className="ml-0 md:ml-[340px] pl-8 pr-8 md:pl-0 relative flex-1 flex-grow-0 pb-8 md:pb-14">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold mb-8 mt-24">FLIP 动画测试</h1>
          
          <button 
            onClick={handleToggle}
            className="mb-8 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            disabled={isTransitioning}
          >
            切换布局 {isTransitioning ? '(动画中...)' : ''}
          </button>
          
          <div 
            ref={containerRef}
            className={`
              ${isGrid 
                ? 'grid grid-cols-3 gap-4' 
                : 'flex flex-col gap-8'
              }
            `}
          >
            {testItems.map((item) => (
              <div 
                key={item.id}
                data-flip-id={item.id}
                className={`
                  bg-white rounded-lg shadow-lg overflow-hidden
                  ${isGrid ? 'aspect-square' : 'aspect-[3/1] flex flex-row'}
                `}
              >
                <div className={`
                  ${isGrid ? 'h-full' : 'w-1/3'}
                  bg-gray-200 flex items-center justify-center
                `}>
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                {!isGrid && (
                  <div className="w-2/3 p-4 flex items-center">
                    <h3 className="text-lg font-medium">{item.title}</h3>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-4 bg-gray-100 rounded">
            <h3 className="font-bold mb-2">调试信息:</h3>
            <p>当前模式: {isGrid ? '网格' : '列表'}</p>
            <p>动画状态: {isTransitioning ? '进行中' : '空闲'}</p>
            <p>打开控制台查看详细日志</p>
          </div>
        </div>
      </main>
    </div>
  );
}
