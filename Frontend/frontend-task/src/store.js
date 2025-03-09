import {configureStore} from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import taskReducer from './features/taskSlice';

const store=configureStore({
    reducer:{
        user:userReducer,
        task:taskReducer
    }
});
export default store;