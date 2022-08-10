import React, { useEffect, useState, useContext } from "react";
import UserContext from "../store/user-context";
import FacebookLogin from "react-facebook-login";
import useHttp from "../hooks/user-http";
import { useTranslation } from 'react-i18next'

function FacebookLoginComponent() {
    const [data, setData] = useState<any>({});
    const { error, loading, sendRequest } = useHttp()
    const { meta, setUserHandler, get_me, server_url } = useContext(UserContext)
    const { t } = useTranslation()

    const responseFacebook = (response: any) => {
        // Login failed
        if (response.status === "unknown") {
            alert("Login failed!");
            return false;
        }
        setData(response);
        if (response.accessToken) {
            get_me(response.email)
        }
    };

    const set_user = (response: any) => {
        setUserHandler(response.user)

    }

    useEffect(() => {
        if (meta.error && meta.error === 'User not found') {
            sendRequest({
                url: `${server_url}/user`, method: 'POST', body: JSON.stringify({ first_name: data.first_name, last_name: data.last_name, email: data.email, image: data.picture.data.url }), headers: {
                    'Content-Type': 'application/json'
                },
            }, set_user)

        }
    }, [meta.error])

    return (
        <>
            <h1>IBond</h1>

            <h2>{t('home.setup_your_store')}</h2>
            <p>{t('home.agree_to_terms')}</p>
            <div className="container">
                <FacebookLogin
                    appId="596259188526542"
                    autoLoad={false}
                    fields="first_name,last_name,email,picture"
                    scope="public_profile,email,user_friends"
                    callback={responseFacebook}
                    icon="fa-facebook"
                />
                {meta.error && <p className="text-danger"> {meta.error}</p>}
            </div>
        </>
    );
}

export default FacebookLoginComponent;