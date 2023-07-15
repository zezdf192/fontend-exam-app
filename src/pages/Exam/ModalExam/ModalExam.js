import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import './ModalExam.scss'

function ModalExam({ type, isOpenModal, descriptionModal, handleCloseModal, handleSubmitModal, submitOutside }) {
    const { t } = useTranslation()

    let renderModal = () => {
        if (type === 'time-out') {
            return (
                <Modal centered size="md" show={isOpenModal} className="modal-container-no-close">
                    <Modal.Header closeButton>
                        <Modal.Title>{t('modal.notification')}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{descriptionModal}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleSubmitModal}>
                            {t('modal.confirm')}
                        </Button>
                    </Modal.Footer>
                </Modal>
            )
        } else if (type === 'outside') {
            return (
                <Modal centered size="md" show={isOpenModal} onHide={handleCloseModal} className="modal-container">
                    <Modal.Header closeButton>
                        <Modal.Title>{t('modal.notification')}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{descriptionModal}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            {t('modal.close')}
                        </Button>
                        <Button variant="primary" onClick={submitOutside}>
                            {t('modal.confirm')}
                        </Button>
                    </Modal.Footer>
                </Modal>
            )
        } else {
            return (
                <Modal centered size="md" show={isOpenModal} onHide={handleCloseModal} className="modal-container">
                    <Modal.Header closeButton>
                        <Modal.Title>{t('modal.notification')}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{descriptionModal}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            {t('modal.close')}
                        </Button>
                        <Button variant="primary" onClick={handleSubmitModal}>
                            {t('modal.confirm')}
                        </Button>
                    </Modal.Footer>
                </Modal>
            )
        }
    }

    return <>{renderModal()}</>
}

export default ModalExam
