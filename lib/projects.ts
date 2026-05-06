import { supabase } from "./supabase";
import type { Project } from "../types/project";
import type { Database } from "./database.types";

type ProjectRow = Database["public"]["Tables"]["projects"]["Row"];

export async function getFeaturedProjects(): Promise<Project[]> {
    const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("featured", true)
        .order("order_index", { ascending: true });

    if (error || !data) {
        console.error("Error fetching projects:", error);
        return [];
    }

    return data.map((project: ProjectRow) => ({
        id: project.id,
        slug: project.slug,
        title: project.title,
        description: project.description,
        detailedDescription: project.detailed_description || undefined,
        technologies: project.technologies,
        featured: project.featured,
        accentColor: project.accent_color || undefined,
        url: project.url || undefined,
        githubUrl: project.github_url || undefined,
        agency: project.agency_name
            ? {
                name: project.agency_name,
                url: project.agency_url || "",
            }
            : undefined,
        coverImage: project.cover_image,
        images: project.images,
        orderIndex: project.order_index,
    }));
}

export async function getAllProjects(): Promise<Project[]> {
    const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("order_index", { ascending: true });

    if (error || !data) {
        console.error("Error fetching projects:", error);
        return [];
    }

    return data.map((project: ProjectRow) => ({
        id: project.id,
        slug: project.slug,
        title: project.title,
        description: project.description,
        detailedDescription: project.detailed_description || undefined,
        technologies: project.technologies,
        featured: project.featured,
        accentColor: project.accent_color || undefined,
        url: project.url || undefined,
        githubUrl: project.github_url || undefined,
        agency: project.agency_name
            ? {
                name: project.agency_name,
                url: project.agency_url || "",
            }
            : undefined,
        coverImage: project.cover_image,
        images: project.images,
        orderIndex: project.order_index,
    }));
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
    const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("slug", slug)
        .single();

    if (error || !data) {
        const code = (error as any)?.code as string | undefined;
        if (code === "PGRST116") {
            return null;
        }
        console.error("Error fetching project:", { slug, error });
        throw new Error(`Failed to fetch project '${slug}'`);
    }

    const project: ProjectRow = data;

    return {
        id: project.id,
        slug: project.slug,
        title: project.title,
        description: project.description,
        detailedDescription: project.detailed_description || undefined,
        technologies: project.technologies,
        featured: project.featured,
        accentColor: project.accent_color || undefined,
        url: project.url || undefined,
        githubUrl: project.github_url || undefined,
        agency: project.agency_name
            ? {
                name: project.agency_name,
                url: project.agency_url || "",
            }
            : undefined,
        coverImage: project.cover_image,
        images: project.images,
        orderIndex: project.order_index,
    };
}
