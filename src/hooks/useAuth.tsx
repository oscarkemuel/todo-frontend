import { createContext, useContext, useState } from 'react';
import { IUser } from '../types';
import { api } from '../services/api';
import { useNavigate } from "react-router-dom";

interface ILoginData {
    email: string;
    password: string;
}

interface AuthContextData {
    handleLogin: (data: ILoginData) => void;
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

    const userIsLogged = !!user.name;

    async function handleLogin(data: ILoginData){
        api.post("/user/login", data).then(async (response) => {
            setUser(response.data.data)
            navigate(`/tasks/${response.data.data.id}`);
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <AuthContext.Provider value={{
            handleLogin,
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