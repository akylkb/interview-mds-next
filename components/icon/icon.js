import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Icon = ({ name, ...props }) => {
  return (
    <i className="Icon" aria-hidden="true" {...props}>
      <FontAwesomeIcon icon={name} />
    </i>
  )
}

Icon.propTypes = {
  name: PropTypes.object.isRequired
}

export default Icon
