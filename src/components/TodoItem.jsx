import React from 'react';

const TodoItem = ({ todo, state, isFuture, toggleTodo, cyclePriority, activeNote, setActiveNote, updateNote }) => {
    const isCompleted = state.completed;
    const priority = state.priority || todo.priority;
    const note = state.note || "";
    const key = `${todo.week}-${todo.leaderId}-${todo.index}`;
    const isNoteActive = activeNote === key;

    return (
        <li className="todo-item-container">
            <div
                className={`todo-item ${isCompleted ? 'completed' : ''} ${todo.isRollover ? 'rollover' : ''} ${isFuture ? 'placeholder' : ''}`}
                onClick={() => toggleTodo(todo.week, todo.leaderId, todo.index)}
            >
                {!isFuture && <div className="checkbox"></div>}
                <div className="todo-content">
                    <div className="todo-main">
                        <span className="todo-text">
                            {todo.isRollover && <span className="rollover-tag">Rollover (W{todo.week})</span>}
                            {todo.text}
                        </span>
                        {!isFuture && (
                            <span
                                className={`priority-badge ${priority.toLowerCase()}`}
                                onClick={(e) => cyclePriority(e, todo.week, todo.leaderId, todo.index, todo.priority)}
                            >
                                {priority}
                            </span>
                        )}
                    </div>

                    {!isFuture && (
                        <div
                            className="note-trigger"
                            onClick={(e) => {
                                e.stopPropagation();
                                setActiveNote(isNoteActive ? null : key);
                            }}
                        >
                            {note ? "📝 View Note" : "+ Add Note"}
                        </div>
                    )}
                </div>
            </div>

            {isNoteActive && !isFuture && (
                <div className="note-editor" onClick={(e) => e.stopPropagation()}>
                    <textarea
                        placeholder="Add details/notes here..."
                        value={note}
                        onChange={(e) => updateNote(todo.week, todo.leaderId, todo.index, e.target.value)}
                    />
                </div>
            )}
        </li>
    );
};

export default TodoItem;
