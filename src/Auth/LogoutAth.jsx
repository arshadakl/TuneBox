import { Navigate, Outlet } from 'react-router-dom';
import { getToken } from '../utils/tokenService';
function LogoutAth() {
    const token = getToken()
    return token ?  <Navigate to='/' /> : <Outlet /> 
}

export default LogoutAth
