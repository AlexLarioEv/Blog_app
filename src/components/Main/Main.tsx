import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'

import EditProfile from '../EditProfile'
import ListArticle from '../ListArticle'
import Article from '../Article'
import ErrorMessage from '../ErrorMessage'
import SignUp from '../SignUp'
import SignIn from '../SignIn'
import FormArticle from '../FormArticle'
import useTypedSelector from '../../hooks/useTypedSelector'

import './Main.scss'

const Main: React.FC = () => {
  const { article } = useTypedSelector((state) => state)
  return (
    <main className="main">
      <Fragment>
        {article.error && <ErrorMessage errorText={article.error}></ErrorMessage>}
        <Route path="/sign-up" component={SignUp}></Route>
        <Route path="/sign-in" component={SignIn}></Route>
        <Route path="/profile" component={EditProfile}></Route>
        <Route
          path="/new-article"
          render={({ match }) => {
            return <FormArticle match={match} />
          }}
        ></Route>
        <Route
          path="/articles/:id/edit"
          render={({ match }) => {
            return <FormArticle match={match} />
          }}
        ></Route>
        <Route path="/" exact component={ListArticle} />
        <Route path="/articles" exact component={ListArticle} />
        <Route
          path="/articles/:id"
          exact
          render={({ match }) => {
            const { id } = match.params
            return <Article id={id} />
          }}
        />
      </Fragment>
    </main>
  )
}

export default Main
