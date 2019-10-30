import PropTypes from 'prop-types'
import { useState } from 'react'
import axios from 'axios'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { serializeForm } from '../utils/helpers'
import Icon from './icon'
import Notify from './notify'
import WithCode from './with-code'

const Editor = ({ submitURL, onSuccess }) => {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isPreview, hasPreview] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setLoading(!loading)

    const data = serializeForm(event.target)
    axios.post(submitURL, data)
      .then(response => {
        setText('')
        hasPreview(false)
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

  const handleClickPreview = event => {
    event.preventDefault()
    hasPreview(!isPreview)
  }

  const onClickBBCode = (bbCode) => {
    setText(`${text}${bbCode}`)
  }

  return (
    <div className="Editor">
      <form id="reply-form" onSubmit={handleSubmit}>
        <div className="field">
          <div class="buttons">
            <a
              onClick={() => onClickBBCode(String.raw`[latex] \int_0^\infty x^2 dx [/latex]`)}
              class="button is-small"
            >LaTeX</a>
            <a
              onClick={() => onClickBBCode('[code][/code]')}
              class="button is-small"
            >Code</a>
          </div>
        </div>

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
          <button className="button" onClick={handleClickPreview}>
            {isPreview ? <Icon name={faEyeSlash} /> : <Icon name={faEye} />}&nbsp;Предпросмотр
          </button>
        </div>
      </form>

      {isPreview && (
        <>
          <div className="preview">
            {text ? <WithCode>{text}</WithCode> : 'Где текст?'}
          </div>

          <style jsx>{`
          .preview {
            margin-top: 2rem;
            padding: 1rem;
            position: relative;
            border: 2px solid #e8e8e8;
            border-radius: 4px;
            white-space: pre-wrap;
          }
          .preview::before {
            background: #ffdd57;
            border-radius: 2px 2px 0 0;
            bottom: 100%;
            color: rgba(0,0,0,.7);
            content: "Предпросмотр";
            display: inline-block;
            font-size: 7px;
            font-weight: 700;
            left: -1px;
            letter-spacing: 1px;
            margin-left: -1px;
            padding: 3px 5px;
            position: absolute;
            text-transform: uppercase;
            vertical-align: top;
          }
        `}</style>
        </>
      )}
    </div>
  )
}

Editor.propTypes = {
  submitURL: PropTypes.string.isRequired
}

export default Editor
