import React ,{useState,useEffect}from 'react'
import { useCart } from 'react-use-cart'
import { Link } from 'react-router-dom'
import axios from 'axios';
import Nidivi from './Nidivi';
import {useParams} from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Cookies from 'js-cookie';
import { jwtDecode, InvalidTokenError } from 'jwt-decode';
import {  Navigate,useNavigate } from 'react-router-dom';
//import { response } from 'express';

const Cartlast = () => {

    const location = useLocation();
    const navigate=useNavigate();

    const [showDown,setShowDown]=useState(false)
    const [showDown1,setShowDown1]=useState(false)


    const [auth,setAuth]=useState(false)
  const [name,setName]=useState('')
  const [message,setMessage]=useState('')
 //const { userid } = useParams();
 const queryParams = new URLSearchParams(location.search);
 const userid = queryParams.get('userid');

    axios.defaults.withCredentials=true;
    useEffect(()=>{
  axios.get('http://localhost:3001/')//changed
  .then(res=>{
    if(res.data.status==="success"){
      setAuth(true);
      setName(res.data.name);
    }else{
      setAuth(false);
      setMessage(res.data.message)
    }
  })
    },[])
    
  
    //const[items,setItems]=useState([]);
   
    const [userData, setUserData] = useState({});
    const [dataa, setData] = useState([]);
    const [allProductsData,setAllProductsData] = useState([])
    const [productIds, setProductIds] = useState([]);
   useEffect(() => {  
    const fetchData = async () => {
       /* const tokens = localStorage.getItem('mytok');
        console.log('Token:', tokens);
        const token = JSON.parse(tokens);
        const userId = token[0]?.userid;
        console.log('User ID:', userId);*/
        
    try {
        
       
        console.log("Client UserID:", userid);
        const response = await axios.get(`http://localhost:3001/carrt?userid=${userid}`/*,{
            headers:{
                'Content-Type':'application/json',
                Authorization: 'Bearer' + localStorage.getItem(''),
            }}*/
        );
        console.log("API ", response);
        if (response.data && response.data.status === 'success') {
         // console.log(userId)
         
         setUserData(response.data.userData)
         setProductIds(response.data.productIds)
          console.log("o",response.data.userData)
          console.log("o",response.data.productIds)


          const productDetailsPromises = response.data.productIds.map(async (productId) => {
            try{
            const nidiviResponse = await axios.get(`http://localhost:3001/nidivi/getProductData?productId=${productId}`);
           // return nidiviResponse.data.productsData;
            console.log("Nidivi API ", nidiviResponse);
            if (nidiviResponse.data && nidiviResponse.data.status === 'success') {
                const productsData = nidiviResponse.data.productsData; 
                
                console.log("Products Data", productsData);
                return productsData ;
              } else {
                console.error("Error in Nidivi API response:", nidiviResponse.data.message);
                alert("Error in fetching product data. Check console for details.");
              }}
              catch(error){
                console.error("Error in fetching product data:", error.message);
            return null;
              }
            
          });
          const updatedAllProductsData = await Promise.all(productDetailsPromises);
        
          
          console.log("All Products Data", updatedAllProductsData.filter(Boolean));
        setAllProductsData(updatedAllProductsData.filter(Boolean));
        
        
         } else {
            console.error("Error in API response:", response.data.message);
            alert("Error in saving data. Check console for details.");
          }}
        
         catch (err) {
            console.error("Error in saving data:", err.message);
            alert('Error in saving data');
          }}
    
        fetchData();

      
   }, []);


   
   const updateItemQuantity = (productId, newQuantity) => {
    const updatedData = allProductsData.map((product) => {
      if (product.id === productId) {
        return { ...product, quantity: newQuantity };
      }
      return product;
    });

    setAllProductsData(updatedData);
  };

  
  const getLatestCartId = async () => {
    try {
      const response = await fetch(`http://localhost:3001/car?userid=${userid}`);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
  
      if (data.status === 'success') {
        const latestCartId = data.latestCartid;
        console.log(`Latest Cart ID for User ${userid}: ${latestCartId}`);
        console.log("id", latestCartId);
        const removeItem=async()=>{
          try{
          const deleteResponse = await axios.delete(`http://localhost:3001/carrt?cartid=${latestCartId}`);
          
  
          if (deleteResponse && deleteResponse.data && deleteResponse.data.status === "success") {
            console.log("Item removed successfully");
            console.log("cartid",latestCartId)
            navigate(`http://localhost:3000/cart?userid=${userid}`)
          } else {
            console.error("Error removing item:", deleteResponse.data.message || "Unknown error");
          }
        } catch (deleteError) {
          console.error("Error removing item:", deleteError.message || "Unknown error");
        }
        }
  /*
        try {
          // Make the second API call using axios
          const deleteResponse = await axios.delete(`http://localhost:3001/carrt?cartid=${latestCartId}`);
          
  
          if (deleteResponse && deleteResponse.data && deleteResponse.data.status === "success") {
            console.log("Item removed successfully");
            console.log("cartid",latestCartId)
          } else {
            console.error("Error removing item:", deleteResponse.data.message || "Unknown error");
          }
        } catch (deleteError) {
          console.error("Error removing item:", deleteError.message || "Unknown error");
        }*/
  
        return latestCartId;
      } else {
        console.error(`Error: ${data.message}`);
        return null;
      }
    } catch (error) {
      console.error('Fetch error:', error);
      return null;
    }
  };
  
 

  


const removeItem=async()=>{
  const latestCartId = await getLatestCartId();
  console.log("cartid",latestCartId)
  if (latestCartId !== null) {
  try{
const response = await axios.delete(`http://localhost:3001/carrt?cartid=${latestCartId}`);
if(response.data.status === "success"){
  console.log("item removed successfully");
  navigate('/haed')
}
else{
  console.error("Error removing item:", response.data.message);
}
}catch(error){
  console.error('Error in removeItem:', error);
}
}
else {
  console.error('Unable to get latestCartId. Item removal aborted.');
}}
  return (
    <div>
        <section className='py-4 container'>
        <div className='row justify-content-center'>
        <div className='col-12'>
        <table className='table table-light table-hover m-0'>
        <tbody>
        {allProductsData.map((product, index) => (
            <div key={index}>
                <td>
                <img src={product[0]?.imagedata} style={{ height: '6rem' }} alt="Product" />

                </td>
                <td> {product[0]?.title}</td>
                <td>{product[0]?.price}</td>
                <td style={{border:'1px solid black'}}>{product[0]?.quantity} </td>
                <td>
                                <button 
                                 className='btn btn-info ms-2'
                                 onClick={()=>updateItemQuantity(product[0]?.userid,product[0]?.quantity-1)}
                                 >-

                                </button>
                                <button 
                                className='btn btn-info ms-2'
                                onClick={()=>updateItemQuantity(product[0]?.userid,product[0]?.quantity+1)}
                                >
                                    +</button>
                                    <button
                                    className='btn btn-info ms-2'
                                    onClick={()=>removeItem(product[0].userid)}
                                    >Remove item

                                    </button>
                            </td>
               
            </div>
        ))}
        </tbody>

        </table>

        </div>

        </div>

        </section>
        

         
    </div>
  )
}

