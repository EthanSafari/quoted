import { ThemeProvider } from '@emotion/react'
import theme from '../styles/theme/theme'
import { CssBaseline } from '@mui/material'
import { PageNumberProvider } from '../context/PageContext'
import { Provider } from 'react-redux'
import configureStore from '../store'

const store = configureStore();

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PageNumberProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </PageNumberProvider>
    </Provider>
  )
};
