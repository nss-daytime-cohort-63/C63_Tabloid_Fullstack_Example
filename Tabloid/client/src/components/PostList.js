import React, { useEffect, useState } from "react";
import Post from "./Post";
import { getAllPosts } from "../modules/postManager";
import { Link, useNavigate } from "react-router-dom"
import { useLocation } from 'react-router-dom'


export default function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getAllPosts().then(setPosts);
  }, []);

  return (
    <section>
      {posts.map((p) => (
        <Post key={p.id} post={p} />
      ))}
    </section>
  );
}
