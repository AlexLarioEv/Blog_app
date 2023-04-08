import React, { Fragment } from 'react'

import ArticleCard from '../ArticleCard'
import PaginationArticle from '../PaginationArticle'
import Loader from '../Loader'
import useTypedSelector from '../../hooks/useTypedSelector'

import './ListArticle.scss'

const ListArticle: React.FC = () => {
  const { article } = useTypedSelector((state) => state)

  const content = article.data.map((articaleContent) => {
    const { title, slug, description, body, tagList, createdAt, updatedAt, favorited, favoritesCount, author } = articaleContent
    return (
      <ArticleCard
        key={slug}
        slug={slug}
        title={title}
        description={description}
        body={body}
        tagList={tagList}
        createdAt={createdAt}
        updatedAt={updatedAt}
        favorited={favorited}
        favoritesCount={favoritesCount}
        author={author}
      ></ArticleCard>
    )
  })

  return (
    <Fragment>
      <ul className="list">{article.loading === true ? <Loader /> : content}</ul>
      <PaginationArticle></PaginationArticle>
    </Fragment>
  )
}

export default ListArticle
