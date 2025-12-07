import React from 'react'
import img1 from "../../img/works/1.png"
import img2 from "../../img/works/2.png"
import img3 from "../../img/works/3.png"
import img4 from "../../img/works/4.png"
import "./style.css"
export default function Works() {
    const work = [
        {
            id: 1,
            img: img1,
            title: "Real estate Template",
            app: "Website Design",
        },
        {
            id: 2,
            img: img2,
            title: "Plant identification app",
            app: "Mobile app",
        },
        {
            id: 3,
            img: img3,
            title: "Smart Home App",
            app: "Mobile app",
        },
        {
            id: 4,
            img: img4,
            title: "Logo Animation",
            app: "Animation",
        }
    ]
    return (
        <div className='container content-work'>
            {
                work.map((data) => {
                    return (
                        <div className='content-main row justify-content-around py-5 my-2'>
                            <div className='col-5'>
                                <img src={data.img} />
                            </div>
                            <div className='col-5'>
                                <h4 className='content-title'>{data.title}</h4>
                                <div className='content-disc'>Lorem ipsum dolor sit amet, consectetur <span className='bolder'> adipiscing elit. Ultrices lorem non feugiat egestas amet. </span></div>
                                <div className='content-app py-3'>{data.app}</div>
                                <button className='content-btn'>view work <span><i class="fa-solid fa-chevron-right"></i></span></button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
