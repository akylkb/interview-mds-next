import Link from 'next/link'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import Icon from './icon'

const Item = ({ number = 0, isCurrent = false, onClick }) => {
  if (number === 0) {
    return (
      <li>
        <span className="pagination-ellipsis">&hellip;</span>
      </li>
    )
  }
  return (
    <li>
      <Link href={`?page=${number}`}>
        <a className={`pagination-link ${isCurrent ? 'is-current' : ''}`}>{number}</a>
      </Link>
    </li>
  )
}

const Pagination = ({ current, total, onSelect }) => {
  const pages = []
  for (let i = 1; i <= total; i++) {
    pages.push(i)
  }

  return (
    <div className="Pagination">
      <nav className="pagination" role="navigation" aria-label="pagination">
        <a
          className="pagination-previous"
          onClick={() => {
            if (current !== 1) {
              onSelect(current - 1)
            }
          }}
        >
          <Icon name={faArrowLeft} />
        </a>
        <a
          className="pagination-next"
          onClick={() => {
            if (current !== total) {
              onSelect(current + 1)
            }
          }}
        >
          <Icon name={faArrowRight} />
        </a>
        <ul className="pagination-list">
          {pages.map(page => (
            <Item
              key={page}
              number={page}
              isCurrent={page === current}
              onClick={() => {
                if (page !== current) {
                  onSelect(page)
                }
              }}
            />
          ))}
        </ul>
      </nav>

      <style jsx>{`
        .Pagination {
          margin-top: 20px;
        }
      `}
      </style>
    </div>
  )
}
export default Pagination
