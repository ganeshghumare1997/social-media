import React, { useContext, useEffect, useState } from "react";
import "./feed.css";
import Share from "../../components/share/Share";
import Post from "../post/Post";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const {user} = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      let res = username
        ? await axios.get("../posts/profile/"+ username)
        : await axios.get("posts/timeline/"+ user._id);
      if(res.length === 0 && !username){
        res = await axios.get("posts/");
      }

      setPosts(res.data.filter(post => post !== null).sort((p1,p2)=>{
        return new Date(p2.createdAt) - new Date(p1.createdAt)
      }));
    };

    fetchPosts();
  }, [username, user._id]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        { (!username || username === user.username) && <Share />}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
