import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import HowItWorks from './components/HowItWorks'
import Features from './components/Features'
import Pricing from './components/Pricing'
import CTA from './components/CTA'
import Footer from './components/Footer'
import Auth from './pages/Auth'
import Onboarding from './pages/Onboarding'
import Dashboard from './pages/Dashboard'
import BookingPage from './pages/BookingPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div className="bg-[#0F0F0F] min-h-screen">
            <Navbar />
            <Hero />
            <Marquee />
            <HowItWorks />
            <Features />
            <Pricing />
            <CTA />
            <Footer />
          </div>
        } />
        <Route path="/auth" element={<Auth />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/book/:slug" element={<BookingPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App