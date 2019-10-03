/** REDUX */
import { createStore } from 'redux';

/** REDUCERS */
import { rootReducer } from './reducers';

export const Store = createStore(rootReducer);
