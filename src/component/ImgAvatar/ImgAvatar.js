
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'

import nonAvatar from '../../styles/svg/avatar.jpg'
import './ImgAvatar.scss'

function ImgAvatar({ src, alt, style, onClick, showChange, styleParent }) {
    const { t } = useTranslation()
    const [srcImg, setSrcImg] = useState(src)

    useEffect(() => {
        if (!src) {
            setSrcImg(nonAvatar)
        } else {
            setSrcImg(src)
        }
    }, [src])

    return (
        <div className="img-contantner" onClick={onClick} style={styleParent}>
            <div className="icon-change" style={showChange ? style : { ...style, backgroundColor: 'transparent' }}>
                {showChange && <FontAwesomeIcon className="icon-change-camera" icon={faCamera} />}
            </div>
            <img className="img-contant" style={style} src={srcImg} alt={alt} />
        </div>
    )
}

export default ImgAvatar
