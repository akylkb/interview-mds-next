import React, { useState } from 'react'

const UserContext = React.createContext([{}, () => {}])

const UserProvider = ({ children, user: initialUser }) => {
  const [user, setUser] = useState(initialUser)

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }
