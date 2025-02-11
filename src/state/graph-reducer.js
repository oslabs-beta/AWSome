import { createSlice } from '@reduxjs/toolkit';

export const graphReducer = createSlice({
  name: 'graphReducer',
  initialState: {
    graph: [],
    metric: [],
  },
  reducers: {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
    addGraph: (state, action) => {
      console.log(action.payload);
      if (action.payload.type === 'bar') {
        state.graph.push('bar');
        state.metric.push(action.payload.metric);
      } else if (action.payload.type === 'areaLine') {
        state.graph.push('areaLine');
        state.metric.push(action.payload.metric);
      } else if (action.payload === 'line') {
        state.graph.push('line');
        state.metric.push(action.payload.metric);
      }
    },
    getData: (state, action) => {
      console.log(action);

    },
  },
});

// Action creators are generated for each case reducer function
export const { addGraph, getData } = graphReducer.actions;

export default graphReducer.reducer;
