import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
  

    fetch(`http://localhost:3001/all/${id}`)
      .then(response => response.json())
      .then(items => setPost(items))
      .catch(error => console.error('Error fetching post details:', error));
  }, [id]);


  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Post Details</h2>
      <p>ID: {post.id}</p>
      <p>First Name: {post.firstname}</p>
      <p>Last Name: {post.lastname}</p>
    </div>
    
  );
};

export default PostDetail;
