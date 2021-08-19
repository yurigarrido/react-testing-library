import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utility/renderWithRouter';
import App from '../App';

describe('Teste o componente "<PokemonDetails.js />"', () => {
  const urlPokemons = '/pokemons/25';
  it('Teste se as Pokémon selecionado são mostradas na tela.', () => {
    const { history } = renderWithRouter(
      <App />,
    );
    const linkMoreDetails = screen.getByText(/more details/i);
    expect(linkMoreDetails).toBeInTheDocument();

    userEvent.click(linkMoreDetails);

    const urlDesejada = urlPokemons;
    const urlAtual = history.location.pathname;
    expect(urlDesejada).toBe(urlAtual);

    // na vera
    const namePage = screen.getByRole('heading', {
      name: /pikachu details/i,
      level: 2,
    });
    expect(namePage).toBeInTheDocument();
    expect(linkMoreDetails).not.toBeInTheDocument();

    const sumary = screen.getByRole('heading', {
      name: /summary/i,
    });
    expect(sumary).toBeInTheDocument();

    const paragrafo = screen.getByText(/this intelligent/i);
    expect(paragrafo).toBeInTheDocument();
  });
  it('Teste se existe na página  os mapas contendo as localizações do pokémon', () => {
    const { history } = renderWithRouter(
      <App />,
    );
    const linkMoreDetails = screen.getByText(/more details/i);
    expect(linkMoreDetails).toBeInTheDocument();

    userEvent.click(linkMoreDetails);

    const urlDesejada = urlPokemons;
    const urlAtual = history.location.pathname;
    expect(urlDesejada).toBe(urlAtual);

    // na vera
    const h2 = screen.getByRole('heading', {
      name: /Game Locations of Pikachu/i,
      level: 2,
    });
    expect(h2).toBeInTheDocument();

    // mapas
    const imageMap1 = screen.getAllByAltText('Pikachu location');
    expect(imageMap1.length).toBe(2);
    const paragrafo1 = screen.getByText(/kanto viridian forest/i);
    expect(paragrafo1).toBeInTheDocument();
    const paragrafo2 = screen.getByText(/kanto power/i);
    expect(paragrafo2).toBeInTheDocument();

    // src img
    const urlSrc1 = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
    expect(imageMap1[0].src).toBe(urlSrc1);
    const urlSrc2 = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';
    expect(imageMap1[1].src).toBe(urlSrc2);

    // alt text
    const altExpected = 'Pikachu location';
    expect(imageMap1[0].alt).toBe(altExpected);
  });
  it('Teste se o usuário pode favoritar um pokémon.', () => {
    const { history } = renderWithRouter(
      <App />,
    );
    const linkMoreDetails = screen.getByText(/more details/i);
    expect(linkMoreDetails).toBeInTheDocument();

    userEvent.click(linkMoreDetails);

    const urlDesejada = urlPokemons;
    const urlAtual = history.location.pathname;
    expect(urlDesejada).toBe(urlAtual);
    // na vera

    const checkbox = screen.getByLabelText('Pokémon favoritado?');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox.checked).toBe(false);

    userEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
  });
});
