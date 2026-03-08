
import Skills from "@/components/portfolio/Skills";
import About from "@/components/portfolio/About";
import Hero from "@/components/portfolio/Hero";
import Projects from "@/components/portfolio/Projects";
import Experience from "@/components/portfolio/Experience";
import Footer from "@/components/portfolio/Footer";
import Contact from "@/components/portfolio/Contact";
import Navbar from "@/components/portfolio/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen text-foreground">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
