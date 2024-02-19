//import { useNavigate } from 'react-router-dom';

//import { GlobalStateProvider } from '../flipkart/src/GlobalStateContext';

//const { GlobalStateProvider } = require('/Users/asus/Documents/chinni/hi/projects/flipkart/src/GlobalStateContext');
//const { GlobalStateProvider } = await import('/Users/asus/Documents/chinni/hi/projects/flipkart/src/GlobalStateContext');
async function importGlobalStateProvider() {
  const { GlobalStateProvider } = await import('/Users/asus/Documents/chinni/hi/projects/flipkart/src/GlobalStateContext');
  return GlobalStateProvider;
}
const dotenv = require("dotenv")
const cookieParser = require('cookie-parser');
const mysql = require('mysql2');
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors=require('cors')
const fs = require('fs');
const path = require('path'); 
const jwt=require("jsonwebtoken")


//const bcrypt = require('bcrypt');
const paymentRoutes = require("./routes/payment");

//const navigate = useNavigate();
/*const getServerSideProps = async () => {
  // Load 'crypto' and 'stream' modules only on the server side
  const crypto = await import('crypto');
  const stream = await import('stream');
  console.log(crypto);
  console.log(stream.finished);

  return {
    props: {}, // will be passed to the page component as props
  };
};*/


const app = express();

dotenv.config();

app.use(cookieParser());
app.use(express.json());
//app.use(cors());


const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["POST", "GET","DELETE"],
  credentials: true,
};


app.use(cors(corsOptions));
app.use("/api/payment/", paymentRoutes);
app.options("/login", cors());



app.use(bodyParser.json());



//const cors = require('cors');
//const cookieParser = require('cookie-parser');
//const dotenv = require('dotenv');
//const paymentRoutes = require('./routes/payment');

//app.use(cors()); 
/*app.use(session({
  secret:'secret',
  resave:false,
  saveUninitialized:false,
  cookie:{
    secure:false,
    maxAge:1000 * 60 * 60 *24
  }
}))*/



      
  
    



//!isNaN(storedOtp) && userEnteredOtp === storedOtp



const db = mysql.createConnection({
    host: 'users.cfmaq2s00dwp.ap-southeast-2.rds.amazonaws.com',
    user: 'admin',
    database: 'users',
    password:'chanduchandu'
  });


  const verifyUser=(req,res,next)=>{
    const token=req.cookies.token;//Retrieves the JWT from the cookies in the incoming request.
    if(!token){
        return res.json({message:"wee neeed token"})
    }else{
        jwt.verify(token,"our-jsonwebtoken-secret-key",(err,decoded)=>{
            if(err){
                return res.json({message:"authentication error"})
            }else{
              
              req.firstName = decoded.firstName;
              req.lastName = decoded.lastName;
              next();
            }
        })
    }
}
app.get("/",verifyUser,(req,res)=>{  //If the middleware successfully verifies the token, the route responds with a JSON object containing the status and the user's name.
return res.json({status: "success", firstName: req.firstName, lastName: req.lastName})
})


const vrifyUser=(req,res,next)=>{
  const token=req.cookies.userid;//Retrieves the JWT from the cookies in the incoming request.
  if(!token){
      return res.json({message:"wee neeed token"})
  }else{
      jwt.verify(token,"our-jsonwebtoken-secret-key",(err,decoded)=>{
          if(err){
              return res.json({message:"authentication error"})
          }else{
            req.userid = decoded.userid;
            req.firstName = decoded.firstName;
            req.lastName = decoded.lastName;
              next();
          }
      })
  }
}

