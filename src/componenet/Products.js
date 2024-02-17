
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
    <div >

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
 return (
    <div  className='coll-11 col-md-6 col-lg-3 mx-0 mb-4'>
      <div className='card p-0 overflow-hidden h-100 shadow' > 
        
        <img src={props.imagedata} alt="Product" className='card-img-top img-fluid'  />
        <div className='card-body text-center'  >
          <h5 className="card-title">{props.title}</h5>
          <h5 className="card-title">$ {props.price}</h5>
          <p className="card-text">{props.desc}</p>
          <Link to='/cartlast'>
            <button
              className="btn btn-success"
              onClick={() => addItem(props.item)}
            >
              Add to cart
            </button>
          </Link>
        </div>
      </div>
    </div>
  );*/ 

  /*
  <section className='py-4 container'>
        <div className='row justify-content-center'>
          {produc.map((item, index) => (
            <div key={index}>
              <Products
                imagedata={item.imagedata}
                title={item.title}
                desc={item.desc}
                price={item.price}
                item={item}
              />
            </div>
          ))}
        </div>
      </section>*/ 



      // <h5 className="card-title">$ {props.price}</h5>
      //<p className="card-text">{props.desc}</p>
