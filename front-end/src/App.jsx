import './App.css';
import {Route, Routes} from "react-router-dom";
import Admin from "./pages/Admin/Admin.jsx";
import Post from "./pages/Posts/Post.jsx";
import Feed from "./pages/Posts/Feed.jsx";
import Home from "./pages/Home/Home.jsx";
import CreatePost from "./pages/Posts/CreatePost.jsx";






function App() {


  return (
      <Routes>
        {/*/!*<Route path="/" element={<Admin />}/>*!/*/}
        {/*  <Route path="/" element={<CreatePost/>}/>*/}
        <Route path="/" element={<Home />}/>
          <Route path="/admin" element={<Admin />}/>
      </Routes>
  )
}

export default App
