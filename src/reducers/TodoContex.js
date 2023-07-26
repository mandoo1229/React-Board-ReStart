import React, { useReducer, createContext, useContext, useRef } from 'react';

const initialTodos = [
  {
    id: 1,
    text: '프로젝트 생성',
    done: false,
  },
  {
    id: 2,
    text: 'CURD 게시판 작성하기',
    done: false,
  },
  {
    id: 3,
    text: 'API 활용하기',
    done: false,
  },
];

function todoReducer(state, action) {
  switch (action.type) {
    case 'CREATE':
      return state.concat(action.todo);
    case 'TOGGLE':
      return state.map((todo) => (todo.id === action.id ? { ...todo, done: !todo.done } : todo));
    case 'REMOVE':
      return state.filter((todo) => todo.id !== action.id);
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const TodoStateContext = createContext();
const TodoDispatchContest = createContext();
const TodoNextIdContext = createContext();

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialTodos);
  const nextId = useRef(5);

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContest.Provider value={dispatch}>
        <TodoNextIdContext.Provider value={nextId}>{children}</TodoNextIdContext.Provider>
      </TodoDispatchContest.Provider>
    </TodoStateContext.Provider>
  );
}

export function useTodoState() {
  return useContext(TodoStateContext);
}

export function useTodoDispatch() {
  return useContext(TodoDispatchContest);
}

export function useTodoNextId() {
  return useContext(TodoNextIdContext);
}
