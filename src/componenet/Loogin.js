import React,{useEffect, useState} from 'react';
import axios from 'axios'
import {Link, Navigate, useParams} from 'react-router-dom';
import {  useNavigate } from 'react-router-dom';

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {auth} from '../firebase/setup'
import { RecaptchaVerifier,signInWithEmailAndPassword,signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import OtpInput from "otp-input-react";
import { useLocation } from 'react-router-dom';
import { useGlobalState } from '../GlobalStateContext.js';
import {useThirdGlobalState} from '../SecondGlobalStateContext.js'
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Loogin = () => {
  const { loginUser } = useGlobalState();
  const {registerUser} = useThirdGlobalState();
  //const bcrypt = require('bcrypt');

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const [showPassword, setShowPassword] = useState(false);



    const location = useLocation();
    const { isLogin  } = location.state || { isLogin: true};

    const [isRegister, setIsRegister] = useState(false);

    

    //const navigate = useNavigate();
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
          //setLoading(false);
          if (exists) {
            setLoading(false);
            toast.success("exists")
            signInWithPhoneNumber(auth, formatPh,appVerifier)// 
              .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                //setLoading(false);
                setShowOTP(true);
                toast.success("OTP sent successfully!");
              })
              .catch((error) => {
                console.log(error);
                setLoading(false);
              });
         }else{
         
          
          setIsRegister(true);
          setLoading(false);
          
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
              const { userId, data,lastName } = res.data;
            console.log("Success");
            console.log("UserId:", userId);
            console.log("Data:", data);
            console.log("Dataname:", lastName);
            

            const postData = {
              userId: userId,
              userData: data
            };
            navigate('/', { state: { userId, data }});//changed
            loginUser(data,lastName)
            console.log("com2",data)
           axios.post('http://localhost:3001/tast', postData)
            .then(response => {
              console.log("Data sent to server successfully:", response.data);
             
            })
            .catch(error => {
              console.error("Error sending data to server:", error);
             
            });
    
            }
          })
        }catch(err)  {
            console.log(err);
            setLoading(false);
          };
        }




