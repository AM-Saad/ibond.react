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
    <div>
      {meta.loading && <p className="loading">{t('loading')}</p>}
      {meta.error && !meta.loading && <ErrorBox errors={[meta.error]} />}
      {!meta.loading && !meta.error && <div style={{ textAlign: 'center' }}>
        <p className={classes.print}>{t('print')}</p>
        <h1>{user?.store_name}</h1>
        <div>
          {user && <QRCode value={`${url}/upload/${user?._id}`} />}
        </div>
      </div>}
    </div>
  )
}

export default QR_Code