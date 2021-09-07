import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

const activeClassName = 'active';

const Links = styled(NavLink)`
  text-decoration: none;
  padding: 5px 10px;

  @media only screen and (max-width: 499px) {
    display: flex;
    justify-content: center;
    margin-top: 5px;
  }

  border: 1px solid rgba(173, 255, 47, 0.5);
  background-color: black;
  border-radius: 4px;
  margin: 0 10px;

  &:visited {
    color: greenyellow;
  }

  &.${activeClassName} {
    color: black;
    font-weight: bold;
    background-color: #45ff2f;
  }

  &:hover {
    border-color: white;
  }
`;

const Navbar = () => {
  return (
    <Nav data-testid="navbar">
      <div className="nav-link">
        <Links to="/portfolios" activeClassName={activeClassName}>
          Portfolios
        </Links>
        <Links to="/add-portfolio" activeClassName={activeClassName}>
          Add Portfolio
        </Links>
      </div>
    </Nav>
  );
};

export default Navbar;
