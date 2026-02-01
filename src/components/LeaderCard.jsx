import React from 'react';
import TodoItem from './TodoItem';

const LeaderCard = ({ leader, idea, isFuture, allTasks, userState, toggleTodo, cyclePriority, activeNote, setActiveNote, updateNote }) => {
    return (
        <div className={`leader-card ${leader.class} ${isFuture ? 'future-week' : ''}`}>
            <div className="leader-title">
                {leader.name}
            </div>
            <h2 className="idea-title">
                {isFuture ? "Future Momentum" : (idea?.title || "No Idea Scheduled")}
            </h2>
            <p className="rationale">
                {isFuture ? "This week's focus will be revealed as the date approaches to keep your leadership team agile and responsive to market shifts."
                    : idea?.rationale}
            </p>

            <div className="todo-section">
                <h4>
                    <span style={{ color: leader.color }}>■</span> {isFuture ? "Upcoming To-Dos" : "Weekly To-Dos"}
                </h4>
                <ul className="todo-list">
                    {allTasks.map((todo) => (
                        <TodoItem
                            key={`${todo.week}-${leader.id}-${todo.index}`}
                            todo={{ ...todo, leaderId: leader.id }}
                            state={userState[`${todo.week}-${leader.id}-${todo.index}`] || {}}
                            isFuture={isFuture}
                            toggleTodo={toggleTodo}
                            cyclePriority={cyclePriority}
                            activeNote={activeNote}
                            setActiveNote={setActiveNote}
                            updateNote={updateNote}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default LeaderCard;
