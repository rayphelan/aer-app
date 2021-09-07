import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllAircraft } from './aircraftSlice';

export const Aircraft = () => {
  const aircraft = useSelector(selectAllAircraft);

  console.log('aircraft init', aircraft);

  return <div>Aircraft</div>;
};
