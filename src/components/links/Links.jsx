import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const Links = styled(NavLink)`
  text-decoration: none;
  padding: 5px 10px;
  color: greenyellow;
  display: flex;
  justify-content: center;
  border: 1px solid rgba(173, 255, 47, 0.5);
  background-color: #222;
  border-radius: 4px;
  margin: 0;

  &:visited {
    color: greenyellow;
  }

  &:active {
    color: black;
    font-weight: bold;
    background-color: #45ff2f;
  }

  &:hover {
    border-color: white;
  }
`;
