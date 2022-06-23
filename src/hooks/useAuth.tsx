import { createContext, useContext, useEffect, useState } from 'react';
import { IUser } from '../types';
import { api } from '../services/api';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

interface ILoginData {
    email: string;
    password: string;
}

interface AuthContextData {
    handleLogin: (data: ILoginData) => void;
    handleLogOut: () => void;
    user: IUser,
    userIsLogged: boolean;
}

interface AuthProviderProps {
    children: React.ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps){
    const navigate = useNavigate();
    const [user, setUser] = useState({} as IUser)

    const userIsLogged = !!user.id;

    async function handleLogin(data: ILoginData){
        api.post("/user/login", data).then(async (response) => {
            setUser(response.data.data)
            localStorage.setItem("user", JSON.stringify(response.data.data));
            navigate(`/tasks`);
        }).catch(() => {
            toast.error('Ocorreu algum problema ao tentar logar');
        });
    }

    function handleLogOut(){
        setUser({} as IUser)
        localStorage.removeItem("user");
        navigate('/login');
    }

    useEffect(() => {
        async function getUserStoraged(){
            const userStoragedData = localStorage.getItem("user");

            if(!userStoragedData){
                return navigate('/login');
            }

            const user = JSON.parse(userStoragedData) as IUser;

            setUser(user);
            navigate('/')
        }

        getUserStoraged();
    }, []);

    return (
        <AuthContext.Provider value={{
            handleLogin,
            handleLogOut,
            user,
            userIsLogged
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    const context = useContext(AuthContext);

    if(!context){
        throw new Error('useAuth must be used within a AuthProvider');
    }

    return context;
}