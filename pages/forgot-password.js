import { useState } from 'react'
import axios from 'axios'
import Layout from '../components/layout'
import PageHeader from '../components/page-header'
import Notify from '../components/notify'

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState(null)

  const handleSubmit = event => {
    event.preventDefault()
    setLoading(true)
    axios.post('/api/users/forgot-password', { email })
      .then(response => {
        const { message } = response.data
        setMessage(message)
        setEmail('')
      })
      .catch(err => {
        const { message } = err.response.data
        setMessage(message)
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <Layout>
      <PageHeader title="Восстановление пароля" />
      <section>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <div className="control">
              <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="input"
                type="email"
                placeholder="Ваш email"
              />
            </div>
            <p className="help">На этот email будет отправлена ссылка для восстановления пароля</p>
          </div>

          {message && <Notify message={message} onClose={() => setMessage(null)} />}

          <div className="field">
            <div className="control">
              <button className={`button is-primary ${loading ? 'is-loading' : ''}`}>Напомнить</button>
            </div>
          </div>
        </form>
      </section>
    </Layout>
  )
}

export default ForgotPassword
