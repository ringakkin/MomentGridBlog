export interface PortfolioItem {
  id: string;
  type: 'photo' | 'post' | 'project';
  title: string;
  description?: string;
  date: string;
  location?: string;
  href?: string;
  images: string[];
  // 网格视图的布局配置
  gridLayout: {
    type: 'single' | 'grid-2x2' | 'grid-special' | 'card' | 'project-card';
    backgroundColor?: string;
    cardContent?: {
      category: string;
      excerpt: string;
    };
  };
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: 'peru-riverboat',
    type: 'photo',
    title: 'Riverboat on a tributary of the Madre de Dios river.',
    date: '2024-06-19',
    location: 'Madre de Dios, Peru',
    href: '/photos/peru-riverboat',
    images: ['/images/image003.webp'],
    gridLayout: { type: 'single' }
  },
  {
    id: 'amazon-wildlife',
    type: 'photo',
    title: 'Wildlife of the Peruvian Amazon.',
    date: '2024-06-18',
    location: 'Amazon Rainforest, Peru',
    href: '/photos/amazonian-wildlife',
    images: [
      '/images/image004.webp',
      '/images/image005.webp',
      '/images/image006.webp',
      '/images/image007.webp'
    ],
    gridLayout: { type: 'grid-2x2' }
  },
  {
    id: 'oregon-coast',
    type: 'photo',
    title: 'Xanthe on the coast.',
    date: '2024-06-15',
    location: 'Oregon Coast',
    href: '/photos/xanthe-oregon-coast',
    images: ['/images/image008.webp'],
    gridLayout: { type: 'single' }
  },
  {
    id: 'denver-night',
    type: 'photo',
    title: 'Downtown Denver at night.',
    date: '2024-06-10',
    location: 'Denver, Colorado',
    href: '/photos/denver',
    images: ['/images/image009.webp'],
    gridLayout: { type: 'single' }
  },
  {
    id: 'glamis-dunes',
    type: 'photo',
    title: 'Sunset at the dunes.',
    date: '2024-03-15',
    location: 'Glamis, California',
    images: [
      '/images/image010.webp',
      '/images/image011.webp',
      '/images/image012.webp',
      '/images/image013.webp'
    ],
    gridLayout: { type: 'grid-2x2' }
  },
  {
    id: 'porsche-radio',
    type: 'post',
    title: 'Radio Install in a Porsche Boxster',
    description: 'Installing an aftermarket headunit in a Porsche 987.2 with the Sound Package Plus (SPP) option.',
    date: '2023-06-27',
    href: '/posts/987-headunit-install',
    images: [],
    gridLayout: {
      type: 'card',
      backgroundColor: '#F4EFE4',
      cardContent: {
        category: 'Post',
        excerpt: 'Installing an aftermarket headunit in a Porsche 987.2 with the Sound Package Plus (SPP) option.'
      }
    }
  },
  {
    id: 'ladder-trail',
    type: 'photo',
    title: 'Hike through Ladder Trail.',
    date: '2024-04-22',
    location: 'Mecca Hills, California',
    images: [
      '/images/image014.webp',
      '/images/image015.webp',
      '/images/image016.webp'
    ],
    gridLayout: { type: 'grid-special' }
  },
  {
    id: 'salton-sea',
    type: 'photo',
    title: 'A brief look a the Salton Sea.',
    date: '2024-03-10',
    location: 'Salton Sea, California',
    href: '/photos/salton-sea',
    images: [
      '/images/image017.webp',
      '/images/image018.webp',
      '/images/image019.webp',
      '/images/image020.webp'
    ],
    gridLayout: { type: 'grid-2x2' }
  },
  {
    id: 'zed-beta',
    type: 'post',
    title: 'Zed Public Beta',
    description: 'My first impressions with Zed\'s public beta - a native, minimal code editor focused on multiplayer.',
    date: '2023-03-19',
    href: '/posts/zed',
    images: [],
    gridLayout: {
      type: 'card',
      backgroundColor: '#F4EFE4',
      cardContent: {
        category: 'Post',
        excerpt: 'My first impressions with Zed\'s public beta - a native, minimal code editor focused on multiplayer.'
      }
    }
  },
  {
    id: 'impala',
    type: 'photo',
    title: 'Impala Super Sport I came across on a walk.',
    date: '2024-02-20',
    location: 'Denver, Colorado',
    href: '/photos/impala',
    images: ['/images/image021.webp'],
    gridLayout: { type: 'single' }
  },
  {
    id: 'markdown-portfolio',
    type: 'post',
    title: 'Create a Markdown Portfolio with Next.js',
    description: 'How to create a markdown-based portfolio site (or blog) for fun and profit with Next.js, Typescript, and Tailwind.',
    date: '2023-03-06',
    href: '/posts/create-markdown-portfolio-next-js',
    images: [],
    gridLayout: {
      type: 'card',
      backgroundColor: '#F4EFE4',
      cardContent: {
        category: 'Post',
        excerpt: 'How to create a markdown-based portfolio site (or blog) for fun and profit with Next.js, Typescript, and Tailwind.'
      }
    }
  },
  {
    id: 'lush-hike',
    type: 'photo',
    title: 'A rare green canyon after excessive precipitation.',
    date: '2024-01-15',
    location: 'Southern California',
    href: '/photos/lush-hike',
    images: ['/images/image022.webp'],
    gridLayout: { type: 'single' }
  },
  {
    id: 'soukie-modern',
    type: 'project',
    title: 'Soukie Modern',
    description: 'New e-commerce shop for a Palm Springs Moroccan rug retailer.',
    date: '2023-11-15',
    href: '/projects/soukie-modern',
    images: ['/images/image023.webp', '/images/image024.webp'],
    gridLayout: { type: 'project-card' }
  },
  {
    id: 'desert-walk',
    type: 'photo',
    title: 'A walk through desert this afternoon.',
    date: '2024-01-10',
    location: 'Desert, California',
    href: '/photos/desert-walk',
    images: ['/images/image025.webp'],
    gridLayout: { type: 'single' }
  },
  {
    id: 'racos',
    type: 'project',
    title: 'RAC OS',
    description: 'OS-inspired new website for music artist RAC.',
    date: '2023-09-20',
    href: '/projects/racos',
    images: ['/images/image026.webp', '/images/image027.webp'],
    gridLayout: { type: 'project-card' }
  },
  {
    id: 'slideover',
    type: 'project',
    title: 'Slideover',
    description: 'Embeddable image sliders for creatives.',
    date: '2023-07-10',
    href: '/projects/slideover',
    images: ['/images/image028.webp', '/images/image029.webp'],
    gridLayout: { type: 'project-card' }
  },
  {
    id: 'prism',
    type: 'project',
    title: 'Prism',
    description: 'VSCO for Spotify Playlists.',
    date: '2023-05-15',
    href: '/projects/prism',
    images: ['/images/image030.webp', '/images/image031.webp'],
    gridLayout: { type: 'project-card' }
  }
];
