import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import './LikeExamItem.scss'

function LikeExamItem({ data }) {
    let navigate = useNavigate()
    const [infoExam, setInfoExam] = useState()
    const user = useSelector((state) => state.user.userInfo)

    useEffect(() => {
        setInfoExam(data)
    }, [data])

    let hanldeClick = (examId) => {
        if (user) {
            navigate(`/verification/${user.email}/${user.name}/${examId._id}`)
        } else {
            navigate(`/verification/undefine/undefine/${examId._id}`)
        }
    }

    return (
        <div className="like-exam-item">
            {infoExam && infoExam.data && infoExam.data.image ? (
                <img
                    className="like-exam-img"
                    onClick={() => hanldeClick(infoExam)}
                    src={infoExam && infoExam.data && infoExam.data.image}
                    alt=""
                />
            ) : (
                <div className="span-img-container" onClick={() => hanldeClick(infoExam)}>
                    <h3 className="span-img">{infoExam && infoExam.data && infoExam.data.title}</h3>
                </div>
            )}

            <div className="like-exam-text">
                <span className="title">{infoExam && infoExam.data && infoExam.data.title}</span>
                <span className="description">{infoExam && infoExam.data && infoExam.data.description}</span>
            </div>
        </div>
    )
}

export default LikeExamItem
