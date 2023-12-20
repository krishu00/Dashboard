import { configureStore } from '@reduxjs/toolkit'
import pieSlice from "./features/pieChart"

export const store = configureStore({
  reducer: {pieSlice},
})