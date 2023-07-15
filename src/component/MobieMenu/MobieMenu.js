import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import OutsideClickHandler from 'react-outside-click-handler'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import {  useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faArrowRightFromBracket,
    faEarthAmerica,
    faHome,  
} from '@fortawesome/free-solid-svg-icons'

import './MobieMenu.scss'
import ImgAvatar from '../ImgAvatar/ImgAvatar'
import { path } from '../../until/constant'
import { changeLanguage } from '../../store/action/appAction'
import ModalNotify from '../Modal/ModalNotify'
import { fetchLogOut } from '../../store/action/userAction'

function MobieMenu({
    showMenuMobie = false,
    togglehMenuMobie = () => {},
    listMenu = [],
    doExam = false,
    changeElement,
}) {
    const { t } = useTranslation()
    const user = useSelector((state) => state.user)
    const app = useSelector((state) => state.app.language)
    let navigate = useNavigate()
    const dispatch = useDispatch()

    const [isOpenModal, setIsOpenModal] = useState(false)
    const [descriptionModal, setDescriptionModal] = useState('')

   

    let handleChangeLanguage = (newLanguage) => {
        dispatch(changeLanguage(newLanguage))
    }

    let handleCloseModal = () => {
        setIsOpenModal(false)
        setDescriptionModal('')
    }

    let handleSubmitModal = async () => {
        dispatch(fetchLogOut())
        navigate('/login')
    }

    let handleLogOut = (e) => {
        if (doExam) {
            changeElement(e, `/login`)
            return
        }
        setIsOpenModal(true)
        setDescriptionModal('modal.log-out')
    }

    let renderListMenu = () => {
        return listMenu.map((list) => {
            return (
                <div className="mobie-item" style={{ marginTop: '12px' }}>
                    {list.map((item, index) => {
                        return (
                            <div className="description">
                                <NavLink
                                    key={index}
                                    onClick={(e) => changeElement(e, item.to)}
                                    className="link"
                                    to={item.to}
                                >
                                    {item.icon}
                                    {t(item.text)}
                                </NavLink>
                            </div>
                        )
                    })}
                </div>
            )
        })
    }

    return (
        <>
            {showMenuMobie ? (
                <div className="mobie-modal">
                    <OutsideClickHandler
                        onOutsideClick={() => {
                            togglehMenuMobie(false)
                        }}
                    >
                        <div className="mobie-body">
                            <div className="mobie-navbar">
                                <div className="mobie-header">
                                    {user.isLoggedIn ? (
                                        <>
                                            <ImgAvatar
                                                style={{ width: '80px', height: '80px' }}
                                                alt="no-img"
                                                src={user && user.userInfo && user.userInfo.avatar}
                                            />
                                            <div className="mobie-title">
                                                <span className="name">
                                                    {user && user.userInfo && user.userInfo.name}
                                                </span>
                                            </div>
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                                {user.isLoggedIn ? (
                                    <>
                                        <div className="mobie-bottom">
                                            {renderListMenu()}

                                

                                           

                                          

                                            <div className="mobie-item" style={{ marginTop: '12px' }}>
                                                {/* <div className="description">
                                                    <FontAwesomeIcon className="icon" icon={faGear} />
                                                    <Link className="link" to={path.setting}>
                                                        {t('detail-user.setting')}
                                                    </Link>
                                                </div> */}

                                                <div className="description-language">
                                                    <div className="left">
                                                        <span className="link">
                                                            {' '}
                                                            <FontAwesomeIcon
                                                                className="icon"
                                                                icon={faEarthAmerica}
                                                            />{' '}
                                                            {t('home-page.language')}
                                                        </span>
                                                    </div>
                                                    <div className="right">
                                                        <span
                                                            className={app === 'en' ? 'language active' : 'language'}
                                                            onClick={() => handleChangeLanguage('en')}
                                                        >
                                                            EN
                                                        </span>
                                                        <span
                                                            className={app === 'vi' ? 'language active' : 'language'}
                                                            onClick={() => handleChangeLanguage('vi')}
                                                        >
                                                            VN
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mobie-item" style={{ marginBottom: '0' }}>
                                                <div className="description">
                                                    <>
                                                        <Link className="link" onClick={handleLogOut}>
                                                            <FontAwesomeIcon
                                                                className="icon"
                                                                icon={faArrowRightFromBracket}
                                                            />
                                                            {t('detail-user.log-out')}
                                                        </Link>
                                                    </>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="mobie-bottom">
                                            <div className="mobie-item" style={{ marginBottom: '0' }}>
                                                <div className="description">
                                                    <>
                                                       
                                                        <Link className="link" style={{fontSize: '2.4rem'}} to={path.login}>
                                                            {t('log-in.login')}
                                                        </Link>
                                                    </>
                                                </div>
                                            </div>
                                            <div className="mobie-item" style={{ marginTop: '12px' }}>
                                                <div className="description">
                                                   
                                                    <Link className="link" to={`/`}>
                                                    <FontAwesomeIcon className="icon" icon={faHome} />
                                                        {t('result.homepage')}
                                                    </Link>
                                                </div>
                                            </div>

                                            <div className="mobie-item" style={{ marginTop: '12px' }}>
                                                

                                                <div className="description-language">
                                                    <div className="left">
                                                       
                                                        <span className="link">
                                                        <FontAwesomeIcon className="icon" icon={faEarthAmerica} />
                                                             {t('home-page.language')}</span>
                                                    </div>
                                                    <div className="right">
                                                        <span
                                                            className={app === 'en' ? 'language active' : 'language'}
                                                            onClick={() => handleChangeLanguage('en')}
                                                        >
                                                            EN
                                                        </span>
                                                        <span
                                                            className={app === 'vi' ? 'language active' : 'language'}
                                                            onClick={() => handleChangeLanguage('vi')}
                                                        >
                                                            VN
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </OutsideClickHandler>
                </div>
            ) : (
                <></>
            )}
            {isOpenModal && (
                <ModalNotify
                    typeModal="user"
                    isOpenModal={isOpenModal}
                    descriptionModal={descriptionModal}
                    handleCloseModal={handleCloseModal}
                    handleSubmitModal={handleSubmitModal}
                />
            )}
        </>
    )
}

export default MobieMenu
