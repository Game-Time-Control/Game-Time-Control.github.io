import React from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';

/* Styles */
import './App.css';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import MyTheme from './MyTheme';

/* Components */
import ChildConfigPage from "./pages/child-config/child-config.component";
import Home from "./pages/home/home.component";
import SignInPage from "./pages/sign-in/sign-in.component";
import RegisterPage from "./pages/register/register.component"

import PrivateRoute from "./PrivateRoute";

export default function App() {
    return (
        <MuiThemeProvider theme={MyTheme}>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={SignInPage}/>
                    <Route exact path='/login' component={SignInPage}/>
                    <Route exact path='/register' component={RegisterPage}/>
                    <PrivateRoute exact path='/home' component={Home}/>
                    <PrivateRoute exact path='/child/:childId' component={ChildConfigPage}/>
                </Switch>
            </BrowserRouter>
        </MuiThemeProvider>
    );
}