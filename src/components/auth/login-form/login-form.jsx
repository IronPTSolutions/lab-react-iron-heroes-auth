import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as AuthService from "../../../services/auth-service";

function LoginForm() {
  const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({ mode: 'all' });
  const navigate = useNavigate();

  const handleLogin = async (credentials) => {
    try {
      const { user, token } = await AuthService.login(credentials);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/heroes');
    } catch (error) {
      console.error(error);
      if (error.response?.status === 401) {
        const responseErrors = error.response.data.errors ?? {};
        Object.keys(responseErrors).forEach((inputName) => {
          setError(inputName, { type: 'custom', message: responseErrors[inputName] });
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
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
        <button className="btn btn-primary" type="submit" disabled={!isValid}>Entrar</button>
      </div>
    </form>
  );
}

export default LoginForm;
