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
    let user = null
    try {
      user = appContext.ctx.req.user.toJSON()
    } catch {
      user = null
    }
    // calls page's `getInitialProps` and fills `appProps.pageProps`
    const appProps = await App.getInitialProps(appContext)
    return { user, ...appProps }
  }

  render () {
    const { Component, pageProps, user } = this.props
    return (
      <>
        <Head>
          <link rel="stylesheet" type="text/css" href="/static/bulma.css" />
          <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
          <link rel="stylesheet" type="text/css" href="/static/font-awesome.css" />
        </Head>
        <UserProvider user={user}>
          <Component {...pageProps} />
        </UserProvider>
      </>
    )
  }
}
