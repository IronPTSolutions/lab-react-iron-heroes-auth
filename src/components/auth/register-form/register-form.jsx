import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as AuthService from "../../../services/auth-service";

function RegisterForm() {
  // TODO Iteration 2 | Formulario de registro
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    mode: "all",
  });

  const handleRegister = async (user) => {
    try {
      await AuthService.register(user);
      navigate("/login");
    } catch (error) {
      console.log(error);

      if (error.response?.status === 400) {
        const serverErrors = error.response.data.errors;

        if (serverErrors) {
          Object.keys(serverErrors).forEach((field) => {
            setError(field, {
              type: "server",
              message: serverErrors[field],
            });
          });
        }
      }
    }
  };

  // Construye un formulario controlado con react-hook-form que permita registrar
  // un usuario. Debe tener cuatro campos obligatorios: nombre, email, username y
  // password (este ultimo como campo de tipo password).
  //
  // Al enviar el formulario, llama a la funcion register de tu auth-service:
  //   - Si el registro funciona, redirige al usuario a la pagina de login.
  //   - Si la API responde con un error 400, muestra junto a cada campo el mensaje
  //     de error que llega en la respuesta del servidor.
  //
  // Maqueta el formulario con Bootstrap (input-group e iconos de Font Awesome) y
  // deshabilita el boton de enviar mientras el formulario no sea valido.

  return (
    <form onSubmit={handleSubmit(handleRegister)}>

      <div className="input-group mb-3">
        <span className="input-group-text">
          <i className="fa fa-user"></i>
        </span>

        <input
          type="text"
          className={`form-control ${errors.name ? "is-invalid" : ""}`}
          placeholder="Name"
          {...register("name", {
            required: "Name is required",
          })}
        />
      </div>

      {errors.name && (
        <div className="text-danger">
          {errors.name.message}
        </div>
      )}

      <div className="input-group mb-3">
        <span className="input-group-text">
          <i className="fa fa-envelope"></i>
        </span>

        <input
          type="email"
          className={`form-control ${errors.email ? "is-invalid" : ""}`}
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
          })}
        />
      </div>

      {errors.email && (
        <div className="text-danger">
          {errors.email.message}
        </div>
      )}

      <div className="input-group mb-3">
        <span className="input-group-text">
          <i className="fa fa-user"></i>
        </span>

        <input
          type="text"
          className={`form-control ${errors.username ? "is-invalid" : ""}`}
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
          className={`form-control ${errors.password ? "is-invalid" : ""}`}
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
        className="btn btn-primary"
      >
        Register
      </button>
    </form>
  );
}

export default RegisterForm;