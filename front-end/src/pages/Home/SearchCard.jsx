import {SearchBar} from "../../components/SearchBar.jsx";
import {Card, CardMedia, Box} from "@mui/material";
import logo from "../../assets/lsbu_logo.svg"


const SearchCard = () => {





    return (
        <Card sx={{
            bgcolor: "white",
            p:2,
            borderRadius: "12px"
        }}>
            <Box sx={{mb: 2, borderRadius: "12px", backgroundColor:"#584595", p:2}}>
            <CardMedia
                component="img"
                height="80"
                image= {logo}
                alt="University Logo"
            />
            </Box>
            <Box >
                <SearchBar placeHolder={"Search Eduverse"}/>
            </Box>

        </Card>
    )
}

export default SearchCard;