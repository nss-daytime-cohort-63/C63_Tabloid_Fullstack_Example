import React, { useEffect, useState } from "react";
import Post from "./Post";
import { getUserPosts } from "../../modules/postManager";

export default function UserPosts() {
  const [posts, setPosts] = useState([]);


  useEffect(() => {
    getUserPosts().then(setPosts);
  }, []);

  return (
    <section>
      {posts.map((p) => (
        <Post key={p.id} post={p} />
      ))}
    </section>
  );
}
