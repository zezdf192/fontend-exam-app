import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import Tippy from '@tippyjs/react/headless'
import {  faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink, Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { changeLanguage } from '../../../store/action/appAction'

import './HeaderHome.scss'
import ImgAvatar from '../../../component/ImgAvatar/ImgAvatar'
import WrapperPoper from '../../User/Ratings/WrapperPoper/WrapperPoper'
import UserMenu from './UserMenu/UserMenu'
import nonAvatar from '../../../styles/svg/avatar.jpg'
import { path } from '../../../until/constant'
import MobieMenu from '../../../component/MobieMenu/MobieMenu'
import { menuMobie } from '../../../component/RouteSideBar/menuMobie'

let copyFunction = () => {}

function HeaderHome({ changeElement = copyFunction, doExam = false }) {
    const { t } = useTranslation()
    const user = useSelector((state) => state.user)
   
    const app = useSelector((state) => state.app.language)
    const dispatch = useDispatch()
    let navigate = useNavigate()


    const [showMenuMobie, setShowMenuMobie] = useState(false)

    const [isShowUserInfo, setIsShowUserInfo] = useState(false)

    let handleChangeLanguage = (newLanguage) => {
        dispatch(changeLanguage(newLanguage))
    }

    let handleToLogin = () => {
        navigate('/login')
    }

    let onClickAvatar = () => {
        setIsShowUserInfo(true)
        
    }

    let handleHideResult = () => {
        setIsShowUserInfo(false)
    }

    let togglehMenuMobie = (boolean) => {
        setShowMenuMobie(boolean)
    }

    return (
        <>
            <MobieMenu
                togglehMenuMobie={togglehMenuMobie}
                doExam={doExam}
                changeElement={changeElement}
                listMenu={menuMobie}
                showMenuMobie={showMenuMobie}
            />
            <div className="headerhome-container">
                <div className="nav-body">
                    <div className="content-left-header">
                        <Link onClick={(e) => changeElement(e, path.home)} to={path.home} className="title-app">
                            ExamApp
                        </Link>
                    </div>
                    <div className="nav-bar">
                        <FontAwesomeIcon icon={faBars} onClick={() => togglehMenuMobie(true)} />
                    </div>
                    <div className="content-right-header">
                        <div className="navigate">
                            {/* <NavLink to="/admin/manageUser" className="item">
                            Quản lý người dùng
                        </NavLink> */}
                            {user && user.userInfo ? (
                                <NavLink
                                    to="/myExam"
                                    onClick={(e) => changeElement(e, path.myExam)}
                                    className="item your-exam"
                                >
                                    {t('home-page.your-exam')}
                                </NavLink>
                            ) : (
                                <></>
                            )}

                            <div className="language">
                                <span
                                    className={app === 'en' ? 'active' : ''}
                                    onClick={() => handleChangeLanguage('en')}
                                >
                                    EN
                                </span>
                                <span
                                    className={app === 'vi' ? 'active' : ''}
                                    onClick={() => handleChangeLanguage('vi')}
                                >
                                    VN
                                </span>
                            </div>
                            {/* <div className="welcome">
                                {t('home-page.hello', { name: user && user.userInfo && user.userInfo.name })}{' '}
                            </div> */}
                            {user.isLoggedIn ? (
                                <>
                                    <Tippy
                                        render={(attrs) => (
                                            <div className="box" style={{ minWidth: '230px' }} tabIndex="-1" {...attrs}>
                                                <WrapperPoper>
                                                    <UserMenu doExam={doExam} changeElement={changeElement} />
                                                </WrapperPoper>
                                            </div>
                                        )}
                                        visible={isShowUserInfo}
                                        interactive
                                        placement="bottom-start"
                                        onClickOutside={handleHideResult}
                                    >
                                        <div className="avatar-user">
                                            <ImgAvatar
                                                onClick={onClickAvatar}
                                                alt="no-img"
                                                src={
                                                    user && user.userInfo && user.userInfo.avatar
                                                        ? user.userInfo.avatar
                                                        : nonAvatar
                                                }
                                            />
                                        </div>
                                    </Tippy>

                                    {/* <button onClick={handleLogOut} className="item">
                                        <FontAwesomeIcon icon={faArrowRightFromBracket} />
                                    </button> */}
                                </>
                            ) : (
                                <button onClick={handleToLogin} className="item">
                                    {t('log-in.login')}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HeaderHome
