import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import './ExamQuestion.scss'

function ExamQuestion({
    examInfo,
    questionActive,
    questionId,
    getAnswerFromChildren,
    myAnswer,
    changeListAnswerChoose,
    listAnswerChoose,
}) {
    const { t } = useTranslation()
    const [exam, setExam] = useState()
    const [chooseAnswer, setChooseAnswer] = useState([])

    //xu ly khi chon nhieu cau tra loi
    const [listChooseAnswer, setListChooseAnswer] = useState([])

    let keyAnswer = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K']

    useEffect(() => {
        setExam(examInfo)
    }, [examInfo])

    useEffect(() => {
        if (myAnswer) setChooseAnswer(myAnswer)
        else {
            setChooseAnswer([])
        }

      
    }, [myAnswer])

    let handleChooseAnswer = (data, index) => {
        changeListAnswerChoose(index, questionActive)

        getAnswerFromChildren({
            questionActive,
            questionId,
            data,
        })
    }

    

    return (
        <div className="exam-question-container">
            <div className="exam-question-body">
                <div className="header">
                    <h2 className="title-exam-question">
                        {t('start-exam.question')} {questionActive + 1}:{' '}
                        <span style={{ marginLeft: '10px' }}> {examInfo && examInfo.title}</span>
                    </h2>
                    <span className="score">
                        {examInfo && examInfo.score} {t('start-exam.score')}
                    </span>
                </div>
                <div className="img">
                    <img src={examInfo && examInfo.image} alt=""></img>
                </div>
                <div className="list-answer">
                    {examInfo &&
                        examInfo.answers &&
                        examInfo.answers.length > 0 &&
                        examInfo.answers.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    onClick={() => handleChooseAnswer(examInfo.answers && examInfo.answers[index], index)}
                                    className={
                                        listAnswerChoose&& listAnswerChoose.length > 0 && listAnswerChoose[questionActive] === index
                                            ? 'answer-item active'
                                            : 'answer-item'
                                    }
                                >
                                    <span>{keyAnswer[index]}</span>
                                    {item.title}
                                </div>
                            )
                        })}
                </div>
            </div>
        </div>
    )
}

export default ExamQuestion
