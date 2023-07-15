import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import './SideBarUser.scss'

function SideBarUser({ data }) {
    const { t } = useTranslation()

    return (
        <div className="sidebar-user-container">
            <div className="title">{t('detail-user.setting')}</div>
            <div className="list-action">
                {data &&
                    data.length > 0 &&
                    data.map((item, index) => {
                        return (
                            <NavLink key={index} className="action-item" to={item.to}>
                                <span className="icon"> {item.icon}</span>
                                <span className="sub-title"> {t(item.text)}</span>
                            </NavLink>
                        )
                    })}
            </div>
        </div>
    )
}

export default SideBarUser
