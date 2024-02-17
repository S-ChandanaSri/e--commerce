
import './App.css';
//import './polyfills'; 

import {  BrowserRouter as Router, Routes, Route,} from 'react-router-dom';
import Head from './componenet/Head';
import {useEffect} from 'react';
//import Login from './componenet/Login';
//import Log from './componenet/Log';
import Cart from './componenet/Cart';
//import Haed from './componenet/Haed';
import Latest from './componenet/Latest';
import Logg from './componenet/Logg';
import Loggin from './componenet/Loggin';
import Cartt from './componenet/Cartt';
import Sam from './componenet/Sam';
import Carti from './componenet/Carti';
import PostDetail from './componenet/PostDetail';
import Addtocart from './componenet/Addtocart';
import Cartlast from './componenet/Cartlast';
import { CartProvider } from 'react-use-cart';
import Nidivi from './componenet/Nidivi'
import Nidi from './componenet/Nidi';

import Loginn from './componenet/Loginn';
//import Addcart from './componenet/Addcart';
//import Haad from './componenet/Haad'
import { GlobalStateProvider } from './GlobalStateContext.js'
import { useState } from 'react';
import Loogin from './componenet/Loogin.js';
import { ThirdGlobalStateProvider } from './SecondGlobalStateContext.js';



function App() {
  
  //const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <div className="App">
      <ThirdGlobalStateProvider>
<GlobalStateProvider>
      <CartProvider>
      
    <Router>

      <Routes>
      
      
        
        
        
        <Route path="/cart" element={<Cart/>}/>
       
        
        
        <Route path="/latest" element={<Latest/>} />
        <Route path="/logg" element={<Logg/>} />
        <Route path="/loggin" element={<Loggin/>} />
        <Route path="/cartt" element={<Cartt/>} />
        <Route path="/sam" element={<Sam/>} />
        <Route path="/carti/:id" element={<PostDetail/>} />
        <Route path="/carti" element={<Carti/>} />
        <Route path="/sam/addtocart" element={<Addtocart/>} />
        <Route path="/cartlast" element={<  Cartlast/>} />
        <Route path="/Addtocart" element={< Addtocart/>} />
        <Route path="/nidivi/:id" element={<  Nidivi />} />
        <Route path="/nidi" element={<  Nidi />} />
       
        <Route path="/loginn" element={< Loginn />}/>
        <Route path="/loogin" element={< Loogin />} />
        
       
                <Route path="/" element={<Head  />}/>
                
                
  

      </Routes>

    </Router>
    
    </CartProvider>
    
    </GlobalStateProvider>
    </ThirdGlobalStateProvider>

    </div>
  );
}


export default App;
// <Route path="/addcart" element={<Addcart/>}/>
//<Route path="/haed" element={<Haed isAuthenticated={isAuthenticated} />} />
//<Route path="/" element={<Head isAuthenticated={isAuthenticated} />}/>
                
//<Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
//<Route path="/login" element={<Login />} />
//<Route path="/log" element={<Log/>} />
//<Route path="/create" element={<Log/>}/>
//<Route path="/login" element={<Login  />} />