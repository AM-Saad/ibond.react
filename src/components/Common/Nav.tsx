import React, {useContext} from 'react'
import Logo from '../../assets/onhouse.png'
import History from '@/components/History'
import ToggleLang from '@/components/Common/Toggle_Lang'
import UserContext from "@/store/user-context";
import { GoogleLogout } from 'react-google-login';
export const Nav:React.FC = () => {
  const { logout, meta, user } = useContext(UserContext)

    return (
        <div className="actions" style={{ "justifyContent": 'space-between', margin: '1.5rem' }}>
            <a className='actions' href="/">
                <img className="logo logo-small" src={Logo} alt="Loyalty Program" />
            </a>
            <div className='actions'>
                <History />
                <ToggleLang />
                {meta.isLoggedIn &&
                    <>
                        {!user?.isGoogle && <button onClick={logout}>Logout</button>}
                        {user?.isGoogle && <GoogleLogout
                            clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                            buttonText="Logout"
                            onLogoutSuccess={logout}
                        >
                        </GoogleLogout>}
                    </>

                }
            </div>
        </div>
    )
}
