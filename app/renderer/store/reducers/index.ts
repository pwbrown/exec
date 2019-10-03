/** REDUX */
import { combineReducers } from 'redux';

/** REDUCERS */
import { AppReducer as app } from './app.reducer';
import { ArgumentEditorReducer as argumentEditor } from './argumentEditor.reducer';
import { CommandEditorReducer as commandEditor } from './commandEditor.reducer';
import { UpdateReducer as update } from './update.reducer';

/** Root Reducer */
export const rootReducer = combineReducers({
    app,
    argumentEditor,
    commandEditor,
    update,
});

/** Entire Application State */
export type State = ReturnType<typeof rootReducer>;
