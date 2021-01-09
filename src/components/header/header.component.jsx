import React, {useContext} from 'react';
import {Link} from 'react-router-dom';

/* Material UI */
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";

/* Styles */
import {useStyles} from "./header.styles"

/* Icons */
import {ReactComponent as LogOut} from '../../assets/log-out.svg';
import {ReactComponent as Settings} from '../../assets/settings.svg';

/* Context */
import {authContext} from "../../contexts/AuthContext";

export default function Header() {
    const classes = useStyles();
    const {setAuthData} = useContext(authContext);

    const onLogOut = () => {
        setAuthData(null);
    }; //clearing the context

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    {/*<IconButton*/}
                    {/*    edge="start"*/}
                    {/*    className={classes.menuButton}*/}
                    {/*    color="inherit"*/}
                    {/*    aria-label="open drawer"*/}
                    {/*>*/}
                    {/*    <MenuIcon/>*/}
                    {/*</IconButton>*/}
                    <Button
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                        component={Link}
                        to='/home'
                    >
                        <img alt='logo' style={{width: 270, height: 55}}
                             src={require('../../assets/timeControlInLine.png')}/>
                    </Button>
                    <Typography className={classes.title} variant="h6" noWrap>

                    </Typography>
                    <IconButton component={Link} to='/settings'>
                        <Settings className={classes.icons}/>
                    </IconButton>
                    <IconButton component={Button} onClick={onLogOut}>
                        <LogOut className={classes.icons}/>
                    </IconButton>
                </Toolbar>
            </AppBar>

        </div>
    );
}
