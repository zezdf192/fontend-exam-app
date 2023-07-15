import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import Spiner from '../../../component/Spiner/Spiner'
import userService from '../../../service/userService'
import { fetchUserLogin } from '../../../store/action/userAction'
import './ForgotPassword.scss'


function ForgotPassword() {
    const { t } = useTranslation()
    const user = useSelector((state) => state.user)
    const language = useSelector((state) => state.app.language)
    const dispatch = useDispatch()
    let navigate = useNavigate()

    let [loadingApi, setLoadingApi] = useState(false)

    const [email, setEmail] = useState('')
    const [code, setCode] = useState('')
    const [isSendCode, setIsSendCode] = useState(false)
    const [countdown, setCountdown] = useState(60)
    const [codeVerify, setCodeVerify] = useState(null)
    const [isCodeSuccess, setIsCodeSuccess] = useState(false)
    const [password, setPassword] = useState('')
    const [emailMain, setEmailMain] = useState()

    useEffect(() => {
        let timer = null

        if (isSendCode && countdown > 0) {
            timer = setInterval(() => {
                setCountdown((prevCountdown) => prevCountdown - 1)
            }, 1000)
        }

        if (countdown === 0 && isSendCode) {
            // Xử lý khi hết thời gian
           
            handleSendCode()
            // Thực hiện các tác vụ khác sau khi hết thời gian
        }

        return () => {
            clearInterval(timer)
        }
    }, [countdown, isSendCode])

    let handleSendCode = async () => {
        const regex =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!email) {
            toast.error(t('toast.incomplete-input'))
        } else if (!regex.test(email)) {
            toast.error(t('toast.invalid'))
        } else {
            setLoadingApi(true)
            let respon = await userService.getCodeForgotPassword({ email: email, language: language })

            if (respon && respon.errCode === 0) {
                setEmailMain(email)
                setCodeVerify(respon.code)
                setIsSendCode(true)
                setCountdown(60)
            } else {
                toast.error(t('toast.send-fail'))
            }
            setLoadingApi(false)
        }
    }

    let handleCheckCode = () => {
        if (!code) {
            toast.error(t('toast.incomplete-input'))
        } else {
            if (code === codeVerify) {
                setIsCodeSuccess(true)
            } else {
                toast.error(t('toast.incorrect-code'))
            }
        }
    }

    let handleChangePassword = async () => {
        if (password.length < 6) {
            toast.error(t('log-in.err-password-long'))
        } else {
            setLoadingApi(true)
            let respon = await userService.changePassword({ email: emailMain, password: password })

            if (respon && respon.errCode === 0) {
                let responRedux = await dispatch(fetchUserLogin({ email, password }))
                if (responRedux) {
                    if (responRedux.errCode === 0) {
                        navigate('/')
                    }
                }
            }
            setLoadingApi(false)
        }
    }

    return (
        <>
            <div className="forgot-password-container">
                {isCodeSuccess ? (
                    <>
                        <div className="forgot-password-contant">
                            <div className="forgot-password-header">
                                <h2 className="title">{t('forgot-password.change-password')}</h2>
                            </div>
                            <div className="input-change">
                                <input
                                    type="password"
                                    maxLength="50"
                                    placeholder={t('forgot-password.new-password')}
                                    className="input"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="forgot-password-bottom send">
                                <button onClick={handleChangePassword} className="button">
                                    {t('forgot-password.confirm')}
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="forgot-password-contant">
                        <div className="forgot-password-header">
                            <h2 className="title">{t('forgot-password.forgot-password')}</h2>
                        </div>
                        <div className="input-change">
                            <p>{t('forgot-password.check-email')} </p>
                            <input
                                type="email"
                                maxLength="50"
                                placeholder={t('forgot-password.email')}
                                className="input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className={isSendCode ? 'forgot-password-bottom ' : 'forgot-password-bottom send'}>
                            {isSendCode ? (
                                <>
                                    <input
                                        type="gmail"
                                        maxLength="50"
                                        placeholder={t('forgot-password.code')}
                                        className="input"
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                    />
                                    <button onClick={handleCheckCode} className="button">
                                        {t('forgot-password.confirm')}
                                    </button>
                                </>
                            ) : (
                                <></>
                            )}

                            <button onClick={handleSendCode} className="button">
                                {isSendCode ? t('forgot-password.resend-code') : t('forgot-password.send-code')}
                            </button>
                        </div>

                        <span className="auto">
                            {isSendCode ? t('forgot-password.auto') : <></>}
                            <span className="time">
                                {isSendCode
                                    ? `${countdown} ${t('forgot-password.s')}`
                                    : `${t('forgot-password.forgot-password')}`}
                            </span>
                        </span>
                    </div>
                )}
            </div>
            <Spiner loading={loadingApi} />
        </>
    )
}

export default ForgotPassword
