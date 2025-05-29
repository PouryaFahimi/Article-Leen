import { Children } from "react";
import { FieldValues, useForm, Controller } from "react-hook-form";

export interface LoginData {
  username: string;
  password: string;
}

interface Props {
  children: string;
  onSubmit: (data: LoginData) => void;
}

const Form = ({ children, onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<LoginData>();

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        reset();
      })}
    >
      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          Name
        </label>
        <input
          {...register("username", { required: true, minLength: 3 })}
          id="username"
          type="text"
          className="form-control"
          autoComplete="on"
        />
        {errors.username?.type === "required" && (
          <p className="text-danger">This field is required</p>
        )}
        {errors.username?.type === "minLength" && (
          <p className="text-danger">
            This field must be at least 3 characters
          </p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          {...register("password", { required: true, minLength: 3 })}
          id="password"
          type="password"
          className="form-control"
          autoComplete="on"
        />
        {errors.password?.type === "required" && (
          <p className="text-danger">This field is required</p>
        )}
        {errors.password?.type === "minLength" && (
          <p className="text-danger">
            This field must be at least 3 characters
          </p>
        )}
      </div>
      <button className="btn btn-primary mt-3" type="submit">
        {children}
      </button>
    </form>
  );
};

export default Form;
