import {useContext, useRef, useState} from 'react';
import {Box, Typography, Button, Popover, Divider, darken, useTheme} from '@mui/material';
import UserContext from "../../../../hooks/UserProvider.jsx";
import axios from "axios";

const ColorButton = ({ color, selected, onClick }) => (
    <Button
        sx={{
            backgroundColor: color,
            width: 48,
            height: 48,
            margin: 0.5,
            border: selected ? '2px solid black' : '1px solid #ddd',
            '&:hover': {
                backgroundColor: color,
                opacity: 0.9,
            },
        }}
        onClick={onClick}
    />
);

const BigColorButton = ({ buttonName, handleClick, colorSchemes, selectedColor }) => (
    <Box>
        <Button
            variant="contained" onClick={handleClick}
            sx={{
            // backgroundColor:`${colorSchemes.find(colour => colour === selectedColor) || selectedColor}`,
                backgroundColor: selectedColor,
           }}>
            {buttonName}
        </Button>
    </Box>
);

const ThemeSettings = ({universityPlaceHolder}) => {
    const theme = useTheme();
    const {changeTheme, jwtToken, university} = useContext(UserContext);
    const [primaryColour, setPrimaryColour] = useState(theme.palette.primary.main);
    console.log("Primary Colour", primaryColour);

    const [secondaryColour, setSecondaryColour] = useState(theme.palette.secondary.main);
    console.log("Secondary Colour", secondaryColour);

    const [pryAnchorEl, setPryAnchorEl] = useState(null);
    const [secAnchorEl, setSecAnchorEl] = useState(null);

    const colorSchemes = [
        "#3f51b5",
        "#ff4081",
        "#FF6B6B", // Red
        "#F7B801", // Yellow
        "#1B998B", // Teal
        "#2E294E", // Dark Blue
        "#FFFD82", // Light Yellow
        "#FF9F1C", // Orange
        "#5F0F40", // Dark Purple
        "#9A031E", // Dark Red
        "#FB8B24", // Light Orange
        "#E36414", // Dark Orange
        "#0F4C5C", // Navy Blue
        "#D90368", // Pink
        "#00CC66", // Green
        "#FFD700", // Gold
        "#23E5BF", // Light Green
        "#EE4266",
        "#2B2D42",
        "#8D99AE",
        "#EDF2F4",
        "#EF233C",
        "#D90429",
    ];
    const handlePrimaryClick = (event) => {
        setPryAnchorEl(event.currentTarget);
    };

    const handleSecondaryClick = (event) =>{
        setSecAnchorEl(event.currentTarget)
    }

    const handlePrimaryClose = () => {
        setPryAnchorEl(null)
    };

    const handleSecondaryClose = () => {
        setSecAnchorEl(null)
    };
    const saveTheme = () => {

        const url = `http://localhost:8222/api/user-service/university/${university.id}/theme?primary=${encodeURIComponent(primaryColour)}&secondary=${encodeURIComponent(secondaryColour)}`;
        // const url = `http://localhost:8222/api/user-service/university/${university.id}/theme?primary=black&secondary=white`;
        console.log("Request URL: ", url);
        axios.post(url,
            null, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                }
            }).then(response => {
            console.log(response.data);
            changeTheme(primaryColour, secondaryColour);
        }).catch(error => {
            console.error(error);
        });
    };


    const pryOpen = Boolean(pryAnchorEl);
    const secOpen = Boolean(secAnchorEl)

    const pryId = pryOpen ? 'primary-color-popover' : undefined;
    const secId = secOpen? "secondary-color-popover" : undefined;

    return (
        <Box sx={{ width:"100%", display:"flex", flexDirection:"column", gap:3,
            border: "1px solid #ddd", borderRadius: 2,
            p:2, boxSizing:"border-box"}}>
            <Typography variant="h6" textAlign="center" sx={{my:3}}>
                Choose button to choose theme
            </Typography>
            <Box sx={{display:"flex", flexDirection:"row", alignContent:"center",gap:3,
                justifyContent:"center", bozSizing:"border-box", my:3}}>
                <BigColorButton
                    buttonName={"Primary"}
                    handleClick={handlePrimaryClick}
                    colorSchemes={colorSchemes}
                    selectedColor={primaryColour}
                />
                <BigColorButton
                    buttonName={"Secondary"}
                    handleClick={handleSecondaryClick}
                    colorSchemes={colorSchemes}
                    selectedColor={secondaryColour}
                />
            </Box>
            <Button
                onClick={saveTheme}
                color="success" variant="contained" sx={{alignSelf:"flex-end"}}>
               Save Theme
            </Button>

            <Popover
                id={pryId}
                open={pryOpen}
                anchorEl={pryAnchorEl}
                onClose={handlePrimaryClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Box sx={{ p: 2, display:"flex", flexWrap:"wrap", alignItems:"center",
                    justifyContent:"center",  width:"500px"}}>
                    {colorSchemes.map((color) => (
                        <ColorButton
                            key={color}
                            color={color}
                            selected={color === primaryColour}
                            onClick={() => {
                                setPrimaryColour(color);
                                handlePrimaryClose();
                            }}
                        />
                    ))}
                </Box>
            </Popover>

            <Popover
                id={secId}
                open={secOpen}
                anchorEl={secAnchorEl}
                onClose={handleSecondaryClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Box sx={{ p: 2, display:"flex", flexWrap:"wrap", alignItems:"center",
                    justifyContent:"center",  width:"500px"}}>
                    {colorSchemes.map((color) => (
                        <ColorButton
                            key={color}
                            color={color}
                            selected={color === secondaryColour}
                            onClick={() => {
                                setSecondaryColour(color);
                                handleSecondaryClose();
                            }}
                        />
                    ))}
                </Box>
            </Popover>
        </Box>
    );
};

export default ThemeSettings;
