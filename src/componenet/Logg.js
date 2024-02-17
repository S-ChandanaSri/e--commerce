import React from 'react'

import OtpInput from "otp-input-react";
import { useState,useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {auth} from '../firebase/setup'
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Logg = () => {
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
    axios.get(`http://localhost:3001/check-mobile/${formatPh}`)
    .then((response) => {
      const exists = response.data.exists;
    

      if (exists) {
        setLoading(false);
        toast.error("Mobile number already registered");
      } else {
       
        signInWithPhoneNumber(auth, formatPh, appVerifier)
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
        setUser(res.user);
        setLoading(false);
        navigate('/login');
    }catch(err)  {
        console.log(err);
        setLoading(false);
      };
  }
  return (
    
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
          <div className="foo" style={{position:" absolute",top:"100px",left:"300px",height:"550px",width:"800px",display: "flex",zIndex:"-1"}}>
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
          <Link to="/loggin">
            
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
                  👍Login Success
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
                 
                </label>
                <PhoneInput country={"in"} value={ph} onChange={setPh} style={{position:'relative',left:"40rem"}} />
                <button style={{position:"relative",top:"1.5rem",left:"2rem"}}
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
  )
}

export default Logg
