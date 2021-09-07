import React, { useState } from 'react';
import {
  Container,
  Input,
  Loader,
  Form,
  Button,
  Section
} from '../../components';

import { Aircraft } from '../aircraft/Aircraft';
import { useSelector } from 'react-redux';
import { selectAllAircraft } from '../aircraft/aircraftSlice';
import styled from 'styled-components';

const Title = styled.h2`
  display: flex;
  justify-content: center;
`;

export const AddPortfolio = () => {
  const aircraft = useSelector(selectAllAircraft);
  console.log('aircraft init', aircraft);

  const [title, setTitle] = useState('');

  const handleChange = (event) => {
    setTitle(event.target.value);
    console.log('Title', title);
  };

  return (
    <Container>
      <Title>Add Portfolio</Title>
      {
        !aircraft || aircraft.status === 'loading'
          ? <Loader />
          :
          <Section>
            <Form>
              <div>Portfolio Title:</div>
              <Input type="text" value={title} placeholder="Please enter a title" onChange={handleChange} />
              <Aircraft aircraft={aircraft} />
              <Button type="submit">Submit</Button>
            </Form>
          </Section>
      }
    </Container>
  );
};
