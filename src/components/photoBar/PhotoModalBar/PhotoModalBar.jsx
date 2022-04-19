import '../PhotoModalBar/PhotoModalBar.css'

export default function PhotoModalBar({ url, title, handle }) {

    return (
        <div className="modal" onClick={handle}>
            <span className="close" onClick={handle}>&times;</span>
            <img className="modal-content" src={url} alt='' />
            <div className="caption">{title}</div>
        </div>
    )
}