import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import Dropzone from 'react-dropzone'

import ImgAvatar from '../../../../../component/ImgAvatar/ImgAvatar'

function ImgChange({ file, handleChangeFile, isEditAvatar, handleEditAvatar }) {
    const { t } = useTranslation()
    const user = useSelector((state) => state.user)
    const app = useSelector((state) => state.app.language)
    const dispatch = useDispatch()
    let handleDrop = (acceptedFiles) => {
        const imageFile = acceptedFiles[0]
        const reader = new FileReader()

        reader.readAsDataURL(imageFile)
        reader.onload = () => {
            handleChangeFile(reader.result)
        }
    }

    let hanldeDropzoneClick = () => {
        if (!isEditAvatar) {
            handleEditAvatar(true)
        } 
    }

    return (
        <div className="img-change-container">
            <div className="img-body">
                <div className="left-ct">
                    <Dropzone onDrop={handleDrop} disabled={!isEditAvatar}>
                        {({ getRootProps, getInputProps }) => (
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                {
                                    <ImgAvatar
                                        onClick={hanldeDropzoneClick}
                                        showChange={isEditAvatar}
                                        alt={t('crud-exam.error-img')}
                                        styleParent={{ marginLeft: '50px' }}
                                        style={{
                                            width: '70px',
                                            height: '70px',
                                        }}
                                        src={file ? file : user.userInfo.avatar}
                                    />
                                }
                            </div>
                        )}
                    </Dropzone>
                </div>
            </div>
        </div>
    )
}

export default ImgChange
