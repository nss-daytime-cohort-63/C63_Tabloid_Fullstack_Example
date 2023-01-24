import React from "react";
import { Card, CardBody } from "reactstrap";

export default function Post({ post }) {
  return (
    <div className="m-4">
        <strong>{post.title}</strong>
        <p>{post.content}</p>
        <p>Author: {post.userProfile.displayName} &emsp; Published on {post.publishDateTime}</p>

    </div>
  );
}
