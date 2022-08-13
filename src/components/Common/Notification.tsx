import React, { useEffect, useState } from 'react'

import { StyledNotification } from '../../styles/Notification.styled'

interface Props {
    message: string | null,
    type: string | null
    onClose: () => void
}
const Notification: React.FC<Props> = ({ message, type, onClose }) => {
    const [currentMessage, setCurrentMessage] = useState<string | null>(message)
    const close = () => {
        setCurrentMessage(null)
        onClose()
    }
    useEffect(() => {
        const timers = setTimeout(() => {
            close()
        }, 5000);
        setCurrentMessage(message)
        return () => clearTimeout(timers)
    }, [message, currentMessage])
    return (
        <>
             <StyledNotification isActive={currentMessage ? true : false} type={type}>
                <span className='close' onClick={close}>X</span>
                <p> {currentMessage}</p>
            </StyledNotification>
        </>
    )
}

export default Notification