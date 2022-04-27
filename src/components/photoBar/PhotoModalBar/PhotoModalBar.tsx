import { FC } from 'react';
import '../PhotoModalBar/PhotoModalBar.css'

interface PhotoModalBarProps {
    url: string;
    title: string;
    handle: () => void;
}

const PhotoModalBar: FC<PhotoModalBarProps> = ({ url, title, handle }) => {
    
    return (
        <div className="modal" onClick={handle}>
            <span className="close" onClick={handle}>&times;</span>
            <img className="modal-content" src={url} alt='' />
            <div className="caption">{title}</div>
        </div>
    )
}

export default PhotoModalBar;