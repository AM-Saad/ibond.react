
import { useContext } from 'react'
import UserContext from '../../store/user-context';
import { Route, Redirect, useLocation } from 'react-router-dom'

const PrivateRoute: React.FC<any> = ({ children, ...props }) => {
    const location = useLocation()
    const { meta, loginRequired } = useContext(UserContext);
    return <Route {...props}
        render={_ => {
            if (!meta.isLoggedIn) {
                loginRequired()
                localStorage.setItem('redirect', location.pathname)
                return <Redirect to='/' />
            }
            return children;
        }} />;
}
export default PrivateRoute;