import React from 'react'
import './contact.css';
import { MdOutlineEmail } from 'react-icons/md'

const Contact = () => {
    return (
        <section id='contact'>
            <h2>Contact Me</h2>
            <div className="container contact__container">
                <div className="contact__options">
                    <article className="contact__option">
                        <MdOutlineEmail/>
                        <h4>Email</h4>
                        <h5>pnagher@gmail.com</h5>
                        <a href="mailto:pnagher@gmail.com">Send a message</a>
                    </article>
                </div>
            </div>
        </section>
    )
}

export default Contact