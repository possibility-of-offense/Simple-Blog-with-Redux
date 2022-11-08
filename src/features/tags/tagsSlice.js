import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const tagsAdapter = createEntityAdapter({
  selectId: (tag) => tag.tag,
});
const initialState = tagsAdapter.getInitialState();

const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    addTag: tagsAdapter.addOne,
    addTags: tagsAdapter.addMany,
    updateTags: tagsAdapter.setMany,
    mergeTags: tagsAdapter.updateMany,
  },
});

export const selector = tagsAdapter.getSelectors();

export const { addTag, addTags, updateTags, mergeTags } = tagsSlice.actions;

export default tagsSlice.reducer;
