/** REDUX */
import { combineReducers, createStore} from 'redux';

/** REDUCERS */
import { reducer as command } from './_command.reducer';
import { reducer as theme } from './_theme.reducer';
import { reducer as update } from './_update.reducer';

/** Root Reducer */
const rootReducer = combineReducers({
    command,
    theme,
    update,
});

/** Combined Reducer State */
export type State = ReturnType<typeof rootReducer>;

/** Redux Store */
export const Store = createStore(rootReducer);
