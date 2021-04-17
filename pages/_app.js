import "../styles/globals.css";
import { MuiThemeProvider } from "@material-ui/core/styles";
import {theme} from'../theme'
function MyApp({ Component, pageProps }) {
  return (
    <MuiThemeProvider theme={theme}>
      <Component {...pageProps} />
    </MuiThemeProvider>
  );
}

export default MyApp;
