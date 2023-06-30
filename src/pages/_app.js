import Layout from '@/src/components/Layout'
import { ThemeProvider } from '@emotion/react'
import theme from '../styles/theme/theme'
import { CssBaseline } from '@mui/material'

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
};
