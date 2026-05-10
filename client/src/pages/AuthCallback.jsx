import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getMe } from '../services/authService';
import toast from 'react-hot-toast';

export default function AuthCallback() {
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      navigate('/login');
      return;
    }
    localStorage.setItem('token', token);
    getMe()
      .then(({ data }) => {
        login(token, data);
        toast.success(`Welcome, ${data.name}!`);
        navigate('/');
      })
      .catch(() => {
        localStorage.removeItem('token');
        navigate('/login');
      });
  }, []);

  return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
    </div>
  );
}
