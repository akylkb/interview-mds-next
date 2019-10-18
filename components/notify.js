import PropTypes from 'prop-types'
import classNames from 'classnames'

const Notify = ({ message, color = null, onClose = null }) => {
  const classes = classNames('notification', color && (`is-${color}`))

  return (
    <div className={classes}>
      {onClose && <a onClick={onClose} className="delete" />}
      {message}
    </div>
  )
}

Notify.propTypes = {
  message: PropTypes.string.isRequired,
  color: PropTypes.string,
  onClose: PropTypes.func
}

export default Notify
