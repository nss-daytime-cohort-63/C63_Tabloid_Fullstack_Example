import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import PostList from "./post/PostList";
import ListCategories from "./category/ListCategories";
import UserPosts from "./post/UserPosts";
import ListUsers from "./user/ListUsers";
import TagList from "./tag/TagList";
import CategoryForm from "./category/CategoryForm";
import UserDetails from "./user/UserDetails";

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
          <Route path="userposts" element={isLoggedIn ? <UserPosts /> : <Navigate to="/login" />} />
          <Route path="tags" >
            <Route index
              element={
                isLoggedIn && role === "Admin"
                  ? <TagList />
                  : <Navigate to="/login" />
              }
            />
          </Route>

          <Route path="categories">
            <Route index
              element={
                isLoggedIn && role === "Admin"
                  ? <ListCategories />
                  : <Navigate to="/login" />
              }
            />
            <Route path="new" element={<CategoryForm />} />
          </Route>


          <Route path="users">
            <Route index
              element={isLoggedIn && role === "Admin" ? <ListUsers />
                : <Navigate to="/login" />} />
            <Route path=":id" element={<UserDetails />} />
          </Route>

          <Route path="*" element={<p>Whoops, nothing here...</p>} />
        </Route>
      </Routes>
    </main>
  );
};
