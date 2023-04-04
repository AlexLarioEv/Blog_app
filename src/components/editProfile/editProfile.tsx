import * as React from "react";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
import useActions from "../../hooks/useActions";
import useTypedSelector from "../../hooks/useTypedSelector";

import "./editProfile.scss";

export function EditProfile() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      image: "",
    },
  });
  const { authentication } = useTypedSelector((state) => state);

  const { fetchUpdate } = useActions();

  const onSubmit = (data: any) => {
    const fetchData = { user: data };
    fetchUpdate(fetchData, authentication.user.token);
  };
  if (authentication.login) {
    return (
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="form__title">Edit Profile</h1>

        {errors.root?.serverError && (
          <p>Something went wrong, and please try again.</p>
        )}

        <div className="input">
          <label className="input__wrapper">
            <span className="input__name">Username</span>
            <input
              className="input__line"
              {...register("username", {
                required: "Пожалуйста, заполните это поле.",
                minLength: {
                  value: 3,
                  message: "username должен быть от 3 до 20 символов",
                },
                maxLength: {
                  value: 20,
                  message: "username должен быть от 3 до 20 символов",
                },
              })}
              aria-invalid={errors["username"] ? "true" : "false"}
              placeholder="Username"
              type="text"
            />
          </label>
          {errors["username"] && (
            <p className="input__error" role="alert">
              {errors["username"]?.message}
            </p>
          )}
        </div>

        <div className="input">
          <label className="input__wrapper">
            <span className="input__name">Email address</span>
            <input
              className="input__line"
              {...register("email", {
                required: "email должен быть почтовым адресом",
              })}
              aria-invalid={errors["email"] ? "true" : "false"}
              placeholder="Email address"
              type="email"
            />
          </label>
          {errors["email"] && (
            <p className="input__error" role="alert">
              {errors["email"]?.message}
            </p>
          )}
        </div>

        <div className="input">
          <label className="input__wrapper">
            <span className="input__name">New password</span>
            <input
              className="input__line"
              {...register("password", {
                required: "Пожалуйста, заполните это поле.",
                minLength: {
                  value: 6,
                  message: "password должен быть от 6 до 40 символов",
                },
                maxLength: {
                  value: 40,
                  message: "password должен быть от 6 до 40 символов",
                },
              })}
              aria-invalid={errors["password"] ? "true" : "false"}
              placeholder="Password"
              type="password"
            />
          </label>
          {errors["password"] && (
            <p className="input__error" role="alert">
              {errors["password"]?.message}
            </p>
          )}
        </div>

        <div className="input">
          <label className="input__wrapper">
            <span className="input__name">Avatar image (url)</span>
            <input
              className="input__line"
              {...register("image")}
              placeholder="Avatar image"
              type="url"
            />
          </label>
          {errors["image"] && (
            <p className="input__error" role="alert">
              {errors["image"]?.message}
            </p>
          )}
        </div>
        <button className="form__button" disabled={isSubmitting}>
          Save
        </button>
      </form>
    );
  } else {
    return <Redirect to={"/sign-up"}></Redirect>;
  }
}
