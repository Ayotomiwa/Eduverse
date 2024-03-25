import {Avatar, IconButton, InputAdornment, OutlinedInput, Box} from "@mui/material";
import {MapsUgc} from "@mui/icons-material";
import {useEffect, useRef, useState} from "react";

const CommentInput = ({username,
                          handleComment,
                         setReplyWhom,
                          replyWhom}) => {

    const [inputPlaceholder, setInputPlaceholder] = useState("");
    const [inputValue, setInputValue] = useState("");



    useEffect(() => {
        if(replyWhom){
            if(inputValue.startsWith(`@`)){
                setInputValue(inputValue.replace(inputValue , `@${replyWhom} `));
            }
            else if(replyWhom !== ""){
                setInputValue(`@${replyWhom} ${inputValue}`);
            }
            setInputPlaceholder(inputValue)
        }
    }, [replyWhom]);




    const handleInputChange = (event) => {
            let newValue = event.target.value;
            if(replyWhom && !newValue.startsWith(`@${replyWhom}`)){
                setReplyWhom(null);
            }
            setInputPlaceholder(newValue);

        }

    const addComment = () => {
        if(inputPlaceholder === ""){
            return;
        }
        // console.log("input value", inputPlaceholder);
        handleComment(inputPlaceholder);
        setInputPlaceholder("");
    }


    return (
        <Box sx={{display:"flex", flexDirection:"row", gap:1, width:"100%"}}>
            <Avatar variant="cirle" sx={{
                bgcolor: 'secondary.main',
                width: 35,
                height: 35
            }}>{username?.charAt(0).toUpperCase()}</Avatar>
            <OutlinedInput sx={{width: "100%", borderRadius: "10px"}}
                           value={inputPlaceholder}
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