export interface INewArticle {
  article: {
    title: string
    description: string
    body: string
    tagList: string[]
  }
}

export interface IEditArticle {
  article: {
    title: string
    description: string
    body: string
  }
}

export interface IArticle {
  slug: string
  title: string
  description: string
  body: string
  tagList: string[]
  createdAt: string
  updatedAt: string
  favorited: boolean
  favoritesCount: number
  author: {
    username: string
    bio: string
    image: string
    following: boolean
  }
}

export interface IArticleState {
  data: Array<IArticle> | []
  articalFull: IArticle
  articlesCount: number
  articleSkip: number
  identificator: string
  loading: boolean
  error: string | null
}

export enum EArticleActionTypes {
  FETCH_SEARCH_ID = 'FETCH_SEARCH_ID',
  FETCH_ARTICLE = 'FETCH_ARTICLE',
  FETCH_ARTICLE_SUCCESS = 'FETCH_ARTICLE_SUCCESS',
  FETCH_ARTICLE_FULL_SUCCESS = 'FETCH_ARTICLE_FULL_SUCCESS',
  FETCH_ARTICLE_ERROR = 'FETCH_ARTICLE_ERROR',
  FETCH_ARTICLE_DELETE = 'FETCH_ARTICLE_DELETE',
}

interface IFetchSearchId {
  type: EArticleActionTypes.FETCH_SEARCH_ID
  payload: string
}

interface IFetchArticleAction {
  type: EArticleActionTypes.FETCH_ARTICLE
}

interface IFetchArticleActionSuccess {
  type: EArticleActionTypes.FETCH_ARTICLE_SUCCESS
  payload: {
    articles: Array<IArticle> | []
    articlesCount: number
  }
}

interface IFetchArticleActionError {
  type: EArticleActionTypes.FETCH_ARTICLE_ERROR
  payload: string
}

interface IFetchArticleFullActionSuccess {
  type: EArticleActionTypes.FETCH_ARTICLE_FULL_SUCCESS
  payload: IArticle
}

interface IFetchArticleDeleteActionSuccess {
  type: EArticleActionTypes.FETCH_ARTICLE_DELETE
}

export type TArticleAction =
  | IFetchArticleAction
  | IFetchArticleActionSuccess
  | IFetchArticleFullActionSuccess
  | IFetchArticleActionError
  | IFetchSearchId
  | IFetchArticleDeleteActionSuccess
