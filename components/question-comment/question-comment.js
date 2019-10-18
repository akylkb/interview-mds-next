import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from "react-markdown";
import {faCheck, faCheckCircle, faHeart, faReply, faTrash} from '@fortawesome/free-solid-svg-icons';
import Icon from '../icon';
import './question-comment.css';

const QuestionComment = (props) => {
  const {
    username,
    content,
    quantity_likes = 0,
    marked = false,
    isAdmin = false,
    onLike = f => f,
    onReply = f => f,
    onDelete = f => f,
    onMark = f => f,
  } = props;
  return (
    <article className={`QuestionComment card` + (marked ? ' marked' : '')}>
      {marked ? <div className="marked-icon"><Icon name={faCheckCircle}/></div> : null}
      <div className="card-content">
        <strong>{username}</strong>
        <div className="content">
          <ReactMarkdown source={content} />
        </div>
      </div>
      <footer className="card-footer">
        {isAdmin ? (
          <>
            <a onClick={onMark} href="#marked" className="card-footer-item"><Icon
              name={faCheck}/>&nbsp;Отметить</a>
            <a onClick={onDelete} href="#delete" className="card-footer-item has-text-danger"><Icon
              name={faTrash}/>&nbsp;Удалить</a>
          </>
        ) : null}
        <a onClick={onReply} href="#reply" className="card-footer-item"><Icon name={faReply}/>&nbsp;Ответить</a>
        <a onClick={onLike} href="#like" className="card-footer-item"><Icon name={faHeart}/>&nbsp;{quantity_likes}</a>
      </footer>
    </article>
  )
};

QuestionComment.propTypes = {
  username: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  quantity_likes: PropTypes.number,
  marked: PropTypes.bool,
};

export default QuestionComment;