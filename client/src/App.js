import React,{useEffect,createContext,useReducer,useContext} from 'react';
import NavBar from './components/Navbar'
// import "./App.css"
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'

import Signin from './components/screens/SignIn'
import Profile from './components/screens/profile/finalprofile'
import Signup from './components/screens/Signup'
import CreatePost from './components/screens/crate post/final'
import {reducer,initialState} from './reducers/userReducer'
import UserProfile from './components/screens/otheruserprofile/final'
import SubscribedUserPosts from './components/screens/followingpost/finalfollowingpost'
import Reset from './components/screens/Reset'
import NewPassword from './components/screens/Newpassword'
import Notfound from './components/screens/notfount'

import Homefinal from './components/screens/home/finalhome'
export const UserContext = createContext()


const Routing = ()=>{
  const history = useHistory()
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
    }else{
      if(!history.location.pathname.startsWith('/reset'))
           history.push('/signin')
    }
  },[])
  return(
    <Switch>
      <Route exact path="/" >
      <Homefinal/>
      </Route>
      <Route path="/signin">
        <Signin />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route path="/create">
        <CreatePost/>
      </Route>
      <Route path="/profile/:userid">
        <UserProfile />
      </Route>
      <Route path="/myfollowingpost">
        <SubscribedUserPosts />
      </Route>
      <Route exact path="/reset">
        <Reset/>
      </Route>
      <Route path="/reset/:token">
        <NewPassword />
      </Route>
      <Route>
        <Notfound />
      </Route>
    </Switch>
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
      {/* <NavBar /> */}
      <Routing />
      
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
