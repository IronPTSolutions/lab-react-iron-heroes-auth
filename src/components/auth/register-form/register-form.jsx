import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { register as registerUser } from '../../../services/auth-service';

function RegisterForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({ mode: 'onChange' });

  const onSubmit = async (formData) => {
    try {
      await registerUser(formData);
      navigate('/login');
    } catch (error) {
      const serverErrors = error.response?.data?.errors;
      if (error.response?.status === 400 && serverErrors) {
        Object.entries(serverErrors).forEach(([field, message]) => {
          setError(field, { type: 'server', message });
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="mb-3">
        <label className="form-label" htmlFor="name">Nombre</label>
        <div className="input-group">
          <span className="input-group-text"><i className="fa fa-user" aria-hidden="true"></i></span>
          <input
            id="name"
            type="text"
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            {...register('name', { required: 'El nombre es obligatorio' })}
          />
        </div>
        {errors.name && <div className="text-danger small mt-1">{errors.name.message}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label" htmlFor="email">Email</label>
        <div className="input-group">
          <span className="input-group-text"><i className="fa fa-envelope" aria-hidden="true"></i></span>
          <input
            id="email"
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            {...register('email', { required: 'El email es obligatorio' })}
          />
        </div>
        {errors.email && <div className="text-danger small mt-1">{errors.email.message}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label" htmlFor="username">Username</label>
        <div className="input-group">
          <span className="input-group-text"><i className="fa fa-id-badge" aria-hidden="true"></i></span>
          <input
            id="username"
            type="text"
            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
            {...register('username', { required: 'El username es obligatorio' })}
          />
        </div>
        {errors.username && <div className="text-danger small mt-1">{errors.username.message}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label" htmlFor="password">Password</label>
        <div className="input-group">
          <span className="input-group-text"><i className="fa fa-lock" aria-hidden="true"></i></span>
          <input
            id="password"
            type="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            {...register('password', { required: 'La contrasena es obligatoria' })}
          />
        </div>
        {errors.password && <div className="text-danger small mt-1">{errors.password.message}</div>}
      </div>

      <button type="submit" className="btn btn-primary" disabled={!isValid}>
        Registrarse
      </button>
    </form>
  );
}

export default RegisterForm;
