import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import FirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { path } from '../../until/constant'
import './SignUp.scss'
import vietnamese from '../../styles/icon/vietnam.jpg'
import america from '../../styles/icon/america.jpg'
import { createNewUser, fetchUserLoginWithSocial } from '../../store/action/userAction'
import { changeLanguage } from '../../store/action/appAction'
import Spiner from '../../component/Spiner/Spiner'

function SignUp() {
    //redux
    const { t } = useTranslation()
    const language = useSelector((state) => state.app.language)
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    let navigate = useNavigate()

    let [loadingApi, setLoadingApi] = useState(false)

    //init state
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')

    const [roleID, setRoleID] = useState('')

    //err state
    const [errEmail, setErrEmail] = useState('')
    const [errName, setErrName] = useState('')
    const [errPassword, setErrPassword] = useState('')
    const [errRepeatPassword, setErrRepeatPassword] = useState('')

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

    let handleValidate = () => {
        let isCheck = true
        let data = { email, name, password, repeatPassword }
        
        if (data.password) {
            if (password.length < 6) {
                isCheck = false
                setErrPassword('log-in.err-password-long')
            } else {
                setErrPassword('')
            }
        } else {
            isCheck = false
            setErrPassword('log-in.err-password')
        }

        
        if (data.repeatPassword) {
            if (password !== repeatPassword) {
                isCheck = false
                setErrRepeatPassword(`log-in.not-correct`)
            } else {
                setErrRepeatPassword('')
            }
        } else {
            isCheck = false
            setErrRepeatPassword('log-in.err-confirm-password')
        }

        //email
        if (data.email) {
            const regex =
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            if (!regex.test(email)) {
                setErrEmail(`log-in.format-email`)
                isCheck = false
            } else {
                setErrEmail('')
            }
        } else {
            isCheck = false
            setErrEmail('log-in.err-email')
        }
        //name
        if (!data.name) {
            isCheck = false
            setErrName('log-in.err-name')
        } else {
            setErrName('')
        }

        return {
            isCheck,
            data,
        }
    }

    const handleSignUp = async () => {
        let valid = handleValidate()
        if (valid.isCheck) {
            setLoadingApi(true)
            let respon = await dispatch(createNewUser(valid.data))

            if (respon.errCode === 2) {
                toast.error(t('log-in.register-fail'))
                setErrEmail(respon.message)
            }
            if (respon.errCode === 0) {
                toast.success(t('log-in.register-success'))

                navigate('/')
            }
            setLoadingApi(false)
            
        }
    }

    let handleChangeLanguage = () => {
        let newLanguage = language === 'en' ? 'vi' : 'en'
        dispatch(changeLanguage(newLanguage))
    }

    return (
        <div className="signup-container">
            <div className="language">
                <img
                    className="flag-language"
                    onClick={() => handleChangeLanguage()}
                    src={language === 'en' ? america : vietnamese}
                    alt=""
                />
            </div>
            <div className="signup-content">
                <div className="row">
                    <div className="col-12">
                        <h3 className="title-sign-up"> {t('log-in.register')}</h3>
                    </div>
                    <div className="col-12  ">
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyDown={() => setErrEmail('')}
                            className={errEmail.length > 0 ? 'form-control py-3 input-error' : 'form-control py-3'}
                            type="email"
                            placeholder={t('log-in.email')}
                        />
                        <span className="error">{t(errEmail)}</span>
                    </div>
                    <div className="col-12 mt-5">
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onKeyDown={() => setErrName('')}
                            className={errName.length > 0 ? 'form-control py-3 input-error' : 'form-control py-3'}
                            type="text"
                            placeholder={t('log-in.name')}
                        />
                        <span className="error">{t(errName)}</span>
                    </div>

                    <div className="col-12 mt-5">
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={() => setErrPassword('')}
                            className={errPassword.length > 0 ? 'form-control py-3 input-error' : 'form-control py-3'}
                            type="password"
                            placeholder={t('log-in.password')}
                        />
                        <span className="error">{t(errPassword)}</span>
                    </div>
                    <div className="col-12 mt-5">
                        <input
                            value={repeatPassword}
                            onChange={(e) => setRepeatPassword(e.target.value)}
                            onKeyDown={() => setErrRepeatPassword('')}
                            className={
                                errRepeatPassword.length > 0 ? 'form-control py-3 input-error' : 'form-control py-3'
                            }
                            type="password"
                            placeholder={t('log-in.confirm-password')}
                        />
                        <span className="error">{t(errRepeatPassword)}</span>
                    </div>

                    <div className="col-12 form-group mt-5">
                        <button className="btn sign-in" onClick={handleSignUp}>
                            {t('log-in.register')}
                        </button>
                    </div>
                    <div className="col-12 divider mt-4">
                        <p className="spacer"> {t('log-in.or')}</p>
                    </div>
                    <div className="col-12 form-group social">
                        {/* <button className="btn facebook-btn">
                            {t('log-in.continue', { social: 'FACEBOOK' })}

                            <img className="facebook" src={facebook} alt="" />
                        </button> */}
                        <FirebaseAuth className="firebase-google" uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
                    </div>
                    {/* <div className="col-6 form-group social">
                        <button className="btn google-btn">
                            {t('log-in.continue', { social: 'GOOGLE' })}

                            <img className="google" src={google} alt="" />
                        </button>
                    </div> */}
                    <div className="col-12">
                        <p className="sign-up">
                            {t('log-in.do-account')}
                            <Link to={path.login}> {t('log-in.login')}</Link>
                        </p>
                    </div>
                </div>
            </div>
            <Spiner loading={loadingApi} />
        </div>
    )
}

export default SignUp
