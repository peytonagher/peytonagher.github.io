import React from 'react'
import './experience.css'

const Experience = () => {
    return (
        <section id='experience'>
            <h5>My Experience</h5>
            <div className="contianer experience__container">
                <div className="experience__frontend">
                    <h3>Frontend Development</h3>
                    <div className="experience__content">
                        <article classnName="experience__details">
                            <div>
                                <h4>HTML</h4>
                                <small className='text-light'>Experienced</small>
                            </div>
                        </article>
                        <article classnName="experience__details">
                            <div>
                                <h4>CSS</h4>
                                <small className='text-light'>Intermediate</small>
                            </div>
                        </article>
                        <article classnName="experience__details">
                            <div>
                                <h4>JavaScript</h4>
                                <small className='text-light'>Intermediate</small>
                            </div>
                        </article>
                    </div>
                </div>
                <div className="experience__backend">
                    <h3>Backend Development</h3>
                    <article classnName="experience__details">
                        <div>
                            <h4>Node.js</h4>
                            <small className='text-light'>Beginner</small>
                        </div>
                    </article>
                    <article classnName="experience__details">
                        <div>
                            <h4>Python</h4>
                            <small className='text-light'>Experienced</small>
                        </div>
                    </article>
                    <article classnName="experience__details">
                        <div>
                            <h4>MySQL</h4>
                            <small className='text-light'>Beginner</small>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    )
}

export default Experience
