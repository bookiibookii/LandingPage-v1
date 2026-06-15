import Nav from '../components/layout/Nav'
import Footer from '../components/layout/Footer'
import Hero from '../components/home/Hero'
import Persona from '../components/home/Persona'
import Solution from '../components/home/Solution'
import Demo from '../components/home/Demo'
import Download from '../components/home/Download'
import Faq from '../components/home/Faq'

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Persona />
      <Solution />
      <Demo />
      <Faq />
      <Download />
      <Footer />
    </>
  )
}
