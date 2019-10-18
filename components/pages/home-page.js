import React, {useState, useEffect} from 'react';
import {Redirect} from "react-router-dom";
import {getQuestions, likeQuestion} from '../../services/api-service';
import QuestionItem from '../question-item';
import QuestionSuggest from '../question-suggest';
import Spinner from '../spinner';

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [redirectUrl, setRedirectUrl] = useState(null);

  useEffect(() => {
    setLoading(true);
    getQuestions()
      .then(response => {
        setQuestions(response.data);
      })
      .catch(console.error)
      .finally(() => {
        setLoading(false);
      })
  }, []);

  const handleClickLike = question => {
    return event => {
      const selectedId = question.id;
    event.preventDefault();
    let newQuantity = question.quantity_likes;
    likeQuestion(selectedId).then(response => {
      const status = response.status;
      switch (status) {
        case 201:
          newQuantity += 1;
          break;
        case 202:
          newQuantity -= 1;
          break;
        default:
          break;
      }
      const updatedQuestions = questions.map(item => {
        if (item.id !== selectedId) {
          return item;
        }
        return {
          ...item,
          quantity_likes: newQuantity
        }
      })
      setQuestions(updatedQuestions);
    });
    }
  };

  const handleClickComment = questionId => {
    return event => {
      event.preventDefault();
      setRedirectUrl(`/questions/${questionId}`);
    }
  };

  if (redirectUrl) {
    return <Redirect to={redirectUrl}/>
  }

  return (
    <div>
      <section className="bottom-line">
        <h1 className="title is-2">Вопросы для интервью по специальности Data Science</h1>
        <QuestionSuggest/>
      </section>
      <section>
        {loading ? <Spinner caption="Загрузка списка вопросов"/> : null}
        {!loading && questions.length !== 0 ? (
          <ul className="list list-questions">
            {questions.map(item => {
              return (
                <li key={item.id} className="list-item">
                  <QuestionItem
                    {...item}
                    onClickLike={handleClickLike(item)}
                    onClickComment={handleClickComment(item.id)}
                  />
                </li>
              )
            })}
          </ul>
        ) : null}
        {!loading && questions.length === 0 ? (
          <div className="notification">Вопросов нет</div>
        ) : null}
      </section>
    </div>
  );
};

export default HomePage;