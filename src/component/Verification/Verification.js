import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { faStar } from '@fortawesome/free-solid-svg-icons'

import examService from '../../service/examService'
import './Verification.scss'
import Spiner from '../Spiner/Spiner'

import userService from '../../service/userService'
import HeaderHome from '../../pages/HomePage/HeaderHome/HeaderHome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Verification() {
    const { examId, email, nameUser } = useParams()
    const user = useSelector((state) => state.user)
    const language = useSelector((state) => state.app.language)
    const { t } = useTranslation()

    const [loadingApi, setLoadingApi] = useState(false)

    const [exam, setExam] = useState()
    const [isLike, setIsLike] = useState()
    const [showLike, setShowLike] = useState(false)

    let navigate = useNavigate()

    let handleBackHome = () => {
        navigate('/')
    }

    let handleStartExam = () => {
        if (examId) {
            navigate(`/exam/${email}/${nameUser}/${examId}`)
        }
    }

    let callAPI = async () => {
        setLoadingApi(true)
        let respon = await examService.getDetailExamById(examId)

        if (user.userInfo) {
            let responLike = await userService.getExamUserLike({ email: user.userInfo.email, examId: examId })
            if (responLike && responLike.errCode === 0) {
                setIsLike(responLike.data)
            }
        }

        if (respon && respon.errCode === 0) {
            setExam(respon.data.exam)
        }
        setLoadingApi(false)
    }

    useEffect(() => {
        if (exam && exam.data && exam.data.typeExam === 'PUBLIC') {
            setShowLike(true)
        } else {
            setShowLike(false)
        }
    }, [exam])

    useEffect(() => {
        callAPI()
    }, [])

    let handleLike = async () => {
        setLoadingApi(true)
        let respon = await userService.userLikeExam({ email: user.userInfo.email, examId: examId, isLike: !isLike })
        if (respon && respon.errCode === 0) {
            callAPI()
        }

        setIsLike(!isLike)
        setLoadingApi(false)
    }

    let buildOverLimit = (data) => {
        if (data.limit.value !== 'L0') {
            if (data.limit.valueNum === data.quantityJoin) {
                return (
                    <>
                        <span className="no-limit"> {t('verifi.maximum-limit')}</span>
                    </>
                )
            }
        }

        return (
            <button onClick={handleStartExam} className="btn-next">
                {t('verifi.start')}
            </button>
        )
    }

    

    return (
        <>
            <HeaderHome />

            <div className="verification-container">
                <div className="verification-body">
                    <div className="verification-info">
                        <div className="verification-header">
                            <div className="verify-nav">
                                {exam && exam.data && exam.data.image ? (
                                    <img className="img-exam" src={exam && exam.data && exam.data.image} alt="" />
                                ) : (
                                    <></>
                                )}

                                <h2>{exam && exam.data && exam.data.title}</h2>
                            </div>
                            {showLike && user.userInfo ? (
                                <FontAwesomeIcon
                                    onClick={handleLike}
                                    className={isLike ? 'icon-star active' : 'icon-star'}
                                    icon={faStar}
                                />
                            ) : (
                                <></>
                            )}
                        </div>
                        <p>
                            {exam && exam.data && exam.data.time
                                ? language === 'en'
                                    ? ` ${t('verifi.time')} ${exam.data.time.labelEn}`
                                    : ` ${t('verifi.time')} ${exam.data.time.labelVi}`
                                : ''}
                        </p>
                        <p>
                            {t('verifi.number-questions')}

                            {exam && exam.data && exam.data.questions && exam.data.questions.length}
                        </p>
                        {showLike ? (
                            <p>
                                {t('verifi.like-count')}

                                {exam && exam.data && exam.data.quantityLike ? exam.data.quantityLike.length : 0}
                            </p>
                        ) : (
                            <></>
                        )}

                        <p>
                            {t('verifi.description')}

                            {exam && exam.data && exam.data.description && exam.data.description}
                        </p>
                        <span>{t('verifi.text')}</span>
                        <div className="action">
                            <button onClick={handleBackHome} className="btn-close-verify">
                                {t('verifi.back')}
                            </button>
                            {exam && exam.data && buildOverLimit(exam.data)}
                        </div>
                        {email === 'undefine' ? <span className="note"> {t('verifi.note')}</span> : <></>}
                    </div>
                </div>
            </div>

            <Spiner loading={loadingApi} />
        </>
    )
}

export default Verification
