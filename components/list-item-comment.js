import { useState } from 'react'
import axios from 'axios'
import { faHeart, faReply } from '@fortawesome/free-solid-svg-icons'
import Icon from './icon'
import Avatar from './avatar'
import { formatDate } from '../utils/helpers'

const ListItemComment = ({ item }) => {
  const {
    user,
    content
  } = item
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

  return (
    <article className="media">
      <div className="media-left">
        <Avatar id={user.id} image={user.avatar} />
      </div>
      <div className="media-content">
        <div className="content">
          <p>
            <strong>{user.name || 'Anonim'}</strong> <small>{formatDate(item.created_at)}</small>
            <br />
            {content}
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
        </nav>

      </div>
    </article>
  )
}

export default ListItemComment
