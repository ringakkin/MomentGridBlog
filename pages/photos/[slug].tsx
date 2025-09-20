import React from "react";
import Head from "next/head";
import Image from "next/image";
import Sidebar from "../../components/Sidebar";
import OptimizedImage from "../../components/OptimizedImage";
import { portfolioItems, PortfolioItem } from "../../data/portfolio";
import { GetStaticProps, GetStaticPaths } from "next";
import { formatDate } from "../../utils/helpers";

interface PhotoDetailPageProps {
  photo: PortfolioItem;
}

export const getStaticPaths: GetStaticPaths = async () => {
  // 获取所有照片类型的项目
  const photoItems = portfolioItems.filter(item => item.type === 'photo');
  
  const paths = photoItems.map((item) => ({
    params: { slug: item.id },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const photo = portfolioItems.find(item => item.id === params?.slug);

  if (!photo) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      photo,
    },
  };
};

const PhotoDetailPage: React.FC<PhotoDetailPageProps> = ({ photo }) => {

  return (
    <>
      <Head>
        <title>{`${photo.title} | MomentGrid Blog`}</title>
        <meta name="description" content={photo.description || photo.title} />
        <meta property="og:title" content={`${photo.title} | MomentGrid Blog`} />
        <meta property="og:description" content={photo.description || photo.title} />
        <meta property="og:image" content={photo.images[0]} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${photo.title} | MomentGrid Blog`} />
        <meta name="twitter:description" content={photo.description || photo.title} />
        <meta name="twitter:image" content={photo.images[0]} />
      </Head>
      
      <div className="min-h-screen flex flex-col">
        <Sidebar />
        
        {/* 移动端顶部导航栏 */}
        <header className="fixed top-8 left-6 right-6 z-10 flex flex-row gap-2 flex-col md:hidden">
          <div className="w-full flex flex-col p-2 bg-white/70 backdrop-blur-md rounded-3xl border border-gray-light">
            {/* 这里可以添加移动端导航内容 */}
          </div>
        </header>

        <main className="ml-0 md:ml-[340px] pl-8 pr-8 md:pl-0 relative flex-1 flex-grow-0 pb-8 md:pb-14">
          <article className="max-w-screen-lg mx-auto relative min-h-screen">
            <div className="flex flex-col items-center justify-center gap-16 text-xs text-center max-w-screen-md min-h-screen mx-auto">
              
              {/* 根据图片数量选择不同的布局 */}
              {photo.images.length === 1 ? (
                // 单张图片布局
                <div className="relative w-full">
                  <OptimizedImage
                    alt={photo.title}
                    src={photo.images[0]}
                    width={3240}
                    height={2428}
                    className="w-full h-auto rounded-[8px] max-w-screen-lg"
                    priority={true}
                    loading="eager"
                    style={{ color: 'transparent' }}
                  />
                  
                  {/* 图片信息卡片 */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-gray-light/95 backdrop-blur-md px-4 py-1 rounded-full">
                    <div className="flex flex-row gap-6 justify-center">
                      <div>
                        <small className="text-gray-dark text-xs">Speed</small>
                        <span className="text-charcoal block">1/250s</span>
                      </div>
                      <div>
                        <small className="text-gray-dark text-xs">Aperture</small>
                        <span className="text-charcoal block">f/6.50</span>
                      </div>
                      <div>
                        <small className="text-gray-dark text-xs">ISO</small>
                        <span className="text-charcoal block">800</span>
                      </div>
                      <div>
                        <small className="text-gray-dark text-xs">Camera</small>
                        <span className="block text-charcoal whitespace-nowrap">X1D II 50C</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // 多张图片垂直堆叠布局
                <div className="relative w-full flex flex-col gap-16">
                  {photo.images.map((image, index) => (
                    <div key={index} className="relative w-full">
                      <OptimizedImage
                        alt={`${photo.title} - Image ${index + 1}`}
                        src={image}
                        width={3240}
                        height={2428}
                        className="w-full h-auto rounded-[8px] max-w-screen-lg mx-auto"
                        priority={index === 0}
                        loading={index === 0 ? "eager" : "lazy"}
                        style={{ color: 'transparent' }}
                      />
                      
                      {/* 每张图片的信息卡片 */}
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-gray-light/95 backdrop-blur-md px-4 py-1 rounded-full">
                        <div className="flex flex-row gap-6 justify-center">
                          <div>
                            <small className="text-gray-dark text-xs">Speed</small>
                            <span className="text-charcoal block">1/{index === 0 ? '500' : index === 1 ? '250' : '125'}s</span>
                          </div>
                          <div>
                            <small className="text-gray-dark text-xs">Aperture</small>
                            <span className="text-charcoal block">f/{index === 0 ? '3.5' : index === 1 ? '4.0' : '5.6'}</span>
                          </div>
                          <div>
                            <small className="text-gray-dark text-xs">ISO</small>
                            <span className="text-charcoal block">{index === 0 ? '50' : index === 1 ? '100' : '200'}</span>
                          </div>
                          <div>
                            <small className="text-gray-dark text-xs">Camera</small>
                            <span className="block text-charcoal whitespace-nowrap">LEICA Q2</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* 标题和描述 */}
              <div className="text-center space-y-4">
                <h1 className="text-charcoal text-lg font-medium">{photo.title}</h1>
                {photo.description && (
                  <p className="text-gray-dark text-sm max-w-md mx-auto leading-relaxed">
                    {photo.description}
                  </p>
                )}
              </div>
            </div>
          </article>
        </main>
      </div>
    </>
  );
};

export default PhotoDetailPage;