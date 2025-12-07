import React from 'react'
import "./style.css"
import img1 from "../../img/about/1.png"
import img2 from "../../img/about/2.png"
import img3 from "../../img/about/3.png"
export default function About() {
    return (
        <div className='container py-5 my-5'>
            <div className='row justify-content-around align-items-center roww'>
                <div className='col-5'>
                    <h4 className='content-title'>A bit about me</h4>
                    <div className='content-disc'>I am a UI/UX designer who is passionate about creating <span className='bolder'> beautiful and joyful digital experiences. Besides design, I love music, games and travelling. </span></div>
                </div>
                <div className='col-5'>
                    <div className='row justify-content-between align-items-center'>
                        <div className='col-5 p3'>
                            <img src={img1} className='imgss'/>
                        </div>
                        <div className='col-5'>
                            <div className='row rowa flex-column justify-content-between'>
                                <div className='col-4 p-3'>
                                    <img className='imgs' src={img2} />
                                </div>
                                <div className='col-4 p-3'>
                                    <img src={img3} className='imgs' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
