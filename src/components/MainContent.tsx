import { useContext } from 'react'
import UserContext from "@/store/user-context";
import { Link } from 'react-router-dom'
import { StyledButton } from '@/styles/Button.styled.js'
import ErrorBox from '@/components/Common/ErrorBox';
import { useTranslation } from 'react-i18next'
import Logo from '../assets/onhouse.png'


function MainContent() {
    const { meta, user } = useContext(UserContext)
    const { t } = useTranslation()
    return (
        <>
            {meta.loading && <p className="loading">{t('loading')}</p>}
            {meta.error && !meta.loading && <ErrorBox errors={[meta.error]} />}

            {user && !meta.loading && <div>
                <div className="actions">
                    <h1>Keep On</h1>
                    <img className="logo" src={Logo} alt="Loyalty Program" />
                </div>

                <h2 className='text-center'>Hi, {user?.first_name}</h2>
                <h2 className='text-center'>{t('home.store_is_ready')}</h2>
                <div className='actions'>
                    <StyledButton><Link to="/qr">{t('buttons.get_qr')}</Link></StyledButton>
                    <StyledButton><Link to="/settings">{t('buttons.settings')}</Link></StyledButton>
                </div>
            </div>}

        </>
    )
}

export default MainContent