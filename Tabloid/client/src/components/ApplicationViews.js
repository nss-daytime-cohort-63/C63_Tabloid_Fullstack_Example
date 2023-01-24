import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import PostList from "./PostList";
import ListCategories from "./Category/ListCategories";
import Tags from "./TagList";

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
          <Route path="tags" element={<Tags />} />

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
