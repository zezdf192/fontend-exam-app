import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import './SideBar.scss'

function SideBar({ data }) {
    const { t } = useTranslation()
    const location = useLocation()
    let isActive = location.pathname.startsWith('/ratings')

    return (
        <div className="sidebar-container">
            <div className="list-action">
                {data &&
                    data.length > 0 &&
                    data.map((item, index) => {
                        return (
                            <NavLink
                                key={index}
                                className={
                                    isActive
                                        ? item.to === '/ratings/examId'
                                            ? 'active action-item'
                                            : ' action-item'
                                        : 'action-item'
                                }
                                to={item.to}
                            >
                                {t(item.text)}
                            </NavLink>
                        )
                    })}
            </div>
        </div>
    )
}

export default SideBar
