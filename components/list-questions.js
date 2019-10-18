import PropTypes from 'prop-types'
import ListItemQuestion from './list-item-question'
import Pagination from './pagination'

const ListQuestions = ({ items, pagination }) => {
  const { page, pageCount } = pagination

  return (
    <div>
      {items.map(item => <ListItemQuestion key={item.id} item={item} />)}
      <Pagination total={pageCount} current={page} onSelect={page => console.log('page selected', page)} />
    </div>
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
