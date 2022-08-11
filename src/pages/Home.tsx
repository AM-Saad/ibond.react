import { useContext, useMemo } from 'react'
import UserContext from "../store/user-context";

import FacebookLoginComponent from '../components/FacebookLogin'
import GoogleLogin from '../components/GoogleLogin'
import MainContent from '../components/MainContent'
const Home = () => {
    const { meta } = useContext(UserContext)

    return (
        <>
            {!meta.isLoggedIn &&
                <>
                    <FacebookLoginComponent />
                    <GoogleLogin />
                </>
            }
            {meta.isLoggedIn && <MainContent />}
        </>
    )
}

export default Home