import React, { useEffect } from 'react';
import { selectFlights } from '../flights/flightsSlice';
import { useSelector } from 'react-redux';
import { calculateFlightHours, calculateFlightCycles } from './utils';
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

export const Chart = ({ portfolio }) => {

  const flights = useSelector(selectFlights);

  useEffect(() => {

    const flightHours = calculateFlightHours(portfolio, flights);
    const flightCycles = calculateFlightCycles(portfolio, flights);

    console.log('flightHours', flightHours);

    const options = {
      chart: {
        type: 'line'
      },
      series: [
        {
          name: 'Flight Hours',
          data: flightHours,
        },
        {
          name: 'Flight Cycles',
          data: flightCycles,
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
