/** REACT */
import React, { FC } from "react";
import { render } from "react-dom";

/** REDUX */
import { Provider as ReduxProvider } from "react-redux";
import { createStore } from "redux";

/** MATERIAL */
import CssBaseline from "@material-ui/core/CssBaseline";
import createMuiTheme, { Theme } from "@material-ui/core/styles/createMuiTheme";
import ThemeProvider from "@material-ui/styles/ThemeProvider";

/** REDUCERS */
import { reducer } from "./app.reducer";

/** COMPONENTS */
import CommandEditor from "./CommandEditor";
import Menu from "./Menu";

/** Build and expose Redux Store */
export const Store = createStore(reducer);

/** APPLICATION THEME */
const darkTheme: Theme = createMuiTheme({ palette: { type: "light" }});

/** Exec Application Entry Component */
const App: FC = () => (
    <ThemeProvider theme={darkTheme}>
        <ReduxProvider store={Store}>
            <CssBaseline/>
            <Menu/>
            <CommandEditor/>
        </ReduxProvider>
    </ThemeProvider>
);

render(<App/>, document.getElementById("exec"));
