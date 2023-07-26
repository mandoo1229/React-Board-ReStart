import React from 'react';
import '../style/Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div>
      <div className="Home">
        <Link className="Menu" to={'/'}>
          Home
        </Link>
        <Link className="Menu" to={'/todoTemplate'}>
          Todo
        </Link>
      </div>
    </div>
  );
};

export default Header;
