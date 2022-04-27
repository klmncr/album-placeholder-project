import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAlbum } from "../../../types/types";
import { fetchAlbumListAPI } from "../../useAPI/useAPI";
import { arrToMap } from "../../utils";

interface initialStateProps {
    albumList: IAlbum[]
    status: string | null
    error: string | null | undefined
}

const initialState = {
    albumList: {},
    status: null,
    error: null
} as initialStateProps;

const albumListSlice = createSlice({
    name: 'albumList',
    initialState,
    reducers: {
        getAlbumsList(state, action:PayloadAction<IAlbum[]>) {
            Object.assign(state.albumList, arrToMap(action.payload))
        },
    },
    extraReducers: {

        [fetchAlbumListAPI.pending.type]: (state) => {
            state.status = 'loading';
            state.error = null;
        },
        [fetchAlbumListAPI.fulfilled.type]: (state, action: PayloadAction<IAlbum[]>) => {
            state.albumList = action.payload;
            state.status = 'loaded';
        },
        [fetchAlbumListAPI.rejected.type]: (state, action: PayloadAction<string | null | undefined>) => {
            state.status = 'rejected';
            state.error = action.payload;
        }
    },
});

export const { getAlbumsList } = albumListSlice.actions;

export default albumListSlice.reducer;