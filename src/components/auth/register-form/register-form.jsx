import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as AuthService from "../../../services/auth-service";

function RegisterForm() {
  const {
    register, // conectar inputs
    handleSubmit, // envolver el onSubmit
    setError, // pintar errores del servidor
    formState: { errors, isValid }, // estado del formulario
  } = useForm({ mode: "all" });

  const navigate = useNavigate();

  async function onSubmit(user) {
    console.log("onSubmit llamado", user);
    try {
      const result = await AuthService.register(user);
       console.log("registro exitoso", result);
      
      navigate("/login");
    } catch (error) {
      console.log("error.response.data", error.response?.data)
      if (error.response?.status === 400) {
        Object.keys(error.response.data.errors).forEach((field) => {
          setError(field, error.response.data.errors[field]);
        });
      }
    }
  }
  // TODO Iteration 2 | Formulario de registro
  //
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
    <form onSubmit={handleSubmit(onSubmit)}>
      {/*NOMBRE*/}
      <div className="input-group mb-1">
        <span className="input-group-text">
          <i className="fa fa-user fa-fw"></i>
        </span>
        <input
          type="text"
          {...register("name", { required: "El name es obligatorio" })}
          className={`form-control ${errors.username ? "is-invalid" : ""}`}
          placeholder="Nombre..."
        />
        {/* render condicional del error */}
        {errors.name && (
          <div className="invalid-feedback">{errors.name.message}</div>
        )}
      </div>

      {/*EMAIL*/}
      <div className="input-group mb-1">
        <span className="input-group-text">
          <i className="fa fa-user fa-fw"></i>
        </span>
        <input
          type="email"
          {...register("email", { required: "El email es obligatorio" })}
          className={`form-control ${errors.email ? "is-invalid" : ""}`}
          placeholder="e-mail"
        />
        {/* render condicional del error */}
        {errors.email && (
          <div className="invalid-feedback">{errors.email.message}</div>
        )}
      </div>

      {/*USERNAME*/}
      <div className="input-group mb-1">
        <span className="input-group-text">
          <i className="fa fa-user fa-fw"></i>
        </span>
        <input
          type="text"
          {...register("username", { required: "El username es obligatorio" })}
          className={`form-control ${errors.username ? "is-invalid" : ""}`}
          placeholder="username"
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
          Registrarse
        </button>
      </div>
    </form>
  );
}

export default RegisterForm;
