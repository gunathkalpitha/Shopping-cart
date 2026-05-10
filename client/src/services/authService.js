import api from './api';

export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

export const signup = async (userData) => {
  const response = await api.post('/auth/signup', userData);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

export const googleLogin = async (token) => {
  const response = await api.post('/auth/google', { token });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

export const facebookLogin = async (token) => {
  const response = await api.post('/auth/facebook', { token });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

export const passkeyLogin = async (credentialId) => {
  const response = await api.post('/auth/passkey', { credentialId });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
};
