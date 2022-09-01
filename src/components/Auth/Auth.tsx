import React, { useEffect, useState, useContext, useMemo } from "react";
import UserContext from "@/store/user-context";
import useHttp from "@/hooks/user-http";
import { useTranslation } from 'react-i18next'
import Google from "@/components/Auth/GoogleLogin";
import FacebookLoginComponent from "@/components/Auth/FacebookLogin";
import Logo from '../../assets/onhouse.png'

interface Response {
    email: string;
    first_name: string
    last_name: string
    image: string
    facebook?: boolean
    google?: boolean
}
const Auth = () => {
    const [data, setData] = useState<Response>();
    const { error, loading, sendRequest } = useHttp()
    const { meta, login, requiredAuth, server_url } = useContext(UserContext)
    const { t } = useTranslation()
    const isLoading = useMemo(() => meta.loading || loading, [meta, loading])


    const success = (response: Response) => {
        setData(response);
        login(response.email)
    }

    const onFailure = (response: any) => {
        alert('Login failed 🥲')
    }

    useEffect(() => {
        if (meta.error && meta.error === 'User not found') {
            sendRequest({
                url: `${server_url}/user`, method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                },
            }, ({ user }: any) => login(user.email))
        }
    }, [meta.error])
    return (
        <>
            <div className="actions">
                <h1>Keep On</h1>
                <img className="logo" src={Logo} alt="Loyalty Program" />
            </div>

            <h2 className="text-center">{t('home.setup_your_store')}</h2>
            <p className="text-center" dangerouslySetInnerHTML={{ __html: t('home.agree_to_terms') }}></p>
            <div className="actions">
                {isLoading && <p className="loading">{t('loading')}</p>}
                {requiredAuth && <p className="loading text-warningr">{t('required_auth')} </p>}
                {!isLoading &&
                    <>
                        <FacebookLoginComponent onSubmit={success} onFailure={onFailure} />
                        <Google onSubmit={success} onFailure={onFailure} />
                    </>
                }
                {!meta.loading && !meta.error && <p className='text-danger'>{meta.error}</p>}

            </div>
            {error && <p className="text-danger"> {error}</p>}

        </>
    )
}

export default Auth