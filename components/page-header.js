import Link from 'next/link'

const PageHeader = ({ children, title = 'Title', subtitle = null }) => {
  return (
    <section className="PageHeader">
      <h1 className="title is-2">{title}</h1>
      {subtitle && <h3 className="title is-4">{subtitle}</h3>}
      {children}
      <style jsx>{`
        .PageHeader {
          border-bottom: 2px solid #9859ff;
        }
      `}
      </style>
    </section>
  )
}

export default PageHeader
