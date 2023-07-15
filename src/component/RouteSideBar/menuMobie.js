import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faBookOpen, faFlag, faGear, faHeart, faHome, faPencil } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { path } from '../../until/constant'

export let menuMobie = [
    [
        {
            to: '/',
            text: 'result.homepage',
            icon: <FontAwesomeIcon className="icon" icon={faHome} />,
        },
    ],
    [
        {
            to: path.myExam,
            text: 'detail-user.my-exam',
            icon: <FontAwesomeIcon className="icon" icon={faBookOpen} />,
        },

        {
            to: path.myLoveExam,
            text: 'detail-user.favorite-exam',
            icon: <FontAwesomeIcon className="icon" icon={faHeart} />,
        },
        {
            to: path.myDoExam,
            text: 'home-page.exam-participated',
            icon: <FontAwesomeIcon className="icon" icon={faPencil} />,
        },
    ],
    [
        {
            to: '/ratings/examId',
            text: 'ratings.ratings',
            icon: <FontAwesomeIcon className="icon" icon={faFlag} />,
        },
        
    ],
    [
        {
            to: path.setting,
            text: 'detail-user.setting',
            icon: <FontAwesomeIcon className="icon" icon={faGear} />,
        },
    ],
]

export let menuMobieAdmin = [
    [
        {
            to: '/admin/manageUser',
            text: 'admin.manage-user',
            icon: <FontAwesomeIcon className="icon" icon={faUser} />,
        },
        {
            to: '/admin/manageExam',
            text: 'admin.manage-exam',
            icon: <FontAwesomeIcon className="icon" icon={faPencil} />,
        },
    ],
]
