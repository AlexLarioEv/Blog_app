import {
  IArticleState,
  TArticleAction,
  EArticleActionTypes,
} from "../../types/article";

const initState: IArticleState = {
  data: [],
  articalFull: {
    slug: "",
    title: "",
    description: "",
    body: "",
    tagList: [],
    createdAt: "2023-03-29T19:20:38.938Z",
    updatedAt: "2023-03-29T19:20:38.938Z",
    favorited: false,
    favoritesCount: 0,
    author: {
      username: "",
      bio: "",
      image: "",
      following: false,
    },
  },
  articlesCount: 0,
  articleSkip: 0,
  identificator: "",
  loading: false,
  error: null,
};

const ArticleReducer = (
  state = initState,
  action: TArticleAction
): IArticleState => {
  switch (action.type) {
    case EArticleActionTypes.FETCH_ARTICLE:
      return { ...state, loading: true, error: null };
    case EArticleActionTypes.FETCH_ARTICLE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload.articles,
        articlesCount: action.payload.articlesCount,
      };
    case EArticleActionTypes.FETCH_ARTICLE_ERROR:
      return { ...state, loading: false, error: action.payload };
    case EArticleActionTypes.FETCH_SEARCH_ID:
      return {
        ...state,
        loading: false,
        error: null,
        identificator: action.payload,
      };
    case EArticleActionTypes.FETCH_ARTICLE_FULL_SUCCESS:
      return { ...state, loading: false, articalFull: action.payload };
    case EArticleActionTypes.FETCH_ARTICLE_DELETE:
      return {
        ...state,
        loading: false,
        articalFull: {
          slug: "",
          title: "",
          description: "",
          body: "",
          tagList: [],
          createdAt: "2023-03-29T19:20:38.938Z",
          updatedAt: "2023-03-29T19:20:38.938Z",
          favorited: false,
          favoritesCount: 0,
          author: {
            username: "",
            bio: "",
            image: "",
            following: false,
          },
        },
      };
    default:
      return state;
  }
};
export default ArticleReducer;
