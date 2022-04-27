import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../albumsPage/albumsPage.css'
import { albumListSelector } from "../../redux/selectors/selectors";
import { useSelector } from "react-redux";
import { fetchAlbumListAPI } from "../../redux/useAPI/useAPI";
import { filterArray } from "../../redux/utils";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { IAlbum } from "../../types/types";
import { RootState } from "../../redux/store";

export default function AlbumsPage() {


    const dispatch = useAppDispatch();
    const initialAlbums: IAlbum[] = useSelector((state: RootState)  => albumListSelector(state));
    const [filter, setFilter] = useState('');
    const { status, error } = useSelector((state: RootState) => state.albumList)

    useEffect(() => {
        status || dispatch (fetchAlbumListAPI('https://jsonplaceholder.typicode.com/albums'));
    }, [dispatch, status]);

    return (
        <div className="container">
            <input type="text" className="albumListInput" onChange={e => setFilter(e.target.value)}
                placeholder="Search for names.."></input>

            {status === 'loading' && <h1> LOADING ....</h1>}

            {error && <h1>{error}</h1>}

            <ul className="albumsListUL">
                {
                    status === 'loaded' &&
                    filterArray(Object.values(initialAlbums), filter)
                        .map((album: IAlbum) =>
                            <Link className="albumListLink" key={album.id} to={`/albums/${album.id}`}>
                                <li>
                                    <span>{album.title}</span>
                                </li>
                            </Link>
                        )
                }
            </ul>
        </div>
    )
}