import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons'
import Icon from '../icon';

const QuestionItem = ({ id, title, quantity_likes = 0, quantity_comments = 0, onClickLike = null, onClickComment = null }) => {
  return (
    <>
      <Link
        to={`/questions/${id}`}
        className="list-questions-item-title">{title}</Link>
      <div className="list-questions-item-actions">

        <a onClick={onClickLike} href="#like" className="has-text-primary"><Icon name={faHeart} /> {quantity_likes}</a>
        <a onClick={onClickComment} href="#comment" className="has-text-primary"><Icon name={faComment} /> {quantity_comments}</a>
      </div>
    </>
  );
};

QuestionItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  quantity_likes: PropTypes.number,
  quantity_comments: PropTypes.number
};

export default QuestionItem;