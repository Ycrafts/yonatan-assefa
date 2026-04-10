import { getFeaturedProjects } from "../../lib/projects";
import { HomeProjects } from "./HomeProjects";

export async function HomeProjectsWrapper() {
  const projects = await getFeaturedProjects();
  return <HomeProjects projects={projects} />;
}
