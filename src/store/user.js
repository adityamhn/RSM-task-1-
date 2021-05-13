import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

const API_AUTH_URL = "http://localhost:8000/api/auth/";

export const loginThunk = createAsyncThunk(
    'user/loginUser',
    async ( { email, password },{rejectWithValue} ) => {
        try{
        const res = await axios.post(API_AUTH_URL + "signin", { email, password })
        return res.data
        }
        catch(err) {
            return rejectWithValue(err.response.data);
        }
    }
)

const initalUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

// slice
const slice = createSlice({
    name: 'user',
    initialState: {
        value: initalUser,
        loading: false,
        error: null
    },
    reducers: {
        logoutSuccess: (state, action) => {  // yeh bana hua tha pehle se so not makin a logout action naya
            state.value = null;
            localStorage.removeItem('user')
        },

    },
    extraReducers: {
        [loginThunk.pending]: (state, action) => {
            state.loading = true
        },
        [loginThunk.fulfilled]: (state, action) => {
            localStorage.setItem('user', JSON.stringify(action.payload));
            state.value = action.payload;
            state.loading = false
        },
        [loginThunk.rejected]: (state, action) => {
            state.error = action.payload.message;
            state.loading = false
        }
    }
});

export default slice.reducer

export const { logoutSuccess } = slice.actions
