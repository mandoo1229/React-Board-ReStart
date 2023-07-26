import React from 'react';
import styled from '@emotion/styled';
import TodoItem from './TodoItme';
import { useTodoState } from '../reducers/TodoContex';

const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
`;

function TodoList() {
  const tods = useTodoState();
  return (
    <TodoListBlock>
      {tods.map((todo) => (
        <TodoItem key={todo.id} id={todo.id} text={todo.text} done={todo.done} />
      ))}
    </TodoListBlock>
  );
}

export default TodoList;
