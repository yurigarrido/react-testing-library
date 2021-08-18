import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './utility/renderWithRouter';
import { FavoritePokemons } from '../components';

describe('Teste o componente "<FavoritePokemons.js />"', () => {
  it('testa se a pessoa não tiver pokémons favoritos é exibido uma mensagem', () => {
    renderWithRouter(<FavoritePokemons />);
    const mensagePragraph = screen.getByText(/No favorite pokemon found/i);
    expect(mensagePragraph).toBeInTheDocument();
  });
});
