import React, { useEffect } from 'react';
import { selectFlights } from '../flights/flightsSlice';
import { useSelector } from 'react-redux';
import ApexCharts from 'apexcharts';
import styled from 'styled-components';

const ChartContainer = styled.div`
    border: 1px solid rgba(7, 127, 240, 0.5);
    border-radius: 2px;
    background-color: black;
    padding: 2rem;
    width: 60vw;
    margin: 3rem auto;
`;

const calculateFlightHours = (portfolio, flights) => {

  const portfolioFlights = portfolio.selectedAircraft.map((aircraft) => {
    return flights.data.filter(({ registration }) => registration === aircraft.regCode);
  }).flat();

  let result = {};

  portfolioFlights.forEach(({
    arrival_timestamp,
    departure_timestamp,
  }) => {
    const travelSeconds = arrival_timestamp - departure_timestamp;
    const secondsDate = new Date(null);
    secondsDate.setSeconds(travelSeconds);
    const [hours, minutes, seconds] = secondsDate.toISOString().substr(11, 8).split(':');

    const departureDate = new Date(departure_timestamp);
    departureDate.setSeconds(0);
    departureDate.setMinutes(0);
    departureDate.setHours(0);
    
    const dateKey = new Date(departureDate.toDateString()).getTime();
    const totalSeconds = (parseInt(seconds) + (parseInt(minutes) * 60) + (parseInt(hours) * 60 * 60)) / 60 / 60;

    if (!result[dateKey]) {
      result[dateKey] = totalSeconds
    }
    else {
      result[dateKey] += totalSeconds;
    }
    
  });

  const data = Object.entries(result).map(([time, hours]) => {
    return [parseInt(time), parseInt(hours)];
  });

  return data;

};

export const Chart = ({ portfolio }) => {

  const flights = useSelector(selectFlights);

  useEffect(() => {

    const flightHours = {
      name: 'Flight Hours',
      data: calculateFlightHours(portfolio, flights)
    };

    console.log('flightHours', flightHours)

    const options = {
      chart: {
        type: 'line'
      },
      series: [
        {
          name: 'Flight',
          data: flightHours.data
        }
      ],
      xaxis: {
        type: 'datetime'
      }
    };

    const chart = new ApexCharts(document.querySelector("#chart"), options);

    chart.render();
    
  }, [portfolio, flights]);

  return (
    <>
      <ChartContainer id="chart"></ChartContainer>
    </>
  );
};
