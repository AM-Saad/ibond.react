import React from 'react'
import { useContext } from 'react'
import UserContext from "../../store/user-context";
import { StyleErrorBox } from '../../styles/ErrorBox.styled.js'
import { StyledButton } from '../../styles/Button.styled.js'
import { useTranslation } from 'react-i18next'

interface Props {
    errors: string[]
}

const ErrorBox: React.FC<Props> = ({ errors }) => {
    const { logout } = useContext(UserContext)
    const { t } = useTranslation()

    return (
        <StyleErrorBox>
            <h1>{t('error')}</h1>
            <div>
                {errors.map((i,idx) => <p className='message'>{idx + 1}-  {i}</p>)}
            </div>
            <p>Please try to login again</p>

            <StyledButton onClick={logout}>{t("buttons.login")}</StyledButton>

        </StyleErrorBox>

    )
}

export default ErrorBox