import PropTypes from 'prop-types'
import { faUser, faStar } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import Icon from '../icon'

const renderStars = (rating) => {
  if (rating > 0 && rating < 33) {
    return <Icon name={faStar} />
  } else if (rating > 33 && rating < 66) {
    return (
      <>
        <Icon name={faStar} />
        <Icon name={faStar} />
      </>
    )
  } else if (rating > 66) {
    return (
      <>
        <Icon name={faStar} />
        <Icon name={faStar} />
        <Icon name={faStar} />
      </>
    )
  }
  return ''
}

const Avatar = ({ id, image = null, rating = 0, name = null, size = 35, starSize = 12 }) => {
  return (
    <>
      <Link href={`/users/${id}`}>
        <a className="Avatar">
          <div className="Avatar-wrap-left">
            <div className="Avatar-image">
              {!image && (
                <img src="/static/user.png" alt="" />
              )}
              {image && (
                <img src={image} alt="" />
              )}
            </div>
            {rating > 0 && (
              <div className="Avatar-stars">
                {renderStars(rating)}
              </div>
            )}
          </div>
          <div className="Avatar-wrap-right">
            {name && (
              <div className="Avatar-name">
                <strong>{name}</strong>
              </div>
            )}
          </div>
        </a>
      </Link>

      <style global jsx>{`
        .Avatar {
          display: inline-flex;
          align-items: center;
          font-size: ${size}px;
        }
        .Avatar-wrap-left {
          width: 1em;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
        }
        .Avatar-wrap-right:empty {
          display: none;
        }
        .Avatar-image {
          width: 1em;
          height: 1em;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          background: #f1f1f1;
          border-radius: 50%;
          color: white;
          overflow: hidden;
        }
        .Avatar-image > img {
          width: 1em;
          height: 1em;
          object-fit: cover;
        }
        .Avatar-name {
          padding-left: 10px;
          font-size: 0.45em;
        }

        .Avatar-stars {
          font-size: ${starSize}px;
          color: orange;
          width: 100%;
          text-align: center;
        }
      `}
      </style>
    </>
  )
}

Avatar.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string,
  name: PropTypes.string
}

export default Avatar
