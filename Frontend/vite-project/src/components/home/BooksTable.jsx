console.log("BooksTable.jsx loaded");

import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';

const BooksTable = ({ books }) => {
  if (!books || books.length === 0) {
    return (
      <div className="text-center p-4 text-gray-500">
        No books available.
      </div>
    );
  }

  return (
    <div className="card p-4 overflow-x-auto">
      <table className="w-full border-separate border-spacing-2">
        <thead>
          <tr>
            <th scope="col" className="border border-slate-600 rounded-md px-2 py-1">No</th>
            <th scope="col" className="border border-slate-600 rounded-md px-2 py-1">Title</th>
            <th scope="col" className="border border-slate-600 rounded-md max-md:hidden px-2 py-1">Author</th>
            <th scope="col" className="border border-slate-600 rounded-md max-md:hidden px-2 py-1">Publish Year</th>
            <th scope="col" className="border border-slate-600 rounded-md px-2 py-1">Operations</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={book._id} className="h-8">
              <td className="border border-slate-700 rounded-md text-center px-2 py-1">
                {index + 1}
              </td>
              <td className="border border-slate-700 rounded-md text-center px-2 py-1">
                {book.title}
              </td>
              <td className="border border-slate-700 rounded-md text-center max-md:hidden px-2 py-1">
                {book.author}
              </td>
              <td className="border border-slate-700 rounded-md text-center max-md:hidden px-2 py-1">
                {book.publishYear}
              </td>
              <td className="border border-slate-700 rounded-md text-center px-2 py-1">
                <div className="flex justify-center gap-x-4">
                  <Link to={`/books/details/${book._id}`} title="View Details" aria-label={`View details of ${book.title}`}>
                    <BsInfoCircle className="text-2xl text-green-800" />
                  </Link>
                  <Link to={`/books/edit/${book._id}`} title="Edit Book" aria-label={`Edit ${book.title}`}>
                    <AiOutlineEdit className="text-2xl text-yellow-600" />
                  </Link>
                  <Link to={`/books/delete/${book._id}`} title="Delete Book" aria-label={`Delete ${book.title}`}>
                    <MdOutlineDelete className="text-2xl text-red-600" />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BooksTable;
