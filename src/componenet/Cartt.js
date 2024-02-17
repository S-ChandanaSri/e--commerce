import React ,{useState}from 'react'

import { Link } from 'react-router-dom'
import Haed from './Haed'

function Cartt  ()  {
    const [showDown,setShowDown]=useState(false)
    const [showDown1,setShowDown1]=useState(false)

    const handleClick=()=>{
        console.log('handleClick called');
        setShowDown(!showDown);
        setShowDown1(false);
        
        
    }
    const handleSubmit=()=>{
        console.log('handleSubmit called');
        setShowDown1(!showDown1);
        setShowDown(false)
    }
  return (
    <div style={{backgroundColor:"#f0f0f0",height:"100vh"}}>
   
        
    <div className="d-flex align-items-center justify-content-between position-fixed top-0 w-100" style={{backgroundColor: "#2874f0",borderRadius: "1rem"}}>
        <div className="left" style={{marginLeft: "5rem",display:"flex",alignItems: "center"}}>
            <div className="one" style={{margin:"0.5rem 2rem"}}>
                <div className="flip">
                    <a  href="http://localhost:3000/">flipkart</a> 
                </div>
                <div className="explore">
                    <a href="#">Explore <span style={{color:"orange"}}>Plus</span></a>
                    <img alt="explore" className="star" src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/plus-brand-bc165b.svg"/>
                </div>
            </div>
            <form style={{backgroundColor:"white"}}>
                <div className="search" >
                    
                    <input className="inn" style={{border:"none",backgroundColor:"white",width:"500px"}}  placeholder="search for products,brands and more" />
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <div className="recentsearch" >
                       
                        <ul>
                            <li>
                             <div style={{font: "bolder"}}>Discover more</div>
                            </li> 
                            <li>
                             <div >mobiles</div>
                            </li>
                            <li>
                             <div >shoes</div>
                            </li>
                            <li>
                             <div >t-shirts</div>
                            </li>
                            <li>
                             <div >laptops</div>
                            </li>
                         </ul>
                    </div>
                   
    
                </div>
           
            </form>
           
        </div>
        <div className="right" style={{display:"flex",alignItems: "center"}}>
           <a href="#">
            <button style={{marginRight: "5rem",padding:"0.5rem 2rem",backgroundColor: "white"}}>
                <Link style={{textDecoration:"none",color:"black"}} to='/logg'>
                Login
                </Link>
                </button>
           </a>
        </div>
       

    </div>
   
    
   
    <div  className='daaa'>
                
            
                <div className="up1"   >
                
                <img alt="up"src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90" style={{height: "200px",width: "250px"}}/>
                <div><h3>Missing cart items?</h3></div>
                
                <div style={{padding:"1rem 0rem"}}>Login to see the items you added previously</div>
                <button style={{padding:"0.5rem 3.5rem",backgroundColor:"#FB641B"}}>
                    <Link to="/Head" style={{color:"white",textDecoration:"none"}}>   
                    Shop Now
                    </Link>
                    </button>
            </div>

    </div>
   
    
   
    </div>
  )
}

export default Cartt
//changed line 94