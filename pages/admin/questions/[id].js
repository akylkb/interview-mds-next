import { useState } from 'react'
import classNames from 'classnames'
import axios from 'axios'
import Link from 'next/link'
import Layout from '../../../components/layout'
import PageHeader from '../../../components/page-header'
import Box from '../../../components/box'
import Notify from '../../../components/notify'
import { serializeForm } from '../../../utils/helpers'

const QuestionEdit = ({ question, error }) => {
  if (error) {
    return <div className="notification">{error}</div>
  }
  const { id } = question
  const [loading, setLoading] = useState(false)
  const [active, setActive] = useState(question.active)
  const [message, setMessage] = useState(null)

  const handleClickActive = () => {
    setLoading(true)
    axios.put(`/api/admin/questions/${id}`, { active: !active })
      .then(() => setActive(!active))
      .catch(err => {
        window.alert('Не удалось активировать')
        console.error(err)
      })
      .finally(() => setLoading(false))
  }

  const handleSubmit = event => {
    event.preventDefault()
    const form = event.target
    const data = serializeForm(form)

    setLoading(true)
    axios.put(`/api/admin/questions/${id}`, data)
      .then(() => setMessage('Данные обновлены'))
      .catch(err => {
        setMessage(err.message)
        console.error(err)
      })
      .finally(() => setLoading(false))
  }

  return (
    <Layout>
      <PageHeader title="Редактирование" />
      <Box>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Статус</label>
            <div className="control">
              <a
                onClick={handleClickActive}
                className={classNames('button', {
                  'is-success': active,
                  'is-loading': loading
                })}
              >
                {active ? 'Активен' : 'Не активен'}
              </a>
            </div>
          </div>

          <div className="field">
            <label className="label">Автор</label>
            <div className="control">
              <Link href={`/users/${question.user.id}`}>
                <a>{question.user.name}</a>
              </Link>
            </div>
          </div>

          <div className="field">
            <label className="label">Заголовок</label>
            <div className="control">
              <input
                name="title"
                defaultValue={question.title}
                className="input"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Описание</label>
            <div className="control">
              <textarea
                name="description"
                defaultValue={question.description}
                className="textarea"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Ответ</label>
            <div className="control">
              <textarea
                name="answer"
                defaultValue={question.answer}
                className="textarea"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Уровень</label>
            <div className="control">
              <div className="select">
                <select
                  name="level"
                  defaultValue={question.level}
                >
                  <option>junior</option>
                  <option>middle</option>
                  <option>senior</option>
                </select>
              </div>
            </div>
          </div>

          {message && <Notify message={message} onClose={() => setMessage('')} />}

          <div className="buttons">
            <button className={classNames('button is-primary', { 'is-loading': loading })}>Обновить</button>
          </div>
        </form>
      </Box>
    </Layout>
  )
}

QuestionEdit.getInitialProps = async ({ query, req }) => {
  try {
    const { id } = query
    const { headers } = req
    const response = await axios.get(`${process.env.APP_URL}/api/admin/questions/${id}`, {
      headers
    })
    const { data } = response.data
    return {
      question: data,
      query
    }
  } catch (err) {
    console.error(err)
    return {
      query,
      error: err.message
    }
  }
}

export default QuestionEdit
