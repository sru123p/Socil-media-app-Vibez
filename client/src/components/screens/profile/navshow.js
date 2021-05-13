import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../../../App'

const Profile  = ()=>{
    const [mypics,setPics] = useState([])
    const {state,dispatch} = useContext(UserContext)
    const [image,setImage] = useState("")
    const [cover,setCover]=useState("")
    useEffect(()=>{
       fetch('/mypost',{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
           console.log(result)
           setPics(result.mypost)
       })
    },[])
    useEffect(()=>{
       if(image){
        const data = new FormData()
        data.append("file",image)
       data.append("upload_preset","c9qwzpln")
       data.append("cloud_name","dppexekbh")
       console.log(data)
       fetch("https://api.cloudinary.com/v1_1/dppexekbh/image/upload",{
           method:"post",
           body:data
       })
        .then(res=>res.json())
        .then(data=>{
    
       
           fetch('/updatepic',{
               method:"put",
               headers:{
                   "Content-Type":"application/json",
                   "Authorization":"Bearer "+localStorage.getItem("jwt")
               },
               body:JSON.stringify({
                   pic:data.url
               })
           }).then(res=>res.json())
           .then(result=>{
              //  console.log(result)
               localStorage.setItem("user",JSON.stringify({...state,pic:result.pic}))
               dispatch({type:"UPDATEPIC",payload:result.pic})
               //window.location.reload()
           })
       
        })
        .catch(err=>{
            console.log(err)
        })
       }
    },[image])
    //-----------------------

    useEffect(()=>{
      if(cover){
       const data = new FormData()
       data.append("file",cover)
      data.append("upload_preset","c9qwzpln")
      data.append("cloud_name","dppexekbh")
      console.log(data)
      fetch("https://api.cloudinary.com/v1_1/dppexekbh/image/upload",{
          method:"post",
          body:data
      })
       .then(res=>res.json())
       .then(data=>{
          fetch('/updatecov',{
              method:"put",
              headers:{
                  "Content-Type":"application/json",
                  "Authorization":"Bearer "+localStorage.getItem("jwt")
              },
              body:JSON.stringify({
                cover:data.url
              })
          }).then(res=>res.json())
          .then(result=>{
              console.log(result)
              localStorage.setItem("user",JSON.stringify({...state,cover:result.cover}))
              dispatch({type:"UPDATECOV",payload:result.cover})
              window.location.reload()
          })
      
       })
       .catch(err=>{
           console.log(err)
       })
      }
   },[cover])
   const updateCover = (file)=>{
    setCover(file)
}
    //---------------------
    const updatePhoto = (file)=>{
        setImage(file)
    }
   return (
       <div>
           <div class="theme-layout">
          <div class="feature-photo">
            <figure>
              <img src={state?state.cover:"loading"} alt=""  className="coverphot"/>
            </figure>
            <div class="add-btn">
              <span><strong>{state?state.followers.length:"0"} followers</strong></span>
              {/* <a href="#" title="" data-ripple="">
                Add Friend
              </a> */}
            </div>
            <form class="edit-phto">
              <i class="fa fa-camera-retro"></i>
              <label class="fileContainer">
                Edit Cover Photo
                <input type="file" onChange={(e)=>updateCover(e.target.files[0])} />
              </label>
            </form>
            <div class="container-fluid">
              <div class="row merged">
                <div class="col-lg-2 col-sm-3">
                  <div class="user-avatar">
                    <figure>
                      <img
                        src={state?state.pic:"loading"}
                        alt=""
                      />
                      <form class="edit-phto">
                        <i class="fa fa-camera-retro"></i>
                        <label class="fileContainer">
                          Edit Display Photo
                          <input type="file" onChange={(e)=>updatePhoto(e.target.files[0])} />
                        </label>
                      </form>
                    </figure>
                  </div>
                </div>
                <div class="col-lg-10 col-sm-9">
                  <div class="timeline-info">
                    <ul>
                      <li class="admin-name">
                        <h5>{state?state.name:"loading"}</h5>
                        <span><strong>{state?state.username:"loading"}</strong></span>
                      </li>
                      <li>
                        <a class="" href="#page-contents" title=""><strong>
                        {mypics.length} posts</strong>
                        </a>
                        <a class="" href="#" title="" ><strong>
                        {state?state.followers.length:"0"} followers</strong>
                        </a>
                        <a class="" href="#" title="" ><strong>
                        {state?state.following.length:"0"} following</strong>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
       </div>
   )
}


export default Profile
