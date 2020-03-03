import {createStore,compose,applyMiddleware} from 'redux';
import reducers from '../reducer'
import thunk from 'redux-thunk'

const middleWare = [thunk];
const composeEnh = compose ;
const store = createStore(
    reducers,
    composeEnh(applyMiddleware(...middleWare)) 
)
export default store;