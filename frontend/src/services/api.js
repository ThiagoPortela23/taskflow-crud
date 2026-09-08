import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

export const tarefasService = {
  listar: (params = {}) => api.get('/tarefas', { params }),
  buscar: (id) => api.get(`/tarefas/${id}`),
  criar: (dados) => api.post('/tarefas', dados),
  atualizar: (id, dados) => api.put(`/tarefas/${id}`, dados),
  excluir: (id) => api.delete(`/tarefas/${id}`),
};

export default api;
