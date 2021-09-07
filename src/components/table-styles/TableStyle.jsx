import styled from 'styled-components';

export const TableStyle = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid rgba(173, 255, 47, 0.8);
    border-radius: 4px;
    width: 100%;

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
      border-bottom: 1px solid rgba(173, 255, 47, 0.5);
      border-right: 1px solid rgba(173, 255, 47, 0.5);

      :last-child {
        border-right: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`;
