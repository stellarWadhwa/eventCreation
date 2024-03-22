import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {persistReducer} from "redux-persist"
import { eventSlice } from "../features/eventsSlice";

const persistConfig={
    key:'root',
    version:1,
    storage
};
const reducer=combineReducers({
   
    event:eventSlice.reducer
})


const persistedReducer=persistReducer(persistConfig,reducer);

export const reduxStore=configureStore({
    reducer:persistedReducer
})
