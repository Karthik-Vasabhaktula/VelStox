import React from 'react';
import { useNavigate } from 'react-router-dom';

function Hero() {
    const navigate= useNavigate();
    return ( 
        <div className='container p-5 mb-5'>
            <div className='row text-center'>
                <img src='media/images/home1.png' alt='Hero Image' className='mb-5'/>
                <h1 className='mt-5' style={{ color: "#111827", fontWeight: "700" }}>Invest in everything</h1>
                <p style={{ color: "#4B5563", fontSize: "16px" }}>Online platform to invest in stocks, derivatives, mutual funds, and more</p>
                <button className='p-2 btn btn-primary fs-5 mb-5' style={{width:"20%", margin:"0 auto", backgroundColor: "#0F6FE8", border: "none", fontWeight: "600"}} onClick={()=> navigate("/signup")}>Signup Now</button>
            </div>
        </div>
    );
}

export default Hero;