import React from 'react';
import { Checkbox } from '../../components'

export const Aircraft = ({
  aircraft,
  checkboxChange,
}) => {

  return (
    <>
      {
        aircraft && aircraft.data.map(({regCode, type}) => {
          return (
            <div key={regCode}>
              <label>
                <Checkbox onChange={checkboxChange} value={regCode} />
                {`${regCode} - (${type.name} ${type.code})`}
              </label>
          </div>
          );
        })
      }
    </>
  );
};
