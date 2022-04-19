import { useEffect, useState } from 'react';
import '../photoBar/photoBar.css'
import PhotoModalBar from './PhotoModalBar/PhotoModalBar';

export default function PhotoBar({ url, title }) {

    const [modal, setModal] = useState([]);
    useEffect(() => setModal(false), []);

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