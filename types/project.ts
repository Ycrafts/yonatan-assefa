export interface Project {
    id: string;
    slug: string;
    title: string;
    description: string;
    detailedDescription?: string;
    technologies: string[];
    featured: boolean;
    accentColor?: string;
    url?: string;
    githubUrl?: string;
    agency?: {
        name: string;
        url: string;
    };
    coverImage: string;
    images: string[];
    orderIndex: number;
}
