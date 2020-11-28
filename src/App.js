import React, {useEffect} from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';

/* Styles */
import './App.css';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import MyTheme from './MyTheme';

/* Components */
import ChildConfigPage from "./pages/child-config/child-config.component";

export default function App() {
    return (
        <MuiThemeProvider theme={MyTheme}>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={ChildConfigPage}/>
                    <Route exact path='/child/:childId' component={ChildConfigPage}/>
                </Switch>
            </BrowserRouter>
        </MuiThemeProvider>
    );
}