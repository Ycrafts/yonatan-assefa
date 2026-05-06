import { supabase } from "./supabase";
import type { Database } from "./database.types";
import type { Blog } from "../types/blog";

type BlogRow = Database["public"]["Tables"]["blogs"]["Row"];

function mapBlogRow(row: BlogRow): Blog {
    return {
        id: row.id,
        title: row.title,
        slug: row.slug,
        excerpt: row.excerpt,
        body: row.body,
        publishedDate: row.published_date,
        readTime: row.read_time,
        isFeatured: row.is_featured ?? false,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    };
}

export async function getFeaturedBlogs(): Promise<Blog[]> {
    const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("is_featured", true)
        .order("published_date", { ascending: false })
        .limit(3);

    if (error) {
        console.error("Error fetching featured blogs:", error);
        return [];
    }

    return data.map(mapBlogRow);
}

export async function getAllBlogs(): Promise<Blog[]> {
    const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .order("published_date", { ascending: false });

    if (error) {
        console.error("Error fetching all blogs:", error);
        return [];
    }

    return data.map(mapBlogRow);
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
    const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("slug", slug)
        .single();

    if (error || !data) {
        const code = (error as any)?.code as string | undefined;
        if (code === "PGRST116") {
            return null;
        }
        console.error("Error fetching blog by slug:", { slug, error });
        throw new Error(`Failed to fetch blog '${slug}'`);
    }

    return mapBlogRow(data);
}
