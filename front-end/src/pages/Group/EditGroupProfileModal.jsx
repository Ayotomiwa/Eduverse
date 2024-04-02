

import PhotoCamera from '@mui/icons-material/PhotoCamera';
import {
    Button,
    Card,
    CardActions,
    Divider,
    Typography,
    Box,
    TextField,
    styled,
    Modal,
    IconButton,
    Paper
} from "@mui/material";
import {CardOverflow, Select, Textarea} from "@mui/joy";
import {Close as CloseIcon} from "@mui/icons-material";

const EditGroupProfileModal = ({open, closeModal, community}) =>  {


    const StyledModal = styled(Modal)({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    });

    const ModalContent = styled(Card)({
        position: 'relative',
        width: '90%',
        maxWidth: '600px',
        outline: 'none',
        boxShadow: '24px',
        padding: '20px',
        borderRadius: '10px',
    });

    const CloseButton = styled(IconButton)({
        position: 'absolute',
        right: '10px',
        top: '10px',
    });




    return (
        <StyledModal open={open} onClose={closeModal}>
            <ModalContent>
                <CloseButton onClick={closeModal}>
                    <CloseIcon />
                </CloseButton>
                <Box sx={{display:"flex", alignItems:"stretch", m:2, py:2 }}>
                            <img
                                src={community?.profilePicUrl ? community.profilePicUrl :  "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600"}
                                style={{width:"100%", height:230, border:"1px red solid", objectFit: "cover"}}
                            />
                </Box>
                <Button
                    startDecorator={<PhotoCamera/>}
                    variant="contained"
                    color="secondary"
                    sx={{  position: "absolute", top: 200, right: 50 }}
                >
                    Change Profile Pic
                </Button>

                <Box sx={{ flex: 1}}>
                    <Typography variant="subtitle" sx={{ textAlign: 'left' }}>
                        Group Name
                    </Typography>
                    <TextField
                        defaultValue={community?.name}
                        variant="outlined"
                        fullWidth
                        sx={{ my: 2 }}
                    />
                    <Select
                            defaultValue={community?.category}
                            options={[
                                { label: 'Technology', value: 'technology' },
                                { label: 'Science', value: 'science' },
                                { label: 'Health', value: 'health' },
                                { label: 'Sports', value: 'sports' },
                                { label: 'Entertainment', value: 'entertainment' },
                                { label: 'Education', value: 'education' },
                                { label: 'Business', value: 'business' },
                                { label: 'Other', value: 'other' },
                            ]}
                        />
                    <Typography variant="subtitle" sx={{ textAlign: 'left' }}>
                        Description
                    </Typography>
                    <TextField
                        defaultValue={community?.bio}
                        multiline
                        rows={4}
                        variant="outlined"
                        fullWidth
                        sx={{ my: 2 }}
                    />
                        <Box sx={{ justifyContent: 'flex-end', p: 2 , mb:2 }}>
                            <Button variant="outlined" size="sm">Cancel</Button>
                            <Button variant="solid" size="sm">Save Changes</Button>
                        </Box>
                </Box>
            </ModalContent>
        </StyledModal>
    );
}

export default EditGroupProfileModal;


