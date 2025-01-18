import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Lưu trữ trong localStorage
import rootReducer from "@/reducer";

// Cấu hình persist
const persistConfig = {
  key: "root",
  storage, // Lưu trữ state trong localStorage
  whitelist: ["auth"], // Chỉ persist state của phần auth
};

// Tạo persist reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Tạo Redux store
export const store = configureStore({
  reducer: persistedReducer,
  // Thêm middleware để bỏ qua kiểm tra serializable
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"], // Bỏ qua hành động persist
      },
    }),
});

// Tạo Persistor
export const persistor = persistStore(store);
