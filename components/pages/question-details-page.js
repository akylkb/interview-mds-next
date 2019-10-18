import React, {useState, useEffect} from 'react';
import Spinner from '../spinner';
import QuestionDetails from '../question-details';
import QuestionComment from '../question-comment';
import CommentAdd from '../comment-add';
import {
  getQuestion,
  addComment,
  getQuestionComments,
  likeQuestion,
  likeComment,
  markComment,
  deleteMarkComment,
  deleteComment,
} from '../../services/api-service';
import {getUserStorage, setUserStorage} from '../../utils/storage';

const QuestionDetailsPage = ({match}) => {
  const selectedId = match.params.id;
  const [question, setQuestion] = useState({});
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingForm, setLoadingForm] = useState(false);
  const [formContent, setFormContent] = useState('');
  const [username, setUsername] = useState('');
  const [user, setUser] = useState({});
  const [message, setMessage] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const userStorage = getUserStorage();
    setUser(userStorage);
    setUsername(userStorage.name);
    fetchQuestion();
    fetchComments();
  }, []);

  const fetchQuestion = () => {
    setLoading(true);
    return getQuestion(selectedId)
      .then(response => {
        setQuestion(response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchComments = () => {
    setLoadingComments(true);
    getQuestionComments(selectedId)
      .then(response => {
        setComments(response.data);
      })
      .finally(() => {
        setLoadingComments(false);
      })
  };

  const handleQuestionLike = () => {
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
      setQuestion({
        ...question,
        quantity_likes: newQuantity
      });
    });
  };

  const handleFormUsername = event => {
    const value = event.target.value;
    setUsername(value);
    setUserStorage({
      name: value
    });
  };

  const handleFormContent = markdownCode => {
    setFormContent(markdownCode);
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    setLoadingForm(true);
    setMessage(null);
    const formData = new FormData(event.target);
    addComment(formData)
      .then(() => {
        setFormContent('');
        fetchComments();
      })
      .catch(err => {
        if (err.response.status === 400) {
          setMessage(err.response.data);
        }
      })
      .finally(() => {
        setLoadingForm(false);
      })
  };

  const handleReply = username => {
    return event => {
      event.preventDefault();
      setFormContent(`${username}, `);
      document.forms[0].scrollIntoView({behavior: 'smooth'});
    }
  };

  const handleCommentLike = commentId => {
    return event => {
      event.preventDefault();
      likeComment(commentId)
        .then((response) => {
          const status = response.status;
          const updatedComments = comments.map(item => {
            if (item.id !== commentId) {
              return item;
            }
            let newQuantity = item.quantity_likes;
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
            return {
              ...item,
              quantity_likes: newQuantity,
            }
          });
          setComments(updatedComments);
        });
    }
  };

  const handleCommentMark = commentId => {
    return event => {
      const currentComment = comments.find(item => item.id === commentId);
      const currentMarked = currentComment.marked;
      const updatedComments = comments.map(item => {
        if (item.id !== commentId) {
          return item;
        }
        return {
          ...item,
          marked: !currentMarked
        }
      });
      if (currentMarked) {
        deleteMarkComment(commentId)
          .then(() => {
            setComments(updatedComments);
          });
      } else {
        markComment(commentId)
          .then(() => {
            setComments(updatedComments);
          });
      }
      event.preventDefault();
    }
  };

  const handleCommentDelete = (commentId) => {
    return event => {
      event.preventDefault();
      const updatedComments = comments.filter(item => {
        if (item.id === commentId) {
          return null;
        }
        return true;
      });
      deleteComment(commentId)
        .then(() => {
          setComments(updatedComments);
        });
    }
  };

  if (loading) {
    return <Spinner/>
  }

  return (
    <>
      <section className="bottom-line">
        <QuestionDetails {...question} onLike={handleQuestionLike}/>
      </section>
      <section>
        <h4 className="title is-4">Ваш ответ</h4>
        <CommentAdd
          questionId={selectedId}
          username={username}
          content={formContent}
          loading={loadingForm}
          onSubmit={handleFormSubmit}
          onChangeUsername={handleFormUsername}
          onChangeContent={handleFormContent}
        />
        {message ? (
          <div style={{marginTop: 15}} className={`notification is-spaced is-${message.type}`}>
            {message.text}
            <span className="delete" onClick={() => setMessage(null)}/>
          </div>) : null}
      </section>
      <section id="comments">
        <h4 className="title is-4">Комментарии</h4>
        {loadingComments ? <Spinner caption="Згрузка комментариев"/> : ''}
        {comments.length > 0 ? comments.map(item =>
          <QuestionComment
            key={item.id}
            {...item}
            isAdmin={user.type === 'admin'}
            onReply={handleReply(item.username)}
            onLike={handleCommentLike(item.id)}
            onMark={handleCommentMark(item.id)}
            onDelete={handleCommentDelete(item.id)}
          />) : null}

        {comments.length === 0 ? (
          <div className="notification">Нет комментариев</div>
        ) : null}

      </section>
    </>
  );
};


export default QuestionDetailsPage;