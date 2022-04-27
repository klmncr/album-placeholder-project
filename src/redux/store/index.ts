import { combineReducers, configureStore } from "@reduxjs/toolkit";

import albumReducer from "../slices/albumSlice/albumSlice";
import albumsListReducer from "../slices/albumsListSlice/albumsListSlice";
import usersListReducer from "../slices/userSlice/userListSlice";

const rootReducer = combineReducers({
    album: albumReducer,
    albumList: albumsListReducer,
    users: usersListReducer,
})

const store = configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof configureStore>
export type AppDispatch = typeof store.dispatch;

export default store;