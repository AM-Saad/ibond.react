
import React, { useState, useEffect } from 'react';
import Meta from '../modals/Meta';
import User from '../modals/User'

import UserContextInterface from "../modals/user_context"

const UserContext = React.createContext<UserContextInterface>({
    url: '',
    server_url: '',
    user: null,
    meta: { isLoggedIn: true, loading: false, error: null },
    setUserHandler: (user: User) => { },
    get_me: (id: string) => { },
    get_store: (id: string) => { },
    currentStore: null,
    storeMeta: { isLoggedIn: true, loading: false, error: null },
    login: (email: string) => { },
    requiredAuth: false,
    loginRequired: () => { },
    logout: () => { }
})


export const UserContextProvider: React.FC<{ children: React.ReactNode }> = (props) => {
    const [user, setUser] = useState<User | null>(null)
    const [requiredAuth, setRequiredAuth] = useState<boolean>(false)
    const [meta, setMeta] = useState<Meta>({ isLoggedIn: true, loading: false, error: null })
    const [storeMeta, setStoreMeta] = useState<Meta>({ isLoggedIn: true, loading: false, error: null })
    const [currentStore, setCurrentStore] = useState<User | null>(null)

    const login = async (email: string) => {
        setMeta((prevState) => { return { ...prevState, loading: true, error: null } })

        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/login`,
                {
                    body: JSON.stringify({ email: email }),
                    method: 'Post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',

                    }
                })
            const json = await response.json()
            if (response.status === 200) {
                setUserHandler(json.user)
                localStorage.setItem('uid', json.token)
            }

            return setMeta((prevState) => { return { ...prevState, loading: false, error: json.message } })


        } catch (error) {
            return setMeta((prevState) => { return { ...prevState, loading: false, error: 'Something went wrong.' } })
        }
    }

    const get_me = async (token: string) => {
        setMeta((prevState) => { return { ...prevState, loading: true, error: null } })

        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/me`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: "Bearer " + token,

                }
            })
            const json = await response.json()
            if (response.status === 200) {
                setUserHandler(json.user)
            }

            return setMeta((prevState) => { return { ...prevState, loading: false, error: json.message } })


        } catch (error) {
            return setMeta((prevState) => { return { ...prevState, loading: false, error: 'Something went wrong.' } })
        }
    }

    const setUserHandler = (user: User) => {
        setUser(user)
        setMeta((prevState) => { return { ...prevState, isLoggedIn: true, loading: false, error: null } })

    }


    const get_store = async (id: string) => {
        setStoreMeta((prevState) => { return { ...prevState, loading: true, error: null } })

        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/store/${id}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    // Authorization: "Bearer " + token,

                }
            })
            const json = await response.json()
            if (response.status === 200) {
                setCurrentStore(json.store)
            }

            return setStoreMeta((prevState) => { return { ...prevState, loading: false, error: json.message } })


        } catch (error) {
            return setStoreMeta((prevState) => { return { ...prevState, loading: false, error: 'Something went wrong.' } })

        }
    }
    const logout = () => {
        localStorage.removeItem('uid')
        localStorage.removeItem('uem')
        setUser(null)
        setMeta((prev) => { return { ...prev, isLoggedIn: false, loading: false, error: null } })
    }
    const loginRequired = () => {
        setRequiredAuth(true)
    }
    useEffect(() => {
        const uid = localStorage.getItem('uid')
        if (uid) {
            get_me(uid)
        } else {
            setMeta((prev) => { return { ...prev, isLoggedIn: false, loading: false, error: null } })
        }
    }, [])
    const userCtx = {
        user,
        meta,
        setUserHandler,
        login,
        loginRequired,
        requiredAuth,
        get_me,
        logout,
        get_store,
        currentStore,
        storeMeta,
        url: 'https://keepon.store',
        server_url: import.meta.env.VITE_SERVER_URL
    }
    return <UserContext.Provider value={userCtx}>
        {props.children}
    </UserContext.Provider>
}

export default UserContext
