// import { GoogleLogin } from 'react-google-login';
// import { refreshTokenSetup } from '../hooks/refreshToken';
// import { GoogleLogin } from '@react-oauth/google';
import { gapi } from 'gapi-script';
import React, { useEffect } from 'react'

import { GoogleLogin, GoogleLogout } from 'react-google-login';




function Google() {

    const onSuccess = (response:any) => {
        console.log('SUCCESS', response);
    };
    const onFailure = (response:any) => {
        console.log('FAILED', response);
    };
    const onLogoutSuccess = () => {
        console.log('SUCESS LOG OUT');
    };

    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: "87231620963-rd7m2qmjk0nabct0npjeljs7guhvucn0.apps.googleusercontent.com",
                scope: 'email',
            });
        }

        gapi.load('client:auth2', start);
    }, []);


    return (
        <>

            <div>
                <GoogleLogin
                    clientId="87231620963-rd7m2qmjk0nabct0npjeljs7guhvucn0.apps.googleusercontent.com"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                />
                <GoogleLogout
                    clientId="87231620963-rd7m2qmjk0nabct0npjeljs7guhvucn0.apps.googleusercontent.com"
                    onLogoutSuccess={onLogoutSuccess}
                />
            </div>
        </>
    )
}

export default Google