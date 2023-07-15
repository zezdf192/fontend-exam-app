import { useEffect, useState } from 'react'
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-regular-svg-icons'
import AdminNavigation from './Navigation/AdminNavigation'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import ReactPaginate from 'react-paginate'

import './Manage.scss'
import ModalNotify from '../../component/Modal/ModalNotify'
import ModalEditUser from './ModalEditUser/ModalEditUser'
import ModalDetailUser from './ModalDetailUser/ModalDetailUser'
import userService from '../../service/userService'

import { sideBarAdmin } from '../../component/RouteSideBar/routeSideBar'
import SideBar from '../User/MyExam/SideBar/SideBar'
import FilterUser from '../../component/Filter/FilterUser/FilterUser'
import NotFoundData from '../../component/NotFoundData/NotFoundData'
import Spiner from '../../component/Spiner/Spiner'

function ManageUser() {
    const { t } = useTranslation()
    const language = useSelector((state) => state.app.language)
    const user = useSelector((state) => state.user)

    let [loadingApi, setLoadingApi] = useState(false)

    const [listUsers, setListUsers] = useState([])

    const [currentPage, setCurrentPage] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(5)
    const [newListExam, setNewListExam] = useState([])

    //delete modal
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [descriptionModal, setDescriptionModal] = useState('')
    const [currentDelete, setCurrentDelete] = useState()

    //edit modal
    const [currentEdit, setCurrentEdit] = useState()
    const [isOpenModalEdit, setIsOpenModalEdit] = useState(false)

    //detail modal
    const [currentUser, setCurrentUser] = useState()
    const [isOpenModalDetail, setIsOpenModalDetail] = useState(false)

    //filter
    const [isOpenFilter, setIsOpenFilter] = useState(false)
    const [keywordSearch, setKeywordSearch] = useState('')

    const [arrayTableTitles, setArrayTableTitles] = useState([
        {
            key: 'name',
            status: 'up',
            value: t('admin.author'),
        },
        {
            key: 'title',
            status: 'up',
            value: t('admin.exam-title'),
        },
        {
            key: 'limit',
            status: 'up',
            value: t('admin.maximum-attempts'),
        },
        {
            key: 'time',
            status: 'up',
            value: t('admin.exam-duration'),
        },
    ])

    const [dataSearch, setDataSearch] = useState({
        userID: user.userInfo._id,
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

    //call api when start page

    let callAPI = async () => {
        setLoadingApi(true)

        let respon = await userService.getAllUsers()

        if (respon && respon.errCode === 0) {
            setListUsers(respon.data)
        }
        setLoadingApi(false)
    }

    useEffect(() => {
        callAPI()
    }, [])

    //action
    let handleDelete = (data) => {
        setCurrentDelete(data)
        setIsOpenModal(true)
        setDescriptionModal('modal.delete-user')
    }

    let handleCloseModal = () => {
        setIsOpenModal(false)
        setDescriptionModal('')
    }

    let handleSubmitModal = async () => {
        setLoadingApi(true)
        let respon = await userService.deleteUser({ id: currentDelete._id })

        if (respon && respon.errCode === 0) {
            callAPI()
        }

        setIsOpenModal(false)
        setDescriptionModal('')
        setLoadingApi(false)

    }

    //modal edit
    let handleEdit = (data) => {
        setCurrentEdit(data)
        setIsOpenModalEdit(true)
    }

    let handleCloseModalEdit = () => {
        setIsOpenModalEdit(false)
    }

    let handleSubmitModalEdit = () => {
        callAPI()
        setIsOpenModalEdit(false)
    }

    //handle view deatil
    let handleViewDetail = (data) => {
        setIsOpenModalDetail(true)
        setCurrentUser(data)
    }

    let handleCloseModalDetail = () => {
        setIsOpenModalDetail(false)
    }

    let handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage.selected)
        // Thực hiện các tác vụ cần thiết khi chuyển trang
    }

    useEffect(() => {
        let slicedData =
            listUsers &&
            listUsers.length > 0 &&
            listUsers.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
        setNewListExam(slicedData)
    }, [listUsers, currentPage])

    const showModalFilter = (boonlean) => {
        setIsOpenFilter(boonlean)
    }

    let changeDataSearch = (data) => {
        setDataSearch(data)
    }

    let changeKeyWordSearch = (data) => {
        setKeywordSearch(data)
    }

    let updateListDoExam = (data) => {
        setCurrentPage(0)

        setListUsers(data)
    }

    return (
        <>
            <AdminNavigation />
            <div className="admin-manage-container">
                <SideBar data={sideBarAdmin} />
                <div className="content-manage">
                    <div className="manage-body-admin">
                        <h2 className="title-manage">{t('admin.manage-user')}</h2>

                        <div className="filter">
                            {/* <FontAwesomeIcon className="icon-filter" icon={faFilter} /> */}
                            <FilterUser
                                style={{ top: '26px' }}
                                type="admin"
                                isOpenFilter={isOpenFilter}
                                showModal={showModalFilter}
                                changeDataSearch={changeDataSearch}
                               
                                changeKeyWordSearch={changeKeyWordSearch}
                                updateListDoExam={updateListDoExam}
                                children={<span className="search">{t('content-your-exam.filter-exam')}</span>}
                            />
                        </div>
                        {newListExam && newListExam.length > 0 ? (
                            <div className="table-container">
                                <div className="table-head">
                                    <table>
                                        <thead>
                                            <tr className="table-header">
                                                <th className="px-5">STT</th>
                                                <th>{t('admin.email')}</th>
                                                <th>{t('admin.name-user')}</th>

                                                <th>{t('admin.action')}</th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>

                                <div className="table-body">
                                    <table>
                                        <tbody>
                                            {newListExam.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td className="px-5">{index + 1}</td>
                                                        <td>{item.email}</td>
                                                        <td>{item.name}</td>

                                                        <td className="action">
                                                            <button
                                                                className="btn-view"
                                                                onClick={() => handleViewDetail(item)}
                                                            >
                                                                <FontAwesomeIcon icon={faEye} />
                                                            </button>
                                                            <button
                                                                className="btn-edit"
                                                                onClick={() => handleEdit(item)}
                                                            >
                                                                <FontAwesomeIcon icon={faPencil} />
                                                            </button>
                                                            <button
                                                                className="btn-delete"
                                                                onClick={() => handleDelete(item)}
                                                            >
                                                                <FontAwesomeIcon icon={faTrash} />
                                                            </button>
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
                                        currentPage === Math.ceil(listUsers.length / itemsPerPage) - 1
                                            ? null
                                            : t('admin.next')
                                    }
                                    breakLabel={'...'}
                                    breakClassName={'break-me'}
                                    pageCount={Math.ceil(listUsers.length / itemsPerPage)} // Tổng số trang
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={5}
                                    onPageChange={handlePageChange}
                                    containerClassName={'pagination'}
                                    activeClassName={'active'}
                                    forcePage={currentPage}
                                />
                            </div>
                        ) : (
                            <>
                                <NotFoundData />
                            </>
                        )}
                    </div>
                </div>

                {isOpenModal && (
                    <ModalNotify
                        typeModal="user"
                        isOpenModal={isOpenModal}
                        descriptionModal={descriptionModal}
                        handleCloseModal={handleCloseModal}
                        handleSubmitModal={handleSubmitModal}
                    />
                )}

                {isOpenModalEdit && (
                    <ModalEditUser
                        isOpenModal={isOpenModalEdit}
                        data={currentEdit}
                        handleCloseModalEdit={handleCloseModalEdit}
                        handleSubmitModalEdit={handleSubmitModalEdit}
                    />
                )}

                {isOpenModalDetail && (
                    <ModalDetailUser
                        data={currentUser}
                        isOpenModal={isOpenModalDetail}
                        handleCloseModalDetail={handleCloseModalDetail}
                        type="user"
                    />
                )}
                 <Spiner loading={loadingApi} />
            </div>
        </>
    )
}

export default ManageUser
