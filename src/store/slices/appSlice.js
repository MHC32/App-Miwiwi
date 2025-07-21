import { createSlice } from '@reduxjs/toolkit';

// ----------------------------------------------------------------------

const initialState = {
  appName: 'KesPam',
};

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
});

export default slice.reducer;