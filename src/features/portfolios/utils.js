export const calculateFlightHours = (portfolio, flights) => {
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
      const travelSeconds = arrival_timestamp - departure_timestamp;
      const secondsDate = new Date(null);
      secondsDate.setSeconds(travelSeconds);
      const [hours, minutes, seconds] = secondsDate
        .toISOString()
        .substr(11, 8)
        .split(':');

      const departureDate = new Date(departure_timestamp);
      departureDate.setSeconds(0);
      departureDate.setMinutes(0);
      departureDate.setHours(0);

      const dateKey = new Date(departureDate.toDateString()).getTime();
      const totalHours =
        (parseInt(seconds) +
          parseInt(minutes) * 60 +
          parseInt(hours) * 60 * 60) /
        60 /
        60;

      if (!result[dateKey]) {
        result[dateKey] = totalHours;
      } else {
        result[dateKey] += totalHours;
      }
    }
  );

  const data = Object.entries(result).map(([time, hours]) => {
    return [parseInt(time), parseInt(hours)];
  });

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

      console.log('departure', departureDateKey);
      console.log('arrival', arrivalDateKey);

      if (!result[departureDateKey]) {
        result[departureDateKey] = 0;
      }

      if (departureDateKey === arrivalDateKey) {
        result[departureDateKey]++;
      }
    }
  );

  console.log('result', result);

  const data = Object.entries(result).map(([time, cycles]) => {
    return [parseInt(time), parseInt(cycles)];
  });

  return data;
};
