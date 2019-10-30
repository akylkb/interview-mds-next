const InformationTab = ({ data: response, user }) => {
  const data = response.data

  return (
    <div className="InformationTab">
      <div className="user-progress">
        <span className="text has-text-success">Вероятность получить работу мечты {user.rating}%</span>
        <progress className="progress is-success" value="1" max={user.rating}>{user.rating}%</progress>
      </div>
      {data && data.counts && (
        <ul className="infographics">
          <li>
            <span className="count has-text-primary">{data.counts.correct}</span>
            <span className="label">Верные ответы</span>
          </li>
          <li>
            <span className="count has-text-primary">{data.counts.answers}</span>
            <span className="label">Всего ответов</span>
          </li>
          <li>
            <span className="count has-text-primary">{data.counts.questions}</span>
            <span className="label">Добавлено вопросов</span>
          </li>
        </ul>
      )}
      <style jsx>{`
        .InformationTab {
          padding: 0 1.25rem 1.25rem;
        }
        .infographics {
          display: flex;
          justify-content: space-around;
        }
        li {
          text-align: center;
        }
        .count {
          font-size: 48px;
          line-height: 1.2;
          display: block;
        }
        .user-progress {
          margin-bottom: 1.5rem;
        }
        .user-progress span {
          display: block;
          text-align: center;
        }
      `}
      </style>
    </div>
  )
}

export default InformationTab
