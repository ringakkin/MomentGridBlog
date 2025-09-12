import React from "react";
import Image from "next/image";

export default function Sidebar() {
  return (
    <div className="w-[340px] min-h-screen flex flex-col justify-between p-8 bg-white fixed left-0 top-0 hidden md:flex z-20">
      <div className="flex flex-col gap-8">
        {/* 头像和基本信息 */}
        <div className="flex flex-row gap-4 items-center">
          <div className="relative w-12 h-12">
            <div className="w-full h-full relative rounded-full overflow-hidden">
              <Image
                alt="Lin Hsüeh-ch'in"
                src="/images/head.webp"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
          <div>
            <h3 className="p-0 m-0 text-charcoal text-xs font-medium">Lin Hsüeh-chin</h3>
            <p className="p-0 m-0 text-charcoal text-xs">B. 1999 in Jiangxi. Based in Nanchang.</p>
          </div>
        </div>
        
        <h3 className="p-0 m-0 text-charcoal text-xs">Sr. Software Engineer, Gakkin</h3>
        
        {/* 导航链接 */}
        <div className="grid grid-cols-2 md:grid-cols-1 gap-1">
          <div className="flex flex-col gap-1">
            <a className="p-0 m-0 text-xs text-charcoal w-fit block hover:underline" href="/about">
              → About me
            </a>
            <a className="p-0 m-0 text-xs text-charcoal w-fit block hover:underline" href="/now">
              → Now
            </a>
            <a className="p-0 m-0 text-xs text-charcoal w-fit block hover:underline" href="mailto:me@noahbuscher.com">
              → Contact
            </a>
            <a className="p-0 m-0 text-xs text-charcoal w-fit block hover:underline" href="/feed.xml">
              → RSS
            </a>
          </div>
          <div className="flex flex-col gap-1">
            <a className="p-0 m-0 text-xs text-charcoal w-fit block hover:underline" target="_blank" rel="me" href="https://instagram.com/noahbuscher">
              ↗ Instagram
            </a>
            <a className="p-0 m-0 text-xs text-charcoal w-fit block hover:underline" target="_blank" rel="me" href="https://github.com/noahbuscher">
              ↗ GitHub
            </a>
            <a className="p-0 m-0 text-xs text-charcoal w-fit block hover:underline" target="_blank" rel="me" href="https://read.cv/noahbuscher">
              ↗ Read.cv
            </a>
          </div>
        </div>
      </div>
      
      {/* 底部 */}
      <div className="flex flex-row gap-2 items-center text-xs">
        <div className="flex-1">© 2025</div>
        <Image
          alt="Two interlocking circles"
          src="/images/image002.svg"
          width={24}
          height={16}
          className="flex-1 flex-grow-0"
        />
      </div>
    </div>
  );
}
