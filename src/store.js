import { configureStore } from '@reduxjs/toolkit';
import isOpenReducer from './isOpenSlice';

const store = configureStore({
  reducer: {
    isOpen: isOpenReducer,
  },
});

export default store;
