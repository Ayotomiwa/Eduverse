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
import {CircularProgress, useTheme} from "@mui/material";
import {Box} from "@mui/material";
import AuthLogin from "./pages/Login/AuthLogin.jsx";
import AuthRegister from "./pages/Login/AuthRegister.jsx";
import {createTheme} from "@mui/material/styles";
import {ThemeProvider} from "@mui/material";
import {purple} from "@mui/material/colors";






function App() {

    const outerTheme = useTheme();
    const theme = createTheme({
        palette: {
            primary:purple,
        },
        typography: {
            fontFamily: "'Plus Jakarta Sans', sans-serif",
        },
        button: {
            dark:"rgb(59, 61, 145)"
        },
        icon: {
            color: outerTheme.palette.primary.light,
        },
    });
    const { user, isAuthenticating} = useContext(UserContext);

    if(isAuthenticating){
        return null;
    }


  return (
      <ThemeProvider theme={theme}>
      <Routes>
        {/*/!*<Route path="/" element={<Admin />}/>*!/*/}
        {/*  <Route path="/" element={<Feed/>}/>*/}
          <Route path="/feed" element={<Home><FeatureCheckFeed><Feed/></FeatureCheckFeed></Home>}/>
          <Route path="/profile" element={<Home><Profile/></Home>}/>
          <Route path="/admin" element={<Admin />}/>
          <Route path="/login" element={<AuthLogin/>}/>
          <Route path="/register" element={<AuthRegister/>}/>
          <Route path="/communities" element={<Home><FeatureCheckGroup><Groups/></FeatureCheckGroup></Home>}/>
          <Route path="/communities/:id" element={<Home><FeatureCheckGroup><GroupPage/></FeatureCheckGroup></Home>}/>
          {/*<Route path="/community/*" element={<Home><ThreadComment/></Home>}/>*/}
          <Route path="communities/thread/:id" element={<Home><FeatureCheckGroup><ThreadCardPage/></FeatureCheckGroup></Home>}/>
          <Route path="/modules" element={<Home><FeatureCheckModule><div>Hello</div></FeatureCheckModule></Home>}/>

          <Route path="*" element={<Home><Feed/></Home>}/>
      </Routes>
        </ThemeProvider>
  )
}

export default App
