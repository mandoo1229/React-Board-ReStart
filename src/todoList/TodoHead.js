import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useTodoState } from '../reducers/TodoContex';

const TodoHeadBlock = styled.div`
  padding-top: 48px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e9ecef;

  h1 {
    margin: 0;
    font-size: 36px;
    color: #343a40;
  }

  .div {
    margin-top: 4px;
    color: #868e96;
    font-size: 21px;
  }
  .tasks-left {
    color: #20c997;
    font-size: 18px;
    margin-top: 40px;
    font-weight: bold;
  }
`;

function TodoHead() {
  const todos = useTodoState();
  const undoneTasks = todos.filter((todo) => !todo.done);
  const [timer, setTimer] = useState('00:00:00');
  const [week, setWeek] = useState('');

  const currentTimer = () => {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    setTimer(`${hours}:${minutes}:${seconds}`);
  };
  //   const startTimer = () => {
  //     setInterval(currentTimer, 1000);
  //   };
  //   startTimer();

  const dayCurrentWeek = () => {
    const daysWeek = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    const date = new Date();
    return daysWeek[date.getDay()];
  };

  useEffect(() => {
    const timerInterval = setInterval(currentTimer, 1000);
    setWeek(dayCurrentWeek());
    return () => clearInterval(timerInterval);
  }, []);
  return (
    <TodoHeadBlock>
      <h1>{timer}</h1>
      <div className="day">{week}</div>
      <div className="tasks-left ">할일 {undoneTasks.length}개 남음 </div>
    </TodoHeadBlock>
  );
}

export default TodoHead;
