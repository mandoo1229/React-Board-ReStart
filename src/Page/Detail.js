import React, { useEffect, useCallback, memo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CHANGE_MENU, DELETE_ITEM } from '../reducers/BoardReducer';
import { getLocalItem } from '../utill/utill';
import Button from '@mui/material/Button';
import Error from './Error';
import '../style/Detail.css';

const Detail = memo(({ dispatch }) => {
  const { id } = useParams();
  const item = getLocalItem(id);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({ type: CHANGE_MENU, menu: 'Detail' });
  }, [dispatch]);

  const onClickDelete = useCallback(() => {
    if (item) {
      dispatch({ type: DELETE_ITEM, id: item.id });

      const localList = localStorage.getItem('list');
      const list = localList ? JSON.parse(localList) : [];
      const updateList = list.filter((listItem) => listItem.id !== item.id);
      localStorage.setItem('list', JSON.stringify(updateList));
      alert('삭제 되었습니다.');
      navigate('/');
    } else {
      console.log('취소되었습니다.');
    }
  }, [dispatch, navigate, item]);
  return (
    <div>
      {item ? (
        <div className="detail-wrap">
          <div className="detail-view">
            <div className="title">제목 : {item.title}</div>
            <div className="info">
              <dl>
                <dt>작성일 : </dt>
                <dd>{item.date}</dd>
              </dl>
              <dl>
                <dt>조회수 : </dt>
                <dd>{item.views}</dd>
              </dl>
            </div>
            <div className="cont"> {item.content} </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '100px' }}>
            <Button variant="contained" color="secondary" href="/">
              <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
                목록으로 가기
              </Link>
            </Button>
            <Button variant="contained" href={`/update/${item.id}`} style={{ marginLeft: '700px' }}>
              <Link to={`/update/${item.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                수정
              </Link>
            </Button>
            <Button variant="contained" color="error" onClick={onClickDelete}>
              삭제
            </Button>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
});

export default Detail;
