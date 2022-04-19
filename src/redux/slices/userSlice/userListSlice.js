import { createSlice } from "@reduxjs/toolkit";
import { fetchUserListAPI } from "../../useAPI/useAPI";


export const userListSlice = createSlice({
    name: 'userListSlice',
    initialState: {
        activeUser: null,
        users: {},
        status: {},
        error: {},
    },
    reducers: {
        setActiveUser(state, action){
            state.activeUser = action.payload;
        }
    },
    extraReducers: {
        [fetchUserListAPI.pending]: (state) => {
            state.status[state.activeUser] = 'loading';
            state.error[state.activeUser] = null;
        },
        [fetchUserListAPI.fulfilled]: (state, action) => {
            state.status[state.activeUser] = 'loaded';
            state.users[state.activeUser] = action.payload;
        },
        [fetchUserListAPI.rejected]: (state, action) => {
            state.status[state.activeUser] = 'rejected';
            state.error[state.activeUser] = action.payload;
        }
    }
})

export const {setActiveUser} = userListSlice.actions;

export default userListSlice.reducer;