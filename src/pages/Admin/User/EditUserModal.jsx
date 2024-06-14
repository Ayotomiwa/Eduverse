import {useContext, useEffect, useRef, useState} from "react";
import UserContext from "../../../hooks/UserProvider.jsx";
import {
    Button, FormHelperText, Grid, IconButton, InputLabel,
    Box, Modal, OutlinedInput, Stack, styled, TextField, Card, Select, MenuItem, Typography
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Autocomplete from "@mui/material/Autocomplete";


const EditUserModal = ({
                           open, closeModal,
                           selectedUser,
                           title,
                           setNewUser,
                           tab

                       }) => {

    const userPlaceHolder = useRef(null);
    const {user} = useContext(UserContext);
    const [picFileName, setPicFileName] = useState(null);
    const [picData, setPicData] = useState(null)
    const [departments, setDepartments] = useState([]);
    const [Courses, setCourses] = useState([])


    useEffect(() => {
        if(!open){
            return;
        }
        console.log("Selected User: ", selectedUser)
        userPlaceHolder.current = {
            ...selectedUser,
            firstName: selectedUser?.firstName || '',
            lastName: selectedUser?.lastName || '',
            email: selectedUser?.email || '',
            userType: selectedUser?.userType|| "",
        }
        if (tab === "Student") {
            userPlaceHolder.current = {
                ...userPlaceHolder.current,
                authority: selectedUser?.authority || "",
                student: {
                    ...userPlaceHolder.current.student,
                    studentNumber: selectedUser?.student.studentNumber || '',
                    startYear: selectedUser?.student.startYear || '',
                    course: selectedUser?.student?.course || "",
                }
            }
            return
        }
        if (tab === "staff") {
            userPlaceHolder.current = {
                ...userPlaceHolder.current,
                authority: selectedUser?.authority || "",
                userType: "STAFF",
                staff: {
                    ...userPlaceHolder.current.staff,
                    staffNumber: selectedUser?.staff.staffNumber || '',
                    department: selectedUser?.staff?.department || "",
                    staffType: selectedUser?.staff?.staffType || "",
                }
            }
            return
        }
        if (tab === "faculty") {
            userPlaceHolder.current = {
                ...userPlaceHolder.current,
                userType: "FACULTY",
                faculty: {
                    ...userPlaceHolder.current.faculty,
                    name: selectedUser?.faculty.name || '',
                    department: selectedUser?.faculty?.department || "",
                }
            }

        }
    }, [selectedUser, open])


    const handleChange = (e) => {
        const nameParts = e.target.name.split('.');
        if (nameParts.length === 1) {
            userPlaceHolder.current[e.target.name] = e.target.value;
        } else if (nameParts.length === 2) {
            if (!userPlaceHolder.current[nameParts[0]]) {
                userPlaceHolder.current[nameParts[0]] = {};
            }
            if(nameParts[1] === "staffType" && e.target.value === "FACULTY"){
                userPlaceHolder.current.userType = "FACULTY"
            }
            userPlaceHolder.current[nameParts[0]][nameParts[1]] = e.target.value;
        }
    };


    const StyledModal = styled(Modal)({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: "border-box"
    });

    const ModalContent = styled(Card)({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        width: '90%',
        maxWidth: '600px',
        maxHeight: "80vh",
        height: "80vh",
        overflowY: "auto",
        boxShadow: '24px',
        padding: '30px',
        borderRadius: '10px',
        boxSizing: "border-box"
    });

    const CloseButton = styled(IconButton)({
        position: 'absolute',
        right: '10px',
        top: '10px',
    });


    const StyledFlexbox = styled(Box)({
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        maxHeight: "80vh",
        bozSizing: "border-box",
        marginTop: "40px",

    })


    const StyledFlexRow = styled(Box)({
        display: "flex",
        alignItems: "end",
        justifyContent: "space-between",
        boxSizing: "border-box",
        width: "100%",
        // border:"1px green solid",
    })

    const handleSave = () => {
        setNewUser(userPlaceHolder.current)
        closeModal()
    }


    return (
        <StyledModal open={open} onClose={closeModal}>
            <ModalContent>
                <Box>
                    <Typography variant="h5" color="secondary" sx={{mt: 2, mb: 2}}>
                        {title}
                    </Typography>
                </Box>
                <CloseButton onClick={closeModal}>
                    <CloseIcon/>
                </CloseButton>
                <StyledFlexbox>
                    {tab === "faculty" ? (
                    <StyledFlexRow>
                        <Box sx={{width:"100%"}} >
                            <TextField
                                label="Faculty Name..HR, Engineering, LSBU etc"
                                name="faculty.name"
                                variant="standard"
                                onChange={handleChange}
                                defaultValue={userPlaceHolder.current?.faculty?.name}
                                fullWidth
                                required
                            />
                        </Box>
                    </StyledFlexRow>
                        ) : (
                    <StyledFlexRow>
                        <Box sx={{flexBasis: `calc(50% - 0.5rem)`}}>
                            <TextField
                                label="First Name"
                                name="firstName"
                                variant="standard"
                                onChange={handleChange}
                                defaultValue={userPlaceHolder.current?.firstName}
                                fullWidth
                                required
                            />
                        </Box>
                        <Box sx={{flexBasis: `calc(50% - 0.5rem)`}}>
                            <TextField
                                label="Last Name"
                                name="lastName"
                                variant="standard"
                                onChange={handleChange}
                                defaultValue={userPlaceHolder.current?.lastName}
                                fullWidth
                                required
                            />
                        </Box>
                    </StyledFlexRow>
                    )}
                    <Box sx={{flexBasis: `calc(50% - 0.5rem)`}}>
                        <TextField
                            fullWidth
                            label="EMAIL - use real email to get password"
                            name="email"
                            defaultValue={userPlaceHolder.current?.email}
                            onChange={handleChange}
                            required
                        />
                    </Box>
                    {tab === "staff" && (
                        <>
                            <StyledFlexRow>
                                <Box sx={{flexBasis: `calc(50% - 0.5rem)`, width: "100%"}}>
                                    <Autocomplete
                                        name="staff.department"
                                        label="Department"
                                        options={departments}
                                        getOptionLabel={(option) => option.name || ''}
                                        onChange={handleChange}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Department"
                                            />
                                        )}
                                    />
                                </Box>
                                <Box sx={{flexBasis: `calc(50% - 0.5rem)`, width: "100%"}}>
                                    <TextField
                                        label="Staff ID"
                                        name="staff.staffNumber"
                                        fullWidth
                                        defaultValue={userPlaceHolder.current?.staff?.staffNumber}
                                        onChange={handleChange}
                                        required
                                    />
                                </Box>
                            </StyledFlexRow>
                            <StyledFlexRow>
                                <Box sx={{flexBasis: `calc(50% - 0.5rem)`, width: "100%"}}>
                                    <InputLabel>Staff Type</InputLabel>
                                    <Select
                                        sx={{width: "100%"}}
                                        name="staff.staffType"
                                        defaultValue={userPlaceHolder.current?.staff?.staffType? userPlaceHolder.current?.staff?.staffType : ""  }
                                        onChange={handleChange}
                                    >
                                        <MenuItem value='TEACHING'>Teaching</MenuItem>
                                        <MenuItem value='LECTURER'>Lecturer</MenuItem>
                                        <MenuItem value='PROFESSOR'>Professor</MenuItem>
                                        <MenuItem value='NON_TEACHING'>Staff</MenuItem>
                                        <MenuItem value='MANAGEMENT'>Management</MenuItem>
                                        <MenuItem value='FACULTY'>Faculty</MenuItem>
                                    </Select>
                                </Box>
                                <Box sx={{flexBasis: `calc(50% - 0.5rem)`, width: "100%"}}>
                                    <InputLabel>Authority</InputLabel>
                                    <Select
                                        sx={{width: "100%"}}
                                        name="authority"
                                        defaultValue={userPlaceHolder.current?.authority || "ELEVATED"}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value='ADMIN'>Admin</MenuItem>
                                        <MenuItem value='ELEVATED'>Elevated</MenuItem>
                                        <MenuItem value='STANDARD'>Standard</MenuItem>
                                    </Select>
                                </Box>
                            </StyledFlexRow>
                        </>
                    )}
                    {tab === "student" && (
                        <>
                            <StyledFlexRow>
                                <Box sx={{flexBasis: `calc(50% - 0.5rem)`, width: "100%"}}>
                                    <TextField
                                        fullWidth
                                        label="Start Year"
                                        name="student.startYear"
                                        defaultValue={userPlaceHolder.current?.student?.startYear}
                                        onChange={handleChange}
                                        required
                                    />
                                </Box>
                                <Box sx={{flexBasis: `calc(50% - 0.5rem)`, width: "100%"}}>
                                    <InputLabel>Student Type</InputLabel>
                                    <Select
                                        sx={{width: "100%"}}
                                        name="userType"
                                        defaultValue={userPlaceHolder.current?.userType || "STUDENT"}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value='STUDENT'>Current</MenuItem>
                                        <MenuItem value='ALUMNI'>Alumni</MenuItem>
                                    </Select>
                                </Box>
                            </StyledFlexRow>
                            <StyledFlexRow>
                                <Box sx={{flexBasis: `calc(50% - 0.5rem)`, width: "100%"}}>
                                    <Autocomplete
                                        name="Course"
                                        value={userPlaceHolder.current?.student?.course}
                                        label="student.course"
                                        options={Courses}
                                        getOptionLabel={(option) => option.name || ''}
                                        onChange={handleChange}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Course"
                                            />
                                        )}
                                    />
                                </Box>
                                <Box sx={{flexBasis: `calc(50% - 0.5rem)`, width: "100%"}}>
                                    <TextField
                                        fullWidth
                                        label="Student ID"
                                        name="student.studentNumber"
                                        defaultValue={userPlaceHolder.current?.student?.studentNumber}
                                        onChange={handleChange}
                                        required
                                    />
                                </Box>
                            </StyledFlexRow>
                        </>
                    )}
                    {tab === "faculty" && (
                        <>
                            <StyledFlexRow>
                                <Box sx={{width: "100%"}}>
                                    <Autocomplete
                                        name="faculty.department"
                                        value={userPlaceHolder.current?.faculty?.department}
                                        label="Department"
                                        options={departments}
                                        getOptionLabel={(option) => option.name || ''}
                                        onChange={handleChange}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Department"
                                            />
                                        )}
                                    />
                                </Box>
                            </StyledFlexRow>
                        </>
                    )}
                </StyledFlexbox>
                <Box sx={{
                    display: "flex", alignItems: "center",
                    marginTop: "auto", width: "100%", gap: 3, height: "60px"
                }}>
                    <Button
                        onClick={closeModal}
                        fullWidth
                        variant="outlined"
                        color="secondary"
                    >
                        Cancel
                    </Button>
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{bgcolor: 'primary.light'}}
                        onClick={handleSave}
                    >
                        Save
                    </Button>
                </Box>
            </ModalContent>
        </StyledModal>
    );
}

export default EditUserModal;