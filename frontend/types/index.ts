export interface IProject {
  _id: string;
  title: string;
  slug: string;
  code: string;
  description: string;
  shortDescription: string;
  features: string[];
  technologies: string[];
  category: string;
  price: number;
  currency: string;
  images: {
    main: string;
    screenshots: string[];
  };
  zipFile: {
    publicId: string;
    size: number;
    url: string;
  };
  youtubeUrl?: string;
  status: 'draft' | 'published';
  views: number;
  sales: number;
  rating: {
    average: number;
    count: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface IOrder {
  _id: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  projectId: string | IProject;
  projectCode: string;
  projectTitle: string;
  amount: number;
  currency: string;
  paymentScreenshot: string;
  message?: string;
  status: 'pending' | 'approved' | 'rejected';
  rejectionNote?: string;
  downloadSent: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IDownload {
  _id: string;
  orderId: string | IOrder;
  projectId: string | IProject;
  customerId: string;
  signedUrl: string;
  expiresAt: string;
  downloadCount: number;
  maxDownloads: number;
  createdAt: string;
}

export interface IReview {
  _id: string;
  projectId: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  rating: number;
  comment: string;
  approved: boolean;
  createdAt: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pages: number;
}

export interface DashboardStats {
  totalRevenue: number;
  monthRevenue: number;
  revenueGrowth: string;
  totalOrders: number;
  pendingOrders: number;
  totalProjects: number;
  publishedProjects: number;
  totalDownloads: number;
}

export interface RevenueDataPoint {
  _id: { year: number; month: number };
  revenue: number;
  orders: number;
}

export type Category =
  | 'Portfolio'
  | '3D Websites'
  | 'SaaS Dashboard'
  | 'Landing Pages'
  | 'React'
  | 'Next.js'
  | 'Three.js'
  | 'Admin Panel';

export const CATEGORIES: Category[] = [
  'Portfolio',
  '3D Websites',
  'SaaS Dashboard',
  'Landing Pages',
  'React',
  'Next.js',
  'Three.js',
  'Admin Panel',
];

export const TECHNOLOGIES = [
  'React',
  'Next.js',
  'Three.js',
  'TypeScript',
  'GSAP',
  'Framer Motion',
  'Tailwind CSS',
  'MongoDB',
  'Node.js',
  'Express',
  'Lenis',
  'React Three Fiber',
];
