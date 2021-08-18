import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './utility/renderWithRouter';
import { NotFound } from '../components';

describe('Teste o componente "<NotFound.js />"', () => {
  it('Teste se página contém um texto "Page requested not found 😭"', () => {
    renderWithRouter(<NotFound />);
    const heading = screen.getByRole('heading', {
      name: /Page requested not found /i,
      level: 2,
    });
    expect(heading).toBeInTheDocument();
  });
  it('Teste se página mostra a imagem', () => {
    renderWithRouter(<NotFound />);
    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const imagem = screen.getByAltText(/Pikachu crying because the page/i);
    expect(imagem.src).toBe(url);
    expect(imagem).toBeInTheDocument();
  });
});
