import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Products from './Products'
import { Link } from 'react-router-dom';
import { useCart } from 'react-use-cart'
import {  Navigate,useNavigate } from 'react-router-dom';
import axios from 'axios'
import Cookies from 'js-cookie';
import { useLocation } from 'react-router-dom';

import { useGlobalState } from '../GlobalStateContext.js';
import {useThirdGlobalState} from '../SecondGlobalStateContext.js'

 
  const Nidivi = ({  quantity }) => {//props
   
    const navigate=useNavigate();
    const [userid, setUserid] = useState(null);
    const [name,setName]=useState('');
    const [auth,setAuth]=useState(false);
    const location = useLocation();
    const [userId, setUserId] = useState(null);
    /*axios.defaults.withCredentials=true;
    const[datsa,setDatsa]=useState([])
    useEffect(()=>{

      fetch('http://localhost:3001/test', {
     method: 'POST', 
     headers: {
  'Content-Type': 'application/json', 
},
     
})
  .then((response)=>response.json())
  .then((datsa) => {
    localStorage.setItem("mytok",JSON.stringify(datsa))
      console.log("name",datsa);
  
   
      setDatsa(datsa);//dataa

     
    })
  .catch((err)=>console.log(err))

  },[])


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

  }, [location.state]);*/


  const { login } = useGlobalState();
  const { register, userDta } = useThirdGlobalState();
  const { userData } = useGlobalState();
  const userIdd = userData && userData.length > 0  ? userData[0].userid : '' ;

    useEffect(()=>{
      const fetchUserid = async () =>{
        try{


          if (login) {
            setUserid(userIdd);
            console.log("idddd",userIdd)
          }else   {
            const response = await axios.get(`http://localhost:3001/testt`);
          if(response.data.status === 'success'){
          
           setUserid(response.data.userid)
           
          }else{
            console.error('Error fetching userid:', response.data.message);
          }

          }

          
        }

      
      catch(error) {
        console.error('Error fetching productid:', error.message);
      }
    }//
  fetchUserid();
  
},[login,register,userDta,userData])
  


    const [productid, setProductid] = useState(null);
    useEffect(()=>{
     const fetchProductid = async () => {
       try{
         const response = await axios.get(`http://localhost:3001/nidivi/${id}`);
         if(response.data.status === 'success'){
           setProductid(response.data.post.id)
          
         }else{
           console.error('Error fetching productid:', response.data.message);
         }
       }
     catch(error) {
       console.error('Error fetching productid:', error.message);
     }
   }
   fetchProductid();
    },[])

    const handleAddToCart = async (e) => {
      e.preventDefault();
      //const userId=Cookies.get('userid')
      const dataa = {
        userid,//:userId,
        productid,//:productid,
        quantity: 1,
      };
    
      try {
        console.log('Sending request with data:', dataa);
        const response = await axios.post('http://localhost:3001/addcart', dataa);
    
        console.log("API Response:", response);
    
        if (response.data && response.data.status === 'success') {
         // console.log(userId)
          alert(response.data.message);
        
            if(userid){
              const redirectUrl = `/cart?userid=${userid}`;
              console.log("Redirecting to:", redirectUrl);
              navigate(redirectUrl)/*, {
                state: {
                  title: post.title,
                  price: post.price,
                  imagedata: post.imagedata
                 // userid: response.data.userid,
               },
             }*/
             //);
            }
 
          
             } else {
          console.error("Error in API response:", response.data.message);
          alert("Error in saving data. Check console for details.");
        }
      } catch (err) {
        console.error("Error in saving data:", err.message);
        alert('Error in saving data');
      }
      }



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



    //const ddataId=dataa.length>0?dataa[dataa.length-1].lastName:null;


 
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




    //

    const { id } = useParams();
    //const navigate = useNavigate();
    const [post, setPost] = useState(null);

    /*const handleAddToCart=()=>{

    
      const { imagedata, title, price } = post;
      addItem({
        id,  // Assuming you want to add the 'id' of the post
        imagedata,
        title,
        price,
      }
        
        );
      // Redirect to the cart page after adding to cart
     // return <Navigate to={'/cartlast' }/>;
    }*/
    


    const { addItem } = useCart();
//this is for product

    useEffect(() => {
  
        console.log('ID in Nidivi component:', id);

        fetch(`http://localhost:3001/nidivi/${id}`)
          .then(response => response.json())
          .then(data => {
            console.log('Fetched data:', data);
            setPost(data.post); 
          })
          
          .catch(error => console.error('Error fetching post details:', error));
      }, [id]);
    
    
      if (!post) {
        return <p>Loading...</p>;
      }

      const initPayment = (data) => {
        const options = {
          key: "rzp_test_rw1UBtCbVaqbEe",
          amount: data.amount,
          //currency: data.currency,
          title: post.title,
         // description: post.desc,
          imagedata: post.imagedata,
          //order_id: data.id,
          handler: async (response) => {
            try {
              const verifyUrl = "http://localhost:3001/api/payment/verify";
              const { data } = await axios.post(verifyUrl, response);
              console.log(data);
            } catch (error) {
              console.log(error);
            }
          },
          theme: {
            color: "#3399cc",
          },
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      };


      const handlePayment = async () => {
        console.log("yooo")
        try {
          const orderUrl = "http://localhost:3001/api/payment/orders";
          const { data } = await axios.post(orderUrl, { amount: post.price });
          console.log(data);
         initPayment(data.data);
        } catch (error) {
          console.log(error);
        }
      };

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

  return (
    <div style={{height:"100vh"}}>
      <div className="headd">
      <div className="left">
            <div className="one">
                <div className="flip">
                    <a href="http://localhost:3000/">flipkart</a> 
                </div>
                <div className="explore" style={{display:"flex"}}>
                    <a href="http://localhost:3000/" >Explore <span>Plus</span></a>
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
                    <a href="#">
                        <li style={{alignItems: "center",position:"relative",right:"2.1rem",top:"3rem"}}>
                            <div className="lii" style={{width:"250px",display:"flex",justifyContent:"space-between"}}>
                            <img style={{position:"relative",left:"20px"}}alt="Description" src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/profile-815786.svg"/> 
                            <div onClick={handleLogout} style={{position:"relative",right:"135px"}}>Logout </div>
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
    
  <div style={{position:"relative",top:"7rem"}}>
    


  <section className='py-4 container' style={{display:'flex'}}>
<div className='row justify-content-center ' >
   
<div className='col-12'  >
  <div style={{border:"3px solid gary"}}>   
  <img src={post.imagedata}  style={{ height: '23rem', padding: '1rem', width: '21rem' }} />


  </div >
    
  </div>
  <div style={{display:"flex"}}>


  <button onClick={handlePayment} class="btn btn-warning" style={{marginRight:"1rem",marginLeft:"1rem",padding:"0.9rem 2rem"}}>Buy Now</button>
  <Link to={{
  pathname: '/cart',
  state: {
    title: post.title,
    price: post.price,
    imagedata: post.imagedata,
    //userid: userData.userid,
  }
}}>
    <button
      className="btn btn-success" style={{marginRight:"1rem",marginLeft:"0.5rem",padding:"0.9rem 1.5rem"}}
      onClick={handleAddToCart}//onClick={() => handleAddToCart(props.item)}
    >
      Add to cart
    </button>
  </Link>
  </div>
</div>
<div className='card-body ' style={{ height: '7rem' }}>
      <h5 className="card-title" style={{position:"relative",right:"21rem",top:"0.7rem",fontSize:"24px"}} >{post.title}</h5>
      
      <p style={{position:"relative",right:"34.7rem",top:"1.2rem",fontSize:"24px"}} ><b>₹ {post.price}</b></p>
      <p style={{position:"relative",right:"32.5rem",top:"1rem",fontSize:"17px"}} ><b>{post.description}</b></p>
      
      <div style={{display:"flex"}}>
        <img src="https://rukminim2.flixcart.com/www/36/36/promos/30/07/2019/79f48e86-8a93-46ab-b45a-5a12df491941.png?q=90" style={{height:"18px",width:"18px",marginTop:"1.25rem",position:"relative",right:"13.4rem"}} />
        <p style={{position:"relative",top:"1rem",right:"12rem",fontSize:"17px"}} >{post.descri}</p>
      </div>
      <p style={{position:"relative",right:"32.5rem",top:"1rem",fontSize:"17px"}} ><b>{post.descrip}</b></p>
      <div style={{display:"flex"}}>
        <img src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" style={{height:"18px",width:"18px",marginTop:"1.25rem",position:"relative",right:"13.4rem"}}   />
        <p style={{position:"relative",right:"13rem",top:"1rem",fontSize:"17px"}}>{post.descript}</p>
      </div>
      <div style={{display:"flex"}}>
      <img src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" style={{height:"18px",width:"18px",marginTop:"1.25rem",position:"relative",right:"13.4rem"}}   />
      <p style={{position:"relative",right:"12.6rem",top:"1rem",fontSize:"17px"}}>{post.description1}</p>
      </div>
      <div style={{display:"flex"}}>
      <img src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" style={{height:"18px",width:"18px",marginTop:"1.25rem",position:"relative",right:"13.4rem"}}   />
      <p style={{position:"relative",right:"12.5rem",top:"1rem",fontSize:"17px"}}>{post.description2}</p>
      </div>
      
 </div>
</section>



    
  </div>
  </div>
  )
}
export default Nidivi;

/*
{post.map((item, id) => (
            <div key={id}>
              <Products
                imagedata={item.imagedata}
                title={item.title}
                desc={item.desc}
                price={item.price}
                item={item}
              />
            </div>
          ))}*/ 



/*<section className='py-4 container' style={{display:'flex'}}>
<div className='row justify-content-center ' >
   
<div className='col-12'  >
  <div style={{border:"3px solid gary"}}>   
  <img src={post.imagedata}  style={{ height: '23rem', padding: '1rem', width: '20rem' }} />


  </div >
    
  </div>
  <Link to='/cart'>
    <button
      className="btn btn-success"
      onClick={handleAddToCart}//onClick={() => handleAddToCart(props.item)}
    >
      Add to cart
    </button>
  </Link>
</div>
<div className='card-body ' style={{ height: '7rem' }}>
      <h5 className="card-title" style={{position:"relative",right:"16rem",top:"0.7rem",fontSize:"20px"}} >{post.title}</h5>
      
      <p style={{position:"relative",right:"26.5rem",top:"1.2rem",fontSize:"24px"}} ><b>₹ {post.price}</b></p>
      <p style={{position:"relative",right:"24.5rem",top:"1rem",fontSize:"17px"}} ><b>{post.description}</b></p>
      
      <div style={{display:"flex"}}>
        <img src="https://rukminim2.flixcart.com/www/36/36/promos/30/07/2019/79f48e86-8a93-46ab-b45a-5a12df491941.png?q=90" style={{height:"18px",width:"18px",marginTop:"1.25rem",position:"relative",right:"1.8rem"}} />
        <p style={{position:"relative",top:"1rem",right:"1rem",fontSize:"17px"}} >{post.descri}</p>
      </div>
      <p style={{position:"relative",right:"24.5rem",top:"1rem",fontSize:"17px"}} ><b>{post.descrip}</b></p>
      <div style={{display:"flex"}}>
        <img src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" style={{height:"18px",width:"18px",marginTop:"1.25rem",position:"relative",right:"1.8rem"}}   />
        <p style={{position:"relative",right:"1.4rem",top:"1rem",fontSize:"17px"}}>{post.descript}</p>
      </div>
      <div style={{display:"flex"}}>
      <img src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" style={{height:"18px",width:"18px",marginTop:"1.25rem",position:"relative",right:"1.8rem"}}   />
      <p style={{position:"relative",right:"2.3rem",top:"1rem",fontSize:"17px"}}>{post.description1}</p>
      </div>
      <div style={{display:"flex"}}>
      <img src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" style={{height:"18px",width:"18px",marginTop:"1.25rem",position:"relative",right:"1.8rem"}}   />
      <p style={{position:"relative",right:"1.3rem",top:"1rem",fontSize:"17px"}}>{post.description2}</p>
      </div>
      
 </div>
</section>*/



// <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/profile-52e0dc.svg"/>
//<a>{ddataId}</a>