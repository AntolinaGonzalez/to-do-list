import "../styles/globals.css";
import { MuiThemeProvider } from "@material-ui/core/styles";
import {theme} from'../theme'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <>
     <Head>
        <title>ToDo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <MuiThemeProvider theme={theme}>
      <Component {...pageProps} />
    </MuiThemeProvider>
    </>
  );
}

export default MyApp;
