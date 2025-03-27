import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import BlogCards from './components/BlogCards'
import CTA from './components/CTA'
import Footer from './components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900">
      <Navbar />
      <Hero />
      <Features />
      <BlogCards />
      <CTA />
      <Footer />
    </main>
  )
}
