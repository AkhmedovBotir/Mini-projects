import React from 'react'
import Navbar from '../components/Navbar/Navbars'
import Header from '../components/Home/Header'
import Works from '../components/Home/Works'
import About from '../components/Home/About'
import Footer from '../components/Footer/Footer'

export default function Home() {
  return (
    <div>
      <Navbar />
      <Header />
      <Works />
      <About />
      <Footer />
    </div>
  )
}
