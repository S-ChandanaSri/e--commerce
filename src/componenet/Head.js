import React,{useEffect,useState} from 'react'
import { Link, Navigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useGlobalState } from '../GlobalStateContext.js';
import {useThirdGlobalState} from '../SecondGlobalStateContext.js'
//import { useThirdGlobalState } from '../SecondGlobalStateContext.js';
import Products from './Products'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom';
//import jwt from 'jsonwebtoken';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { useCookies } from 'react-cookie';
import { relative } from 'path';

//import 'bootstrap/dist/css/bootstrap.min.css';


//import jwtDecode from 'jwt-decode';


const Head = () => {

const { userData } = useGlobalState();
const lastName = userData && userData.length > 0  ? userData[0].lastName : '' ;

const { userDta } = useThirdGlobalState();
const lastNme =   userDta && userDta.length > 0  ? userDta : '';

console.log("userDta:", userDta);
  console.log("lastName:", lastNme);
//console.log("userData:", userData);
 // console.log("lastName:", lastName);

    const [dataa, setDataa] = useState([]);
    const [cookies] = useCookies(['token', 'userid']);
    const [auth,setAuth]=useState(false)
  const [name,setName]=useState('')
  const [message,setMessage]=useState('')
  const location = useLocation();
  const navigate=useNavigate();
  const [datta,setDatta] = useState([])



  




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
       

    const [userId, setUserId] = useState(null);
    axios.defaults.withCredentials=true;
    useEffect(()=>{
    
            axios.get('http://localhost:3001/')
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
      



    useEffect(()=>{

        fetch('http://localhost:3001/test', {
       method: 'POST', 
       headers: {
    'Content-Type': 'application/json', 
  },
       
})
    .then((response)=>response.json())
    .then((dataa) => {
        //localStorage.setItem("mytok",JSON.stringify(dataa))
        console.log("name",dataa);
    
     
        setDataa(dataa);
       

       
      },[dataa])
    .catch((err)=>console.log(err))

    },[])


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


    const { login } = useGlobalState();
    const {register} = useThirdGlobalState();
    const [userid, setUserid] = useState(null);
   // const { userData } = useGlobalState();
  const userIdd = userData && userData.length > 0  ? userData[0].userid : '' ;


  useEffect(()=>{

    if (login) {
        setUserid(userIdd);
        console.log("idddd",userIdd)
      }
  },[login,userIdd])
    
  
  return (
    <div>
        
      <div className="headd" style={{position:"absolute",zIndex:"1",position:"fixed"}} >
      <div className="left">
            <div className="one">
                <div className="flip">
                    <a href="http://localhost:3000/">flipkart</a> 
                </div>
                <div className="explore" style={{display:"flex"}}>
                    <a href="http://localhost:3000/">Explore <span>Plus</span></a>&nbsp;
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
        <div className="right" >
        {auth ? (
        <>
            <div className="seller">
                <a href="http://localhost:3000/seller">
                    <img className="house" alt="Description " src='https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/Store-9eeae2.svg'  /> 

                </a>

            </div>
            <div className="sign" style={{display:"flex"}} >
                



                   {register ? (
                    
                    <button style={{display:"flex"}}>
                        <label htmlFor="checkBtn">
                    <div className="signin" style={{display:"flex"}} >
                        <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/profile-52e0dc.svg"/>
                       {lastNme}
                       </div>
                        
                        </label>
                              
                    </button>
                    
              ):(
                    <Link to = "/"></Link>
                   ) }


                    

{login ? (
  <button style={{display:"flex"}}>
    <label htmlFor="checkBtn">
        <div className="signin" style={{display:"flex"}} >
    <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/profile-52e0dc.svg"/>
    {lastName}
    </div>
                        
        </label>

  </button>
):(
  <Link to="/"></Link>
)}

<img alt="Description " style={{position:"relative",top:"0.2rem"}} src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTEiIHZpZXdCb3g9IjAgMCAxNCAxMSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgZmlsdGVyPSJ1cmwoI2ZpbHRlcjBfZF80OTc0Xzc1OTY5KSI+CjxwYXRoIGQ9Ik0zIDJMNyA2TDExIDIiIHN0cm9rZT0iIzExMTExMiIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L2c+CjxkZWZzPgo8ZmlsdGVyIGlkPSJmaWx0ZXIwX2RfNDk3NF83NTk2OSIgeD0iMC4yNSIgeT0iMC4yNSIgd2lkdGg9IjEzLjUiIGhlaWdodD0iOS44MTI1IiBmaWx0ZXJVbml0cz0idXNlclNwYWNlT25Vc2UiIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0ic1JHQiI+CjxmZUZsb29kIGZsb29kLW9wYWNpdHk9IjAiIHJlc3VsdD0iQmFja2dyb3VuZEltYWdlRml4Ii8+CjxmZUNvbG9yTWF0cml4IGluPSJTb3VyY2VBbHBoYSIgdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDEyNyAwIiByZXN1bHQ9ImhhcmRBbHBoYSIvPgo8ZmVPZmZzZXQgZHk9IjEiLz4KPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMSIvPgo8ZmVDb2xvck1hdHJpeCB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMC4xNiAwIi8+CjxmZUJsZW5kIG1vZGU9Im5vcm1hbCIgaW4yPSJCYWNrZ3JvdW5kSW1hZ2VGaXgiIHJlc3VsdD0iZWZmZWN0MV9kcm9wU2hhZG93XzQ5NzRfNzU5NjkiLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbj0iU291cmNlR3JhcGhpYyIgaW4yPSJlZmZlY3QxX2Ryb3BTaGFkb3dfNDk3NF83NTk2OSIgcmVzdWx0PSJzaGFwZSIvPgo8L2ZpbHRlcj4KPC9kZWZzPgo8L3N2Zz4K"/>

                <input type="checkbox" id="checkBtn"  />
                <ul id="listing" style={{backgroundColor:" white"}}>
                
                
               
                    &nbsp;
                    
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
                            <div onClick={handleLogout} style={{position:"relative",right:"123px"}}>Logout</div>
                            </div>
                        
                        </li>
                        
                    </a>
                </ul>
                
     
            </div>
            <div className="cart">
            <Link to={ `/cart?userid=${userIdd}`}>
                  <a style={{display:"flex"}}>
                        <img alt="Description " src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/header_cart-eed150.svg"/> Cart
                        </a>
            </Link>
                   
                
 
        </div>
        </>
         ) : (
            <>
      <div className="seller" >
                <a href="http://localhost:3000/seller"  style={{display:"flex"}}>
                    <img className="house" alt="Description " src='https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/Store-9eeae2.svg' style={{fontSize:"20px"}} />

                </a>

            </div>
            <div className="sign" >
                <label htmlFor="checkBtn" >
                    <div className="signin" style={{display:"flex"}}>
                        <img alt="signin" style={{fontSize:"20px"}} src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/profile-815786.svg"/> Sign in &nbsp;
                        
                        <img alt="Description " style={{position:"relative",top:"0.2rem"}} src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTEiIHZpZXdCb3g9IjAgMCAxNCAxMSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgZmlsdGVyPSJ1cmwoI2ZpbHRlcjBfZF80OTc0Xzc1OTY5KSI+CjxwYXRoIGQ9Ik0zIDJMNyA2TDExIDIiIHN0cm9rZT0iIzExMTExMiIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L2c+CjxkZWZzPgo8ZmlsdGVyIGlkPSJmaWx0ZXIwX2RfNDk3NF83NTk2OSIgeD0iMC4yNSIgeT0iMC4yNSIgd2lkdGg9IjEzLjUiIGhlaWdodD0iOS44MTI1IiBmaWx0ZXJVbml0cz0idXNlclNwYWNlT25Vc2UiIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0ic1JHQiI+CjxmZUZsb29kIGZsb29kLW9wYWNpdHk9IjAiIHJlc3VsdD0iQmFja2dyb3VuZEltYWdlRml4Ii8+CjxmZUNvbG9yTWF0cml4IGluPSJTb3VyY2VBbHBoYSIgdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDEyNyAwIiByZXN1bHQ9ImhhcmRBbHBoYSIvPgo8ZmVPZmZzZXQgZHk9IjEiLz4KPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMSIvPgo8ZmVDb2xvck1hdHJpeCB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMC4xNiAwIi8+CjxmZUJsZW5kIG1vZGU9Im5vcm1hbCIgaW4yPSJCYWNrZ3JvdW5kSW1hZ2VGaXgiIHJlc3VsdD0iZWZmZWN0MV9kcm9wU2hhZG93XzQ5NzRfNzU5NjkiLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbj0iU291cmNlR3JhcGhpYyIgaW4yPSJlZmZlY3QxX2Ryb3BTaGFkb3dfNDk3NF83NTk2OSIgcmVzdWx0PSJzaGFwZSIvPgo8L2ZpbHRlcj4KPC9kZWZzPgo8L3N2Zz4K"/>

                    </div>
                        
                </label>
                <input type="checkbox" id="checkBtn"  />
                <ul id="listing" style={{backgroundColor:" white"}}>
                <a href="#"  ><span style={{color:"black",fontSize:"16px",position:"relative",right:"2.5rem",top:"0.5rem"}} >New Coustomer?</span> 
                
                <span> 
                <Link to={{pathname:'/loogin',state:{isLogin: true}}} style={{color:"blue",position:"relative",fontSize:"16px",top:"0.5rem"}}>sign up</Link>
                
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
                        <li style={{alignItems: "center",position:"relative",right:"2.1rem",top:"2rem",zIndex:"+1"}}>
                            <div className="lii" style={{width:"250px",display:"flex",justifyContent:"space-between"}}>
                            <img style={{position:"relative",left:"20px"}}alt="Description " src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/rewards-fbd212.svg"/> 
                            <div style={{position:"relative",right:"135px"}}>Rewards</div>
                            </div>
                            
                        </li>

                    </a>
                    <a href="#">
                        <li style={{alignItems: "center",position:"relative",right:"2.1rem",top:"2.5rem",zIndex:"+1"}}>
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



        
     
    
    <div className="main" >
        <div className="first" style={{objectFit: "contain",marginBottom:"1rem",paddingBottom:"1rem"}}>
            <div className="onlyboxes">
                <div className="firstone" style={{padding:"1rem"}}>
                    <a href="#">
                        <img alt="Description" src="https://rukminim1.flixcart.com/fk-p-flap/80/80/image/bfcdffe68a4a77e6.jpg?q=100" style={{position:"relative",top:"0.5rem"}}/>
                        <br/>
                        <span style={{position:"relative",bottom:"0.3rem",right:"0.3rem"}}>Offers</span>
                    </a>
                </div>
                <div className="secondone" style={{padding:"1rem"}}>
                    <a href="#">
                        <img alt="Description" src="https://rukminim1.flixcart.com/fk-p-flap/80/80/image/20e8d27f8c49a312.jpg?q=100"style={{position:"relative",top:"0.5rem",left:"1rem"}}/>
                        <br/>
                        <span style={{position:"relative",bottom:"0.3rem",right:"0.6rem"}}>Mobiles & Tablets</span>
                    </a>
                </div>
                <div className="thirdone" style={{padding:"1rem"}}>
                    <a href="#">
                        <img alt="Description" src="https://rukminim1.flixcart.com/fk-p-flap/80/80/image/9015804c95cf223d.jpg?q=100"style={{position:"relative",top:"0.5rem"}}/>
                        <br/>
                        <span style={{position:"relative",bottom:"0.3rem"}} >Electronics</span>
                    </a>
                </div>
                <div className="fourthone " style={{padding:"1rem"}}>
                    <a href="#">
                        <img alt="Description" src="https://rukminim1.flixcart.com/fk-p-flap/80/80/image/9536c6d9d8d6f214.jpg?q=100"style={{position:"relative",top:"0.5rem",left:"1.5rem"}}/>
                        <br/>
                        <span style={{position:"relative",bottom:"0.3rem",right:"0.1rem"}}>TV's & Appliances</span>
                    </a>
                </div>
                <div className="fifthone" style={{padding:"1rem"}}>
                    <a href="#">
                        <img alt="Description" src="https://rukminim1.flixcart.com/fk-p-flap/80/80/image/9d6cf33034f3ad5d.jpg?q=100"style={{position:"relative",top:"0.5rem"}}/>
                        <br/>
                        <span style={{position:"relative",bottom:"0.3rem"}}>Fashion</span>
                    </a>
                </div>
                <div className="sixthone" style={{padding:"1rem"}}>
                    <a href="#">
                        <img alt="Description" src="https://rukminim1.flixcart.com/fk-p-flap/80/80/image/3a99ad45162dae20.jpg?q=100"style={{position:"relative",top:"0.5rem"}}/>
                        <br/>
                        <span style={{position:"relative",bottom:"0.3rem"}}>Beauty</span>
                    </a>
                </div>
                <div className="seventhone" style={{padding:"1rem"}}>
                    <a href="#">
                        <img alt="Description" src="https://rukminim1.flixcart.com/fk-p-flap/80/80/image/7271d36081369b1b.jpg?q=100"style={{position:"relative",top:"0.5rem"}}/>
                        <br/>
                        <span style={{position:"relative",bottom:"0.3rem"}}>Home & Kitchen</span>
                    </a>
                </div>
                <div className="eighthone" style={{padding:"1rem"}} >
                    <a href="#">
                        <img alt="Description" src="https://rukminim1.flixcart.com/fk-p-flap/80/80/image/f8f98743e2ad89f6.jpg?q=100"style={{position:"relative",top:"0.5rem"}}/>
                        <br/>
                        <span style={{position:"relative",bottom:"0.3rem"}}>Furniture</span>
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
        <div style={{display:"flex",background:"white"}}>
        <section className='py-4 container' >
        <div  style={{display:"flex", overflowX: "auto",overflowY:'hidden'}}>

<div style={{ width:"2000px"}} className='sty'>

        <div className='poin' style={{width:"2600px",display:"flex"}}>
        <div className='left-arrw'>
            <i class="fa-solid fa-chevron-left"></i>
            </div>
        {posts.map(post => (
        <div key={post.id}>
          <Link to={`/nidivi/${post.id}`}>
            
        <div  className="styi" style={{marginRight:"1rem",border:"1px solid black",width:"400px"}}>
          <img src={post.imagedata} alt="Product" className='card-img-top ' style={{height:"12rem",padding:"1rem",width:"17rem",position:"relative",left:"3.5rem"}} />
        <div className='card-body ' style={{height:"5rem"}} >
          <h5 className="card-title " style={{position:"relative" ,padding:"0.5rem 1.9rem" , color:"black" ,textDecoration:"underline", textDecorationColor: "white"}}>{post.title}</h5>
        </div>
        </div>
          </Link>
          
        </div> 
      ))}
      <div className='right-arrw'>
            <i class="fa-solid fa-angle-right"></i>
          
          </div>
       
       </div>
       
       </div>
       
       
        </div>
      </section>
      
    </div>
            

        </div>





        <div className="fourth">
            <div className="ii">
                <img  alt="Description" className="iii" src="https://rukminim1.flixcart.com/fk-p-flap/1000/90/image/9ee27aa0c23e89ac.jpg?q=20"/>
            </div>
        </div>
       
        <div className="third" >
                <div className="best"style={{height:"70px", padding:"1.5rem 0rem",position:"relative",right:"41rem",fontWeight: "600",fontSize: "20px",lineHeight: "28px",fontFamily: "inter_semi_bold,fallback-inter_semi_bold,Arial,sans-serif"}} >Best Mobile</div> 
                
                

                
                    <div className='scrolls ' style={{display:"flex",overflowX:"auto"}} >
                        <div className='left-arrow'>
                        <i class="fa-solid fa-chevron-left"></i>
                        </div>
                        <div className="bb" style={{marginLeft: "1rem",width:"1460px",paddingLeft:"1rem",paddingRight:"1rem"}}>
                            <a href="http://localhost:3000/sam" style={{position:"relative" ,top:"1.5rem"}} >
                                <div className="mobile1" >
                                    <img alt="Description"   src="https://rukminim1.flixcart.com/image/170/170/xif0q/mobile/b/h/c/-original-imagth5xwrg4gfyp.jpeg?q=90"   width="180px" height="190px"/>
                                </div>
                                <div className="name1" style={{paddingTop:"1.5rem"}}  > Samsung S22 5G</div>
                                <div className="name2" >incl of offers</div>
                            </a>
                        </div>
                        <div className="bb" style={{padding:"1rem",paddingLeft:"0.5rem"}}>
                            <a href="#" >
                                <div className="mobile1" style={{width:"180px", height:"170",paddingTop:"0.5rem"}} >
                                    <img alt="Description" src="https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/z/b/d/-original-imagpgx48f4szdvf.jpeg?q=70&crop=false"  />
                                </div>
                                <div className="name1"  style={{paddingTop:"1rem"}} > Google Pixel 7</div>
                                <div className="name2" >incl of offers</div>
                            </a>
                        </div>
                        <div className="bb" style={{padding:"1rem",paddingLeft:"2rem"}}>
                            <a href="#" >
                                <div className="mobile1" style={{width:"190px", height:"170",paddingTop:"0.5rem"}} >
                                    <img alt="Description" src="https://rukminim1.flixcart.com/image/170/170/xif0q/mobile/3/a/x/f5-5g-mzb0e7kin-poco-original-imagpep3dcnkbxp4.jpeg?q=90"  />
                                </div>
                                <div className="name1" style={{paddingTop:"2rem"}}  > Poco F5 5G</div>
                                <div className="name2" >incl of offers</div>
                            </a>
                        </div>
                        <div className="bb" style={{padding:"1rem",paddingLeft:"1rem"}}>
                            <a href="#" >
                                <div className="mobile1" style={{width:"210px", height:"180",paddingTop:"0.5rem" }}>
                                    <img alt="Description" src="https://rukminim1.flixcart.com/image/170/170/xif0q/mobile/i/s/b/-original-imagrdefh2xgenzz.jpeg?q=90" />
                                </div>
                                <div className="name1" style={{paddingTop:"2rem"}}  > Nothing Phone </div>
                                <div className="name2" >incl of offers</div>
                            </a>
                        </div>
                        <div className="bb">
                            <a href="#" >
                                <div className="mobile1" style={{width:"210px" , height:"180",paddingTop:"1.7rem",paddingLeft:"2rem"}}>
                                    <img alt="Description" src="https://rukminim1.flixcart.com/image/170/170/xif0q/mobile/d/h/q/m6-pro-5g-mzb0eprin-poco-original-imags3e7vewsafst.jpeg?q=90"  />
                                </div>
                                <div className="name1" style={{paddingTop:"2rem"}}  > Poco M6 Pro</div>
                                <div className="name2" >incl of offers</div>
                            </a>
                        </div>
                        <div className="bb" style={{marginRight: "1rem",width:"210px" , height:"180",paddingTop:"1.7rem",paddingLeft:"1rem"}}>
                            <a href="#" >
                                <div className="mobile1" style={{width:"210px" , height:"180"}}>
                                    <img alt="Description" src="https://rukminim1.flixcart.com/image/170/170/xif0q/mobile/e/q/g/-original-imagtqqd4vcdzqdg.jpeg?q=90"  />
                                </div>
                                <div className="name1"  style={{paddingTop:"2rem"}} >Realme 11x 5G</div>
                                <div className="name2" >incl of offers</div>
                            </a>
                        </div>
                        <div className="bb" style={{marginRight:" 1rem",paddingTop:"2rem"}}>
                            <a href="#" >
                                <div className="mobile1"  style={{width:"210px" , height:"180",paddingLeft:"2rem"}}>
                                    <img alt="Description" src="https://rukminim1.flixcart.com/image/170/170/xif0q/mobile/b/r/f/-original-imaghkvuhzwge3za.jpeg?q=90" />
                                </div>
                                <div className="name1"  style={{paddingTop:"1.7rem"}}  > Redmi Note 12</div>
                                <div className="name2" >incl of offers</div>
                            </a>
                        </div>
                        <div className="bb" style={{marginRight: "1rem",paddingTop:"2rem"}}>
                            <a href="#" >
                                <div className="mobile1" style={{width:"210px" , height:"180",paddingLeft:"2rem"}}>
                                    <img alt="Description" src="https://rukminim1.flixcart.com/image/170/170/xif0q/mobile/l/8/d/-original-imagqadpnygfnn2v.jpeg?q=90" />
                                </div>
                                <div className="name1"  style={{paddingTop:"2rem"}}  > Realme 11 Pro 5G</div>
                                <div className="name2" >incl of offers</div>
                            </a>
                        </div>
                        <div className="bb" style={{marginRight: "1rem",paddingTop:"0.8rem"}}>
                            <a href="#" >
                                <div className="mobile1" style={{width:"180px" , height:"170",paddingLeft:"0.8rem"}}>
                                    <img alt="Description" src="https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/p/r/r/edge-40-neo-payj0002in-motorola-original-imagtkzh8zrvp3uj.jpeg?q=70&crop=false" />
                                </div>
                                <div className="name1"  style={{paddingTop:"0.9rem"}}  > M Edge</div>
                                <div class="name2" >incl of offers</div>
                            </a>
                        </div>
                        <div className='right-arrow'>
                        <i class="fa-solid fa-angle-right"></i>
                        </div>
                       
                    </div>
                </div>

       
       

    </div>
    
    <hr/>
    <div className="footer">
        <div className="bo2" style={{display:"flex"}}>
            <img alt="Description" src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/sell-image-9de8ef.svg"/>
            <a href="#" >Become a seller</a>
        </div>
        <div className="bo2" style={{display:"flex"}}>
            <img alt="Description" src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/advertise-image-866c0b.svg"/>
            <a href="#" >Advertise</a>
        </div>
        <div className="bo2" style={{display:"flex"}}>
            <img alt="Description" src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/gift-cards-image-d7ff24.svg"/>
            <a href="#" >Gift Card</a>
        </div>
        <div className="bo2" style={{display:"flex"}}>
            <img alt="Description" src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/gift-cards-image-d7ff24.svg"/>
            <a href="#" >Gift Card</a>
        </div>
        <div className="bo2" style={{display:"flex"}}>
            <img alt="Description" src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/help-centre-image-c4ace8.svg"/>
            
            <a href="#" >Help center</a>
        </div>
        <div className="bo2" style={{display:"flex"}}>
            <img alt="Description" src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/payment-method-c454fb.svg"/>
            
        </div>
    </div>
    </div>
  )
}

export default Head;
/*{location.state && (
                    <button>
                    <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/profile-52e0dc.svg"/>
                    {data && data.length > 0 && data[0].lastName}
                    </button>
                    )}*/
                    /*{location.state ? (
  <button>
    <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/profile-52e0dc.svg"/>
    {data && data.length > 0 ? data[0].lastName : null}
  </button>
) : (
  <Link to="/">Home</Link>
)}*/
/*{dataa.map((item) => (
                        <div key={item.id}>
                         {item.lastName}
                        
                       </div>
                          ))} 



                          <label htmlFor="checkBtn">
                    <div className="signin" >
                   {register ? (
                    <button style={{display:"flex"}}>
                        <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/profile-52e0dc.svg"/>
                       {lastNme} 
                       
                    </button>
              ):(
                    <Link to = "/"></Link>
                   ) }
                   


{login ? (
  <button style={{display:"flex"}}>
    <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/profile-52e0dc.svg"/>
    {lastName}

  </button>
):(
  <Link to="/"></Link>
)}


<img alt="Description "  src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTEiIHZpZXdCb3g9IjAgMCAxNCAxMSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgZmlsdGVyPSJ1cmwoI2ZpbHRlcjBfZF80OTc0Xzc1OTY5KSI+CjxwYXRoIGQ9Ik0zIDJMNyA2TDExIDIiIHN0cm9rZT0iIzExMTExMiIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L2c+CjxkZWZzPgo8ZmlsdGVyIGlkPSJmaWx0ZXIwX2RfNDk3NF83NTk2OSIgeD0iMC4yNSIgeT0iMC4yNSIgd2lkdGg9IjEzLjUiIGhlaWdodD0iOS44MTI1IiBmaWx0ZXJVbml0cz0idXNlclNwYWNlT25Vc2UiIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0ic1JHQiI+CjxmZUZsb29kIGZsb29kLW9wYWNpdHk9IjAiIHJlc3VsdD0iQmFja2dyb3VuZEltYWdlRml4Ii8+CjxmZUNvbG9yTWF0cml4IGluPSJTb3VyY2VBbHBoYSIgdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDEyNyAwIiByZXN1bHQ9ImhhcmRBbHBoYSIvPgo8ZmVPZmZzZXQgZHk9IjEiLz4KPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMSIvPgo8ZmVDb2xvck1hdHJpeCB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMC4xNiAwIi8+CjxmZUJsZW5kIG1vZGU9Im5vcm1hbCIgaW4yPSJCYWNrZ3JvdW5kSW1hZ2VGaXgiIHJlc3VsdD0iZWZmZWN0MV9kcm9wU2hhZG93XzQ5NzRfNzU5NjkiLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbj0iU291cmNlR3JhcGhpYyIgaW4yPSJlZmZlY3QxX2Ryb3BTaGFkb3dfNDk3NF83NTk2OSIgcmVzdWx0PSJzaGFwZSIvPgo8L2ZpbHRlcj4KPC9kZWZzPgo8L3N2Zz4K"/>

                        

                    </div>
                        
                </label>*/