import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import Modal from './UI/Modal'
import { useTranslation } from 'react-i18next'
import { MdQrCodeScanner } from "react-icons/md";
import { useHistory } from 'react-router-dom'

const ScanQR = (props: any) => {
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [data, setData] = useState("no")
    const { t } = useTranslation()
    const history = useHistory()


    return (
        <>
            <p className="actions small-btn" onClick={() => setIsOpenModal(true)}>
                {t('scan')} <MdQrCodeScanner />
            </p>

            <Modal styles={""} open={isOpenModal} close={() => setIsOpenModal(false)}>

                {isOpenModal &&
                    <div>

                        <QrReader

                            onResult={(result: any, error: any) => {
                                if (!!result) {
                                     window.location.href = result.text
                                     setData(result.text)
                                }

                                if (!!error) {
                                    console.info(error);
                                }
                            }}
                            constraints={{ facingMode: 'environment' }}
                        />
                            <p>{data}</p>

                    </div>

                }
            </Modal>
        </>
    );
};

export default ScanQR