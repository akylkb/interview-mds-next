import PropTypes from 'prop-types'
import Link from 'next/link'
import { faComment, faHeart, faTachometerAlt } from '@fortawesome/free-solid-svg-icons'
import Avatar from './avatar'
import Icon from './icon'

const QuestionLevel = ({ level }) => {
  const colorClass = {
    junior: 'is-success',
    middle: 'is-warning',
    senior: 'is-link'
  }
  const color = colorClass[level]
  return (
    <button className={`button is-light is-small ${color}`}>
      <Icon name={faTachometerAlt} />&nbsp; {level}
    </button>
  )
}

const ListItemQuestion = ({ item }) => {
  const {
    id,
    title,
    level,
    likes_count: likesCount,
    comments_count: commentsCount,
    user
  } = item

  return (
    <div className="item">
      <div className="item-avatar">
        <Avatar id={user.id} stars />
      </div>

      <div className="item-title">
        <Link href="/questions/[id]" as={`/questions/${id}`}>
          <a className="item-title">{title}</a>
        </Link>
        <div className="buttons">
          <QuestionLevel level={level} />
          <a className="button is-light is-small">
            <Icon name={faComment} />&nbsp; {commentsCount}
          </a>
          <a className="button is-light is-small">
            <Icon name={faHeart} />&nbsp; {likesCount}
          </a>
        </div>
      </div>

      <style jsx>{`
        .item {
          display: flex;
          padding: 1.5rem 0;
          border-bottom: 1px solid #efefef;
        }
        .item-avatar {
          width: 50px;
        }
        .item-title {
          width: 100%;
        }
        .item-title > a {
          color: #363636;
          font-size: 22px;
          line-height: 0;
        }
        .buttons {
          margin-top: 10px;
        }
      `}
      </style>
    </div>
  )
}

ListItemQuestion.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    level: PropTypes.string.isRequired,
    likes_count: PropTypes.number.isRequired,
    comments_count: PropTypes.number.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number.isRequired
    }).isRequired
  })
}

export default ListItemQuestion
