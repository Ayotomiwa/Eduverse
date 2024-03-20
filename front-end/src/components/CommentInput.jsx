import {Avatar, IconButton, InputAdornment, OutlinedInput, Box} from "@mui/material";
import {MapsUgc} from "@mui/icons-material";
import {useEffect, useRef, useState} from "react";

const CommentInput = ({username,
                          handleComment,
                         replyButton,
                         setReplyWhom,
                          replyWhom}) => {

    const [inputPlaceholder, setInputPlaceholder] = useState("");
    const [inputValue, setInputValue] = useState("");



    useEffect(() => {
            if(inputValue.startsWith(`@`)){
                setInputValue(inputValue.replace(inputValue , `@${replyWhom} `));
            }
            else if(replyWhom !== ""){
                setInputValue(`@${replyWhom} ${inputValue}`);
            }
            setInputPlaceholder(inputValue)

    }, [replyButton]);




    const handleInputChange = (event) => {
            let newValue = event.target.value;
            if(replyWhom !== "" && !newValue.startsWith(`@${replyWhom}`)){
                setReplyWhom("");
            }

            setInputValue(newValue);
            setInputPlaceholder(inputValue);

        }

    const addComment = () => {
        if(inputPlaceholder === ""){
            return;
        }
        // handleAddComment(inputPlaceholder);
        handleComment(inputValue);
        setInputValue("");
        setReplyWhom("");
    }


    return (
        <Box sx={{display:"flex", flexDirection:"row", gap:1, width:"100%"}}>
            <Avatar variant="cirle" sx={{
                bgcolor: 'secondary.main',
                width: 35,
                height: 35
            }}>{username?.charAt(0).toUpperCase()}</Avatar>
            <OutlinedInput sx={{width: "100%", borderRadius: "10px"}}
                           value={inputValue}
                           onChange={(e) => handleInputChange(e)}
                           placeholder="Add a comment"
                           size="small"
                           endAdornment={
                               <InputAdornment position="end">
                                   <IconButton edge="end" onClick={addComment}>
                                       <MapsUgc/>
                                   </IconButton>
                               </InputAdornment>
                           }
            />
        </Box>
    );
}

export default CommentInput;