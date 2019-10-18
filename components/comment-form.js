import PropTypes from 'prop-types'
import { useState } from 'react'
import axios from 'axios'
import { serializeForm } from '../utils/helpers'
import Notify from './notify'

const CommentForm = ({ url, onSuccess = f => f }) => {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    setLoading(!loading)

    const data = serializeForm(event.target)
    axios.post(url, data)
      .then(response => {
        setText('')
        setMessage('Комментарий добавлен')
        onSuccess()
      })
      .catch(err => {
        try {
          const { message } = err.response.data
          setMessage(message)
        } catch {
          setMessage(err.message)
          console.error(err)
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleChange = ({ target }) => {
    setText(target.value)
  }

  return (
    <div style={{ marginBottom: 30 }}>
      <h4 className="title is-4">Ваш ответ на вопрос</h4>
      <form id="reply-form" onSubmit={handleSubmit}>
        <div className="field">
          <div className="control">
            <textarea
              name="content"
              className="textarea"
              value={text}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {message && <Notify message={message} onClose={() => setMessage('')} />}

        <div className="buttons">
          <button className={`button is-primary ${loading ? ' is-loading' : ''}`}>Опубликовать</button>
          {/* <button className="button">Предпросмотр</button> */}
        </div>
      </form>

      {/* <div className="preview"></div> */}
    </div>
  )
}

CommentForm.propTypes = {
  url: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(PropTypes.object)
}

export default CommentForm
