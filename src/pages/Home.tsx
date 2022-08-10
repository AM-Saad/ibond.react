import { useContext, useMemo } from 'react'
import UserContext from "../store/user-context";

import FacebookLoginComponent from '../components/FacebookLogin'
import MainContent from '../components/MainContent'
const Home = () => {
    const { meta } = useContext(UserContext)

    return (
        <>
            {!meta.isLoggedIn && <FacebookLoginComponent />}
            {meta.isLoggedIn && <MainContent />}
        </>
    )
}

export default Home