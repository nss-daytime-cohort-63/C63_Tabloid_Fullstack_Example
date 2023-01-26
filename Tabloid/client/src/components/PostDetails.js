import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from "react"
import { getPostDetails } from "../modules/postManager";
import { getAllUserProfiles } from "../modules/userProfileManager";
export default function PostDetails(){
  const { id } = useParams(),
    [p, setP] = useState({}) 

    useEffect(() => {
      getPostDetails(id).then(setP);
    }, [])
  
  if(p === null) {
    return <p>404 not found</p>
  }

  else {
    return (
      <div className="m-4">
          <strong>{p.title}</strong>
          <img src={p.imagelocation} />
          <p>{p.content}</p>
          <p>Author: {p.userProfile?.displayName} &emsp; Published on {p.publishDateTime}</p>


      </div>
    );
  } 
}