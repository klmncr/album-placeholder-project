import { createAsyncThunk } from "@reduxjs/toolkit";
import { IAlbum, IPhoto } from "../../types/types";
import { setFullyLoaded } from "../slices/albumSlice/albumSlice";
import { AppDispatch, RootState } from "../store";


export const fetchPhotosAPI: any = createAsyncThunk< //сколько не пытался типизировать, кроме как any не смог найти варианта
    IPhoto[],
    string,
    {
        dispatch: AppDispatch;
        state: RootState;
        rejectValue: string;
    }
>(
    'album/fetchPhotosAPI',
    async (url: string, thunkAPI) => {

        const { getState, dispatch, rejectWithValue } = thunkAPI;

        const { album } = getState();
        const { photos, activeAlbum } = album;

        if (!activeAlbum) {
            return [];
        }

        try {
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error('Seems like u`ve got a server error');
            }
            const data = await res.json();

            if (photos[activeAlbum]) {
                Object.values(photos[activeAlbum]).length === data.length && dispatch(setFullyLoaded(true));
            }
            return data as IPhoto[];
        }
        catch (error: any | unknown) {
            return rejectWithValue(error.message);
        }
    }
)

export const fetchAlbumListAPI = createAsyncThunk<
    IAlbum[],
    string,
    {
        rejectValue: string;
    }
>(
    'albumList/fetchAlbumListAPI',
    async (url: string, { rejectWithValue }) => {
        try {
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error('SERVER ERROR');
            }
            const data = await res.json();
            return data as IAlbum[];
        }
        catch (error: any | unknown) {
            return rejectWithValue(error.message);
        }
    }
)

export const fetchUserListAPI = createAsyncThunk(
    'userList/fetchUserListAPI',
    async function (url: string, { rejectWithValue }) {
        try {
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error('SERVER ERROR');
            }
            const data = await res.json();
            return data;
        }
        catch (error: any | unknown) {
            return rejectWithValue(error.message);
        }
    }
)