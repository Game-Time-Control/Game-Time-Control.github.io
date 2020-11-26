import React from 'react';
import {Link} from 'react-router-dom';

/* Material UI */
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import Button from "@material-ui/core/Button";
import Avatar from '@material-ui/core/Avatar';

/* Styles */
import {useStyles} from "./header.styles"

/* Icons */
import {ReactComponent as More} from '../../assets/plus.svg';
import {ReactComponent as LogOut} from '../../assets/log-out.svg';
import {ReactComponent as Settings} from '../../assets/settings.svg';

export default function Header() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Button
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <img alt='logo' style={{width: 270, height: 55}} src={require('../../assets/timeControlInLine.png')}/>
                    </Button>
                    <Typography className={classes.title} variant="h6" noWrap>

                    </Typography>
                    <IconButton component={Link} to='/settings'>
                        <Settings className={classes.icons}/>
                    </IconButton>
                    <IconButton component={Link} to='/logout'>
                        <LogOut className={classes.icons}/>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <div className={classes.subAppbar}>
                <div className={classes.mainTitle}>
                    Família
                </div>
                <div>
                    <IconButton className={classes.avatar} component={Link} to='/child1'>
                        <Avatar className={classes.orange}>N</Avatar>
                    </IconButton>
                    <IconButton className={classes.avatar} component={Link} to='/child2'>
                        <Avatar className={classes.silver}>N</Avatar>
                    </IconButton>
                    <IconButton className={classes.avatar} component={Link} to='/child/add'>
                        <More className={classes.moreIcon}/>
                    </IconButton>
                </div>
                </div>

        </div>
    );
}
