import React, { useState, useEffect } from 'react'
import axios from 'axios'

const UserContext = React.createContext([{}, () => {}])

const UserProvider = (props) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    axios.get('/api/profile/me')
      .then(({ data }) => setUser(data))
      .catch(console.error)
  }, [])
  return (
    <UserContext.Provider value={[user, setUser]}>
      {props.children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }
