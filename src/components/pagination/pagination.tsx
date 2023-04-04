/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from "react";

import { Pagination } from "antd";
import useActions from "../../hooks/useActions";
import useTypedSelector from "../../hooks/useTypedSelector";

import "./pagination.scss";

const PaginationArticle: React.FC = () => {
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(0);

  const { article, authentication } = useTypedSelector((state) => state);
  const { fetchArticle } = useActions();

  const onChange: ((page: number, pageSize?: number) => void) | undefined = (
    page
  ) => {
    setPage(page);
    setOffset((page - 1) * 5);
  };

  useEffect(() => {
    authentication.login
      ? fetchArticle(5, offset, authentication.user.token)
      : fetchArticle(5, offset);
  }, [offset, authentication.login, article.articalFull]);

  return (
    <Fragment>
      {article.data.length !== 0 && (
        <Pagination
          className="pagination"
          current={page}
          defaultPageSize={5}
          total={article.articlesCount}
          onChange={(page) => onChange(page)}
          pageSizeOptions={[5]}
        />
      )}
    </Fragment>
  );
};

export default PaginationArticle;
