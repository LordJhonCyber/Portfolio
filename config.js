// Configuração da API
const API_URL = 'http://localhost:5000/api';
const TIMEOUT = 5000;

// Função para fazer requisições
async function fetchAPI(endpoint, options = {}) {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const token = localStorage.getItem('token');
  if (token) {
    defaultOptions.headers.Authorization = `Bearer ${token}`;
  }

  const finalOptions = { ...defaultOptions, ...options };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, finalOptions);
    
    if (!response.ok) {
      throw new Error(`Erro: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
}

// Função para armazenar token
function setToken(token) {
  localStorage.setItem('token', token);
}

// Função para obter token
function getToken() {
  return localStorage.getItem('token');
}

// Função para remover token
function removeToken() {
  localStorage.removeItem('token');
}

// Função para verificar se está autenticado
function isAuthenticated() {
  return !!getToken();
}
