import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpenImage: false,
  isOpenVisual: false,
  isOpenTable: false,
  dentImageId: 0,
  firebaseConfig:{
    apiKey: "AIzaSyCEwO0_RjfLMCsYk2wPEqGUCuGGlb8DhMQ",
    authDomain: "chat-app-ae7f9.firebaseapp.com",
    databaseURL: "https://chat-app-ae7f9-default-rtdb.firebaseio.com",
    projectId: "chat-app-ae7f9",
    storageBucket: "chat-app-ae7f9.appspot.com",
    messagingSenderId: "455831969427",
    appId: "1:455831969427:web:92527c5ae51f70eb21b766",
  }
};

const isOpenSlice = createSlice({
  name: 'isOpen',
  initialState,
  reducers: {
    toggleOpenImage(state) {
      state.isOpenImage = !state.isOpenImage;
    },
    toggleOpenVisual(state) {
      state.isOpenVisual = !state.isOpenVisual;
    },
    toggleOpenTable(state) {
      state.isOpenTable = !state.isOpenTable;
    },
    setDentImageId(state, action) {
      state.dentImageId = action.payload;
    },
    setOpen(state, action) {
      state.isOpen = action.payload;
    },
  },
});

export const { toggleOpenImage,toggleOpenVisual,toggleOpenTable,setDentImageId, setOpen } = isOpenSlice.actions;

export default isOpenSlice.reducer;