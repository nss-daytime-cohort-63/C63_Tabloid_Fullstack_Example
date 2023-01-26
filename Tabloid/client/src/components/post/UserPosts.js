import React, { useEffect, useState } from "react";
import Post from "./Post";
import { getUserPosts } from "../../modules/postManager";
import { Link } from "react-router-dom"

export default function UserPosts() {
  const [posts, setPosts] = useState([]);


  useEffect(() => {
    getUserPosts().then(setPosts);
  }, []);

  if (Object.keys(posts).length > 0) {    
    return (
      <section>
      {posts.map((p) => (
        <Post key={p.id} post={p} />
    ))}
    </section>
    )
  } else {
    return (
      <>
        <p>You have no posts yet.</p>
        <p>Click <Link to="/addpost">here</Link> to make your first post!</p>
      </>
    )
  }
}
