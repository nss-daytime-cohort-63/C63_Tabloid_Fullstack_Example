import React from "react";
import { Link, useNavigate } from "react-router-dom"
import { useLocation } from 'react-router-dom'
import { Card } from "reactstrap"

export default function Post({ post }) {

  const location = useLocation()
  const navigate = useNavigate();
  const handleTitleClick = (event) => {
    navigate(`/postDetails/${post.id}`)
  }
  
  return (
    <Card className="m-5 text-center" style={{'borderRadius':'20px'}}>
        <button style={{'borderRadius':'20px'}} onClick={(clickEvent) => handleTitleClick(clickEvent)}>
        <h3>{post.title}</h3>
        <div>
        <img height="20%" width="20%" src={post.imageLocation} alt={post.title} />
        </div>
        <p>Author: {post.userProfile.displayName} &emsp; Published on {post.publishDateTime}</p>
        </button>
    </Card>
  );
}
