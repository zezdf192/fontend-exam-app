import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import './Modal.scss'

function ModalNotify({
    id,
    isOpenModal,
    descriptionModal,
    handleCloseModal,
    handleDeleteQuestion,
    handleSubmitModal,
    handleFinnal,
    typeModal,
}) {
    const { t } = useTranslation()
    const language = useSelector((state) => state.app.language)
    const [show, setShow] = useState(false)

    let handleAction = () => {
        if (typeModal === 'user' || typeModal === 'exam') {
            handleSubmitModal()
        } else if (typeModal === 'delete') {
            handleDeleteQuestion(id)
        } else if (typeModal === 'submit') {
            handleFinnal()
        } else {
            handleSubmitModal()
        }
    }

    return (
        <>
            <Modal centered size="md" show={isOpenModal} onHide={handleCloseModal} className="modal-container">
                <Modal.Header closeButton>
                    <Modal.Title>{t('modal.notification')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{t(descriptionModal)}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        {t('modal.close')}
                    </Button>
                    <Button variant="primary" onClick={handleAction}>
                        {t('modal.confirm')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalNotify
