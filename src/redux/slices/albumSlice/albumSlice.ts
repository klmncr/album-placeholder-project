import { createSlice } from "@reduxjs/toolkit";
import { fetchPhotosAPI } from "../../useAPI/useAPI";
import { arrOfPhotosToMap } from "../../utils";
import { PayloadAction } from "@reduxjs/toolkit";
import { IPhoto } from "../../../types/types";


interface albumStateProps {
    activeAlbum: number | null;
    fullyLoaded: { [key: number]: boolean };
    photos: { [key: number]: IPhoto[] };
    status: { [key: number]: string };
    error: { [key: number]: string | undefined | null };
}

const initialState = {
    activeAlbum: null,
    fullyLoaded: {},
    photos: {},
    status: {},
    error: {},
} as albumStateProps;

const albumSlice = createSlice({
    name: 'album',
    initialState,
    reducers: {
        setActiveAlbum(state, action) {
            state.activeAlbum = action.payload;
        },
        setFullyLoaded(state, action: PayloadAction<boolean>) {

            state.fullyLoaded[state.activeAlbum!] = action.payload;
        }
    },

    extraReducers: {
        [fetchPhotosAPI.pending.type]: (state) => {
            state.status[state.activeAlbum!] = 'loading';
            state.error[state.activeAlbum!] = null;
        },
        [fetchPhotosAPI.fulfilled.type]: (state, { payload }) => {
            Object.assign(state.photos, arrOfPhotosToMap(payload));
            state.status[state.activeAlbum!] = 'loaded';
        },
        [fetchPhotosAPI.rejected.type]: (state, { payload }) => {
            state.status[state.activeAlbum!] = 'rejected';
            state.error[state.activeAlbum!] = payload;
        }
    }
})

export const { setActiveAlbum, setFullyLoaded } = albumSlice.actions;

export default albumSlice.reducer;