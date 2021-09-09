import React, { useEffect } from 'react';
import ApexCharts from 'apexcharts';
import { Container } from '../../components';
import styled from 'styled-components';

const ChartContainer = styled.div`
    border: 1px solid rgba(7, 127, 240, 0.5);
    border-radius: 2px;
    background-color: black;
    padding: 2rem;
    width: 100%;
    margin: 1rem auto;
`;

export const Chart = () => {

  useEffect(() => {

    const options = {
      chart: {
        type: 'line'
      },
      series: [{
        name: 'sales',
        data: [30,40,35,50,49,60,70,91,125]
      }],
      xaxis: {
        categories: [1991,1992,1993,1994,1995,1996,1997, 1998,1999]
      }
    }

    const chart = new ApexCharts(document.querySelector("#chart"), options);

    chart.render();
    
  }, []);

  return (
    <>
      <ChartContainer id="chart"></ChartContainer>
    </>
  );
};
