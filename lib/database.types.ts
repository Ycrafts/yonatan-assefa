export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            projects: {
                Row: {
                    id: string
                    created_at: string
                    slug: string
                    title: string
                    description: string
                    detailed_description: string | null
                    technologies: string[]
                    featured: boolean
                    accent_color: string | null
                    url: string | null
                    github_url: string | null
                    agency_name: string | null
                    agency_url: string | null
                    cover_image: string
                    images: string[]
                    order_index: number
                }
                Insert: {
                    id?: string
                    created_at?: string
                    slug: string
                    title: string
                    description: string
                    detailed_description?: string | null
                    technologies: string[]
                    featured?: boolean
                    accent_color?: string | null
                    url?: string | null
                    github_url?: string | null
                    agency_name?: string | null
                    agency_url?: string | null
                    cover_image: string
                    images?: string[]
                    order_index?: number
                }
                Update: {
                    id?: string
                    created_at?: string
                    slug?: string
                    title?: string
                    description?: string
                    detailed_description?: string | null
                    technologies?: string[]
                    featured?: boolean
                    accent_color?: string | null
                    url?: string | null
                    github_url?: string | null
                    agency_name?: string | null
                    agency_url?: string | null
                    cover_image?: string
                    images?: string[]
                    order_index?: number
                }
            }
            blogs: {
                Row: {
                    id: string
                    title: string
                    slug: string
                    excerpt: string
                    body: string
                    published_date: string
                    read_time: string
                    is_featured: boolean
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    title: string
                    slug: string
                    excerpt: string
                    body: string
                    published_date: string
                    read_time: string
                    is_featured?: boolean
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    title?: string
                    slug?: string
                    excerpt?: string
                    body?: string
                    published_date?: string
                    read_time?: string
                    is_featured?: boolean
                    created_at?: string
                    updated_at?: string
                }
            }
        }
    }
}
