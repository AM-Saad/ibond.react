
import i18next from "i18next"
import { useEffect, useState } from "react"


const ToggleLang = () => {
    const [lang, setLang] = useState('')

    const changeLang = (lang: string) => {
        i18next.changeLanguage(lang)
    }

    useEffect(() => {
        const lang = localStorage.getItem('i18nextLng')
        setLang(lang || 'en')

    }, [])
    return (
        <>
            <div className="toggle_lang">

                <select name="lang" id="lang" onChange={(e) => changeLang(e.target.value)}>
                    <option selected={lang === 'en'} value="en" >EN</option>
                    <option selected={lang === 'ar'} value="ar" >AR</option>
                    <option selected={lang === 'fr'} value="fr" >FR</option>
                </select>
            </div>

        </>

    )
}

export default ToggleLang