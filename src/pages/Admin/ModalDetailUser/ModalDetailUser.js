import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { Link } from 'react-router-dom'

import './ModalDetailUser.scss'
import ButtonNotify from '../../../component/ButtonNotify/ButtonNotify'

function ModalDetailUser({ handleCloseModalDetail, isOpenModal, data, type, ratings = false }) {
    const { t } = useTranslation()
    const language = useSelector((state) => state.app.language)
    const [currentUser, setCurrentUser] = useState()
    const [hidden, setHidden] = useState(false)

    useEffect(() => {
        setCurrentUser(data)
    }, [data])

    

    let convertTime = (string) => {
        let day, month, date, year, formattedDate
        if (language === 'en') {
            date = new Date(string)
            year = date.getFullYear()
            month = String(date.getMonth() + 1).padStart(2, '0') // Tháng bắt đầu từ 0, nên cần cộng thêm 1
            day = String(date.getDate()).padStart(2, '0')
            formattedDate = `${year}/${month}/${day}`
        } else {
            date = new Date(string)
            day = date.getDate()
            month = date.getMonth() + 1 // Tháng bắt đầu từ 0, nên cần cộng thêm 1
            year = date.getFullYear()
            formattedDate = `${day}/${month}/${year}`
        }

        return formattedDate
    }

    let buildTitleModal = () => {
        if (type === 'user') {
            return 'modal.detailed-information-user'
        }
        if (type === 'userDoExam') {
            return 'modal.user-exam-information'
        } else {
            return 'modal.detailed-information-exam'
        }
    }

    let buildTypeExam = (res) => {
        if (res && res.data) {
            if (res.data.typeExam === 'PUBLIC') {
                return 'modal.type-exam-public'
            } else {
                return 'modal.type-exam-private'
            }
        }
    }

    let showViewContentModal = () => {
        if (type === 'user') {
            return (
                <div className="row">
                    <div className="col-12">
                        <span className="detail-title">{t('admin.email')} </span>
                        <span>:</span>
                        <span className="detail-description">{currentUser && currentUser.email}</span>
                    </div>
                    <div className="col-12">
                        <span className="detail-title">{t('admin.name-user')} </span>
                        <span>:</span>
                        <span className="detail-description">{currentUser && currentUser.name}</span>
                    </div>

                    <div className="col-12">
                        <span className="detail-title">{t('admin.total-exams-created')}</span>
                        <span>:</span>
                        <span className="detail-description">
                            {currentUser && currentUser.amountCreate && currentUser.amountCreate}
                        </span>
                    </div>
                    <div className="col-12">
                        <span className="detail-title">{t('admin.total-exams-administered')}</span>
                        <span>:</span>
                        <span className="detail-description">
                            {currentUser && currentUser.userExamID && currentUser.userExamID.length}
                        </span>
                    </div>
                </div>
            )
        } else if (type === 'exam' || type === 'doExam') {
            return (
                <div className="row">
                    <div className="col-12">
                        <span className="detail-title"> {t('modal.author-email')} </span>
                        <span>:</span>
                        <span className="detail-description">
                            {currentUser && currentUser.user && currentUser.user.email}
                        </span>
                    </div>
                    <div className="col-12">
                        <span className="detail-title">{t('modal.name-exam')} </span>
                        <span>:</span>
                        <span className="detail-description">
                            {currentUser && currentUser.data && currentUser.data.title}
                        </span>
                    </div>
                    {type === 'exam' ? (
                        <div className="col-12">
                            <span className="detail-title">{t('modal.exam-password')}</span>
                            <span>:</span>
                            <ButtonNotify
                                descrip={t('tippy.double-click')}
                                children={
                                    <span
                                        className={hidden ? 'detail-description' : 'hidden-password detail-description'}
                                        onDoubleClick={() => setHidden(!hidden)}
                                    >
                                        {currentUser && currentUser.data && currentUser.data.password}
                                    </span>
                                }
                            />
                        </div>
                    ) : (
                        <></>
                    )}
                    <div className="col-12">
                        <span className="detail-title">{t('modal.score')} </span>
                        <span>:</span>
                        <span className="detail-description">
                            {currentUser && currentUser.data && currentUser.data.score
                                ? language === 'en'
                                    ? currentUser.data.score.labelEn
                                    : currentUser.data.score.labelVi
                                : ''}
                        </span>
                    </div>
                    <div className="col-12">
                        <span className="detail-title">{t('modal.number-questions')} </span>
                        <span>:</span>
                        <span className="detail-description">
                            {currentUser &&
                                currentUser.data &&
                                currentUser.data.questions &&
                                currentUser.data.questions.length}
                        </span>
                    </div>
                    <div className="col-12">
                        <span className="detail-title">{t('modal.time')} </span>
                        <span>:</span>
                        <span className="detail-description">
                            {currentUser && currentUser.data && currentUser.data.time
                                ? language === 'en'
                                    ? currentUser.data.time.labelEn
                                    : currentUser.data.time.labelVi
                                : ''}
                        </span>
                    </div>
                    <div className="col-12">
                        <span className="detail-title">{t('modal.current-join')}</span>
                        <span>:</span>
                        <span className="detail-description">
                            {currentUser && currentUser.data && currentUser.data.quantityJoin}
                        </span>
                    </div>
                    <div className="col-12">
                        <span className="detail-title">{t('modal.max-join')}</span>
                        <span>:</span>
                        <span className="detail-description">
                            {currentUser && currentUser.data && currentUser.data.limit
                                ? language === 'en'
                                    ? currentUser.data.limit.labelEn
                                    : currentUser.data.limit.labelVi
                                : ''}
                        </span>
                    </div>

                    <div className="col-12">
                        <span className="detail-title">{t('modal.exam-mode')} </span>
                        <span>:</span>
                        <span className="detail-description">{t(buildTypeExam(currentUser))}</span>
                    </div>
                    <div className="col-12">
                        <span className="detail-title">{t('modal.date-created')}</span>
                        <span>:</span>
                        <span className="detail-description">
                            {currentUser && currentUser.data && currentUser.data.dateExam
                                ? language === 'en'
                                    ? new Date(currentUser.data.dateExam).toISOString().split('T')[0].replace(/-/g, '/')
                                    : new Date(currentUser.data.dateExam).toLocaleDateString('en-GB', {
                                          day: '2-digit',
                                          month: '2-digit',
                                          year: 'numeric',
                                      })
                                : ''}
                        </span>
                    </div>
                 
                    {/* <div className="col-12 description-container">
                        <span className="detail-title">{t('modal.description')} </span>
                        <span>:</span>

                        <span className="detail-description">
                            {currentUser && currentUser.data && currentUser.data.description}
                        </span>
                    </div> */}
                </div>
            )
        } else if (type === 'userDoExam') {
            return (
                <div className="row">
                    <div className="col-12">
                        <span className="detail-title"> {t('modal.user-email')} </span>
                        <span>:</span>
                        <span className="detail-description">{currentUser && currentUser.email}</span>
                    </div>
                    <div className="col-12">
                        <span className="detail-title">{t('modal.name-user')} </span>
                        <span>:</span>
                        <span className="detail-description">{currentUser && currentUser.nameUser}</span>
                    </div>
                    <div className="col-12">
                        <span className="detail-title">{t('modal.number-participations')} </span>
                        <span>:</span>
                        <span className="detail-description">{currentUser && currentUser.quantityJoin}</span>
                    </div>
                    <div className="col-12">
                        <span className="detail-title">{t('modal.highest-score')} </span>
                        <span>:</span>
                        <span className="detail-description">
                            {currentUser && `${currentUser.maxScore}/${currentUser.scoreExam}`}
                        </span>
                    </div>

                    <div className="col-12">
                        <span className="detail-title">{t('modal.exam-duration')} </span>
                        <span>:</span>
                        <span className="detail-description">
                            {currentUser ? (language === 'en' ? currentUser.timeEn : currentUser.timeVi) : ''}
                        </span>
                    </div>

                    <div className="col-12">
                        <span className="detail-title">{t('modal.most-recent-exam-date')} </span>
                        <span>:</span>
                        <span className="detail-description">{currentUser && convertTime(currentUser.dateDoExam)}</span>
                    </div>
                    <div className="col-12">
                        <span className="detail-title">{t('modal.count-correct-responses')} </span>
                        <span>:</span>
                        <span className="detail-description">
                            {currentUser && `${currentUser.qualityAnswerTrue}/${currentUser.quantityQuestion}`}
                        </span>
                    </div>
                </div>
            )
        }
    }

    return (
        <>
            <Modal centered size="lg" show={isOpenModal} onHide={handleCloseModalDetail} className="modal-container">
                <Modal.Header closeButton>
                    <Modal.Title>{t(buildTitleModal())}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{showViewContentModal()}</Modal.Body>
                <Modal.Footer>
                    {ratings && (
                        <Link to={`/ratings/${data && data._id}`} className="ratings-go-btn" variant="secondary">
                            {t('ratings.ratings')}
                        </Link>
                    )}
                    <Button variant="secondary" onClick={handleCloseModalDetail}>
                        {t('admin.close')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalDetailUser
