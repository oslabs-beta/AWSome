import { configureStore } from '@reduxjs/toolkit'
import graphReducer from './graph-reducer.js'

export default configureStore({
  reducer: {
    graphs: graphReducer
  }
})
