import { connect } from "react-redux";
import { RootState } from "../store/store";
import { Navigate, Outlet } from "react-router-dom";
import { useLoadMyProfileQuery } from "../store/apis/UserAPI";

interface PrivateRouteProps {
    isAuth: boolean
}

function PrivateRoutes ({isAuth, }: PrivateRouteProps) {
    const profile = useLoadMyProfileQuery()
    if (profile.isLoading) {
       return (<>Загрузка</>) 
    }
    
    return isAuth? <Outlet/>: <Navigate to={'/login'}/>
}

function mapStateToProps(state: RootState){
    return {
        isAuth: state.authReducer.isAuth,
    }
}

export default connect(mapStateToProps)(PrivateRoutes)