import React, { useMemo, useContext, useState } from 'react'
import UserContext from "@/store/user-context";
import Modal from './UI/Modal'
import { useTranslation } from 'react-i18next'
import moment from 'moment';
import { FaCheckCircle } from 'react-icons/fa';
import { AiFillCloseCircle } from "react-icons/ai";
import { MdHistory } from "react-icons/md";

import i18next from "i18next"
import useHttp from "../hooks/user-http";
import { useHistory } from 'react-router-dom'


function History() {
    const { user, currentStore, server_url, meta } = useContext(UserContext)
    const [isOpenModal, setIsOpenModal] = useState(false)

    const storeObj = useMemo(() => user?.loyalty.find(i => i.store_id === currentStore?._id), [currentStore]);
    const itemsDidntGet = useMemo(() => storeObj?.history.filter(i => i.done === false).length, [storeObj]);

    const { error: hookError, loading, sendRequest } = useHttp()
    let history = useHistory()

    const { t } = useTranslation()


    const reload = (data: any) => {
        window.location.reload();

    }

    const gotIt = (historyId: string | number) => {
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
    return (
        <div style={{ direction: i18next.language === 'ar' ? 'rtl' : 'ltr' }}>


            {storeObj && <div className="">
                <p className="actions small-btn" onClick={() => setIsOpenModal(true)}>
                    {t('history')}{itemsDidntGet! <= 0 && <MdHistory />}
                    {itemsDidntGet! > 0 && <span className="text-success items-available">
                        {itemsDidntGet}
                    </span>}
                </p>

            </div>}
            <Modal styles={""} open={isOpenModal} close={() => setIsOpenModal(false)}>
                <div>
                    <h2>{t('history')}</h2>
                    {hookError && <p className='text-danger'>{hookError}</p>}
                    {meta.loading && <p >{t('loading')}</p>}
                    {!meta.loading && storeObj && storeObj?.history.length === 0 && <p >{t('empty_history')}</p>}
                    {!meta.loading && !storeObj && <p className='text-danger'>{t('error')}</p>}

                    {storeObj && storeObj?.history.length > 0 &&
                        <ul>
                            {storeObj?.history.reverse().map(i =>
                                <>
                                    <li key={i.id}>
                                        <p>{t('date')}: {moment(i.date).format("YYYY-MM-DD HH:mm")}</p>
                                        <div className='actions' style={{ justifyContent: "start" }}>
                                            {t('gotit')}: {i.done ? t('buttons.yes') : t('buttons.no')} {i.done ? <FaCheckCircle color="green" /> : <AiFillCloseCircle color='red' />}
                                            {!i.done ? <button onClick={() => gotIt(i.id)} disabled={loading} className='small-btn'>{t('mark_as_done')} {loading ? '...' : ''}</button> : ''}
                                        </div>
                                    </li>
                                    <hr />
                                </>

                            )}
                        </ul>}
                </div>
                { }
            </Modal>
        </div>
    )
}

export default History