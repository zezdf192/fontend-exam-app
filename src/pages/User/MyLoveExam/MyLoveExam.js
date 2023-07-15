import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { sideBarUser } from '../../../component/RouteSideBar/routeSideBar'
import userService from '../../../service/userService'
import HeaderHome from '../../HomePage/HeaderHome/HeaderHome'
import SideBar from '../MyExam/SideBar/SideBar'
import LikeExamItem from './LikeExamItem/LikeExamItem'
import { path } from '../../../until/constant'

import './MyLoveExam.scss'
import ReactPaginate from 'react-paginate'
import Spiner from '../../../component/Spiner/Spiner'

function MyLoveExam() {
    const { t } = useTranslation()
    const language = useSelector((state) => state.app.language)
    let navigate = useNavigate()
    const user = useSelector((state) => state.user)

    const [loadingApi, setLoadingApi] = useState(false)

    const [currentPage, setCurrentPage] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(2)
    const [newListExam, setNewListExam] = useState([])

    const [listLikeExam, setListLikeExam] = useState([])

    useEffect(() => {
        const callAPI = async () => {
            setLoadingApi(true)
            let respon = await userService.getAllExamUserLike({ email: user.userInfo.email })
            if (respon && respon.errCode === 0) {
                setListLikeExam(respon.data)
            }
            setLoadingApi(false)
        }

        callAPI()
    }, [])

    let handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage.selected)
        // Thực hiện các tác vụ cần thiết khi chuyển trang
    }

    useEffect(() => {
        let slicedData =
            listLikeExam &&
            listLikeExam.length > 0 &&
            listLikeExam.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
        setNewListExam(slicedData)
    }, [listLikeExam, currentPage])

    return (
        <>
            <HeaderHome />
            <div className="like-exam-container">
                <SideBar data={sideBarUser} />
                <div className="content-like">
                    <div className="sub-content">
                        <h2>{t('favorite.introduction')}</h2>
                        <span>{t('favorite.feature')}</span>
                    </div>
                    <div className={listLikeExam && listLikeExam.length > 0 ? 'list-exam-body' : 'list-exam-body none'}>
                        <h2>{t('favorite.favorite-exams')}</h2>
                        {newListExam && newListExam.length > 0 ? (
                            <>
                                {newListExam.map((item, index) => {
                                    return <LikeExamItem key={index} data={item} />
                                })}
                                <>
                                    <ReactPaginate
                                        previousLabel={currentPage === 0 ? null : t('admin.previous')}
                                        nextLabel={
                                            currentPage === Math.ceil(listLikeExam.length / itemsPerPage) - 1
                                                ? null
                                                : t('admin.next')
                                        }
                                        breakLabel={'...'}
                                        breakClassName={'break-me'}
                                        pageCount={Math.ceil(listLikeExam.length / itemsPerPage)} // Tổng số trang
                                        marginPagesDisplayed={2}
                                        pageRangeDisplayed={5}
                                        onPageChange={handlePageChange}
                                        containerClassName={'pagination'}
                                        activeClassName={'active'}
                                    />
                                </>
                            </>
                        ) : (
                            <div className="no-data">
                                <span className="top">{t('favorite.no-exam')}</span>
                                <span className="link">
                                    {t('favorite.view-more')}
                                    <Link to={path.home}>{t('favorite.here')}</Link>
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Spiner loading={loadingApi} />
        </>
    )
}

export default MyLoveExam
