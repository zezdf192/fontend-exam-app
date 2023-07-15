import React, {  useState } from 'react'
import { useSelector  } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Modal, Form, Input, Button, Select } from 'antd'
import 'react-datepicker/dist/react-datepicker.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'

import '../Filter.scss'
import userService from '../../../service/userService'
import Spiner from '../../Spiner/Spiner'
const { Option } = Select

const FilterExam = ({ isOpenFilter, showModal, children, updateListDoExam, changeDataSearch, type, style }) => {
    const { t } = useTranslation()
    const language = useSelector((state) => state.app.language)
    const user = useSelector((state) => state.user)

    let [loadingApi, setLoadingApi] = useState(false)

    //state
    const [form] = Form.useForm()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const [amountCreated, setAmountCreated] = useState(null)
    const [typeAmount, setTypeAmount] = useState('greater')

    let callAPI = async (buildData) => {
        setLoadingApi(true)
        let respon = await userService.filterUserByAdmin(buildData)

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
                name,
                email,
                amountCreated,
                typeAmount,
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

    let handleChangeAmountCreated = (value) => {
        setTypeAmount(value)
    }

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
                    <Form.Item label={t('filter-exam.search-auth-name')}>
                        <Input
                            placeholder={t('filter-exam.name-user')}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            suffix={
                                <span
                                    className="icon-close"
                                    style={{ minWidth: '12px', cursor: 'pointer' }}
                                    onClick={() => setName('')}
                                >
                                    {name && <FontAwesomeIcon icon={faCircleXmark} />}
                                </span>
                            }
                        />
                    </Form.Item>

                    <Form.Item label={t('filter-exam.search-auth-email')}>
                        <Input
                            placeholder={t('filter-exam.auth-email')}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            suffix={
                                <span
                                    className="icon-close"
                                    style={{ minWidth: '12px', cursor: 'pointer' }}
                                    onClick={() => setEmail('')}
                                >
                                    {email && <FontAwesomeIcon icon={faCircleXmark} />}
                                </span>
                            }
                        />
                    </Form.Item>

                    <Form.Item label={t('filter-exam.exams-author')}>
                        <Input
                            placeholder={t('filter-exam.number-exams')}
                            type="number"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            value={amountCreated}
                            onChange={(e) => setAmountCreated(e.target.value)}
                            suffix={
                                <span
                                    className="icon-close"
                                    style={{ minWidth: '12px' }}
                                    onClick={() => setAmountCreated(null)}
                                >
                                    {amountCreated >= 0 && amountCreated !== null && (
                                        <FontAwesomeIcon icon={faCircleXmark} />
                                    )}
                                </span>
                            }
                        />
                        <Select defaultValue="greater" style={{ maxWidth: 200 }} onChange={handleChangeAmountCreated}>
                            <Option value="greater">{t('filter-exam.greater')}</Option>
                            <Option value="less">{t('filter-exam.less')}</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
            <Spiner loading={loadingApi} />
        </div>
    )
}

export default FilterExam
