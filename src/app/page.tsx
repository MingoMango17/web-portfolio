import Nav from "@/components/Nav";
import Main from "@/components/Main";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-black">
      <Nav />
      <Main />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
