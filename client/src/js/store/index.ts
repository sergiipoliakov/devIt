import thunk from 'redux-thunk';
import * as Redux from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { createStore, applyMiddleware, compose } from 'redux';
import reducers from '../reducers/root.rd';

const enhancer = compose(
    composeWithDevTools(applyMiddleware(thunk))
);

export default function configureStore(initialState = {}): Redux.Store {
    const store = createStore(reducers, initialState, enhancer);
    return store;
}
