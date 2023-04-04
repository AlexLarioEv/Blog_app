/* eslint-disable no-restricted-globals */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Redirect } from "react-router-dom";

import useActions from "../../hooks/useActions";
import useTypedSelector from "../../hooks/useTypedSelector";

import "./signIn.scss";

interface ISignIn {
  username: string;
  email: string;
  password: string;
  "repeat-password": string;
  "personal-information": Array<string>;
}

export function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      "repeat-password": "",
      "personal-information": [
        "I agree to the processing of my personal  information",
      ],
    },
  });

  const [password, setPassword] = useState("");
  const { authentication } = useTypedSelector((state) => state);

  const { fetchRegister } = useActions();

  const onChangePassword: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = (formData: ISignIn) => {
    const fetchData = {
      user: {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      },
    };
    fetchRegister(fetchData);
  };
  if (!authentication.login) {
    return (
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="form__title">Create new account</h1>

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
          {(errors["username"] || authentication.error !== null) && (
            <p className="input__error" role="alert">
              {errors["username"]?.message} {authentication.error?.username}
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
          {(errors["email"] || authentication.error !== null) && (
            <p className="input__error" role="alert">
              {errors["email"]?.message} {authentication.error?.email}
            </p>
          )}
        </div>

        <div className="input">
          <label className="input__wrapper">
            <span className="input__name">Password</span>
            <input
              className="input__line"
              {...register("password", {
                required: "Пожалуйста, заполните это поле.",
                onChange: onChangePassword,
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
            <span className="input__name">Repeat Password</span>
            <input
              className="input__line"
              {...register("repeat-password", {
                required: "Пожалуйста, заполните это поле.",
                minLength: {
                  value: 6,
                  message: "password должен быть от 6 до 40 символов",
                },
                maxLength: {
                  value: 40,
                  message: "password должен быть от 6 до 40 символов",
                },
                validate: (v) =>
                  v === password ||
                  "password и repeat password должны совпадать",
              })}
              aria-invalid={errors["repeat-password"] ? "true" : "false"}
              placeholder="Repeat Password"
              type="password"
            />
          </label>
          {errors["repeat-password"] && (
            <p className="input__error" role="alert">
              {errors["repeat-password"]?.message}
            </p>
          )}
        </div>

        <div className="checkbox">
          <label className="checkbox__wrapper custom-checkbox">
            <input
              {...register("personal-information", {
                required:
                  "Галочка согласия с обработкой персональных данных должна быть отмечена",
              })}
              aria-invalid={errors["personal-information"] ? "true" : "false"}
              type="checkbox"
            />
            <span className="checkbox__name">
              I agree to the processing of my personal information
            </span>
          </label>
          {errors["personal-information"] && (
            <p className="input__error" role="alert">
              {errors["personal-information"]?.message}
            </p>
          )}
        </div>
        <button className="form__button" disabled={isSubmitting}>
          Submit
        </button>
        <span className="form__link">
          Already have an account?{" "}
          <Link className="link" to={"/sign-up"}>
            Sign Up
          </Link>
          .
        </span>
      </form>
    );
  } else {
    return <Redirect to={"/"}></Redirect>;
  }
}
