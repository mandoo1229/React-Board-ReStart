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
      dispatch({ type: DELETE_ITEM, id: item.id }); //DELETE_ITEM을 꺼내서 사용합니다. id 값을 전달한다.

      const localList = localStorage.getItem('list'); //localstorage에 있는 list의 key값을 가져옵니다.
      const list = localList ? JSON.parse(localList) : []; //localList에 있는 변수의 값을 JSON형식의 문자열로 변환한다. 빈 배열이면 빈 배열을 list에 할당한다.
      const updateList = list.filter((listItem) => listItem.id !== item.id); //list배열을 필터링하여 item.id와 일치하지 않는 id를 가진 요소들은 새로운 배열을 생성한다.
      localStorage.setItem('list', JSON.stringify(updateList)); //upadateList를 JSON 형식의 문자열로 변환하여 localStorage에 있는 list의 key에 저장한다.
      alert('삭제 되었습니다.');
      navigate('/'); //삭제후 홈으로 가집니다.
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
                {/* <dd>{item.date}</dd> */}
                <dd dangerouslySetInnerHTML={{ __html: item.date }} />
              </dl>
              <dl>
                <dt>조회수 : </dt>
                <dd>{item.views}</dd>
              </dl>
            </div>
            <div className="cont" dangerouslySetInnerHTML={{ __html: item.content }}></div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '100px' }}>
            <Button variant="contained" color="secondary" href="/">
              <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
                목록으로 가기
              </Link>
            </Button>
            <Button variant="contained" href={`/update/${item.id}`} style={{ marginLeft: '400px' }}>
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
