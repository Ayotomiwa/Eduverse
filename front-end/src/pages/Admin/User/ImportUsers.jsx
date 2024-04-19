import {
    Alert,
    Box,
    Button,
    Card,
    darken,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    List,
    ListItem,
    Snackbar,
    Tab,
    Tabs,
    Typography
} from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {useEffect, useMemo, useState} from "react";
import PagesTable from "../../../components/Display/PagesTable.jsx";
import {useDropzone} from 'react-dropzone';
import * as XLSX from 'xlsx';
import * as Papa from 'papaparse';
import axios from "axios";
import {LoadingButton} from "@mui/lab";


const ImportUsers = (
    {users,
    setUsers,
    userSelection,
        setUserIds,

    }
) => {

    const [tab, setTab] = useState(0);
    const [tempUsers, setTempUsers] = useState([]);
    const [showingMissing, setShowingMissing] = useState(false);
    const [selectedValue, setSelectedValue] = useState("STUDENT");
    const [fileUploaded, setFileUploaded] = useState(false);
    const [open, setOpen] = useState(false);
    // const [parentUsers, setParentUsers] = useState([]);
    const [saving, setSaving] = useState(false);
    const [errorDialogOpen, setErrorDialogOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [snackMessage, setSnackMessage] = useState("");
    const[file, setFile] = useState(null);
    const[missingValues, setMissingValues] = useState(0);
    const[inCompleteRows, setInCompleteRows] = useState([]);
    const[errorUsers, setErrorUsers] = useState([]);
    const requiredFields = selectedValue === "STUDENT" ? ["studentId", "firstName", "lastName", "email", "schoolCode", "courseCode"]
        : ["staffId", "name", "email", "role", "accessLevel"];


    // useEffect(() => {
    //         if(localStorage.getItem("file") && localStorage.getItem("file") !== "null"){
    //             console.log("file", JSON.parse(localStorage.getItem("file")));
    //             setFile(JSON.parse(localStorage.getItem("file")));
    //             validateAndProcessRows(JSON.parse(localStorage.getItem("file")));
    //         }
    // }, []);


    useEffect(()=> {
    setUserIds((users).map(user => accessID(user)), [users]);
    }, [users]);





    useEffect(()=> {
        if(users){
            calculateMissingValues(users)
        }
        if(missingValues === 0 && showingMissing){
            cancelFilter();
        }
    }, [users, missingValues]);


    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        accept: {
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
            'text/csv': ['.csv']
        },
        onDrop: (acceptedFiles) => {
            setFile(acceptedFiles[0]);
            handleFileUpload(acceptedFiles[0]);
        }
    });

    const handleFileUpload = (file) => {
        if (file.type.includes('spreadsheetml')) {
            // Use FileReader for .xlsx files
            const reader = new FileReader();
            reader.onload = (e) => {
                const fileContent = e.target.result;
                const workbook = XLSX.read(fileContent, {type: 'binary'});
                const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                const parsedData = XLSX.utils.sheet_to_json(worksheet);
                localStorage.setItem("file", JSON.stringify(parsedData));
                validateAndProcessRows(parsedData);
            };
            reader.readAsBinaryString(file);
        } else if (file.type === 'text/csv') {
            Papa.parse(file, {
                complete: (result) => {
                    const parsedData = result.data;
                    localStorage.setItem("file", JSON.stringify(parsedData));
                    validateAndProcessRows(parsedData);
                }
            });
        }
    };

    const validateAndProcessRows = (rows) => {
        // const requiredFields = selectedValue === "STUDENT" ? ["studentId", "firstName", "lastName", "email", "schoolCode", "courseCode"] : ["staffId", "name", "email", "role", "accessLevel"];
        let hasError = false;
        let errorMsg = [];

        const columnNames =Object.keys(rows[0]);

        requiredFields.map((field) => {
            if (!columnNames.includes(field)) {
                hasError = true;
                errorMsg.push(`${field}`);
            }
        });

        calculateMissingValues(rows);

        if (hasError) {
            showErrorModal(errorMsg.join(',\n') +  " is missing from the uploaded file. Please ensure all required fields are present.");
        } else {
            const processedData = processUserData(rows);
            setUsers(processedData);
            setFileUploaded(true);
            setSnackMessage("File uploaded successfully");
            setOpen(true);
        }
    };


    const resetFile = () => {
        setFileUploaded(false);
        setShowingMissing(false);
        setInCompleteRows([]);
        setMissingValues(0);
        setErrorUsers([]);
        localStorage.removeItem("file");
    }



    const calculateMissingValues = (rows) => {
        let missingRows = rows.filter((row) => {
            return requiredFields.some((field) => {
                return !row[field] || row[field] === "" || row[field] === null;
            });
        });

        const processedUserData = processUserData(missingRows);
        setInCompleteRows(processedUserData);
        setMissingValues(missingRows.length);
    }

    const showErrorModal = (msg) => {
        setErrorMessage(msg);
        setErrorDialogOpen(true);
    };


    const processUserData = (data) => {
        return data.map((user) => ({
            ...user,
            id: user.studentId || user.staffId,
            name: `${user.firstName && user.firstName !== "" ? user.firstName : "{First Name}"} ${user.lastName && user.lastName !== "" ? user.lastName : "{Last Name}"}`
        }));
    }


    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }
    const handleTabChange = (event, newValue) => {
        setTab(newValue);
        setSelectedValue(newValue === 0 ? "STUDENT" : "STAFF");
    };

    const handleSaveAll = () => {
        setSaving(true);
      // console.log("Users", users)
        const data = usersData();
        // console.log("data", data);
        axios.post("http://localhost:8080/api/user-service/university/1/admin/1/users", data,
            {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`
                }})
            .then((response) => {
                if(response.status === 200){
                    if(response.data){
                        console.log("response.data", response.data);
                    }
                    setSaving(false);
                    if (response.data.unSavedUsersNo > 0) {
                        console.log("error", response.data);
                        setErrorUsers(response.data.unSavedUsers);
                        setErrorMessage(`${response.data.unSavedUsersNo} users could not be saved. Please check the following users and try again`);
                        setErrorDialogOpen(true);
                        return;
                    }
                    setUsers(users.filter((user) => !response.data.unSavedUsers.some((errorUser) => errorUser.email === user.email)));
                    setOpen(true);
                    setSnackMessage("Users saved successfully");
                }
            }).catch((error) => {
            console.error("Error saving users:", error);
            setSaving(false);
            setErrorMessage("Error saving users: " + error);
            setErrorDialogOpen(true);
        });
    }


    const usersData = () => {
        return users.map((user) => {
            let newUser = {
                username: user.email?.split("@")[0],
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                userType: user.type,
                authority: user.authority,
            };

            if (selectedValue === "STUDENT") {
                newUser = {
                    ...newUser,
                    student: {
                        studentNumber: user.studentId,
                        school: user.schoolCode ? user.schoolCode : user.school,
                        course: user.courseCode ? user.courseCode : user.course,
                        startYear: user.startYear
                    }
                };
            } else if (selectedValue === "STAFF") {
                newUser = {
                    ...newUser,
                    staff: {
                        staffNumber: user.staffId,
                        staffType: user.staffType,
                    }
                };
            }

            return newUser;
        });
    }



    const studentFields = {
        "studentNo.": "studentId",
        "name": "name",
        "email": "email",
        "Type":  "type",
        "authority": "authority",
        "school": "schoolCode",
        "course": "courseCode",
    }

    const staffFields = {
        "staffNo": "staffId",
        "name": "name",
        "email": "email",
        "authority": "authority",
        "type": "type",
        "department": "department",
    }


    const accessID = (user) => {
        return selectedValue === "STUDENT" ? user.studentId : user.staffId;
    }


    const filterForMissingRows = () => {
        const usersMinusIncomplete = users.filter((user) => {
            return !inCompleteRows.some((inCompleteUser) => inCompleteUser.id === user.id);
        });

        setTempUsers(usersMinusIncomplete);
        setUsers(inCompleteRows);
        setShowingMissing(true);
    }

    const cancelFilter = () => {
        setUsers([...users, ...tempUsers]);
        setShowingMissing(false);
    }




    // const userIds = useMemo(() => (users).map(user => accessID(user)), [users]);
    // const userSelection = useSelection(userIds);

    // const handleDelete = () => {
    //     userSelection.selected.map((id) => {
    //         setUsers(prevUsers => prevUsers.filter((user) => user.id !== id));
    //     });
    // };
    //




    return (
        <Box>
            {!fileUploaded &&
                <Card sx={{
                    height: "450px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    overFlowX:"auto",
                    m:"auto",
                    justifyContent: "space-around",
                }}>
                    <Box sx={{display: "flex", flexDirection: "column", height: "100%", m: "20px"}}>
                        <Tabs value={tab} indicatorColor="secondary" onChange={handleTabChange} sx={{mb: "20px"}}>
                            <Tab label="Student"/>
                            <Tab label="Staff"/>
                        </Tabs>
                        <Typography variant="h5" sx={{mb: "10px"}}>
                            Import {selectedValue.toLowerCase()} Users
                        </Typography>
                        <Typography>
                            File must be a .xlsx or .csv file.
                            Users must be in the following format:
                            {selectedValue === "STUDENT" ? Object.entries(studentFields).map(([headers, fields], index) => {
                                return (
                                    <Typography key={index}>
                                        {fields}
                                    </Typography>
                                )
                            }) : (Object.entries(staffFields).map(([headers, fields], index) => {
                                return (
                                    <Typography key={index}>
                                        {fields}
                                    </Typography>
                                )
                            }))
                            }
                        </Typography>
                    </Box>
                    <Card {...getRootProps()} sx={{
                        width: "400px",
                        border: "4px grey dashed",
                        borderRadius: "25px",
                        height: "70%",
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                        justifyContent: "space-around",
                        fontSize: "100px"
                    }}>
                        <input {...getInputProps()} />
                        {isDragActive ?
                            <Box>
                                <Typography textAlign="center">
                                    Drop the file here
                                </Typography>
                            </Box>
                            :
                            <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                                <CloudUploadIcon fontSize="inherit" sx={{color: "cornflowerblue"}}/>
                                <Typography textAlign="center">
                                    Drag and Drop file here or
                                </Typography>
                            </Box>
                        }
                        {/*<FileUploaderButton/>*/}
                    </Card>
                </Card>
            }

            {fileUploaded &&
                <Card
                    sx={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                    <Box sx={{height: "%100"}}>
                        <PagesTable
                            items={users}
                            onDeselectAll={userSelection.handleDeselectAll}
                            onDeselectOne={userSelection.handleDeselectOne}
                            onSelectAll={userSelection.handleSelectAll}
                            onSelectOne={userSelection.handleSelectOne}
                            selected={userSelection.selected}
                            columnHeaders={selectedValue === "STUDENT" ? studentFields : staffFields}
                            checkable={true}
                            pagination={false}
                        />
                        <Card>


                        </Card>
                        <Box sx={{mt:"10px", display:"flex", alignItems:"flex-end", width:"100%"}}>
                            <Button variant="contained"
                                    onClick={() => setFileUploaded(false)}
                                    sx={{m:"10px", ml:"auto", backgroundColor: darken("#a7c7e7", 0.5),
                                        '&:hover, &:focus, &:active': {
                                            backgroundColor: darken("#a7c7e7", 0.6),
                                        }
                                    }}
                            >
                                Upload New +
                            </Button>
                        </Box>
                    </Box>
                    <Divider orientation="vertical" flexItem/>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        height: "600px",
                        width: "20%",
                        mt:"20px"
                    }}>
                        <Box sx={{m:"15px", height:"500px"}}>
                            <Typography variant="h6" textAlign="center">
                                  Import Summary
                            </Typography>
                            <Divider/>
                            <Typography variant="subtitle2">
                                <List>
                                    <ListItem>
                                        File Name: {file.name}
                                    </ListItem>
                                    <ListItem>
                                        File Size: {file.size}
                                    </ListItem>
                                    <ListItem>
                                        Total Users: {users.length} rows
                                    </ListItem>
                                    <ListItem>
                                        Incomplete Rows: {missingValues}
                                    </ListItem>
                                </List>
                            </Typography>
                            <Card elevation={4} sx={{display:"flex", justifyContent:"center", alignItems:"center", m: "20px"}}>
                            <Typography textAlign="center" sx={{p:"5px"}}>
                                {missingValues > 0 ? missingValues + " rows have" : "No " } missing values.
                                {missingValues > 0 &&
                                <span style={{color:"red"}}>
                                     Please ensure all required fields are present
                                </span>
                                }
                            </Typography>
                            </Card>
                            {missingValues > 0 &&
                            <Box sx={{mt:"30px", display:"flex", justifyContent:"center"}}>
                                {!showingMissing &&
                                    <Box sx={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
                                    <Button variant="contained"
                                            size="medium"
                                            color="secondary"
                                            onClick={filterForMissingRows}>
                                        Show Incomplete Data
                                    </Button>
                                    <Typography variant="subtitle2" sx={{color:darken("#a7c7e7", 0.5)}}>
                                     Showing  Original Data
                                    </Typography>
                                    </Box>
                                }
                                {showingMissing &&
                                    <Box sx={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
                                    <Button variant="contained"
                                            onClick={cancelFilter}
                                            sx={{backgroundColor: darken("#a7c7e7", 0.5),
                                                color:"white",
                                                '&:hover, &:focus, &:active': {
                                                    backgroundColor: darken("#a7c7e7", 0.6),
                                            }
                                            }}>
                                        Show Original Data
                                    </Button>
                                        <Box>
                                            <Typography variant="subtitle2" color="secondary">
                                                Showing Missing Value(s)
                                            </Typography>
                                        </Box>

                                </Box>
                                }
                            </Box>
                            }

                        </Box>
                        <Box sx={{
                            display: "flex", flexDirection: "column", justifyContent: "space-between",
                        }}>
                            <Button variant="outlined" color="secondary"
                                    size="medium"
                            onClick={resetFile}
                            >
                                Clear File
                            </Button>

                            <LoadingButton variant="contained"
                                           size="medium"
                                           disabled={saving}
                                    onClick={handleSaveAll} loading={saving}
                                    sx={{backgroundColor: darken("#a7c7e7", 0.5),
                                        color:"white",
                                        '&:hover, &:focus, &:active': {
                                            backgroundColor: darken("#a7c7e7", 0.6),
                                        }
                                    }}>
                                Save All
                            </LoadingButton>
                        </Box>
                    </Box>

                    <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal:'right' }}
                              open={open} autoHideDuration={5000}
                              onClose={handleSnackClose}>
                        <Alert onClose={handleSnackClose} variant="outlined" color="secondary">
                            {snackMessage}
                        </Alert>
                    </Snackbar>
                </Card>
            }
            <Dialog open={errorDialogOpen} onClose={() => setErrorDialogOpen(false)}>
                <DialogTitle color="error">Error</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {errorMessage}
                    </DialogContentText>
                    {errorUsers.length > 0 &&
                    <PagesTable
                        items={errorUsers}
                        // onDeselectAll={userSelection.handleDeselectAll}
                        // onDeselectOne={userSelection.handleDeselectOne}
                        // onSelectAll={userSelection.handleSelectAll}
                        // onSelectOne={userSelection.handleSelectOne}
                        // selected={userSelection.selected}
                        pagination={false}
                        columnHeaders={{
                            "email": "user.email",
                            "reasons": "reason"
                        }}
                        />
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setErrorDialogOpen(false)}>Close</Button>
                </DialogActions>
            </Dialog>

        </Box>
    );
};

export default ImportUsers;