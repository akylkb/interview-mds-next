import React, { useState, useContext } from 'react'
import Link from 'next/link'
import { faTelegram } from '@fortawesome/free-brands-svg-icons'
import Icon from '../icon'
import { UserContext } from '../user-context'

const Navbar = () => {
  const [navbarActive, setNavbarActive] = useState(false)
  const [user] = useContext(UserContext)

  const handleBurger = event => {
    event.preventDefault()
    setNavbarActive(!navbarActive)
  }

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link href="/">
          <a className="navbar-item">
            <img style={{ maxHeight: 48 }} src="/static/logo.png" alt="MDS Interview" className="logo" />
          </a>
        </Link>
        <a
          onClick={handleBurger}
          role="button"
          className="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="menu"
        >
          <span aria-hidden />
          <span aria-hidden />
          <span aria-hidden />
        </a>
      </div>
      <div id="menu" className={`navbar-menu ${navbarActive ? 'is-active' : ''}`}>
        <div className="navbar-start">
          <Link href="/add-question">
            <a className="navbar-item">Добавить вопрос</a>
          </Link>
          {user && user.group === 'admin' && (
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">Админ</a>
              <div className="navbar-dropdown">
                <Link href="/admin/questions">
                  <a className="navbar-item">Модерация вопросов</a>
                </Link>
              </div>
            </div>
          )}
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <a className="button is-white" href="https://teleg.run/mommyscience" target="_blank" rel="noopener noreferrer">
                <Icon name={faTelegram} style={{ fontSize: 24, color: '#2EA6DA' }} />&nbsp;@mommyscience
              </a>
            </div>
          </div>

          {!user && (
            <div className="navbar-item">
              <Link href="/signin">
                <a className="button is-primary">Войти</a>
              </Link>
            </div>
          )}
          {user && (
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">{user.name || 'Профиль'}</a>
              <div className="navbar-dropdown profile-dropdown">
                {/* <Link href="/users/[id]" as={`/users/${user.id}`}>
                  <a className="navbar-item">Мой профиль</a>
                </Link> */}
                {/* <Link href="/my/questions">
                  <a className="navbar-item">Мои вопросы</a>
                </Link> */}
                {/* <Link href="/my/settings">
                  <a className="navbar-item">Настройки</a>
                </Link> */}
                <hr className="navbar-divider" />
                <a href="/logout" className="navbar-item">Выйти</a>
              </div>
            </div>
          )}

        </div>
      </div>

      <style jsx>{`
        .navbar-dropdown.profile-dropdown {
         left: auto;
         right: 0; 
        }
        .navbar-dropdown .navbar-item {
          min-height: auto;
        }
      `}
      </style>
    </nav>
  )
}

export default Navbar
