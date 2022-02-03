import { createMuiTheme } from "@material-ui/core";

export const asterisksStyle = createMuiTheme({
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
  })