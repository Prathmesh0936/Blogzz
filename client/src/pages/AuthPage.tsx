import { useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authApi } from '../api';
import { authStore } from '../store/authStore';

const AuthPage = () => {
  const navigate = useNavigate();
  const { mode = 'login' } = useParams();
  const isRegister = mode === 'register';
  const { setAuth } = authStore();

  const [form, setForm] = useState({
    username: '',
    email: '',
    identifier: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const title = useMemo(() => (isRegister ? 'Create account' : 'Welcome back'), [isRegister]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      const payload = isRegister
        ? await authApi.register({
            username: form.username,
            email: form.email,
            password: form.password,
          })
        : await authApi.login({
            identifier: form.identifier,
            password: form.password,
          });
      setAuth(payload.user, payload.token);
      toast.success(isRegister ? 'Account created' : 'Logged in');
      navigate('/');
    } catch (error: any) {
      const message = error?.response?.data?.message || 'Authentication failed';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page auth-page">
      <h1>{title}</h1>
      <form className="card" onSubmit={handleSubmit}>
        {isRegister && (
          <label>
            Username
            <input name="username" value={form.username} onChange={handleChange} required minLength={3} />
          </label>
        )}
        {isRegister ? (
          <label>
            Email
            <input name="email" type="email" value={form.email} onChange={handleChange} required />
          </label>
        ) : (
          <label>
            Email or username
            <input name="identifier" value={form.identifier} onChange={handleChange} required />
          </label>
        )}
        <label>
          Password
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            minLength={6}
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'Please wait...' : isRegister ? 'Register' : 'Login'}
        </button>
      </form>
      <p>
        {isRegister ? 'Already have an account?' : 'Need an account?'}{' '}
        <Link to={isRegister ? '/auth/login' : '/auth/register'}>
          {isRegister ? 'Log in' : 'Register'}
        </Link>
      </p>
    </section>
  );
};

export default AuthPage;

