import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { login as loginUser } from "../../../services/auth-service";

function LoginForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const { user, token } = await loginUser(data);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      navigate("/heroes");
    } catch (error) {
      const serverMessage = error?.response?.data?.errors?.username;

      if (serverMessage) {
        setError("username", {
          type: "server",
          message: serverMessage,
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
      <div className="col-md-6">
        <label htmlFor="login-username" className="form-label">
          Username
        </label>
        <div className="input-group">
          <span className="input-group-text">
            <i className="fa fa-user" aria-hidden="true" />
          </span>
          <input
            id="login-username"
            type="text"
            className={`form-control ${errors.username ? "is-invalid" : ""}`}
            placeholder="username"
            {...register("username", {
              required: "El username es obligatorio",
            })}
          />
        </div>
        {errors.username && (
          <div className="invalid-feedback d-block">
            {errors.username.message}
          </div>
        )}
      </div>

      <div className="col-md-6">
        <label htmlFor="login-password" className="form-label">
          Password
        </label>
        <div className="input-group">
          <span className="input-group-text">
            <i className="fa fa-lock" aria-hidden="true" />
          </span>
          <input
            id="login-password"
            type="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            placeholder="********"
            {...register("password", {
              required: "La contraseña es obligatoria",
            })}
          />
        </div>
        {errors.password && (
          <div className="invalid-feedback d-block">
            {errors.password.message}
          </div>
        )}
      </div>

      <div className="col-12">
        <button
          className="btn btn-primary"
          type="submit"
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? "Entrando..." : "Entrar"}
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
