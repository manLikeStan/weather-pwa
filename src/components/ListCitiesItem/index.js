import React, { useState, useEffect } from 'react';
import { setConfig, cold } from 'react-hot-loader';
import PropTypes from 'prop-types';

import Wrapper from './Wrapper';
import ContainerLocation from './ContainerLocation';
import CityText from './CityText';
import CountryText from './CountryText';
import ContainerTemperature from './ContainerTemperature';
import SectionTemperature from './SectionTemperature';
import SectionTemperatureMobile from './SectionTemperatureMobile';
import TemperatureText from './TemperatureText';
import TemperatureImage from './TemperatureImage';
import TemperatureInfos from '../TemperatureInfos/index';
import Loading from '../Loading/index';
import Error from '../Error/index';

import request from '../../services/Api';

import {
  CloudLightning,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  Sun,
  Cloud
} from 'react-feather';

setConfig({
  onComponentRegister: type =>
    (String(type).indexOf('useState') > 0 ||
      String(type).indexOf('useEffect') > 0) &&
    cold(type)
});

function ListCitiesItem({ name }) {
  const [refresh, setRefresh] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await request('weather', {
          q: name
        });

        if (response.status === 200) {
          const data = await response.json();

          setData({
            description: data.weather[0].description,
            condition: data.weather[0].condition,
            icon: getImageTemperature(data.weather[0].icon),
            name: data.name,
            country: data.sys.country,
            temp: parseInt(data.main.temp),
            temp_min: parseInt(data.main.temp_min),
            temp_max: parseInt(data.main.temp_max),
            humidity: parseInt(data.main.humidity),
            wind: data.wind.speed.toFixed(1)
          });
        } else {
          setError(response.statusText);
        }
      } catch (e) {
        setError('Something went wrong, please try again later.');
      }
      setLoading(false);
    })();
  }, [refresh]);

  const actionRefresh = () => {
    setLoading(true);
    setRefresh(!refresh);
  };

  const getImageTemperature = icon => {
    icon = icon.replace(/\D/g, '');

    const options = {
      '11': <CloudLightning color="#c1c1c1" size={30} />,
      '09': <CloudDrizzle color="#c1c1c1" size={30} />,
      '10': <CloudRain color="#c1c1c1" size={30} />,
      '13': <CloudSnow color="#c1c1c1" size={30} />,
      '01': <Sun color="#c1c1c1" size={30} />
    };

    return options[icon] || <Cloud color="#c1c1c1" size={30} />;
  };

  if (error) {
    return (
      <Wrapper>
        <Error
          message={error}
          textBtn="Reload"
          type="list"
          back={actionRefresh}
        />
      </Wrapper>
    );
  }

  if (loading) {
    return (
      <Wrapper>
        <Loading />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <ContainerLocation>
        <CityText>{data.name}</CityText>
        <CountryText>{data.country}</CountryText>
      </ContainerLocation>
      <ContainerTemperature>
        <SectionTemperature>
          <TemperatureText>{data.temp} °C</TemperatureText>
          <TemperatureImage>{data.icon}</TemperatureImage>
        </SectionTemperature>
        <SectionTemperatureMobile>
          <TemperatureInfos
            tempMin={data.temp_min}
            tempMax={data.temp_max}
            humidity={data.humidity}
            wind={data.wind}
            sizeIcon={15}
            sizeText={13}
            colorIcon="#c1c1c1"
            colorText="#7c7c7c"
          />
        </SectionTemperatureMobile>
      </ContainerTemperature>
    </Wrapper>
  );
}

ListCitiesItem.propTypes = {
  name: PropTypes.string
};

export default ListCitiesItem;
