import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../App";
import { Link } from "react-router-dom";
const Home = () => {
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    fetch("/allpost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setData(result.posts);
      });
  }, []);

  const likePost = (id) => {
    fetch("/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        //   console.log(result)
        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const unlikePost = (id) => {
    fetch("/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        //   console.log(result)
        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const makeComment = (text, postId) => {
    fetch("/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId,
        text,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deletePost = (postid) => {
    fetch(`/deletepost/${postid}`, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.filter((item) => {
          return item._id !== result._id;
        });
        setData(newData);
      });
  };

  return (
    <div class="col-lg-6">
      <div class="loadMore">
        {data.map((item) => {
          return (
            <div class="central-meta item">
              <div class="user-post">
                <div class="friend-info" key={item._id}>
                  <figure>
                    <img src={item.postedBy.pic} alt="" width="50px" height="50px" />
                  </figure>
                  <div class="friend-name">
                    <ins>
                      <a href="" title="">
                        <Link
                          to={
                            item.postedBy._id !== state._id
                              ? "/profile/" + item.postedBy._id
                              : "/profile"
                          }
                        >
                          {item.postedBy.name}
                          {/* {item.postedBy} */}
                        </Link>{" "}
                        {item.postedBy._id == state._id && (
                          <i
                            className="material-icons"
                            style={{
                              float: "right",
                            }}
                            onClick={() => deletePost(item._id)}
                          ><i class="fa fa-trash" title="Delete Post"></i>
                            
                          </i>
                        )}
                      </a>
                    </ins>
                    <span>By: {item.postedBy.username}</span>
                    <span>published: {item.createdAt}</span>
                  </div>
                  <div class="post-meta">
                    <img src={item.photo} alt="" />
                    <div class="we-video-info">
                      <ul>
                        <li>
                          <span
                            class="dislike"
                            data-toggle="tooltip"
                            title="like"
                          >
                            {item.likes.includes(state._id) ? (
                              <i
                                //   className="ti-heartt"
                                onClick={() => {
                                  unlikePost(item._id);
                                }}
                              >
                                <i class="fa fa-heart red-color" title="Unlike"></i>
                              </i>
                            ) : (
                              <i
                                //   class="ti-hearht"
                                onClick={() => {
                                  likePost(item._id);
                                }}
                              >
                                <i class="ti-heart" title="Like"></i>
                              </i>
                            )}
                            {/* <i class="ti-heart"></i> */}
                            <ins>{item.likes.length}</ins>
                          </span>
                        </li>
                      </ul>
                    </div>
                    <h6>{item.title}</h6>
                    <div class="description">
                      <p>{item.body}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="coment-area">
                {item.comments.map((record) => {
                  return (
                    <ul class="we-comet">
                      <li key={record._id}>
                        <div class="comet-avatar">
                          <img src={record.postedBy.pic} alt="" width="30px" height="30px"/>
                        </div>
                        <div class="we-comment">
                          <div class="coment-head">
                            <h6>
                              <a href="" title="">
                                <Link
                                  to={
                                    record.postedBy._id !== state._id
                                      ? "/profile/" + record.postedBy._id
                                      : "/profile"
                                  }
                                >
                                  {record.postedBy.name}<br></br>
                                  <span>{record.postedBy.username}</span>
                                  {/* {item.postedBy} */}
                                </Link>{" "}
                              </a>
                            </h6>
                            {/* <span>1 year ago</span> */}
                            {/* <a class="we-reply" href="#" title="Reply"><i class="fa fa-reply"></i></a> */}
                          </div>
                          <p>{record.text}</p>
                        </div>
                      </li>
                    </ul>
                  );
                })}
                {/* <div className="comet-avatar">
                  <img src={state?state.pic:"loading"} alt="" width="30px" height="30px" />
                </div> */}
                <div class="post-comt-box">
                  <form
                    class="text-box"
                    onSubmit={(e) => {
                      e.preventDefault();
                      makeComment(e.target[0].value, item._id);
                    }}
                  >
                    <input placeholder="    add comment..."></input>
                    

                    <button type="submit" class="mtr-btn signin"></button>
                  </form>
                  {/* <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              makeComment(e.target[0].value, item._id);
                            }}
                          >
                            <input type="text" placeholder="add a comment" />
                          </form> */}
                </div>
              </div>
            </div>
            //   {/* <div className="card home-card" key={item._id}>
            //     <div className="card-content">
            //       <form
            //         onSubmit={(e) => {
            //           e.preventDefault();
            //           makeComment(e.target[0].value, item._id);
            //         }}
            //       >
            //         <input type="text" placeholder="add a comment" />
            //       </form>
            //     </div>
            //   </div> */}
          );
        })}
      </div>
    </div>
  );
};

export default Home;
