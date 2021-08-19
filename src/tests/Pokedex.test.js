import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utility/renderWithRouter';
import { Pokedex } from '../components';
import App from '../App';

describe('Teste o componente "<Pokedex.js />"', () => {
  const pokemons = [
    {
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
    },
  ];
  const isPokemonFavoriteById = {
    4: false,
    10: false,
    23: false,
    25: false,
    65: false,
    78: false,
    143: false,
    148: false,
    151: false,
  };

  it('Teste se página contém um heading h2 com o texto "Encountered pokémons"', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const heading = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });
    expect(heading).toBeInTheDocument();
  });
  it('é exibido o próximo Pokémon da lista quando "Próximo pokémon" é clicado', () => {
    renderWithRouter(
      <App />,
    );
    const dataTestName = 'next-pokemon';
    const button = screen.getByTestId('next-pokemon');
    expect(button).toBeInTheDocument();
    const namePokemon = screen.getByTestId(dataTestName);
    const next = 'Próximo pokémon';
    expect(button).toContainHTML(next);
    userEvent.click(button);
    const nextNamePokemo = screen.getByTestId(dataTestName);
    expect(nextNamePokemo).not.toContainHTML(namePokemon);
  });
  it('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(
      <App />,
    );
    const numberOfPokemo = screen.getAllByTestId('pokemon-name');
    expect(numberOfPokemo.length).toBe(1);
  });
  it('Teste se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(
      <App />,
    );
    const numberOfTypes = 7;
    const buttonFilter = screen.getAllByTestId('pokemon-type-button');
    expect(buttonFilter.length).toBe(numberOfTypes);
    expect(buttonFilter[0]).toHaveTextContent('Electric');
    expect(buttonFilter[1]).toHaveTextContent('Fire');
    expect(buttonFilter[2]).toHaveTextContent('Bug');
    expect(buttonFilter[3]).toHaveTextContent('Poison');
    expect(buttonFilter[4]).toHaveTextContent('Psychic');
    expect(buttonFilter[5]).toHaveTextContent('Normal');
    expect(buttonFilter[6]).toHaveTextContent('Dragon');
    const buttonAll = screen.getByRole('button', {
      name: /all/i,
    });
    expect(buttonAll).toBeInTheDocument();
  });
  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(
      <App />,
    );
    const buttonReset = screen.getByRole('button', {
      name: /all/i,
    });
    expect(buttonReset).toBeInTheDocument();
    userEvent.click(buttonReset);
  });
});
