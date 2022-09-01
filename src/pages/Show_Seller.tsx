import { useContext, useEffect, useMemo, useState } from 'react'
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
    const uid = localStorage.getItem('uid')

    const [storeObj, setStoreObj] = useState<any>()
    const [images, setImages] = useState<any>()
    const { server_url, user, get_me, meta, storeMeta, get_store, currentStore } = useContext(UserContext)
    const [askIfHeGotIt, setAskIfHeGotIt] = useState<boolean>(false)
    const isLoading = useMemo(() => meta.loading || storeMeta.loading, [meta, storeMeta])

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
        if (uid) get_me(uid)
        window.location.reload();

    }

    const gotIt = () => {
        const historyId = storeObj?.history[storeObj.history.length - 1].id || 0
        const token = localStorage.getItem('uid')

        sendRequest({
            url: `${server_url}/got_it/${currentStore?._id}?me=${user?._id}&&history=${historyId}`,
            method: 'Put',
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + token,
            }
        }, reload)

    }

    useEffect(() => {
        const askIfHeGotIt = localStorage.getItem('askIfHeGotIt')
        if (askIfHeGotIt) {
            setAskIfHeGotIt(true)
            localStorage.removeItem('askIfHeGotIt')
        }
        get_store(id)
        if (uid) get_me(uid)

    }, [])
    useEffect(() => {
        if (user && currentStore) {
            let store = user?.loyalty.find(i => i.store_id === currentStore?._id)
            store && setStoreObj(store)
            let bills = store?.bills_images.map(i => `${server_url}${i}`)
            setImages(bills)
        }
    }, [user, currentStore])
    return (
        <>
            {isLoading && <p className="loading">{t('loading')}</p>}
            {errors.length > 0 && <ErrorBox errors={errors} />}
            {currentStore && user && <div className="text-center">
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
                    {askIfHeGotIt &&
                        <>
                            <h3>{t('show_seller.got_it')}</h3>
                            {hookError && <p className='text-danger'>{hookError}</p>}
                            <div className='actions'>
                                <StyledButton disabled={loading}> <Link to={`/loyalty/${currentStore?._id}`}>{t('buttons.back')}</Link></StyledButton>
                                <StyledButton color='#b1ffb1' disabled={loading} onClick={gotIt}>{t('buttons.yes')}</StyledButton>
                            </div>
                        </>
                    }
                    {!askIfHeGotIt &&
                        <div className='actions'>
                            <StyledButton disabled={loading}> <Link to={`/loyalty/${currentStore?._id}`}>{t('buttons.back')}</Link></StyledButton>
                        </div>
                    }
                </>
                }


            </div>}


        </>
    )
}

export default Confirm_Spend