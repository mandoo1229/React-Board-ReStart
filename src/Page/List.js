import React, { useEffect, useCallback, memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CHANGE_MENU } from '../reducers/BoardReducer';
import { INCREASE_VIEWS } from '../reducers/BoardReducer';
import '../style/List.css';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';

const List = memo(({ list, dispatch }) => {
  const [search, setSearch] = useState('');
  const [searchBy, setSearchBy] = useState('title');
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const itemsPerPage = 10; // 페이지당 보여줄 아이템 수
  const [filteredItems, setFilteredItems] = useState([]);

  const onClickItem = useCallback(
    (id) => () => {
      dispatch({ type: INCREASE_VIEWS, id });
      const updatedList = list.map((item) => {
        if (item.id === id) {
          return { ...item, views: item.views + 1 };
        }
        return item;
      });
      localStorage.setItem('list', JSON.stringify(updatedList));
    },
    [dispatch, list]
  );
  // 조회수 기능입니다. list item을 클릭했을 때 호출되는 콜백함수이다. 아이템의 조회수를 증가시키고 업데이트 된 것을 localStorage에 저장한다.

  useEffect(() => {
    dispatch({ type: CHANGE_MENU, menu: 'List' });
  }, [dispatch]);

  const handleSearch = () => {
    const filteredList = list.filter((item) => {
      if (searchBy === 'title') {
        // 검색 항목을 title인 경우를 처리하는 블록이다.
        return item.title.toLowerCase().includes(search.toLowerCase());
        //title 안에 있는 내용을 includes를 사용하여 검색어가 속성에 포함되어 있는지 여부를 확인하여 포함 되어 있으면 true를 반환한다.
      } else if (searchBy === 'content') {
        // 검색 항목을 content 경우를 처리하는 블록이다.
        return item.content.toLowerCase().includes(search.toLowerCase());
        //content 안에 있는 내용을 includes를 사용하여 검색어가 속성에 포함되어 있는지 여부를 확인하여 포함 되어 있으면 true를 반환한다.
      }
      return false;
      //검색했을 때 내용이 없으면 false로 반환한다.
    });
    setFilteredItems(filteredList);
    //setFilter함수를 사용하여 filteredList 상태를 업데이트 한다.
  };

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const paginateData = (data) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };
  // 페이지 번호와 페이지당 보여줄 수 있는 아이템 수를 이용하여 데이터를 잘라서 해당 페이지를 보여줄 아이템들을 반환한다.

  const sortedList = [...list].reverse(); // 최신글이 1페이지에 오도록 역순으로 정렬

  return (
    <div>
      <div className="search-container">
        <select
          className="search-select"
          style={{ textAlign: 'center' }}
          value={searchBy}
          onChange={(e) => setSearchBy(e.target.value)}
        >
          <option value="title">제목</option>
          <option value="content">내용</option>
        </select>
        <input
          className="search-input"
          type="text"
          placeholder="검색어를 작성해주세요"
          value={search}
          onChange={handleInputChange}
        />
        <Button className="search-button" variant="contained" color="primary" onClick={handleSearch}>
          검색
        </Button>
      </div>
      <table className="rwd-table">
        <tbody>
          <tr>
            <th>제목</th>
            <th>작성일</th>
            <th>조회수</th>
          </tr>
          {paginateData(filteredItems.length > 0 ? filteredItems : sortedList).map((item) => {
            return (
              <tr key={item.id}>
                <td>
                  <Link
                    onClick={onClickItem(item.id)}
                    to={`/detail/${item.id}`}
                    style={{ color: 'inherit', textDecoration: 'none' }}
                  >
                    {item.title}
                  </Link>
                </td>
                <td>{item.date}</td>
                <td>{item.views}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="button-container">
        <Button variant="contained" size="small" color="secondary">
          <Link to="/write" style={{ color: 'inherit', textDecoration: 'none' }}>
            write
          </Link>
        </Button>
      </div>
      <div className="pagination-container">
        <Pagination
          style={{ marginTop: '20px' }}
          count={Math.ceil(filteredItems.length > 0 ? filteredItems.length / itemsPerPage : list.length / itemsPerPage)}
          page={currentPage}
          onChange={(event, page) => setCurrentPage(page)}
          color="primary"
        />
      </div>
    </div>
  );
});

export default List;
