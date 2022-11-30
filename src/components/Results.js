import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function Results() {
  const { filters, results } = useContext(MyContext);
  const { select, setSelect, filter, setFilter } = filters;
  const { setList, listArray } = results;

  const handleClick = ({ target }) => {
    const { name } = target;
    const newArray = filter.filter((ele) => ele.column !== name);
    let finalArray = listArray;
    newArray.forEach((ele) => {
      finalArray = finalArray.filter((elName) => elName !== ele.column);
    });
    setFilter(newArray);
    setList(finalArray);
    setSelect({ ...select, column: finalArray[0] });
  };

  return (
    <ul style={ { listStyle: 'none' } }>
      {filter.map((ele, ind) => (
        <li key={ ind } className="li-container" data-testid="filter">
          <p>{ ele.column }</p>
          <p>{ ele.operator }</p>
          <p>{ ele.number }</p>
          <button
            type="button"
            name={ ele.column }
            onClick={ handleClick }
          >
            Excluir
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Results;
