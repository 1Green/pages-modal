import { createMuiTheme } from '@material-ui/core/styles';

const muiTheme = createMuiTheme({})

const appTheme = {
  colors: {
    primary: 'red',
    secondary: 'blue',
    clear: 'white'
  }
}

export type Theme = typeof appTheme

export const theme = {
  ...muiTheme,
  ...appTheme,
}
