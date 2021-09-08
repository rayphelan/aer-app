import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  display: flex;
  justify-content: center;
`;

const H1 = styled.h1`
  font-size: 2rem;
  text-align: center;
  color: white;
`;

const Link = styled.a`
  color: white;
  text-decoration: none;
`;

export const Header = () => {
  return (
    <Section>
      <Link href="/">
        <H1 className="glow">Aer App</H1>
      </Link>
    </Section>
  );
}
