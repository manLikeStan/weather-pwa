import React from 'react';

import Wrapper from './Wrapper';
import ListCitiesItem from '../ListCitiesItem/index';

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

const ListCities = () => (
  <Wrapper>
    {cities.map((item, i) => (
      <ListCitiesItem key={i} name={item.name} />
    ))}
  </Wrapper>
);

export default ListCities;
