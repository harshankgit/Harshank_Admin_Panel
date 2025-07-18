import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import uiSlice from './slices/uiSlice';
import usersSlice from './slices/usersSlice';
import productsSlice from './slices/productsSlice';
import ordersSlice from './slices/ordersSlice';
import analyticsSlice from './slices/analyticsSlice';
import notificationsSlice from './slices/notificationsSlice';
import themeSlice from './slices/themeSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    ui: uiSlice,
    users: usersSlice,
    products: productsSlice,
    orders: ordersSlice,
    analytics: analyticsSlice,
    notifications: notificationsSlice,
    theme: themeSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;