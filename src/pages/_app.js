import { ThemeProvider } from '@emotion/react'
import theme from '../styles/theme/theme'
import { CssBaseline } from '@mui/material'
import { PageNumberProvider } from '../context/PageContext'

export default function App({ Component, pageProps }) {
  return (
    <PageNumberProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <Component {...pageProps} />
      </ThemeProvider>
    </PageNumberProvider>
  )
};
