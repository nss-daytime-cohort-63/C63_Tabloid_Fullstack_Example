import { getToken } from "./authManager";

const apiUrl = "/api/post";

export const getAllPosts = () => {
  return getToken().then((token) => {
    return fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to get posts.",
        );
      }
    });
  });
};

export const getPostDetails = (id) => {
  
  return getToken().then(token => {
    return fetch(`${apiUrl}/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to get posts.",
        );
      }
    });
  });
}


  export const getUserPosts = () => {
  return getToken().then((token) => {
    return fetch(`${apiUrl}/userposts`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to get posts.",
        );
      }
    });
  });
};

export const AddPost = (post) => {
  return getToken().then((token) => {
    return fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: post })
    }).then((resp) => {
      if (resp.ok) {
        alert.window("Post made successfully!")
      } else {
        throw new Error(
          "An error occurred while trying to add a post.",
        );
      }
    });
  });
}