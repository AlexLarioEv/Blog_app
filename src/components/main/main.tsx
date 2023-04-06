import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'

import ListArticle from '../listArticle/listArticle'
import useTypedSelector from '../../hooks/useTypedSelector'
import Article from '../article/article'
import ErrorMessage from '../errorMessage/errorMessage'
import SignUp from '../signUp/signUp'
import SignIn from '../signIn/signIn'
import NewArticle from '../newArticle/newArticle'
import EditProfile from '../editProfile/editProfile'
import EditArticle from '../editArticle/editArticle'

import './main.scss'

const Main: React.FC = () => {
  const { article } = useTypedSelector((state) => state)
  return (
    <main className="main">
      <Fragment>
        {article.error && <ErrorMessage errorText={article.error}></ErrorMessage>}
        <Route path="/sign-up" component={SignUp}></Route>
        <Route path="/sign-in" component={SignIn}></Route>
        <Route path="/profile" component={EditProfile}></Route>
        <Route path="/new-article" component={NewArticle}></Route>
        <Route
          path="/articles/:id/edit"
          render={({ match }) => {
            return <EditArticle match={match} />
          }}
          component={EditArticle}
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
