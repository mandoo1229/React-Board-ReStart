import React from 'react';
import styled from '@emotion/styled';
import TodoItem from './TodoItme';

const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
`;

function TodoList() {
  return (
    <TodoListBlock>
      <TodoItem text="프로젝트 생성" done={true} />
      <TodoItem text="CRUD 과제 하기" done={true} />
      <TodoItem text="API활용해보기" done={false} />
    </TodoListBlock>
  );
}

export default TodoList;
