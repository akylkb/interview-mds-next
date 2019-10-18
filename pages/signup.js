import axios from 'axios'
import { useState } from 'react'
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faGoogle, faVk, faYandex } from '@fortawesome/free-brands-svg-icons'
import Link from 'next/link'
import Icon from '../components/icon'
import Layout from '../components/layout'
import PageHeader from '../components/page-header'
import Notify from '../components/notify'
import { serializeForm } from '../utils/helpers'

const Signup = () => {
  const [isLoading, hasLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = event => {
    event.preventDefault()
    setMessage('')
    hasLoading(true)
    const data = serializeForm(event.target)
    axios.post('/signup', data)
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
      <PageHeader title="Регистрация">
        <div className="title is-6">Уже зарегистрированы? <Link href="/signin"><a>Войти</a></Link></div>
      </PageHeader>

      <section>
        <div className="auth-social">
          <a href="/auth/google" className="button is-fullwidth">
            <Icon name={faGoogle} />&nbsp; Регистрация через Google
          </a>
          <a href="/auth/facebook" className="button is-fullwidth is-link">
            <Icon name={faFacebook} />&nbsp; Регистрация через Facebook
          </a>
          <a href="/auth/vk" className="button is-fullwidth is-light">
            <Icon name={faVk} />&nbsp; Регистрация через ВКонтакте
          </a>
          <a href="/auth/yandex" className="button is-fullwidth is-light">
            <Icon name={faYandex} />&nbsp; Регистрация через Яндекс
          </a>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Отображаемое имя</label>
            <div className="control has-icons-left">
              <input
                name="name"
                className="input"
                type="text"
                placeholder="Batman"
                required
              />
              <span className="icon is-small is-left">
                <Icon name={faUser} />
              </span>
            </div>
          </div>

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
          </div>

          <div className="field">
            <div className="control">
              <label className="checkbox">
                <input type="checkbox" name="subscribed" /> Согласиться на не регулярную <a href="#">рассылку</a> обновлений продуктов,
              приглашений для участия в пользовательских исследованиях, анонсов компании и дайджестов.
              </label>
            </div>
          </div>
          
          {message && <Notify message={message} onClose={() => setMessage('')} />}

          <div className="field">
            <div className="control">
              <button className={`button is-primary is-fullwidth is-medium ${isLoading ? 'is-loading' : ''}`}>Регистрация</button>
            </div>
          </div>

          <div className="field">
            <div className="control">
              <p>Нажимая на кнопку &laquo;Регистрация&raquo;, вы соглашаетесь с нашими <a href="/privacy.html">пользовательским сошлашением, политикой конфиденцианальности и политикой о куки</a></p>
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

export default Signup
