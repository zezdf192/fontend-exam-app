import { useState, useRef, useEffect } from 'react'
import { faChevronDown, faCloudArrowUp, faX } from '@fortawesome/free-solid-svg-icons'
import Dropzone from 'react-dropzone'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './QuestionItem.scss'
import ButtonNotify from '../../../component/ButtonNotify/ButtonNotify'

function QuestionItem({
    isValid,
    maxScore,
    listScoreQuestion,
    scoreInitQuestion,
    dataParent,
    stt,
    bottom,
    deleteQuestion,
    handleClodeValid,
    handleGetDataFromChild,
    checkChildren,
    fix,
    isScroll = false,
    isSubmit = false,
}) {
    const { t } = useTranslation()
    const language = useSelector((state) => state.app.language)
    const user = useSelector((state) => state.user)

    //init state
    let keyAnswer = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K']
    const [data, setData] = useState({})

    const [titleQuestion, setTitleQuestion] = useState('')
    const [listAnswer, setListAnswer] = useState([
        {
            answerId: 'id-' + Math.random().toString(36).substr(2, 9) + '-' + Date.now(),
            title: '',
            keyAnswer: keyAnswer[0],
            isAnswerTrue: false,
        },
        {
            answerId: 'id-' + Math.random().toString(36).substr(2, 9) + '-' + Date.now(),
            title: '',
            keyAnswer: keyAnswer[1],
            isAnswerTrue: false,
        },
        {
            answerId: 'id-' + Math.random().toString(36).substr(2, 9) + '-' + Date.now(),
            title: '',
            keyAnswer: keyAnswer[2],
            isAnswerTrue: false,
        },
        {
            answerId: 'id-' + Math.random().toString(36).substr(2, 9) + '-' + Date.now(),
            title: '',
            keyAnswer: keyAnswer[3],
            isAnswerTrue: false,
        },
    ])

    let scoreRef = useRef()

    const [file, setFile] = useState(null)

    const [selectedScore, setSelectedScore] = useState(null)
    const [listScore, setListScore] = useState([])
    const [isModalScore, setIsModalScore] = useState(false)

    const [errTitle, setErrTitle] = useState('')
    const [errAnswerTrue, setErrAnswerTrue] = useState(false)
    const [errScore, setErrScore] = useState('')

   

    const messagesEndRef = useRef(null)
    let inputRef = useRef()
    let targetRef = useRef()

   

    if (isSubmit) {
        handleGetDataFromChild({
            image: file,
            index: stt - 1,
            score: selectedScore && selectedScore,
            listAnswer: listAnswer,
            title: titleQuestion,
        })
    }

    let handleChangeInput = (e, index) => {
        listAnswer[index].title = e.target.value
        setListAnswer([...listAnswer])
    }

    let handleChangeCheck = (e, index) => {
        let newArray = []
        listAnswer.forEach((item) => {
            item.isAnswerTrue = false
            newArray.push(item)
        })

        newArray[index].isAnswerTrue = e.target.checked
        setListAnswer([...newArray])
    }

    //CRUD answer
    let handleAddNewAnswer = () => {
        
        listAnswer.forEach((item, index) => {
            item.keyAnswer = keyAnswer[index]
        })
        setListAnswer([
            ...listAnswer,
            {
                answerId: 'id-' + Math.random().toString(36).substr(2, 9) + '-' + Date.now(),
                title: '',
                keyAnswer: keyAnswer[listAnswer.length],
                isAnswerTrue: false,
            },
        ])
    }

    let handleDeleteAnswer = (index) => {
        listAnswer.splice(index, 1)
        listAnswer.forEach((item, index) => {
            item.keyAnswer = keyAnswer[index]
        })
        setListAnswer([...listAnswer])
       
    }

    let renderAnswer = () => {
        return (
            listAnswer &&
            listAnswer.length > 0 &&
            listAnswer.map((item, index) => {
                return (
                    <>
                        <div key={index} className="answer-item">
                            <label>{item.keyAnswer}</label>
                            <input
                                value={item.title}
                                onChange={(e) => handleChangeInput(e, index)}
                                className="form-control answer-title"
                            />

                            <div className="action-answer">
                                <input
                                    type="radio"
                                    onChange={(e) => handleChangeCheck(e, index)}
                                    onClick={() => setErrAnswerTrue(false)}
                                    name={`answer-${listAnswer[0].answerId}`}
                                    checked={item.isAnswerTrue}
                                />
                                <FontAwesomeIcon
                                    onClick={() => handleDeleteAnswer(index)}
                                    className="delete"
                                    icon={faX}
                                />
                            </div>
                        </div>
                        {isValid && !item.title && (
                            <span className="error-answer">{t('crud-exam.required-answer')}</span>
                        )}
                    </>
                )
            })
        )
    }

    

    useEffect(() => {
        setListScore(listScoreQuestion)

        // set current score equal max score when user change max score

        setSelectedScore(scoreInitQuestion)
       
    }, [listScoreQuestion])

    useEffect(() => {
        setData(dataParent)
        if (dataParent.score) {
            setSelectedScore(+dataParent.score)
        } 

        setFile(dataParent.image)

        setTitleQuestion(dataParent.title)

        if (dataParent.answers && dataParent.answers.length > 0) {
            setListAnswer([...dataParent.answers])
        }
    }, [dataParent])

    let handleChangeScore = (e, type) => {
        if (type === 'span') {
            let score = +e.target.innerHTML

            setSelectedScore(score)
            setIsModalScore(false)
        } else {
            setSelectedScore(e.target.value)
        }
    }

    useEffect(() => {
        if (isValid) {
            let isCheck = true
            if (titleQuestion.length <= 0) {
                setErrTitle('crud-exam.error-title-question')
                isCheck = false
            } else {
                setErrTitle()
            }

            let isAnswerTrue = false
            let titleAnswer = true
            listAnswer.forEach((item) => {
                if (item.isAnswerTrue) {
                    isAnswerTrue = true
                }
                if (!item.title) {
                    titleAnswer = false
                }
            })

            if (!titleAnswer) {
                isCheck = false
            }

            if (isAnswerTrue) {
                setErrAnswerTrue(false)
            } else {
                isCheck = false
                setErrAnswerTrue(true)
            }

            if (selectedScore) {
                if (!isNaN(selectedScore)) {
                    if (selectedScore <= 0) {
                        setErrScore('Điểm phải lớn hơn 0')
                        isCheck = false
                    } else {
                        setErrScore('')
                    }
                } else {
                    isCheck = false
                    setErrScore('Điểm phải là số nguyên')
                }
            }

            checkChildren(isCheck)
           
        }
    }, [fix])

    const handleDrop = (acceptedFiles) => {
        const imageFile = acceptedFiles[0]
        const reader = new FileReader()

        reader.readAsDataURL(imageFile)
        reader.onload = () => {
            setFile(reader.result)
        }
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (targetRef.current && !targetRef.current.contains(event.target)) {
                // Xử lý khi click ra ngoài phần tử mục tiêu
                setIsModalScore(false)
            }
        }

        document.addEventListener('click', handleClickOutside)

        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [])

    return (
        <>
            <div className="question-item-container">
                <div className="question-item-body">
                    <div className="header">
                        <div className="title-create ">
                            <span className="title-answer ">
                                {t('crud-exam.question-number')} {stt}
                            </span>
                            <div className="input ">
                                <input
                                    type="text"
                                    value={titleQuestion}
                                    onChange={(e) => setTitleQuestion(e.target.value)}
                                    onKeyDown={() => setErrTitle('')}
                                    ref={inputRef}
                                    className="input form-control"
                                />
                                <span className="error-message">{t(errTitle)}</span>
                            </div>
                            <div className="score-container ">
                                <div className="top-ct" ref={targetRef}>
                                    <label>{t('crud-exam.score')} </label>

                                    <div className="score-body">
                                        <div className="ct-top">
                                            <input
                                                type="text"
                                                value={selectedScore}
                                                onChange={(e) => handleChangeScore(e, 'input')}
                                            />
                                            <span className="icon" onClick={() => setIsModalScore(!isModalScore)}>
                                                <FontAwesomeIcon className="font-icon" icon={faChevronDown} />
                                            </span>
                                        </div>
                                        {isModalScore && (
                                            <div className="list-score" ref={scoreRef}>
                                                {listScore &&
                                                    listScore.length > 0 &&
                                                    listScore.map((item, index) => {
                                                        return (
                                                            <span
                                                                key={index}
                                                                onClick={(e) => handleChangeScore(e, 'span')}
                                                                className="item-score"
                                                            >
                                                                {item}{' '}
                                                            </span>
                                                        )
                                                    })}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <span className="error-score">{errScore}</span>
                            </div>
                        </div>
                    </div>
                    <div className="content-add-question">
                        <div className="list-answer">
                            <div className="row">
                                <div className="col-lg-5 col-sm-12">
                                    <div className="img-body">
                                        <span>{t('crud-exam.add-description-img')}</span>
                                        <div className="left-ct">
                                            <Dropzone onDrop={handleDrop}>
                                                {({ getRootProps, getInputProps }) => (
                                                    <div {...getRootProps()}>
                                                        <input {...getInputProps()} />
                                                        <ButtonNotify
                                                            descrip={t('crud-exam.choose-img')}
                                                            children={
                                                                <FontAwesomeIcon
                                                                    className="btn-img"
                                                                    icon={faCloudArrowUp}
                                                                />
                                                            }
                                                        />
                                                    </div>
                                                )}
                                            </Dropzone>
                                            {file && <img className="img" src={file} alt={t('crud-exam.error-img')} />}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-7 col-sm-12">{renderAnswer()}</div>
                            </div>

                            <div className="add-answer">
                                <button
                                    className="btn-delete-question"
                                    onClick={() => deleteQuestion(data && data.questionId)}
                                >
                                    {t('crud-exam.remove-question')}
                                </button>
                                <button className="btn-add-answer" onClick={() => handleAddNewAnswer()}>
                                    {t('crud-exam.add-answer')}
                                </button>
                            </div>
                        </div>
                        <div className={errAnswerTrue ? 'note error' : 'note'}>
                            {errAnswerTrue ? t('crud-exam.note-error') : t('crud-exam.note')}
                        </div>
                    </div>
                </div>
            </div>
            <div ref={messagesEndRef}></div>
        </>
    )
}

export default QuestionItem