app.get("/",vrifyUser,(req,res)=>{  //If the middleware successfully verifies the token, the route responds with a JSON object containing the status and the user's name.
  return res.json({status: "success",firstName: req.firstName, lastName: req.lastName,userId: req.userId})
  })




  app.get('/check-mobile/:mobile', (req, res) => {
    const mobile = req.params.mobile;
    console.log(mobile)
  
    const query = `SELECT EXISTS(SELECT 1 FROM users WHERE mobile = ?) AS \`exists\``;
  
    db.query(query, [mobile], (err, result) => {
      if (err) {
        throw err;
      }
      
      const mobileExists = result[0].exists === 1;
      res.json({ exists: mobileExists });
    });
  });


  app.get('/getuserid',(req,res)=>{
    const {mobile} = req.query;
    const lastTwelveDigits = mobile.slice(-10);
    console.log("got1",lastTwelveDigits)
    const sql = 'SELECT * FROM users WHERE RIGHT(mobile, 10) = ?'
    //console.log("coming",userid)
    db.query(sql, [lastTwelveDigits], (err, result) => {
      if(err){
        console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
      }
      if (result.length > 0) {
        const token=jwt.sign({mobile: result[0].mobile },"our-jsonwebtoken-secret-key",{expiresIn:"1d"})
        res.cookie('token', token, { httpOnly: true });

      const usrtoken=jwt.sign({userId: result[0].userid },"our-jsonwebtoken-secret-key",{expiresIn:"1d"})
      res.cookie('userid', usrtoken, { httpOnly: true });
      const decodedUserToken = jwt.verify(usrtoken, "our-jsonwebtoken-secret-key");
    
     
      res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
      res.setHeader("Access-Control-Allow-Methods", "POST, GET");
      res.setHeader("Access-Control-Allow-Credentials", "true");

        res.json({lastName:result[0].lastName, userId: result[0].userid,data: result,status:"success" });
        console.log("got",result[0].userid)
        console.log("got5",result[0].lastName)

      } else {
        res.status(404).json({ error: 'User not found' });
      }
      
    })
    

  })

app.get("/all",(req,res)=>{
    sql="select * from users";
    db.query(sql,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data)
    })
})

app.post("/loginn", (req, res) => {
  
  const mobile = req.body.mobile;
  console.log(mobile);
  const sql="SELECT * FROM users WHERE mobile = ?"
  db.query(sql, [mobile], (err, results) => {
    if (err) return res.json("Login failed")
    if(results.length>0){
      
      return res.json("login success",{status:"success"})
    }else{
      return res.json("login failed")
    }

  });
});


app.post('/all',cors(corsOptions), async(req, res) => {
  const { firstName, lastName, mobile, mail, password } = req.body;
  const mobileExists = await checkMobileNumberExists(mobile);

  if (mobileExists) {
    res.json({ message: 'Mobile number already registered' });
  } else {

    //bcrypt.hash(password, 10, (err, hashedPassword) => {
      //if (err) {
        //  return res.status(500).json({ error: "Error hashing password" });
      //}
  const query="INSERT INTO users (firstName,lastName,mobile,mail,password) VALUES(?) "
  const values=[
    req.body.firstName,
    req.body.lastName,
    req.body.mobile,
   req.body.mail,
   req.body.password
   
    
  ]
  db.query(query, [values], (err, dataa) => {
    if (err) {
      console.error("Error executing SQL query:", err);    
        return res.status(500).json({ error: "Internal Server Error" });
    }

   
    if (dataa.affectedRows > 0) {
      //const name=dataa[0].name;
      const token=jwt.sign({firstName, lastName, mobile, mail, password},"our-jsonwebtoken-secret-key",{expiresIn:"1d"})
     // const tokenPayload=jwt.sign({firstName, lastName, mobile, mail},"our-jsonwebtoken-secret-key",{expiresIn:"1d"})
     // const token = jwt.sign(tokenPayload, "our-jsonwebtoken-secret-key", { expiresIn: "1d" });
      res.cookie('token', token, { httpOnly: true });

      const usrtoken=jwt.sign({ userid: dataa.insertId },"our-jsonwebtoken-secret-key",{expiresIn:"1d"})
      res.cookie('userid', usrtoken, { httpOnly: true });
      const decodedUserToken = jwt.verify(usrtoken, "our-jsonwebtoken-secret-key");
      const userId = decodedUserToken.userid;
      console.log("User1 ID:", userId);
      console.log("gg",firstName, lastName, mobile, mail,password)
      res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
      res.setHeader("Access-Control-Allow-Methods", "POST, GET");
      res.setHeader("Access-Control-Allow-Credentials", "true");
      //const insertedId = dataa.insertId; //insertid is inbulit

      return res.json({ success: true, message: "Data inserted successfully" ,status:"success", userid: userId,lastName });
    
    
    } else {
      return res.json({ success: false, message: "Failed to insert data" });
    }
  }); 

}
});


async function checkMobileNumberExists(mobile) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users WHERE mobile = ?';
    db.query(query, [mobile], (err, result) => {
      if (err) {
        console.log('Error checking mobile number in MySQL:', err);
        reject(err);
      } else {
        resolve(result.length > 0);
      }
    });
  });
}

