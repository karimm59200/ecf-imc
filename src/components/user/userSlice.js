import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: [{
            id: 1,
            name: "John Doe",
            email: "john.doe@test.fr",
            role: "client",

        }, {
            id: 2,
            name: "Jane Doe",
            email: "jane.doe@test.fr",
            role: "client",
        }],
    },
    reducers: {
        addUserAction(state, action) {
            const id = state.users.length + 1;
            state.users.push({id: id, ...action.payload})
        },
        editUserAction(state, action) {
            const userToEdit = state.users.find(user => user.id === action.payload.id)
            if (userToEdit) {
                state.users = [...state.users.filter(user => user.id !== action.payload.id), action.payload]
            } else {
                state.users.push(action.payload)
            }
        },
        removeUserAction(state, action) {
            state.users = state.users.filter(user => user.id !== action.payload)
        },

    }
})

export const {addUserAction, editUserAction, removeUserAction} = userSlice.actions

export const selectUsers = (state) => state.user.users;

export default userSlice.reducer



// Path: src\components\user\Users.js

