import { useEffect, useState } from 'react'
import './ListAnswer.scss'

function ListAnswer({
    examInfo,
    changeQuestionActive,
    questionActive,
    getAnswerFromChildren,
    myAnswer,
    changeQuestionId,
}) {
    const [listAnswer, setListAnswer] = useState([])

    useEffect(() => {
        setListAnswer(examInfo)
    }, [examInfo])

    let handleChangeQuestion = (index) => {
        changeQuestionActive(index)
        changeQuestionId(listAnswer[index])
    }

    return (
        <div className="list-answer-container">
            <div className="list-answer-body">
                <div className="list-answer">
                    {listAnswer &&
                        listAnswer.length > 0 &&
                        listAnswer.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    onClick={() => handleChangeQuestion(index)}
                                    className={
                                        questionActive === index
                                            ? 'answer-item active'
                                            : myAnswer[index]
                                            ? 'answer-item choose'
                                            : 'answer-item'
                                    }
                                >
                                    {index + 1}
                                </div>
                            )
                        })}
                </div>
            </div>
        </div>
    )
}

export default ListAnswer
