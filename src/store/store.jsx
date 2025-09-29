import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import productsReducer from './slice/productsSlice.jsx';
import cartReducer from './slice/cartSlice.jsx';
import profileReducer from "./slice/profileSlice";
import authReducer from './slice/authSlice.jsx';
import ordersReducer from './slice/ordersSlice.jsx';
import accessoriesReducer from './slice/accessoriesSlice.jsx';



const rootPersistConfig = {
    key: 'root',
    storage,
    whitelist: ['products', 'cart'],
};

const rootReducer = combineReducers({
    auth: authReducer,
    products: productsReducer,
    cart: cartReducer,
    profile: profileReducer,
    orders: ordersReducer,
    accessories: accessoriesReducer,

});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);

