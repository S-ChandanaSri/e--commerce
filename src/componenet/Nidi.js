
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Nidi = () => {
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
      
  return (
    <div className='grid'>
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
  )
}

export default Nidi



/*
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from 'react-use-cart';

//className='coll-11 col-md-6 col-lg-3 mx-0 mb-4'
//className='card p-0 overflow-hidden h-100 shadow'
const Products = (props) => {
  //const { addItem } = useCart();
  
  

  return (
    <div  >

      <div style={{height:"16rem"}} > 
      {console.log("ID1:", props.id)}
      
        <Link to={`/nidivi/${props.id}`}>
        <img src={props.imagedata} alt="Product" className='card-img-top img-fluid' style={{height:"12rem",padding:"1rem",width:"17rem"}} />
        <div className='card-body ' style={{height:"5rem"}} >
          <h5 className="card-title">{props.title}</h5>
        </div>

        </Link>
        
      </div>
    </div>
    
  );
};

export default Products;*/
 