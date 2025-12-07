import React from 'react'
import "./style.css"
export default function Footer() {
    return (
        <div className='container d-flex flex-column justify-content-center align-items-center'>
            <h1 className='content-footer'>Get <span className='bolder'> in Touch.</span></h1>
            <div className='content-app'>So that we can talk more about...</div>
            <div className='content-icon w-25 d-flex justify-content-between py-5'>
                <a href='https://www.gmail.com' target='__blank'>
                    <i class="fa-solid fa-envelope"></i>
                </a>
                <a href='https://www.gmail.com' target='__blank'>
                    <i class="fa-brands fa-behance"></i>
                </a>
                <a href='https://www.gmail.com'>
                    <i class="fa-brands fa-dribbble"></i>
                </a>
                <a href='https://www.gmail.com'>
                    <i class="fa-brands fa-linkedin-in"></i>
                </a>
            </div>
            <div className='content-desc'>Made with ❣️ by <span className='bolder'>Srinivas Dezign</span></div>
        <br />
        <br />
        </div>
    )
}
