import CategorySlice from "../reducers/CategorySlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        categories: CategorySlice
    }
})