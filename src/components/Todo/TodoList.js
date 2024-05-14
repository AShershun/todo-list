import React from 'react';
import styles from './todoList.module.css';

const TodoList = ({ todos, toggleTodoComplete, deleteTodo }) => {
    const sortedTodos = [...todos].sort((a, b) => {
        if (a.completed === b.completed) {
            return a.id - b.id;
        }
        return a.completed ? 1 : -1;
    });

    return (
        <div>
            {sortedTodos.map(todo => (
                <div key={todo.id} className={`${styles.todo_item} ${todo.completed ? styles.todo_item_completed : ''}`}>
                    <div className={styles.todo_item_text} onClick={() => toggleTodoComplete(todo.id)}>{todo.title}</div>
                    <button className={styles.todo_item_remove_btn} onClick={() => deleteTodo(todo.id)}>×</button>
                </div>
            ))}
        </div>
    );
};

export default TodoList;