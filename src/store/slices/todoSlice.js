import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    todos: [],
    idCounter: 1
};

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const newTodo = {
                id: state.idCounter,
                text: action.payload,
                complete: false
            };
            state.todos.push(newTodo);
            state.idCounter++;
        },
        toggleComplete: (state, action) => {
            const todo = state.todos.find(todo => todo.id === action.payload);
            if (todo) {
                todo.complete = !todo.complete;
            }
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
        },
        completeAllTodos: (state) => {
            state.todos.forEach(todo => {
                todo.complete = true;
            });
        },
    }
});

export const { addTodo, toggleComplete, removeTodo, completeAllTodos } = todoSlice.actions;
export default todoSlice.reducer;