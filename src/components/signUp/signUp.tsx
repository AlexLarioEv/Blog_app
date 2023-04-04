/* eslint-disable no-restricted-globals */
import * as React from "react";
import { useForm } from "react-hook-form";
import { Link, Redirect } from "react-router-dom";
import useActions from "../../hooks/useActions";
import useTypedSelector from "../../hooks/useTypedSelector";

import "./signUp.scss";

export function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { authentication } = useTypedSelector((state) => state);

  const { fetchLogin } = useActions();

  const onSubmit = (data: any) => {
    const fetchData = { user: data };
    fetchLogin(fetchData);
  };
  if (!authentication.login) {
    return (
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="form__title">Sign In</h1>

        {errors.root?.serverError && (
          <p>Something went wrong, and please try again.</p>
        )}

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
              {errors["email"]?.message}{" "}
              {authentication.error?.["email or password"]}
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
          {(errors["password"] || authentication.error !== null) && (
            <p className="input__error" role="alert">
              {errors["password"]?.message}{" "}
              {authentication.error?.["email or password"]}
            </p>
          )}
        </div>
        <button className="form__button" disabled={isSubmitting}>
          Login
        </button>
        <span className="form__link">
          Already have an account?{" "}
          <Link className="link" to={"/sign-in"}>
            Sign In
          </Link>
          .
        </span>
      </form>
    );
  } else {
    return <Redirect to={"/"}></Redirect>;
  }
}
