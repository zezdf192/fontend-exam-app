import { BeatLoader } from 'react-spinners'
import './Spiner.scss'

function Spiner({ loading }) {
    return (
        loading && (
            <div className="loader-overlay">
                <div className="loader-shadow"></div>
                <BeatLoader size={15} color="#36d7b7" loading={loading} />
            </div>
        )
    )
}

export default Spiner
