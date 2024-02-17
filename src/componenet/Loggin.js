
import React,{useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Head from './Head'


const Loggin = () => {
    const [namee,setName]=useState({
        firstName:"",
        lastName:"",
        mobile:"",
        mail:""
    });
  
   const handleInput=(e)=>{
    e.preventDefault();
    setName({...namee,[e.target.name]:e.target.value})
   }
    const saveName= async (e)=>{
      e.preventDefault();
      const dataa={
        firstName:namee.firstName,
        lastName:namee.lastName,
        mobile:namee.mobile,
        mail:namee.mail,
    }

 
    try {
        const response = await axios.post('http://localhost:3001/all', dataa);
        alert(response.data.message);
        console.log(Error)
      } catch (err) {
        console.error(err);
        alert('Error in saving data');
      }

    }
   

   
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
            <form onSubmit={saveName}>
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
                   
                    <button type="submit" style={{backgroundColor: "orangered",width: "500px",height: "50px",color:" white"}}>
                        <Link to='/'>
                            Register
                        </Link>
                            </button>
                   
                            </form>     
     
            
        </div>
    </div>           
            
            
                    
                
                
           
    </div>
  )
}

export default Loggin
//changed line 111