import { useContext, useEffect, useMemo } from 'react'
import UserContext from "../store/user-context";
import { useParams, Link, useHistory } from 'react-router-dom'
import ErrorBox from '../components/Common/ErrorBox';
import BillsGallery from '../components/UI/Bills_Gallery';
import moment from 'moment';
import { StyledButton } from '../styles/Button.styled.js'
import { useTranslation } from 'react-i18next'
import useHttp from "../hooks/user-http";

const Confirm_Spend = () => {
    const params = useParams()
    const { id }: any = params
    const { t } = useTranslation()
    let history = useHistory()
    const { error: hookError, loading, sendRequest } = useHttp()


    const { server_url, user, get_me, meta, storeMeta, get_store, currentStore } = useContext(UserContext)

    const storeObj = useMemo(() => user?.loyalty.find(i => i.store_id === currentStore?._id), [currentStore]);
    const images = useMemo(() => storeObj?.bills_images.map(i => `${server_url}${i}`), [storeObj]);
    const isLoading = useMemo(() => meta.loading || storeMeta.loading, [meta, storeMeta])
    console.log(storeObj)

    const errors = useMemo(() => {
        let items = []
        if (meta.error) items.push(meta.error)
        if (storeMeta.error) items.push(storeMeta.error)
        return items
    }, [meta, storeMeta])

    const convertDate = (date: string) => {
        var datetime = new Date(date);
        return moment(datetime).format("YYYY-MM-DD HH:mm");
    }
    const reload = (data: any) => {
        return history.push(`/loyalty/${currentStore?._id}`)
    }

    const getIt = () => {
        const historyId = storeObj?.history[storeObj.history.length - 1].id || 0
        sendRequest({
            url: `${server_url}/got_it/${currentStore?._id}?me=${user?._id}&&history=${historyId}`,
            method: 'Put'
        }, reload)

    }

    useEffect(() => {
        get_store(id)
        const uid = localStorage.getItem('uid')
        if (uid) get_me(uid)
    }, [])
    return (
        <>
            {isLoading && <p>{t('loading')}</p>}
            {errors.length > 0 && <ErrorBox errors={errors} />}
            {currentStore && user && <div>
                <h1>{currentStore.store_name}</h1>

                {!storeObj?.last_redeem_date && <>
                    <h2>{t('show_seller.empty_history')}</h2>
                    <div className='actions'>
                        <StyledButton> <Link to={`/loyalty/${currentStore?._id}`}>{t('buttons.back')}</Link></StyledButton>
                    </div>
                </>}
                {storeObj?.last_redeem_date && <>
                    <h2 className='show_seller'>{t('show_seller.title')}</h2>
                    <h3 >{convertDate(storeObj?.last_redeem_date!)}</h3>
                    {images && images.length > 0 && <BillsGallery images={images} />}
                    <h3>{t('show_seller.got_it')}</h3>
                    {hookError && <p className='text-danger'>{hookError}</p>}
                    <div className='actions'>
                        <StyledButton disabled={loading}> <Link to={`/loyalty/${currentStore?._id}`}>{t('buttons.back')}</Link></StyledButton>
                        <StyledButton disabled={loading} onClick={getIt}>{t('buttons.yes')}</StyledButton>
                    </div>
                </>
                }


            </div>}


        </>
    )
}

export default Confirm_Spend