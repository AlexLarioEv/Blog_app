import React from 'react'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import useTypedSelector from '../../hooks/useTypedSelector'
import { EAuthenticationActionTypes } from '../../types/authentication'

import './header.scss'

const Header: React.FC = () => {
  const { authentication } = useTypedSelector((state) => state)

  const dispatch = useDispatch()

  const onClick = () => {
    localStorage.clear()
    dispatch({ type: EAuthenticationActionTypes.FETCH_AUTHENTICATION_EXIET })
  }

  return (
    <header className="header">
      <Link to="/">
        <h1 className="header__title">Realworld Blog</h1>
      </Link>
      {authentication.login && (
        <div className="header__login">
          <Link to={'/new-article'}>
            <Button className="button green" type="default">
              Create article
            </Button>
          </Link>
          <Link className="header__info" to="/profile">
            <h2 className="header__user">{authentication.user.username}</h2>
            <div className="header__imagebox">
              <img className="header__image" src={authentication.user.image} alt="user" />
            </div>
          </Link>
          <Button className="button" type="default" onClick={onClick}>
            Log Out
          </Button>
        </div>
      )}
      {!authentication.login && (
        <div className="header__authorization">
          <Link to={'/sign-in'}>
            <Button className="button" type="text">
              Sign In
            </Button>
          </Link>
          <Link to={'/sign-up'}>
            <Button className="button green" type="default">
              Sign Up
            </Button>
          </Link>
        </div>
      )}
    </header>
  )
}

export default Header
