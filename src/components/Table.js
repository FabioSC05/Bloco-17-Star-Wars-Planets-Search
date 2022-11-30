import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function Table() {
  const { api, search, filters, orders } = useContext(MyContext);
  const { text } = search;
  const { filter } = filters;
  const { order } = orders;
  const { first, orderNew } = order;
  const { column, sort } = orderNew;

  const re = text.toLowerCase();
  const textRender = text !== '' ? api.filter((ele) => {
    const element = ele.name.toLowerCase();
    return element.includes(re);
  }) : api;

  let newRender = [];
  filter.forEach((ele) => {
    const rendering = newRender.length === 0 ? textRender : newRender;
    if (ele.operator === 'maior que') {
      newRender = rendering
        .filter((elName) => elName[ele.column] > JSON.parse(ele.number));
    }
    if (ele.operator === 'menor que') {
      newRender = rendering
        .filter((elName) => elName[ele.column] < JSON.parse(ele.number));
    }
    if (ele.operator === 'igual a') {
      newRender = rendering
        .filter((elName) => elName[ele.column] === ele.number);
    }
  });
  const filterRender = filter.length !== 0 ? newRender : textRender;

  let orderFinal = [];
  let orderSort = [];
  const orderOnly = filterRender.filter((ele) => ele[column] !== 'unknown');
  const unkOnly = filterRender.filter((ele) => ele[column] === 'unknown');
  if (sort === 'ASC') {
    orderSort = orderOnly.sort((a, b) => a[column] - b[column]);
  }
  if (sort === 'DESC') {
    orderSort = orderOnly.sort((a, b) => b[column] - a[column]);
  }
  orderFinal = [...orderSort, ...unkOnly];
  const orderRender = first ? orderFinal : filterRender;
  return (
    <table>
      <thead>
        <tr>
          <th className="table-unit">Name</th>
          <th className="table-unit">Rotation Period</th>
          <th className="table-unit">Orbital Period</th>
          <th className="table-unit">Diameter</th>
          <th className="table-unit">Climate</th>
          <th className="table-unit">Gravity</th>
          <th className="table-unit">Terrain</th>
          <th className="table-unit">Surface Water</th>
          <th className="table-unit">Population</th>
          <th className="table-unit">Films</th>
          <th className="table-unit">Created</th>
          <th className="table-unit">Edited</th>
          <th className="table-unit">Url</th>
        </tr>
      </thead>
      <tbody>
        {orderRender.map((ele) => (
          <tr key={ ele.name }>
            <td className="table-unit" data-testid="planet-name">{ ele.name }</td>
            <td className="table-unit">{ ele.rotation_period }</td>
            <td className="table-unit">{ ele.orbital_period }</td>
            <td className="table-unit">{ ele.diameter }</td>
            <td className="table-unit">{ ele.climate }</td>
            <td className="table-unit">{ ele.gravity }</td>
            <td className="table-unit">{ ele.terrain }</td>
            <td className="table-unit">{ ele.surface_water }</td>
            <td className="table-unit">{ ele.population }</td>
            <td className="table-unit">{ ele.films }</td>
            <td className="table-unit">{ ele.created }</td>
            <td className="table-unit">{ ele.edited }</td>
            <td className="table-unit">{ ele.url }</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
