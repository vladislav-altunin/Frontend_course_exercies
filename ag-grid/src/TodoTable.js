import React from 'react';

/* Steps 1 - 4 enable delete functionality */
/* Other is in the "chronological" order from top to bottom */
/* Some parts are imported to TodoInput.js and passed here as props due to deleteTodo() defined in this file*/

/* AgGrif imports */
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
//"Material" is the style that is being used
import 'ag-grid-community/dist/styles/ag-theme-material.css'; // className: ag-theme-material?
//enables using the useRef() hook (will be used in steps (2) and (3) )
//Later imported in TodoInput.js
// import { useRef } from 'react';

function TodoTable (props) {

    /* Define columns (array of column definitions) */
    // const columns = [
    //     {field: "description", sortable: false, filter: true, floatingFilter: true, resizable: false}, // field prop defines where to get cell data from
    //     {field: "date", sortable: false, filter: true, floatingFilter: true, resizable: true}, // headerName prop can be used to define custom col names
    //     {field: "priority", sortable: false, filter: true, floatingFilter: true, resizable: true, // Must be filter: true in order to enable floatingFilter
    //         cellStyle: params => params.value === "High" ? {color: 'red'} : {color: 'black'}}  // cell text is red if the value is "High"
    // ]

    // (2) Gets access to AgGrid API
    // This enables using the getSelectedNodes() from the API
    // getSelectedNodes() gets index of the selected row
    //(*) useRef must be imported!
    // const gridRef = useRef();
    // THE METHOD WAS LATER PASSED AS A PROP FROM TdoInput.js

    /* Add component */
    return(
        //component should be wrapped by a div element with the style class (ag-theme-material)
        //<AgGridReact> is used to define columns
        <div className='ag-theme-material' style={{height: '500px', width: '70%', margin: 'auto'}}>
            <AgGridReact
                animateRows
                columnDefs={props.columns}
                rowData={props.todoList}
                rowSelection="single" // (1) enables row selection
                ref={props.gridRef} // (3) Defines reference to the ag-grid component (accessible via gridRef.current)
                onGridReady={ params => props.gridRef.current = params.api} //(4) onGridReady event prop is invoked when the grid is ready. It's used to set the reference to Grid's API
                >
            </AgGridReact>
        </div>
    )
}

export default TodoTable;