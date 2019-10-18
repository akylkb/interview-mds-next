import React from 'react';
import {Link} from "react-router-dom";
import './question-suggest.scss';

const QuestionSuggest = () => {
  return (
    <div className="QuestionSuggest">
      <Link to="/add-question" className="button is-primary">Предложить вопрос</Link>
      <p>Наша цель -  превратить собеседовние в комфортный процесс и облегчить подготовку к нему. Внеси вклад в сообщество, поделись своими вопросами</p>
    </div>
  )
};

export default QuestionSuggest;