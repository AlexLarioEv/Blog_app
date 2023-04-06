import React from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { Redirect } from 'react-router-dom'

import useActions from '../../hooks/useActions'
import useTypedSelector from '../../hooks/useTypedSelector'

import './newArticle.scss'

type FormValues = {
  title: string
  description: string
  body: string
  cart: {
    name: string
  }[]
}

function NewArticle() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      title: '',
      description: '',
      body: '',
      cart: [{ name: '' }],
    },
  })

  const { fetchNewArticle } = useActions()
  const { authentication } = useTypedSelector((state) => state)

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'cart',
  })

  const onSubmit = (data: FormValues) => {
    const { title, description, body, cart } = data
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

  if (authentication.login) {
    return (
      <form className="new-article" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="new-article__title">Create new article</h1>

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
          {fields.map((field, index) => {
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
  return <Redirect to="/sign-up"></Redirect>
}

export default NewArticle
