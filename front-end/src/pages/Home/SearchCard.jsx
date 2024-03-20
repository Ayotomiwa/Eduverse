import {SearchBar} from "../../components/SearchBar.jsx";
import {Card, CardMedia, Box} from "@mui/material";

const SearchCard = () => {







    return (
        <Card sx={{
            bgcolor: "white",
            p:2,
            borderRadius: "12px"
        }}>
            <Box sx={{mb: 2}}>
            <CardMedia
                sx={{ borderRadius: "12px"}}
                component="img"
                height="100"
                image = "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
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