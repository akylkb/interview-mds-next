import React, { useState } from 'react'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faGoogle, faVk, faYandex } from '@fortawesome/free-brands-svg-icons'
import Link from 'next/link'
import axios from 'axios'
import Icon from '../components/icon'
import Layout from '../components/layout'
import PageHeader from '../components/page-header'
import { serializeForm } from '../utils/helpers'

const Signin = () => {
  const [isLoading, hasLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = event => {
    event.preventDefault()
    setMessage('')
    hasLoading(true)
    const data = serializeForm(event.target)
    axios.post('/signin', data)
      .then(() => {
        window.location.href = '/'
      })
      .catch(err => {
        const { data: { message } } = err.response
        setMessage(message)
      })
      .finally(() => {
        hasLoading(false)
      })
  }

  return (
    <Layout>
      <PageHeader title="Привет! Мы рады видеть тебя снова">
        <div className="title is-6">Еще незарегистрированы? <Link href="/signup"><a>Регистрация</a></Link></div>
      </PageHeader>

      <section>
        <div className="auth-social">
          <a href="/auth/google" className="button is-fullwidth">
            <Icon name={faGoogle} />&nbsp; Войти через Google
          </a>
          <a href="/auth/facebook" className="button is-fullwidth is-link">
            <Icon name={faFacebook} />&nbsp; Войти через Facebook
          </a>
          <a href="/auth/vk" className="button is-fullwidth is-light">
            <Icon name={faVk} />&nbsp; Войти через ВКонтакте
          </a>
          <a href="/auth/yandex" className="button is-fullwidth is-light">
            <Icon name={faYandex} />&nbsp; Войти через Яндекс
          </a>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Email</label>
            <div className="control has-icons-left">
              <input
                name="email"
                className="input"
                type="email"
                placeholder="batman@mail.com"
                required
              />
              <span className="icon is-small is-left">
                <Icon name={faEnvelope} />
              </span>
            </div>
          </div>

          <div className="field">
            <label className="label">Пароль</label>
            <div className="control has-icons-left">
              <input
                name="password"
                className="input"
                type="password"
                placeholder="ABC1234def"
                minLength="8"
                required
              />
              <span className="icon is-small is-left">
                <Icon name={faLock} />
              </span>
            </div>
            <p className="help">Забыли пароль? <Link href="/forgot-password"><a>Восстановить</a></Link></p>
          </div>

          {message && <div className="notification is-danger">{message}</div>}

          <div className="field">
            <div className="control">
              <button className={`button is-primary is-fullwidth is-medium ${isLoading ? 'is-loading' : ''}`}>Войти</button>
            </div>
          </div>

        </form>
      </section>

      <style jsx>{`
        section {
          max-width: 500px;
          margin: 0 auto;
        }

        .auth-social a:not(:last-child) {
          margin-bottom: 10px;
        }
        form {
          margin-top: 30px;
        }
      `}
      </style>
    </Layout>
  )
}

export default Signin
