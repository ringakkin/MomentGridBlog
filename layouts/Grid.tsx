import React from "react";
import ProjectCard from "../components/ProjectCard";
import type { Project } from "../layouts/Project";

const Grid = ({ projects }: { projects: Project[] }) => (
  <div className="flex flex-col gap-6 relative flex-grow flex-1">
    {/* 导航按钮 - 模仿 Noah Buscher 网站 */}
    <div className="flex flex-row items-end md:items-center justify-center mb-2 gap-4">
      <div className="flex flex-row gap-5 w-full flex-wrap">
        <button
          className="transition-all ease-in-out cursor-pointer text-gray-dark text-xs"
          style={{ color: 'rgb(35,35,35)' }}
        >
          Everything
        </button>
        <button
          className="transition-all ease-in-out cursor-pointer text-gray-dark text-xs"
          style={{ color: 'rgb(173,173,173)' }}
        >
          Posts
        </button>
        <button
          className="transition-all ease-in-out cursor-pointer text-gray-dark text-xs"
          style={{ color: 'rgb(173,173,173)' }}
        >
          Projects
        </button>
        <button
          className="transition-all ease-in-out cursor-pointer text-gray-dark text-xs"
          style={{ color: 'rgb(173,173,173)' }}
        >
          Photos
        </button>
      </div>
    </div>
    
    {/* 图片网格 - 使用 Noah Buscher 的布局 */}
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5">
      {projects.map(({ meta }) => (
        <ProjectCard
          key={meta.slug}
          title={meta.title}
          description={meta.description}
          slug={meta.slug}
          photo={meta.photo}
        />
      ))}
    </div>
  </div>
);

export default Grid;
