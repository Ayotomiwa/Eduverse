import Post from "./Post.jsx";
import {Box} from "@mui/material";
import CreatePost from "./CreatePost.jsx";
import {useEffect, useState} from "react";

const Feed = () => {

    const [newPost, setNewPost] = useState(null);


    const [posts, setPosts] = useState([
        {
        username: "Jane Doe",
        imageUrl: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
        caption: "Java is a high-level, class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible.",
        likes: 25,
        comments: [
            {
            username: "Dave Tyson",
            id: 1,
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
            name: "John Doe",
            userId: 1,
            profilePicture: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            replies: [
                {
                    username: "Mike Tyson",
                    id: 1,
                    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
                    name: "John Doe",
                    userId: 2,
                    profilePicture:
                        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                },
                {
                    username: "Dave Castle",
                    id: 2,
                    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
                    name: "Jane Doe",
                    userId: 3,
                    profilePicture:
                        "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
                }]
        }]
    },{
        username: "David Sloane",
        id: 2,
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
        name: "John Doe",
        userId: 1,
        profilePicture: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
        {
            id:3,
            username: "Ruth Doe",
            caption: "Money is good",
            imageUrl: null,
            likes: 25,
        },
    {
        id:4,
        username: "Ayotunde Doe",
        imageUrl: "https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600",
        caption: "Java is a high-level, class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible." ,
        likes: 25,

    },
    {
        id:5,
        username: "James Madison",
        imageUrl: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
        caption: "Family",
        likes: 25,
    }
    ]);


    useEffect(() => {
        if(newPost){
            setPosts(prevPosts => [newPost, ...prevPosts])
        }
    },[newPost]);

    return(
        <>
        <Box sx={{
            display: "flex",
            m:0,
            alignItems: "center",
            justifyContent: "center",
            position: "sticky",
            zIndex: 1000,
            top: -90,
        }}>
            <CreatePost setNewPost={setNewPost} posts={posts}/>
        </Box>
        <Box sx={{display:"flex", flexDirection:"column", JustifyContent:"center",
            alignItems:"center" , gap:4, mb:"150px", minHeight:"100vh"}}>
            {posts.map((post, index) => (
                <Post key={posts.length - index} post={post} posts={posts} />
            ))}
        </Box>
    </>
      );
}

export default Feed;