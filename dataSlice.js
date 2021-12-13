import { createSlice } from "@reduxjs/toolkit";
export const dataSlice = createSlice({
  name: "user",
  initialState: {
    Data: [
      {
        comment: [],
        date: "2021-12-23T10:12:54.224Z",
        desc: "Xg",
        end_pg: "1",
        start_pg: "1",
        title: "Xg",
      },
    ],
    index: null,
  },

  reducers: {
    pushUserData: (state, action) => {
      state.Data.push(action.payload);
    },
    updateItem: (state, action) => {
      state.Data.splice(state.index, 1, action.payload);
    },
    setIndex: (state, action) => {
      state.index = action.payload;
      console.log(state.index);
    },
    AddComment: (state, action) => {
      state.Data[state.index].comment.push(action.payload);
    },
  },
});
export const { pushUserData, updateItem, setIndex, AddComment } =
  dataSlice.actions;
export default dataSlice.reducer;
