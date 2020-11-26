import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
    palette: {
        primary: {
            light: '#f2f2f2',
            main: '#363232',
            dark: '#000000',
            contrastText: '#fff',
        },
        secondary: {
            light: '#fff350',
            main: '#ff6922',
            dark: '#ff5722',
            contrastText: '#212121',
        },
    },
    typography: {
        "fontFamily": "\"Noto Sans JP\", sans-serif",
        "fontSize": 14,
        "fontWeightLight": 300,
        "fontWeightRegular": 400,
        "fontWeightMedium": 500
    }
});