/*const verifyUser = (req,res,next)=>{
  const token=req.cookies.token;
  if(!token){
    return res.json({message:"we need token"})
  }else{
    jwt.verify(token,"our-jsonwebtoken-secret-key",(err,decoded)=>{
      if(err){
        return res.json({message:"authentication error"})
      }else{
        req.mobile=decoded.mobile;
        next();
      }
    })
  }
}


app.get("/",verifyUser,(req,res)=>{
  return res.json({status:"success",mobile:req.mobile})
})*/

app.get("/logout",(req,res)=>{
  res.clearCookie('token');
  return res.json({status:"success"})
})
app.post('/latest',(req,res)=>{
  
 sql="select * from users";

 let {userid}=req.params;
 console.log(userid)
 db.query(sql,(err,dataa)=>{

  if(err) return res.json(err);
  return res.json(dataa)
})
})

app.post("/test",(req,res)=>{
  
  let {userid}=req.params;

  sql="select * from users  ORDER BY userid DESC LIMIT 1";
  //sql ='select * from users where userid=?'
  db.query(sql,(err,dataa)=>{
 
   if(err) return res.json(err);
   return res.json(dataa)
   
 })
})


/*
app.post('/tast', (req, res) => {
  // Extract the data sent from the client
  const { userId, userData } = req.body;

  // You can now use the extracted data (userId and userData) as needed
  console.log("Received data from client:");
  console.log("userId:", userId);
  console.log("userData:", userData);
  sql='select * from users where userid=?';
  db.query(sql,(err,datta)=>{
 
    if(err) return res.json(err);
    return res.json(datta)
    
  })

  // Send a response back to the client
  res.status(200).json({ message: "Data received successfully" });
});


*/






app.get("/testt",(req,res)=>{
 
  let {userid}=req.params;

  sql="select * from users  ORDER BY userid DESC LIMIT 1";
  
  db.query(sql,(err,dataa)=>{
 
   if(err) return res.json({ status: 'error', message: 'Internal Server Error' });
   return res.json({ status: 'success', userid: dataa[0].userid })
   
 })
})


app.get("/carrt",(req,res)=>{
  console.log("Query Params:", req.query);
  const {userid} = req.query;
  console.log("came",userid)

  if (!userid) {
    return res.json({ status: "error", message: "User ID is required" });
  }
  const sql='SELECT productid FROM lonn WHERE userid = ?'
  //const sql='SELECT * FROM lonn WHERE userid = ?' ;
  db.query(sql,[userid],(err,result,userData) => {
    if(err){
      console.error("Database query error:", err);
      return res.json({ status: "error", message: "Error fetching user data" });
    } 
   if (result.length === 0) {
    return res.json({ status: "error", message: "User not found" });
  }
  console.log("User Data:", userData[0]);
  const productIds = result.map((row) => row.productid);
  console.log("product",productIds)
   return res.json({ 
    status: "success",
    userData: userData[0],
    productIds:productIds
   })   
 })
})




  app.get("/nidivi/getProductData", (req, res) => {
    console.log(req.query)
    const { productId } = req.query;
    console.log("ProductIds from client:", productId);
    if (!productId) {
      return res.status(400).json({ status: "error", message: "ProductId are required" });
    }
    
    try {
      const productIdsArray = JSON.parse(productId)
      console.log("s",productIdsArray)
      console.log("s2",productId)
      const sql = 'SELECT imagedata, title, price FROM  loo WHERE id = ? ';
      db.query(sql,[productIdsArray], (err,result) => {
        if (err) {
          console.error('Error fetching product details from nidivi:', err);
          return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
        }

      
      const productsData = result;

     console.log(productsData)
  
      res.json({ status: 'success', productsData });
    } )
  }catch (error) {
      console.error('Error fetching product details from nidivi:', error);
      res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
  });
  
  app.get('/car', (req, res) => {
    const { userid } = req.query;
  
    if (!userid) {
      return res.json({ status: "error", message: "User ID is required" });
    }
  
    const sql = 'SELECT cartid FROM lonn WHERE userid = ? ORDER BY cartid DESC LIMIT 1';
  
    db.query(sql, [userid], (err, result) => {
      if (err) {
        console.error("Database query error:", err);
        return res.json({ status: "error", message: "Error fetching cart data" });
      }
  
      if (result.length === 0) {
        return res.json({ status: "error", message: "Cart not found for the given user" });
      }
  
      const latestCartid = result[0].cartid;
  
      return res.json({
        status: "success",
        latestCartid: latestCartid,
      });
    });
  });

app.delete("/carrt",(req,res)=>{
  const {cartid} = req.query;
  console.log("r",cartid)
  if (cartid === undefined) {
    return res.status(400).json({ status: 'error', message: 'Missing cartid parameter' });
  }

  sql='delete from lonn where cartid=?';
  db.query(sql,[cartid], (err,result) => {
    if (err) {
      console.error('Error fetching product details from nidivi:', err);
      return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ status: 'error', message: 'Row not found' });
    } else {
      res.status(200).json({ status: 'success', message: 'Row deleted successfully' });
    }

  })

})


