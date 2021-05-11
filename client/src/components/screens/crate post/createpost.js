import React, { useState, useEffect } from "react";
import M from "materialize-css";
import { useHistory } from "react-router-dom";
const CretePost = () => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  useEffect(() => {
    if (url) {
      fetch("/createpost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          title,
          body,
          pic: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            M.toast({ html: data.error, classes: "noti" });
          } else {
            M.toast({
              html: "Created post Successfully",
              classes: "notii",
            });
            history.push("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [url]);

  const postDetails = () => {
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
  //---------------------

  //----------------------

  return (
    <div class="col-lg-6">
      <div class="central-meta">
        <div class="new-postbox">
          <figure>
            <img src="images/resources/admin2.jpg" alt="" />
          </figure>
          <div class="newpst-input">
            
              <textarea
                type="text"
                placeholder="title"
                value={title}
                style={{padding:"10px",
                    borderRadius:"10px", width:"100%",paddingBottom:"10px"}}
                onChange={(e) => setTitle(e.target.value)}
              /><br/><br/>
              <textarea
                rows="2"
                placeholder="write something"
                style={{padding:"10px",
                borderRadius:"10px", width:"100%",height:"100px"}}
                onChange={(e) => setBody(e.target.value)}
              ></textarea>
              <div class="attachments">
                <ul>
                  <li>
                    <i class="fa fa-image"></i>
                    <label class="fileContainer">
                      <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                      />
                    </label>
                  </li>
                  <li>
                    <button style={{color:"#ae2b8b",position: "relative",
  background: "currentColor",
  border: "1px solid currentColor",
  marginTop: "10px",
  padding: "7px 30px",
  cursor: "pointer"}} onClick={() => postDetails()}>
                      <span style={{color:"#fff"}}>Post</span>
                    </button>
                  </li>
                </ul>
              </div>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default CretePost;
