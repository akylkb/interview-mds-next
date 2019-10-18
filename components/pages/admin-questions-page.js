import React, {useEffect, useState} from 'react';
import {getAdminQuestions, deleteAdminQuestion, updateAdminQuestion} from '../../services/api-service';
import Spinner from "../spinner";
import Icon from '../icon';

const QuestionItem = ({id, title, active, onClick = f => f}) => {
  return <a onClick={onClick} href={`#edit=${id}`}><Icon name={`fas fa-${active ? 'check' : 'times'}-circle`}/> {title}
  </a>
};

const QuestionForm = ({id, title, active, description = '', answer = ''}) => {
  return (
    <>
      <div className="field">
        <div className="control">
          <input
            name="title"
            className="input"
            type="text"
            placeholder="Title"
            defaultValue={title}
          />
        </div>
      </div>
      <div className="field">
        <div className="control">
          <textarea
            name="description"
            className="textarea"
            defaultValue={description}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Ответ</label>
        <div className="control">
          <textarea
            name="answer"
            className="textarea"
            defaultValue={answer}
          />
        </div>
      </div>
      <div className="field">
        <div className="control">
          <label className="checkbox">
            <input
              name="active"
              type="checkbox"
              defaultChecked={active}
            /> Активен</label>
        </div>
      </div>
      <input name="id" type="hidden" defaultValue={id}/>
    </>
  )
};
const AdminQuestionsPage = () => {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [activeModal, setActiveModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState({});

  useEffect(() => {
    getAdminQuestions()
      .then(response => {
        const data = response.data;
        setQuestions(data);
      })
      .finally(() => {
        setLoading(false);
      })
  }, []);

  const toggleModal = () => {
    setActiveModal(!activeModal);
    if (selectedQuestion.id) {
      setSelectedQuestion({});
    }
  };

  const handleItemClick = questionId => {
    return event => {
      event.preventDefault();
      const question = questions.find(item => item.id === questionId);
      setSelectedQuestion(question);
      toggleModal();
    }
  };

  const handleSubmitForm = event => {
    event.preventDefault();
    const target = event.target;
    const formData = new FormData(target);
    updateAdminQuestion(formData)
      .then(() => {
        const formQuestion = {
          ...selectedQuestion,
          active: formData.get('active') || false,
          title: formData.get('title'),
          description: formData.get('description'),
          answer: formData.get('answer'),
        };

        const updatedQuestions = questions.map(item => {
          if (item.id !== formQuestion.id) {
            return item;
          }
          return formQuestion;
        });
        setQuestions(updatedQuestions);
        toggleModal();
      })
  };

  const handleDeleteQuestion = event => {
    event.preventDefault();
    if (selectedQuestion.id) {
      deleteAdminQuestion(selectedQuestion.id)
        .then(() => {
          const updatedQuestions = questions.filter(item => item.id !== selectedQuestion.id);
          setQuestions(updatedQuestions);
          toggleModal();
        })

    }
  };

  return (
    <section>
      <h1 className="title">Все вопросы</h1>
      {loading ? <Spinner/> : null}
      <ul className="menu-list">
        {questions.map(item => (
          <li key={item.id}>
            <QuestionItem
              {...item}
              onClick={handleItemClick(item.id)}/>
          </li>
        ))}
      </ul>
      <div className={`modal` + (activeModal ? ' is-active' : '')}>
        <div className="modal-background" onClick={() => toggleModal()}/>
        <div className="modal-card">
          <form onSubmit={handleSubmitForm}>
            <header className="modal-card-head">
              <p className="modal-card-title">ID: {selectedQuestion.id}</p>
              <span className="delete" onClick={() => toggleModal()}/>
            </header>
            <section className="modal-card-body">

              {selectedQuestion.id ? (
                <QuestionForm
                  {...selectedQuestion}/>
              ) : null}

            </section>
            <footer className="modal-card-foot">
              <button type="submit" className="button is-success">Сохранить</button>
              <a href="#delete" className="button is-danger" onClick={handleDeleteQuestion}>Удалить</a>
            </footer>
          </form>
        </div>
      </div>
    </section>
  )
};

export default AdminQuestionsPage;