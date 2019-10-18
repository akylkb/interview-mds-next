const NotFound = () => {
  return (
    <div className="NotFound">
      <h1 className="title is-1">404</h1>
      <style>{`
        .NotFound {
          display: flex;
          height: calc(100vh - 184px);
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
        }
      `}
      </style>
    </div>
  )
}

export default NotFound
