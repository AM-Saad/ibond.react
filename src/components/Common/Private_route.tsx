
import {useContext} from 'react'
import UserContext from '../../store/user-context';
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute:React.FC<any> = ({ children, ...props }) => {
  const { meta } = useContext(UserContext);
  return <Route {...props}
      render={_ => {
          if (!meta.isLoggedIn)
              return <Redirect to='/' />;
          return children;
      }} />;
}
export default PrivateRoute;