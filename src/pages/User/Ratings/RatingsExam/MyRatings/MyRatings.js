import { useEffect,  useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import ReactPaginate from 'react-paginate'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faArrowDown91,
    faArrowDownAZ,
    faArrowUp19,
    faArrowUpAZ,
    faEye,
    faPlay,
} from '@fortawesome/free-solid-svg-icons'

import ButtonNotify from '../../../../../component/ButtonNotify/ButtonNotify'
import examService from '../../../../../service/examService'
import ModalDetailUser from '../../../../Admin/ModalDetailUser/ModalDetailUser'
import Spiner from '../../../../../component/Spiner/Spiner'
import NotFoundData from '../../../../../component/NotFoundData/NotFoundData'
import './MyRatings.scss'

function MyRatings({ listMyRating }) {
    const { examId } = useParams()
    const { t } = useTranslation()
    const language = useSelector((state) => state.app.language)
    let navigate = useNavigate()
    const user = useSelector((state) => state.user.userInfo)
    let [loadingApi, setLoadingApi] = useState(false)

    const [currentPage, setCurrentPage] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(5)
    const [newListExam, setNewListExam] = useState([])

    const [listMyRatings, setListMyRatings] = useState([])
    const [iconSort, setIconSort] = useState(<FontAwesomeIcon className="icon-sort" icon={faArrowDownAZ} />)
    const [fieldSort, setFieldSort] = useState('nameExam')

    //action
    const [currentUser, setCurrentUser] = useState()
    const [isOpenModalDetail, setIsOpenModalDetail] = useState(false)
    const [descriptionModal, setDescriptionModal] = useState('')

    const [arrayTableTitles, setArrayTableTitles] = useState([
        {
            key: 'nameExam',
            status: 'up',
            value: 'ratings.name-exam',
        },
        {
            key: 'rank',
            status: 'up',
            value: 'ratings.current-ranking',
        },
        {
            key: 'maxScore',
            status: 'up',
            value: 'ratings.score',
            className: 'none-s',
        },
        {
            key: 'valueTimeDoExam',
            status: 'up',
            value: 'ratings.time',
            className: 'none-l',
        },
    ])

    useEffect(() => {
        setListMyRatings(listMyRating)
    }, [listMyRating])

    let handleSortByField = async (type, index) => {
        let copyArrayTableTitles = arrayTableTitles

        if (copyArrayTableTitles[index].status === 'up') {
            copyArrayTableTitles[index].status = 'down'
        } else {
            copyArrayTableTitles[index].status = 'up'
        }

        setFieldSort(type)
        setArrayTableTitles(copyArrayTableTitles)

        if (type === 'rank') {
            let copyArray = listMyRatings
            if (arrayTableTitles[index].status === 'up') {
                copyArray.sort((a, b) => a.rank - b.rank)
            } else {
                copyArray.sort((a, b) => b.rank - a.rank)
            }

            setListMyRatings(copyArray)
        } else if (type === 'nameExam') {
            let copyArray = listMyRatings
            if (arrayTableTitles[index].status === 'up') {
                copyArray.sort((a, b) => a.infor[type].localeCompare(b.infor[type]))
            } else {
                copyArray.sort((a, b) => b.infor[type].localeCompare(a.infor[type]))
            }

            setListMyRatings(copyArray)
        } else {
            let copyArray = listMyRatings
            if (arrayTableTitles[index].status === 'up') {
                copyArray.sort((a, b) => a.infor[type] - b.infor[type])
            } else {
                copyArray.sort((a, b) => b.infor[type] - a.infor[type])
            }

            setListMyRatings(copyArray)
        }
    }

    let handleDisPlayTypeSort = (type, typeSort) => {
        if (type === 'nameExam') {
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

    let handleViewDetail = async (data) => {
        setIsOpenModalDetail(true)
        setLoadingApi(true)
        let respon = await examService.getDetailExamById(data.infor.examID)

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
        if (user) {
            navigate(`/verification/${user.email}/${user.name}/${data.infor.examID}`)
        } else {
            navigate(`/verification/undefine/undefine/${data.infor.examID}`)
        }
    }

    let handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage.selected)
        // Thực hiện các tác vụ cần thiết khi chuyển trang
    }

    useEffect(() => {
        let slicedData =
            listMyRatings &&
            listMyRatings.length > 0 &&
            listMyRatings.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
        setNewListExam(slicedData)
    }, [listMyRatings, currentPage])

    return (
        <>
            <div className="my-ratings-container">
                {listMyRatings && listMyRatings.length > 0 ? (
                    <div className="table-container">
                        <div className="table-head">
                            <table>
                                <thead>
                                    <tr className="table-header">
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

                                        <th className="px-5">{t('ratings.action')}</th>
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
                                                    <td className="px-5">{item.infor.nameExam}</td>
                                                    <td>{item.rank}</td>
                                                    <td className="none-s">{item.infor.maxScore}</td>
                                                    <td className="none-l">
                                                        {language === 'en' ? item.infor.timeEn : item.infor.timeVi}
                                                    </td>
                                                    {/* <td>{item.quantityJoin}</td> */}

                                                    <td className="action">
                                                        <ButtonNotify
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
                                                        {item.exam.typeExam === 'PUBLIC' ? (
                                                            <ButtonNotify
                                                                descrip={t('tippy.start-exam')}
                                                                children={
                                                                    <button
                                                                        className="btn-view"
                                                                        notifi="Tới bài thi"
                                                                        onClick={() => handleStartDoExam(item)}
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
                                currentPage === Math.ceil(listMyRatings.length / itemsPerPage) - 1
                                    ? null
                                    : t('admin.next')
                            }
                            breakLabel={'...'}
                            breakClassName={'break-me'}
                            pageCount={Math.ceil(listMyRatings.length / itemsPerPage)} // Tổng số trang
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={handlePageChange}
                            containerClassName={'pagination'}
                            activeClassName={'active'}
                        />
                    </div>
                ) : (
                    <>
                        <NotFoundData />
                    </>
                )}
            </div>
            <Spiner loading={loadingApi} />
            {isOpenModalDetail && (
                <ModalDetailUser
                    data={currentUser && currentUser.exam}
                    isOpenModal={isOpenModalDetail}
                    handleCloseModalDetail={handleCloseModalDetail}
                    type="doExam"
                />
            )}
        </>
    )
}

export default MyRatings
