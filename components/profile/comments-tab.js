import Link from 'next/link'

const CommentTab = ({ data }) => {
  const items = data.data
  console.log(items)
  if (items && items.length > 0) {
    return (
      <nav className="panel" style={{ padding: '0 15px' }}>
        {items.map(item =>
          <Link key={item.id} href={`/questions/${item.question.id}`}>
            <a className="panel-block" style={{ display: 'block' }}>
              <strong>Комментарий:</strong><br />
              <em>{item.content}</em><br />
              <strong>к вопросу:&nbsp;</strong> {item.question.title}
            </a>
          </Link>
        )}
      </nav>
    )
  }
  return (
    <div style={{ margin: '0 15px 15px' }} className="notification">Нет комментариев</div>
  )
}

export default CommentTab
