import React from 'react'
import './footer.css';

const Footer = () => {
    return (
        <footer>
            <a href="#footer" className="footer__logo">peytonagher</a>
            <ul className="permalinks">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#experience">Experience</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
            <div className="footer__copyright">
                <small>&copy; 2024 peytonagher. all rights reserved.</small>
            </div>
        </footer>
    )
}

export default Footer