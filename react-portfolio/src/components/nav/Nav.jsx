import React from 'react'
import './nav.css'
import { IoHomeOutline } from "react-icons/io5"
import { SiAboutdotme } from "react-icons/si"
import { SlNotebook } from "react-icons/sl"
import { GrContactInfo } from "react-icons/gr"
import { useState } from 'react'

const Nav = () => {
    const [activeNav, setActiveNav] = useState("#home")
    return (
        <nav>
            <a href="#home" onClick={() => setActiveNav('#home')} className={activeNav === '#home' ? 'active' : ''}><IoHomeOutline/></a>
            <a href="#about" onClick={() => setActiveNav('#about')} className={activeNav === '#about' ? 'active' : ''}><SiAboutdotme/></a>
            <a href="#experience" onClick={() => setActiveNav('#experience')} className={activeNav === '#experience' ? 'active' : ''}><SlNotebook/></a>
            <a href="#contact" onClick={() => setActiveNav('#contact')} className={activeNav === '#contact' ? 'active' : ''}><GrContactInfo/></a>
        </nav>
    )
}

export default Nav
