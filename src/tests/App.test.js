import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './utility/renderWithRouter';

describe('Testa se o topo da aplicação contém um conjunto de links de navegação.', () => {
  it('verifica se o primeiro link possui o texto "Home"', () => {
    renderWithRouter(<App />);
    const home = screen.getByRole('link', {
      name: 'Home' });
    expect(home).toBeInTheDocument();
  });
  it('verifica se o segundo link possui o texto "About"', () => {
    renderWithRouter(<App />);
    const about = screen.getByRole('link', {
      name: 'About' });
    expect(about).toBeInTheDocument();
  });
  it('verifica se o terceiro link possui o texto "Favorite Pokémons"', () => {
    renderWithRouter(<App />);
    const favoritePokemons = screen.getByRole('link', {
      name: 'Favorite Pokémons' });
    expect(favoritePokemons).toBeInTheDocument();
  });
});
