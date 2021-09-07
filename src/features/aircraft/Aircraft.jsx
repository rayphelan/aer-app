import React from 'react';
import SingleAircraft from './SingleAircraft';

export const Aircraft = ({aircraft}) => {

  return (
    <>
      {
        aircraft && aircraft.data.map((aircraft) => {
          return (
            <SingleAircraft aircraft={aircraft} key={aircraft.regCode} />
          );
        })
      }
    </>
  );
};
