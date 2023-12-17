// components/Table.js
import React from 'react';
import { useTable, useFilters, useSortBy, usePagination } from 'react-table';
import { Pagination } from './PaginationUtil';
import { DEFAULT_COLUMN_WIDTH } from '../StudentModule/studentHeader';

const MyTable = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    state: { pageIndex, pageSize },
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useFilters,
    useSortBy,
    usePagination
  );

  return (
    <div className='my-table'>
      <div className="table-contianer">
        <table {...getTableProps()} className="table">
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th 
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  style={{width: (column.width ?  column.width: DEFAULT_COLUMN_WIDTH)+'px'}}
                  >
                    {column.render('Header')}
                    <div>
                      {column.canFilter ? column.render('Filter') : null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <Pagination totalCount={data ? data.length : 0} page={page} pageIndex={pageIndex} pageSize={pageSize} previousPage={previousPage} nextPage={nextPage} setPageSize={setPageSize} gotoPage={gotoPage}/>
      </div>
    </div>
  );
};

export default MyTable;
