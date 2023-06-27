import React, { useRef, useEffect, memo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CHANGE_MENU, UPDATE_ITEM } from '../reducers/BoardReducer';
import useInputs from '../hook/useInput';
import { getLocalItem } from '../utill/utill';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Error from './Error';

const Update = memo(({ dispatch }) => {
  const { id } = useParams();
  const item = getLocalItem(id);
  const navigate = useNavigate();
  const [state, onChangeInput] = useInputs({
    title: item ? item.title : '',
    content: item ? item.content : '',
  });

  const { title, content } = state;
  const inputTitle = useRef(null);
  const inputContenet = useRef(null);

  useEffect(() => {
    dispatch({ type: CHANGE_MENU, menu: 'Update' });
    if (inputTitle.current) {
      inputTitle.current.focus();
    }
  }, [dispatch]);

  const onClickSubmit = () => {
    if (!title) {
      alert('제목을 작성해주세요.');
      inputTitle.current.focus();
    } else if (!content) {
      alert('글을 작성해주세요. ');
      inputContenet.current.focus();
    } else {
      item.title = title;
      item.content = content;
      dispatch({ type: UPDATE_ITEM, item });
      navigate(`/detail/${item.id}`);
    }
  };

  return (
    <div>
      {item ? (
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
            ref={inputContenet}
            multiline
            rows={30}
            style={{ width: '80%' }}
            defaultValue="내용을 입력해주세요. "
            name="content"
            value={content}
            onChange={onChangeInput}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', width: '80%', marginTop: '16px' }}>
            <Button variant="contained" onClick={onClickSubmit}>
              저장
            </Button>
            <Button variant="contained" color="error" style={{ marginLeft: '8px' }}>
              <Link to="/">취소</Link>
            </Button>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
});

export default Update;
