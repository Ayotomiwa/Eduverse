import {SearchBar} from "../../../components/SearchBar.jsx";
import {Card, CardMedia, Box, Typography} from "@mui/material";
import logo from "../../../assets/lsbu_logo.svg"


const SearchCard = () => {



    return (
        <Card sx={{
            bgcolor: "white",
            p:2,
            pt:0,
            borderRadius: "12px"
        }}>
            <Box sx={{m: 2, borderRadius: "12px", backgroundColor:"#584595", p:2}}>
            <CardMedia
                component="img"
                height="100"
                image= {logo}
                alt="University Logo"
            />
            </Box>
            <Box sx={{m:"3px", display:"flex", justifyContent:"center"}}>
               <Typography variant="caption" color="black" textAlign="center"
                           fontStyle="italic" sx={{p:0, m:0}}>
                     Powered by Eduverse
                </Typography>
            </Box>
            <Box >
                <SearchBar placeHolder={"Search Eduverse"}/>
            </Box>

        </Card>
    )
}

export default SearchCard;