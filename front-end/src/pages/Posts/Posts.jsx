import Post from "./Post.jsx";
import {Box, Button} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import UserContext from "../../hooks/UserProvider.jsx";

const Posts = ({newPost, selectedTab}) => {

    const {jwtToken} = useContext(UserContext);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [loadMore, setLoadMore] = useState(false);
    const universityId = 1;
    const userId = 1;
    const publicUrl = `http://localhost:8222/api/post-service/posts/${universityId}/public?page=${page}&size=20&sortBy=createdAt`;
    const friendsUrl = `http://localhost:8222/api/post-service/posts/${userId}/friends?page=${page}&size=20&sortBy=createdAt`;

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
        axios.get(fetchUrl, {
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }})
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