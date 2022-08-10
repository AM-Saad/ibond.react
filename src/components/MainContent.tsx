import { useContext } from 'react'
import UserContext from "../store/user-context";
import { Link } from 'react-router-dom'
import { StyledButton } from '../styles/Button.styled.js'
import ErrorBox from '../components/Common/ErrorBox';
import { useTranslation } from 'react-i18next'
// import { DateTime } from 'luxon'


function MainContent() {
    const { meta, user } = useContext(UserContext)
    const { t } = useTranslation()
    return (
        <>
            {meta.loading && <p>{t('loading')}</p>}
            {meta.error && !meta.loading && <ErrorBox errors={[meta.error]} />}

            {user && !meta.loading && <div>
                <h1>IBond</h1>
                <h2>Hi, {user?.first_name}</h2>
                <h2>{t('home.store_is_ready')}</h2>
                <div className='actions'>
                    <StyledButton><Link to="/qr">{t('buttons.get_qr')}</Link></StyledButton>
                    <StyledButton><Link to="/settings">{t('buttons.settings')}</Link></StyledButton>
                </div>
            </div>}

        </>
    )
}

export default MainContent