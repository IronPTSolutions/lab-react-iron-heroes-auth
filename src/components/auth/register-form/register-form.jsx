import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { register as registerUser } from "../../../services/auth-service";

function RegisterForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await registerUser(data);
      navigate("/login");
    } catch (error) {
      const serverErrors = error?.response?.data?.errors ?? {};

      Object.entries(serverErrors).forEach(([field, message]) => {
        setError(field, { type: "server", message });
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
      <div className="col-md-6">
        <label htmlFor="name" className="form-label">
          Nombre
        </label>
        <div className="input-group">
          <span className="input-group-text">
            <i className="fa fa-user" aria-hidden="true" />
          </span>
          <input
            id="name"
            type="text"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            placeholder="Tu nombre"
            {...register("name", {
              required: "El nombre es obligatorio",
            })}
          />
        </div>
        {errors.name && (
          <div className="invalid-feedback d-block">{errors.name.message}</div>
        )}
      </div>

      <div className="col-md-6">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <div className="input-group">
          <span className="input-group-text">
            <i className="fa fa-envelope" aria-hidden="true" />
          </span>
          <input
            id="email"
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            placeholder="tu@email.com"
            {...register("email", {
              required: "El email es obligatorio",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "El email no es válido",
              },
            })}
          />
        </div>
        {errors.email && (
          <div className="invalid-feedback d-block">{errors.email.message}</div>
        )}
      </div>

      <div className="col-md-6">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <div className="input-group">
          <span className="input-group-text">
            <i className="fa fa-at" aria-hidden="true" />
          </span>
          <input
            id="username"
            type="text"
            className={`form-control ${errors.username ? "is-invalid" : ""}`}
            placeholder="username"
            {...register("username", {
              required: "El username es obligatorio",
              minLength: {
                value: 3,
                message: "Debe tener al menos 3 caracteres",
              },
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
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <div className="input-group">
          <span className="input-group-text">
            <i className="fa fa-lock" aria-hidden="true" />
          </span>
          <input
            id="password"
            type="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            placeholder="********"
            {...register("password", {
              required: "La contraseña es obligatoria",
              minLength: {
                value: 6,
                message: "La contraseña debe tener al menos 6 caracteres",
              },
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
          {isSubmitting ? "Creando cuenta..." : "Registrarse"}
        </button>
      </div>
    </form>
  );
}

export default RegisterForm;
