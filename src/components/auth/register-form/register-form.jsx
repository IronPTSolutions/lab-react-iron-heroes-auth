import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { register as registerUser } from '../../../services/auth-service';

function RegisterForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid, isSubmitting }
  } = useForm({ mode: 'onChange' });

  const onSubmit = async (data) => {
    try {
      await registerUser(data);
      navigate('/login');
    } catch (error) {
      const response = error.response;

      if (response?.status === 400) {
        const serverErrors = response.data.errors ?? {};

        Object.entries(serverErrors).forEach(([field, message]) => {
          setError(field, { type: 'server', message });
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Nombre</label>
        <div className="input-group">
          <span className="input-group-text"><i className="fa fa-user" aria-hidden="true"></i></span>
          <input
            id="name"
            type="text"
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            {...register('name', { required: 'El nombre es obligatorio' })}
          />
          {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <div className="input-group">
          <span className="input-group-text"><i className="fa fa-envelope" aria-hidden="true"></i></span>
          <input
            id="email"
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            {...register('email', { required: 'El email es obligatorio' })}
          />
          {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
        </div>
      </div>

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
        Registrarse
      </button>
    </form>
  );
}

export default RegisterForm;
