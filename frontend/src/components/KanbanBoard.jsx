import { useState, useCallback } from 'react';
import TaskCard from './TaskCard';

const COLUMNS = [
  { key: 'pendente', label: 'Pendente', icon: '⏳', color: '#a78bfa' },
  { key: 'em_andamento', label: 'Em Andamento', icon: '🔄', color: '#60a5fa' },
  { key: 'concluida', label: 'Concluída', icon: '✅', color: '#4ade80' },
];

export default function KanbanBoard({ tarefas, onEdit, onDelete, onStatusChange }) {
  const [dragOverColumn, setDragOverColumn] = useState(null);
  const [draggingId, setDraggingId] = useState(null);

  const handleDragStart = useCallback((e, tarefaId) => {
    setDraggingId(tarefaId);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', tarefaId);
  }, []);

  const handleDragEnd = useCallback(() => {
    setDraggingId(null);
    setDragOverColumn(null);
  }, []);

  const handleDragOver = useCallback((e, colKey) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverColumn(colKey);
  }, []);

  const handleDragLeave = useCallback((e) => {
    // Only clear if leaving the column container entirely
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDragOverColumn(null);
    }
  }, []);

  const handleDrop = useCallback(
    async (e, colKey) => {
      e.preventDefault();
      const tarefaId = e.dataTransfer.getData('text/plain');
      const tarefa = tarefas.find((t) => String(t.id) === String(tarefaId));
      if (tarefa && tarefa.status !== colKey) {
        await onStatusChange(tarefa.id, colKey);
      }
      setDragOverColumn(null);
      setDraggingId(null);
    },
    [tarefas, onStatusChange]
  );

  return (
    <div className="kanban-board">
      {COLUMNS.map((col) => {
        const items = tarefas.filter((t) => t.status === col.key);
        const isOver = dragOverColumn === col.key;
        const isDraggingHere = draggingId && items.some((t) => String(t.id) === String(draggingId));

        return (
          <div
            key={col.key}
            className={`kanban-column ${isOver ? 'column-drag-over' : ''}`}
            onDragOver={(e) => handleDragOver(e, col.key)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, col.key)}
          >
            <div className="column-header" style={{ borderColor: col.color }}>
              <span className="column-icon">{col.icon}</span>
              <h2 className="column-title" style={{ color: col.color }}>{col.label}</h2>
              <span className="column-count" style={{ background: `${col.color}22`, color: col.color }}>
                {items.length}
              </span>
            </div>

            <div className={`column-body ${isOver && !isDraggingHere ? 'column-body-highlight' : ''}`}>
              {items.length === 0 ? (
                <div className={`column-empty ${isOver ? 'column-empty-active' : ''}`}>
                  <span>{isOver ? 'Soltar aqui' : 'Nenhuma tarefa aqui'}</span>
                </div>
              ) : (
                items.map((tarefa) => (
                  <TaskCard
                    key={tarefa.id}
                    tarefa={tarefa}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onStatusChange={onStatusChange}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    isDragging={String(draggingId) === String(tarefa.id)}
                  />
                ))
              )}
              {isOver && !isDraggingHere && items.length > 0 && (
                <div className="drop-placeholder" style={{ borderColor: col.color }}>
                  <span style={{ color: col.color }}>Soltar aqui</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
