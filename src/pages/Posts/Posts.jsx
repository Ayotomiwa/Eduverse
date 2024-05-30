import Post from "./Post.jsx";
import {Box, Button, CircularProgress} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import UserContext from "../../hooks/UserProvider.jsx";
import LoadingButton from '@mui/lab/LoadingButton';
import {Typography} from "@mui/material";

const Posts = ({newPost, selectedTab, profilePostsUrl = null, setPostNo}) => {

    const {jwtToken, university, user, API_GATEWAY} = useContext(UserContext);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0)
    const [loadMore, setLoadMore] = useState(false);
    const [loadingAgain, setLoadingAgain] = useState(true);
    const [loadPrevious, setLoadPrevious] = useState(false);
    const publicUrl = `${API_GATEWAY}/api/post-service/university/${university.id}/posts/public?page=${page}&size=20&sortBy=createdAt`;
    const followingsUrl = `${API_GATEWAY}/api/post-service/users/${user.id}/posts/following?page=${page}&size=20&sortBy=createdAt`;

    const fetchUrl =  profilePostsUrl ?  profilePostsUrl :  (selectedTab === "Public" ? publicUrl : followingsUrl);



    useEffect(() => {
         console.log(selectedTab)
         fetchPosts();
    }, [page]);

    useEffect(() => {
        setPosts([]);
        setPage(0);
        fetchPosts();
    }, [selectedTab]);


    useEffect(() => {
        if (newPost) {
            setPosts(prevPosts => [newPost, ...prevPosts])
        }
    }, [newPost]);



    const fetchPosts = () => {
        setLoadingAgain(true);
        console.log("Fetching posts PaGE ", page)
        axios.get(fetchUrl, {
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }})
            .then((response) => {
                console.log(response.data)
                setTotalPages(response.data.totalPages)
                setLoading(false);
                setLoadingAgain(false);
                if(profilePostsUrl){
                    setPostNo(response.data.totalElements);
                }
                if(response.data.content.length === 0){
                  return
                }
                if(loadMore){
                    setPosts([posts, ...response.data.content])
                    return;
                }
                if(loadPrevious){
                    setPosts([...response.data.content, ...posts])
                    return;
                }
                setPosts(response.data.content);
                setTotalPages(response.data.totalPages)
                setLoading(false);
                setLoadingAgain(false);
            }).catch((error) => {
                console.error("Error fetching posts:", error);
                setLoading(false);
                setLoadingAgain(false);
            });
    }


    const handleLoadPrevious = () => {
        setLoadMore(false)
        if(posts.length === 0 || page + 1 === totalPages){
            setLoadPrevious(false)
            return
        }
        setLoadPrevious(true)
        setPage((prev) => prev + 1)
    }


    const handleLoadNewer = () => {
        setLoadPrevious(false)
        if(page === 0){
            setLoadMore(false)
            fetchPosts();
            return
        }
        setLoadMore(true)
        setPage((prev) => prev - 1)
    }

    return (
        <>
            <Box sx={{
                display: "flex", flexDirection: "column", JustifyContent: "center",
                alignItems: "center", gap: 4, mb: "150px", minHeight: "100vh"
            }}>
                {(loading || posts.length === 0) ? (
                    <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", height: "70vh"}}>
                    {loading && <CircularProgress color="secondary" />}
                        {!loading && posts.length === 0 && (
                            <Typography variant="h5" sx={{color:"grey"}}>No posts found</Typography>
                        )}
                    </Box>
                    ):(
                        <>
                    <Box>
                        <LoadingButton
                            size="small"
                            variant="outlined"
                                       loading={loadingAgain}
                                disabled={page < 0 || posts.length === 0}
                                sx={{bgcolor: "secondary.light",
                                    opacity: 0.5,
                                    color: "secondary.contrastText"}}
                                fullWidth
                               loadingPosition="end"
                            endIcon={loadingAgain ? <CircularProgress size={20} color="secondary"/> : null}
                               onClick={handleLoadNewer}>
                            {page < 0 || posts.length === 0 ? "No more posts" : "Load Latest Posts"}
                        </LoadingButton>
                    </Box>
                    {posts.map((post, index) => (
                    <Post key={posts.length - index}
                          post={post}
                          setPosts={setPosts}
                          posts={posts}
                    />
                ))}
                        </>
                )}
            </Box>
             <Box>
                <Button variant="contained"
                        disabled={page + 1 === totalPages}
                        sx={{bgcolor: "secondary.light", opacity: 0.5, color: "secondary.contrastText", mb:3}}
                        fullWidth onClick={handleLoadPrevious}>
                    {page + 1 === totalPages ? "No more posts" : "Previous Posts"}
                </Button>
            </Box>

        </>
    );
}

export default Posts;