import React, { useState} from 'react';
import {Redirect} from 'react-router-dom';
import {login} from '../../services/api-service';
import {setUserStorage} from '../../utils/storage';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [logged, setLogged] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    const formData = new FormData(event.target);
    login(formData)
      .then(response => {
        const data = response.data;
        if (data.id) {
          setUserStorage(response.data);
        }
        setLogged(true);
      })
      .catch(err => {
        setError('Не удалось авторизоваться. Повторите попытку');
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      })
  };
  if (logged) {
    return <Redirect to="/"/>
  }
  return (
    <section>
      <form onSubmit={handleSubmit} style={{ margin: '0 auto', maxWidth: 400}}>
        <div className="field">
          <div className="control">
            <input
              name="username"
              className="input"
              type="text"
              placeholder="Логин"
              required
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <input
              name="password"
              className="input"
              type="password"
              placeholder="Пароль"
              required
            />
          </div>
        </div>
        {error ? <div className="notification">{error}</div> : null}
        <button className={`button is-info is-fullwidth` + (loading ? ' is-loading' : '')}>Войти</button>
      </form>
    </section>
)
};

export default LoginPage;