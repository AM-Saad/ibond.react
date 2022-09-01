import { gapi } from 'gapi-script';
import React, { useEffect } from 'react'

import { GoogleLogin } from 'react-google-login';


interface Props {
    onSubmit: (data: any) => void;
    onFailure: (data: any) => void;
}

const Google: React.FC<Props> = ({ onSubmit, onFailure }) => {

    const onSuccess = ({ profileObj }: any) => {
        const userInfo = {
            email: profileObj.email,
            first_name: profileObj.givenName,
            last_name: profileObj.familyName,
            image: profileObj.imageUrl,
            google: true
        }
        onSubmit(userInfo);
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
            <GoogleLogin
                clientId="87231620963-rd7m2qmjk0nabct0npjeljs7guhvucn0.apps.googleusercontent.com"
                onSuccess={onSuccess}
                onFailure={onFailure}
                style={{ fontSize: '21px', padding: '.5rem' }}
            />
        </>
    )
}

export default Google