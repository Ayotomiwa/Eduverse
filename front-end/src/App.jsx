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
import FeatureCheckFeed from "./hooks/FeatureCheckFeed.jsx";
import FeatureCheckGroup from "./hooks/FeatureCheckGroup.jsx";
import FeatureCheckModule from "./hooks/FeatureCheckModule.jsx";
import GroupPage from "./pages/Group/GroupPage.jsx";
import {CircularProgress} from "@mui/material";
import {Box} from "@mui/material";






function App() {

    const { user, isAuthenticating} = useContext(UserContext);

    if(isAuthenticating){
        return null;
    }


  return (
      <Routes>
        {/*/!*<Route path="/" element={<Admin />}/>*!/*/}
        {/*  <Route path="/" element={<Feed/>}/>*/}
          <Route path="/feed" element={<Home><FeatureCheckFeed><Feed/></FeatureCheckFeed></Home>}/>
          <Route path="/profile" element={<Home><Profile/></Home>}/>
          <Route path="/admin" element={<Admin />}/>
          <Route path="/communities" element={<Home><FeatureCheckGroup><Groups/></FeatureCheckGroup></Home>}/>
          <Route path="/communities/:id" element={<Home><FeatureCheckGroup><GroupPage/></FeatureCheckGroup></Home>}/>
          {/*<Route path="/community/*" element={<Home><ThreadComment/></Home>}/>*/}
          <Route path="communities/thread/:id" element={<Home><FeatureCheckGroup><ThreadCardPage/></FeatureCheckGroup></Home>}/>
          <Route path="/modules" element={<Home><FeatureCheckModule><div>Hello</div></FeatureCheckModule></Home>}/>

          <Route path="*" element={<Home><Feed/></Home>}/>
      </Routes>
  )
}

export default App
