import { createSlice } from '@reduxjs/toolkit';

export const eventSlice = createSlice({
    name: 'event',
    initialState: {
        events: [],
    },
    reducers: {
        addEvent: (state, action) => {
            console.log(action);
            const newEvent = {
                ...action.payload,
              };
              state.events.push(newEvent);
        },
    },
});

export const selectEvents = state => state.event.events;
export const { addEvent } = eventSlice.actions;
export default eventSlice.reducer;
