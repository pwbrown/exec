/** REDUX */
import { combineReducers, createStore} from 'redux';

/** REDUCERS */
import { reducer as argument} from './_argument.reducer';
import { reducer as command } from './_command.reducer';
import { reducer as settings } from './_settings.reducer';

/** Root Reducer */
const rootReducer = combineReducers({
    argument,
    command,
    settings,
});

/** Combined Reducer State */
export type State = ReturnType<typeof rootReducer>;

/** Redux Store */
export const Store = createStore(rootReducer);
