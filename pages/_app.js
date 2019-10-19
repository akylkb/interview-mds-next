import App from 'next/app'
import NProgress from 'nprogress'
import Router from 'next/router'
import Head from 'next/head'
import { UserProvider } from '../components/user-context'

Router.events.on('routeChangeStart', url => {
  console.log(`Loading: ${url}`)
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

export default class MyApp extends App {
  static async getInitialProps (appContext) {
    // calls page's `getInitialProps` and fills `appProps.pageProps`
    const appProps = await App.getInitialProps(appContext)
    return { ...appProps }
  }

  render () {
    const { Component, pageProps } = this.props
    return (
      <>
        <Head>
          <link rel="stylesheet" type="text/css" href="/static/bulma.css" />
          <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
          <link rel="stylesheet" type="text/css" href="/static/font-awesome.css" />
          <link id="favicon" rel="icon" type="image/x-icon" href="/static/favicon.ico" />
          <title>Interview MDS</title>
          <script src="/static/yandex.js" />
        </Head>
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </>
    )
  }
}
