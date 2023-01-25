import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import PostList from "./post/PostList";
import ListCategories from "./category/ListCategories";
import UserPosts from "./post/UserPosts";
import TagList from "./tag/TagList";

export default function ApplicationViews({ isLoggedIn, role }) {
  return (
    <main>
      <Routes>
        <Route path="/">
          <Route
            index
            element={isLoggedIn ? <PostList /> : <Navigate to="/login" />}
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="userposts" element={<UserPosts />} />
          <Route path="tags" element={
            isLoggedIn
              ? role === "Admin"
                ? <TagList />
                : <Navigate to="/" />
              : <Navigate to="/login" />
            }
          />
          <Route path="categories">
            <Route index
              element={
                isLoggedIn
                  ? role === "Admin"
                    ? <ListCategories />
                    : <Navigate to="/" />
                  : <Navigate to="/login" />
              }
            />
          </Route>
          <Route path="*" element={<p>Whoops, nothing here...</p>} />
        </Route>
      </Routes>
    </main>
  );
};
