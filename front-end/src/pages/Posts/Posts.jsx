import Post from "./Post.jsx";
import {Box, Button} from "@mui/material";
import {useEffect, useState} from "react";
import axios from "axios";

const Posts = ({newPost, selectedTab}) => {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [loadMore, setLoadMore] = useState(false);
    const universityId = 1;
    const userId = 1;
    const publicUrl = `http://localhost:8080/api/post-service/posts/${universityId}/public?page=${page}&size=20&sortBy=createdAt`;
    const friendsUrl = `http://localhost:8080/api/post-service/posts/${userId}/friends?page=${page}&size=20&sortBy=createdAt`;

    const fetchUrl = selectedTab !== 0 ? publicUrl : friendsUrl;

    console.log("fetchUrl", fetchUrl);



    useEffect(() => {
         fetchPosts();
    }, [selectedTab, page]);



    useEffect(() => {
        if (newPost) {
            setPosts(prevPosts => [newPost, ...prevPosts])
        }
    }, [newPost]);



    const fetchPosts = () => {
        axios.get(fetchUrl)
            .then((response) => {
                if(loadMore){
                    setPosts([posts, ...response.data.content])
                }
                else{
                    // console.log("response", response.data.content);
                    setPosts(response.data.content);
                }
                setLoading(false);
            }).catch((error) => {
                console.error("Error fetching posts:", error);
                setLoading(false);
            });
    }


    const handleLoadMore = () => {
        if(posts.length == 0){
            return
        }
        setLoadMore(true)
        setPage((prev) => prev + 1)

    }

    // const [posts, setPosts] = useState([
    //     {
    //         username: "Jane Doe",
    //         imageUrl: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
    //         caption: "Java is a high-level, class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible.",
    //         likes: 25,
    //         comments: [
    //             {
    //                 username: "Dave Tyson",
    //                 id: 1,
    //                 desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
    //                 name: "John Doe",
    //                 userId: 1,
    //                 profilePicture: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //                 replies: [
    //                     {
    //                         username: "Mike Tyson",
    //                         id: 1,
    //                         desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
    //                         name: "John Doe",
    //                         userId: 2,
    //                         profilePicture:
    //                             "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //                     },
    //                     {
    //                         username: "Dave Castle",
    //                         id: 2,
    //                         desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
    //                         name: "Jane Doe",
    //                         userId: 3,
    //                         profilePicture:
    //                             "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
    //                     }]
    //             }]
    //     }, {
    //         username: "David Sloane",
    //         id: 2,
    //         desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
    //         name: "John Doe",
    //         userId: 1,
    //         profilePicture: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //     },
    //     {
    //         id: 3,
    //         username: "Ruth Doe",
    //         caption: "Money is good",
    //         imageUrl: null,
    //         likes: 25,
    //     },
    //     {
    //         id: 4,
    //         username: "Ayotunde Doe",
    //         imageUrl: "https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600",
    //         caption: "Java is a high-level, class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible.",
    //         likes: 25,
    //
    //     },
    //     {
    //         id: 5,
    //         username: "James Madison",
    //         imageUrl: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
    //         caption: "Family",
    //         likes: 25,
    //     }
    // ]);
    //


    return (
        <>
            <Box sx={{
                display: "flex", flexDirection: "column", JustifyContent: "center",
                alignItems: "center", gap: 4, mb: "150px", minHeight: "100vh"
            }}>
                {posts.map((post, index) => (
                    <Post key={posts.length - index} post={post} posts={posts}/>
                ))}
            </Box>
             <Box>
                <Button onClick={handleLoadMore}>
                    Load more
                </Button>
            </Box>

        </>
    );
}

export default Posts;