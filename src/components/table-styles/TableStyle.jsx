import styled from 'styled-components';

export const TableStyle = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid rgba(7, 120, 240, 1);
    border-radius: 2px;
    width: 100%;
    background-color: black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid rgba(7, 120, 240, 1);
      border-right: 1px solid rgba(7, 120, 240, 1);

      :last-child {
        border-right: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`;
