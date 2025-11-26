import React from 'react';
import BookForm from '../../components/BookForm';
import BookFilter from '../../components/BookFilter';
import BookList from '../../components/BookList';

const Home = ({ editingBook, handleCloseEdit, isFormOpen, toggleForm, handleEdit }) => {
  return (
    <>
      <BookForm 
        bookToEdit={editingBook} 
        onClose={handleCloseEdit}
        isOpen={isFormOpen}
        onToggle={toggleForm}
      />
      <BookFilter />
      <BookList onEdit={handleEdit} />
    </>
  );
};

export default Home;