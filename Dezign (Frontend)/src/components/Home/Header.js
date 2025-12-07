import React from 'react'
import './style.css'
import img1 from "../../img/header/1.png"
import img2 from "../../img/header/2.png"
import img3 from "../../img/header/3.png"
import img4 from "../../img/header/4.png"
export default function Header() {
    const imga = [
        {
            id: 1,
            imgs: img1,
        },
        {
            id: 2,
            imgs: img2,
        },
        {
            id: 3,
            imgs: img3,
        },
        {
            id: 4,
            imgs: img4,
        },
    ]
    return (
        <>
            <div className='container head text-white w-100 d-flex flex-column justify-content-around align-items-center fs-1' style={{ height: '100vh' }}>
                <div className='text-center fw-light'>I’m a designer specialising in <b className='px-2 bolder'> UI/UX </b> and
                    <div><b className='bolder'> Interaction Design </b></div>
                </div>
                <i class="fa-solid fa-angle-down "></i>
            </div>
            <div className='container head text-white w-100 d-flex flex-column text-left justify-content-around fs-1' style={{ textAlign: 'left' }}>
                <div className='fw-light'>Some of <b className='px-2 bolder'> the clients I have </b>
                    <div><b className='bolder'> designed for </b></div>
                </div>
            </div>
            <div className='py-5' />
            <div className='img_block container d-flex justify-content-between align-items-center'>
                {
                    imga.map((data) => {
                        return (
                            <img src={data.imgs} key={data.id}></img>
                        )
                    })
                }
            </div>
            <div className='py-5' />
            <div className='py-5' />
            <div className='container head text-white w-100 d-flex flex-column text-left justify-content-around fs-1' style={{ textAlign: 'left' }}>
                <div className='fw-light'>Selected <b className='px-2 bolder'> Works </b>
                </div>
            </div>
            <div className='py-5' />
        </>
    )
}
