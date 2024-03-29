import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import Icon from '@mui/material/Icon';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';

const DataTable = ({
  headers,
  items,
  searchable,
  searchPlaceholder,
  sx,
  headerSlot,
  slot,
  size,
  loading,
}) => {
  const [_items, setItems] = useState(items);
  const [sortValue, setSortValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [isSortAsc, setIsSortAsc] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    setItems(items);
  }, [items]);

  const handleSort = val => {
    setPage(0);
    if (val === sortValue) {
      if (isSortAsc) {
        setIsSortAsc(false);
        const sortedArr = _items;
        sortedArr.sort((o1, o2) => o1[val] > o2[val] ? -1 : (o1[val] < o2[val] ? 1 : 0));
      } else {
        setItems(items);
        setSortValue('');
      }
    }
    else {
      setSortValue(val);
      setIsSortAsc(true);
      const sortedArr = _items;
      sortedArr.sort((o1, o2) => o1[val] > o2[val] ? 1 : (o1[val] < o2[val] ? -1 : 0));
      setItems(sortedArr);
    }
  }
  const handleSearch = () => {
    setPage(0);
    const searchableValues = headers.filter(h => h.searchable).map(h => h.value);
    setItems(items.filter(item => searchComparer(item, searchableValues)));
  }
  const searchComparer = (item, values) => {
    let result = false;
    values.forEach(val => result |= item[val].toLowerCase().includes(searchValue.toLowerCase()));
    return result;
  }
  const handleSearchOnEnterKey = (e) => {
    if (e.keyCode === 13) handleSearch();
  }
  const getSortArrow = (val) => {
    return val === sortValue ? (isSortAsc ? '↑' : '↓') : '';
  }
  const createHeaderCells = () => {
    return headers.map(h => {
      if (headerSlot && headerSlot[h.value]) return (
        <TableCell
          align={h.align || "left"}
          key={h.value} onClick={() => h.sortable ? handleSort(h.value) : null}
          sx={{ cursor: h.sortable ? 'pointer' : 'auto', ...h.sx }}
        >
          { headerSlot[h.value](h) }
        </TableCell>
      )
      else return (
        <TableCell
          align={h.align || "left"}
          key={h.value} onClick={() => h.sortable ? handleSort(h.value) : null}
          sx={{ cursor: h.sortable ? 'pointer' : 'auto', ...h.sx }}
        >
          {h.text} { getSortArrow(h.value) }
        </TableCell>
      )
    });
  }
  const createTableCells = (item) => {
    const entries = getSortedEntries(item);
    return entries.map((entry, index) => {
      const {key, value} = entry;
      if (slot && slot[key]) return (
        <TableCell key={index}>
          { slot[key](item) }
        </TableCell>
      )
      else return (
        <TableCell key={index}>
          { value }
        </TableCell>
      )
    });
  }
  const getSortedEntries = (item) => {
    const entries = getEntries(item);
    const headerValues = getHeaderValues();
    return headerValues.map(header => entries.find(entry => entry.key === header) || { key: header, value: ''});
  }
  const getEntries = (item) => {
    return Object.entries(item).map((entry, index) => ({
      key: entry[0],
      value: entry[1]
    }));
  }
  const getHeaderValues = () => {
    return headers.map(h => h.value);
  }

  const getVisibleItems = () => {
    return _items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <React.Fragment>
      {searchable
      ? <Box sx={{ mb: 3, display: 'flex', width: '100%' }}>
          <TextField
            label="Szukaj"
            variant="standard"
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyUp={handleSearchOnEnterKey}
            sx={{ flexGrow: 1 }}
            disabled={loading}
          />
          <IconButton size="small" sx={{ p: '10px' }} onClick={handleSearch}>
            <Icon>
              search
            </Icon>
          </IconButton>
        </Box>
      : null }
      <TableContainer component={Paper} sx={sx}>
        { loading ? <LinearProgress /> : null }
        <Table size={size}>
          <TableHead>
            <TableRow>
              { createHeaderCells() }
            </TableRow>
          </TableHead>
          <TableBody>
            {getVisibleItems().map((item, index) => 
              <TableRow key={index}>
                { createTableCells(item) }
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={_items.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          // labelRowsPerPage="Wierszy na stronie"
        />
      </TableContainer>
    </React.Fragment>
  );
}

DataTable.propTypes = {
  searchable: PropTypes.bool,
  headers: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    value: PropTypes.string,
    align: PropTypes.string,
    sortable: PropTypes.bool,
    sx: PropTypes.object,
  })),
  searchPlaceholder: PropTypes.string,
  items: PropTypes.array,
  sx: PropTypes.object,
  headerSlot: PropTypes.object,
  slot: PropTypes.object,
  size: PropTypes.oneOf(["medium", "small"]),
  loading: PropTypes.bool,
}

DataTable.defaultProps = {
  headers: [],
  items: [],
  sx: {},
  headerSlot: {},
  slot: {},
  searchable: false,
  size: 'medium',
  loading: false,
}

export default DataTable;
