import { fade, makeStyles } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors';

export const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    mainTitle: {
        color: '#fff',
        padding: 10,
        fontWeight: 'lighter',
        fontSize: 24,
        display: 'flex',
    },
    subAppbar: {
        backgroundColor: '#545050', //363232 //e0e0e0
        height: '140px',
        display: 'flex',
        justifyContent: 'flex-start',
        paddingLeft: '5vw',
        flexDirection: 'column',
        paddingTop: 10,
    },
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
        width: 60,
        height: 60
    },
    silver: {
        width: 60,
        height: 60
    },
    avatar: {
        width: 50,
        height: 50,
    },
    moreIcon: {
        width: 55,
        height: 55,
        fill: '#e0e0e0'
    },
    icons: {
        width: 30,
        height: 30,
        fill: '#e0e0e0'
    },
}));