import React from 'react';
import './about.css';
import ME from '../../assets/peyton.jpg'

const About = () => {
    return (
        <section id='about'>
            <h2>About Me</h2>
            <div className="container about__container">
                <div className="about__me">
                    <div className="about__me-image">
                        <img src={ME} alt="Peyton"/>
                    </div>
                </div>
                <div className="about__content">
                    <div className="about__cards">
                        <article className='about__card'>
                            <h5>Experience</h5>
                        </article>

                        <article className='about__card'>
                            <h5>Projects</h5>
                        </article>
                    </div>
                    <p>
                        Lore about me...
                    </p>
                    <a href="#contact" className='btn btn-primary'>Contact</a>
                </div>
            </div>
        </section>
    )
}

export default About
