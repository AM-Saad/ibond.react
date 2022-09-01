import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import Modal from './UI/Modal'
import { useTranslation } from 'react-i18next'

const ScanQR = (props: any) => {
    const [data, setData] = useState('No result');
    const [isOpenModal, setIsOpenModal] = useState(false)
    const { t } = useTranslation()

    return (
        <>
            <p className="actions small-btn" onClick={() => setIsOpenModal(true)}>
                {t('scan')}
            </p>

            <Modal styles={""} open={isOpenModal} close={() => setIsOpenModal(false)}>

                <QrReader
                    onResult={(result: any, error: any) => {
                        if (!!result) {
                            setData(result?.text);
                        }

                        if (!!error) {
                            console.info(error);
                        }
                    }}
                    constraints={{ facingMode: 'environment' }}
                />
                <p>{data}</p>
            </Modal>
        </>
    );
};

export default ScanQR