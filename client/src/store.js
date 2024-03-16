import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {userRegisterReducer,userLoginReducer,getAllUsersReducer,getUsersByCollageReducer,getUsersByIDReducer,updateUserReducer} from './reducers/userReducers'
import {projectReducer} from './reducers/projectReducers'
import {eventReducers} from './reducers/eventReducer'
import {chatReducer,getChatsReducer} from './reducers/chatReducers'
import {jobReducer} from './reducers/jobReducers'

const rootReducer=combineReducers({
    userRegisterReducer:userRegisterReducer,
    userLoginReducer:userLoginReducer,
    getAllUsersReducer:getAllUsersReducer,
    projectReducer:projectReducer,
    getUsersByCollageReducer:getUsersByCollageReducer,
    getUsersByIDReducer:getUsersByIDReducer,
    eventReducers:eventReducers,
    chatReducer:chatReducer,
    getChatsReducer:getChatsReducer,
    updateUserReducer:updateUserReducer,
    jobReducer:jobReducer,
})

const currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : null
const initialState = {
    userLoginReducer:{
        currentUser:currentUser
    }
};

const middleware = [thunk];

const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware)
);
export default store;