import { useContext, useEffect, useMemo } from 'react'
import UserContext from "../store/user-context";
import { Link, useParams, useHistory } from 'react-router-dom'
import useHttp from "../hooks/user-http";
import { StyledButton } from '../styles/Button.styled.js'
import ErrorBox from '../components/Common/ErrorBox';
import { useTranslation } from 'react-i18next'
import i18next from "i18next"

const Confirm_Spend = () => {
    let history = useHistory()
    const params = useParams()
    const { id }: any = params
    const { meta, user, server_url, get_store, storeMeta, currentStore } = useContext(UserContext)
    const { t } = useTranslation()

    const { error: hookError, loading, sendRequest } = useHttp()

    const points = useMemo(() => user?.loyalty.find(i => i.store_id === currentStore?._id)?.points || 0, [currentStore]);
    const isLoading = useMemo(() => meta.loading || storeMeta.loading, [meta, storeMeta])

    const errors = useMemo(() => {
        let items = []
        if (meta.error) items.push(meta.error)
        if (storeMeta.error) items.push(storeMeta.error)
        return items
    }, [meta, storeMeta])

    const done = () => {
        get_store(id)
        localStorage.setItem('askIfHeGotIt', "true")
        return history.push(`/show_seller/${currentStore?._id}`)
    }

    const confirm_spend = () => {
        const token = localStorage.getItem('uid')

        sendRequest({
            url: `${server_url}/confirm_spend/${currentStore?._id}?me=${user?._id}`,
            method: 'PUT',
            body: null,
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + token,
            }
        }, done)

    }
    useEffect(() => {

        get_store(id)
    }, [])
    return (
        <>
            {isLoading && <p>{t('loading')}</p>}

            {errors.length > 0 && <ErrorBox errors={errors} />}
            {hookError && <p className='text-danger'>{hookError}</p>}
            {!isLoading && errors.length === 0 && currentStore && user && <div>
                {points < currentStore?.to_buy_number && <div>
                    <h1>{t('confirm_spend.you_dont_have_enough_points')}</h1>
                    <h2>{t('confirm_spend.you_have')} {points}</h2>
                    <h2>{t('confirm_spend.you_need')} {currentStore?.to_buy_number}</h2>
                    <div className="actions">

                        <StyledButton> <Link to={`/loyalty/${currentStore?._id}`}>{t('buttons.back')}</Link></StyledButton>
                    </div>

                </div>}

                {points >= currentStore?.to_buy_number && <div>
                    <h1>{t('confirm_spend.are_you_sure')} {currentStore?.to_buy_number} {`${i18next.language != 'ar' ? `point ${currentStore?.to_buy_number > 1 ? "(s)" : ''}` : ""} `}</h1>
                    <div className="actions">
                        <StyledButton disabled={loading} onClick={confirm_spend}>{t('buttons.yes')}</StyledButton>
                        <StyledButton disabled={loading}> <Link to={`/loyalty/${currentStore?._id}`}>{t('buttons.no')}</Link></StyledButton>
                    </div>
                </div>}

            </div>}


        </>
    )
}

export default Confirm_Spend