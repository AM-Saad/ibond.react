import { Suspense, useContext, useEffect } from 'react';
import i18next from "i18next"

import { Route, Switch, useHistory } from 'react-router-dom'
import PrivateRoute from '@/components/Common/Private_route';
import { Nav } from './components/Common/Nav';

import Home from '@/pages/Home'
import QRPage from '@/pages/QR_Code'
import Settings from '@/pages/Settings'
import Loyalty from '@/pages/Loyalty'
import Upload_Bill from '@/pages/Upload_Bill'
import Thank_you from '@/pages/Thank_you'
import Confirm_Spend from '@/pages/Confirm_Spend'
import Show_Seller from '@/pages/Show_Seller'
import Privacy from '@/pages/Privacy'
import Terms from '@/pages/Terms'

import AmsLogo from '../public/full-vertical.png'
import NotFound from '@/pages/Not_Found'
import UserContext from "@/store/user-context";

function App() {
  const { meta } = useContext(UserContext)
  const history = useHistory()
  const privateRoutes = [
    { id: '1', element: Settings, path: '/settings' },
    { id: '2', element: QRPage, path: '/qr' },
    { id: '3', element: Upload_Bill, path: "/upload/:id" },
    { id: '4', element: Loyalty, path: "/loyalty/:id" },
    { id: '5', element: Thank_you, path: "/thank_you/:id" },
    { id: '6', element: Show_Seller, path: "/show_seller/:id" },
    { id: '7', element: Confirm_Spend, path: "/confirm_spend/:id" },
    { id: '8', element: Confirm_Spend, path: "/confirm_spend/:id" },
  ]

  const publicRoutes = [
    { id: '8', element: Home, path: "/" },
    { id: '9', element: Privacy, path: "/privacy" },
    { id: '10', element: Terms, path: "/terms" },

  ]

  useEffect(() => {
    const redirect = localStorage.getItem('redirect')
    if (redirect && meta.isLoggedIn) {
      history.push(redirect)
      localStorage.removeItem('redirect')
    }
  }, [meta.isLoggedIn])
  return (
    <>
      <Nav />
      <div className='wrapper' style={{ direction: i18next.language === 'ar' ? 'rtl' : 'ltr' }}>

        <Suspense fallback={null}>

          <div>
            <Switch>
              {privateRoutes.map(route => {
                const TopLevelComponent = route.element;
                return (<PrivateRoute exact key={route.id} path={route.path}> <TopLevelComponent /> </PrivateRoute>)
              })}

              {publicRoutes.map(route => {
                return (<Route exact key={route.id} component={route.element} path={route.path} />)
              })}
              <Route path="*" component={NotFound} />
            </Switch>
          </div>
        </Suspense>

      </div>
      <div className='footer'>
        <a target="_blank" href="https://www.amsaad.co/"> <img src={AmsLogo} alt="Abdelrahman Saad" /> </a>
      </div>
    </>

  )
}

export default App
