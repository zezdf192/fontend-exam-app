import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import 'firebase/compat/auth'
import { fetchUserLoginWithSocial, fetchUserLogin } from '../../store/action/userAction'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import FirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

import './Login.scss'
import vietnamese from '../../styles/icon/vietnam.jpg'
import america from '../../styles/icon/america.jpg'
import { path } from '../../until/constant'
import { changeLanguage } from '../../store/action/appAction'

import firebase from 'firebase/compat/app'

import Spiner from '../../component/Spiner/Spiner'

function Login({ history }) {
    const { t } = useTranslation()
    const language = useSelector((state) => state.app.language)
    let navigate = useNavigate()
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()

    let [loadingApi, setLoadingApi] = useState(false)


    //state
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errEmail, setErrEmail] = useState('')
    const [errPassword, setErrPassword] = useState('')

    const handleLoginSuccess = async (authResult) => {
        const { user } = authResult
        setLoadingApi(true)
        await dispatch(fetchUserLoginWithSocial(user))
        setLoadingApi(false)
        if (user) {
            navigate('/')
        }
    }

    const uiConfig = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',
        signInSuccessUrl: '/',

        // We will display Google and Facebook as auth providers.
        signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
        callbacks: {
            signInSuccessWithAuthResult: (authResult) => {
                handleLoginSuccess(authResult)
                return false
            },
        },
    }

    let handleLogin = async () => {
        let isCheck = true
        if (!email) {
            setErrEmail(`log-in.err-email`)
            isCheck = false
        } else {
            const regex =
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            if (!regex.test(email)) {
                setErrEmail(`log-in.format-email`)
                isCheck = false
            } else {
                setErrEmail('')
            }
        }
        if (!password) {
            setErrPassword(`log-in.err-password`)
            isCheck = false
        } else {
            setErrPassword('')
        }

        if (isCheck) {
            setLoadingApi(true)
            let respon = await dispatch(fetchUserLogin({ email, password }))
            if (respon) {
                if (respon.errCode === 2) {
                    setErrEmail(`log-in.email-exist`)
                }
                if (respon.errCode === 3) {
                    setErrPassword(`log-in.incorrect-password`)
                }

                if (respon.errCode === 0) {
                    if (respon.data.roleID === 'R1') {
                        navigate('/admin/manageUser')
                    } else {
                        navigate('/')
                    }
                }
            }
            setLoadingApi(false)
        }
    }

    let handleChangeLanguage = () => {
        let newLanguage = language === 'en' ? 'vi' : 'en'
        dispatch(changeLanguage(newLanguage))
    }

    return (
        <div className="login-container">
            <div className="language">
                <img
                    className="flag-language"
                    onClick={() => handleChangeLanguage()}
                    src={language === 'en' ? america : vietnamese}
                    alt=""
                />
            </div>

            <div className="login-content">
                <div className="content-left">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" alt=''/>
                </div>
                <div className="content-right row">
                    <div className="col-12">
                        <h3 className="title"> {t('log-in.login')}</h3>
                    </div>
                    <div className="col-12  ">
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyDown={() => setErrEmail('')}
                            onKeyUp={(e) => {
                                if (e.keyCode === 13) {
                                    handleLogin()
                                }
                            }}
                            className={errEmail.length > 0 ? 'form-control py-3 input-error' : 'form-control py-3'}
                            type="email"
                            placeholder={t('log-in.email')}
                            required
                        />
                        <span className="error">{t(errEmail)}</span>
                    </div>
                    <div className="col-12 mt-5">
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={() => setErrPassword('')}
                            onKeyUp={(e) => {
                                if (e.keyCode === 13) {
                                    handleLogin()
                                }
                            }}
                            className={errPassword.length > 0 ? 'form-control py-3 input-error' : 'form-control py-3'}
                            type="password"
                            placeholder={t('log-in.password')}
                        />
                        <span className="error">{t(errPassword)}</span>
                    </div>
                    <div className="col-12 form-group mt-5">
                        <div className="forgot-password">{t('log-in.forgot-password')}</div>
                    </div>
                    <div className="col-12 form-group mt-5">
                        <button onClick={handleLogin} className="btn sign-in">
                            {t('log-in.login')}
                        </button>
                    </div>
                    <div className="col-12 divider my-5">
                        <p className="spacer">{t('log-in.or')}</p>
                    </div>
                    <div className="col-12 form-group">
                        {/* <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} /> */}
                        {/* <button className="btn facebook-btn">
                            {t('log-in.continue', { social: 'FACEBOOK' })}

                            <img className="facebook" src={facebook} alt="" />
                        </button> */}
                    </div>
                    <div className="col-12 form-group social">
                        <FirebaseAuth className="firebase-google" uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
                        {/* <button className="btn google-btn">
                            {t('log-in.continue', { social: 'GOOGLE' })}

                            <img className="google" src={google} alt="" />
                        </button> */}
                    </div>
                    <div className="col-12">
                        <p className="sign-up">
                            {t('log-in.donot-account')}
                            <Link to={path.signUp}> {t('log-in.register')}</Link>
                        </p>
                    </div>
                </div>
            </div>
            <Spiner loading={loadingApi} />
        </div>
    )
}

export default Login
