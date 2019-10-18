import { useState } from 'react'
import axios from 'axios'
import { serializeForm } from '../utils/helpers'
import Layout from '../components/layout'
import PageHeader from '../components/page-header'
import Box from '../components/box'
import Notify from '../components/notify'

const AddQuestion = () => {
  const [isLoading, hasLoading] = useState(false)
  const [message, setMessage] = useState()

  const handleSubmit = event => {
    event.preventDefault()
    const form = event.target
    hasLoading(true)
    setMessage('')

    const data = serializeForm(form)
    axios.post('/api/questions', data)
      .then(response => {
        const { success } = response.data
        if (success) {
          setMessage('Объявление добавлено. На сайте появится после модерации')
          form.reset()
          return
        }
        setMessage('Что-то пощло не так. Попробуйте еще раз')
      })
      .catch(err => {
        const { message } = err.response.data
        setMessage(message)
      })
      .finally(() => {
        hasLoading(false)
      })
  }

  return (
    <Layout>
      <PageHeader title="Добавить вопрос" />
      <Box>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Вопрос</label>
            <div className="control">
              <input
                name="title"
                type="text"
                className="input"
                placeholder="Что такое метаданные?"
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Уровень</label>
            <div className="control">
              <div className="select">
                <select
                  name="level"
                  defaultValue="junior"
                  required
                >
                  <option value="junior">Junior</option>
                  <option value="middle">Middle</option>
                  <option value="senior">Senior</option>
                </select>
              </div>
            </div>
          </div>

          <div className="field">
            <label className="label">Описание для пользователей (необязательно)</label>
            <div className="control">
              <textarea
                name="description"
                className="textarea"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Ответ (необязательно)</label>
            <div className="control">
              <textarea
                name="answer"
                className="textarea"
              />
            </div>
          </div>

          {message && <Notify message={message} onClose={() => setMessage('')} />}
          <div className="field">
            <div className="control">
              <button className={`button is-primary ${isLoading ? 'is-loading' : ''}`}>Отправить</button>
            </div>
          </div>
        </form>
      </Box>
    </Layout>
  )
}

export default AddQuestion
