import React from 'react';
import { hot } from 'react-hot-loader';
import Container from '../../components/Container/index';
import ViewCity from '../../components/ViewCity/index';
import ListCities from '../../components/ListCities/index';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }

	body {
		margin: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    color: #474747;
  }

  input[type=search]::-ms-clear { display: none; width : 0; height: 0; }
  input[type=search]::-ms-reveal { display: none; width : 0; height: 0; }
  input[type="search"]::-webkit-search-decoration,
  input[type="search"]::-webkit-search-cancel-button,
  input[type="search"]::-webkit-search-results-button,
  input[type="search"]::-webkit-search-results-decoration { display: none; }

  .tooltipCustom {
    font-weight: 500;
    border-radius: 8px;
  }
`;

const AppWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const cities = [
  { name: 'Paris' },
  { name: 'Berlin' },
  { name: 'Los Angeles' },
  { name: 'London' },
  { name: 'New York' },
  { name: 'Madrid' },
  { name: 'São Paulo' },
  { name: 'Tokyo' },
  { name: 'Hong Kong' },
  { name: 'Buenos Aires' },
  { name: 'Moscow' },
  { name: 'Dubai' }
];

const App = () => (
  <AppWrapper>
    <GlobalStyle />
    <Container>
      <ViewCity />
      <ListCities {...{ cities }} />
    </Container>
  </AppWrapper>
);

export default hot(module)(App);
