import React from 'react';
import { Link } from 'react-router-dom';
import { BsInfoCircle } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDelete } from 'react-icons/md';

const BooksCard = ({ books }) => {
  return (
    <div className="card-view">
      <div className="cards-container">
        {books.map((book) => (
          <div key={book._id} className="card">
            <div className="card-year-badge">{book.publishYear}</div>
            <p className="card-id">{book._id}</p>
            <p className="card-title">📘 {book.title}</p>
            <p className="card-author">👤 {book.author}</p>
            <div className="card-icons">
              <Link to={`/books/details/${book._id}`}><BsInfoCircle style={{ color: 'blue' }} /></Link>
              <Link to={`/books/edit/${book._id}`}><AiOutlineEdit style={{ color: 'orange' }} /></Link>
              <Link to={`/books/delete/${book._id}`}><MdOutlineDelete style={{ color: 'red' }} /></Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BooksCard;
