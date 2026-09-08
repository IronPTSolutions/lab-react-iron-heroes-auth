import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as AuthService from "../../../services/auth-service";

function LoginForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    mode: "all",
  });

  // TODO Iteration 3 | Formulario de login
  //
  // Construye un formulario controlado con react-hook-form con dos campos
  // obligatorios: username y password (este ultimo de tipo password).

  const handleLogin = async (credentials) => {
    try {
      const response = await AuthService.login(credentials);

      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));

      navigate("/heroes");
    } catch (error) {
      console.log(error);

      if (error.response?.status === 401) {
        setError("username", {
          type: "server",
          message:
            error.response.data.errors?.username ||
            error.response.data.message ||
            "Incorrect username or password",
        });
      }
    }
  };

  // Al enviar el formulario, llama a la funcion login de tu auth-service, que
  // devuelve un objeto con el usuario y un token:
  //   - Guarda el token y el usuario en el localStorage del navegador.
  //   - Redirige al usuario a la pagina del listado de heroes.
  //   - Si la API responde con un error 401, muestra el mensaje de credenciales
  //     incorrectas que llega en la respuesta del servidor.
  //
  // Reutiliza el mismo estilo de Bootstrap y Font Awesome que en el registro.

  return (
    <form onSubmit={handleSubmit(handleLogin)}>

      <div className="input-group mb-3">
        <span className="input-group-text">
          <i className="fa fa-user"></i>
        </span>

        <input
          type="text"
          className={`form-control ${
            errors.username ? "is-invalid" : ""
          }`}
          placeholder="Username"
          {...register("username", {
            required: "Username is required",
          })}
        />
      </div>

      {errors.username && (
        <div className="text-danger">
          {errors.username.message}
        </div>
      )}

      <div className="input-group mb-3">
        <span className="input-group-text">
          <i className="fa fa-lock"></i>
        </span>

        <input
          type="password"
          className={`form-control ${
            errors.password ? "is-invalid" : ""
          }`}
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
          })}
        />
      </div>

      {errors.password && (
        <div className="text-danger">
          {errors.password.message}
        </div>
      )}

      <button
        type="submit"
        disabled={!isValid}
      >
        Login
      </button>
    </form>
  );
}

export default LoginForm;