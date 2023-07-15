import { faUser } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export let sideBarUser = [
    {
        to: '/myExam',
        text: 'home-page.your-exam',
    },
    {
        to: '/favorite',
        text: 'detail-user.favorite-exam',
    },
    {
        to: '/myDoExam',
        text: 'home-page.exam-participated',
    },
    {
        to: '/ratings/examId',
        text: 'ratings.ratings',
    },
]

export let sideBarAdmin = [
    {
        to: '/admin/manageUser',
        text: 'admin.manage-user',
    },
    {
        to: '/admin/manageExam',
        text: 'admin.manage-exam',
    },
]

export let sideBarDetailUser = [
    {
        to: 'settings/personal',
        text: 'detail-user.account-settings',
        icon: <FontAwesomeIcon icon={faUser} />,
    },
]
