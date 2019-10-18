import Header from './header'
import Footer from './footer'

const Layout = ({ children }) => {
  return (
    <div className="Layout">
      <Header />
      {children}
      <Footer />
      <style jsx>{`
      .Layout {
        max-width: 900px;
        margin: 0 auto;
        border: 1px solid #e8e8e8;
        border-top: 0;
        border-bottom: 0;
        min-height: 100vh;
        box-shadow: 0 0 15px 0 rgba(0,0,0,.1);
        overflow: hidden;
      }
      `}
      </style>
    </div>
  )
}

export default Layout
