import { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faArrowDown91,
    faArrowDownAZ,
    faArrowUp19,
    faArrowUpAZ,
    faEye,
    faPencil,
    faTrash,
} from '@fortawesome/free-solid-svg-icons'

import HeaderHome from '../../HomePage/HeaderHome/HeaderHome'
import Button from '../../../component/ButtonNotify/ButtonNotify'
import './MyExam.scss'
import { path } from '../../../until/constant'
import examService from '../../../service/examService'
import { sideBarUser } from '../../../component/RouteSideBar/routeSideBar'
import SideBar from './SideBar/SideBar'
import FilterExam from '../../../component/Filter/FilterExam/FilterExam'
import ModalDetailUser from '../../Admin/ModalDetailUser/ModalDetailUser'
import ModalNotify from '../../../component/Modal/ModalNotify'
import NotFoundData from '../../../component/NotFoundData/NotFoundData'
import Spiner from '../../../component/Spiner/Spiner'

function MyExam() {
    const { t } = useTranslation()
    const language = useSelector((state) => state.app.language)
    let navigate = useNavigate()
    const user = useSelector((state) => state.user)

    const [loadingApi, setLoadingApi] = useState(false)
    //filter
    const [isOpenFilter, setIsOpenFilter] = useState(false)
    const [dataSearch, setDataSearch] = useState({
        email: user.userInfo.email,
        nameExam: '',
        currentJoin: null,
        typeCurrentJoin: 'greater',
        maxQuantity: 'L',
        maxScore: 'S',
        maxTime: 'T',
        typeExam: 'ALL',
        dayStart: null,
        dayEnd: null,
    })

    const [currentPage, setCurrentPage] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(5)
    const [newListExam, setNewListExam] = useState([])

    //exam
    const [listExam, setListExam] = useState([])
    const [fieldSort, setFieldSort] = useState('title')
    const [hidden, setHidden] = useState([])

    //delete modal
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [descriptionModal, setDescriptionModal] = useState('')
    const [currentDelete, setCurrentDelete] = useState()

    //Modal
    const [currentExam, setCurrentExam] = useState()
    const [isOpenModalDetail, setIsOpenModalDetail] = useState(false)

    const [iconSort, setIconSort] = useState(<FontAwesomeIcon className="icon-sort" icon={faArrowUpAZ} />)
    const [arrayTableTitles, setArrayTableTitles] = useState([
        {
            key: 'title',
            status: 'up',
            value: 'content-your-exam.name-exam',
        },
        {
            className: 'none-m',
            key: 'quantityJoin',
            status: 'up',
            value: 'content-your-exam.number-attempts',
        },
    ])

    let callAPI = async () => {
        setLoadingApi(true)
        let respon = await examService.getAllExamByUserId({ email: user.userInfo.email })

        if (respon && respon.errCode === 0) {
            setHidden(Array(respon.data.length).fill(true))
            setListExam(respon.data)
        }
        setLoadingApi(false)
    }

    useEffect(() => {
        callAPI()
    }, [])

    let handleSortByField = async (type, index) => {
        let copyArrayTableTitles = arrayTableTitles

        if (copyArrayTableTitles[index].status === 'up') {
            copyArrayTableTitles[index].status = 'down'
        } else {
            copyArrayTableTitles[index].status = 'up'
        }

        setFieldSort(type)
        setArrayTableTitles(copyArrayTableTitles)
        setLoadingApi(true)
        let respon = await examService.sortExamByType({
            email: user && user.userInfo && user.userInfo.email,
            type: type,
            typeSort: arrayTableTitles[index].status,
            dataSearch: dataSearch,
        })

        if (respon && respon.errCode === 0) {
            setListExam(respon.data)
        }
        setLoadingApi(false)

    }

    let handleDisPlayTypeSort = (type, typeSort) => {
        if (type === 'title') {
            if (typeSort === 'up') {
                setIconSort(<FontAwesomeIcon className="icon-sort" icon={faArrowUpAZ} />)
            } else {
                setIconSort(<FontAwesomeIcon className="icon-sort" icon={faArrowDownAZ} />)
            }
        } else {
            if (typeSort === 'up') {
                setIconSort(<FontAwesomeIcon className="icon-sort" icon={faArrowUp19} />)
            } else {
                setIconSort(<FontAwesomeIcon className="icon-sort" icon={faArrowDown91} />)
            }
        }
    }

    let handleShowPassword = (index) => {
        let copyHidden = hidden
        copyHidden[index] = !copyHidden[index]

        setHidden([...copyHidden])
    }

    //filer
    let updateListDoExam = (data) => {
        setCurrentPage(0)
        setListExam(data)
    }

    const showModalFilter = (boonlean) => {
        setIsOpenFilter(boonlean)
    }

    let changeDataSearch = (data) => {
        setDataSearch(data)
    }

    // Action
    let handleViewDetail = (data) => {
        setIsOpenModalDetail(true)
        setCurrentExam(data)
    }

    let handleCloseModalDetail = () => {
        setIsOpenModalDetail(false)
    }

    let handleEdit = (data) => {
        navigate(`/editExam/${data._id}`)
    }

    let handleDelete = (data) => {
        setCurrentDelete(data)
        setIsOpenModal(true)
        setDescriptionModal(t('modal.confirm-delete'))
    }

    let handleCloseModal = () => {
        setIsOpenModal(false)
        setDescriptionModal('')
    }

    let handleSubmitModal = async () => {
        setLoadingApi(true)
        let respon = await examService.deleteExamById({ id: currentDelete._id })

        if (respon && respon.errCode === 0) {
            callAPI()
            toast.success(t('modal.delete-success'))
        } else {
            toast.error(t('modal.delete-error'))
        }
        setLoadingApi(false)

        setIsOpenModal(false)
        setDescriptionModal('')
    }

    let buildEJSTypeExam = (type) => {
        if (type === 'PUBLIC') {
            return language === 'en' ? 'Public' : 'Công khai'
        } else {
            return language === 'en' ? 'Private' : 'Riêng tư'
        }
    }

    let handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage.selected)
        // Thực hiện các tác vụ cần thiết khi chuyển trang
    }

    useEffect(() => {
      
        let slicedData =
            listExam &&
            listExam.length > 0 &&
            listExam.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
        setNewListExam(slicedData)
      
    }, [listExam, currentPage])

    return (
        <>
            <HeaderHome />
            <div className="my-exam-container">
                <SideBar data={sideBarUser} />

                <div className="content">
                    <div className="manage-body">
                        <h2 className="title">{t('content-your-exam.compilation-exams-participated')}</h2>

                        <>
                            <div className="header-exam">
                                <Link to={path.createExam} className="add-exam">
                                    {t('content-your-exam.add-exam')}
                                </Link>
                                <div className="filter">
                                    <FilterExam
                                        isOpenFilter={isOpenFilter}
                                        updateListDoExam={updateListDoExam}
                                        showModal={showModalFilter}
                                        changeDataSearch={changeDataSearch}
                                        children={<span className="search">{t('content-your-exam.filter-exam')}</span>}
                                    />
                                </div>
                            </div>
                            {newListExam && newListExam.length > 0 ? (
                                <>
                                    <div className="table-container">
                                        <div className="table-head">
                                            <table>
                                                <thead>
                                                    <tr className="table-header">
                                                        <th className="none-m px-5">STT</th>
                                                        {arrayTableTitles &&
                                                            arrayTableTitles.length > 0 &&
                                                            arrayTableTitles.map((item, index) => {
                                                                return (
                                                                    <th
                                                                        className={item.className}
                                                                        key={index}
                                                                        onClick={() => {
                                                                            handleSortByField(item.key, index)
                                                                            handleDisPlayTypeSort(item.key, item.status)
                                                                        }}
                                                                    >
                                                                        {t(item.value)}
                                                                        {fieldSort === item.key && iconSort}
                                                                    </th>
                                                                )
                                                            })}

                                                        <th className="none-l">{t('content-your-exam.password')}</th>
                                                        <th>{t('content-your-exam.type-exam')}</th>
                                                        <th>{t('content-your-exam.action')}</th>
                                                    </tr>
                                                </thead>
                                            </table>
                                        </div>

                                        <div className="table-body">
                                            <table>
                                                <tbody>
                                                    {newListExam &&
                                                        newListExam.length > 0 &&
                                                        newListExam.map((item, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <td className="none-m px-5">{index + 1}</td>
                                                                    <td>{item.data.title}</td>
                                                                    <td className="none-m">{item.data.quantityJoin}</td>

                                                                    <td
                                                                        className={
                                                                            hidden[index]
                                                                                ? 'hidden-password none-l'
                                                                                : 'none-l'
                                                                        }
                                                                        onDoubleClick={() => handleShowPassword(index)}
                                                                    >
                                                                        <Button
                                                                            descrip={t('tippy.double-click')}
                                                                            children={<span>{item.data.password}</span>}
                                                                        />
                                                                    </td>
                                                                    <td>{buildEJSTypeExam(item.data.typeExam)}</td>
                                                                    <td className="action" style={{gap : '30px'}}>
                                                                        <Button
                                                                            descrip={t('tippy.detail-exam')}
                                                                            children={
                                                                                <button
                                                                                    className="btn-view"
                                                                                    onClick={() =>
                                                                                        handleViewDetail(item)
                                                                                    }
                                                                                >
                                                                                    <FontAwesomeIcon icon={faEye} />
                                                                                </button>
                                                                            }
                                                                        />
                                                                        <Button
                                                                            descrip={t('tippy.edit-exam')}
                                                                            children={
                                                                                <button
                                                                                    className="btn-edit"
                                                                                    onClick={() => handleEdit(item)}
                                                                                >
                                                                                    <FontAwesomeIcon icon={faPencil} />
                                                                                </button>
                                                                            }
                                                                        />

                                                                        <Button
                                                                            descrip={t('tippy.remove-exam')}
                                                                            children={
                                                                                <button
                                                                                    className="btn-delete"
                                                                                    onClick={() => handleDelete(item)}
                                                                                >
                                                                                    <FontAwesomeIcon icon={faTrash} />
                                                                                </button>
                                                                            }
                                                                        />
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })}
                                                </tbody>
                                            </table>
                                        </div>
                                        <ReactPaginate
                                            previousLabel={currentPage === 0 ? null : t('admin.previous')}
                                            nextLabel={
                                                currentPage === Math.ceil(listExam.length / itemsPerPage) - 1
                                                    ? null
                                                    : t('admin.next')
                                            }
                                            breakLabel={'...'}
                                            breakClassName={'break-me'}
                                            pageCount={Math.ceil(listExam.length / itemsPerPage)} // Tổng số trang
                                            marginPagesDisplayed={2}
                                            pageRangeDisplayed={5}
                                            onPageChange={handlePageChange}
                                            containerClassName={'pagination'}
                                            activeClassName={'active'}
                                            forcePage={currentPage}
                                        />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <NotFoundData />
                                </>
                            )}
                        </>
                    </div>
                </div>
            </div>
            <Spiner loading={loadingApi} />
            {isOpenModal && (
                <ModalNotify
                    typeModal="exam"
                    isOpenModal={isOpenModal}
                    descriptionModal={descriptionModal}
                    handleCloseModal={handleCloseModal}
                    handleSubmitModal={handleSubmitModal}
                />
            )}
            {isOpenModalDetail && (
                <ModalDetailUser
                    data={currentExam}
                    isOpenModal={isOpenModalDetail}
                    handleCloseModalDetail={handleCloseModalDetail}
                    type="exam"
                    ratings
                />
            )}
        </>
    )
}

export default MyExam
