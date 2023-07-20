import React, { useReducer, useRef, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { BoardReducer, GET_LOCAL_STORAGE } from '../reducers/BoardReducer';
import Update from './Update';
import Detail from './Detail';
import Write from './Write';
import List from './List';
import Header from './Header';

const initialState = {
  list: [],
  id: 0,
  menu: 'List',
};

const Board = () => {
  const [state, dispatch] = useReducer(BoardReducer, initialState);
  const { list, id, menu } = state;
  const isMount = useRef(true);

  useEffect(() => {
    dispatch({ type: GET_LOCAL_STORAGE });
    isMount.current = false;
  }, []);

  return (
    <div>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Header />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <h1>{menu}</h1>
        </div>
        <div>
          <Routes>
            <Route path="/" exact={true} element={<List list={list} dispatch={dispatch} />} />
            <Route path="/write" element={<Write id={id} dispatch={dispatch} />} />
            <Route path="/update/:id" element={<Update dispatch={dispatch} />} />
            <Route path="/detail/:id" element={<Detail dispatch={dispatch} />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default Board;
