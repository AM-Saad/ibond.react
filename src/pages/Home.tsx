import { useContext, useMemo } from 'react'
import UserContext from "../store/user-context";
import Auth from '@/components/Auth/Auth';
import MainContent from '../components/MainContent'
const Home = () => {
    const { meta } = useContext(UserContext)

    return (
        <>
            {!meta.isLoggedIn &&
                <>
                 <Auth />
                </>
            }
            {meta.isLoggedIn && <MainContent />}
        </>
    )
}

export default Home