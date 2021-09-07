import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectAllPortfolios } from './portfoliosSlice';
import { useTable, usePagination } from 'react-table';
import { Container, Section, Loader, Title } from '../../components';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Links = styled(NavLink)`
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

const Styles = styled.div`
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

export const Portfolios = () => {
  const portfolios = useSelector(selectAllPortfolios);
  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState([]);

  const prepareData = (portfolios) => {
    return portfolios.map(({ id, title, selectedAircraft }) => {
      return {
        portfolioId: id,
        portfolioTitle: title,
        totalAircraft: selectedAircraft.length,
        delete: id,
        edit: id,
        view: id,
      };
    });
  };

  const data = React.useMemo(() => tableData, [tableData]);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Portfolio ID',
        accessor: 'portfolioId',
      },
      {
        Header: 'Title',
        accessor: 'portfolioTitle',
      },
      {
        Header: 'Aircraft',
        accessor: 'totalAircraft',
      },
      {
        Header: 'Delete',
        accessor: 'delete',
        Cell: ({ value }) => <Links to={`/portfolio/delete/${value}`}>Delete</Links>,
      },
      {
        Header: 'Edit',
        accessor: 'edit',
        Cell: ({ value }) => <Links to={`/portfolio/edit/${value}`}>Edit</Links>,
      },
      {
        Header: 'View',
        accessor: 'view',
        Cell: ({ value }) => <Links to={`/portfolio/${value}`}>View</Links>,
      },
    ],
    []
  );

  const tableInitialState = {
    hiddenColumns: ['portfolioId'],
    pageSize: 2,
  };
  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: tableInitialState,
    },
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = tableInstance;

  useEffect(() => {
    setIsLoading(portfolios.status === 'loading');
    setTableData(prepareData(portfolios.data));
  }, [portfolios]);

  return (
    <Container>
      <Title>Portfolios</Title>
      {isLoading ? (
        <Loader />
      ) : (
        <Section>
          <Styles>
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
          {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
          <div className="pagination">
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              {'<<'}
            </button>{' '}
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
              {'<'}
            </button>{' '}
            <button onClick={() => nextPage()} disabled={!canNextPage}>
              {'>'}
            </button>{' '}
            <button
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {'>>'}
            </button>{' '}
            <span>
              Page{' '}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{' '}
            </span>
            <span>
              | Go to page:{' '}
              <input
                type="number"
                defaultValue={pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  gotoPage(page);
                }}
                style={{ width: '100px' }}
              />
            </span>{' '}
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
          </Styles>
        </Section>
      )}
    </Container>
  );
};
