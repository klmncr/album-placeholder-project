import { createSlice } from "@reduxjs/toolkit";
import { fetchPhotosAPI } from "../../useAPI/useAPI";
import { arrOfPhotosToMap } from "../../utils";

const albumSlice = createSlice({
    name: 'album',
    initialState: {
        activeAlbum: null,
        fullyLoaded: {},
        photos: {},
        status: {},
        error: {},
    },

    reducers: {
        setActiveAlbum(state, action) {
            state.activeAlbum = action.payload;
        },
        setFullyLoaded(state, action) {
            console.log(action.payload);
            state.fullyLoaded[state.activeAlbum] = action.payload;
        }
    },

    extraReducers: {
        [fetchPhotosAPI.pending]: (state) => {
            state.status[state.activeAlbum] = 'loading';
            state.error[state.activeAlbum] = null;
        },
        [fetchPhotosAPI.fulfilled]: (state, action) => {
            Object.assign(state.photos, arrOfPhotosToMap(action.payload));
            state.status[state.activeAlbum] = 'loaded';
        },
        [fetchPhotosAPI.rejected]: (state, action) => {
            state.status[state.activeAlbum] = 'rejected';
            state.error[state.activeAlbum] = action.payload;
        }
    }
})

export const { setActiveAlbum, setFullyLoaded } = albumSlice.actions;

export default albumSlice.reducer;