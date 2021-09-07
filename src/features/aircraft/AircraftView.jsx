import React from 'react';

export const AircraftView = ({
  aircraft,
}) => {

  return (
    <>
      {
        aircraft?.map(({regCode, type}) => {
          return (
            <div key={regCode}>
                {`${regCode} - (${type.name} ${type.code})`}
            </div>
          );
        })
      }
    </>
  );
};
