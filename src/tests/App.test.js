import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

const pop = 'population';
const orb = 'orbital_period';
const dia = 'diameter';
const rot = 'rotation_period';
const sur = 'surface_water';
const listArray = [pop, orb, dia, rot, sur];

describe('Cobre todo o código', () => {
  test('Testa o componente Search', async () => {
    render(<App />);
    await waitFor(() => expect(screen.getByText(/tato/i))
      .toBeInTheDocument(), { timeout: 5000 });
    const search = screen.getByTestId('name-filter');
    userEvent.type(search, 'TatO');
    userEvent.clear(search);
  });
  test('Testa o componente Filters', async () => {
    render(<App />);
    await waitFor(() => expect(screen.getByText(/tato/i))
      .toBeInTheDocument(), { timeout: 5000 });
    const orderSelect = screen.getByTestId('column-sort');
    const orderAsc = screen.getByTestId('column-sort-input-asc');
    const orderDesc = screen.getByTestId('column-sort-input-desc');
    const order = screen.getByTestId('column-sort-button');
    userEvent.selectOptions(orderSelect, 'diameter');
    userEvent.click(orderDesc);
    userEvent.click(order);
    userEvent.click(orderAsc);
    userEvent.click(order);

    const number = screen.getByTestId('value-filter');
    const filter = screen.getByTestId('button-filter');
    const size = screen.getByTestId('comparison-filter');
    userEvent.click(filter);
    userEvent.selectOptions(size, 'menor que');
    userEvent.click(filter);
    userEvent.selectOptions(size, 'igual a');
    userEvent.click(filter);

    const remove = screen.getByTestId('button-remove-filters');
    userEvent.click(remove);
  });
  test('Testa o componente Results', () => {
    render(<App />);
    const number = screen.getByTestId('value-filter');
    const filter = screen.getByTestId('button-filter');
    userEvent.type(number, '100');
    userEvent.click(filter);
    const deleteBtn = screen.getByRole('button', { name: 'Excluir' });
    userEvent.click(deleteBtn);

    const columnSelect = screen.getByTestId('column-filter');
    userEvent.selectOptions(columnSelect, 'diameter');
    expect(columnSelect.value).toBe('diameter');
    for (let index = 0; index < listArray.length; index += 1) {
      userEvent.click(filter);
    }
    expect(columnSelect.value).toBe('');
    const deleteAllBtn = screen.getAllByRole('button', { name: 'Excluir' });
    for (let index = 0; index < listArray.length; index += 1) {
      userEvent.click(deleteAllBtn[0]);
    }
  });
});
