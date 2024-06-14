import {useContext, useEffect, useState} from "react";
import {useSelection} from "../../../hooks/UseSelection.jsx";
import {Box, Card, darken, IconButton, Stack, SvgIcon, Tab, Typography} from "@mui/material";
import TrashIcon from "@heroicons/react/24/solid/TrashIcon.js";
import PencilSquareIcon from "@heroicons/react/24/solid/PencilSquareIcon.js";
import {useLocation, useNavigate} from "react-router-dom";
// import {UserPlusIcon} from "lucide-react";
import axios from "axios";
import UserContext from "../../../hooks/UserProvider.jsx";
import ModuleTable from "./ModuleTable.jsx";
import {SearchBar} from "../../../components/Input/SearchBar.jsx";
import useImageUpload from "../../../hooks/useImageUpload.jsx";
import {UserPlusIcon} from "lucide-react";
import EditModuleModal from "./EditModuleModal.jsx";
import {AcademicCapIcon} from "@heroicons/react/20/solid/index.js";
import AddBoxIcon from "@mui/icons-material/AddBox.js";


const ModuleManagement = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [openModal, setOpenModal] = useState(false);
    const {jwtToken, user, university, API_GATEWAY} = useContext(UserContext);
    const [modules, setModules] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [moduleIds, setModuleIds] = useState([]);
    const [title, setTitle] = useState("Add Module");
    const [moduleSaved, setModuleSaved] = useState(false);
    const [selectedModule, setSelectedModule] = useState(null);
    const [loading, setLoading] = useState(false);
    const moduleUrl = `${API_GATEWAY}/api/user-service/university/${university.id}/modules`;
    const uploadModuleUrl = moduleUrl + `?user-id=${user.id}`;


    const {
        saveToDatabase, initUpload, newDataSaved, initUploadDone,setNewDataSaved
    } = useImageUpload(jwtToken, university, uploadModuleUrl);


    const moduleSelection = useSelection(moduleIds);


    useEffect(() => {
        setModules([]);
        setSearchTerm('');
        setSelectedModule(null);
        fetchModules();
    } , [newDataSaved]);


    useEffect(() => {
        if (modules.length > 0) {
            setModuleIds(modules.map(user => user.id));
        }
    }, [modules]);


    useEffect(() => {
        if (searchTerm !== '') {
            setLoading(true);
            console.log("searching modules");
            searchModules();
        }
    }, [searchTerm]);

    useEffect(() => {
        if (selectedModule) {
            setOpenModal(true)
            setTitle("Edit User");
        }
    }, [selectedModule]);


    useEffect(() => {
        if(initUploadDone){
            saveToDatabase();
        }
    }, [initUploadDone]);


    const fetchModules = () => {
        axios.get(moduleUrl,
            {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`
                }
            })
            .then(response => {
                setModules(response.data);
                setNewDataSaved(false);
            })
            .catch(error => {
                console.error("Failed to fetch modules", error);
                setLoading(false);
                setNewDataSaved(false);
            });
    }


    const handleDelete = () => {
        axios.post(`${API_GATEWAY}/api/user-service/modules/delete?user-id=${user.id}`,
            moduleSelection.selected,
            {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`
                }
            })
            .then(response => {
                console.log("Module deleted", response.data);
                setModules(prevModules => prevModules.filter(user => !moduleSelection.selected.includes(user.id)));
            })
    }


    const searchModules = () => {
        console.log("Searching modules");
        axios.get(`${API_GATEWAY}/api/user-service/modules/search?query=${searchTerm}&universityId=${university.id}`,
            {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`
                }
            })
            .then(response => {
                setModules(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Failed to search modules", error);
                setLoading(false);
            });
    }

    const resetList = (value) => {
        if (searchTerm === '' || !value) {
            setModules([]);
            fetchModules();
        }
    }



    const closeModal = () => {
        moduleSelection.handleDeselectAll()
        setSelectedModule(null);
        setOpenModal(false);
    }



    // const handleDelete = () => {
    //     setModules(prevModules => prevModules.filter(user => !moduleSelection.selected.includes(user.id)));
    // }


    const handleEditClicked = () => {
        if (moduleSelection.selected.length === 0) {
            return
        }
        const module = modules.find(user => user.id === moduleSelection.selected[0]);
        setSelectedModule(module);
    }

    const handeNewClicked = () => {
        setSelectedModule(null);
        moduleSelection.handleDeselectAll()
        setTitle("New Module");
        setOpenModal(true);
    }

    const saveChanges = (module, picData, picFileName) => {
        console.log("Saving changes", module);
        const keyName =   `${university.id}/${picFileName}`
        setSelectedModule(null);
        initUpload(module, picData, keyName);
    }



    return (
        <Box sx={{display: "grid", placeItems: "center", width: "100%"}}>
            <Box sx={{display: "flex", width: "100%", mb: "20px"}}>
                <Card elevation={18} sx={{width: "100%", flex: 1, borderRadius: 2, bgcolor: "white",}}>
                    <Box sx={{m: "20px", mb: "0px"}}>
                        <Typography variant="h6" sx={{
                            alignItems: "center",
                            fontWeight: "bold",
                            color: darken("#a7c7e7", 0.5)
                        }}
                        >Module Management
                        </Typography>
                    </Box>
                    <Box>
                        <Stack direction="row"
                               justifyContent="space-between"
                               alignItems="start"
                               sx={{padding: "15px"}}
                        >
                            <Box sx={{width: "600px"}}>
                                <SearchBar setSearchTerm={setSearchTerm} resetList={resetList}
                                           placeHolder={`Search module by Name`}/>
                            </Box>
                            <Box sx={{mr: 4, display: "flex", gap: 2}}>
                                <IconButton
                                    color="primary"
                                    variant="contained"
                                    onClick={handeNewClicked}
                                    sx={{bgcolor: "lightgrey"}}>
                                    <SvgIcon sx={{fontSize: "30px"}}>
                                        <AddBoxIcon/>
                                    </SvgIcon>
                                </IconButton>
                                <IconButton
                                    color="primary"
                                    variant="contained"
                                    onClick={handleEditClicked}
                                    sx={{bgcolor: "lightgrey"}}>
                                    <SvgIcon sx={{fontSize: "30px"}}>
                                        <PencilSquareIcon />
                                    </SvgIcon>
                                </IconButton>
                                <IconButton
                                    color="primary"
                                    variant="contained"
                                    sx={{bgcolor: "lightgrey"}}
                                    onClick={handleDelete}
                                >
                                    <SvgIcon sx={{fontSize: "30px"}}>
                                        <TrashIcon />
                                    </SvgIcon>
                                </IconButton>
                            </Box>
                        </Stack>
                    </Box>

                    {/*<Box sx={{width: '100%',}}>*/}
                    {/*    <TabContext value={value}>*/}
                    {/*        <Box sx={{fontWeight: "bold"}}>*/}
                    {/*            <TabList*/}
                    {/*                variant="scrollable"*/}
                    {/*                scrollButtons="auto"*/}
                    {/*                indicatorColor="secondary"*/}
                    {/*                onChange={handleTabChange}>*/}

                    {/*                {tabConfig.map((tab, index) => (*/}
                    {/*                    <Tab key={index} label={tabLabels[tab.title]} value={tab.title}/>*/}
                    {/*                ))};*/}

                    {/*            </TabList>*/}
                    {/*        </Box>*/}
                    {/*    </TabContext>*/}
                    {/*</Box>*/}
                </Card>
            </Box>

            <Box sx={{"width": "100%", minHeight: "50vh"}}>
                <ModuleTable
                    modules={modules}
                    moduleSelection={moduleSelection}
                    setModules={setModules}
                    loading={loading}
                    newDataSaved={newDataSaved}
                />
            </Box>
            <EditModuleModal
                open={openModal} closeModal={closeModal}
                module={selectedModule}
                saveChanges={saveChanges}
            />
        </Box>
    );
}

export default ModuleManagement;