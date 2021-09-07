import { ASYNC_WAIT } from '../../app/constants';

const aircraftTypes = [
  {
    code: 'A320-200',
    name: 'Airbus',
  },
  {
    code: 'B737-800',
    name: 'Boeing',
  },
];

const [Airbus, Boeing] = aircraftTypes;

const aircraftList = [
  {
    type: Airbus,
    regCode: 'ZS-GAO',
  },
  {
    type: Airbus,
    regCode: 'D-AIUO',
  },
  {
    type: Airbus,
    regCode: 'B-6636',
  },
  {
    type: Boeing,
    regCode: 'LY-BFM',
  },
  {
    type: Boeing,
    regCode: 'G-GDFW',
  },
  {
    type: Boeing,
    regCode: 'XA-AMZ',
  },
];

export const fetchAllAircraft = () => {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve({
          data: aircraftList,
        }),
      ASYNC_WAIT
    );
  });
};
