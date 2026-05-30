import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as AuthService from "../../../services/auth-service";

function RegisterForm() {
  const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({ mode: 'all' });
  const navigate = useNavigate();

  const handleRegister = async (user) => {
    try {
      await AuthService.register(user);
      navigate('/login');
    } catch (error) {
      console.error(error);
      if (error.response?.status === 400) {
        Object.keys(error.response.data.errors).forEach((inputName) => {
          setError(inputName, { type: 'custom', message: error.response.data.errors[inputName] });
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(handleRegister)}>
      <div className="input-group mb-1">
        <span className="input-group-text"><i className="fa fa-user fa-fw"></i></span>
        <input type="text" {...register('name', { required: 'El nombre es obligatorio' })} className={`form-control ${errors.name ? 'is-invalid' : ''}`} placeholder="Nombre" />
        {errors.name && (<div className="invalid-feedback">{errors.name.message}</div>)}
      </div>

      <div className="input-group mb-1">
        <span className="input-group-text"><i className="fa fa-envelope-o fa-fw"></i></span>
        <input type="email" {...register('email', { required: 'El email es obligatorio' })} className={`form-control ${errors.email ? 'is-invalid' : ''}`} placeholder="user@example.org" />
        {errors.email && (<div className="invalid-feedback">{errors.email.message}</div>)}
      </div>

      <div className="input-group mb-1">
        <span className="input-group-text"><i className="fa fa-tag fa-fw"></i></span>
        <input type="text" {...register('username', { required: 'El username es obligatorio' })} className={`form-control ${errors.username ? 'is-invalid' : ''}`} placeholder="username" />
        {errors.username && (<div className="invalid-feedback">{errors.username.message}</div>)}
      </div>

      <div className="input-group mb-2">
        <span className="input-group-text"><i className="fa fa-lock fa-fw"></i></span>
        <input type="password" {...register('password', { required: 'La contrasena es obligatoria' })} className={`form-control ${errors.password ? 'is-invalid' : ''}`} placeholder="***********" />
        {errors.password && (<div className="invalid-feedback">{errors.password.message}</div>)}
      </div>

      <div className="d-grid gap-2">
        <button className="btn btn-primary" type="submit" disabled={!isValid}>Registrarse</button>
      </div>
    </form>
  );
}

export default RegisterForm;
