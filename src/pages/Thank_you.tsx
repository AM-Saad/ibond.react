import { useContext, useEffect } from 'react'
import UserContext from "../store/user-context";
import { useParams } from 'react-router-dom'
import { StyledButton } from '../styles/Button.styled.js'
import { useTranslation } from 'react-i18next'

const Thank_You = () => {
    const { get_store, currentStore } = useContext(UserContext)
    const params = useParams()
    const { id }: any = params
    const { t } = useTranslation()

    useEffect(() => {
        get_store(id)
    }, [])
    return (
        <>
            <div className="actions" style={{justifyContent: 'start'}}>
                <img className='store-logo small' src={currentStore?.image} alt="" />
                <h3>{currentStore?.store_name}</h3>
            </div>
            <h1>{t('thank_you.title')}</h1>
            <h2>{t('thank_you.sub_title')}</h2>
            <div className="">
                <StyledButton> <a href={`/confirm_spend/${currentStore?._id}`}>{t('buttons.use_your_points')}</a></StyledButton>
            </div>
        </>
    )
}

export default Thank_You