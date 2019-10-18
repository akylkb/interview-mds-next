import PropTypes from 'prop-types'
import { faUser, faStar } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import Icon from './icon'

const Avatar = ({ id, image = null, stars = null, name = null }) => {
  return (
    <>
      <Link href={`/users/${id}`}>
        <a className="Avatar">
          <div className="Avatar-wrap-left">
            <div className="Avatar-image">
              {!image && (
                <Icon name={faUser} />
              )}
              {image && (
                <img src={image} alt="" />
              )}
            </div>
            {stars && (
              <div className="Avatar-stars">
                <Icon name={faStar} />
                <Icon name={faStar} />
                <Icon name={faStar} />
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

      <style jsx>{`
        .Avatar {
          display: inline-flex;
          align-items: center;
        }
        .Avatar-wrap-left {
          width: 35px;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
        }
        .Avatar-wrap-right:empty {
          display: none;
        }
        .Avatar-image {
          width: 35px;
          height: 35px;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          background: gainsboro;
          border-radius: 50%;
          color: white;
        }
        .Avatar-name {
          padding-left: 10px;
        }
        .Avatar-stars {
          font-size: 10px;
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
