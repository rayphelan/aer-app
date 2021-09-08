import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const Links = styled(NavLink)`
  text-decoration: none;
  padding: 5px 10px;
  color: rgba(7, 120, 240, 1);
  display: flex;
  justify-content: center;
  border: 1px solid rgba(7, 120, 240, 1);
  background-color: #222;
  border-radius: 2px;
  margin: 0;

  &:visited {
    color: rgba(7, 120, 240, 1);
  }

  &:active {
    color: black;
    font-weight: bold;
    background-color: rgba(7, 120, 240, 1);
  }

  &:hover {
    border-color: white;
  }
`;
