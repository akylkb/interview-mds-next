import Link from 'next/link'

const QuestionsTab = ({ data }) => {
  const { items } = data.data

  if (items && items.length > 0) {
    return (
      <nav className="panel" style={{ padding: '0 15px' }}>
        {items.map(item =>
          <Link key={item.id} href={`/questions/${item.id}`}>
            <a className="panel-block">{item.title}</a>
          </Link>
        )}
      </nav>
    )
  }
  return (
    <div style={{ margin: '0 15px 15px' }} className="notification">Нет вопросов</div>
  )
}

export default QuestionsTab
