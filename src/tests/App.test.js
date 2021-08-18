import React from 'react';
import userEvent from '@testing-library/user-event';
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

describe('Testa os redirecionamentos da página', () => {
  it('ao clicar no link "Home" deve ser redirecionado para a URL "/"', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByRole('link', {
      name: 'Home' });
    userEvent.click(home);
    const url = history.location.pathname;
    expect(url).toBe('/');
  });
  it('ao clicar no link "About" deve ser redirecionado para a URL "/about"', () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByRole('link', {
      name: /about/i });
    userEvent.click(about);
    const url = history.location.pathname;
    expect(url).toBe('/about');
  });
  it('ao clicar no link "PokémonsFavoritados" redireciona "/favorites"', () => {
    const { history } = renderWithRouter(<App />);
    const pokemonsFavorites = screen.getByRole('link', {
      name: /Favorite pokémons/i });
    userEvent.click(pokemonsFavorites);
    const url = history.location.pathname;
    expect(url).toBe('/favorites');
  });
  it('testa se ao entrar em outra url retorna a página "Not Found"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/qualquer-pagina-ai');
    const centerTitle = screen.getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    });
    expect(centerTitle).toBeInTheDocument();
  });
});
