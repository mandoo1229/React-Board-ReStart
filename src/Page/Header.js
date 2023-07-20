import React from 'react';
import '../style/Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="haeder">
      <Link to={'/'}>Home</Link>
    </div>
  );
};

export default Header;
