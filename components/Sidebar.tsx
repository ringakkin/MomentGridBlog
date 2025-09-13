import React from "react";
import Image from "next/image";

export default function Sidebar() {
  return (
    <div className="px-8 py-10 flex-col gap-6 text-xs w-[340px] fixed top-0 left-0 bottom-0 hidden md:flex md:min-h-[500px]">
      {/* Logo/Name link placeholder */}
      <a className="inline w-fit" href="/">
        <div className="relative w-12 h-12">
          <div className="w-full h-full relative rounded-full overflow-hidden">
            <Image
              alt="Lin Hsüeh-chin"
              src="/images/head.webp"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </a>
      
      {/* Personal info */}
      <div>
        <h3 className="p-0 m-0 text-charcoal text-xs">Lin Hsüeh-chin</h3>
        <p className="p-0 m-0 text-charcoal text-xs">B. 1999 in Jiangxi. Based in Nanchang.</p>
      </div>
      
      {/* Job title */}
      <h3 className="p-0 m-0 text-charcoal text-xs">Sr. Software Engineer, Gakkin</h3>
      
      {/* Navigation links in 2-column grid */}
      <div className="grid grid-cols-2 md:grid-cols-1">
        <div>
          <a className="p-0 m-0 text-xs text-charcoal w-fit block" href="/about">
            → About me
          </a>
          <a className="p-0 m-0 text-xs text-charcoal w-fit block" href="/now">
            → Now
          </a>
          <a className="p-0 m-0 text-xs text-charcoal w-fit block" href="mailto:me@ringakkin.com">
            → Contact
          </a>
          <a className="p-0 m-0 text-xs text-charcoal w-fit block" href="/feed.xml">
            → RSS
          </a>
        </div>
        <div>
          <a className="p-0 m-0 text-xs text-charcoal w-fit block" target="_blank" rel="me" href="https://instagram.com/ringakkin">
            ↗ Instagram
          </a>
          <a className="p-0 m-0 text-xs text-charcoal w-fit block" target="_blank" rel="me" href="https://github.com/ringakkin">
            ↗ GitHub
          </a>
          <a className="p-0 m-0 text-xs text-charcoal w-fit block" target="_blank" rel="me" href="https://read.cv/ringakkin">
            ↗ Read.cv
          </a>
        </div>
      </div>
      
      {/* Bottom section with copyright and logo */}
      <div className="absolute bottom-12 left-8 right-8 flex flex-col gap-8 text-xs">
        <div className="flex flex-row gap-2 items-center">
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
    </div>
  );
}
