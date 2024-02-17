import React,{useEffect,useState} from 'react'
import { Link, Navigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import Products from './Products'
import 'bootstrap/dist/css/bootstrap.min.css';

//import jwt from 'jsonwebtoken';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { useCookies } from 'react-cookie';




//import jwtDecode from 'jwt-decode';






const Head = () => {
    
    const [cookies] = useCookies(['token', 'userid']);

    useEffect(() => {
       
        const token = cookies.token;
        const userId = cookies.userid;
    
        if (token && userId) {
          try {
            
           // const decodedUserToken = jwt.verify(userIdToken, "our-jsonwebtoken-secret-key");
            //const userId = decodedUserToken.userId;
    
            // Navigate to the desired URL
            const url = `http://localhost:3000/cart?userid=${userId}`;
            Navigate.push(url);
    
          } catch (error) {
            console.error('Error decoding user token:', error);
            // Handle error, e.g., redirect to login page
          }
        } else {
          // Handle case where either token or userIdToken is missing
        }
      }, [Navigate]);



    const { id } = useParams();

    const [posts, setPosts] = useState([]);
    useEffect(() => {
        // Fetch the list of posts from your API or data source
        fetch('http://localhost:3001/nidi')
          .then(response => response.json())
          .then(data =>{
            console.log('Data from the API:', data);
           setPosts(data)})
          .catch(error => console.error('Error fetching posts:', error));
       
      }, []);

   /* const [produc,setProduc] = useState([])
    useEffect(()=>{
        fetch('http://localhost:3001/lo')
      .then(response => response.json())
      .then(data => setProduc(data))
      .catch(error => console.error('Error fetching data:', error));

    },[])*/





    let [data,setData]=useState([])
    let [filtered,setFiltered]=useState([])
    useEffect(()=>{
        fetch('https://jsonplaceholder.typicode.com/users')
        .then((res)=>res.json())
        .then((data) => {
            console.log(data);
   
            setFiltered(data);
          })
        .catch((err)=>console.log(err))
        
 
    },[])
    
    const handleSearch=(value)=>{
        const res=filtered.filter((f)=>f.name.toLowerCase().includes(value))
        setFiltered(res)
        console.log(res)

    }
       
    
    
  return (
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
                    
                    <i className="fa-solid fa-magnifying-glass" style={{padding:"0.5rem 0.5rem"}} ></i>
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
                    <img className="house" alt="Description " src='https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/Store-9eeae2.svg'  /> 

                </a>

            </div>
            <div className="sign" >
                <label htmlFor="checkBtn">
                    <div className="signin" >
                        <img alt="signin" src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/profile-815786.svg"/> Sign in
                        
                        <img alt="Description " src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTEiIHZpZXdCb3g9IjAgMCAxNCAxMSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgZmlsdGVyPSJ1cmwoI2ZpbHRlcjBfZF80OTc0Xzc1OTY5KSI+CjxwYXRoIGQ9Ik0zIDJMNyA2TDExIDIiIHN0cm9rZT0iIzExMTExMiIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L2c+CjxkZWZzPgo8ZmlsdGVyIGlkPSJmaWx0ZXIwX2RfNDk3NF83NTk2OSIgeD0iMC4yNSIgeT0iMC4yNSIgd2lkdGg9IjEzLjUiIGhlaWdodD0iOS44MTI1IiBmaWx0ZXJVbml0cz0idXNlclNwYWNlT25Vc2UiIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0ic1JHQiI+CjxmZUZsb29kIGZsb29kLW9wYWNpdHk9IjAiIHJlc3VsdD0iQmFja2dyb3VuZEltYWdlRml4Ii8+CjxmZUNvbG9yTWF0cml4IGluPSJTb3VyY2VBbHBoYSIgdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDEyNyAwIiByZXN1bHQ9ImhhcmRBbHBoYSIvPgo8ZmVPZmZzZXQgZHk9IjEiLz4KPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMSIvPgo8ZmVDb2xvck1hdHJpeCB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMC4xNiAwIi8+CjxmZUJsZW5kIG1vZGU9Im5vcm1hbCIgaW4yPSJCYWNrZ3JvdW5kSW1hZ2VGaXgiIHJlc3VsdD0iZWZmZWN0MV9kcm9wU2hhZG93XzQ5NzRfNzU5NjkiLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbj0iU291cmNlR3JhcGhpYyIgaW4yPSJlZmZlY3QxX2Ryb3BTaGFkb3dfNDk3NF83NTk2OSIgcmVzdWx0PSJzaGFwZSIvPgo8L2ZpbHRlcj4KPC9kZWZzPgo8L3N2Zz4K"/>

                    </div>
                        
                </label>
                <input type="checkbox" id="checkBtn"  />
                <ul id="listing" style={{backgroundColor:" white"}}>
                <a href="#"  ><span style={{color:"black",fontSize:"16px",position:"relative",right:"2.5rem",top:"0.5rem"}} >New Coustomer?</span> 
                
                <span> 
                <Link to={'/login'} style={{color:"blue",position:"relative",fontSize:"16px",top:"0.5rem"}}>sign up</Link>
                
                </span></a>
                <hr/>
                    
                    
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
    <br/>
    <br/>
    <br/>
    <div className="main">
        <div className="first" style={{objectFit: "contain"}}>
            <div className="onlyboxes">
                <div className="firstone" style={{padding:"1rem"}}>
                    <a href="#">
                        <img alt="Description" src="https://rukminim1.flixcart.com/fk-p-flap/80/80/image/bfcdffe68a4a77e6.jpg?q=100"/>
                        <br/>
                        <span style={{marginLeft: "1rem"}}>Offers</span>
                    </a>
                </div>
                <div className="secondone" style={{padding:"1rem"}}>
                    <a href="#">
                        <img alt="Description" src="https://rukminim1.flixcart.com/fk-p-flap/80/80/image/20e8d27f8c49a312.jpg?q=100"/>
                        <br/>
                        <span>Mobiles & Tablets</span>
                    </a>
                </div>
                <div className="thirdone" style={{padding:"1rem"}}>
                    <a href="#">
                        <img alt="Description" src="https://rukminim1.flixcart.com/fk-p-flap/80/80/image/9015804c95cf223d.jpg?q=100"/>
                        <br/>
                        <span style={{marginLeft:" 7px" }} >Electronics</span>
                    </a>
                </div>
                <div className="fourthone " style={{padding:"1rem"}}>
                    <a href="#">
                        <img alt="Description" src="https://rukminim1.flixcart.com/fk-p-flap/80/80/image/9536c6d9d8d6f214.jpg?q=100"/>
                        <br/>
                        <span>TV's & Appliances</span>
                    </a>
                </div>
                <div className="fifthone" style={{padding:"1rem"}}>
                    <a href="#">
                        <img alt="Description" src="https://rukminim1.flixcart.com/fk-p-flap/80/80/image/9d6cf33034f3ad5d.jpg?q=100"/>
                        <br/>
                        <span style={{marginLeft: "1rem"}}>Fashion</span>
                    </a>
                </div>
                <div className="sixthone" style={{padding:"1rem"}}>
                    <a href="#">
                        <img alt="Description" src="https://rukminim1.flixcart.com/fk-p-flap/80/80/image/3a99ad45162dae20.jpg?q=100"/>
                        <br/>
                        <span style={{marginLeft: "1rem"}}>Beauty</span>
                    </a>
                </div>
                <div className="seventhone" style={{padding:"1rem"}}>
                    <a href="#">
                        <img alt="Description" src="https://rukminim1.flixcart.com/fk-p-flap/80/80/image/7271d36081369b1b.jpg?q=100"/>
                        <br/>
                        <span>Home & Kitchen</span>
                    </a>
                </div>
                <div className="eighthone" style={{padding:"1rem"}} >
                    <a href="#">
                        <img alt="Description" src="https://rukminim1.flixcart.com/fk-p-flap/80/80/image/f8f98743e2ad89f6.jpg?q=100"/>
                        <br/>
                        <span style={{marginLeft: "1rem"}}>Furniture</span>
                    </a>
                    <div className="furdrop" >
                        <form>
                            <ul   >
                                <li>
                                 <div style={{font:"bolder"}}>Discover more</div>
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
                        </form>
                       
                       
                    </div>

                </div>

            </div>
            
        </div>
        <div className='second'>
            

        </div>





        <div className="fourth">
            <div className="ii">
                <img  alt="Description" className="iii" src="https://rukminim1.flixcart.com/fk-p-flap/1000/90/image/9ee27aa0c23e89ac.jpg?q=20"/>
            </div>
        </div>
        <div className="both">
            <div className="third" style={{objectFit: "contain"}}>
                <div className="best" >Best Mobile</div> 
                
                    <div className="mobiles">
                        <div className="bb" style={{marginLeft: "1rem" }}>
                            <a href="http://localhost:3000/sam" >
                                <div className="mobile1">
                                    <img alt="Description" src="https://rukminim1.flixcart.com/image/170/170/xif0q/mobile/b/h/c/-original-imagth5xwrg4gfyp.jpeg?q=90" width="120px" height="150" />
                                </div>
                                <div className="name1"  > Samsung S22 5G</div>
                                <div className="name2" >incl of offers</div>
                            </a>
                        </div>
                        <div className="bb">
                            <a href="#" >
                                <div className="mobile1" >
                                    <img alt="Description" src="https://rukminim1.flixcart.com/image/170/170/xif0q/mobile/l/2/y/-original-imaggswcffkgcupp.jpeg?q=90" width="120px" height="150" />
                                </div>
                                <div className="name1"   > Google Pixel 7</div>
                                <div className="name2" >incl of offers</div>
                            </a>
                        </div>
                        <div className="bb">
                            <a href="#" >
                                <div className="mobile1" >
                                    <img alt="Description" src="https://rukminim1.flixcart.com/image/170/170/xif0q/mobile/3/a/x/f5-5g-mzb0e7kin-poco-original-imagpep3dcnkbxp4.jpeg?q=90" width="120px" height="150" />
                                </div>
                                <div className="name1"   > Poco F5 5G</div>
                                <div className="name2" >incl of offers</div>
                            </a>
                        </div>
                        <div className="bb">
                            <a href="#" >
                                <div className="mobile1">
                                    <img alt="Description" src="https://rukminim1.flixcart.com/image/170/170/xif0q/mobile/i/s/b/-original-imagrdefh2xgenzz.jpeg?q=90" width="120px" height="150" />
                                </div>
                                <div className="name1"   > Nothing Phone 2</div>
                                <div className="name2" >incl of offers</div>
                            </a>
                        </div>
                        <div className="bb">
                            <a href="#" >
                                <div className="mobile1">
                                    <img alt="Description" src="https://rukminim1.flixcart.com/image/170/170/xif0q/mobile/d/h/q/m6-pro-5g-mzb0eprin-poco-original-imags3e7vewsafst.jpeg?q=90" width="120px" height="150" />
                                </div>
                                <div className="name1"   > Nothing Phone 2</div>
                                <div className="name2" >incl of offers</div>
                            </a>
                        </div>
                        <div className="bb" style={{marginRight: "1rem"}}>
                            <a href="#" >
                                <div className="mobile1">
                                    <img alt="Description" src="https://rukminim1.flixcart.com/image/170/170/xif0q/mobile/e/q/g/-original-imagtqqd4vcdzqdg.jpeg?q=90" width="120px" height="150" />
                                </div>
                                <div className="name1"   > Poco M6 Pro</div>
                                <div className="name2" >incl of offers</div>
                            </a>
                        </div>
                        <div className="bb" style={{marginRight:" 1rem"}}>
                            <a href="#" >
                                <div className="mobile1">
                                    <img alt="Description" src="https://rukminim1.flixcart.com/image/170/170/xif0q/mobile/b/r/f/-original-imaghkvuhzwge3za.jpeg?q=90" width="120px" height="150" />
                                </div>
                                <div className="name1"   > Poco M6 Pro</div>
                                <div className="name2" >incl of offers</div>
                            </a>
                        </div>
                        <div className="bb" style={{marginRight: "1rem"}}>
                            <a href="#" >
                                <div className="mobile1">
                                    <img alt="Description" src="https://rukminim1.flixcart.com/image/170/170/xif0q/mobile/l/8/d/-original-imagqadpnygfnn2v.jpeg?q=90" width="120px" height="150" />
                                </div>
                                <div className="name1"   > Poco M6 Pro</div>
                                <div className="name2" >incl of offers</div>
                            </a>
                        </div>
                        <div className="bb" style={{marginRight: "1rem"}}>
                            <a href="#" >
                                <div className="mobile1">
                                    <img alt="Description" src="https://rukminim1.flixcart.com/image/170/170/xif0q/mobile/b/q/6/edge-40-pay40028in-motorola-original-imagpqzdnhrgvhj7.jpeg?q=90" width="120px" height="150" />
                                </div>
                                <div className="name1"   > Poco M6 Pro</div>
                                <div class="name2" >incl of offers</div>
                            </a>
                        </div>
                       
                    </div>
               
            </div> 
            <div class="sti">
                <div class="ins" style={{padding:" 1rem"}}>
                    <img alt="Description" src="https://rukminim1.flixcart.com/fk-p-flap/530/810/image/c598b86ab9b42739.jpeg?q=20" width="220px" height="340" />

                </div>
            </div> 

        </div>
       
       

    </div>
    <div className='fifth' >
    <div style={{display:"flex"}}>
        <section className='py-4 container' >
        <div  style={{display:"flex", overflowX: "auto",overflowY:'hidden'}}>

        {posts.map(post => (
        <div key={post.id}>
          <Link to={`/nidivi/${post.id}`}>
          <img src={post.imagedata} alt="Product" className='card-img-top img-fluid' style={{height:"12rem",padding:"1rem",width:"17rem"}} />
        <div className='card-body ' style={{height:"5rem"}} >
          <h5 className="card-title">{post.title}</h5>
        </div>
          </Link>
        </div>
      ))}

          
        </div>
      </section>
      
    </div>


    </div>
    <hr/>
    <div className="footer">
        <div className="bo2">
            <img alt="Description" src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/sell-image-9de8ef.svg"/>
            <a href="#" >Become a seller</a>
        </div>
        <div className="bo2">
            <img alt="Description" src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/advertise-image-866c0b.svg"/>
            <a href="#" >Advertise</a>
        </div>
        <div className="bo2">
            <img alt="Description" src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/gift-cards-image-d7ff24.svg"/>
            <a href="#" >Gift Card</a>
        </div>
        <div className="bo2">
            <img alt="Description" src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/gift-cards-image-d7ff24.svg"/>
            <a href="#" >Gift Card</a>
        </div>
        <div className="bo2">
            <img alt="Description" src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/help-centre-image-c4ace8.svg"/>
            
            <a href="#" >Help center</a>
        </div>
        <div className="bo2">
            <img alt="Description" src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/payment-method-c454fb.svg"/>
            
        </div>
    </div>
    </div>
  )
}

export default Head;

























import {useParams} from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


import 'bootstrap/dist/css/bootstrap.min.css';


const Haed=()=>{
    const [dataa, setDataa] = useState([]);
    const [datta,setDatta] = useState([])
    const location = useLocation();
    const navigate=useNavigate();
    const [auth,setAuth]=useState(false)
  const [name,setName]=useState('')
  const [message,setMessage]=useState('')
  const queryParams = new URLSearchParams(location.search);
 const userid = queryParams.get('userid');
 const [showDataa, setShowDataa] = useState(true);
  //const { id } = useParams();
  //const { dataa } = location.state;
  //const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    if (location.state) {
      const { userId, data } = location.state;
      setUserId(userId);
      setData(data);
      setAuth(true);
     // setIsAuthenticated(true);
      console.log("yes",data[0].lastName);
      
    }else{
        setAuth(false);
       // setIsAuthenticated(false);
       
      };

  }, [location.state]);
 
  const [userId, setUserId] = useState(null);
    axios.defaults.withCredentials=true;
    useEffect(()=>{
    
            axios.get('http://localhost:3001/haed')
  .then(res=>{
    if(res.data.status==="success"){
      setAuth(true);
      setName(res.data.name);
    }else{
      setAuth(false);
      setMessage(res.data.message)
    };
    
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

    },[])
    

   /*
    useEffect(() => {
        const { state } = location;
        if (state) {
            const { userId, data } = state;
            setUserId(userId);
            setData(data);
        }
    }, [location]);
    useEffect(() => {
        if (userId && data) {
            fetch('http://localhost:3001/test', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, data }),
            })
            .then(response => response.json())
            .then(dataa => {
                localStorage.setItem("mytok", JSON.stringify(dataa));
                console.log("name", dataa);
            })
            .catch(err => console.log(err));
        }
    }, [userId]);
    */


   
    useEffect(()=>{

        fetch('http://localhost:3001/test', {
       method: 'POST', 
       headers: {
    'Content-Type': 'application/json', 
  },
       
})
    .then((response)=>response.json())
    .then((dataa) => {
        localStorage.setItem("mytok",JSON.stringify(dataa))
        console.log("name",dataa);
    
     
        setDataa(dataa);
       

       
      },[dataa])
    .catch((err)=>console.log(err))

    },[])


 
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
    



    useEffect(()=>{

        fetch('http://localhost:3001/tast', {
       method: 'POST', 
       headers: {
    'Content-Type': 'application/json', 
  },
       
})
    .then((response)=>response.json())
    .then((datta) => {
   
        console.log("name",datta);
    
     
        setDatta(datta);

       
      },[dataa])
    .catch((err)=>console.log(err))

    },[])






    const handleLogout=()=>{
        axios.get('http://localhost:3001/logout')
        .then(res=>{
          if(res.data.status==="success"){
            navigate("/")
            window.location.reload(true);
          }else{
            alert("error")
          }
          
    
        }).catch(err=>console.log(err))
      } 



      const [posts, setPosts] = useState([]);
    useEffect(() => {
        // Fetch the list of posts from your API or data source
        fetch('http://localhost:3001/nidi')
          .then(response => response.json())
          .then(data =>{
            console.log('Data from the API:', data);
           setPosts(data)})
          .catch(error => console.error('Error fetching posts:', error));
       
      }, []);
     // const navigateToCart = (userid) => {
        // Use the history object to push a new route
       // navigate('/cartlast');
      //};
    
    
  return (
 
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
        {auth ? (
        <>
            <div className="seller">
                <a href="http://localhost:3000/seller">
                    <img className="house" alt="Description " src='https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/Store-9eeae2.svg' Become a Seller />

                </a>

            </div>
            <div className="sign">
                <label htmlFor="checkBtn">
                    <div className="signin" style={{display:"flex"}}>
                    

                    {!location.state && (
                    <button style={{display:"flex"}}>
                        <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/profile-52e0dc.svg"/>
                        {dataa.map((item) => (
                        <div key={item.id}>
                         {item.lastName}
                        
                       </div>
                          ))} 
                    </button>

                    )}




                    {location.state && (
                    <button>
                    <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/profile-52e0dc.svg"/>
                    {data && data.length > 0 && data[0].lastName}
                    </button>
                    )}


                    <img alt="Description " src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTEiIHZpZXdCb3g9IjAgMCAxNCAxMSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgZmlsdGVyPSJ1cmwoI2ZpbHRlcjBfZF80OTc0Xzc1OTY5KSI+CjxwYXRoIGQ9Ik0zIDJMNyA2TDExIDIiIHN0cm9rZT0iIzExMTExMiIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L2c+CjxkZWZzPgo8ZmlsdGVyIGlkPSJmaWx0ZXIwX2RfNDk3NF83NTk2OSIgeD0iMC4yNSIgeT0iMC4yNSIgd2lkdGg9IjEzLjUiIGhlaWdodD0iOS44MTI1IiBmaWx0ZXJVbml0cz0idXNlclNwYWNlT25Vc2UiIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0ic1JHQiI+CjxmZUZsb29kIGZsb29kLW9wYWNpdHk9IjAiIHJlc3VsdD0iQmFja2dyb3VuZEltYWdlRml4Ii8+CjxmZUNvbG9yTWF0cml4IGluPSJTb3VyY2VBbHBoYSIgdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDEyNyAwIiByZXN1bHQ9ImhhcmRBbHBoYSIvPgo8ZmVPZmZzZXQgZHk9IjEiLz4KPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMSIvPgo8ZmVDb2xvck1hdHJpeCB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMC4xNiAwIi8+CjxmZUJsZW5kIG1vZGU9Im5vcm1hbCIgaW4yPSJCYWNrZ3JvdW5kSW1hZ2VGaXgiIHJlc3VsdD0iZWZmZWN0MV9kcm9wU2hhZG93XzQ5NzRfNzU5NjkiLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbj0iU291cmNlR3JhcGhpYyIgaW4yPSJlZmZlY3QxX2Ryb3BTaGFkb3dfNDk3NF83NTk2OSIgcmVzdWx0PSJzaGFwZSIvPgo8L2ZpbHRlcj4KPC9kZWZzPgo8L3N2Zz4K"/>
                    </div>
                        
                </label>
                <input type="checkbox" id="checkBtn"  />
                
                
         
                <ul id="listing" style={{ backgroundColor: "white" }}> 
                    
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
                    <a href="#">
                        <li style={{alignItems: "center",position:"relative",right:"2.1rem",top:"3.2rem"}}>
                            <div className="lii" style={{width:"250px",display:"flex",justifyContent:"space-between"}}>
                            <img style={{position:"relative",left:"20px"}}alt="Description" src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/profile-52e0dc.svg"/> 
                            <div onClick={handleLogout} style={{position:"relative",right:"120px"}}>Logout</div>
                            </div>
                        
                        </li>
                        
                    </a>
                    </ul> 
     
            </div>
            <div className="cart">
            
            
           
                
                    <Link to={'/cartlast'}>
                  <a style={{display:"flex"}}>
                        <img alt="Description " src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/header_cart-eed150.svg"/> Cart
                        </a>
                        </Link>
         
                
                 

            </div>
            </>
         ) : (
            <>
                <div className="seller">
                <a href="http://localhost:3000/seller">
                    <img className="house" alt="Description " src='https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/Store-9eeae2.svg'  /> 

                </a>

            </div>
            <div className="sign" >
                <label htmlFor="checkBtn">
                    <div className="signin" >
                        <img alt="signin" src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/profile-815786.svg"/> Sign in
                        
                        <img alt="Description " src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTEiIHZpZXdCb3g9IjAgMCAxNCAxMSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgZmlsdGVyPSJ1cmwoI2ZpbHRlcjBfZF80OTc0Xzc1OTY5KSI+CjxwYXRoIGQ9Ik0zIDJMNyA2TDExIDIiIHN0cm9rZT0iIzExMTExMiIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L2c+CjxkZWZzPgo8ZmlsdGVyIGlkPSJmaWx0ZXIwX2RfNDk3NF83NTk2OSIgeD0iMC4yNSIgeT0iMC4yNSIgd2lkdGg9IjEzLjUiIGhlaWdodD0iOS44MTI1IiBmaWx0ZXJVbml0cz0idXNlclNwYWNlT25Vc2UiIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0ic1JHQiI+CjxmZUZsb29kIGZsb29kLW9wYWNpdHk9IjAiIHJlc3VsdD0iQmFja2dyb3VuZEltYWdlRml4Ii8+CjxmZUNvbG9yTWF0cml4IGluPSJTb3VyY2VBbHBoYSIgdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDEyNyAwIiByZXN1bHQ9ImhhcmRBbHBoYSIvPgo8ZmVPZmZzZXQgZHk9IjEiLz4KPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMSIvPgo8ZmVDb2xvck1hdHJpeCB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMC4xNiAwIi8+CjxmZUJsZW5kIG1vZGU9Im5vcm1hbCIgaW4yPSJCYWNrZ3JvdW5kSW1hZ2VGaXgiIHJlc3VsdD0iZWZmZWN0MV9kcm9wU2hhZG93XzQ5NzRfNzU5NjkiLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbj0iU291cmNlR3JhcGhpYyIgaW4yPSJlZmZlY3QxX2Ryb3BTaGFkb3dfNDk3NF83NTk2OSIgcmVzdWx0PSJzaGFwZSIvPgo8L2ZpbHRlcj4KPC9kZWZzPgo8L3N2Zz4K"/>

                    </div>
                        
                </label>
                <input type="checkbox" id="checkBtn"  />
                <ul id="listing" style={{backgroundColor:" white"}}>
                <a href="#"  ><span style={{color:"black",fontSize:"16px",position:"relative",right:"2.5rem",top:"0.5rem"}} >New Coustomer?</span> 
                
                <span> 
                <Link to={'/login'} style={{color:"blue",position:"relative",fontSize:"16px",top:"0.5rem"}}>sign up</Link>
                
                </span></a>
                <hr/>
                    
                    
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
            </>
            
           ) 
        }
        </div>

        
     
    </div>
    
    <br/>
    <br/>
    <br/>
    <div className="main">
        <div className="first" style={{objectFit: "contain"}}>
            <div className="onlyboxes">
                <div className="firstone" style={{padding:"1rem"}}>
                    <a href="#">
                        <img alt="Description" src="https://rukminim1.flixcart.com/fk-p-flap/80/80/image/bfcdffe68a4a77e6.jpg?q=100"/>
                        <br/>
                        <span style={{marginLeft: "1rem"}}>Offers</span>
                    </a>
                </div>
                <div className="secondone" style={{padding:"1rem"}}>
                    <a href="#">
                        <img alt="Description" src="https://rukminim1.flixcart.com/fk-p-flap/80/80/image/20e8d27f8c49a312.jpg?q=100"/>
                        <br/>
                        <span>Mobiles & Tablets</span>
                    </a>
                </div>
                <div className="thirdone" style={{padding:"1rem"}}>
                    <a href="#">
                        <img alt="Description" src="https://rukminim1.flixcart.com/fk-p-flap/80/80/image/9015804c95cf223d.jpg?q=100"/>
                        <br/>
                        <span style={{marginLeft:" 7px" }} >Electronics</span>
                    </a>
                </div>
                <div className="fourthone " style={{padding:"1rem"}}>
                    <a href="#">
                        <img alt="Description" src="https://rukminim1.flixcart.com/fk-p-flap/80/80/image/9536c6d9d8d6f214.jpg?q=100"/>
                        <br/>
                        <span>TV's & Appliances</span>
                    </a>
                </div>
                <div className="fifthone" style={{padding:"1rem"}}>
                    <a href="#">
                        <img alt="Description" src="https://rukminim1.flixcart.com/fk-p-flap/80/80/image/9d6cf33034f3ad5d.jpg?q=100"/>
                        <br/>
                        <span style={{marginLeft: "1rem"}}>Fashion</span>
                    </a>
                </div>
                <div className="sixthone" style={{padding:"1rem"}}>
                    <a href="#">
                        <img alt="Description" src="https://rukminim1.flixcart.com/fk-p-flap/80/80/image/3a99ad45162dae20.jpg?q=100"/>
                        <br/>
                        <span style={{marginLeft: "1rem"}}>Beauty</span>
                    </a>
                </div>
                <div className="seventhone" style={{padding:"1rem"}}>
                    <a href="#">
                        <img alt="Description" src="https://rukminim1.flixcart.com/fk-p-flap/80/80/image/7271d36081369b1b.jpg?q=100"/>
                        <br/>
                        <span>Home & Kitchen</span>
                    </a>
                </div>
                <div className="eighthone" style={{padding:"1rem"}} >
                    <a href="#">
                        <img alt="Description" src="https://rukminim1.flixcart.com/fk-p-flap/80/80/image/f8f98743e2ad89f6.jpg?q=100"/>
                        <br/>
                        <span style={{marginLeft: "1rem"}}>Furniture</span>
                    </a>
                    <div className="furdrop" >
                        <form>
                            <ul   >
                                <li>
                                 <div style={{font:"bolder"}}>Discover more</div>
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
                        </form>
                       
                       
                    </div>

                </div>

            </div>
            
        </div>

        



        <div className="fourth">
            <div className="ii">
                <img  alt="Description" className="iii" src="https://rukminim1.flixcart.com/fk-p-flap/1000/90/image/9ee27aa0c23e89ac.jpg?q=20"/>
            </div>
        </div>
        <div className="both">
            <div className="third" style={{objectFit: "contain"}}>
                <div className="best" >Best Mobile</div> 
                
                    <div className="mobiles">
                        <div className="bb" style={{marginLeft: "1rem" }}>
                            <a href="http://localhost:3000/sam" >
                                <div className="mobile1">
                                    <img alt="Description" src="https://rukminim1.flixcart.com/image/170/170/xif0q/mobile/b/h/c/-original-imagth5xwrg4gfyp.jpeg?q=90" width="120px" height="150" />
                                </div>
                                <div className="name1"  > Samsung S22 5G</div>
                                <div className="name2" >incl of offers</div>
                            </a>
                        </div>
                        <div className="bb">
                            <a href="#" >
                                <div className="mobile1" >
                                    <img alt="Description" src="https://rukminim1.flixcart.com/image/170/170/xif0q/mobile/l/2/y/-original-imaggswcffkgcupp.jpeg?q=90" width="120px" height="150" />
                                </div>
                                <div className="name1"   > Google Pixel 7</div>
                                <div className="name2" >incl of offers</div>
                            </a>
                        </div>
                        <div className="bb">
                            <a href="#" >
                                <div className="mobile1" >
                                    <img alt="Description" src="https://rukminim1.flixcart.com/image/170/170/xif0q/mobile/3/a/x/f5-5g-mzb0e7kin-poco-original-imagpep3dcnkbxp4.jpeg?q=90" width="120px" height="150" />
                                </div>
                                <div className="name1"   > Poco F5 5G</div>
                                <div className="name2" >incl of offers</div>
                            </a>
                        </div>
                        <div className="bb">
                            <a href="#" >
                                <div className="mobile1">
                                    <img alt="Description" src="https://rukminim1.flixcart.com/image/170/170/xif0q/mobile/i/s/b/-original-imagrdefh2xgenzz.jpeg?q=90" width="120px" height="150" />
                                </div>
                                <div className="name1"   > Nothing Phone 2</div>
                                <div className="name2" >incl of offers</div>
                            </a>
                        </div>
                        <div className="bb">
                            <a href="#" >
                                <div className="mobile1">
                                    <img alt="Description" src="https://rukminim1.flixcart.com/image/170/170/xif0q/mobile/d/h/q/m6-pro-5g-mzb0eprin-poco-original-imags3e7vewsafst.jpeg?q=90" width="120px" height="150" />
                                </div>
                                <div className="name1"   > Nothing Phone 2</div>
                                <div className="name2" >incl of offers</div>
                            </a>
                        </div>
                        <div className="bb" style={{marginRight: "1rem"}}>
                            <a href="#" >
                                <div className="mobile1">
                                    <img alt="Description" src="https://rukminim1.flixcart.com/image/170/170/xif0q/mobile/e/q/g/-original-imagtqqd4vcdzqdg.jpeg?q=90" width="120px" height="150" />
                                </div>
                                <div className="name1"   > Poco M6 Pro</div>
                                <div className="name2" >incl of offers</div>
                            </a>
                        </div>
                        <div className="bb" style={{marginRight:" 1rem"}}>
                            <a href="#" >
                                <div className="mobile1">
                                    <img alt="Description" src="https://rukminim1.flixcart.com/image/170/170/xif0q/mobile/b/r/f/-original-imaghkvuhzwge3za.jpeg?q=90" width="120px" height="150" />
                                </div>
                                <div className="name1"   > Poco M6 Pro</div>
                                <div className="name2" >incl of offers</div>
                            </a>
                        </div>
                        <div className="bb" style={{marginRight: "1rem"}}>
                            <a href="#" >
                                <div className="mobile1">
                                    <img alt="Description" src="https://rukminim1.flixcart.com/image/170/170/xif0q/mobile/l/8/d/-original-imagqadpnygfnn2v.jpeg?q=90" width="120px" height="150" />
                                </div>
                                <div className="name1"   > Poco M6 Pro</div>
                                <div className="name2" >incl of offers</div>
                            </a>
                        </div>
                        <div className="bb" style={{marginRight: "1rem"}}>
                            <a href="#" >
                                <div className="mobile1">
                                    <img alt="Description" src="https://rukminim1.flixcart.com/image/170/170/xif0q/mobile/b/q/6/edge-40-pay40028in-motorola-original-imagpqzdnhrgvhj7.jpeg?q=90" width="120px" height="150" />
                                </div>
                                <div className="name1"   > Poco M6 Pro</div>
                                <div class="name2" >incl of offers</div>
                            </a>
                        </div>
                       
                    </div>
               
            </div> 
            <div class="sti">
                <div class="ins" style={{padding:" 1rem"}}>
                    <img alt="Description" src="https://rukminim1.flixcart.com/fk-p-flap/530/810/image/c598b86ab9b42739.jpeg?q=20" width="220px" height="340" />

                </div>
            </div> 

        </div>
       
       

    </div>
    <div className='fifth' >
    <div style={{display:"flex"}}>
        <section className='py-4 container' >
        <div  style={{display:"flex", overflowX: "auto",overflowY:'hidden'}}>

        {posts.map(post => (
        <div key={post.id}>
          <Link to={`/nidivi/${post.id}`} >
        <img src={post.imagedata} alt="Product" className='card-img-top img-fluid' style={{height:"12rem",padding:"1rem",width:"17rem"}} />
        <div className='card-body ' style={{height:"5rem"}} >
          <h5 className="card-title">{post.title}</h5>
        </div>
          </Link>
        </div>//`/nidivi/${post.id}`
      ))}

          
        </div>
      </section>
      
    </div>


    </div>
    <hr/>
    
    <div className="footer">
        <div className="bo2">
            <img alt="Description" src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/sell-image-9de8ef.svg"/>
            <a href="#" >Become a seller</a>
        </div>
        <div className="bo2">
            <img alt="Description" src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/advertise-image-866c0b.svg"/>
            <a href="#" >Advertise</a>
        </div>
        <div className="bo2">
            <img alt="Description" src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/gift-cards-image-d7ff24.svg"/>
            <a href="#" >Gift Card</a>
        </div>
        <div className="bo2">
            <img alt="Description" src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/gift-cards-image-d7ff24.svg"/>
            <a href="#" >Gift Card</a>
        </div>
        <div className="bo2">
            <img alt="Description" src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/help-centre-image-c4ace8.svg"/>
            
            <a href="#" >Help center</a>
        </div>
        <div className="bo2">
            <img alt="Description" src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/payment-method-c454fb.svg"/>
            
        </div>
    </div>

    </div>
                    
  )
}

export default Haed;














import OtpInput from "otp-input-react";
import { useState,useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {auth} from '../firebase/setup'
import { RecaptchaVerifier,signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "react-phone-input-2/lib/style.css";
//import 'firebase/dist/firebaseui.css'


const Log=()=> {
  const navigate = useNavigate();
 
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);

 


 function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth,
       
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {},
        },
      );
    }
  }


  function onSignup() {
    setLoading(true);
    onCaptchVerify();
    const appVerifier = window.recaptchaVerifier;
    const formatPh = "+" + ph;
    //axios.defaults.withCredentials = true;
    axios.get(`http://localhost:3001/check-mobile/${formatPh}`)
    .then((response) => {
      const exists = response.data.exists;
      if (exists) {
        setLoading(false);
        toast.success("exists")
       
        signInWithPhoneNumber(auth, formatPh,appVerifier)// 
          .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            setLoading(false);
            setShowOTP(true);
            toast.success("OTP sent successfully!");
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });
     }
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
    });
}

   

  async function onOTPVerify() {
    
    setLoading(true);

    try{
      const res=await window.confirmationResult.confirm(otp)
      console.log(res);
      const mobile = res.user.phoneNumber;
        setUser(res.user);
        setLoading(false);
      //  navigate('/login');
       axios.get(`http://localhost:3001/getuserid?mobile=${mobile}`)
      .then(res=>{
        if(res.data.status==="success"){
          const { userId, data } = res.data;
        console.log("Success");
        console.log("UserId:", userId);
        console.log("Data:", data);
        const postData = {
          userId: userId,
          userData: data
        };
        navigate('/', { state: { userId, data }});//changed

       axios.post('http://localhost:3001/tast', postData)
        .then(response => {
          console.log("Data sent to server successfully:", response.data);
         
        })
        .catch(error => {
          console.error("Error sending data to server:", error);
         
        });

        }
      })

 /*if (response.data && response.data.status === 'success') {
        const { userId, data } = response.data;
        console.log("Success");
        console.log("UserId:", userId);
        console.log("Data:", data);
        // Proceed with your logic here using userId and data
    }*/
    }catch(err)  {
        console.log(err);
        setLoading(false);
      };
  }

  return (

    <div style={{height:"100vh"}}>

   
    <section className="bg-emerald-500 flex items-center justify-center h-screen" >
      <div style={{backgroundColor:"white"}}>
      <div className="headd">
      <div className="left" style={{ display:"flex", alignItems: "center", marginLeft:"5rem"}}>
      <div className="onee">
      <div className="flipp">
      <a href="file:///C:/Users/asus/Documents/chinni/hi/all%20chinni%20files/flip/flipkart.html#">flipkart</a>
      </div>
      <div className="exploree">
      <a href="#">Explore <span style={{color:"orange"}}>Plus</span></a>
      <img className="star" src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/plus-brand-bc165b.svg"/>
      </div>
      </div>
      </div>
      </div>
      </div>
      <div>
      <div className="doww">
          <div className="foo" style={{position:" absolute",top:"100px",left:"300px",height:"550px",width:"400px",display: "flex",zIndex:"-1"}}>
          <div className="lee"style={{backgroundColor: "#2874f0",width:" 330px"}}>
          <h2 style={{color: "white" ,  fontSize: "28px",fontFamily: "Roboto,Arial,sans-serif",marginLeft: "2rem",margintop:"3rem"}}>Login</h2>
          <h4 style={{color: "#DBDBDB",    fontFamily: "Roboto,Arial,sans-serif",marginLeft: "2rem",marginRight:"1rem",wordSpacing:" 2px",fontSize: "17px"}}>Get access to your Orders, Wishlist and Recommendations</h4>
      
          </div>

          </div>
      
      
      </div>
      
      
      
      <h5 style={{color: "#858585"}}>By continuing, you agree to Flipkart's <span style={{color: "#2874f0"}}>Terms of Use</span>  and <span style={{color: "#2874f0"}}>privacy Policy</span> .</h5>

      
        <Toaster toastOptions={{ duration: 4000 }} />
        



        <div id="recaptcha-container"></div>






        {user ? (
          <Link to="/login">
            
          </Link>
          
        ) : (
          <div class="w-80 flex flex-col gap-4 rounded-lg p-4 h-screen">
          
            
            {showOTP ? (
              <>
              
                
                <label
                  htmlFor="otp"
                  className="font-bold text-xl text-white text-center"
                >
                  Enter your OTP
                </label>
                <OtpInput  style={{position:"relative",top:"2rem",left:"40rem"}}
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className="opt-container "
                ></OtpInput>
                <button style={{position:"relative",top:"2rem",left:"2.5rem"}}
                  onClick={onOTPVerify}
                  className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                >
                  
                  <span>Verify OTP</span>
                 
                  Login Success
                </button>
              </>
            ) : (
              <>
                <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                 
                </div>
                <label
                  htmlFor=""
                  className="font-bold text-xl text-white text-center"
                >
                  Verify your phone number
                </label>
                <PhoneInput country={"in"} value={ph} onChange={setPh} style={{position:"relative",left:"40rem",marginBottom:"2rem"}} />
                <button style={{position:"relative",left:"4rem"}}
                  onClick={onSignup}
                  className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                >
                 
                  <span >Send code via SMS</span>
                </button>
              </>
            )}
         
          </div>
        )}
      </div>
      
    </section>
    </div>
  );
}
export default Log;
//<div id="recaptcha-container"></div>













































