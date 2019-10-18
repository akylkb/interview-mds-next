import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon';
import './question-details.css';
import {faComment, faHeart} from "@fortawesome/free-solid-svg-icons";

const QuestionDetails = (props) => {
  const {
    title,
    description = null,
    quantity_likes = 0,
    quantity_comments = 0,
    onLike = f => f
  } = props;

  return (
    <div className="QuestionDetails">
      <h1 className="title">{title}</h1>
      { description ? <p className="description">{description}</p> : null }
      <div className="buttons">
        <a href="#comments" className="button is-primary">
          <span className="icon"><Icon name={faComment}/></span>
          <span>{quantity_comments}</span>
        </a>
        <button onClick={onLike} className="button is-primary">
          <span className="icon"><Icon name={faHeart}/></span>
          <span>{quantity_likes}</span>
        </button>
      </div>
    </div>
  )
};

QuestionDetails.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  quantity_likes: PropTypes.number,
  quantity_comments: PropTypes.number,
  comments: PropTypes.array,
};

export default QuestionDetails;