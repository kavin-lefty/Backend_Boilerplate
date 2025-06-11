import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AdminState {
  id: string | null;
}

const initialState: AdminState = {
  id: null,
};

const adminSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    SetUserId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
  },
});

export const { SetUserId } = adminSlice.actions;
export default adminSlice.reducer;
