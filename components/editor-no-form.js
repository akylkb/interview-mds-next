import { useState } from 'react'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import Icon from './icon'
import WithCode from './with-code'

const Editor = ({ textareaName }) => {
  const [text, setText] = useState('')
  const [isPreview, hasPreview] = useState(false)

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
      <div className="field">
        <div className="buttons">
          <a
            onClick={() => onClickBBCode(String.raw`[latex] x^2 [/latex]`)}
            className="button is-small"
          >LaTeX</a>
          <a
            onClick={() => onClickBBCode('[code][/code]')}
            className="button is-small"
          >Code</a>
        </div>
      </div>

      <div className="field">
        <div className="control">
          <textarea
            name={textareaName}
            className="textarea"
            value={text}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="buttons">
        <button className="button" onClick={handleClickPreview}>
          {isPreview ? <Icon name={faEyeSlash} /> : <Icon name={faEye} />}&nbsp;Предпросмотр
        </button>
      </div>

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

export default Editor
