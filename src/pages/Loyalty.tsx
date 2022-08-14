import { useContext, useEffect, useMemo } from 'react'
import UserContext from "../store/user-context";
import { Link, useParams } from 'react-router-dom'
import { StyledButton } from '../styles/Button.styled.js'
import ErrorBox from '../components/Common/ErrorBox';
import { useTranslation } from 'react-i18next'

const Loylaty = () => {
    const params = useParams()
    const { id }: any = params
    const { meta, user, get_store, storeMeta, currentStore } = useContext(UserContext)
    const { t } = useTranslation()

    const isLoading = useMemo(() => meta.loading || storeMeta.loading, [meta, storeMeta])

    const errors = useMemo(() => {
        let items = []
        meta.error && items.push(meta.error)
        storeMeta.error && items.push(storeMeta.error)
        return items
    }, [meta, storeMeta])

    useEffect(() => {
        if (id) {
            get_store(id)
        }

    }, [id])
    return (
        <>
            {isLoading && <p>{t('loading')}</p>}
            {errors.length > 0 && !isLoading && <ErrorBox errors={errors} />}
            {errors.length === 0 && !isLoading && currentStore &&
                <>
                  
                    <img className='store-logo' src={currentStore.image} alt="" />
                    <h1>{currentStore.store_name}</h1>
                    <div className="actions">
                        <StyledButton> <Link to={`/confirm_spend/${currentStore?._id}`}>{t('buttons.use_your_points')}</Link></StyledButton>
                        <StyledButton><Link to={`/upload/${id}`}>{t('buttons.upload_to_redeem')}</Link></StyledButton>
                    </div>
                </>

            }

        </>
    )
}

export default Loylaty