/*
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
    },[])*/
    const Navigate=useNavigate();
    const {userid}=useParams();
    const { isLoggedIn, login, logout } = useGlobalState();
    const [namee,setName]=useState({
        firstName:"",
        lastName:"",
        mobile:"",
        mail:"",
        password:""
    });

    const navigate=useNavigate();

    const handleInput=(e)=>{
        e.preventDefault();
        setName({...namee,[e.target.name]:e.target.value})
    }

    axios.defaults.withCredentials=true;
    const saveName= async (e)=>{
      e.preventDefault();

      //const hashedPassword = await bcrypt.hash(namee.password, 10);

      //login();
      const dataa={
        firstName:namee.firstName,
        lastName:namee.lastName,
        mobile:namee.mobile,
        mail:namee.mail,
        password:namee.password,
    };
    try {
        const response = await axios.post('http://localhost:3001/all', dataa,{ withCredentials: true });
        console.log("res", response);
        if (response.data.message === 'Mobile number already registered') {
        alert(response.data.message);
      } else {   
        alert(response.data.message);

        registerUser(response.data.lastName,response.data.userid)
   
        console.log("ee",response.data.userid,response.data.lastName)
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
//for search
  let [data,setData]=useState([])
  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((res)=>res.json())
    .then((data) => {
        console.log(data);

        setFiltered(data);
      })
    .catch((err)=>console.log(err))
    

},[])
    let [filtered,setFiltered]=useState([])
    const handleSearch=(value)=>{
        const res=filtered.filter((f)=>f.name.toLowerCase().includes(value))
        setData(res) 
        console.log(res)

    }




  return (


    <div style={{backgroundColor:"white"}}>
        <div className="headd " style={{position:"absolute",zIndex:"1",position:"fixed"}}>
        <div className="left" style={{ display:"flex", alignItems: "center", marginLeft:"5rem"}}>
            <div className="onee">
                <div className="flipp">
                    <a href="file:///C:/Users/asus/Documents/chinni/hi/all%20chinni%20files/flip/flipkart.html#">flipkart</a> 
                </div>
                <div className="exploree" style={{display:"flex"}}>
                    <a href="#">Explore <span style={{color:"orange"}}>Plus</span></a>&nbsp;
                    <img className="star" src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/plus-brand-bc165b.svg"/>
                </div>
            </div>
            <form style={{backgroundColor: "white"}}>
            <div className="search" style={{display:"flex"}}  >
                    
                    <i className="fa-solid fa-magnifying-glass" style={{padding:"0.5rem 0.5rem"}} ></i>
                    <input className="inn" style={{ border: "none" }}  placeholder="search for products,brands and more" onChange={e=>(handleSearch(e.target.value))} />

                  
                    
                    
                    <div className="recentsearch" style={{position:"absolute",top:"62px",width:"770px",height:"overflow",backgroundColor:"white",zIndex:"1"}} >
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
            <Link to={{pathname:"/",state:{isRegister: true}}} type='button' style={{color:"#2874F0",border:"2px solid black",padding:"0.5rem 2rem",backgroundColor:"white",textDecoration:"none"}}><b>Sign Up</b></Link>
            
        </div>
       

      </div>
      {isRegister && (
        
    <div className="doww" >
        <div className="foo" style={{position:" absolute",top:"100px",left:"300px",height:"550px",width:"800px",display: "flex",zIndex:"-1"}}>
          
        <div style={{width:"450px",height:"580px",position:"relative",backgroundColor:"#2874F0",top:"0rem"}}>
   <span style={{color:"white",fontSize:"28px",position:"relative",top:"3rem",right:"-1.5rem"}}><b>Login</b></span>
   
   <span style={{position:"relative",top:"7rem",color:"#DBDBDB",fontSize:"18px"}}>Get access to your Orders, Wishlist and Recommendations</span>
   </div>
            
            <form onSubmit={saveName} >
                <div className="rii" style={{backgroundColor:" white",marginLeft: "1rem",marginTop: "5rem"}}>
                    <input name="firstName" value={namee.firstName}  placeholder="Enter first name"   onChange={handleInput}style={{border:"1px solid black",width: "400px",height:"30px", wordSpacing:" 10px",fontSize: "15px",letterSpacing:" 2px",marginBottom: "1rem"}}/>
                    <br/>
                    <input name="lastName" value={namee.lastName} placeholder="Enter last name" onChange={handleInput} style={{border:"1px solid black",width: "400px",height:"30px", wordSpacing:" 10px",fontSize: "15px",letterSpacing:" 2px",marginBottom: "1rem"}}/>
                    <br/>
                    <input name="mobile" value={namee.mobile}  placeholder="Mobile Number"onChange={handleInput}style={{border:"1px solid black",width: "400px",height:"30px", wordSpacing:" 10px",fontSize: "15px",letterSpacing:" 2px",marginBottom: "1rem"}} />
                    <br/>
                    <input name="mail" value={namee.mail} placeholder="mail"onChange={handleInput}style={{border:"1px solid black",width: "400px",height:"30px", wordSpacing:" 10px",fontSize: "15px",letterSpacing:" 2px",marginBottom: "1rem"}} />
                    <br/>


          
                    <div style={{ position: 'relative', width: '400px' ,marginLeft: "2.7rem"}}>
      <input
        type={showPassword ? "text" : "password"} name="password" value={namee.password} placeholder="Password" onChange={handleInput} style={{border: "1px solid black",width: "400px",height: "30px",fontSize: "15px",paddingLeft: '30px' }}/>
     
      {showPassword ? (
        <FaEyeSlash
          onClick={() => setShowPassword(false)}
          style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', right: '5px', cursor: 'pointer' }}
        />
      ) : (
        <FaEye
          onClick={() => setShowPassword(true)}
          style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', right: '5px', cursor: 'pointer' }}
        />
      )}
    </div>
   
                    
                 </div>
                &nbsp;
                &nbsp;
                    <h5 style={{color: "#858585" , fontSize:"14px"}}>By continuing, you agree to Flipkart's <span style={{color: "#2874f0"}}>Terms of Use</span>  and <span style={{color: "#2874f0"}}>privacy Policy</span> .</h5>

                    <button type='submit' style={{backgroundColor: "orangered",width: "500px",height: "50px",color:" white",position:"relative",left:"1rem"}}>
                      Register
                    </button>
                    
                   

            </form>
       
            
        </div>
    </div>
      )}
   
   <div style={{display:"flex"}}>
   
   

    { isLogin &&  !isRegister &&(//!showOTP && 


/*
<div style={{width:"400px",height:"580px",position:"relative",left:"15.5rem",backgroundColor:"#2874F0",top:"7rem"}}>
   <span style={{color:"white",fontSize:"28px",position:"relative",top:"3rem",right:"-2rem"}}><b>Login</b></span>
   
   <span style={{position:"relative",top:"7rem",color:"#DBDBDB",fontSize:"18px",right:"3rem"}}>Get access to your Orders, Wishlist and Recommendations</span>
   </div>*/
    
        

<div style={{height:"100vh"}}>


        <h5 style={{color: "#858585",position:"relative",fontSize:"15px",top:"15rem",left:"42rem"}}>By continuing, you agree to Flipkart's <span style={{color: "#2874f0"}}>Terms of Use</span>  and <span style={{color: "#2874f0"}}>privacy Policy</span> .</h5>

      
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
        <OtpInput  style={{position:"relative",top:"5rem",left:"40rem"}}
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
          
          <span style={{position:"relative",top:"10rem",left:"41rem",height:"2rem",width:"5rem",padding:"1rem 8rem",backgroundColor:"orange",color:"white"}}>Verify OTP</span>
         
          Login Success
        </button>
      </>
    ) : (
      <>
        <div className="bg-white text-emerald-250 w-fit mx-auto p-4 rounded-full" style={{position:"relative",left:"30rem",top:"3rem"}}>
         
        </div>
        <label
          htmlFor=""
          className="font-bold text-xl text-white text-center"style={{position:"relative",left:"45rem"}}
        >
          Verify your phone number
        </label>
        <PhoneInput country={"in"} value={ph} onChange={setPh} style={{position:"relative",left:"41rem",top:"3rem",marginBottom:"5rem"}} />
        <button style={{position:"relative",left:"4rem"}}
          onClick={onSignup}
          className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
        >
         
          <span style={{position:"relative",top:"3.5rem",left:"37rem",padding:"1rem 12rem",backgroundColor:"#FB641B",color:"white"}} >Request OTP</span>
        </button>
      </>
    )}
 
 </div>



)}

</div>
       )  }
   
     </div>
</div>

  )
}

export default Loogin
