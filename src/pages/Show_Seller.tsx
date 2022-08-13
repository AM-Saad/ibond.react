import { useContext, useEffect, useMemo } from 'react'
import UserContext from "../store/user-context";
import { useParams, Link } from 'react-router-dom'
import ErrorBox from '../components/Common/ErrorBox';
import BillsGallery from '../components/UI/Bills_Gallery';
import moment from 'moment';
import { StyledButton } from '../styles/Button.styled'
import { useTranslation } from 'react-i18next'

const Confirm_Spend = () => {
    const params = useParams()
    const { id }: any = params
    const { t } = useTranslation()

    const { server_url, user, meta, storeMeta, get_store, currentStore } = useContext(UserContext)

    const storeHistory = useMemo(() => user?.loyalty.find(i => i.store_id === currentStore?._id), [currentStore]);
    const images = useMemo(() => storeHistory?.bills_images.map(i => `${server_url}${i}`), [storeHistory]);
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
    useEffect(() => {
        get_store(id)

    }, [id])
    return (
        <>
            {isLoading && <p>{t('loading')}</p>}
            {errors.length > 0 && <ErrorBox errors={errors} />}
            {currentStore && user && <div>
                <h1>{currentStore.store_name}</h1>

                {!storeHistory?.last_redeem_date && <>
                    <h2>{t('show_seller.empty_history')}</h2>
                    <div className='actions'>
                        <StyledButton> <Link to={`/loyalty/${currentStore?._id}`}>{t('buttons.back')}</Link></StyledButton>
                    </div>

                </>}
                {storeHistory?.last_redeem_date && <> <h2 className='show_seller'>{t('show_seller.title')}</h2>
                    <h3 >{convertDate(storeHistory?.last_redeem_date!)}</h3>
                    {images && images.length > 0 && <BillsGallery images={images} />}
                </>
                }
                <div className='actions'>
                    <StyledButton> <Link to={`/loyalty/${currentStore?._id}`}>{t('buttons.back')}</Link></StyledButton>
                </div>
            </div>}


        </>
    )
}

export default Confirm_Spend