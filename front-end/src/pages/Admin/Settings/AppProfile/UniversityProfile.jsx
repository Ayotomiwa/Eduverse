import {Box, Card, darken, TextField} from "@mui/material";
import {Button, Typography} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera.js";
import {useState} from "react";
import {useTheme} from "@mui/material/styles";


const ReadOnlyInfo = ({ label, value }) => (
    <TextField
        label={label}
        disabled
        fullWidth
        multiline
        value={value + " - Contact Eduverse Admin to change"}
        InputProps={{
            readOnly: true,
        }}
        variant="outlined"
        // fullWidth
        margin="normal"
    />
);

const EditableContact = ({ value, onChange }) => (
    <TextField
        label="Contact No"
        name="contactNo"
        fullWidth
        value={value}
        onChange={onChange}
        variant="outlined"
        // fullWidth
        margin="normal"
    />
);


const UniversityProfile= ({saveChanges, universityPlaceholder}) => {
    const theme = useTheme();

    // console.log("In app header", universityPlaceholder);

    const [picFileName, setPicFileName] = useState(null);
    const [picData, setPicData] = useState(null)
    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setPicFileName(event.target.files[0].name);
            setPicData(event.target.files[0]);
            console.log(event.target.files[0].name);
            universityPlaceholder.current.logoUrl = URL.createObjectURL(event.target.files[0]);
        }
    }

    const handleEditChange = (e) => {
        universityPlaceholder.current[e.target.name] = e.target.value;
    }


    const handleSaveChanges = () => {
        universityPlaceholder.current.logoUrl = picFileName
        saveChanges(universityPlaceholder.current, picData, picFileName);
    }


    return (
        <Box component="form" noValidate autoComplete="off" sx={{border:`1px #ddd solid`, p:2 , borderRadius:"12px"}}>
            <Typography variant="h6">University Profile</Typography>

            <Box sx={{m: 2, position:"relative", borderRadius: "12px", backgroundColor: theme.palette.primary.main , p:2, height:"15vh"}}>
                <img
                    src={universityPlaceholder.current?.logoUrl}
                    style={{width: "100%", height: "100%", objectFit: "cover"}}
                />
                <Button
                    component="label"
                    size="small"
                    startIcon={<PhotoCamera/>}
                    variant="contained"
                    color="secondary"
                    sx={{position: "absolute", top: "50%", left: "50%"}}
                >
                    logo (SVG)
                    <input type="file" hidden onChange={handleImageChange}/>
                </Button>
            </Box>




            <ReadOnlyInfo label="University Name" value={universityPlaceholder.current?.name?.toUpperCase()} />
            <ReadOnlyInfo label="Domain" value={universityPlaceholder.current?.domain} />
            <EditableContact value={universityPlaceholder.current?.contactNo} onChange={handleEditChange} />
            <Box sx={{display:"flex" }}>
                <Button
                    onClick={handleSaveChanges}
                    variant="contained" color="success" sx={{ mt: 2, ml:"auto" }}>
                    Save Profile
                </Button>
            </Box>

        </Box>
    );
}

export default UniversityProfile