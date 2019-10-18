import Layout from '../components/layout'
import PageHeader from '../components/page-header'

const ForgotPassword = () => {
  return (
    <Layout>
      <PageHeader title="Восстановление пароля" />
      <form>
        <div className="field">
          <div className="control">
            <input className="input" type="email" placeholder="Ваш email" />
          </div>
          <p className="help">На этот email будет отправлена ссылка для восстановления пароля</p>
        </div>

        <div className="field">
          <div className="control">
            <button className="button is-primary">Напомнить</button>
          </div>
        </div>

      </form>
    </Layout>
  )
}

export default ForgotPassword
