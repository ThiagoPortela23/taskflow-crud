import { useState } from 'react';

const STATUS_LABELS = {
  pendente: 'Pendente',
  em_andamento: 'Em Andamento',
  concluida: 'Concluída',
};

const PRIORIDADE_LABELS = {
  baixa: 'Baixa',
  media: 'Média',
  alta: 'Alta',
};

const PRIORIDADE_COLORS = {
  baixa: '#4ade80',
  media: '#facc15',
  alta: '#f87171',
};

export default function TaskCard({ tarefa, onEdit, onDelete, onStatusChange, onDragStart, onDragEnd, isDragging }) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm('Deseja excluir esta tarefa?')) return;
    setDeleting(true);
    await onDelete(tarefa.id);
  };

  const nextStatus = {
    pendente: 'em_andamento',
    em_andamento: 'concluida',
    concluida: 'pendente',
  };

  const formattedDate = new Date(tarefa.createdAt).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
  });

  return (
    <div
      className={`task-card ${deleting ? 'deleting' : ''} ${isDragging ? 'task-card-dragging' : ''}`}
      data-prioridade={tarefa.prioridade}
      draggable={!deleting}
      onDragStart={(e) => onDragStart && onDragStart(e, tarefa.id)}
      onDragEnd={() => onDragEnd && onDragEnd()}
    >
      <div className="drag-handle" title="Arraste para mover">⠿</div>

      <div className="task-card-header">
        <span
          className="prioridade-badge"
          style={{ background: `${PRIORIDADE_COLORS[tarefa.prioridade]}22`, color: PRIORIDADE_COLORS[tarefa.prioridade], borderColor: `${PRIORIDADE_COLORS[tarefa.prioridade]}44` }}
        >
          ● {PRIORIDADE_LABELS[tarefa.prioridade]}
        </span>
        <span className="task-date">{formattedDate}</span>
      </div>

      <h3 className="task-title">{tarefa.titulo}</h3>

      {tarefa.descricao && (
        <p className="task-desc">{tarefa.descricao}</p>
      )}

      <div className="task-actions">
        <button
          className="btn-icon btn-advance"
          onClick={() => onStatusChange(tarefa.id, nextStatus[tarefa.status])}
          title={`Mover para ${STATUS_LABELS[nextStatus[tarefa.status]]}`}
        >
          {tarefa.status === 'concluida' ? '↩' : '→'}
        </button>
        <button
          className="btn-icon btn-edit"
          onClick={() => onEdit(tarefa)}
          title="Editar tarefa"
        >
          ✏️
        </button>
        <button
          className="btn-icon btn-delete"
          onClick={handleDelete}
          disabled={deleting}
          title="Excluir tarefa"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
