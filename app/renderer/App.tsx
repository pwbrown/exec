/** REACT */
import React, { FC } from "react";
import { render } from "react-dom";

/** REDUX */
import { Provider as ReduxProvider } from "react-redux";
import { createStore } from "redux";

/** MATERIAL */
import CssBaseline from "@material-ui/core/CssBaseline";
import createMuiTheme, { Theme } from "@material-ui/core/styles/createMuiTheme";
import makeStyles from "@material-ui/styles/makeStyles";
import ThemeProvider from "@material-ui/styles/ThemeProvider";

/** REDUCERS */
import { reducer } from "./app.reducer";

/** COMPONENTS */
import CommandEditor from "./CommandEditor";
import CommandList from "./CommandList";
import Controls from "./Controls";
import Help from "./Help";
import Update from "./Update";

/** BACKGROUND */
import RunBackgroundListeners from "./background";

/** Build and expose Redux Store */
export const Store = createStore(reducer);

/** Start listening to background events from main */
RunBackgroundListeners(Store);

/** APPLICATION THEME */
const darkTheme: Theme = createMuiTheme({ palette: { type: "dark" }});

/** Exec Application Entry Component */
const App: FC = () => {
    const classes = AppStyles();
    return (
        <ThemeProvider theme={darkTheme}>
            <ReduxProvider store={Store}>
                <CssBaseline/>
                <CommandEditor/>
                <Help/>
                <Update/>
                <div className={classes.container}>
                    <Controls/>
                    <CommandList/>
                </div>
            </ReduxProvider>
        </ThemeProvider>
    );
};

const AppStyles = makeStyles({
    container: {
        margin: 10,
    },
});

render(<App/>, document.getElementById("exec"));
