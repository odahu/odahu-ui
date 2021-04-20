import {createMuiTheme} from "@material-ui/core/styles";

export function configureTheme() {
    return createMuiTheme({
        palette: {
            primary: {
                main: 'rgb(34, 34, 34)',
                contrastText: 'white',
            },
            secondary: {
                main: 'rgb(53, 175, 213)',
                light: 'rgb(87, 114, 137)'
            },
        },
        overrides: {
            MuiFormLabel: {
                asterisk: {
                    color: '#db3131',
                    '&$error': {
                        color: '#db3131'
                    },
                }
            }
        }
    });
}
