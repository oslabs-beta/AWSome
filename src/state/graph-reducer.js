import { createSlice } from '@reduxjs/toolkit';
import { data } from 'react-router';

export const graphReducer = createSlice({
  name: 'graphReducer',
  initialState: {
    graph: [],
    metric: [],
    data: [],
  },
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    addGraph: (state, action) => {
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
      if (action.payload.data) {
        // console.log('let: ', action.payload.data.result.length);

        state.data = [];

        for (let i = 0; i < action.payload.data.result.length; i++) {
          state.data.push(action.payload.data.result[i]);
        }
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addGraph, getData } = graphReducer.actions;

export default graphReducer.reducer;
