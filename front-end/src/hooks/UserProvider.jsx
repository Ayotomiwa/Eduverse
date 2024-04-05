import {createContext, useState, useContext, useEffect} from 'react';
import { jwtDecode } from 'jwt-decode';
import {useLocation, useNavigate} from "react-router-dom";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {

    const[data, setData] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [university, setUniversity] = useState(null);
    const [jwtToken, setJwtToken] = useState(null);


    const [lastUser, setLastUser] = useState(null);
    const [isAuthenticating, setIsAuthenticating] = useState(true);
    const [timedOut, setTimedOut] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    let storedPath;




    useEffect(() => {
        setIsAuthenticating(true);
        const storedUserData = localStorage.getItem('userData');
        const lastUser = localStorage.getItem('lastUser');
        if (lastUser) {
            setLastUser(JSON.parse(lastUser));
        }
        if (storedUserData) {
            const decodedToken = jwtDecode(JSON.parse(storedUserData).token);
            const tokenLifespan = decodedToken.exp - decodedToken.iat;
            const halfExpiryTime = decodedToken.iat + (tokenLifespan / 2);
            if (halfExpiryTime * 1000 < Date.now()) {
                localStorage.removeItem('user');
                localStorage.removeItem('userData');
                localStorage.removeItem('jwtToken');
                localStorage.removeItem('university');
                setTimedOut(true);
            } else {
                setUser(JSON.parse(storedUserData).user);
                // console.log("UNIVERSITY ELSE", JSON.parse(storedUserData).user.university)
                setUniversity(JSON.parse(storedUserData).user.university);
                setJwtToken(JSON.parse(storedUserData).token);
            }
        }
        else {
            setTimedOut(true);
        }
        setIsAuthenticating(false);
        setIsLoading(false);
    }, []);



    useEffect(() => {
        const publicPaths = ['/login', '/register'];

        if (!isAuthenticating && !user && !publicPaths.includes(location.pathname)) {
            if(location.pathname.includes('/contract/edit')){
                localStorage.setItem('pathBeforeLogin', window.location.href);
            }
            else {
                localStorage.setItem('pathBeforeLogin', location.pathname);
            }
            window.location.pathname = '/login';
        }
    }, [user, navigate, isAuthenticating, timedOut]);


    const login = (data, path) => {
        setData(data);
        setUser(data.user);
        setJwtToken(data.token);
        setUniversity(data.user.university);
        console.log("UNIVERSITY", data.user.university)
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
                window.location.pathname = '/home';
            }
        }
        setLastUser(user);
        setIsAuthenticating(false);
    };

    const logout = () => {
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
        <UserContext.Provider value={{ user,
            jwtToken,
            university,
            login,
            isAuthenticating,
            logout,
            timedOut}}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
