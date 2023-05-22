import React from 'react'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import NavBar from '../NavBar/NavBar'
import MainScreenPart from './MainScreenPart'

function MainPage() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <>
    <Header handleMenu={() => setIsMenuOpen(true)}/>
    <NavBar menuOpen={isMenuOpen} closeMenu={() => setIsMenuOpen(false)}/>
    <MainScreenPart />
    <Footer />
    </>
  )
}

export default MainPage