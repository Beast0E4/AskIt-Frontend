import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../config/axiosInstance";


const initialState = {
    data: JSON.parse(localStorage.getItem("data")) || null,
    token: localStorage.getItem("token") || "",
    isLoggedIn: localStorage.getItem("isLoggedIn") || false
};

export const login = createAsyncThunk('/auth/signin', async (data) => {     
    try {
        const response = axiosInstance.post("auth/signin", data);
        toast.promise(response, {
            loading: 'Submitting the details',
            success: 'Successfully logged in',
            error: 'Something went wrong, try again'
        });
        return await response;
    } catch (error) {
        console.log(error);
    }
});

export const signup = createAsyncThunk('/auth/signup', async (data) => {     
    try {
        const response = axiosInstance.post("auth/signup", data);
        toast.promise(response, {
            loading: 'Submitting the details',
            success: 'Successfully signed up',
            error: 'Something went wrong, try again'
        });
        return await response;
    } catch (error) {
        console.log(error);
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.clear();
            state.data = undefined;
            state.isLoggedIn = false;
            state.token = "";
        }
    }, 
    extraReducers: (builder) => {
        builder
        .addCase(login.fulfilled, (state, action) => {
            console.log(action.payload);
            if(!action.payload) return;
            state.isLoggedIn = (action.payload.data?.token != undefined);
            state.data = action.payload.data?.userData;
            state.token = action.payload.data?.token;
            localStorage.setItem("token", action.payload.data?.token);
            localStorage.setItem("data", JSON.stringify(action.payload.data?.userData));
            localStorage.setItem("isLoggedIn", (action.payload.data?.token != undefined));
        });
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;