import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Modal, Form, Input, Button, Select } from 'antd'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'

import './Filter.scss'
import examService from '../../service/examService'
import Spiner from '../Spiner/Spiner'
const { Option } = Select

const Filter = ({ isOpenFilter, showModal, children, updateListDoExam, changeDataSearch }) => {
    const { t } = useTranslation()
    const language = useSelector((state) => state.app.language)
    const user = useSelector((state) => state.user)
    let [loadingApi, setLoadingApi] = useState(false)

    const [form] = Form.useForm()
    const [name, setName] = useState('')
    const [score, setScore] = useState(null)
    const [typeScore, setTypeScore] = useState('greater')
    const [turns, setTurns] = useState(null)
    const [typeTurns, setTypeTurns] = useState('greater')
    const [time, setTime] = useState(null)
    const [typeTime, setTypeTime] = useState('greater')
    const [dayStart, setDayStart] = useState(null)
    const [dayEnd, setDayEnd] = useState(null)

    let callAPI = async (buildData) => {
        setLoadingApi(true)
        let respon = await examService.searchAllDoExamByUserId(buildData)

        if (respon && respon.errCode === 0) {
            updateListDoExam(respon.data)

            toast.success(t('filter.success'))
        } else {
            toast.error(t('filter.fail'))
        }
        setLoadingApi(false)
    }

    const handleOk = async () => {
        form.validateFields().then((values) => {
            // Xử lý dữ liệu sau khi người dùng nhấp OK
            let buildData = {
                email: user.userInfo.email,
                name,
                score,
                typeTurns,
                typeScore,
                turns,
                time,
                typeTime,
                dayStart: dayStart ? dayStart : '',
                dayEnd: dayEnd ? dayEnd : '',
            }
            callAPI(buildData)
            changeDataSearch(buildData)

            showModal(false)
            form.resetFields()
        })
    }

    const handleCancel = () => {
        showModal(false)
        form.resetFields()
    }

    const handleChange = (value) => {
        setTypeScore(value)
    }

    const handleChangeTurn = (value) => {
        setTypeTurns(value)
    }

    const handleChangeTime = (value) => {
        setTypeTime(value)
    }

    const handleDateStartChange = (date) => {
        setDayStart(date)
    }

    const handleDateEndChange = (date) => {
        setDayEnd(date)
    }

    const footer = (
        <>
            <Button key="cancel" onClick={handleCancel}>
                {t('filter.close')}
            </Button>
            <Button key="confirm" type="primary" onClick={handleOk}>
                {t('filter.confirm')}
            </Button>
        </>
    )

    return (
        <div className="filter-container">
            <span className="filter-button" onClick={() => showModal(true)}>
                {children}
            </span>
            <Modal
                className="modal-filter-container"
                title={t('filter.filter-data')}
                open={isOpenFilter}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={footer}
            >
                <Form form={form} layout="vertical">
                    <Form.Item label={t('filter.search-title')}>
                        <Input
                            placeholder={t('filter.name-exam')}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item className="form-item" label={t('filter.search-score')}>
                        <Input
                            placeholder={t('filter.score-exam')}
                            type="number"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            value={score}
                            onChange={(e) => setScore(e.target.value)}
                            suffix={
                                <span
                                    className="icon-close"
                                    style={{ minWidth: '12px' }}
                                    onClick={() => setScore(null)}
                                >
                                    {score >= 0 && score !== null && <FontAwesomeIcon icon={faCircleXmark} />}
                                </span>
                            }
                        />
                        <Select defaultValue="greater" style={{ maxWidth: 200 }} onChange={handleChange}>
                            <Option value="greater">{t('filter.greater')}</Option>
                            <Option value="less">{t('filter.less')}</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label={t('filter.search-attempt')}>
                        <Input
                            placeholder={t('filter.attempt-exam')}
                            type="number"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            value={turns}
                            onChange={(e) => setTurns(e.target.value)}
                            suffix={
                                <span
                                    className="icon-close"
                                    style={{ minWidth: '12px' }}
                                    onClick={() => setTurns(null)}
                                >
                                    {turns >= 0 && turns !== null && <FontAwesomeIcon icon={faCircleXmark} />}
                                </span>
                            }
                        />
                        <Select defaultValue="greater" style={{ maxWidth: 200 }} onChange={handleChangeTurn}>
                            <Option value="greater">{t('filter.greater')}</Option>
                            <Option value="less">{t('filter.less')}</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label={t('filter.search-time')}>
                        <Input
                            placeholder={t('filter.time')}
                            type="number"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            suffix={
                                <span className="icon-close" style={{ minWidth: '12px' }} onClick={() => setTime(null)}>
                                    {time > 0 && time !== null && <FontAwesomeIcon icon={faCircleXmark} />}
                                </span>
                            }
                        />
                        <Select defaultValue="greater" style={{ maxWidth: 200 }} onChange={handleChangeTime}>
                            <Option value="greater">{t('filter.greater')}</Option>
                            <Option value="less">{t('filter.less')}</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label={t('filter.search-date')}>
                        <div className="date-picker-container">
                            <DatePicker
                                className="custom-datepicker"
                                selected={dayStart}
                                dateFormat="yyyy/MM/dd"
                                onChange={handleDateStartChange}
                                placeholderText={t('filter.start-date')}
                            />
                            <DatePicker
                                className="custom-datepicker"
                                selected={dayEnd}
                                dateFormat="yyyy/MM/dd"
                                onChange={handleDateEndChange}
                                placeholderText={t('filter.end-date')}
                                minDate={dayStart}
                            />
                        </div>
                    </Form.Item>
                </Form>
            </Modal>
            <Spiner loading={loadingApi} />
        </div>
    )
}

export default Filter
