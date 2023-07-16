import HeaderHome from '../../HomePage/HeaderHome/HeaderHome'
import './Setting.scss'
import SideBarUser from './SideBarUser/SideBarUser'
import { sideBarDetailUser } from '../../../component/RouteSideBar/routeSideBar'
import GroupField from './GroupField/GroupField'
import FooterContent from '../../../component/Footer/Footer'

function DetailUser() {
    return (
        <>
            <HeaderHome />
            <div className="detail-user-container">
                <SideBarUser data={sideBarDetailUser} />
                <GroupField />
            </div>
            <FooterContent />
        </>
    )
}

export default DetailUser