app.post("/",(req,res)=>{
  const {userid }= req.params.id;
  const token = req.cookies.token;
  const userIdToken = req.cookies.userid;
  if (token && userIdToken) {
    const decodedUserToken = jwt.verify(userIdToken, "our-jsonwebtoken-secret-key");
    const userid = decodedUserToken.userid;
    app.post('/cart',(req,res)=>{
      url=`http://localhost:3000/cart?userid=${userid}`
      navigate.push(url)
      res.json({ status: "success", url });
    })
    
  } else {
    res.json({ status: "error", message: "Token or User ID token missing" });
  }
})

    
    
  


app.get("/cart",(req,res)=>{
  

  const sql='SELECT * FROM users WHERE userid = ?' ;
  const userid = req.params;
  

  db.query(sql,[userid], (err,userData) => {
    if(err) return res.json(err);
   if (userData.length === 0) {
    return res.json({ status: "error", message: "User not found" });
  }
  console.log("User Data:", userData[0]);
   return res.json({
    status: "success",
    userData: userData[0]

   })//,{status: "success"}
   
 })
})

app.post('/addcart',(req,res)=>{

  const {userid,productid,quantity}=req.body;
  const sql = `INSERT INTO lonn (userid, productid, quantity) VALUES (?, ?, ?)`;
  db.query(sql, [userid, productid, quantity], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
    res.json({ status: 'success', message: 'Item added to cart successfully' });
  });

})

app.post("/",(req,res)=>{//changed
  
  
  
  db.query('select * from users where userid=?',[userid],(err,userData)=>{//,[id],
 
   if(err) return res.json(err);
   if (userData.length === 0) {
    return res.json({ status: "error", message: "User not found" });
  }
   return res.json({
    status: "success",
        name: userData[0].name,
        cartData: cartData[0],
   })//,{status: "success"}  
 })
})




app.get('/all/:userid', (req, res) => {
  const userid = req.params.id;

  db.query('SELECT * FROM users WHERE userid = ?', [userid], (error, results) => {
    if (error) {
      console.error('Error fetching post details:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'Post not found' });
    } else {
      res.json(results[0]);
    }
  });
});

/*for 2nd database*/
app.get('/lo',(req,res)=>{
  sql="SELECT * from loo";

  
  
  db.query(sql,(err,data)=>{
    if(err) return res.json(err);
    return res.json(data)
  
  })

})



app.get('/nidivi/:id',(req,res)=>{
  const id = req.params.id;
  //const userId = req.userid;
  //console.log("ooo",userId)
  db.query('SELECT * FROM loo WHERE id = ? ', [id], (error, results) => {
    if (error) {
      console.error('Error fetching post details:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'Post not found' });
    } else {
      const postData = {
        id: results[0].id,
        imagedata: results[0].imagedata,
        title: results[0].title,
        price: results[0].price,
        description:results[0].description,
        descri:results[0].descri,
        descrip:results[0].descrip,
        descript:results[0].descript,
        description1:results[0].description1,
        description2:results[0].description2,
        // Add other properties as needed
      };
      res.json({
        post: postData,
        status: "success",
      });
    }
  });
})

//take teddybear items
app.get('/nidi', (req, res) => {
  sql="SELECT * from loo";

  
  
  db.query(sql,(err,data)=>{
    if(err) return res.json(err);
    return res.json(data)
  
  })
  
});


//const PORT = process.env.PORT || 3001;
app.listen("3001",()=>{
   
console.log("liiiiiiii")
})




/*if (userEnteredOtp && storedOtp && userEnteredOtp === storedOtp) {
  console.log('OTP verified successfully');
  res.json({ success: true });
} else {
  console.log('Error verifying OTP');
  res.json({ success: false });
}
}
});
})*/