import React, { useState, useContext, useEffect } from 'react'
import useHttp from "../hooks/user-http";
import { Link } from 'react-router-dom'
import UserContext from "../store/user-context";
import UploadImage from "../components/UI/Upload_image"
import { StyledInput } from '../styles/Input.styled.js'
import { StyledButton } from '../styles/Button.styled.js'
import ErrorBox from '../components/Common/ErrorBox';
import { useTranslation } from 'react-i18next'
import Notification from '../components/Common/Notification'
import { Formik } from "formik";
import * as Yup from "yup";
import Input from "../components/UI/Input"


const validationScheme = Yup.object({
  storename: Yup.string()
    .required("Required"),
  items: Yup.number()
    .required("Required")
    .min(1, 'Items must be at least 1')
})


const Settings = () => {
  const { server_url, user, meta } = useContext(UserContext)

  const [imageFiles, setImageFiles] = useState<[]>([])
  const { error, loading, sendRequest } = useHttp()

  const cleanInputValues = React.useRef<any>(null)
  const [notification, setNotification] = useState<{ message: string | null, type: string | null }>({ message: null, type: null })
  const [initialValues, setInitialValues] = useState({})

  const { t } = useTranslation()


  const imageSelectHandler = (file: any) => {
    setImageFiles(file)
  }


  const update = (data: any) => {
    const newForm = new FormData()
    for (const img of imageFiles) {
      newForm.append('image', img)
    }
    newForm.append('storeName', data.storename)
    newForm.append('itemToBuy', data.items)
    newForm.append('appUrl', server_url)
    sendRequest({
      url: `${server_url}/update_account/${user?._id}`,
      method: 'PUT',
      body: newForm,

    }, show_notification)
  }


  const show_notification = () => {
    setNotification({ message: 'Infromation has been updated', type: 'success' })
  }
  const clear_notification = () => {
    setNotification({ message: null, type: 'success' })

  }
  useEffect(() => {
    if (user) {
      setInitialValues({ storename: user.store_name, items: user.to_buy_number })
    }
    if (error) {
      setNotification({ message: error, type: 'danger' })
    }
  }, [user, error])

  return (
    <>
      {meta.loading && <p>{t('loading')}</p>}
      {!meta.loading && meta.error && <ErrorBox errors={[meta.error]} />}
      {!meta.loading && !meta.error && user &&

        <>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationScheme}
            onSubmit={async (values, { setSubmitting }) => {
              update(values)
            }}
          >
            {({ handleSubmit, errors }: any) => {
              return (
                <form onSubmit={handleSubmit}>
                  <Notification onClose={clear_notification} message={notification.message} type={notification.type} />
                  <Input
                    label={t('settings.name_input')}
                    name="storename"
                    type="text"
                    placeholder="My Awesome Store"
                  />

                  <Input
                    label={t('settings.items_input')}
                    name="items"
                    type="number"
                    placeholder="3"
                  />
                  <StyledInput>
                    <label htmlFor="">{t('settings.logo_input')}</label>
                    <UploadImage cleanInputValues={cleanInputValues} onSelectImage={imageSelectHandler} alt={'Your Logo'} />
                  </StyledInput>

                  <div className="actions">
                    <StyledButton type="button" disabled={loading}><Link to="/"> {t('buttons.back')}</Link></StyledButton>
                    <StyledButton disabled={Object.entries(errors).length > 0 || loading} >{t('buttons.update')}</StyledButton>
                  </div>

                </form>
              )
            }
            }
          </Formik>

        </>}

    </>
  )
}

export default Settings