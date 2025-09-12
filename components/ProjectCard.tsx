import React from "react";
import Image from "next/image";
import Link from "next/link";

const ProjectCard = ({
  title,
  description,
  slug,
  photo,
}: {
  title: string;
  description: string;
  slug: string;
  photo: string;
}) => (
  <div className="w-full flex flex-col gap-2 cursor-pointer">
    <Link href={`/project/${slug}`}>
      <div className="cursor-pointer text-xs rounded-[8px] h-full overflow-hidden relative group transition-all w-full ease-in-out aspect-square">
        <div className="w-full h-full relative">
          <Image
            src={photo}
            alt={title}
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-full object-cover group-hover:scale-105 transition-all"
            priority
          />
        </div>
      </div>
    </Link>
  </div>
);

export default ProjectCard;
