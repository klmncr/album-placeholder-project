import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../../types/types";
import { fetchUserListAPI } from "../../useAPI/useAPI";

interface userListProps {
    activeUser: null | number,
    users: { [key: number]: IUser[] },
    status: { [key: number]: string },
    error: { [key: number]: string | undefined | null, }
}

const initialState = {
    activeUser: null,
    users: {},
    status: {},
    error: {},
} as userListProps

export const userListSlice = createSlice({
    name: 'userListSlice',
    initialState,
    reducers: {
        setActiveUser(state, action) {
            state.activeUser = action.payload;
        }
    },
    extraReducers: {
        [fetchUserListAPI.pending.type]: (state) => {
            state.status[state.activeUser!] = 'loading';
            state.error[state.activeUser!] = null;
        },
        [fetchUserListAPI.fulfilled.type]: (state, action) => {
            state.status[state.activeUser!] = 'loaded';
            state.users[state.activeUser!] = action.payload;
        },
        [fetchUserListAPI.rejected.type]: (state, action) => {
            state.status[state.activeUser!] = 'rejected';
            state.error[state.activeUser!] = action.payload;
        }
    }
})

export const { setActiveUser } = userListSlice.actions;

export default userListSlice.reducer;