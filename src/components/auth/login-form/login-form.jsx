import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { login } from '../../../services/auth-service';

function LoginForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid, isSubmitting }
  } = useForm({ mode: 'onChange' });

  const onSubmit = async (data) => {
    try {
      const { user, token } = await login(data);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/heroes');
    } catch (error) {
      const response = error.response;

      if (response?.status === 401) {
        const message = response.data.errors?.username ?? response.data.message;
        setError('username', { type: 'server', message });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="mb-3">
        <label htmlFor="username" className="form-label">Username</label>
        <div className="input-group">
          <span className="input-group-text"><i className="fa fa-id-badge" aria-hidden="true"></i></span>
          <input
            id="username"
            type="text"
            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
            {...register('username', { required: 'El username es obligatorio' })}
          />
          {errors.username && <div className="invalid-feedback">{errors.username.message}</div>}
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <div className="input-group">
          <span className="input-group-text"><i className="fa fa-lock" aria-hidden="true"></i></span>
          <input
            id="password"
            type="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            {...register('password', { required: 'La contrasena es obligatoria' })}
          />
          {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
        </div>
      </div>

      <button type="submit" className="btn btn-primary" disabled={!isValid || isSubmitting}>
        Entrar
      </button>
    </form>
  );
}

export default LoginForm;
