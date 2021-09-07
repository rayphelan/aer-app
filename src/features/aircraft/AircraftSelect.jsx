import React from 'react';
import { Checkbox } from '../../components'

export const AircraftSelect = ({
  aircraft,
  checkboxChange,
  selectedAircraft = [],
}) => {

  const isChecked = (regCode) => selectedAircraft.find(aircraft => aircraft.regCode === regCode);

  return (
    <>
      {
        aircraft?.data?.map(({regCode, type}) => {
          return (
            <div key={regCode}>
              <label>
                <Checkbox onChange={checkboxChange} value={regCode} checked={isChecked(regCode)} />
                {`${regCode} - (${type.name} ${type.code})`}
              </label>
          </div>
          );
        })
      }
    </>
  );
};
