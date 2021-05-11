import React, { useContext, useRef, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";
import M from "materialize-css";
const NavBar = () => {
  const searchModal = useRef(null);
  const [search, setSearch] = useState("");
  const [userDetails, setUserDetails] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  useEffect(() => {
    M.Modal.init(searchModal.current);
  }, []);
  const renderList = () => {
    if (state) {
      return [
        <li key="1">
          <i title="Search"
            data-target="modal1"
            className="large material-icons modal-trigger"
          >
            <i class="ti-search"></i>
          </i>
        </li>,
        <li key="2">
        <a href="" title="Home" data-ripple="">
          <Link to="/"><i class="fa fa-home"></i></Link>
        </a>
      </li>,
        <li key="2">
          <a href="" title="Profile" data-ripple="">
            <Link to="/profile"><i class="ti-user"></i></Link>
          </a>
        </li>,
        <li key="3">
          <a href="" title="Create post" data-ripple="">
            <Link to="/create"><i class="ti-image"></i></Link>
          </a>
        </li>,
        <li key="4">
          <a href="" title="My following Posts" data-ripple="">
            <Link to="/myfollowingpost"><i class="fa fa-feed"></i></Link>
          </a>
        </li>,
        <li key="5">
          <button style={{color:"#ad0493f5"}}
          title="Logout"
            // className="btn #c62828 red darken-3"
            onClick={() => {
              localStorage.clear();
              dispatch({ type: "CLEAR" });
              history.push("/signin");
            }}
          >
           <i class="fa fa-sign-out"></i>
          </button>
        </li>,
      ];
    } else {
      return [
        // <a href="" title="" data-ripple=""><li  key="6"><Link to="/signin">Signin</Link></li></a>,
        // <a href="" title="" data-ripple=""><li  key="7"><Link to="/signup">Signup</Link></li></a>
      ];
    }
  };

  const fetchUsers = (query) => {
    setSearch(query);
    fetch("/search-users", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
      }),
    })
      .then((res) => res.json())
      .then((results) => {
        setUserDetails(results.user);
      });
  };
  return (
    <nav>
      <div class="theme-layout">
        <div class="topbar stick">
          <div class="logo">
            <a title="" href="/home">
              <Link to={state ? "/" : "/signin"} className="brand-logo left">
                <img
                  style={{ height: "50px",paddingTop:'5px' }}
                  src="template/images/vibezlogo.png"
                  alt=""
                />
              </Link>
            </a>
          </div>
         
          <div class="top-area">
            <ul className="setting-area">{renderList()}</ul>
          </div>
        </div>
      </div>
      {/* <div class="top-search">
              <form method="post" class="">
                <input type="text" placeholder="Search Friend" />
                <button data-ripple>
                  <i class="ti-search"></i>
                </button>
              </form>
            </div> */}
      <div
        id="modal1"
        class="modal"
        ref={searchModal}
        style={{ color: "black" }}
      >
        <div className="top-search">
          <input style={{width:"100%",marginLeft:"50px"}}
            type="text"
            placeholder="    Search users.."
            value={search}
            onChange={(e) => fetchUsers(e.target.value)}
          />
          <ul className="collection">
            {userDetails.map((item) => {
              return (
                <Link
                  to={
                    item._id !== state._id ? "/profile/" + item._id : "/profile"
                  }
                  onClick={() => {
                    M.Modal.getInstance(searchModal.current).close();
                    setSearch("");
                  }}
                >
                  <li style={{marginLeft:"50px",backgroundColor:"#e680d7f5",width:"100%"}}>{item.username}</li>
                </Link>
              );
            })}
          </ul>
        </div>
        <div className="modal-footer">
          <button
            className="modal-close waves-effect waves-green btn-flat"
            onClick={() => setSearch("")}
          >
            close
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
