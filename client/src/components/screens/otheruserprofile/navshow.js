import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../../App";
import { useParams } from "react-router-dom";
const Profile = () => {
  const [userProfile, setProfile] = useState(null);

  const { state, dispatch } = useContext(UserContext);
  const { userid } = useParams();
  const [showfollow, setShowFollow] = useState(
    state ? !state.following.includes(userid) : true
  );
  useEffect(() => {
    fetch(`/user/${userid}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        //console.log(result)

        setProfile(result);
      });
  }, []);
  const followUser = () => {
    fetch("/follow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userid,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "UPDATE",
          payload: { following: data.following, followers: data.followers },
        });
        localStorage.setItem("user", JSON.stringify(data));
        setProfile((prevState) => {
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: [...prevState.user.followers, data._id],
            },
          };
        });
        setShowFollow(false);
      });
  };
  const unfollowUser = () => {
    fetch("/unfollow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        unfollowId: userid,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "UPDATE",
          payload: { following: data.following, followers: data.followers },
        });
        localStorage.setItem("user", JSON.stringify(data));

        setProfile((prevState) => {
          const newFollower = prevState.user.followers.filter(
            (item) => item != data._id
          );
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: newFollower,
            },
          };
        });
        setShowFollow(true);
      });
  };
  //-------------------------------
  //---------------------------------------
  return (
    <>
      {userProfile ? (
        <div class="theme-layout">
        <div class="feature-photo">
          <figure>
            <img src={userProfile.user.cover} alt="" className="coverphot" />
          </figure>
          <div class="add-btn">
            <span><strong>{userProfile.user.followers.length} followers</strong></span>
            {/* <a href="#" title="" data-ripple=""> */}
            {showfollow ? (
                    <button
                      
                    class="mtr-btn signin"
                      onClick={() => followUser()}
                    >
                      <span>Follow</span>
                    </button>
                  ) : (
                    <button
                      
                    class="mtr-btn signin"
                      onClick={() => unfollowUser()}
                    >
                      <span>UnFollow</span>
                    </button>
                  )}
            {/* </a> */}
          </div>
          <div class="container-fluid">
            <div class="row merged">
              <div class="col-lg-2 col-sm-3">
                <div class="user-avatar">
                  <figure>
                    <img src={userProfile.user.pic} alt="" />
                  </figure>
                </div>
              </div>
              <div class="col-lg-10 col-sm-9">
                <div class="timeline-info">
                  <ul>
                    <li class="admin-name">
                      <h5>{userProfile.user.name}</h5>
                      <span><strong>{userProfile.user.username}</strong></span>
                    </li>
                    <li>
                      <a class="" href="#page-contents" title="">
                        <strong>{userProfile.posts.length} posts</strong>
                      </a>
                      <a class="" href="photo" title="" >
                       <strong>{userProfile.user.followers.length} followers</strong>
                      </a>
                      <a class="" href="video" title="" >
                        <strong>{userProfile.user.following.length} following</strong>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      ) : (
        <h2>loading...!</h2>
      )}
    </>
  );
};

export default Profile;
