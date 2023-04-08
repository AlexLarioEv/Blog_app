import React, { useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { Redirect } from 'react-router-dom'

import useActions from '../../hooks/useActions'
import useTypedSelector from '../../hooks/useTypedSelector'

import './FormArticle.scss'

type TFormValues = {
  title: string
  description: string
  body: string
  cart: {
    name: string
  }[]
}

type IEditArticleProps = {
  match: { params: { id?: string } }
}

const FormArticle: React.FC<IEditArticleProps> = (props) => {
  const { match } = props
  const { fetchEditArticle, fetchNewArticle, fetchArticleFull } = useActions()
  useEffect(() => {
    if (typeof match.params?.id !== 'undefined') {
      fetchArticleFull(match.params.id)
    }
  }, [])
  const { authentication, article } = useTypedSelector((state) => state)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TFormValues>({
    defaultValues: {
      cart: [{ name: '' }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'cart',
  })

  const onSubmit = (data: TFormValues) => {
    const { title, description, body, cart } = data
    if (typeof match.params?.id !== 'undefined') {
      const newData = {
        article: {
          title,
          description,
          body,
        },
      }
      fetchEditArticle(newData, authentication.user.token, match.params.id)
    } else {
      const newData = {
        article: {
          title,
          description,
          body,
          tagList: cart.map((tag) => tag.name),
        },
      }
      fetchNewArticle(newData, authentication.user.token)
    }
  }

  if (authentication.login) {
    return (
      <form className="new-article" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="new-article__title">{typeof match.params?.id === 'undefined' ? 'Create new article' : 'Edit article'}</h1>

        <div className="input-article">
          <label className="input-article__wrapper">
            <span className="input-article__name">Title</span>
            <input
              className="input-article__line"
              {...register('title', {
                required: 'обязателен для заполнения',
              })}
              aria-invalid={errors.title ? 'true' : 'false'}
              placeholder="Title"
              type="text"
              defaultValue={typeof match.params?.id === 'undefined' ? '' : `${article.articalFull.title}`}
            />
          </label>
          {errors.title && (
            <p className="input-article__error" role="alert">
              {errors.title?.message}
            </p>
          )}
        </div>

        <div className="input-article">
          <label className="input-article__wrapper">
            <span className="input-article__name">Short description</span>
            <input
              className="input-article__line"
              {...register('description', {
                required: 'обязателен для заполнения',
              })}
              aria-invalid={errors.description ? 'true' : 'false'}
              placeholder="Title"
              type="text"
              defaultValue={typeof match.params?.id === 'undefined' ? '' : `${article.articalFull.description}`}
            />
          </label>
          {errors.description && (
            <p className="input-article__error" role="alert">
              {errors.description?.message}
            </p>
          )}
        </div>

        <div className="input-article text">
          <label className="input-article__text">
            <span className="input-article__name">Text</span>
            <textarea
              className="input-article__textarea"
              {...register('body', {
                required: 'обязателен для заполнения',
              })}
              aria-invalid={errors.body ? 'true' : 'false'}
              placeholder="Text"
              defaultValue={typeof match.params?.id === 'undefined' ? '' : `${article.articalFull.body}`}
            />
          </label>
          {errors.body && (
            <p className="input-article__error" role="alert">
              {errors.body?.message}
            </p>
          )}
        </div>
        <span className="input-article__name">Tags</span>
        <ul className="card">
          {typeof match.params?.id !== 'undefined'
            ? article.articalFull.tagList.map((field, index) => {
                return (
                  <li className="card__item" key={field}>
                    <label>
                      <input
                        className="card__line"
                        {...register(`cart.${index}.name`, {
                          required: 'обязателен для заполнения',
                        })}
                        placeholder="Tag"
                        value={field}
                      />
                    </label>
                    <button disabled className="card__button red" type="button" onClick={() => remove(index)}>
                      Delete
                    </button>
                  </li>
                )
              })
            : fields.map((field, index) => {
                return (
                  <li className="card__item" key={field.id}>
                    <label>
                      <input
                        className="card__line"
                        {...register(`cart.${index}.name`, {
                          required: 'обязателен для заполнения',
                        })}
                        placeholder="Tag"
                      />
                    </label>
                    <button className="card__button red" type="button" onClick={() => remove(index)}>
                      Delete
                    </button>
                  </li>
                )
              })}
          <button
            disabled={typeof match.params?.id !== 'undefined'}
            className="card__button blau"
            type="button"
            onClick={() => {
              append({
                name: '',
              })
            }}
          >
            Add tag
          </button>
        </ul>
        {errors.cart && (
          <p className="input-article__error" role="alert">
            {errors.cart?.message}обязательны для заполнения
          </p>
        )}

        <button className="new-article__button" disabled={isSubmitting}>
          Submit
        </button>
      </form>
    )
  }
  return <Redirect to={'/sign-up'}></Redirect>
}
export default FormArticle
