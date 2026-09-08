import { useState, useEffect, useCallback } from 'react';
import { tarefasService } from './services/api';
import KanbanBoard from './components/KanbanBoard';
import TaskModal from './components/TaskModal';
import './App.css';

export default function App() {
  const [tarefas, setTarefas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [tarefaEditando, setTarefaEditando] = useState(null);
  const [busca, setBusca] = useState('');
  const [stats, setStats] = useState({ pendente: 0, em_andamento: 0, concluida: 0 });

  const carregarTarefas = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const params = busca ? { busca } : {};
      const res = await tarefasService.listar(params);
      const data = res.data.data;
      setTarefas(data);
      setStats({
        pendente: data.filter((t) => t.status === 'pendente').length,
        em_andamento: data.filter((t) => t.status === 'em_andamento').length,
        concluida: data.filter((t) => t.status === 'concluida').length,
      });
    } catch (err) {
      setError('Não foi possível carregar as tarefas. Verifique se o backend está rodando.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [busca]);

  useEffect(() => {
    const timer = setTimeout(carregarTarefas, 300);
    return () => clearTimeout(timer);
  }, [carregarTarefas]);

  const handleSalvar = async (dados) => {
    if (tarefaEditando) {
      await tarefasService.atualizar(tarefaEditando.id, dados);
    } else {
      await tarefasService.criar(dados);
    }
    await carregarTarefas();
  };

  const handleEditar = (tarefa) => {
    setTarefaEditando(tarefa);
    setModalOpen(true);
  };

  const handleNova = () => {
    setTarefaEditando(null);
    setModalOpen(true);
  };

  const handleExcluir = async (id) => {
    await tarefasService.excluir(id);
    await carregarTarefas();
  };

  const handleStatusChange = async (id, novoStatus) => {
    await tarefasService.atualizar(id, { status: novoStatus });
    await carregarTarefas();
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setTarefaEditando(null);
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <div className="header-brand">
            <div className="brand-icon">✦</div>
            <div>
              <h1 className="brand-title">TaskFlow</h1>
              <p className="brand-subtitle">Gerenciador de Tarefas</p>
            </div>
          </div>

          <div className="header-stats">
            <div className="stat-chip stat-pendente">
              <span>⏳</span>
              <span>{stats.pendente} pendentes</span>
            </div>
            <div className="stat-chip stat-andamento">
              <span>🔄</span>
              <span>{stats.em_andamento} em andamento</span>
            </div>
            <div className="stat-chip stat-concluida">
              <span>✅</span>
              <span>{stats.concluida} concluídas</span>
            </div>
          </div>

          <button className="btn-nova" onClick={handleNova} id="btn-nova-tarefa">
            <span>+</span> Nova Tarefa
          </button>
        </div>
      </header>

      {/* Search bar */}
      <div className="search-bar">
        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input
            id="input-busca"
            type="text"
            placeholder="Buscar tarefas por título..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="search-input"
          />
          {busca && (
            <button className="search-clear" onClick={() => setBusca('')}>✕</button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <main className="app-main">
        {error && (
          <div className="error-banner">
            <span>⚠️</span>
            <span>{error}</span>
            <button onClick={carregarTarefas}>Tentar novamente</button>
          </div>
        )}

        {loading ? (
          <div className="loading-state">
            <div className="spinner" />
            <p>Carregando tarefas...</p>
          </div>
        ) : (
          <KanbanBoard
            tarefas={tarefas}
            onEdit={handleEditar}
            onDelete={handleExcluir}
            onStatusChange={handleStatusChange}
          />
        )}
      </main>

      {/* Modal */}
      <TaskModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onSave={handleSalvar}
        tarefa={tarefaEditando}
      />
    </div>
  );
}
