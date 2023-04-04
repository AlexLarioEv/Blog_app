import React, { Fragment } from "react";

import ArticleCard from "../articleCard/articleCard";
import useTypedSelector from "../../hooks/useTypedSelector";

import "./listArticle.scss";
import Loader from "../loader/loader";
import PaginationArticle from "../pagination/pagination";

const ListArticle: React.FC = () => {
  const { article } = useTypedSelector((state) => state);

  const content = article.data.map((el) => {
    const {
      title,
      slug,
      description,
      body,
      tagList,
      createdAt,
      updatedAt,
      favorited,
      favoritesCount,
      author,
    } = el;
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
    );
  });

  return (
    <Fragment>
      <ul className="list">
        {article.loading === true ? <Loader /> : content}
      </ul>
      <PaginationArticle></PaginationArticle>
    </Fragment>
  );
};

export default ListArticle;
