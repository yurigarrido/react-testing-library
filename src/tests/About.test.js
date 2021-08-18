import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utility/renderWithRouter';
import About from '../components/About';

describe('Testando o componente About.js', () => {
  it('verifica se há um h2 com a informação "About Pokédex"', () => {
    renderWithRouter(<About />);
    const infoPokedex = screen.getByRole('heading', {
      name: /About Pokédex/i,
      level: 2,
    });
    expect(infoPokedex).toBeInTheDocument();
  });
  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const paragrafosExistentes = screen.getAllByText(/,/i);
    expect(paragrafosExistentes.length).toBe(2);
  });
  it('verifica se a imagem na página é a imagem correta', () => {
    renderWithRouter(<About />);
    const imagemCorreta = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const imagem = screen.getByRole('img');
    expect(imagem.src).toBe(imagemCorreta);
  });
});
