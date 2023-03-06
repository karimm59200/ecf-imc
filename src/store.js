import {configureStore} from '@reduxjs/toolkit'
import userSlice from "./components/user/userSlice";

const store = configureStore({
    reducer: {
        user: userSlice,
    },

})

export default store