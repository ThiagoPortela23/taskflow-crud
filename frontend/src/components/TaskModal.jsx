import { useState, useEffect } from 'react';

const EMPTY_FORM = {
  titulo: '',
  descricao: '',
  status: 'pendente',
  prioridade: 'media',
};

export default function TaskModal({ isOpen, onClose, onSave, tarefa }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (tarefa) {
      setForm({
        titulo: tarefa.titulo || '',
        descricao: tarefa.descricao || '',
        status: tarefa.status || 'pendente',
        prioridade: tarefa.prioridade || 'media',
      });
    } else {
      setForm(EMPTY_FORM);
    }
    setError('');
  }, [tarefa, isOpen]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.titulo.trim()) {
      setError('O título é obrigatório.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await onSave(form);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao salvar tarefa.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{tarefa ? 'Editar Tarefa' : 'Nova Tarefa'}</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {error && <div className="form-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="titulo">Título *</label>
            <input
              id="titulo"
              name="titulo"
              type="text"
              value={form.titulo}
              onChange={handleChange}
              placeholder="Digite o título da tarefa..."
              maxLength={200}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="descricao">Descrição</label>
            <textarea
              id="descricao"
              name="descricao"
              value={form.descricao}
              onChange={handleChange}
              placeholder="Adicione uma descrição (opcional)..."
              rows={3}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select id="status" name="status" value={form.status} onChange={handleChange}>
                <option value="pendente">Pendente</option>
                <option value="em_andamento">Em Andamento</option>
                <option value="concluida">Concluída</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="prioridade">Prioridade</label>
              <select id="prioridade" name="prioridade" value={form.prioridade} onChange={handleChange}>
                <option value="baixa">Baixa</option>
                <option value="media">Média</option>
                <option value="alta">Alta</option>
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={onClose} disabled={loading}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Salvando...' : tarefa ? 'Salvar Alterações' : 'Criar Tarefa'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
