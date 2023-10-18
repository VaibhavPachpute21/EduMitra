import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import counterReducer from './reducers/cartReducers'

const rootReducer=combineReducers({
    counterReducer:counterReducer,

})

const initialState = {
};

const middleware = [thunk];

const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware)
);
export default store;