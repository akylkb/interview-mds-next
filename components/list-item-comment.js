import { useState, useContext } from 'react'
import axios from 'axios'
import { faHeart, faReply, faCheck, faTrash } from '@fortawesome/free-solid-svg-icons'
import Icon from './icon'
import Avatar from './avatar'
import { formatDate } from '../utils/helpers'
import { UserContext } from './user-context'
import WithCode from './with-code'

const ListItemComment = ({ item, onDelete, onMark }) => {
  const {
    user,
    content
  } = item
  const [authorizedUser] = useContext(UserContext)
  const [likes, setLikes] = useState(item.likes_count)

  const handleClickReply = event => {
    event.preventDefault()
    const replyTextarea = window.document.querySelector('#reply-form textarea')
    if (replyTextarea) {
      if (replyTextarea.value === '') {
        replyTextarea.value = `${user.name}, `
      }

      replyTextarea.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  const handleClickLike = event => {
    event.preventDefault()
    axios.get(`/api/like/comment/${item.id}`)
      .then(response => {
        switch (response.status) {
          case 201:
            setLikes(likes + 1)
            break
          case 202:
            setLikes(likes - 1)
        }
      })
      .catch(console.error)
  }

  const handleClickMark = event => {
    if (onMark) onMark(item)
  }

  const handleClickDelete = event => {
    const isConfirm = window.confirm('Удалить?')
    if (!isConfirm) return false
    if (onDelete) onDelete(item)
  }

  return (
    <article className={`media ${item.marked ? 'is-mark' : ''}`}>
      <div className="media-left">
        <Avatar id={user.id} image={user.avatar} rating={user.rating} />
      </div>
      <div className="media-content">
        <div className="content">
          <p>
            <strong>{user.name || 'Anonim'}</strong> <small>{formatDate(item.created_at)}</small>
            <div style={{ whiteSpace: 'pre-wrap', marginTop: 10 }}><WithCode>{content}</WithCode></div>
          </p>
        </div>
        <nav className="level is-mobile">
          <div className="level-left">
            <a
              onClick={handleClickReply}
              className="level-item"
              aria-label="reply"
            >
              <Icon name={faReply} />&nbsp;Ответить
            </a>
            <a
              onClick={handleClickLike}
              className="level-item"
              aria-label="like"
            >
              <Icon name={faHeart} />&nbsp;{likes}
            </a>
          </div>
          {authorizedUser && authorizedUser.group === 'admin' && (
            <div className="level-right">
              <a
                onClick={handleClickMark}
                className="level-item"
                aria-label="like"
              >
                <Icon name={faCheck} />&nbsp;Отметить
              </a>
              <a
                onClick={handleClickDelete}
                className="level-item has-text-danger"
                aria-label="like"
              >
                <Icon name={faTrash} />&nbsp;Удалить
              </a>
            </div>
          )}
        </nav>
      </div>
      <style global jsx>{`
        .media {
          position: relative;
          align-items: flex-start;
          display: flex;
          text-align: left;
          z-index: 0;
        }
        .media.is-mark::before {
          content: '';
          background: #fff3dd;
          position: absolute;
          left: -20px;
          right: -20px;
          top: 0;
          bottom: -17px;
          z-index: -1;
        }
      `}
      </style>
    </article>
  )
}

export default ListItemComment
