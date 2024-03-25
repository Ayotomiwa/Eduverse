import './App.css';
import {Route, Routes} from "react-router-dom";
import Admin from "./pages/Admin/Admin.jsx";
import Post from "./pages/Posts/Post.jsx";
import Posts from "./pages/Posts/Posts.jsx";
import Home from "./pages/Home/Home.jsx";
import Feed from "./pages/Posts/Feed.jsx";
import Profile from "./pages/Profile/Profile.jsx";






function App() {


  return (
      <Routes>
        {/*/!*<Route path="/" element={<Admin />}/>*!/*/}
        {/*  <Route path="/" element={<Feed/>}/>*/}
          <Route path="/home" element={<Home><Feed/></Home>}/>
          <Route path="/profile" element={<Home><Profile/></Home>}/>
          <Route path="/admin" element={<Admin />}/>
          <Route path="*" element={<Home><Feed/></Home>}/>
      </Routes>
  )
}

export default App
