import { useState, useContext } from 'react'
import axios from 'axios'
import Layout from '../../components/layout'
import PageHeader from '../../components/page-header'
import Box from '../../components/box'
import Notify from '../../components/notify'
import { serializeForm } from '../../utils/helpers'
import { UserContext } from '../../components/user-context'

const Settings = () => {
  const [user, updateUser] = useContext(UserContext)
  const [loading, setLoading] = useState(false)
  const [messageForProfile, setMessageForProfile] = useState(null)
  const [messageForPassword, setMessageForPassword] = useState(null)

  const handleSubmitProfile = event => {
    event.preventDefault()
    const data = serializeForm(event.target)
    setLoading(true)
    setMessageForProfile(null)
    axios.patch('/api/users', data)
      .then(response => {
        const updatedUser = response.data.data
        updateUser({
          ...user,
          ...updatedUser
        })
        setMessageForProfile('Данные обновлены')
      })
      .catch(err => {
        console.log(err)
        if (err.response.data) setMessageForProfile(err.response.data.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleSubmitPassword = event => {
    event.preventDefault()
    const form = event.target
    const data = serializeForm(form)
    setLoading(true)
    setMessageForPassword(null)
    axios.patch('/api/users/update-password', data)
      .then(() => {
        setMessageForPassword('Пароль обновлен')
        form.reset()
      })
      .catch(err => {
        console.log(err)
        if (err.response.data) setMessageForPassword(err.response.data.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <Layout>
      <PageHeader title="Настройки" />
      <Box>
        <form onSubmit={handleSubmitProfile}>
          <h4 className="title is-4">Профиль</h4>
          <div className="field">
            <label className="label">Отображаемое имя</label>
            <div className="control">
              <input
                name="name"
                className="input"
                defaultValue={user.name}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                type="email"
                name="email"
                className="input"
                defaultValue={user.email}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">О себе</label>
            <div className="control">
              <textarea
                name="description"
                className="textarea"
                defaultValue={user.description}
              />
            </div>
          </div>
          {messageForProfile && (
            <Notify
              message={messageForProfile}
              onClose={() => setMessageForProfile(null)}
            />
          )}
          <div className="field">
            <div className="control">
              <button className={`button is-primary ${loading ? 'is-loading' : ''}`}>Сохранить</button>
            </div>
          </div>
        </form>

        <hr />

        <form onSubmit={handleSubmitPassword}>
          <h4 className="title is-4">Сменить пароль</h4>
          <div className="field">
            <div className="control">
              <input
                className="input"
                name="password"
                type="password"
                placeholder="Старый пароль"
                required
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input
                className="input"
                name="new_password"
                type="password"
                placeholder="Новый пароль"
                required
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input
                className="input"
                name="new_password_repeat"
                type="password"
                placeholder="Повторите пароль"
                required
              />
            </div>
          </div>
          {messageForPassword && (
            <Notify
              message={messageForPassword}
              onClose={() => setMessageForPassword(null)}
            />
          )}
          <div className="field">
            <div className="control">
              <button className={`button is-primary ${loading ? 'is-loading' : ''}`}>Сменить</button>
            </div>
          </div>
        </form>
      </Box>
    </Layout>
  )
}

export default Settings
