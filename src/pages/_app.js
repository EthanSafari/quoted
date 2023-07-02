import Layout from '@/src/components/Layout'
import { ThemeProvider } from '@emotion/react'
import theme from '../styles/theme/theme'
import { CssBaseline } from '@mui/material'
import { Provider } from 'react-redux';
import configureStore from '../store';

const store = configureStore();

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </Provider>
  )
};
