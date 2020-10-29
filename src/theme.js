import { red } from '@material-ui/core/colors';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

const COLOR_BLUE = '#4C7DA3';
const COLOR_ORANGE = '#F1A868';
const COLOR_GREEN = '#DDEBB8';
const COLOR_DEFAULT = '#DD00DD';
// const defaultTheme = createMuiTheme();

// A custom theme for this app
let theme = createMuiTheme({
  palette: {
    default: {
      main: COLOR_DEFAULT
    },
    primary: {
      main: COLOR_BLUE,
    },
    secondary: {
      main: COLOR_ORANGE,
    },
    error: {
      main: red.A400,
    },
    background: {
      default: COLOR_GREEN,
    },
  },
  overrides: {
    MuiTypography: {
      root: {
        // fontFamily: 'Roboto Condensed',
        fontWeight: 400,
      },
      body1: {
        // fontFamily: "Roboto Condensed",
        fontWeight: 700,
      },
      body2: {
        // fontFamily: "Roboto Condensed",
        fontWeight: 700,
      },
      caption: {
        // fontFamily: "Roboto Condensed",
        fontWeight: 700,
      },
      button: {
        // fontFamily: "Roboto Condensed",
        fontWeight: 700,
      },
      h1: {
        // fontFamily: "Roboto Condensed",
        fontWeight: 700,
      },
      h2: {
        // fontFamily: "Roboto Condensed",
        fontWeight: 400,
      },
      h3: {
        // fontFamily: "Roboto Condensed",
        fontWeight: 400,
      },
      h4: {
        // fontFamily: "Roboto Condensed",
        fontWeight: 700,
      },
      h5: {
        // fontFamily: "Roboto Condensed",
        fontWeight: 700,
      },
      h6: {
        // fontFamily: "Roboto Condensed",
        fontWeight: 400,
      },
      subtitle1: {
        // fontFamily: "Roboto Condensed",
        fontWeight: 700,
      },
      subtitle2: {
        // fontFamily: "Roboto Condensed",
        fontWeight: 700,
      },
    },
    MuiInput: {
      // [defaultTheme.breakpoints.up('sm')]: {
      //   input: {
      //       // color: '#f0f',
      //       textAlign:'center',
      //       fontSize:'2em',
      //       lineHeight:'2em',
      //       height: '2em'
      // },
    },

    //  MuiInputBase: {
    //    root: {
    //      // fontFamily: "Roboto Condensed",
    //      // fontStyle: "italic",
    //      color: COLOR_BLUE,
    //    },
    //    [defaultTheme.breakpoints.up('sm')]: {
    //      input: {
    //          // color: '#f0f',
    //          textAlign:'center',
    //          fontSize:'2em',
    //          lineHeight:'2em',
    //          height: '2em'
    //    },
    //  },
    MuiButton: {
      label: {
        // fontFamily: "Roboto Condensed",
        // fontStyle: "italic",
        textTransform: 'initial',
      },
    },
    MuiButtonBase: {
      root: {
        // fontFamily: "Roboto Condensed",
        // fontStyle: "italic",
        textTransform: 'initial',
      },
    },
    MuiListItemText: {
      root: {
        color: COLOR_BLUE,
        // fontStyle: "italic",
      },
    },
    MuiTextField: {},
  },
  //   MuiBottomNavigationAction: {
  //     root: {
  //       backgroundColor: "red",
  //     },
  //     selected: {
  //       backgroundColor: "green",
  //     },
  //   },
});
theme = responsiveFontSizes(theme)
export default theme;
