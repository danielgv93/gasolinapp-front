import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gray-100 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">GASOLINAPP</h1>
        <nav>
          <Link to="/" className="mr-4">Home</Link>
          <Link to="/about">About</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
