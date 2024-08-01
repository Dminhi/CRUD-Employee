import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

export const getCategoriesThunk = createAsyncThunk("getCategories", async({ page, size }) => {
    const apiGetCategories = `http://localhost:8080/api.myservice.com/v1/admin/categories?page=${page}&&size=${size}`
    const response = await axios.get(apiGetCategories)
    console.log("alo", response.data.data);
    return response.data.data;
})

const categorySlice = createSlice({
    name: "categories",
    initialState: {
        data: [],
        loading: false,
        currentPage: 0,
        size: 2,
        totalElement: 0
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(
                getCategoriesThunk.pending, (state) => {
                    state.loading = true
                }
            )
            .addCase(
                getCategoriesThunk.fulfilled, (state, action) => {
                    state.data = action.payload.content
                    state.size = action.payload.pageSize
                    state.currentPage = action.payload.currentPage
                    state.totalElement = action.payload.totalElement
                    state.loading = false
                }
            )
            .addCase(
                getCategoriesThunk.rejected, (state) => {
                    state.loading = false
                }
            )
    }
})
export default categorySlice.reducer