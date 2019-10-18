import React from 'react';
import Editor from "../editor";

const CommentAdd = (props) => {

  const {
    questionId,
    username,
    content,
    loading = false,
    onSubmit = f => f,
    onChangeUsername = f => f,
    onChangeContent = f => f,
  } = props;
  return (
    <form onSubmit={onSubmit}>
      <div className="field">
        <p className="control has-icons-left has-icons-right">
          <input
            className="input"
            type="name"
            name="username"
            placeholder="Ваше имя"
            value={username}
            onChange={onChangeUsername}
            required
          />
          <span className="icon is-small is-left"><i className="fas fa-user"/></span>
        </p>
      </div>
      <div className="field">
        <div className="control">
          <Editor value={content} onChange={onChangeContent}/>
          <input type="hidden" name="content" value={content}/>
          <input type="hidden" name="question_id" value={questionId}/>
        </div>
      </div>

      <button className={`button is-primary` + (loading ? ' is-loading' : '')}>Ответить</button>
    </form>
  )
};

export default CommentAdd;