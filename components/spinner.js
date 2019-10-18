import React from 'react'

const Spinner = ({ caption = null }) => {
  return (
    <div className="Spinner">
      <div className="loader" />
      {caption ? <div className="caption">{caption}</div> : null}

      <style jsx>{`
        .Spinner {
          width: 100%;
          height: 100%;
          display: flex;
          flex-wrap: wrap;
          align-content: center;
          justify-content: center;
          padding: 15px;      
        }
          
        .Spinner .loader {
          width: 2em;
          height: 2em;
        }
        
        .Spinner .caption {
          width: 100%;
          text-align: center;
          color: #949494;
          font-size: 14px;
          margin-top: 6px;
        }
      `}
      </style>
    </div>
  )
}

export default Spinner
