import React,{useState,useContext,} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'
import logo from "./vibezlogo.png";
const Reset  = ()=>{
    const history = useHistory()
    const [email,setEmail] = useState("")
    const PostData = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
            return
        }
        fetch('/reset-password',{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email
            })
        }).then(res=>res.json())
        .then(data=>{
           if(data.error){
              M.toast({html: data.error,classes:"#c62828 red darken-3"})
           }
           else{
               M.toast({html:data.message,classes:"#43a047 green darken-1"})
               history.push('/signin')
           }
        }).catch(err=>{
            console.log(err)
        })
    }
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
            <h2 class="log-title">Reset Password</h2>
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
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                />
                <label class="control-label" for="input">
                  Email
                </label>
                <i class="mtrl-select"></i>
              </div>
              {/* <a href="" title="" class="forgot-pwd">
                  <Link to="/signin">Login</Link>
                </a> */}
              <div class="submit-btns">
                <button
                  class="mtr-btn signin"
                  type="button"
                  onClick={()=>PostData()}
                >
                  <span>Reset Password</span>
                </button>
              </div>
              
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
    //   <div className="mycard">
    //       <div className="card auth-card input-field">
    //         <h2>Instagram</h2>
    //         <input
    //         type="text"
    //         placeholder="email"
    //         value={email}
    //         onChange={(e)=>setEmail(e.target.value)}
    //         />
    //         <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
    //         onClick={()=>PostData()}
    //         >
    //            reset password
    //         </button>
            
    
    //     </div>
    //   </div>
   )
}


export default Reset