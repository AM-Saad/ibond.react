import React, { useEffect } from 'react'

import classes from '../../styles/Modal.module.css'

interface Props {
    open: boolean,
    close: () => void,
    children: React.ReactNode,
    styles: string
}
const Modal: React.FC<Props> = ({ open, close, children, styles }) => {

    useEffect(() => {
        document.addEventListener('keydown', (e: KeyboardEvent) => {
            if (e.key === "Escape") return close()
        })
        return () => document.removeEventListener('keydown', close)
    })
    return (
        <div onClick={close} className={`${classes['modal']} ${open ? classes["modal--open"] : classes["modal--close"]}`}>
            <div onClick={(e) => e.stopPropagation()} className={`shadow-lg rounded-md p-5 bg-white ${styles} ${classes["modal-content"]}`}>
                <span className={` ${classes['close-button']}`} onClick={close}>X</span>
                <span className="modalText">{children}</span>
            </div>
        </div>
    )
}

export default Modal