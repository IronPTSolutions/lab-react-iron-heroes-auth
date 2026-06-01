import { useNavigate } from "react-router-dom";
import * as AuthService from "../../../services/auth-service";
import { useForm } from "react-hook-form";

function LoginForm() {
  const navigate = useNavigate();

  const {
    register, // conectar inputs
    handleSubmit, // envolver el onSubmit
    setError, // pintar errores del servidor
    formState: { errors, isValid }, // estado del formulario
  } = useForm({ mode: "all" });

  async function onSubmit(credentials) {
    try {
      const { user, token } = await AuthService.login(credentials);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      navigate("/heroes");
    } catch (error) {
      if (error.response?.status === 401) {
        Object.keys(error.response.data.message).forEach((inputName) => {
          setError(inputName, error.response.data.message[inputName]);
        });
      }
    }
  }

  // TODO Iteration 3 | Formulario de login
  //
  // Construye un formulario controlado con react-hook-form con dos campos
  // obligatorios: username y password (este ultimo de tipo password).
  //
  // Al enviar el formulario, llama a la funcion login de tu auth-service, que
  // devuelve un objeto con el usuario y un token:
  //   - Guarda el token y el usuario en el localStorage del navegador.
  //   - Redirige al usuario a la pagina del listado de heroes.
  //   - Si la API responde con un error 401, muestra el mensaje de credenciales
  //     incorrectas que llega en la respuesta del servidor.
  //
  // Reutiliza el mismo estilo de Bootstrap y Font Awesome que en el registro.

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/*USERNAME*/}
      <div className="input-group mb-1">
        <span className="input-group-text">
          <i className="fa fa-user fa-fw"></i>
        </span>
        <input
          type="text"
          {...register("username", { required: "El username es obligatorio" })}
          className={`form-control ${errors.username ? "is-invalid" : ""}`}
          placeholder="Username..."
        />
        {/* render condicional del error */}
        {errors.username && (
          <div className="invalid-feedback">{errors.username.message}</div>
        )}
      </div>

      {/*PASSWORD*/}
      <div className="input-group mb-1">
        <span className="input-group-text">
          <i className="fa fa-user fa-fw"></i>
        </span>
        <input
          type="password"
          {...register("password", { required: "El password es obligatorio" })}
          className={`form-control ${errors.password ? "is-invalid" : ""}`}
          placeholder="*********"
        />
        {/* render condicional del error */}
        {errors.password && (
          <div className="invalid-feedback">{errors.password.message}</div>
        )}
      </div>
      <div className="d-grid gap-2">
        <button type="submit" disabled={!isValid}>
          Iniciar sesión
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
