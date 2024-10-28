import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
  name: "application",
  initialState: {
    applicants: [],
    allAppliedCompanies: [],
  },
  reducers: {
    setApplicants: (state, action) => {
      state.applicants = action.payload;
    },
    setAllAppliedCompanies: (state, action) => {
      state.allAppliedCompanies = action.payload;
    },
  },
});

export const { setApplicants,setAllAppliedCompanies } = applicationSlice.actions;
export default applicationSlice.reducer;
