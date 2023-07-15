import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Modal, Form, Input, Button, Select } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import '../Filter.scss'
import examService from '../../../service/examService'
import allCodeService from '../../../service/allCodeService'
import Spiner from '../../Spiner/Spiner'
const { Option } = Select

const FilterExam = ({ isOpenFilter, showModal, children, updateListDoExam, changeDataSearch, type, style }) => {
    const { t } = useTranslation()
    const language = useSelector((state) => state.app.language)
    const user = useSelector((state) => state.user)

    let [loadingApi, setLoadingApi] = useState(false)

    //state
    const [form] = Form.useForm()
    const [nameExam, setNameExam] = useState('')
    const [auth, setAuth] = useState('')

    const [currentJoin, setCurrentJoin] = useState(null)
    const [typeCurrentJoin, setTypeCurrentJoin] = useState('greater')

    //list data get call api
    const [listMaxQuantity, setListMaxQuantity] = useState([])
    const [listMaxScore, setListMaxScore] = useState([])
    const [listMaxTime, setListMaxTime] = useState([])

    //state choose data
    const [maxQuantity, setMaxQuantity] = useState('L')
    const [maxScore, setMaxScore] = useState('S')
    const [maxTime, setMaxTime] = useState('T')
    const [typeExam, setTypeExam] = useState('ALL')

    //state day start end
    const [dayStart, setDayStart] = useState(null)
    const [dayEnd, setDayEnd] = useState(null)

    let getDataFromCallAPI = async () => {
        setLoadingApi(true)
        let responLimit = await allCodeService.getAllCode('LIMIT')
        let responScore = await allCodeService.getAllCode('SCORE')
        let responTime = await allCodeService.getAllCode('TIME')

        if (responLimit && responLimit.errCode === 0) {
            let copyListMaxQuantity = {
                type: 'LIMIT',
                keyCode: 'L',
                valueVi: 'Tất cả',
                valueEn: 'All',
            }

            setListMaxQuantity([copyListMaxQuantity, ...responLimit.data])
        }

        if (responScore && responScore.errCode === 0) {
            let copyListMaxQuantity = {
                type: 'SCORE',
                keyCode: 'S',
                valueVi: 'Tất cả',
                valueEn: 'All',
            }

            setListMaxScore([copyListMaxQuantity, ...responScore.data])
        }

        if (responTime && responTime.errCode === 0) {
            let copyListMaxQuantity = {
                type: 'TIME',
                keyCode: 'T',
                valueVi: 'Tất cả',
                valueEn: 'All',
            }

            setListMaxTime([copyListMaxQuantity, ...responTime.data])
        }
        setLoadingApi(false)
    }

    useEffect(() => {
        getDataFromCallAPI()
    }, [])

    let callAPI = async (buildData) => {
        setLoadingApi(true)
        let respon = await examService.searchAllExamByUserEmail(buildData)

        if (respon && respon.errCode === 0) {
            updateListDoExam(respon.data)

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
                email: user.userInfo.email,
                nameExam,
                currentJoin,
                typeCurrentJoin,
                maxQuantity,
                maxScore,
                maxTime,
                typeExam,
                auth,
                dayStart: dayStart ? dayStart : '',
                dayEnd: dayEnd ? dayEnd : '',
            }
            callAPI(buildData)
            changeDataSearch(buildData)

            form.resetFields()
            showModal(false)
        })
    }

    const handleCancel = () => {
        showModal(false)
        form.resetFields()
    }

    const handleChangeCurrentJoin = (value) => {
        setTypeCurrentJoin(value)
    }

    const handleDateStartChange = (date) => {
        setDayStart(date)
    }

    const handleDateEndChange = (date) => {
        setDayEnd(date)
    }

    // handle select

    let handleChangeSelectQuantity = (value) => {
        setMaxQuantity(value)
    }

    let handleChangeSelectScore = (value) => {
        setMaxScore(value)
    }

    let handleChangeSelectTime = (value) => {
        setMaxTime(value)
    }

    let handleChangeSelectTypeExam = (value) => {
        setTypeExam(value)
    }

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
                style={style}
                className="modal-filter-container"
                title={t('filter-exam.filter-data')}
                open={isOpenFilter}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={footer}
            >
                <Form form={form} layout="vertical">
                    <Form.Item label={t('filter-exam.search-title')}>
                        <Input
                            placeholder={t('filter-exam.name-exam')}
                            value={nameExam}
                            onChange={(e) => setNameExam(e.target.value)}
                            suffix={
                                <span
                                    className="icon-close"
                                    style={{ minWidth: '12px', cursor: 'pointer' }}
                                    onClick={() => setNameExam('')}
                                >
                                    {nameExam && <FontAwesomeIcon icon={faCircleXmark} />}
                                </span>
                            }
                        />
                    </Form.Item>

                    {type === 'admin' ? (
                        <Form.Item label={t('filter-exam.search-auth')}>
                            <Input
                                placeholder={t('filter-exam.auth')}
                                value={auth}
                                onChange={(e) => setAuth(e.target.value)}
                                suffix={
                                    <span
                                        className="icon-close"
                                        style={{ minWidth: '12px', cursor: 'pointer' }}
                                        onClick={() => setAuth('')}
                                    >
                                        {auth && <FontAwesomeIcon icon={faCircleXmark} />}
                                    </span>
                                }
                            />
                        </Form.Item>
                    ) : (
                        <></>
                    )}

                    <Form.Item label={t('filter-exam.search-attempt')}>
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
                    <div className="group-filter">
                        <Form.Item label={t('filter-exam.maximum-test-entries')}>
                            <Select defaultValue="L" style={{ maxWidth: 200 }} onChange={handleChangeSelectQuantity}>
                                {listMaxQuantity &&
                                    listMaxQuantity.length > 0 &&
                                    listMaxQuantity.map((item, index) => {
                                        return (
                                            <Option key={index} value={item.keyCode}>
                                                {language === 'en' ? item.valueEn : item.valueVi}
                                            </Option>
                                        )
                                    })}
                            </Select>
                        </Form.Item>

                        <Form.Item label={t('filter-exam.maximum-score')}>
                            <Select defaultValue="S" style={{ maxWidth: 200 }} onChange={handleChangeSelectScore}>
                                {listMaxScore &&
                                    listMaxScore.length > 0 &&
                                    listMaxScore.map((item, index) => {
                                        return (
                                            <Option key={index} value={item.keyCode}>
                                                {language === 'en' ? item.valueEn : item.valueVi}
                                            </Option>
                                        )
                                    })}
                            </Select>
                        </Form.Item>
                    </div>

                    <div className="group-filter">
                        <Form.Item label={t('filter-exam.time')}>
                            <Select defaultValue="T" style={{ maxWidth: 200 }} onChange={handleChangeSelectTime}>
                                {listMaxTime &&
                                    listMaxTime.length > 0 &&
                                    listMaxTime.map((item, index) => {
                                        return (
                                            <Option key={index} value={item.keyCode}>
                                                {language === 'en' ? item.valueEn : item.valueVi}
                                            </Option>
                                        )
                                    })}
                            </Select>
                        </Form.Item>

                        <Form.Item label={t('filter-exam.type-exam')}>
                            <Select defaultValue="ALL" style={{ maxWidth: 200 }} onChange={handleChangeSelectTypeExam}>
                                <Option value="ALL">{t('filter-exam.all')}</Option>
                                <Option value="PUBLIC">{t('filter-exam.public')}</Option>
                                <Option value="PRIVATE">{t('filter-exam.private')}</Option>
                            </Select>
                        </Form.Item>
                    </div>

                    <Form.Item label={t('filter-exam.search-creation-date')}>
                        <div className="date-picker-container">
                            <DatePicker
                                className="custom-datepicker"
                                selected={dayStart}
                                dateFormat="yyyy/MM/dd"
                                onChange={handleDateStartChange}
                                placeholderText={t('filter-exam.start-date')}
                            />
                            <DatePicker
                                className="custom-datepicker"
                                selected={dayEnd}
                                dateFormat="yyyy/MM/dd"
                                onChange={handleDateEndChange}
                                placeholderText={t('filter-exam.end-date')}
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

export default FilterExam
