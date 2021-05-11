import React, { useContext, useRef, useEffect, useState } from "react";

import { createBrowserHistory } from "history";
import { UserContext } from "../../App";
let history = createBrowserHistory();
const Shortcut = () => {
    const { state, dispatch } = useContext(UserContext);
    return (
      <div class="col-lg-3">
        <aside class="sidebar static">
          <div class="widget">
            <h4 class="widget-title">Shortcuts</h4>
            <ul class="naves">
            <li>
                <i class="fa fa-home"></i>
                <a href="/" title="">
                  home
                </a>
              </li>
              <li>
                <i class="ti-user"></i>
                <a href="/profile" title="">
                  Profile
                </a>
              </li>
              <li>
                <i class="ti-image"></i>
                <a href="/create" title="">
                  Create Post
                </a>
              </li>
              <li>
                <i class="fa fa-feed"></i>
                <a href="/myfollowingpost" title="">
                  My followings Post
                </a>
              </li>
              {/* <li>
                <i class="ti-comments-smiley"></i>
                <a href="/message" title="">
                  Messages
                </a>
              </li> */}
              {/* <li>
                <i class="ti-bell"></i>
                <a href="/notification" title="">
                  Notifications
                </a>
              </li> */}
              <li>
                <i class="ti-power-off"></i>
                <a
                  href=""
                  title=""
                  onClick={() => {
                    localStorage.clear();
                    dispatch({ type: "CLEAR" });
                    history.push("/signin");
                  }}
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    );
}

export default Shortcut;
