import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/types"
import { UserReducerInitialState } from "../../types/reducer-types";

const initialState: UserReducerInitialState = {
    user: null,
    loading: true
}

//udse in app.ts where checking user logged in or not
export const userReducer = createSlice({
    name: "userReducer",
    initialState,
    reducers: {
        //return details of user stored in payload action
        userExist: (state, action: PayloadAction<User>) => {
            state.loading = false,
                state.user = action.payload
        },
        userNotExist: (state) => {
            state.loading = true,
                state.user = null
        }
    }

});

export const { userExist, userNotExist } = userReducer.actions