export default Cartlast

/*import React,{useEffect,useState} from 'react'
import { useCart } from 'react-use-cart'
import axios from 'axios';
import { Link } from 'react-router-dom'
import {useParams} from 'react-router-dom';


const Cartlast = () => {



//    const { id } = useParams();
    
    const [auth,setAuth]=useState(false)
  const [name,setName]=useState('')
  const [message,setMessage]=useState('')


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
    }
  })
    },[])
   /*console.log("Cart items:", items);
    if (Object.keys(items).length === 0) {
        console.log("The cart is empty.");
    } else {
        console.log("The cart is not empty.");
    }*/


    /*const [showDown,setShowDown]=useState(false)
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



    const {
        id,
        isEmpty,
        totalUniqueItems,
        items,
        totalItems,
        cartTotal,
        updateItemQuantity,
        removeItem,
        emptyCart    
        }=useCart();
        if(isEmpty) return<h1 className='text-center'>your cart is empty</h1>
  return (
   <div>
        {auth ? (
        <>
        <div>
         <section className='py-4 container'>
        <div className='row justify-content-center'>
            <div className='col-12'>
                <h5>cart ({totalUniqueItems})</h5>
                <table className='table table-light table-hover m-0'>
                    <tbody>
                    {items.map((item,id)=>{
                        return(
                        <tr key={id}>
                            <td>
                            <img src={item.imagedata} style={{ height: '6rem' }} alt="Product" />

                            

                            </td>
                            <td>{item.title}</td>
                            <td>{item.price}</td>
                            <td>
                                <button 
                                 className='btn btn-info ms-2'
                                 onClick={()=>updateItemQuantity(item.id,item.quantity-1)}
                                 >-

                                </button>
                                <button 
                                className='btn btn-info ms-2'
                                onClick={()=>updateItemQuantity(item.id,item.quantity+1)}
                                >
                                    +</button>
                                    <button
                                    className='btn btn-info ms-2'
                                    onClick={()=>removeItem(item.id)}
                                    >Remove item

                                    </button>
                            </td>

                        </tr>
                        )
                    })}

                    </tbody>
                    

                </table>

            </div>
        </div>
        <div className='col-auto ms-auto'>
            <h2>total price:{cartTotal}</h2>

        </div>

    </section>
    </div>
    </>
         ) : (

            <>
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
    

    
    <hr style={{width:"1120px",position:"relative",left:"12.5rem",border:"6px solid #F0F0F0"}}/>
   <div style={{padding:"0.5rem 10rem",border:"2px solid #F0F0F0"}} />
   
    <div  className='da'>
               
            
                <div className="up1"   >
                
                <img alt="up"src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90" style={{height: "200px",width: "250px"}}/>
                <div><h3>Missing cart items?</h3></div>
                
                <div style={{padding:"1rem 0rem"}}>Login to see the items you added previously</div>
                <button style={{padding:"0.5rem 3.5rem",backgroundColor:"#FB641B"}}>
                    <Link to="/log" style={{color:"white",textDecoration:"none"}}>
                    Login
                    </Link>
                    </button>
            </div>


             
            
            
            

   

    </div>
   
    
   
     </div>



            
    </>
            
            ) 
         }
       
    </div>
   
  )
}

export default Cartlast*/
