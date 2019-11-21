/** REDUX */
import { combineReducers, createStore} from 'redux';

/** REDUCERS */
import { reducer as argument} from './argument/argument.reducer';
import { reducer as command } from './command/command.reducer';
import { reducer as settings } from './settings/settings.reducer';

/** Root Reducer */
const rootReducer = combineReducers({
    argument,
    command,
    settings,
});

/** Combined Reducer State */
export type AppState = ReturnType<typeof rootReducer>;

/** Redux Store */
export const AppStore = createStore(rootReducer);
