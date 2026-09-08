import TaskCard from './TaskCard';

const COLUMNS = [
  { key: 'pendente', label: 'Pendente', icon: '⏳', color: '#a78bfa' },
  { key: 'em_andamento', label: 'Em Andamento', icon: '🔄', color: '#60a5fa' },
  { key: 'concluida', label: 'Concluída', icon: '✅', color: '#4ade80' },
];

export default function KanbanBoard({ tarefas, onEdit, onDelete, onStatusChange }) {
  return (
    <div className="kanban-board">
      {COLUMNS.map((col) => {
        const items = tarefas.filter((t) => t.status === col.key);
        return (
          <div key={col.key} className="kanban-column">
            <div className="column-header" style={{ borderColor: col.color }}>
              <span className="column-icon">{col.icon}</span>
              <h2 className="column-title" style={{ color: col.color }}>{col.label}</h2>
              <span className="column-count" style={{ background: `${col.color}22`, color: col.color }}>
                {items.length}
              </span>
            </div>

            <div className="column-body">
              {items.length === 0 ? (
                <div className="column-empty">
                  <span>Nenhuma tarefa aqui</span>
                </div>
              ) : (
                items.map((tarefa) => (
                  <TaskCard
                    key={tarefa.id}
                    tarefa={tarefa}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onStatusChange={onStatusChange}
                  />
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
