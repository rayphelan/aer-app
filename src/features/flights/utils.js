// Calculate Distance between to points - https://www.movable-type.co.uk/scripts/latlong.html
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371000; // Meters
  const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // in metres

  return d;
};

// Calculate time to travel distance
export const calculateTime = (meters, metersPerSecond) => {
  const time = meters / metersPerSecond;
  console.log(
    'meters',
    meters,
    'metersPerSecond',
    metersPerSecond,
    'time',
    time
  );
  return time * 1000;
};

// Select Random Airport
export const selectRandomAirport = (airports) => {
  const max = airports.length;
  const randomIndex = Math.floor(Math.random() * max);
  return airports[randomIndex];
};

// Get Last Airport for flight or Random Airport
export const getLastAirport = (regCode, flights = [], airports) => {
  const aircraftFlights = flights.filter(
    ({ registration }) => registration === regCode
  );
  // Select Random Airport
  if (flights.length === 0 || aircraftFlights.length === 0) {
    return {
      airport: selectRandomAirport(airports),
      timestamp: Date.now(),
    };
  } else {
    // Select Last Airport
    const lastFlight = aircraftFlights[aircraftFlights.length - 1];
    const { arrival_airport: airport, arrival_timestamp: timestamp } =
      lastFlight;
    const lastAirport = airports.find((aPort) => aPort.iata === airport);
    return {
      airport: lastAirport,
      timestamp,
    };
  }
};

// KM per hour to Meters per second
export const kmPerHourToMetersPerSecond = (kmph) => 0.277778 * kmph;
