import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async function (_, {rejectWithValue}) {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos?userId=1&_limit=5');

            if (!response.ok) {
                throw new Error('Server Error!')
            }

            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

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
                title: action.payload,
                completed: false
            };
            state.todos.push(newTodo);
            state.idCounter++;
        },
        toggleComplete: (state, action) => {
            const todo = state.todos.find(todo => todo.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
        },
        completeAllTodos: (state) => {
            state.todos.forEach(todo => {
                todo.completed = true;
            });
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.status = 'loading';
                state.error = null;
        })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.status = 'resolved';
                state.todos = action.payload;
                const maxId = action.payload.reduce((max, todo) => Math.max(max, todo.id), 0);
                state.idCounter = maxId + 1;
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload;
            })
    }
});

export const { addTodo, toggleComplete, removeTodo, completeAllTodos } = todoSlice.actions;
export default todoSlice.reducer;