import { useState } from 'react';
import '../photoBar/photoBar.css'
import PhotoModalBar from './PhotoModalBar/PhotoModalBar';
import { FC } from 'react'

interface PtohoBarProps {
    url: string;
    title: string;
}

const PhotoBar: FC<PtohoBarProps> = ({ url, title }) => {

    const [modal, setModal] = useState(false);

    const handlePhotoModalBar = () => {
        setModal(!modal);
    };

    return (
        <div className='containerPhoto'>
            <img src={url} alt='This is not allowed' onClick={handlePhotoModalBar}></img>
            {
                modal ? <PhotoModalBar url={url} title={title} handle={handlePhotoModalBar} /> : null
            }
            <span className='textSpan'>{title}</span>
        </div>
    )
}

export default PhotoBar;