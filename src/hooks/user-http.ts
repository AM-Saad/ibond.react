import React, { useEffect, useState } from "react";


interface Config {
    url: string,
    method?: string,
    body?: any
    headers?: any
}
const useHttp = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const sendRequest = async <T>(config: Config, dataLoaded: (data: any) => void) => {
        setLoading(true)
        setError(null)
        try {

            const res = await fetch(config.url, {
                method: config.method ? config.method : 'GET',
                headers: config.headers ? config.headers : {},
                body: config.body ? config.body : null,
            })

            const data = await res.json()
            setLoading(false)

            if (res.status === 200 || res.status === 201) {
                dataLoaded(data)
            } else {
                setError(data.message)
            }
        } catch (error: any) {
            setLoading(false)
            setError(error.message || 'Something went wrong')

        }
    }

    return {
        loading, error, sendRequest
    }
}

export default useHttp