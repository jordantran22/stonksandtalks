import React from 'react'

const Navbar = () => {
  return (
    <div className='navbar'>
       
        <img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/facebook/327/chart-increasing_1f4c8.png"></img>
        <h1 className='logo'>
        Stonks And Talks
        </h1>

        <div >
            <ul className='navbarLinks'>
                <li className='navbarItem'>
                    News
                </li>

                <li className='navbarItem'>
                    Forums
                </li>

                <l1 className='navbarItem'>
                    Stocks
                </l1>
            </ul>
        </div>

        <div className='navbarButtons'>
            <button className='loginButton'>Log In</button>
            <button className='signUpButton'>Sign Up</button>
        </div>
    </div>
  )
}

export default Navbar