import React,{useEffect, useState} from 'react';
import {Link, Navigate, useParams} from 'react-router-dom';
import {  useNavigate } from 'react-router-dom';
import { toast, Toaster } from "react-hot-toast";
import Cookies from 'js-cookie';
import axios from 'axios'
import {CookiesProvider, useCookies } from 'react-cookie';

import { useGlobalState } from '../GlobalStateContext.js';
import Head from './Head'

const Login = () => {

  const { isLoggedIn, login, logout } = useGlobalState();
   const Navigate=useNavigate();
    const [daataa, setDataa] = useState([]);
    const {id}=useParams();
    const {userid}=useParams();
    const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  //const cookieParser = require('cookie-parser');
  
    useEffect(()=>{

        fetch('http://localhost:3001/', {//changed
       headers: {
    'Content-Type': 'application/json', 
  },     
})
    .then((response)=>response.json())
    .then((daataa) => {
        console.log(daataa);
        setDataa(daataa);
      })
    .catch((err)=>console.log(err))
    },[])
    const [namee,setName]=useState({
        firstName:"",
        lastName:"",
        mobile:"",
        mail:""
    });

    const navigate=useNavigate();
  
   const handleInput=(e)=>{
    e.preventDefault();
    setName({...namee,[e.target.name]:e.target.value})
   }

   



   axios.defaults.withCredentials=true;
    const saveName= async (e)=>{
      e.preventDefault();
      login();
      const dataa={
        firstName:namee.firstName,
        lastName:namee.lastName,
        mobile:namee.mobile,
        mail:namee.mail,
    };
    try {
        const response = await axios.post('http://localhost:3001/all', dataa,{ withCredentials: true });
        console.log("res", response);
        if (response.data.message === 'Mobile number already registered') {
        alert(response.data.message);
      } else {   
        alert(response.data.message);
        console.log("ee",response.data.userid)
          //const userId = Cookies.get('userid');
          //console.log('User ID from cookie:', userId);
            const cartUrl = `http://localhost:3000/cart?userid=${userid}`;
            navigate(cartUrl);
        navigate('/')
        console.log(Error);     
        }    
    } catch (err) { 
      console.error("Error in saving data:", err.message);
        alert('Error in saving data');
    } 
  };
   
/*const handleLogout=()=>{
  axios.get('http://localhost:3001/logout')
  .then(res=>{
    if(res.data.message==="success"){
      window.location.reload(true);
    }else{
      alert("error")
    }
    
  }).catch(err=>console.log(err))
}*/

   
    let [data,setData]=useState([])
    let [filtered,setFiltered]=useState([])
    const handleSearch=(value)=>{
        const res=filtered.filter((f)=>f.name.toLowerCase().includes(value))
        setData(res)
        console.log(res)

    }

   
        
  return (
    <div style={{backgroundColor:"white"}}>
      <div className="headd">
        <div className="left" style={{ display:"flex", alignItems: "center", marginLeft:"5rem"}}>
            <div className="onee">
                <div className="flipp">
                    <a href="file:///C:/Users/asus/Documents/chinni/hi/all%20chinni%20files/flip/flipkart.html#">flipkart</a> 
                </div>
                <div className="exploree">
                    <a href="#">Explore <span style={{color:"orange"}}>Plus</span></a>
                    <img className="star" src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/plus-brand-bc165b.svg"/>
                </div>
            </div>
            <form style={{backgroundColor: "white"}}>
                <div className="searchh" >
                    
                    <input className="inn" style={{border:"none", backgroundColor:"rgb(210, 242, 255)", width:"750px"}}  placeholder="search for products,brands and more" onChange={e=>(handleSearch(e.target.value))} />
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <div className="recentsearchh" style={{ position: "absolute",  top:"62px",backgroundColor:" white",width:"770px",zIndex: "1",height:"overflow",display:" none",padding:"1rem 0rem"}}  >
                    {data.map((d,i)=>(
                    <div key={i}>
                    {d.name}
                    </div>
                    ))}  
                    </div>
                   
    
                </div>
           
            </form>
           
        </div>
        <div className="right">
            <Link to="/create" type='button' style={{color:"#2874F0",border:"2px solid black",padding:"0.5rem 2rem",backgroundColor:"white",textDecoration:"none"}}><b>Login</b></Link>
            
        </div>
       

    </div>
    <div className="doww">
        <div className="foo" style={{position:" absolute",top:"100px",left:"300px",height:"550px",width:"800px",display: "flex",zIndex:"-1"}}>
            <div className="lee"style={{backgroundColor: "#2874f0",width:" 330px"}}>
            <h2 style={{color: "white" ,  fontSize: "28px",fontFamily: "Roboto,Arial,sans-serif",marginLeft: "2rem",margintop:"3rem"}}>Login</h2>
            <h4 style={{color: "#DBDBDB",    fontFamily: "Roboto,Arial,sans-serif",marginLeft: "2rem",marginRight:"1rem",wordSpacing:" 2px",fontSize: "17px"}}>Get access to your Orders, Wishlist and Recommendations</h4>
            </div>
            <form onSubmit={saveName} >
                <div className="rii" style={{backgroundColor:" white",marginLeft: "1rem",marginTop: "5rem"}}>
                    <input name="firstName" value={namee.firstName}  placeholder="Enter first name" onChange={handleInput}style={{width: "400px",height:"30px", wordSpacing:" 10px",fontSize: "15px",letterSpacing:" 2px",marginBottom: "1rem"}}/>
                    <br/>
                    <input name="lastName" value={namee.lastName} placeholder="Enter last name" onChange={handleInput} style={{width: "400px",height:"30px", wordSpacing:" 10px",fontSize: "15px",letterSpacing:" 2px",marginBottom: "1rem"}}/>
                    <br/>
                    <input name="mobile" value={namee.mobile}  placeholder="Mobile Number"onChange={handleInput}style={{width: "400px",height:"30px", wordSpacing:" 10px",fontSize: "15px",letterSpacing:" 2px",marginBottom: "1rem"}} />
                    <br/>
                    <input name="mail" value={namee.mail} placeholder="mail"onChange={handleInput}style={{width: "400px",height:"30px", wordSpacing:" 10px",fontSize: "15px",letterSpacing:" 2px",marginBottom: "1rem"}} />
                 </div>
                    <hr/>
                    <h5 style={{color: "#858585"}}>By continuing, you agree to Flipkart's <span style={{color: "#2874f0"}}>Terms of Use</span>  and <span style={{color: "#2874f0"}}>privacy Policy</span> .</h5>

                    <button type='submit' style={{backgroundColor: "orangered",width: "500px",height: "50px",color:" white"}}>
                      Register
                    </button>
                    
                   

            </form>
       
            
        </div>
    </div>
    </div>
  )
}

export default Login;
//<button type="submit" style={{backgroundColor: "orangered",width: "500px",height: "50px",color:" white"}}>
//`/haed/${id}`