import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom';
import Addtocart from './Addtocart';

const Sam = () => {
    const [dataa, setDataa] = useState([]);

    useEffect(()=>{
        fetch('http://localhost:3001/latest',{
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json', 
          
        }
       
    })
    .then((response)=>response.json())
    .then((dataa) => {
        console.log(dataa);
        setDataa(dataa);
       
      })
    .catch((err)=>console.log(err))

    },[])

    const ddataId=dataa.length>0?dataa[dataa.length-2].lastName:null;


 
    useEffect(()=>{
        fetch('https://jsonplaceholder.typicode.com/users')
        .then((res)=>res.json())
        .then((data) => {
            console.log(data);
   
            setFiltered(data);
          })
        .catch((err)=>console.log(err))
        
 
    },[])
    let [data,setData]=useState([])
    let [filtered,setFiltered]=useState([])
    const handleSearch=(value)=>{
        const res=filtered.filter((f)=>f.name.toLowerCase().includes(value))
        setData(res)
        console.log(res)

    }
  return (
    <div>
        <div>
        <div className="headd">
      <div className="left">
            <div className="one">
                <div className="flip">
                    <a href="http://localhost:3000/">flipkart</a> 
                </div>
                <div className="explore">
                    <a href="http://localhost:3000/">Explore <span>Plus</span></a>
                    <img className="star" alt="plus " src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/plus-brand-bc165b.svg"/>
                </div>
            </div>
            
            <form style={{backgroundColor: "white"}}>
                <div className="search" style={{display:"flex"}}  >
                    <i style={{padding:"0.5rem 0.5rem"}} className="fa-solid fa-magnifying-glass"  ></i>
                    <input className="inn" style={{ border: "none" }}  placeholder="search for products,brands and more" onChange={e=>(handleSearch(e.target.value))} />
                   
                    <div className="recentsearch"  >
                    <div style={{fontSize:"18px",position:"relative",right:"280px"}}><b>Discover more</b></div>
                    {filtered.map((d,i)=>(
                    <div style={{display:"flex",padding:"0.5rem 1rem"}} key={i}>
                        <div ><i className="fa-solid fa-magnifying-glass" style={{padding:"0.5rem 0.5rem",paddingRight:"1rem"}} ></i></div>
                    {d.name}
                    </div>
                    ))}
                    </div>
                    
                </div>
            </form>
          
  
            

        </div>
        <div className="right">
            <div className="seller">
                <a href="http://localhost:3000/seller">
                    <img className="house" alt="Description " src='https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/Store-9eeae2.svg' Become a Seller />

                </a>

            </div>
            <div className="sign">
                <label htmlFor="checkBtn">
                    <div className="signin" style={{display:"flex"}}>
                    
                        <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/profile-52e0dc.svg"/>
                        <a>{ddataId}</a>
                    </div>
                        
                </label>
                <input type="checkbox" id="checkBtn"  />
                <ul id="listing" style={{backgroundColor:" white"}}>
                
         
                    
                    
                <a   href="#">
                        <li  style={{position:"relative",right:"2.1rem"}}>
                            <div className="lii" style={{width:"250px",display:"flex",justifyContent:"space-between"}}> 
                            <img style={{position:"relative",left:"20px"}}alt="Description " src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/profile-815786.svg"/>
                            <div style={{position:"relative",right:"120px"}}>My Profile</div>
                             
                            </div>
                        </li>
         
                    </a>
                    <a href="#">
                        <li style={{alignItems: "center",position:"relative",right:"2.1rem",top:"0.6rem"}}>
                        <div className="lii" style={{width:"250px",display:"flex",justifyContent:"space-between"}}>
                            <img style={{position:"relative",left:"20px"}}alt="Description " src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/fkplus-4ff29a.svg"/> 

                            <div style={{position:"relative",right:"70px"}}>Flipkart Plus Zone</div>
                        </div>
                        </li>
                    </a>
                    <a href="#">
                        <li style={{alignItems: "center",position:"relative",right:"2.1rem",top:"1.2rem"}}>
                            <div className="lii" style={{width:"250px",display:"flex",justifyContent:"space-between"}}>
                            <img  style={{position:"relative",left:"20px"}}alt="Description " src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/orders-bfe8c4.svg"/> 
                            <div style={{position:"relative",right:"145px"}}>Orders</div>
                            </div>
                        </li>
                    </a>
                    <a href="#">
                        <li style={{alignItems: "center",position:"relative",right:"2.1rem",top:"1.6rem"}}>
                            <div className="lii" style={{width:"250px",display:"flex",justifyContent:"space-between"}}>
                            <img style={{position:"relative",left:"20px"}}alt="Description " src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDIwLjI0OUMxMiAyMC4yNDkgMi42MjUgMTQuOTk5IDIuNjI1IDguNjI0MDNDMi42MjUgNy40OTcwNSAzLjAxNTQ2IDYuNDA0ODggMy43Mjk5NiA1LjUzMzM0QzQuNDQ0NDUgNC42NjE3OSA1LjQzODg0IDQuMDY0NzIgNi41NDM5MyAzLjg0MzdDNy42NDkwMyAzLjYyMjY4IDguNzk2NTcgMy43OTEzNyA5Ljc5MTMxIDQuMzIxMDZDMTAuNzg2MSA0Ljg1MDc2IDExLjU2NjUgNS43MDg3NCAxMiA2Ljc0OTAzVjYuNzQ5MDNDMTIuNDMzNSA1LjcwODc0IDEzLjIxMzkgNC44NTA3NiAxNC4yMDg3IDQuMzIxMDZDMTUuMjAzNCAzLjc5MTM3IDE2LjM1MSAzLjYyMjY4IDE3LjQ1NjEgMy44NDM3QzE4LjU2MTIgNC4wNjQ3MiAxOS41NTU1IDQuNjYxNzkgMjAuMjcgNS41MzMzNEMyMC45ODQ1IDYuNDA0ODggMjEuMzc1IDcuNDk3MDUgMjEuMzc1IDguNjI0MDNDMjEuMzc1IDE0Ljk5OSAxMiAyMC4yNDkgMTIgMjAuMjQ5WiIgc3Ryb2tlPSIjMjEyMTIxIiBzdHJva2Utd2lkdGg9IjEuNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo="/>
                            <div style={{position:"relative",right:"138px"}}>Wishlist</div> 
                            </div>
                        </li>
                    </a>
                    <a href="#">
                        <li style={{alignItems: "center",position:"relative",right:"2.1rem",top:"2rem"}}>
                            <div className="lii" style={{width:"250px",display:"flex",justifyContent:"space-between"}}>
                            <img style={{position:"relative",left:"20px"}}alt="Description " src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/rewards-fbd212.svg"/> 
                            <div style={{position:"relative",right:"135px"}}>Rewards</div>
                            </div>
                            
                        </li>

                    </a>
                    <a href="#">
                        <li style={{alignItems: "center",position:"relative",right:"2.1rem",top:"2.5rem"}}>
                            <div className="lii" style={{width:"250px",display:"flex",justifyContent:"space-between"}}>
                            <img style={{position:"relative",left:"20px"}}alt="Description" src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/giftCard-bd87e1.svg"/> 
                            <div style={{position:"relative",right:"125px"}}>Gift Cards</div>
                            </div>
                        
                        </li>
                        
                    </a>
                </ul>
     
            </div>
            <div className="cart">
            <Link to={'/cart'} >
                  
                  <a style={{display:"flex"}}>
                  <img alt="Description " src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/header_cart-eed150.svg"/> Cart
                 
                  </a>
              </Link> 
                
            </div>
        </div>

      
        
     
    </div>
    </div>




    <div className='pdown' style={{display:"flex",position:"relative",top:"120px",height:"100vh",overflowY:"hidden",left:"100px"}}>
        <div className='leftside'  >
            
                <div style={{position:"relative",border:"2px solid gray",width:"440px",height:"470px"}}>
                    <div style={{position:"relative",top:"1.5rem"}}>
                        <img src="https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/u/m/e/-original-imagth5xgmfwjbfx.jpeg?q=70&crop=false"/>

                    </div>
                </div>
                <div style={{position:"relative",top:"1rem"}}>
                    <Link to='addtocart' style={{padding:"1rem 3.5rem",backgroundColor:"#FF9F00"}}>
                    
                      <i class="fa-solid fa-cart-shopping"></i>&nbsp;
                       ADD TO CART
                   
                    </Link>
                    
                    &nbsp;
                    <button style={{padding:"1rem 3.2rem",backgroundColor:"#FB641B"}}>
                       <i class="fa-solid fa-bolt-lightning"></i>&nbsp;
                        BUY NOW
                    </button>
                </div>

            
        </div>
        <div className='rightside' style={{position:"relative",left:"1rem"}}>
            <div>
                <div>
                    <h1 style={{fontSize:"23px",position:"relative",right:"9.7rem"}}>SAMSUNG Galaxy S22 5G (Green, 128 GB)</h1>
                </div>
                <div style={{position:"relative",right:"14.7rem"}} >
                    <span style={{width:"5 rem",backgroundColor:"green",color:"white",borderRadius:"0.5rem"}}>4.4<i class="fa-regular fa-star"></i></span>&nbsp;
                    <span>13,395 Ratings &nbsp;</span>
                    <span>&</span>
                    <span>&nbsp; 1,106 Reviews</span>
                </div>
                
                <div style={{display:"flex",position:"relative",left:"1.1rem"}}>
                <div style={{fontSize:"2rem"}}>₹49,999</div>&nbsp;&nbsp;
                <div>₹85,999</div>&nbsp;&nbsp;
                <div style={{color:"green"}}>41% off</div>

                </div>
            </div>
            <div>
                <div><p style={{fontSize:"20px",position:"relative",right:"18.4rem"}}><b>Available offers</b></p></div>    
                <div style={{position:"relative",right:"5.1rem"}}>
                    <span>
                        <img src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" style={{width:"1.2rem"}} />
                    </span>&nbsp;&nbsp;
                    <span style={{color:"black"}}><b>Bank Offer</b>&nbsp;</span>
                    <span style={{color:"black"}} >10% Upto ₹2500 off on Samsung Axis Bank Signature credit card</span>
                </div>
                <div style={{position:"relative",right:"5.5rem"}}>
                    <span>
                        <img src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" style={{width:"1.2rem"}} />
                    </span>&nbsp;&nbsp;
                    <span style={{color:"black"}}><b>Bank Offer</b>&nbsp;</span>
                    <span style={{color:"black"}}>10% Upto ₹2500 off on Samsung Axis Bank Infinite credit card</span>
                </div>
                <div style={{position:"relative",left:"1.6rem"}}>
                    <span>
                        <img src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" style={{width:"1.2rem"}} />
                    </span>&nbsp;&nbsp;
                    <span style={{color:"black"}}><b>Bank Offer</b>&nbsp;</span>
                    <span style={{color:"black"}}>10% off on Bank of Baroda Credit Card EMI Txns, up to ₹1,500 on orders of ₹10,000 and above</span>
                </div>
                <div style={{position:"relative",right:"6rem"}}>
                    <span>
                        <img src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" style={{width:"1.2rem"}} />
                    </span>&nbsp;&nbsp;
                    <span style={{color:"black"}}><b>Special offer</b>&nbsp;</span>
                    <span style={{color:"black"}}>Get extra ₹36000 off (price inclusive of cashback/coupon)</span>
                </div>
            </div>
            &nbsp;
            &nbsp;
            <div style={{display:"flex",flexDirection:"column",border:"1px solid gray",width:"400px",position:"relative",left:"2.3rem"}}>
                <label htmlFor='buy without exchange' style={{display:"flex",position:"relative",padding:"1rem"}}>
                    <input type='radio' id='buy without exchange' />&nbsp;&nbsp;&nbsp;&nbsp;
                    <div>Buy without Exchange</div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <div><b>₹49,999</b></div>
                </label>
                <hr/>
                <label htmlFor='buy with exchange' >
                    <div style={{display:"flex",position:"relative",padding:"1rem"}}>
                    <input type='radio' id='buy with exchange' />&nbsp;&nbsp;&nbsp;&nbsp;
                    <div style={{display:"flex"}}>
                        <div>Buy with Exchange</div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <div>up to ₹41,400 off</div>
                    </div>
                    </div>
                    
                    <div style={{color:"red"}}>
                        Enter pincode to check if exchange is available
                    </div>
                    
                </label>
            </div>
        </div>
    </div>

    </div>
    
   
    
    
  )
                    }

export default Sam
