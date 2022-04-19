import { configureStore } from "@reduxjs/toolkit";

import albumReducer from "../slices/albumSlice/albumSlice";
import albumsListReducer from "../slices/albumsListSlice/albumsListSlice";
import usersListReducer from "../slices/userSlice/userListSlice";

export default configureStore({
    reducer: {
        album: albumReducer,
        albumList: albumsListReducer,
        users: usersListReducer,
    }
});