import React, {  useState } from 'react'
import { useSelector,  } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Modal, Form, Input, Button, Select} from 'antd'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'

import './FilterRatings.scss'
import examService from '../../../service/examService'
import Spiner from '../../Spiner/Spiner'
const { Option } = Select

const FilterRatings = ({ isMyRatings, examID, isOpenFilter, showModal, children, updateListDoExam }) => {
    const { t } = useTranslation()
    const language = useSelector((state) => state.app.language)
    const user = useSelector((state) => state.user)

    let [loadingApi, setLoadingApi] = useState(false)

    //state
    const [form] = Form.useForm()

    const [score, setScore] = useState(null)
    const [time, setTime] = useState(null)
    const [currentJoin, setCurrentJoin] = useState(null)
    const [typeCurrentJoin, setTypeCurrentJoin] = useState('greater')
    const [typeScore, setTypeScore] = useState('greater')
    const [typeTime, setTypeTime] = useState('greater')
    const [typeRatings, setTypeRatings] = useState('greater')

    const [dayStart, setDayStart] = useState(null)

    let callAPI = async (data) => {
        setLoadingApi(true)
        let respon = await examService.filterExamRatings(data)

        if (respon && respon.errCode === 0) {
            let copyData = respon.data
            let resultArray = []

            copyData.forEach((item) => {
                resultArray.push(item.data)
            })

            updateListDoExam(resultArray)

            toast.success(t('filter-exam.success'))
        } else {
            toast.error(t('filter-exam.fail'))
        }
        setLoadingApi(false)

    }

    const handleOk = async () => {
        form.validateFields().then((values) => {
            // Xử lý dữ liệu sau khi người dùng nhấp OK
            let buildData = {
                examID: examID,
                score: score,
                time: time,
                currentJoin: currentJoin,
                typeCurrentJoin,
                typeScore,
                typeTime,
                typeRatings,
                dayStart: dayStart ? dayStart : '',
            }

            if (isMyRatings) {
                showModal(false)
                toast.error(t('filter.toast-no-future'))
            } else if (examID === 'examId') {
                showModal(false)
                toast.error(t('filter-exam.notify-no-data'))
            } else {
                callAPI(buildData)
                showModal(false)
            }

            form.resetFields()
        })
    }

    const handleCancel = () => {
        showModal(false)
        form.resetFields()
    }

    const handleChangeCurrentJoin = (value) => {
        setTypeCurrentJoin(value)
    }

    let handleChangeScore = (value) => {
        setTypeScore(value)
    }

    let handleChangeTime = (value) => {
        setTypeTime(value)
    }

    let handleChangeRatings = (value) => {
        setTypeRatings(value)
    }

    const handleDateStartChange = (date) => {
        setDayStart(date)
    }

    // handle select

    const footer = (
        <>
            <Button key="cancel" onClick={handleCancel}>
                {t('filter-exam.close')}
            </Button>
            <Button key="confirm" type="primary" onClick={handleOk}>
                {t('filter-exam.confirm')}
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
                title={t('filter-exam.filter-data')}
                open={isOpenFilter}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={footer}
            >
                <Form form={form} layout="vertical">
                    <Form.Item label={t('filter-exam.filter-exam-score')}>
                        <Input
                            placeholder={t('filter-exam.score')}
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
                        <Select defaultValue="greater" style={{ maxWidth: 200 }} onChange={handleChangeScore}>
                            <Option value="greater">{t('filter-exam.greater')}</Option>
                            <Option value="less">{t('filter-exam.less')}</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label={t('filter-exam.filter-participation-count')}>
                        <Input
                            placeholder={t('filter-exam.attempt')}
                            type="number"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            value={currentJoin}
                            onChange={(e) => setCurrentJoin(e.target.value)}
                            suffix={
                                <span
                                    className="icon-close"
                                    style={{ minWidth: '12px' }}
                                    onClick={() => setCurrentJoin(null)}
                                >
                                    {currentJoin >= 0 && currentJoin !== null && (
                                        <FontAwesomeIcon icon={faCircleXmark} />
                                    )}
                                </span>
                            }
                        />
                        <Select defaultValue="greater" style={{ maxWidth: 200 }} onChange={handleChangeCurrentJoin}>
                            <Option value="greater">{t('filter-exam.greater')}</Option>
                            <Option value="less">{t('filter-exam.less')}</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label={t('filter-exam.filter-exam-time')}>
                        <Input
                            placeholder={t('filter-exam.time')}
                            type="number"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            suffix={
                                <span className="icon-close" style={{ minWidth: '12px' }} onClick={() => setTime(null)}>
                                    {time >= 0 && time !== null && <FontAwesomeIcon icon={faCircleXmark} />}
                                </span>
                            }
                        />
                        <Select defaultValue="greater" style={{ maxWidth: 200 }} onChange={handleChangeTime}>
                            <Option value="greater">{t('filter-exam.greater')}</Option>
                            <Option value="less">{t('filter-exam.less')}</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label={t('filter-exam.sort-leaderboard')}>
                        <Select defaultValue="greater" style={{ minWidth: '472px' }} onChange={handleChangeRatings}>
                            <Option value="less">{t('filter-exam.decrease')}</Option>
                            <Option value="greater">{t('filter-exam.ascending')}</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label={t('filter-exam.filter-participation-date')}>
                        <div className="date-picker-container">
                            <DatePicker
                                selected={dayStart}
                                className="custom-datepicker"
                                dateFormat={language === 'en' ? 'yyyy/MM/dd' : 'dd/MM/yyyy'}
                                onChange={handleDateStartChange}
                                placeholderText={t('filter-exam.exam-participation-date')}
                            />
                        </div>
                    </Form.Item>
                </Form>
            </Modal>
            <Spiner loading={loadingApi} />
        </div>
    )
}

export default FilterRatings
