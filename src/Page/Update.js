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
      const updateItem = { ...item, title, content };
      dispatch({ type: UPDATE_ITEM, item: updateItem }); //item대신 updateItem을 전달한다.
      const localList = localStorage.getItem('list');
      const list = localList ? JSON.parse(localList) : [];
      const updateList = list.map((listItem) => (listItem.id === updateItem.id ? updateItem : listItem));
      localStorage.setItem('list', JSON.stringify(updateList));
      navigate(`/detail/${item.id}`);
    }
  };
  // localStorage에서 list키 값을 가져와 파싱하여 'list'배열로 변환한다.
  // list 배열을 map메서드를 사용하여 각 item을 확인하고 updateItem의 id와 일치하는 item이 있는 경우에는 'updateItem'으로 교체한다. 그렇지 않으면 원래데로 유지한다.
  // 이후 detail페이지로 이동을 한다.
  return (
    <div>
      {item ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <TextField
            id="outlined-multiline-flexible"
            label="제목을 작성해주세요"
            multiline
            maxRows={4}
            style={{ width: '60%', marginTop: '1%' }}
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
            rows={20}
            style={{ width: '60%', marginTop: '1%' }}
            defaultValue="내용을 입력해주세요. "
            name="content"
            value={content}
            onChange={onChangeInput}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', width: '60%', marginTop: '2%' }}>
            <Button variant="contained" onClick={onClickSubmit}>
              저장
            </Button>
            <Button variant="contained" color="error" style={{ marginLeft: '8px' }}>
              <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
                취소
              </Link>
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
