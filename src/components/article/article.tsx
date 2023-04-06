/* eslint-disable @typescript-eslint/no-shadow */
import React, { useEffect } from 'react'
import { format } from 'date-fns'
import ReactMarkdown from 'react-markdown'
import { Button, Popconfirm } from 'antd'
import { Link } from 'react-router-dom'

import Heart from '../heart/heart'
import Tags from '../tag/tag'
import useTypedSelector from '../../hooks/useTypedSelector'
import useActions from '../../hooks/useActions'
import Loader from '../loader/loader'

import './article.scss'

interface IProps {
  id: string
}

const Article: React.FC<IProps> = (props) => {
  const { fetchArticleFull, fetchDeleteArticle, fetchFavoritesArticle } = useActions()
  const { article, authentication } = useTypedSelector((state) => state)
  const { articalFull } = article

  const text = 'Are you sure to delete this article?'
  const confirm = () => {
    fetchDeleteArticle(authentication.user.token, props.id)
  }

  const { title, description, body, tagList, createdAt, favorited, favoritesCount, author } = articalFull

  useEffect(() => {
    authentication.login ? fetchArticleFull(props.id, authentication.user.token) : fetchArticleFull(props.id)
  }, [authentication.login])

  const clickLike = () => {
    fetchFavoritesArticle(authentication.user.token, props.id, favorited)
  }

  const cropText = (text: string, len: number) => {
    if (text.length > len) {
      return `${text.slice(0, len)}...`
    }
    return text
  }

  const content =
    article.loading === true ? (
      <Loader />
    ) : (
      <section className="artical">
        <div className="artical__content">
          <div className="artical__header">
            <h2 className="artical__title">{cropText(title, 15)}</h2>
            <button onClick={clickLike} disabled={!authentication.login} className="artical__like">
              <Heart favorited={favorited}></Heart>
            </button>
            <span className="artical__fans">{favoritesCount}</span>
          </div>
          <div className="artical__tabs">
            <Tags tagList={tagList}></Tags>
          </div>
          <p className="artical__description">{cropText(description, 250)}</p>
          <ReactMarkdown className="artical__body">{body}</ReactMarkdown>
        </div>
        <div className="artical__user user">
          <div className="user__discription">
            <h2 className="user__name">{cropText(author.username, 10)}</h2>
            <span className="user__data">{format(new Date(createdAt), 'LLLL, d, Y')} </span>
          </div>
          <div className="user__imagebox">
            <img className="user__image" src={author.image} alt="user" />
          </div>
          <Popconfirm placement="rightTop" title={text} onConfirm={confirm} okText="Yes" cancelText="No">
            <Button disabled={!authentication.login} className="user__button red">
              Delete
            </Button>
          </Popconfirm>
          <Link to={`/articles/${props.id}/edit`}>
            <Button disabled={!authentication.login} className="user__button green">
              Edit
            </Button>
          </Link>
        </div>
      </section>
    )

  return content
}

export default Article
