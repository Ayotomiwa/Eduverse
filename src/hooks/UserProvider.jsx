import {createContext, useState, useContext, useEffect, useRef} from 'react';
import { jwtDecode } from 'jwt-decode';
import {useLocation, useNavigate} from "react-router-dom";

const UserContext = createContext(null);

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {

    const API_GATEWAY = useRef("http://localhost:8222").current
    const location = useLocation();
    const [user, setUser] = useState(null);
    const [changesMade, setChangesMade] = useState(false);
    const [university, setUniversity] = useState(null);
    const [jwtToken, setJwtToken] = useState(null);
    const [isAuthenticating, setIsAuthenticating] = useState(true);
    let storedPath;



    useEffect(() => {
        setIsAuthenticating(true);
        setChangesMade(false);
        const publicPaths = ['/login', '/register'];
        if(publicPaths.includes(location.pathname)){
            setIsAuthenticating(false);
            return;
        }
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            const decodedToken = jwtDecode(JSON.parse(storedUserData).token);
            const currentTime = Date.now() / 1000;
            if (decodedToken.exp < currentTime) {
                console.log("Token expired");
                localStorage.removeItem('user');
                localStorage.removeItem('userData');
                localStorage.removeItem('jwtToken');
                localStorage.removeItem('university');
                setUser(null);
            } else {
                setUser(JSON.parse(storedUserData).user);
                setUniversity(JSON.parse(storedUserData).user.university);
                setJwtToken(JSON.parse(storedUserData).token);
            }
        }
        else {
            setUser(null);
            console.log("No user data found");
            window.location.pathname = '/login';
        }
        setIsAuthenticating(false);
    }, []);



    useEffect(() => {
        if(user && !isAuthenticating && changesMade){
            console.log("CHANGES MADE", changesMade);
            const storedUserData = localStorage.getItem('userData');
            setUser(JSON.parse(storedUserData).user);
            setUniversity(JSON.parse(storedUserData).user.university);
            setJwtToken(JSON.parse(storedUserData).token);
            setChangesMade(false);
        }
    }, [changesMade]);


    const login = (data, path) => {
        setUser(data.user);
        setJwtToken(data.token);
        setUniversity(data.user.university);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('userData', JSON.stringify(data));
        localStorage.setItem('jwtToken', JSON.stringify(data.token));
        localStorage.setItem('university', JSON.stringify(data.user.university));

        if(path){
            window.location.pathname = path;
        }
        else{
            storedPath = localStorage.getItem('pathBeforeLogin');
            if(storedPath){
                    window.location.href = storedPath;
                }
            else{
                window.location.pathname = '/feed';
            }
        }
        setIsAuthenticating(false);
    };

    const logout = () => {
           localStorage.clear()
           setUser(null);
           setUniversity(null);
           setJwtToken(null);
           window.location.pathname = '/login';
    };


    const changeTheme = (primary, secondary) => {
        setUniversity({
           ...university,
              primaryTheme: primary,
              secondaryTheme: secondary
        });
        const userData = JSON.parse(localStorage.getItem('userData'));
        userData.user.university = {
            ...university,
            primaryTheme: primary,
            secondaryTheme: secondary
        }
        localStorage.setItem('userData', JSON.stringify(userData));
        setChangesMade(true);
        // localStorage.setItem('university', JSON.stringify(newUniversity));
    }

    const changeFeatureSettings = (newFeatureSettings) => {
        setUniversity({
            ...university,
            universityFeatures: newFeatureSettings
        });
        const userData = JSON.parse(localStorage.getItem('userData'));
        userData.user.university = {
            ...university,
            universityFeatures: newFeatureSettings
        }
        localStorage.setItem('userData', JSON.stringify(userData));
        setChangesMade(true);
    }

    const updateUniversityDetails = (contact, logoUrl) => {
        setUniversity({
            ...university,
            contactNo: contact,
            logoUrl: logoUrl
        });
        const userData = JSON.parse(localStorage.getItem('userData'));
        userData.user.university = {
            ...university,
            contactNo: contact,
            logoUrl: logoUrl
        }
        localStorage.setItem('userData', JSON.stringify(userData));
        setChangesMade(true);
    }



    return (
        <UserContext.Provider value={{ user,
            jwtToken,
            university,
            login,
            API_GATEWAY,
            isAuthenticating,
            logout,
            changeTheme,
            changeFeatureSettings,
            updateUniversityDetails,
        }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
