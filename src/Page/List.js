import React, { useEffect, useCallback, memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CHANGE_MENU } from '../reducers/BoardReducer';
import { INCREASE_VIEWS } from '../reducers/BoardReducer';
import '../style/List.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';

const List = memo(({ list, dispatch }) => {
  const [search, setSearch] = useState('');
  const [searchBy, setSearchBy] = useState('title');
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const itemsPerPage = 10; // 페이지당 보여줄 아이템 수
  const [filteredItems, setFilteredItems] = useState([]);

  const onClickItem = useCallback(
    (id) => () => {
      dispatch({ type: INCREASE_VIEWS, id });
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch({ type: CHANGE_MENU, menu: 'List' });
  }, [dispatch]);

  const handleSearch = () => {
    const filteredList = list.filter((item) => {
      if (searchBy === 'title') {
        return item.title.toLowerCase().includes(search.toLowerCase());
      } else if (searchBy === 'content') {
        return item.content.toLowerCase().includes(search.toLowerCase());
      }
      return false;
    });
    setFilteredItems(filteredList);
  };

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const paginateData = (data) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const Pagination = () => {
    const totalPages = Math.ceil(list.length / itemsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
      <div className="pagination">
        {pageNumbers.map((number) => (
          <button key={number} onClick={() => setCurrentPage(number)}>
            {number}
          </button>
        ))}
      </div>
    );
  };

  const sortedList = [...list].reverse(); // 최신글이 1페이지에 오도록 역순으로 정렬

  return (
    <div className="list-container">
      <Table size="small" aria-label="a dense table" style={{ width: '50%', height: '50%' }}>
        <TableHead>
          <TableRow>
            <TableCell align="center">제목</TableCell>
            <TableCell align="center">작성일</TableCell>
            <TableCell align="center">조회수</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginateData(filteredItems.length > 0 ? filteredItems : sortedList).map((item) => {
            return (
              <TableRow key={item.id}>
                <TableCell align="center">
                  <Link onClick={onClickItem(item.id)} to={`/detail/${item.id}`}>
                    {item.title}
                  </Link>
                </TableCell>
                <TableCell align="center">{item.date}</TableCell>
                <TableCell align="center">{item.views}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div className="button-container">
        <Button variant="outlined" color="secondary" style={{ marginLeft: 'auto' }}>
          <Link to="/write">write</Link>
        </Button>
      </div>
      <div className="search-container">
        <select className="search-select" value={searchBy} onChange={(e) => setSearchBy(e.target.value)}>
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
      <Pagination />
    </div>
  );
});

export default List;
