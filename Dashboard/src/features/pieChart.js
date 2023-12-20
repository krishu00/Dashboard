import { createSlice } from "@reduxjs/toolkit";
import produce from "immer";

const initialState = {
  itemPieChartList: [],
  billingData: [], 
  fullMonthlyData:[],
};

export const pieSlice = createSlice({
  name: "piechart",
  initialState,
  reducers: {
    setPieData: (state, action) => {
      return produce(state, (draftState) => {
        draftState.itemPieChartList = action?.piedata;
      });
    },
    setBillingData: (state, action) => {
      return produce(state, (draftState) => {
        draftState.billingData = action?.billData;
      });
    },
    setFullData: (state, action) => {
      return produce(state, (draftState) => {
        draftState.fullMonthlyData = action?.fullData;
      });
    },
    
  },
});

// Export action creators
export const { setPieData, setBillingData } = pieSlice.actions;

export default pieSlice.reducer;


