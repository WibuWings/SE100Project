import PropTypes from 'prop-types';
// material
import { visuallyHidden } from '@mui/utils';
import { Box, Checkbox, TableRow, TableCell, TableHead, TableSortLabel } from '@mui/material';
import { withStyles } from '@material-ui/styles';
// ----------------------------------------------------------------------

EmployeeTableHeader.propTypes = {
  order: PropTypes.oneOf(['asc', 'desc']),
  orderBy: PropTypes.string,
  rowCount: PropTypes.number,
  headLabel: PropTypes.array,
  numSelected: PropTypes.number,
  onRequestSort: PropTypes.func,
  onSelectAllClick: PropTypes.func
};
const styles = theme =>  ({
  goodTable: {                                     
      borderWidth: '1px',
      borderColor: '#ccc',
      borderStyle: 'solid'
  },
  goodTable_Cell_Header: {                                     
      borderWidth: '1px',
      borderColor: '#ccc',
      borderStyle: 'solid',
      height: '40px',
  },
  goodTable_Cell: {                                     
      borderWidth: '1px',
      borderColor: '#ccc',
      borderStyle: 'solid',
      height: '80px',
  } 
})

function EmployeeTableHeader( props){
  const {
    order,
    orderBy,
    rowCount,
    headLabel,
    numSelected,
    onRequestSort,
    onSelectAllClick} = props;
  // const createSortHandler = (property) => (event) => {
  //   onRequestSort(event, property);
  // };
  const {classes} =  props;
  // console.log("headLabel", headLabel);
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" className = {classes.goodTable_Cell_Header}>
          <Checkbox
            // indeterminate={numSelected > 0 && numSelected < rowCount}
            // checked={rowCount > 0 && numSelected === rowCount}
            // onChange={onSelectAllClick}
          />
        </TableCell>
        {headLabel.map((headCell) => (
          <TableCell
            className = {classes.goodTable_Cell_Header}
            // key={headCell.id}
            // align={headCell.alignRight ? 'right' : 'left'}
            // sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              // hideSortIcon
              // active={orderBy === headCell.id}
              // direction={orderBy === headCell.id ? order : 'asc'}
              // onClick={createSortHandler(headCell.id)}
              style={{
                color: '#333'
              }}
            >
              {headCell.label}
              {/* {orderBy === headCell.id ? (
                <Box sx={{ ...visuallyHidden }}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null} */}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default withStyles( styles )( EmployeeTableHeader );