import React from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';

/* Styles */
import './App.css';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import MyTheme from './MyTheme';

/* Components */
import ChildConfigPage from "./pages/child-config/child-config.component";

function App() {
    return (
        <MuiThemeProvider theme={MyTheme}>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={ChildConfigPage}/>
                </Switch>
            </BrowserRouter>
        </MuiThemeProvider>
    );
}

export default App;
