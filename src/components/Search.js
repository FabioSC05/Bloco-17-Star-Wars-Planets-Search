import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function Search() {
  const { search } = useContext(MyContext);
  const { text, setText } = search;

  const handleChange = ({ target }) => {
    const { value } = target;
    setText(value);
  };

  return (
    <input
      type="text"
      placeholder="Digite o Nome do Planeta"
      value={ text }
      onChange={ handleChange }
      data-testid="name-filter"
    />
  );
}

export default Search;
