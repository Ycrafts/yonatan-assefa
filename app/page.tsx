import { AppContact } from "../components/AppContact";
import { HomeAbout } from "../components/home/HomeAbout";
import { HomeBlogs } from "../components/home/HomeBlogs";
import { HomeHero } from "../components/home/HomeHero";
import { HomeProjectsWrapper } from "../components/home/HomeProjectsWrapper";
import { HomeServices } from "../components/home/HomeServices";
import { HomeSkills } from "../components/home/HomeSkills";

export default function Home() {
  return (
    <div>
      <HomeHero />
      <HomeAbout />
      <HomeServices />
      <HomeSkills />
      <HomeProjectsWrapper />
      <HomeBlogs />
      <AppContact />
    </div>
  );
}
