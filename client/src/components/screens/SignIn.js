import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../App";
import M from "materialize-css";
import logo from "./vibezlogo.png";
const SignIn = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const [password, setPasword] = useState("");
  const [email, setEmail] = useState("");
  const PostData = () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      M.toast({ html: "invalid email", classes: "noti" });
      return;
    }
    fetch("/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // alert(data)
        if (data.error) {
          M.toast({ html: data.error, classes: "noti" });
        } else {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          dispatch({ type: "USER", payload: data.user });
          M.toast({
            html: "Login successfull",
            classes: "notii",
          });
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // const Signup=()=> {
  //   history.push("/signup");
  //   history.go("/signup");
  // }
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
              <h2 class="log-title">Login</h2>
              <p>
                Have’t use Vibez Yet?{" "}
                <a href="#" title="">
                  Take the tour
                </a>{" "}
                or{" "}
                <a href="/signup" title="">
                  Join now
                </a>
              </p>
              <form method="post">
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
                {/* <div class="checkbox">
                          <label>
                              <input type="checkbox" checked="checked"/><i class="check-box"></i>Always Remember Me.
                          </label>
                          </div> */}
                <a href="/reset" title="" class="forgot-pwd">
                  Forgot Password?
                </a>
                <div class="submit-btns">
                  <button
                    class="mtr-btn signin"
                    type="button"
                    onClick={() => PostData()}
                  >
                    <span>Login</span>
                  </button>
                  <a href="" title="" class="forgot-pwd">
                  <Link to="/signup">Register</Link>
                </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    //----------------------------------------------------------
  );
};

export default SignIn;
