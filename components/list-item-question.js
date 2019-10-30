import { useState } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import axios from 'axios'
import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons'
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
      {level}
    </button>
  )
}

const ListItemQuestion = ({ item }) => {
  const {
    id,
    title,
    level,
    user,
    comments_count: commentsCount
  } = item
  const [loading, setLoading] = useState(false)
  const [likesCount, setLikesCount] = useState(item.likes_count)

  const handleClickLike = event => {
    setLoading(true)
    axios.get(`/api/like/question/${id}`)
      .then(response => {
        switch (response.status) {
          case 201:
            setLikesCount(likesCount + 1)
            break
          case 202:
            if (likesCount !== 0) setLikesCount(likesCount - 1)
            break
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }

  return (
    <div className="item">
      <div className="item-avatar">
        <Avatar id={user.id} rating={user.rating} />
      </div>

      <div className="item-title">
        <Link href="/questions/[id]" as={`/questions/${id}`}>
          <a className="item-title">{title}</a>
        </Link>
        <div className="buttons">
          <QuestionLevel level={level} />

          <Link href="/questions/[id]" as={`/questions/${id}#comments`}>
            <a className="button is-light is-small">
              <Icon name={faComment} />&nbsp; {commentsCount}
            </a>
          </Link>

          <a
            onClick={handleClickLike}
            className={`button is-light is-small ${loading ? 'is-loading' : ''}`}
          >
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
