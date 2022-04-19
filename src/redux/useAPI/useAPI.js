import { createAsyncThunk } from "@reduxjs/toolkit";
import { setFullyLoaded } from "../slices/albumSlice/albumSlice";


export const fetchPhotosAPI = createAsyncThunk(
    'album/fetchPhotosAPI',
    async function (url, { rejectWithValue, getState, dispatch }) {

        const photos = getState().album.photos;
        const activeAlbum = getState().album.activeAlbum;

        try {
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error('Seems like u`ve got a server error');
            }
            const data = await res.json();

            if(photos[activeAlbum]){
                Object.values(photos[activeAlbum]).length === data.length && dispatch(setFullyLoaded(true));
            }
                return data;
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const fetchAlbumListAPI = createAsyncThunk(
    'albumList/fetchAlbumListAPI',
    async function (url, { rejectWithValue }) {
        try {
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error('SERVER ERROR');
            }
            const data = await res.json();
            return data;
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const fetchUserListAPI = createAsyncThunk(
    'userList/fetchUserListAPI',
    async function (url, { rejectWithValue }) {
        try {
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error('SERVER ERROR');
            }
            const data = await res.json();
            return data;
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
    }
)