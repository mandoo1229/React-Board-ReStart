import React, { useRef, useEffect, memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ADD_ITEM, CHANGE_MENU } from '../reducers/BoardReducer';
import useInputs from '../hook/useInput';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function formatDateTime(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day} `;
}

const Write = memo(({ id, dispatch }) => {
  const item = {};
  const [state, onChangeInput] = useInputs({ title: '', content: '' });
  const { title, content } = state;
  const inputTitle = useRef(null);
  const inputContent = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({ type: CHANGE_MENU, menu: 'Write' });
    inputTitle.current.focus();
  }, [dispatch]);

  const onClickSubmit = () => {
    if (!title) {
      alert('제목을 작성해주세요');
      inputTitle.current.focus();
    } else if (!content) {
      alert('내용을 작성해주세요');
      inputContent.current.focus();
    } else {
      item.id = id;
      item.title = title;
      item.content = content;
      item.date = formatDateTime(new Date());
      item.views = 0;
      dispatch({ type: ADD_ITEM, item });
      const localList = localStorage.getItem('list');
      const list = localList ? JSON.parse(localList) : [];
      list.push(item);
      localStorage.setItem('list', JSON.stringify(list));
      localStorage.setItem('id', id + 1);
      navigate(`/detail/${item.id}`);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <TextField
        id="outlined-multiline-flexible"
        label="제목을 작성해주세요"
        multiline
        maxRows={4}
        style={{ width: '80%' }}
        ref={inputTitle}
        name="title"
        value={title}
        onChange={onChangeInput}
      />
      <br></br>

      <TextField
        id="outlined-multiline-static"
        ref={inputContent}
        multiline
        rows={30}
        style={{ width: '80%' }}
        name="content"
        value={content}
        onChange={onChangeInput}
      />
      <div style={{ display: 'flex', justifyContent: 'flex-end', width: '80%', marginTop: '16px' }}>
        <Button onClick={onClickSubmit}>저장</Button>
        <Button variant="outlined" color="error" style={{ marginLeft: '8px' }}>
          <Link to="/">취소</Link>
        </Button>
      </div>
    </div>
  );
});

export default Write;
