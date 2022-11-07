import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const tagsAdapter = createEntityAdapter();
const initialState = tagsAdapter.getInitialState();

const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    addTag: tagsAdapter.addOne,
  },
});

export const { addTag } = tagsSlice.actions;

export default tagsSlice.reducer;
