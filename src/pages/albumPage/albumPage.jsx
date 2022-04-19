import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PhotoBar from "../../components/photoBar/photoBar";
import Button from "../../components/button/button";
import '../albumPage/albumPage.css'
import { setActiveAlbum } from "../../redux/slices/albumSlice/albumSlice";
import { useDispatch } from "react-redux";
import { albumPhotosSelector, activeAlbumSelector } from "../../redux/selectors/selectors";
import { useSelector } from "react-redux";
import { fetchPhotosAPI } from "../../redux/useAPI/useAPI"
import { filterArray } from "../../redux/utils";

export default function AlbumPage() {

    const { id } = useParams();

    const [filter, setFilter] = useState('');

    const dispatch = useDispatch();
    const activeAlbum = useSelector((state) => activeAlbumSelector(state));
    const { status, error } = useSelector((state) => state.album);
    const photos = useSelector((state) => albumPhotosSelector(state, activeAlbum));
    const fullyLoaded = useSelector((state) => state.album.fullyLoaded[activeAlbum]);

    useEffect(() => {
        dispatch(setActiveAlbum(id));
        status[id] || dispatch(fetchPhotosAPI(`https://jsonplaceholder.typicode.com/album/${id}/photos?_limit=10`));
    }, [id, dispatch, status]);

    const handleShowPhotos = () => {
        const amount = Object.values(photos).length;
        if (!fullyLoaded) {
            dispatch(fetchPhotosAPI(`https://jsonplaceholder.typicode.com/album/${id}/photos?_limit=${amount + 10}`));
        }
    };

    return (
        <div className="albumPageContainer">

            <input type="text" className="photoInput" onChange={e => setFilter(e.target.value)} placeholder="Search for names.."></input>

            {status[activeAlbum] === 'loading' && <h1>LOADING...</h1>}

            {error[activeAlbum] && <h1>AN ERROR: {error[activeAlbum]}</h1>}

            <div className="grid-container">
                {
                    status[activeAlbum] === 'loaded' &&
                    filterArray(Object.values(photos), filter)
                        .map((photo) => <PhotoBar key={photo.id} url={photo.url} title={photo.title} />)
                }
            </div>

            <Button className={fullyLoaded? 'hidden' : 'photoList'} handle={handleShowPhotos} label='See more' />

            <h2 className={fullyLoaded? "" : 'hidden'}>Это все фотографии этого альбома на данный момент</h2>
        </div>
    )
}