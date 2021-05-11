import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";
import logo from "./vibezlogo.png";
const SignIn = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPasword] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState(undefined);
  useEffect(() => {
    if (url) {
      uploadFields();
    }
  }, [url]);
  const uploadPic = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "c9qwzpln");
    data.append("cloud_name", "dppexekbh");
    console.log(data);
    fetch("https://api.cloudinary.com/v1_1/dppexekbh/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const uploadFields = () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      M.toast({ html: "invalid email", classes: "#c62828 red darken-3" });
      return;
    }
    fetch("/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        username,
        password,
        email,
        pic: url,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error, classes:"noti" });
        } else {
          M.toast({ html: data.message, classes: "notii" });
          history.push("/signin");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const PostData = () => {
    if (image) {
      uploadPic();
    } else {
      uploadFields();
    }
  };

  return (
    <div class="theme-layout">
      <div class="container-fluid pdng0">
        <div class="row merged">
          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <div class="land-featurearea">
              <div class="land-meta">
                <h1>Vibez</h1>
                <p>
                  Vibez is free to use for as long as you want with two active
                  projects.
                </p>
                <div class="friend-logo">
                  <span>
                    <img
                      style={{
                        height: "100px",
                        width: "130px",
                        paddingBottom: "30px",
                        paddingLeft: "3px",
                      }}
                      src={logo}
                      alt=""
                    />
                  </span>
                </div>
                <a href="#" title="" class="folow-me">
                  Follow Us on
                </a>
              </div>
            </div>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <div class="login-reg-bg"></div>
            <div class="log-reg-area sign">
              <h2 class="log-title">Register</h2>
              <p>
                Haven't used Vibez Yet ?
                <a href="#" title="">
                  Take the tour
                </a>
                or
                <a href="#" title="">
                  Join now
                </a>
              </p>
              <form method="post">
                <div class="form-group">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <label class="control-label" for="input">
                    Name
                  </label>
                  <i class="mtrl-select"></i>
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <label class="control-label" for="input">
                    username
                  </label>
                  <i class="mtrl-select"></i>
                </div>

                <div class="form-group">
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label class="control-label" for="input">
                    Email
                  </label>
                  <i class="mtrl-select"></i>
                </div>

                <div class="form-group">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPasword(e.target.value)}
                  />
                  <label class="control-label" for="input">
                    Password
                  </label>
                  <i class="mtrl-select"></i>
                </div>
                <div
                  style={{
                    background: "rgba(0, 0, 0, 0.7) none repeat scroll 0 0",
                    bottom: "100px",
                    color: "#fff",
                    padding: "5px 20px",
                    position: "absolute",
                    borderRadius: "3px",
                    border: "1px solid transparent",
                  }}
                >
                  <i class="fa fa-camera-retro"></i>
                  <label class="fileContainer">
                    Edit Display Photo
                    <input
                      type="file"
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                  </label>
                </div>

                <a href="" title="" class="forgot-pwd">
                  <Link to="/signin">Already have an account ?</Link>
                </a>
                <div class="submit-btns">
                  <button
                    class="mtr-btn signin"
                    type="button"
                    onClick={() => PostData()}
                  >
                    <span>Register</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
