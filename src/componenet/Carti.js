// Carti.js

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Carti = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch the list of posts from your API or data source
    fetch('http://localhost:3001/all')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  return (
    <div className='grid'>
      {posts.map(post => (
        <div key={post.id}>
          <Link to={`/carti/${post.id}`}>
            <h2>{post.name}</h2>
            <h2>{post.username}</h2>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Carti;
