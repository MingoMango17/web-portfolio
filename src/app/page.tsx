import Nav from "@/components/Nav";
import Main from "@/components/Main";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";
import {
  fallbackExperiences,
  fallbackProjects,
  fallbackSkills,
  fallbackTools,
} from "@/lib/fallback-data";

async function getData() {
  if (!supabase) {
    return {
      projects: fallbackProjects,
      experiences: fallbackExperiences,
      skills: fallbackSkills,
      tools: fallbackTools,
    };
  }

  try {
    const [projects, experiences, skills, tools] = await Promise.all([
      supabase.from("projects").select("*").order("order_index"),
      supabase.from("experiences").select("*").order("order_index"),
      supabase.from("skills").select("*").order("order_index"),
      supabase.from("tools").select("*").order("order_index"),
    ]);

    return {
      projects: projects.data?.length ? projects.data : fallbackProjects,
      experiences: experiences.data?.length ? experiences.data : fallbackExperiences,
      skills: skills.data?.length ? skills.data : fallbackSkills,
      tools: tools.data?.length ? tools.data : fallbackTools,
    };
  } catch (err) {
    console.error("[Supabase] Fetch error:", err);
    return {
      projects: fallbackProjects,
      experiences: fallbackExperiences,
      skills: fallbackSkills,
      tools: fallbackTools,
    };
  }
}

export default async function Home() {
  const { projects, experiences, skills, tools } = await getData();

  return (
    <main className="bg-black">
      <Nav />
      <Main />
      <About />
      <Experience experiences={experiences} />
      <Skills skills={skills} tools={tools} />
      <Projects projects={projects} />
      <Contact />
      <Footer />
    </main>
  );
}
