import { createSlice } from '@reduxjs/toolkit';

export const graphReducer = createSlice({
  name: 'graphReducer',
  initialState: {
    graph: [],
  },
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    addGraph: (state, action) => {
        if (action.payload === 'bar') {
            console.log('nut');
        }


        //state.push()
    },
  },
});

// Action creators are generated for each case reducer function
export const { addGraph, getData } = graphReducer.actions;

export default graphReducer.reducer;
