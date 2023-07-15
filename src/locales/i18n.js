// i18n.js
import { useEffect } from 'react'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import enTranslation from './en.json'
import viTranslation from './vi.json'

const resources = {
    en: {
        translation: enTranslation,
    },
    vi: {
        translation: viTranslation,
    },
}

i18n.use(initReactI18next).init({
    resources,
    lng: 'vi',
    fallbackLng: 'vi',
    interpolation: {
        escapeValue: false,
    },
})

const languageSelector = (state) => state.app.language

const I18nProvider = ({ children }) => {
    const dispatch = useDispatch()
    const language = useSelector(languageSelector)

    useEffect(() => {
        i18n.changeLanguage(language)
    }, [language])

    return <>{children}</>
}

export default I18nProvider
