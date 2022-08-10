import { useContext } from 'react'
import QRCode from "react-qr-code";
import UserContext from "../store/user-context";
import classes from '../styles/QR.module.css'
import ErrorBox from '../components/Common/ErrorBox';
import { useTranslation } from 'react-i18next'

const QR_Code = () => {
  const { user, url, meta } = useContext(UserContext)
  const { t } = useTranslation()

  return (
    <>
      {meta.loading && <p>{t('loading')}</p>}
      {meta.error && !meta.loading && <ErrorBox errors={[meta.error]} />}
      {!meta.loading && !meta.error && <div>
        <p className={classes.print}>PRINT THIS SCREEN TO USE AS QR</p>
        <h1>{user?.store_name}</h1>
        <div>
          {user && <QRCode value={`${url}/${user?._id}`} />}
        </div>
      </div>}
    </>
  )
}

export default QR_Code