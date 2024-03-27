import {createContext, useState, useContext, useEffect} from 'react';
import { jwtDecode } from 'jwt-decode';
import {useLocation, useNavigate} from "react-router-dom";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [university, setUniversity] = useState(null);


    const [lastUser, setLastUser] = useState(null);
    const [isAuthenticating, setIsAuthenticating] = useState(true);
    const [timedOut, setTimedOut] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    let storedPath;



    useEffect(() => {
        setIsAuthenticating(true);
        // const user = localStorage.getItem('user');
        const lastUser = localStorage.getItem('lastUser');
        if(lastUser){
            setLastUser(JSON.parse(lastUser));
        }
        // if (user) {
        //     const decodedToken = jwtDecode(JSON.parse(user).token);
        //     const tokenLifespan = decodedToken.exp - decodedToken.iat;
        //     const halfExpiryTime = decodedToken.iat + (tokenLifespan / 2);
        //     if (halfExpiryTime * 1000 < Date.now()) {
        //         localStorage.removeItem('user');
        //         setTimedOut(true);
        //     } else {
        //         setUser(JSON.parse(user));
        //     }
        // }else {
           setUser({
                id: 1,
                username: "omopea2",
                firstName: "Ayotomiwa",
                lastName: "Omope",
                authority: "ADMIN",
                userType: "STUDENT",
                modifiedAt: null,
                email: "omopea2@lsbu.ac.uk",
                university: {
                    id: 1,
                    name: "London South Bank University",
                    verified: true,
                    contactNo: "020 7815 7815",
                    domain: "lsbu.ac.uk",
                    logoUrl: "https://www.lsbu.ac.uk/",
                    theme: {}
                },
                featureFlags: {
                    GROUP: true,
                    CONTENT_POSTING: true,
                    CONTENT_FEED: true,
                    MODULE: true
                },
                authorizedUsers: {
                    GROUP: "ADMIN",
                    CONTENT_POSTING: "ADMIN",
                    PRIVATE_MESSAGING: "ADMIN",
                    CONTENT_FEED: "ADMIN",
                    MODULE: "ADMIN"
                },
                profileInfo: {
                    id: 1,
                    bio: "I am a student at London South Bank University",
                    profilePicture: "https://www.lsbu.ac.uk/",
                    coverPicture: "https://www.lsbu.ac.uk/"
                },
                student: {
                    id: 1,
                    studentNumber: "345221",
                    startYear: 2012,
                    course: {
                        id: 1,
                        courseCode: "4703",
                        courseName: "BSc Computer Science",
                        duration: null,
                        department: {
                            id: 1,
                            departmentName: "Engineering",
                            departmentType: "ACADEMIC",
                            departmentCode: "ENG"
                        }
                    }
                },
                "staff": null,
                "active": false,
                "banned": false,
            })
               setUniversity({
                   university: {
                       id: 1,
                       name: "London South Bank University",
                       verified: true,
                       contactNo: "020 7815 7815",
                       domain: "lsbu.ac.uk",
                       logoUrl: "https://www.lsbu.ac.uk/",
                       theme: {}
                   },
                   featureFlags: {
                       GROUP: true,
                       CONTENT_POSTING: true,
                       CONTENT_FEED: true,
                       EVENTS: false,
                       MODULE: true,
                       POST_COMMENTING: true,

                   },
                   authorizedUsers: {
                       GROUP: "ADMIN",
                       CONTENT_POSTING: "ADMIN",
                       PRIVATE_MESSAGING: "ADMIN",
                       CONTENT_FEED: "ADMIN",
                       MODULE: "ADMIN",
                       POST_COMMENTING: "ADMIN",
                   },
               })
        setIsAuthenticating(false);
        setIsLoading(false);
        console.log(user)
    }, []);



    const login = (user, path) => {
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));

        if(path){
            window.location.pathname = path;
        }
        else{
            storedPath = localStorage.getItem('pathBeforeLogin');
            if(storedPath){
                if(storedPath.includes('/contract/edit') && (lastUser?.id !== user?.id || lastUser?.businessId !== user?.businessId) && timedOut){
                    storedPath = '/';

                    setTimedOut(false);
                }
                else if(storedPath.includes('/contract/edit')){
                    window.location.href = storedPath;
                }
                else{
                    console.log("storedPath else", storedPath)
                }
            }
            else{
                window.location.pathname = '/';
            }
        }
        setLastUser(user);
    };

    const logout = () => {
        // setIsAuthenticating(true)
        localStorage.removeItem('lastUser');
        localStorage.removeItem('user');
        localStorage.removeItem('pathBeforeLogin');
            return new Promise((resolve) => {
                setTimedOut(false);
                setUser(null);
                resolve();
            });
    };

    return (
        <UserContext.Provider value={{ user, university,  login, isAuthenticating, logout, timedOut}}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
