import { Outlet, useNavigate } from "react-router-dom";
import { useLoadMyProfileQuery } from "../store/apis/UserAPI";
import { FC, useEffect } from "react";

export const LoginGuard:FC = () => {
    let profile = useLoadMyProfileQuery()
    const navigate = useNavigate()
    useEffect(() => {
        if(!profile.isSuccess && !profile.isLoading)
        {            
            navigate('/login')   
        }
            
    }, [profile.isLoading])
    return <Outlet/>
}