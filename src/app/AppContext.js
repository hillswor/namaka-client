"use client";

import { createContext, useState, useEffect } from "react";

export const UserContext = createContext(null);
export const AquariumContext = createContext(null);
export const PostsContext = createContext(null);
export const PostContext = createContext(null);

export default function AppContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [aquarium, setAquarium] = useState(null);
  const [posts, setPosts] = useState(null);
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch("https://namaka-server.onrender.com/check-session", {
      method: "GET",
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((data) => {
        setUser(data);
      });
  }, []);

  useEffect(() => {
    fetch("https://namaka-server.onrender.com/posts", {
      method: "GET",
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((data) => {
        setPosts(data);
      });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <AquariumContext.Provider value={{ aquarium, setAquarium }}>
        <PostsContext.Provider value={{ posts, setPosts }}>
          <PostContext.Provider value={{ post, setPost }}>
            {children}
          </PostContext.Provider>
        </PostsContext.Provider>
      </AquariumContext.Provider>
    </UserContext.Provider>
  );
}
