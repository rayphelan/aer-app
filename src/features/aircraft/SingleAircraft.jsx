import React from 'react';
import { Checkbox } from '../../components';

export const SingleAircraft = ({aircraft}) => {
  const {regCode, type} = aircraft;
  return (
    <div>
      <label>
        <Checkbox />
        {`${regCode} - (${type.name} ${type.code})`}
      </label>
    </div>
  );
};

export default SingleAircraft;
