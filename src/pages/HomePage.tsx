import Header from '../components/Header'
import Hero from '../components/Hero'
import About from '../components/About'
import Products from '../components/Products'
import Works from '../components/Works'
import Delivery from '../components/Delivery'
import Contact from '../components/Contact'

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Products />
        <Works />
        <Delivery />
        <Contact />
      </main>
    </>
  )
}
