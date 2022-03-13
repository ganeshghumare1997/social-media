import React, { useContext, useEffect, useState } from "react";
import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";

export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    currentUser.following.includes(user?.id)
  );

  useEffect(() => {
    setFollowed(currentUser.following.includes(user?.id));
  }, [currentUser, user]);

  useEffect(() => {
    if(user){
      const getFriends = async () => {
        try {
          const friendList = await axios.get("/users/friends/" + user._id);
          setFriends(friendList.data);
        } catch (error) {
          console.log(error);
        }
      };
      getFriends();
    }
  }, [user]);

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put("/users/" + user._id + "/unfollow", {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put("/users/" + user._id + "/follow", {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {
      console.log(err);
    }
  };

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birthday today
          </span>
        </div>
        <img className="rightbarAd" src="assets/ad.png" alt="" />
        <h4 className="rightbarTitle">People You May Know</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightbarTitle">User Information</h4>
        <div className="rightbarInfo">
          <div className="rightbatInfoItem">
            <span className="rightbarInfoKey">City         :</span>
            <span className="rightbarInfoValue">{user || user.city ?user.city : "NA"}</span>
          </div>
          <div className="rightbatInfoItem">
            <span className="rightbarInfoKey">From         : </span>
            <span className="rightbarInfoValue">{user || user.from ? user.from: "NA"}</span>
          </div>
          <div className="rightbatInfoItem">
            <span className="rightbarInfoKey">Relationship :</span>
            <span className="rightbarInfoValue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 2
                ? "Married"
                : "-"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User Friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link key={friend._id}
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none" }}
            >
              <div className="rightbarFollowing">
                <img
                  className="rightbarFollowingImg"
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "person/noCover.png"
                  }
                  alt=""
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
