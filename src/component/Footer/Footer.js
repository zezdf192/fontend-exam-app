import { useTranslation } from 'react-i18next'

import './Footer.scss'
import facebook from '../../styles/icon/facebook.png'
import youtube from '../../styles/icon/youtube.png'

function FooterContent() {
    const { t } = useTranslation()
    return (
        <div className="footer-container">
            <div className="footer-content row">
                <div className="col-lg-4 col-sm-12 footer-col">
                    <h3 className="title-footer">Exam App</h3>
                    <span className="text-footer">{t('footer.about')}</span>
                    <div className="social-footer">
                        <a target="_blank" href="https://www.facebook.com/duynguyen1923">
                            <img src={facebook} alt="" />
                        </a>
                        <a target="_blank" href="https://www.youtube.com/@duynguyenuc2971">
                            <img src={youtube} alt="" />
                        </a>
                    </div>
                </div>
                <div className="col-lg-4 col-sm-12 footer-col">
                    <h3 className="title-footer">{t('footer.contact')}</h3>
                    <span className="text-footer">{`(+84) 395 573 465`}</span>
                    <span className="text">ducduyzajzero@gmail.com</span>
                </div>
                <div className="col-lg-4 col-sm-12 footer-col">
                    <h3 className="title-footer">{t('footer.reserved')}</h3>
                </div>
            </div>
        </div>
    )
}

export default FooterContent
