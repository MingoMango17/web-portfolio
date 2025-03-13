import About from "@/components/About";
import Main from "@/components/Main";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";

export default function Home() {
  return (
    <div>
      <div className="flex flex-col">
        <Main/>
        <About/>
        <Skills/>
        <Projects/>
      </div>
    </div>
  );
}
