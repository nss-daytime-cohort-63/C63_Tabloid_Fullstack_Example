import React from "react";
import { Link, useNavigate } from "react-router-dom"
import { useLocation } from 'react-router-dom'

export default function Post({ post }) {

  const location = useLocation()
  const navigate = useNavigate();
  const handleTitleClick = (event) => {
    navigate(`/postDetails/${post.id}`)
  }
  
  return (
    <div className="m-4">
        <button onClick={(clickEvent) => handleTitleClick(clickEvent)}>
        <strong>{post.title}</strong>
        </button>
        <p>Author: {post.userProfile.displayName} &emsp; Published on {post.publishDateTime}</p>

    </div>
  );
}
