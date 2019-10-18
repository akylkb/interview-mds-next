import React, {useState} from 'react';
import {addQuestion} from '../../services/api-service';

const QuestionAddPage = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({});

  const handleDeleteNotification = event => {
    event.preventDefault();
    setMessage({});
  };
  const handleSubmit = event => {
    event.preventDefault();
    const target = event.target;
    const formData = new FormData(target);
    setLoading(true);
    setMessage({});
    addQuestion(formData)
      .then(response => {
        if (response.status === 201) {
          setMessage(response.data);
        } else {
          console.warn(response);
        }
        target.reset();
      })
      .catch(err => {
        if (err.response.status === 400) {
          return setMessage(err.response.data);
        }
        console.warn(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <section>
      <h4 className="title is-4">Добавить вопрос</h4>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <p className="control">
            <input name="title" className="input" type="name" placeholder="Вопрос" maxLength={255}/>
          </p>
        </div>
        <div className="field">
          <div className="control">
            <textarea
              name="description"
              className="textarea"
              placeholder="Описание для пользователей (необязательно)"/>
          </div>
        </div>
        <div className="field">
          <div className="control">
            <textarea
              name="answer"
              className="textarea"
              placeholder="Ответ (необязательно)"/>
          </div>
        </div>

        {message.type ? (
          <div className={`notification is-` + message.type}>
            <button className="delete" onClick={handleDeleteNotification}/>
            {message.text}
          </div>
        ) : null}
        <button className={`button is-primary` + (loading ? ' is-loading' : '')}>Отправить</button>
      </form>
    </section>
  )
};


export default QuestionAddPage;