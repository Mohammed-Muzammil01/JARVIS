import React from 'react'

function Navbar() {
  return (
    <>
    <nav style={{height:"7vh", padding:"3px", paddingLeft:"10px"}}>
        <div style={{height:"100%",display:"flex", alignItems:"center"}}>

        <div style={{height:"100%", display:"flex", justifyContent:"center", alignItems:"center"}}>
        <svg width="35" height="35" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clip-path="url(#clip0_116_153)"> <path d="M100 0C103.395 53.7596 146.24 96.6052 200 100C146.24 103.395 103.395 146.24 100 200C96.6052 146.24 53.7596 103.395 0 100C53.7596 96.6052 96.6052 53.7596 100 0Z" fill="url(#paint0_linear_116_153)"/> </g> <defs> <linearGradient id="paint0_linear_116_153" x1="100" y1="0" x2="100" y2="200" gradientUnits="userSpaceOnUse"> <stop stop-color="#DF99F7"/> <stop offset="1" stop-color="#FFDBB0"/> </linearGradient> <clipPath id="clip0_116_153"> <rect width="200" height="200" fill="white"/> </clipPath> </defs> </svg>        
        </div>

        <h1 className='logo'>Jarvis</h1>

        </div>
    </nav>
    </>
  )
}

export default Navbar