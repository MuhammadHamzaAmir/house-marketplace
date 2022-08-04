import { Navigate, Outlet } from "react-router-dom"
import { useAuthStatus } from "../hooks/useAuthStatus";

const PrivateRoute = () => {

    const {loggedIn,loadingStatus} = useAuthStatus();

    if(loadingStatus){
        return (
          <div>
            <h4>Loading...</h4>
          </div>
        );
    }

    return ( loggedIn ? <Outlet/> : <Navigate to="/sign-in" /> 
    )
}

export default PrivateRoute