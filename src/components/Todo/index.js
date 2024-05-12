import {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, toggleComplete, removeTodo, completeAllTodos } from '../../store/slices/todoSlice';
import TodoList from './TodoList';

import styles from './todoList.module.css';

export default function Todo() {
    const todos = useSelector(state => state.todos.todos);
    const dispatch = useDispatch();
    const [newTodoText, setNewTodoText] = useState('');

    const addNewTodo = () => {
        if (newTodoText.trim()) {
            dispatch(addTodo(newTodoText));
            setNewTodoText('');
        }
    };

    const toggleTodoComplete = (id) => {
        dispatch(toggleComplete(id));
    };

    const deleteTodo = (id) => {
        dispatch(removeTodo(id));
    };

    const completeAll = () => {
        dispatch(completeAllTodos());
    };

    return (
        <div className={styles.todolist_wrapper}>
            <div className={styles.todo_form}>
                <button type='button' className={`${styles.todo_form_elem} ${styles.todo_form_btn}`}
                        onClick={completeAll}>✓
                </button>
                <input
                    type='text'
                    value={newTodoText}
                    placeholder='Enter new todo'
                    onChange={(e) => setNewTodoText(e.target.value)}
                    className={`${styles.todo_form_elem} ${styles.todo_form_input}`}
                />
                <button type='button' className={`${styles.todo_form_elem} ${styles.todo_form_btn}`}
                        onClick={addNewTodo}>+
                </button>
            </div>
            <TodoList todos={todos} toggleTodoComplete={toggleTodoComplete} deleteTodo={deleteTodo}/>
        </div>
    );
}
