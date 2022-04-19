import { createSlice } from "@reduxjs/toolkit";
import { fetchAlbumListAPI } from "../../useAPI/useAPI";
import { arrToMap } from "../../utils";

const albumListSlice = createSlice({
    name: 'albumList',
    initialState: {
        albumList: {},
        status: null,
        error: null,
    },
    reducers: {
        getAlbumsList(state, action) {
            Object.assign(state.albumList, arrToMap(action.payload))
        },
    },
    extraReducers: {
        [fetchAlbumListAPI.pending]: (state) => {
            state.status = 'loading';
            state.error = null;
        },
        [fetchAlbumListAPI.fulfilled]: (state, action) => {
            state.albumList = action.payload;
            state.status = 'loaded';
        },
        [fetchAlbumListAPI.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        }
    },
});

export const { getAlbumsList } = albumListSlice.actions;

export default albumListSlice.reducer;