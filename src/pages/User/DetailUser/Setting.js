import HeaderHome from '../../HomePage/HeaderHome/HeaderHome'
import './Setting.scss'
import SideBarUser from './SideBarUser/SideBarUser'
import { sideBarDetailUser } from '../../../component/RouteSideBar/routeSideBar'
import GroupField from './GroupField/GroupField'

function DetailUser() {
    return (
        <>
            <HeaderHome />
            <div className="detail-user-container">
                <SideBarUser data={sideBarDetailUser} />
                <GroupField />
            </div>
        </>
    )
}

export default DetailUser
