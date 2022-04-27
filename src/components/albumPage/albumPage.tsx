import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PhotoBar from "../photoBar/photoBar";
import Button from "../button/button";
import '../albumPage/albumPage.css'
import { setActiveAlbum } from "../../redux/slices/albumSlice/albumSlice";
import { useDispatch } from "react-redux";
import { albumPhotosSelector, activeAlbumSelector } from "../../redux/selectors/selectors";
import { useSelector } from "react-redux";
import { fetchPhotosAPI } from "../../redux/useAPI/useAPI"
import { filterArray } from "../../redux/utils";
import { RootState } from "../../redux/store";
import { IPhoto } from "../../types/types";

export default function AlbumPage() {

    const { id } = useParams();

    const [filter, setFilter] = useState('');

    const dispatch = useDispatch();
    const activeAlbum = useSelector((state: RootState) => activeAlbumSelector(state));
    const { status, error } = useSelector((state: RootState) => state.album);
    const photos = useSelector((state: RootState) => activeAlbum && albumPhotosSelector(state, activeAlbum));
    const fullyLoaded = useSelector((state: RootState) => activeAlbum && state.album.fullyLoaded[activeAlbum]);

    useEffect(() => {
        if (!id) return;
        dispatch(setActiveAlbum(id));
        status[Number(id)] || dispatch(fetchPhotosAPI(`https://jsonplaceholder.typicode.com/album/${id}/photos?_limit=10`));
    }, [id, dispatch, status]);

    const handleShowPhotos = () => {
        const amount = photos && Object.values(photos).length;
        if (!fullyLoaded) {
            dispatch(fetchPhotosAPI(`https://jsonplaceholder.typicode.com/album/${id}/photos?_limit=${amount && amount + 10}`));
        }
    };
    
    return (
        <div className="albumPageContainer">

            <input type="text" className="photoInput" onChange={e => setFilter(e.target.value)} placeholder="Search for names.."></input>

            {activeAlbum && status[activeAlbum] === 'loading' && <h1>LOADING...</h1>}

            {activeAlbum && error[activeAlbum] && <h1>AN ERROR: {error[activeAlbum]}</h1>}

            <div className="grid-container">
                {
                    activeAlbum && photos && status[activeAlbum] === 'loaded' &&
                    filterArray(Object.values(photos), filter)
                        .map((photo: IPhoto) => <PhotoBar key={photo.id} url={photo.url} title={photo.title} />)
                }
            </div>

            <Button className={fullyLoaded ? 'hidden' : 'photoList'} handle={handleShowPhotos} label='See more' />

            <h2 className={fullyLoaded ? "" : 'hidden'}>Это все фотографии этого альбома на данный момент</h2>
        </div>
    )
}