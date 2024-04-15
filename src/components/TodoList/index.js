import {useState} from 'react';

import styles from './todoList.module.css';

export default function TodoList() {
    const [todos, setTodos] = useState([]);
    const [newTodoText, setNewTodoText] = useState('');
    const [idCounter, setIdCounter] = useState(1);

    const addTodo = () => {
        if (newTodoText) {
            const newTodo = {
                id: idCounter,
                text: newTodoText,
                complete: false
            };
            setTodos(prevTodos => [...prevTodos, newTodo]);
            setNewTodoText('');
            setIdCounter(prevIdCounter => ++prevIdCounter);
        }
    }

    const toggleComplete = (id) => {
        setTodos(prevTodos =>
            prevTodos.map(todo =>
                todo.id === id ? { ...todo, complete: !todo.complete } : todo
            )
        );
    };

    const removeTodo = (id) => {
        setTodos(prevTodos =>
            prevTodos.filter(todo => todo.id !== id)
        );
    };

    const completeAllTodos = () => {
        setTodos(prevTodos =>
            prevTodos.map(todo =>
                ({ ...todo, complete: true })
            )
        );
    };

    const sortAllTodos = (a, b) => {
        if (a.complete === b.complete) {
            return a.id - b.id;
        }

        return a.complete ? 1 : -1;
    };

    const sortedTodos = [...todos].sort(sortAllTodos);

    return (
        <div className={styles.todolist_wrapper}>
            <div className={styles.todo_form}>
                <button
                    type='submit'
                    className={`${styles.todo_form_elem} ${styles.todo_form_btn}`}
                    onClick={() => completeAllTodos()}
                >
                    ✓
                </button>

                <input
                    type='text'
                    value={newTodoText}
                    placeholder='Enter new todo'
                    onChange={(e) => setNewTodoText(e.target.value)}
                    className={`${styles.todo_form_elem} ${styles.todo_form_input}`}
                />

                <button
                    type='submit'
                    className={`${styles.todo_form_elem} ${styles.todo_form_btn}`}
                    onClick={addTodo}
                >
                    +
                </button>
            </div>

            <div>
                {sortedTodos.map(todo => (
                    <div
                        key={todo.id}
                        className={`${styles.todo_item} ${todo.complete ? styles.todo_item_completed : ''}`}
                    >
                        <div
                            className={styles.todo_item_text}
                            onClick={() => toggleComplete(todo.id)}
                        >
                            {todo.text}
                        </div>

                        <button
                            className={styles.todo_item_remove_btn}
                            onClick={() => removeTodo(todo.id)}
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}