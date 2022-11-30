import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function Filters() {
  const { filters, results, orders } = useContext(MyContext);
  const { select, setSelect, filter, setFilter } = filters;
  const { list, setList, listArray } = results;
  const { order, setOrder } = orders;
  const { column, sort } = order;

  const ASC = 'ASC';
  const DESC = 'DESC';

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setSelect({ ...select, [name]: value });
  };

  const handleSelect = ({ target }) => {
    const { value } = target;
    setOrder({ ...order, column: value });
  };

  const handleOrder = ({ target }) => {
    const { value } = target;
    setOrder({ ...order, sort: value });
  };

  const orderClick = () => {
    setOrder({
      ...order,
      first: true,
      orderNew: { column, sort },
    });
  };

  const handleClick = () => {
    setFilter([...filter, select]);
    const newArray = list.filter((ele) => ele !== select.column);
    setList(newArray);
    setSelect({ ...select, column: newArray[0], number: '0' });
  };

  const deleteAll = () => {
    setFilter([]);
    setList(listArray);
    setSelect({ ...select, column: listArray[0] });
  };

  return (
    <div className="filter-container">
      <label htmlFor="column">
        Coluna
        <select
          name="column"
          onChange={ handleChange }
          value={ select.column }
          data-testid="column-filter"
        >
          {list.map((lis, ind) => <option key={ ind }>{lis}</option>)}
        </select>
      </label>

      <label htmlFor="operator">
        Operador
        <select name="operator" onChange={ handleChange } data-testid="comparison-filter">
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
      </label>

      <input
        type="number"
        name="number"
        value={ select.number }
        onChange={ handleChange }
        data-testid="value-filter"
      />

      <button type="button" onClick={ handleClick } data-testid="button-filter">
        FILTRAR
      </button>

      <label htmlFor="order">
        Ordenar
        <select onChange={ handleSelect } data-testid="column-sort">
          {listArray.map((lis, ind) => <option key={ ind }>{lis}</option>)}
        </select>
      </label>

      <div className="radio-container">
        <input
          type="radio"
          name="order"
          checked={ sort === ASC }
          value={ ASC }
          onChange={ handleOrder }
          data-testid="column-sort-input-asc"
        />
        Ascendente
        <input
          type="radio"
          name="order"
          checked={ sort === DESC }
          value={ DESC }
          onChange={ handleOrder }
          data-testid="column-sort-input-desc"
        />
        Descendente
      </div>

      <button type="button" onClick={ orderClick } data-testid="column-sort-button">
        ORDENAR
      </button>

      <button type="button" onClick={ deleteAll } data-testid="button-remove-filters">
        REMOVER FILTROS
      </button>
    </div>
  );
}

export default Filters;
