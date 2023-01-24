import React, { useEffect, useState } from "react";
import Post from "./Post";
import { getUserPosts } from "../../modules/postManager";
import firebase from "firebase";

export default function UserPosts() {
  const [posts, setPosts] = useState([]);


  const userId = firebase.auth().currentUser.uid

  useEffect(() => {
    getUserPosts(userId).then(setPosts);
  }, []);

  return (
    <section>
      {posts.map((p) => (
        <Post key={p.id} post={p} />
      ))}
    </section>
  );
}
