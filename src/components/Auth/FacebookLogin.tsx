import React, { useState, useContext } from "react";
import UserContext from "@/store/user-context";
import FacebookLogin from "react-facebook-login";
import useHttp from "@/hooks/user-http";
import { useTranslation } from 'react-i18next'

interface Props {
    onSubmit: (data: any) => void;
    onFailure: (data: any) => void;
}
const FacebookLoginComponent: React.FC<Props> = ({ onSubmit, onFailure }) => {
    const { meta, setUserHandler, get_me, server_url } = useContext(UserContext)

    const responseFacebook = (response: any) => {
        // Login failed
        if (response.status === "unknown") {
            onFailure("Login failed!")
            return false;
        }
        const userInfo = {
            email: response.email,
            first_name: response.first_name,
            last_name: response.last_name,
            image: response.picture.data.url,
            facebook: true
        }
        onSubmit(userInfo)

    };



    return (
        <>

            <div className="container">
                <FacebookLogin
                    appId="596259188526542"
                    autoLoad={false}
                    fields="first_name,last_name,email,picture"
                    scope="public_profile,email,user_friends"
                    callback={responseFacebook}
                    icon="fa-facebook"
                />
            </div>
        </>
    );
}

export default FacebookLoginComponent;