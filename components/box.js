const Box = ({ children }) => {
  return (
    <div className="Box">
      {children}
      <style global jsx>{`
        .Box {
          padding: 1.25rem;
        }
      `}
      </style>
    </div>
  )
}

export default Box
