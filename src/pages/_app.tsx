// import Layout from '../components/layout'
import Image from 'next/image'

import { useContext } from 'react';
import UserContext from "../store/user-context";
import Logo from '../assets/onhouse.png'
import AmsLogo from '../../public/full-vertical.png'
import ToggleLang from '../components/Common/Toggle_Lang'
import { UserContextProvider } from '../store/user-context'
import '../index.css'

export default function MyApp({ Component, pageProps }: any) {
    const { logout, meta } = useContext(UserContext)

    // useEffect(() => {
    //     const redirect = localStorage.getItem('redirect')
    //     if (redirect && meta.isLoggedIn) {
    //         history.push(redirect)
    //         localStorage.removeItem('redirect')
    //     }
    // }, [meta.isLoggedIn])
    return (
        <>
            <UserContextProvider>

                <div className="actions" style={{ "justifyContent": 'space-between', margin: '1.5rem' }}>
                    <a className='actions' href="/">
                        <Image
                            src={Logo}
                            alt="Loyalty Program"
                            width={50}
                            height={50}
                            placeholder="blur"
                        />
                    </a>
                    <div className='actions'>
                        <ToggleLang />
                        {meta.isLoggedIn && <button onClick={logout}>Logout</button>}
                    </div>
                </div>
                <div className='wrapper'>

                    <Component {...pageProps} />
                </div>
                <div className='footer'>
                    <a target="_blank" href="https://www.amsaad.co/">
                        <Image
                            src={AmsLogo}
                            alt="Abdelrahman Saad"
                            placeholder="blur"
                        />
                    </a>
                </div>
            </UserContextProvider>

        </>
    )
}