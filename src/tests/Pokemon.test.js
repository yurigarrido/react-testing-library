import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utility/renderWithRouter';
import { Pokemon } from '../components';

describe('Teste o componente "<Pokemon.js />"', () => {
  const pokemon = {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Kanto Viridian Forest',
        map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
      },
      {
        location: 'Kanto Power Plant',
        map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
      },
    ],
    summary: `This intelligent Pokémon roasts hard
      berries with electricity to make them tender enough to eat.
    `,
  };
  const isPokemonFavoriteById = true;
  it('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
    renderWithRouter(
      <Pokemon
        pokemon={ pokemon }
        isFavorite={ isPokemonFavoriteById }
      />,
    );
    // nome
    const namePokemon = screen.getByTestId('pokemon-name');
    expect(namePokemon).toContainHTML(pokemon.name);
    expect(namePokemon).toBeInTheDocument();

    // tipo
    const typePokemon = screen.getByTestId('pokemon-type');
    expect(typePokemon).toContainHTML(pokemon.type);
    expect(typePokemon).toBeInTheDocument();

    // largura
    const weigthPokemon = screen.getByTestId('pokemon-weight');
    const correctWeigth = 'Average weight: 6.0 kg';
    expect(weigthPokemon).toContainHTML(correctWeigth);
    expect(weigthPokemon).toBeInTheDocument();

    // imagem
    const imagePokemon = screen.getByAltText(/pikachu sprite/i);
    const url = pokemon.image;
    expect(url).toBe(imagePokemon.src);
    const alt = `${pokemon.name} sprite`;
    expect(alt).toBe(imagePokemon.alt);
  });
  it('Testa se o card tem um link', () => {
    const { history } = renderWithRouter(
      <Pokemon
        pokemon={ pokemon }
        isFavorite={ isPokemonFavoriteById }
      />,
    );
    const linkMoreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(linkMoreDetails);
    const urlAtual = history.location.pathname;
    const urlDesejada = `/pokemons/${pokemon.id}`;
    expect(urlAtual).toBe(urlDesejada);
  });
  it('Teste se redireciona ao clicar no link', () => {
    const { history } = renderWithRouter(
      <Pokemon
        pokemon={ pokemon }
        isFavorite={ isPokemonFavoriteById }
      />,
    );
    const linkMoreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    const linkInicial = history.location.pathname;
    userEvent.click(linkMoreDetails);
    const linkAtual = history.location.pathname;
    expect(linkAtual).not.toBe(linkInicial);
    const urlDesejada = `/pokemons/${pokemon.id}`;
    expect(linkAtual).toBe(urlDesejada);
  });
  it('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(
      <Pokemon
        pokemon={ pokemon }
        isFavorite={ isPokemonFavoriteById }
      />,
    );
    const imgStar = screen.getByAltText(/pikachu is marked/i);
    const src = 'http://localhost/star-icon.svg';
    expect(src).toBe(imgStar.src);
    expect(imgStar).toBeInTheDocument();

    const alt = `${pokemon.name} is marked as favorite`;
    expect(alt).toBe(imgStar.alt);
  });
});
