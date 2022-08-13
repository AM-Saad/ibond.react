import React, { useEffect, useState, useContext, useMemo } from "react";
import UserContext from "../../store/user-context";
import useHttp from "../../hooks/user-http";
import { useTranslation } from 'next-i18next'

import Google from "../../components/Auth/GoogleLogin";
import FacebookLoginComponent from "../../components/Auth/FacebookLogin";
import Logo from '../../assets/onhouse.png'
import Image from 'next/image'
import { serverSideTranslations,  } from 'next-i18next/serverSideTranslations';


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
    const { meta, setUserHandler, get_me, server_url } = useContext(UserContext)
    const { t } = useTranslation("home")
    const isLoading = useMemo(() => meta.loading || loading, [meta, loading])

    console.log(t)
    const success = (response: Response) => {
        setData(response);
        get_me(response.email)
    }

    const set_user = (response: any) => {
        setUserHandler(response.user)
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
            }, set_user)
        }
    }, [meta.error])
    return (
        <>
            <div className="actions">
                <Image
                    src={Logo}
                    alt="Abdelrahman Saad"
                    placeholder="blur"
                    width={70}
                    height={70}

                />

                <h1>On House</h1>
            </div>

            <h2>{t('setup_your_store')}</h2>
            <p>{t('agree_to_terms')}</p>
            <div className="actions">
                {isLoading && <p>{t('loading')}</p>}

                {!isLoading &&
                    <>
                        <FacebookLoginComponent onSubmit={success} onFailure={onFailure} />
                        <Google onSubmit={success} onFailure={onFailure} />
                    </>
                }
            </div>
            {error && <p className="text-danger"> {error}</p>}

        </>
    )
}

export const getStaticProps = async ({ locale }:any) => ({
    props: {
      ...await serverSideTranslations(locale, ['home', 'loading']),
    },
  })
  
export default Auth