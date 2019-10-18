import ListItemComment from './list-item-comment'

const ListComments = ({ comments }) => {
  return (
    <>
      <h4 className="title is-4" id="comments">Комментарии</h4>
      {comments.length === 0 && (
        <div className="notification">Нет комментариев</div>
      )}
      {comments.length > 0 && comments.map(comment =>
        <ListItemComment
          key={comment.id}
          item={comment}
        />
      )}
    </>
  )
}

export default ListComments
