import React, { useState, useContext, useEffect, useMemo } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import UserContext from "../store/user-context";
import useHttp from "../hooks/user-http";
import UploadImage from "../components/UI/Upload_image"
import { StyledButton } from '../styles/Button.styled'
import ErrorBox from '../components/Common/ErrorBox';
import { useTranslation } from 'react-i18next'

const Upload_Bill = () => {
    const { server_url, user, get_store, storeMeta, meta, currentStore } = useContext(UserContext)
    const [imageFiles, setImageFiles] = useState<[]>([])
    const cleanInputValues = React.useRef<any>(null)
    const params = useParams()
    const { id }: any = params
    let history = useHistory()
    const { t } = useTranslation()

    const { error:hookError, loading, sendRequest } = useHttp()

    const errors = useMemo(() => {
        let items = []
        if (meta.error) items.push(meta.error)
        if (storeMeta.error) items.push(storeMeta.error)
        return items
    }, [meta.error, storeMeta.error])

    const imageSelectHandler = (file: any) => {
        setImageFiles(file)
    }

    const reload = (data: any) => {
        return history.push(`/thank_you/${currentStore?._id}`)

    }

    const uploadImage = () => {
        const newForm = new FormData()
        for (const img of imageFiles) {
            newForm.append('image', img)
        }
        sendRequest({
            url: `${server_url}/upload_bill/${currentStore?._id}?me=${user?._id}`,
            method: 'PUT',
            body: newForm,
        }, reload)

    }

    useEffect(() => {
        if (id) {
            get_store(id)
        }

    }, [id])
    return (
        <>
            {storeMeta.loading && meta.loading && <p>{t('loading')}</p>}

            {errors.length > 0 && <ErrorBox errors={errors} />}

            {!storeMeta.loading && errors.length === 0 && <div>
                <h1>{t('upload_bill.title')}</h1>
                <p className='text-gray'>{t('upload_bill.warning')}</p>
                {hookError && <p className='text-danger'>{hookError}</p>}
                <UploadImage cleanInputValues={cleanInputValues} onSelectImage={imageSelectHandler} alt="Your Bill" />
                <div className="actions">
                    <StyledButton disabled={loading}><Link to={`/loyalty/${currentStore?._id}`}>{t('buttons.back')}</Link></StyledButton>
                    <StyledButton disabled={loading} onClick={uploadImage}>{t('buttons.upload')}</StyledButton>
                </div>


            </div>}
        </>
    )
}

export default Upload_Bill