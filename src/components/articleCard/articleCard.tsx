import React from "react";
import { Link } from "react-router-dom";
import format from "date-fns/format";

import Heart from "../heart/heart";
import Tags from "../tag/tag";
import { IArticle } from "../../types/article";
import useActions from "../../hooks/useActions";
import useTypedSelector from "../../hooks/useTypedSelector";

import "./articleCard.scss";

const ArticleCard: React.FC<IArticle> = (props) => {
  const {
    slug,
    title,
    description,
    tagList,
    favoritesCount,
    favorited,
    author,
    createdAt,
  } = props;
  const { authentication } = useTypedSelector((state) => state);
  const cropText = (text: string, len: number) => {
    if (text.length > len) {
      return `${text.slice(0, len)}...`;
    }
    return text;
  };
  const { fetchFavoritesArticle } = useActions();

  const clickLuke = () => {
    fetchFavoritesArticle(authentication.user.token, slug, favorited);
  };

  return (
    <li className="artical">
      <div className="artical__content">
        <div className="artical__header">
          <Link to={`/articles/${slug}`}>
            <h2 className="artical__title">{cropText(title, 15)}</h2>
          </Link>
          <button
            className="artical__like"
            disabled={!authentication.login}
            onClick={clickLuke}
          >
            <Heart favorited={favorited}></Heart>
          </button>
          <span className="artical__fans">{favoritesCount}</span>
        </div>
        <div className="artical__tabs">
          <Tags tagList={tagList}></Tags>
        </div>
        <p className="artical__description">{cropText(description, 250)}</p>
      </div>
      <div className="artical__user user">
        <div className="user__discription">
          <h2 className="user__name">{cropText(author.username, 10)}</h2>
          <span className="user__data">
            {format(new Date(createdAt), "LLLL, d, Y")}
          </span>
        </div>
        <div className="user__imagebox">
          <img className="user__image" src={author.image} alt="user" />
        </div>
      </div>
    </li>
  );
};

export default ArticleCard;
