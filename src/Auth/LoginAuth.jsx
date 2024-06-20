import { Navigate, Outlet } from 'react-router-dom';
import { getToken } from '../utils/tokenService';
function LoginAuth() {
    const token = getToken()
    return token ? <Outlet /> : <Navigate to='/login' />
}

export default LoginAuth
