import React from 'react'
import './header.css'
import CTA from './CTA'
import PEYTON from '../../assets/peyton.jpg'
import Socials from './Socials'

const Header = () => {
    return (
        <header>
            <div className=".container header__container">
                <h5>Hello I'm</h5>
                <h1>Peyton Nagher</h1>
                <h5 className="text-light">MSU ECE Graduate</h5>
                <CTA />
                <Socials />

                <div className="peyton">
                    <img src={PEYTON} alt="peyton"/>
                </div>

                <a href="#contact" className='scroll__down'>scroll down</a>
            </div>
        </header>
    )
}

export default Header
