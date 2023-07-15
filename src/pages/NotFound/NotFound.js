import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { path } from '../../until/constant'


import './NotFound.scss'

function NotFound() {
    const { t } = useTranslation()
    const user = useSelector((state) => state.user)
    const language = useSelector((state) => state.app.language)
    return (
        <div className="not-found-container">
            <div className="not-found-header">
                <Link className="title" to={path.home}>
                    ExamApp
                </Link>
            </div>
            <div className="not-found-body">
                <h2 className="code">404</h2>
                <h4 className="not-found-title">{t('not-found.no-data')}</h4>
                <ul>
                    <li>{t('not-found.url-top')}</li>
                    <li>{t('not-found.url-bottom')}</li>
                </ul>

                <p>
                    <Link className="button" to={path.home}>
                        {t('not-found.access-homepage')}
                    </Link>
                </p>

                <p>
                    👉 {t('not-found.or-go-to')}
                    <Link className="login" to={path.login}>
                        {t('not-found.login')}
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default NotFound
