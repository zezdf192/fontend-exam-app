import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faArrowDown91,
    faArrowDownAZ,
    faArrowUp19,
    faArrowUpAZ,
    faEye,  
    faPlay,
} from '@fortawesome/free-solid-svg-icons'

import './MyDoExam.scss'
import HeaderHome from '../../../HomePage/HeaderHome/HeaderHome'
import SideBar from '.././SideBar/SideBar'
import examService from '../../../../service/examService'
import ModalDetailUser from '../../../Admin/ModalDetailUser/ModalDetailUser'
import Button from '../../../../component/ButtonNotify/ButtonNotify'
import Filter from '../../../../component/Filter/Filter'
import { sideBarUser } from '../../../../component/RouteSideBar/routeSideBar'
import Spiner from '../../../../component/Spiner/Spiner'
import NotFoundData from '../../../../component/NotFoundData/NotFoundData'

function MyDoExam() {
    const { t } = useTranslation()
    const language = useSelector((state) => state.app.language)
    let navigate = useNavigate()
    const user = useSelector((state) => state.user)

    const [loadingApi, setLoadingApi] = useState(false)

    const [currentPage, setCurrentPage] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(5)
    const [newListExam, setNewListExam] = useState([])

    //state

    const [listDoExam, setListDoExam] = useState([])
    const [dataSearch, setDataSearch] = useState({})
    const [fieldSort, setFieldSort] = useState('nameExam')

    const [isOpenFilter, setIsOpenFilter] = useState(false)

    //detail modal
    const [currentUser, setCurrentUser] = useState()
    const [isOpenModalDetail, setIsOpenModalDetail] = useState(false)
    const [descriptionModal, setDescriptionModal] = useState('')
    const [iconSort, setIconSort] = useState(<FontAwesomeIcon className="icon-sort" icon={faArrowUpAZ} />)
    const [arrayTableTitles, setArrayTableTitles] = useState([
        {
            key: 'nameExam',
            status: 'up',
            value: 'content-your-exam.name-exam',
        },
        {
            key: 'maxScore',
            status: 'up',
            value: 'content-your-exam.score',
        },
        {
            className: 'none-m',
            key: 'valueTimeDoExam',
            status: 'up',
            value: 'content-your-exam.time',
        },
        {
            className: 'none-l',
            key: 'quantityJoin',
            status: 'up',
            value: 'content-your-exam.number-attempts',
        },
    ])

    const showModalFilter = (boonlean) => {
        setIsOpenFilter(boonlean)
    }

    let callAPI = async () => {
        setLoadingApi(true)

        let respon = await examService.getAllDoExamByUserId({ email: user.userInfo.email })

        if (respon && respon.errCode === 0) {
            setListDoExam(respon.data)
        }

        setLoadingApi(false)
    }

    useEffect(() => {
        callAPI()
    }, [])

    let handleViewDetail = async (data) => {
        setLoadingApi(true)
        setIsOpenModalDetail(true)

        let respon = await examService.getDetailExamById(data.data.examID)

        if (respon && respon.errCode === 0) {
            setCurrentUser(respon.data)
        }
        setLoadingApi(false)
    }

    let handleCloseModalDetail = () => {
        setIsOpenModalDetail(false)
        setDescriptionModal('')
    }

    let handleStartDoExam = (data) => {
        if (user.userInfo) {
            navigate(`/verification/${user.userInfo.email}/${user.userInfo.name}/${data.data.examID}`)
        } else {
            navigate(`/verification/undefine/undefine/${data.data.examID}`)
        }
    }

    let updateListDoExam = (data) => {
        setListDoExam(data)
        setCurrentPage(0)
    }

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
        let respon = await examService.sortDoExamByType({
            userID: user && user.userInfo && user.userInfo._id,
            type: type,
            typeSort: arrayTableTitles[index].status,
            dataSearch: dataSearch,
        })

        if (respon && respon.errCode === 0) {
            setListDoExam(respon.data)
        }
        setLoadingApi(false)

    }

    let changeDataSearch = (data) => {
        setDataSearch(data)
    }

    let handleDisPlayTypeSort = (type, typeSort) => {
        if (type === 'nameExam' || type === 'time') {
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

    let handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage.selected)
        // Thực hiện các tác vụ cần thiết khi chuyển trang
    }

    useEffect(() => {
        let slicedData =
            listDoExam &&
            listDoExam.length > 0 &&
            listDoExam.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
        setNewListExam(slicedData)
    }, [listDoExam, currentPage])

    return (
        <>
            <HeaderHome />
            <div className="my-exam-container">
                <SideBar data={sideBarUser} />

                <div className="content">
                    <div className="manage-body">
                        <h2 className="title">{t('content-your-exam.compilation-exams-participated')}</h2>
                        <div className="filter">
                            <Filter
                                isOpenFilter={isOpenFilter}
                                updateListDoExam={updateListDoExam}
                                showModal={showModalFilter}
                                changeDataSearch={changeDataSearch}
                                children={<span className="search">{t('content-your-exam.filter-exam')}</span>}
                            />
                        </div>
                        {listDoExam && listDoExam.length > 0 ? (
                            <>
                                <div className="table-container">
                                    <div className="table-head">
                                        <table>
                                            <thead>
                                                <tr className="table-header">
                                                    <th className="px-5 none-m">STT</th>
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
                                                                <td className="px-5 none-m">{index + 1}</td>
                                                                <td>{item.data.nameExam}</td>
                                                                <td>{item.data.maxScore}</td>
                                                                <td className="none-m">
                                                                    {language === 'en'
                                                                        ? item.data.timeEn
                                                                        : item.data.timeVi}
                                                                </td>
                                                                <td className="none-l">{item.data.quantityJoin}</td>

                                                                <td className="action">
                                                                    <Button
                                                                        descrip={t('tippy.detail-exam')}
                                                                        children={
                                                                            <button
                                                                                className="btn-view"
                                                                                onClick={() => handleViewDetail(item)}
                                                                            >
                                                                                <FontAwesomeIcon icon={faEye} />
                                                                            </button>
                                                                        }
                                                                    />
                                                                    {item.data.typeExam === 'PUBLIC' ? (
                                                                        <Button
                                                                            descrip={t('tippy.start-exam')}
                                                                            children={
                                                                                <button
                                                                                    className="btn-view"
                                                                                    notifi="Tới bài thi"
                                                                                    onClick={() =>
                                                                                        handleStartDoExam(item)
                                                                                    }
                                                                                >
                                                                                    {' '}
                                                                                    <FontAwesomeIcon
                                                                                        className="btn-edit"
                                                                                        icon={faPlay}
                                                                                    />
                                                                                </button>
                                                                            }
                                                                        />
                                                                    ) : (
                                                                        <></>
                                                                    )}
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
                                            currentPage === Math.ceil(listDoExam.length / itemsPerPage) - 1
                                                ? null
                                                : t('admin.next')
                                        }
                                        breakLabel={'...'}
                                        breakClassName={'break-me'}
                                        pageCount={Math.ceil(listDoExam.length / itemsPerPage)} // Tổng số trang
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
                    </div>
                </div>
                {isOpenModalDetail && (
                    <ModalDetailUser
                        data={currentUser && currentUser.exam}
                        isOpenModal={isOpenModalDetail}
                        handleCloseModalDetail={handleCloseModalDetail}
                        type="doExam"
                        ratings
                    />
                )}
            </div>
            <Spiner loading={loadingApi} />
            {/* </LoadingOverlay> */}
        </>
    )
}

export default MyDoExam
