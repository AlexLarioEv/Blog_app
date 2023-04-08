import React, { useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import Header from '../Header'
import Main from '../Main'
import useActions from '../../hooks/useActions'

import 'antd/dist/reset.css'
import './App.scss'

const App: React.FC = () => {
  const { fetchGetUser } = useActions()

  useEffect(() => {
    const token = localStorage.getItem('token')
    fetchGetUser(token)
  }, [])

  return (
    <Router>
      <Header></Header>
      <Main></Main>
    </Router>
  )
}
export default App
