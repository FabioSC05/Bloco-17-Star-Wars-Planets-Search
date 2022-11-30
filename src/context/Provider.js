import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

function Provider({ children }) {
  const [api, setApi] = useState([]);
  const [text, setText] = useState('');
  const [select, setSelect] = useState({
    column: 'population',
    operator: 'maior que',
    number: '0',
  });
  const [filter, setFilter] = useState([]);
  const pop = 'population';
  const orb = 'orbital_period';
  const dia = 'diameter';
  const rot = 'rotation_period';
  const sur = 'surface_water';
  const newList = [pop, orb, dia, rot, sur];
  const [list, setList] = useState(newList);
  const [order, setOrder] = useState({
    column: 'population',
    sort: 'ASC',
    first: false,
    orderNew: {},
  });

  const fetchData = async () => {
    const result = await fetch('https://swapi.dev/api/planets');
    const data = await result.json();
    const returned = data.results;
    setApi(returned);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const contextType = useMemo(() => {
    const listArray = [pop, orb, dia, rot, sur];
    return {
      api,
      search: { text, setText },
      filters: { select, setSelect, filter, setFilter },
      results: { list, setList, listArray },
      orders: { order, setOrder },
    };
  }, [api, filter, list, order, select, text]);

  return (
    <MyContext.Provider value={ contextType }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element.isRequired).isRequired,
};

export default Provider;
