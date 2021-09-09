import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectAllPortfolios } from './portfoliosSlice';
import { useTable, usePagination } from 'react-table';
import {
  Container,
  Section,
  Loader,
  Title,
  Links,
  TableStyle,
} from '../../components';

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
        Cell: ({ value }) => (
          <Links to={`/portfolio/delete/${value}`}>Delete</Links>
        ),
      },
      {
        Header: 'Edit',
        accessor: 'edit',
        Cell: ({ value }) => (
          <Links to={`/portfolio/edit/${value}`}>Edit</Links>
        ),
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
    pageSize: 5,
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

  if (portfolios?.data?.length === 0) {
    return (
      <Container>
        <Title>Portfolios</Title>
        <Section>
          <Links to="/add-portfolio">Add Portfolio</Links></Section>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Portfolios</Title>
      {isLoading ? (
        <Loader />
      ) : (
        <Section>
          <Links to="/add-portfolio">Add Portfolio</Links>
          <TableStyle>
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
                          <td {...cell.getCellProps()}>
                            {cell.render('Cell')}
                          </td>
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
              <button
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
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
                    const page = e.target.value
                      ? Number(e.target.value) - 1
                      : 0;
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
                {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
            </div>
          </TableStyle>
        </Section>
      )}
    </Container>
  );
};
