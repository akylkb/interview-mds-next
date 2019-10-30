import PropTypes from 'prop-types'
import ListItemQuestion from './list-item-question'
import Pagination from './pagination'

const ListQuestions = ({ items, pagination, query }) => {
  const { page, pageCount } = pagination

  if (items.length === 0) {
    return <div className="notification">Пока вопросов нет</div>
  }

  return (
    <>
      {/* <div className="buttons">
        <Link
          href={SearchParams.fromObjectToString({ ...query, sort: 'new' })}
        >
          <a className={`button is-small ${query.sort === 'new' ? 'is-primary' : ''}`}>Новые</a>
        </Link>
        <Link
          href={SearchParams.fromObjectToString({ ...query, sort: 'likes' })}
        >
          <a className={`button is-small ${query.sort === 'likes' ? 'is-primary' : ''}`}>Популярные</a>
        </Link>
        <Link
          href={SearchParams.fromObjectToString({ ...query, sort: 'comments' })}
        >
          <a className={`button is-small ${query.sort === 'comments' ? 'is-primary' : ''}`}>Обсуждаемые</a>
        </Link>
        <style jsx>{`
          .buttons {
            margin: 0;
          }
        `}
        </style>
      </div> */}
      {items.map(item =>
        <ListItemQuestion
          key={item.id}
          item={item}
        />)}
      <Pagination total={pageCount} current={page} />
    </>
  )
}

ListQuestions.propTypes = {
  items: PropTypes.array.isRequired,
  pagination: PropTypes.shape({
    page: PropTypes.number.isRequired,
    pageCount: PropTypes.number.isRequired
  }).isRequired
}

export default ListQuestions
