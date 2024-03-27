import './App.css';
import {Route, Routes} from "react-router-dom";
import Admin from "./pages/Admin/Admin.jsx";
import Home from "./pages/Home/Home.jsx";
import Feed from "./pages/Posts/Feed.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Groups from "./pages/Group/Groups.jsx";
import CommunityPage from "./pages/Group/GroupPage.jsx";
import ThreadCardPage from "./pages/Group/Threads/ThreadCardPage.jsx";
import ThreadComment from "./pages/Group/Threads/ThreadComment.jsx";
import {useContext} from "react";
import UserContext from "./hooks/UserProvider.jsx";






function App() {

    const { user, isAuthenticating} = useContext(UserContext);

    if(isAuthenticating){
        return <h1>Loading...</h1>
    }


  return (
      <Routes>
        {/*/!*<Route path="/" element={<Admin />}/>*!/*/}
        {/*  <Route path="/" element={<Feed/>}/>*/}
          <Route path="/home" element={<Home><Feed/></Home>}/>
          <Route path="/profile" element={<Home><Profile/></Home>}/>
          <Route path="/admin" element={<Admin />}/>
          <Route path="/communities" element={<Home><Groups/></Home>}/>
          <Route path="/community/*" element={<Home><CommunityPage/></Home>}/>
          {/*<Route path="/community/*" element={<Home><ThreadComment/></Home>}/>*/}
          <Route path="/community/thread/*" element={<Home><ThreadCardPage/></Home>}/>
          <Route path="*" element={<Home><Feed/></Home>}/>
      </Routes>
  )
}

export default App
