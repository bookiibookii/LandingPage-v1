import Nav from "../components/layout/Nav";
import Footer from "../components/layout/Footer";
import Hero from "../components/home/Hero";
import Why from "../components/home/Why";
import Persona from "../components/home/Persona";
import Features from "../components/home/Features";
import Solution from "../components/home/Solution";
import Demo from "../components/home/Demo";
import Download from "../components/home/Download";
import Faq from "../components/home/Faq";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Why />
      <Persona />
      <Features />
      <Solution />
      <Demo />
      <Faq />
      <Download />
      <Footer />
    </>
  );
}
