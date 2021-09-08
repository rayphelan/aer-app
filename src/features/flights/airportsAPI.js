import { ASYNC_WAIT } from '../../app/constants';
import * as airports from './airports.json';

const filterAirports = (airports) => {
  return airports.default.filter(
    ({ status, type, size, lat, lon, continent, iata, name }) => {
      return (
        status === 1 &&
        type === 'airport' &&
        size === 'large' &&
        lat &&
        lon &&
        continent !== 'NA' &&
        iata &&
        name
      );
    }
  );
};

export const fetchAllAirports = () => {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve({
          data: JSON.stringify(filterAirports(airports)),
        }),
      ASYNC_WAIT
    );
  });
};
