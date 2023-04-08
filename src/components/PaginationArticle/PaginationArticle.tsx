import React, { Fragment, useEffect, useState } from 'react'
import { Pagination } from 'antd'

import useActions from '../../hooks/useActions'
import useTypedSelector from '../../hooks/useTypedSelector'

import './PaginationArticle.scss'

const PaginationArticle: React.FC = () => {
  const [page, setPage] = useState(1)
  const [offset, setOffset] = useState(0)

  const { article, authentication } = useTypedSelector((state) => state)
  const { fetchArticle } = useActions()

  const onChange: ((pageNumber: number, pageSize?: number) => void) | undefined = (pageNumber) => {
    setPage(pageNumber)
    setOffset((pageNumber - 1) * 5)
  }

  useEffect(() => {
    authentication.login ? fetchArticle(5, offset, authentication.user.token) : fetchArticle(5, offset)
  }, [offset, authentication.login, article.articalFull])

  return (
    <Fragment>
      {article.data.length !== 0 && (
        <Pagination
          className="pagination"
          current={page}
          defaultPageSize={5}
          total={article.articlesCount}
          onChange={(pageNumber) => onChange(pageNumber)}
          pageSizeOptions={[5]}
        />
      )}
    </Fragment>
  )
}

export default PaginationArticle
