import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setHeaders, url } from "./api";


const initialState = {
    list: [],
    status: null,
};

export const ordersFetch = createAsyncThunk("orders/ordersFetch", async () => {
    try {
        const response = await axios.get(`${url}/orders`, setHeaders());
        return response.data;
    } catch (error) {
        console.log(error)
    }
});

export const ordersEdit = createAsyncThunk();

const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {},
    extraReducers: {
        [ordersFetch.pending]: (state, action) => {
            state.status = "pending";
        },
        [ordersFetch.pending]: (state, action) => {
            state.list = action.payload;
            state.status = "success";
        },
        [ordersFetch.pending]: (state, action) => {
            state.status = "rejected";
        },
    }
});

export default ordersSlice.reducer;

