import {Component} from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    {
      field: 'stt',
      headerName: 'STT', 
      width: 120},
    { 
      field: 'id', 
      headerName: 'ID', 
      width: 100, 
    },

    { 
      field: 'GoodName', 
      headerName: 'Good Name', 
      width: 180 },
    { 
      field: 'Quantity', 
      headerName: 'Quantity',
      type: 'number',
      width: 140 },
    {
      field: 'OriginalPrice',
      headerName: 'Original Price',
      type: 'number',
      width: 180,
    },
    {
      field: 'SellPrice',
      headerName: 'Sell Price',
      width: 180,
      type: 'number',
    },
    {
      field: 'ImportTime',
      headerName: 'Import Time',
      width: 180,
      type: 'date',
    },
  ];

  const rows = [
    { id: 133333, GoodName: 'Snow', Quantity: 100, OriginalPrice: 35, SellPrice: 35, ImportTime: '13/12/2021' },
    { id: 2, GoodName: 'Lannister', Quantity: 100, OriginalPrice: 42, SellPrice: 42, ImportTime: '10/12/2021' },
    { id: 3, GoodName: 'Lannister', Quantity: 100, OriginalPrice: 45, SellPrice: 45, ImportTime: '10/12/2021' },
    { id: 4, GoodName: 'Stark', Quantity: 100, OriginalPrice: 16, SellPrice: 16, ImportTime: '10/12/2021' },
    { id: 5, GoodName: 'Targaryen', Quantity: 100, OriginalPrice: null, SellPrice: null, ImportTime: '10/12/2021' },
    { id: 6, GoodName: 'Melisandre', Quantity: 100, OriginalPrice: 150, SellPrice: 150, ImportTime: '10/12/2021' },
    { id: 7, GoodName: 'Clifford', Quantity: 100, OriginalPrice: 44, SellPrice: 44, ImportTime: '10/12/2021' },
    { id: 8, GoodName: 'Frances', Quantity: 100, OriginalPrice: 36, SellPrice: 36, ImportTime: '10/12/2021' },
    { id: 9, GoodName: 'Roxie', Quantity: 100, OriginalPrice: 65, SellPrice: 65, ImportTime: '10/12/2021' },
    { id: 92, GoodName: 'Roxie', Quantity: 100, OriginalPrice: 65, SellPrice: 65, ImportTime: '10/12/2021' },
    { id: 91, GoodName: 'Roxie', Quantity: 100, OriginalPrice: 65, SellPrice: 65, ImportTime: '10/12/2021' },
    { id: 94, GoodName: 'Roxie', Quantity: 100, OriginalPrice: 65, SellPrice: 65, ImportTime: '10/12/2021' },
  ];
//   const StyledDataGrid = withStyles({
//     root: {
//         '& .MuiDataGrid-renderingZone': {
//             maxHeight: 'none !important',
//         },
//         '& .MuiDataGrid-cell': {
//             lineHeight: 'unset !important',
//             maxHeight: 'none !important',
//             whiteSpace: 'normal',
//         },
//         '& .MuiDataGrid-row': {
//             maxHeight: 'none !important',
//         },
//     },
// })(DataGrid);

class GoodManager extends Component {
    render() {
        return (
            <div>
              Good Manager
              <div style={{ height: 600, width: '100%', overflowX: 'scroll'}}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={9}
                    rowsPerPageOptions={[9]}
                 />
              </div>
            </div>
           
        );
    }
}

export default GoodManager;