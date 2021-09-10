export const calculateFlightHours = (portfolio, flights) => {
  const portfolioFlights = portfolio.selectedAircraft
    .map((aircraft) => {
      return flights.data.filter(
        ({ registration }) => registration === aircraft.regCode
      );
    })
    .flat();

  let result = {};

  portfolioFlights.forEach(({ arrival_timestamp, departure_timestamp }) => {
    console.log('DEPARTURE', new Date(departure_timestamp));
    console.log('ARRIVEL', new Date(arrival_timestamp));

    const travelSeconds =
      (new Date(arrival_timestamp).getTime() -
        new Date(departure_timestamp).getTime()) /
      1000;

    console.log(
      'traveSeconds',
      travelSeconds,
      travelSeconds / 60,
      travelSeconds / 60 / 60
    );
    const secondsDate = new Date(null);

    secondsDate.setSeconds(travelSeconds);
    const duration = secondsDate.toISOString().substr(11, 8);
    console.log('duration', duration);
    const [hours, minutes, seconds] = duration.split(':');
    console.log('HMS', hours, minutes, seconds);

    const departureDate = new Date(departure_timestamp);
    departureDate.setSeconds(0);
    departureDate.setMinutes(0);
    departureDate.setHours(0);

    const dateKey = new Date(departureDate.toDateString()).getTime();
    console.log('dateKey', dateKey, new Date(dateKey));

    const totalHours =
      (parseInt(seconds) + parseInt(minutes) * 60 + parseInt(hours) * 60 * 60) /
      60 /
      60;

    console.log('TOTAL HOURS', totalHours);
    console.log('--------------------------------------');

    if (!result[dateKey]) {
      result[dateKey] = totalHours;
    } else {
      result[dateKey] += totalHours;
    }
  });

  const data = Object.entries(result).map(([time, hours]) => {
    return [parseInt(time), parseInt(hours)];
  });

  console.log('flightHours', data);
  return data;
};

export const calculateFlightCycles = (portfolio, flights) => {
  const portfolioFlights = portfolio.selectedAircraft
    .map((aircraft) => {
      return flights.data.filter(
        ({ registration }) => registration === aircraft.regCode
      );
    })
    .flat();

  let result = {};

  portfolioFlights.forEach(
    ({ arrival_timestamp, departure_timestamp, registration }) => {
      const departureDate = new Date(departure_timestamp);
      departureDate.setSeconds(0);
      departureDate.setMinutes(0);
      departureDate.setHours(0);
      const departureDateKey = new Date(departureDate.toDateString()).getTime();

      const arrivalDate = new Date(arrival_timestamp);
      arrivalDate.setSeconds(0);
      arrivalDate.setMinutes(0);
      arrivalDate.setHours(0);
      const arrivalDateKey = new Date(arrivalDate.toDateString()).getTime();

      if (!result[departureDateKey]) {
        result[departureDateKey] = 0;
      }

      if (departureDateKey === arrivalDateKey) {
        result[departureDateKey]++;
      }
    }
  );

  const data = Object.entries(result).map(([time, cycles]) => {
    return [parseInt(time), parseInt(cycles)];
  });

  return data;
};
