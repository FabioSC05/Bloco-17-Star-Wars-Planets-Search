import React from 'react';
import './App.css';
import Search from './components/Search';
import Filters from './components/Filters';
import Table from './components/Table';
import Provider from './context/Provider';
import Results from './components/Results';

function App() {
  return (
    <Provider>
      <h1>Projeto Star Wars - Trybe</h1>
      <Search />
      <Filters />
      <Results />
      <Table />
    </Provider>
  );
}

export default App;
