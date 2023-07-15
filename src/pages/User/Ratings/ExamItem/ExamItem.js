import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import './ExamItem.scss'

function ExamItem({ data, handleChooseExamItem }) {
    const language = useSelector((state) => state.app.language)
    const { t } = useTranslation()

    let buildOverLimit = (data) => {
        if (data.limit.value !== 'L0') {
            if (data.limit.valueNum === data.quantityJoin) {
                return <span className="no-limit">{t('start-exam.no-attempts')}</span>
            }
        }
    }

    return (
        <>
            <div className="exam-item-container" onClick={() => handleChooseExamItem(data)}>
                <div className="exam-item-body">
                    {data && data.data && data.data.image ? (
                        <img className="exam-img" src={data.data.image} alt="" />
                    ) : (
                        <div className="exam-no-img">{data.data.title}</div>
                    )}

                    <div className="exam-item-content">
                        <div className="sub-content-exam-item">
                            <h3 className="exam-item-title">{data.data.title}</h3>

                            {buildOverLimit(data.data)}
                        </div>
                        <span className="quantity-join">
                            {language === 'en'
                                ? `${data.data.quantityJoin} exams`
                                : `${data.data.quantityJoin} lượt thi`}{' '}
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ExamItem
