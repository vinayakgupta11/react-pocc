import React from 'react';
import ReactDOM from 'react-dom';
import {createStore,combineReducers,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
// import reducer from './store/reducer';
import Counterreducer from './store/reducer/counter';
import Resultsreducer from './store/reducer/results';
const rootReducer= combineReducers({
    ctr:Counterreducer,
    res: Resultsreducer
})
const logger= stor=>{
    return nex =>{
        return actio=>{
            console.log('middleware, dispatching',actio);
            const res=nex(actio);//so that nex should work
            console.log('middleware, next state',stor.getState());
            return res;
        }
    }
}
const composeEnhancers= window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store= createStore(rootReducer, composeEnhancers(applyMiddleware(logger,thunk)));
console.log(store.getState());
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
