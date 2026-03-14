import Nav from "@/components/Nav";
import Main from "@/components/Main";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-black">
      <Nav />
      <Main />
      <About />
      <Skills />
      <Projects />
      <Footer />
    </main>
  );
}
