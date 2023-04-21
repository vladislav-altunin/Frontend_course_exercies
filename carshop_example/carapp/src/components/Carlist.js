import React, { useState, useEffect, useRef } from 'react';
import Addcar from './Addcar';
import Editcar from './Editcar';

/* AG Grid imports */
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
//Theme to be used
import 'ag-grid-community/styles/ag-theme-material.css'; // className: ag-theme-material

/* Material UI imports */
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';

export default function Carlist() {
  const [cars, setCars] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch('https://carrestapi.herokuapp.com/cars')
      .then(response => response.json())
      .then(data => setCars(data._embedded.cars));
  };

  const deleteRow = link => {
    if (window.confirm('Are you sure?')) {
      fetch(link, { method: 'DELETE' })
        .then(res => fetchData())
        .then(res => setOpenSnackbar(true))
        .catch(err => console.error(err));
    }
  };

  const saveCar = car => {
    fetch('https://carrestapi.herokuapp.com/cars', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(car),
    })
      .then(res => fetchData())
      .catch(err => console.error(err));
  };

  const updateCar = (link, car) => {
    fetch(link, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(car),
    })
      .then(res => fetchData())
      .catch(err => console.error(err));
  };

  const columns = [
    {
      field: 'brand', // field prop defines where to get cell data from
      sortable: false,
      filter: true,
      floatingFilter: true, // Must be filter: true to enable floatingFilter
      resizable: false,
    }, // headerName prop can be used to define custom col names
    {
      field: 'model',
      sortable: false,
      filter: true,
      floatingFilter: true,
      resizable: true,
    },
    {
      field: 'color',
      sortable: false,
      filter: true,
      floatingFilter: true,
      resizable: true,
    },
    {
      field: 'fuel',
      sortable: false,
      filter: true,
      floatingFilter: true,
      resizable: true,
    },
    {
      field: 'year',
      sortable: false,
      filter: true,
      floatingFilter: true,
      resizable: true,
      width: 120,
    },
    {
      field: 'price',
      sortable: false,
      filter: true,
      floatingFilter: true,
      resizable: true,
      width: 120,
    },
    {
      field: '_links.self.href',
      headerName: 'Edit',
      cellRenderer: params => (
        <Editcar
          updateCar={updateCar}
          car={params.data}
          fetchData={fetchData}
        />
      ),
    },
    {
      field: '_links.self.href',
      headerName: 'Edit',
      cellRenderer: params => (
        <span>
          <Button
            size="small"
            variant="text"
            color="error"
            onClick={() => deleteRow(params.value)}
          >
            Delete
          </Button>
        </span>
      ),
    },
  ];

  const gridRef = useRef();

  return (
    <div>
      <Addcar saveCar={saveCar} />
      {/* component should be wrapped by a div element with the style class (ag-theme-material)
    <AgGridReact> is used to define columns */}
      <div
        className="ag-theme-material"
        style={{
          height: '650px',
          width: '100%',
          margin: 'auto',
        }}
      >
        <AgGridReact
          animateRows
          paginationPageSize={20}
          pagination={true}
          columnDefs={columns}
          rowData={cars}
          rowSelection="single" // (1) enables row selection
          ref={gridRef} // (3) Defines reference to the ag-grid component (accessible via gridRef.current)
          onGridReady={params => (gridRef.current = params.api)} //(4) onGridReady event prop is invoked when the grid is ready. It's used to set the reference to Grid's API
        ></AgGridReact>
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)} //on close must be set for the bar to disappear
        message="Deleted"
      />
    </div>
  );
}
